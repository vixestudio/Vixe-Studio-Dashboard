import React, { useState } from 'react';
import {
  Volume2,
  Plus,
  Trash2,
  Edit2,
  ChevronDown,
  ChevronUp,
  Folder,
  Hash,
  Users,
  Lock,
  Mic,
  Settings,
  X,
  Check,
  Radio,
  Sliders,
  Sparkles,
} from 'lucide-react';
import { ServerInfo } from '../types';
import { DiscordSwitch, DiscordChannelSelect, UnsavedChangesBar } from './common';
import { HubConfigPage } from './HubConfigPage';

export interface TemporaryChannelsViewProps {
  currentServer: ServerInfo;
  onBackToDashboard?: () => void;
}

export interface VoiceHub {
  id: string;
  name: string;
  generatorChannel: string;
  category: string;
  channelNameTemplate: string;
  userLimit: number; // 0 = unlimited
  bitrate: number; // in kbps (64, 96, 128, etc.)
  autoDeleteEmpty: boolean;
  isEnabled: boolean;
}

export interface VoiceCommand {
  id: string;
  name: string;
  description: string;
  cooldown: number; // seconds
  isEnabled: boolean;
  alias?: string;
}

const DEFAULT_COMMANDS: VoiceCommand[] = [
  {
    id: 'cmd-voice-ban',
    name: '/voice-ban',
    description: 'Banir um usuário do canal de voz temporário',
    cooldown: 5,
    isEnabled: true,
    alias: '/vban',
  },
  {
    id: 'cmd-voice-claim',
    name: '/voice-claim',
    description: 'Reivindicar a propriedade do canal de voz temporário',
    cooldown: 10,
    isEnabled: true,
    alias: '/vclaim',
  },
  {
    id: 'cmd-voice-clean',
    name: '/voice-clean',
    description: 'Excluir todos os canais temporários inativos',
    cooldown: 30,
    isEnabled: true,
    alias: '/vclean',
  },
  {
    id: 'cmd-voice-hide',
    name: '/voice-hide',
    description: 'Esconder o canal de voz temporário',
    cooldown: 5,
    isEnabled: true,
    alias: '/vhide',
  },
  {
    id: 'cmd-voice-kick',
    name: '/voice-kick',
    description: 'Expulsar um usuário do canal de voz temporário',
    cooldown: 5,
    isEnabled: true,
    alias: '/vkick',
  },
  {
    id: 'cmd-voice-limit',
    name: '/voice-limit',
    description: 'Alterar o limite de usuários do canal de voz temporário',
    cooldown: 5,
    isEnabled: true,
    alias: '/vlimit',
  },
  {
    id: 'cmd-voice-lock',
    name: '/voice-lock',
    description: 'Bloquear o canal de voz temporário',
    cooldown: 5,
    isEnabled: true,
    alias: '/vlock',
  },
  {
    id: 'cmd-voice-owner',
    name: '/voice-owner',
    description: 'Verificar a propriedade do canal de voz temporário',
    cooldown: 5,
    isEnabled: true,
    alias: '/vowner',
  },
  {
    id: 'cmd-voice-rename',
    name: '/voice-rename',
    description: 'Mudar o nome do canal de voz temporário',
    cooldown: 300,
    isEnabled: true,
    alias: '/vrename',
  },
  {
    id: 'cmd-voice-reveal',
    name: '/voice-reveal',
    description: 'Revelar o canal de voz temporário',
    cooldown: 5,
    isEnabled: true,
    alias: '/vreveal',
  },
  {
    id: 'cmd-voice-transfer',
    name: '/voice-transfer',
    description: 'Transferir propriedade do canal de voz temporário',
    cooldown: 10,
    isEnabled: true,
    alias: '/vtransfer',
  },
  {
    id: 'cmd-voice-unban',
    name: '/voice-unban',
    description: 'Desbanir um usuário do canal de voz temporário',
    cooldown: 5,
    isEnabled: true,
    alias: '/vunban',
  },
  {
    id: 'cmd-voice-unlock',
    name: '/voice-unlock',
    description: 'Desbloquear o canal de voz temporário',
    cooldown: 5,
    isEnabled: true,
    alias: '/vunlock',
  },
];

export const TemporaryChannelsView: React.FC<TemporaryChannelsViewProps> = ({
  currentServer,
  onBackToDashboard,
}) => {
  const [isActive, setIsActive] = useState(true);
  const [hubs, setHubs] = useState<VoiceHub[]>([]);
  const [commands, setCommands] = useState<VoiceCommand[]>(DEFAULT_COMMANDS);
  const [isCommandsOpen, setIsCommandsOpen] = useState(true);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [saveSuccessMessage, setSaveSuccessMessage] = useState<string | null>(null);

  // Dedicated Hub Configuration Page
  const [isConfiguringHub, setIsConfiguringHub] = useState(false);
  const [configuringHub, setConfiguringHub] = useState<VoiceHub | null>(null);

  // Hub Modal
  const [isHubModalOpen, setIsHubModalOpen] = useState(false);
  const [editingHubId, setEditingHubId] = useState<string | null>(null);
  const [hubName, setHubName] = useState('');
  const [generatorChannel, setGeneratorChannel] = useState('');
  const [hubCategory, setHubCategory] = useState('Salas Temporárias');
  const [channelTemplate, setChannelTemplate] = useState('Sala de {user}');
  const [userLimit, setUserLimit] = useState<number>(0);
  const [bitrate, setBitrate] = useState<number>(96);
  const [autoDeleteEmpty, setAutoDeleteEmpty] = useState(true);

  // Command Edit Modal
  const [editingCommand, setEditingCommand] = useState<VoiceCommand | null>(null);
  const [commandCooldown, setCommandCooldown] = useState<number>(5);
  const [commandAlias, setCommandAlias] = useState<string>('');

  const markChanged = () => {
    setHasUnsavedChanges(true);
    setSaveSuccessMessage(null);
  };

  const handleSave = () => {
    setHasUnsavedChanges(false);
    setSaveSuccessMessage('Configurações de Canais Temporários salvas com sucesso!');
    setTimeout(() => {
      setSaveSuccessMessage(null);
    }, 3500);
  };

  const handleDiscard = () => {
    setHasUnsavedChanges(false);
  };

  const handleOpenCreateHub = () => {
    setConfiguringHub(null);
    setIsConfiguringHub(true);
  };

  const handleOpenEditHub = (hub: VoiceHub) => {
    setConfiguringHub(hub);
    setIsConfiguringHub(true);
  };

  const handleSaveHub = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hubName.trim()) return;

    if (editingHubId) {
      setHubs((prev) =>
        prev.map((h) =>
          h.id === editingHubId
            ? {
                ...h,
                name: hubName.trim(),
                generatorChannel: generatorChannel || '➕ Criar Canal',
                category: hubCategory || 'Salas Temporárias',
                channelNameTemplate: channelTemplate || 'Sala de {user}',
                userLimit,
                bitrate,
                autoDeleteEmpty,
              }
            : h
        )
      );
    } else {
      const newHub: VoiceHub = {
        id: `hub-${Date.now()}`,
        name: hubName.trim(),
        generatorChannel: generatorChannel || '➕ Criar Canal',
        category: hubCategory || 'Salas Temporárias',
        channelNameTemplate: channelTemplate || 'Sala de {user}',
        userLimit,
        bitrate,
        autoDeleteEmpty,
        isEnabled: true,
      };
      setHubs((prev) => [...prev, newHub]);
    }

    setIsHubModalOpen(false);
    markChanged();
  };

  const handleDeleteHub = (id: string) => {
    setHubs((prev) => prev.filter((h) => h.id !== id));
    markChanged();
  };

  const handleToggleHub = (id: string) => {
    setHubs((prev) =>
      prev.map((h) => (h.id === id ? { ...h, isEnabled: !h.isEnabled } : h))
    );
    markChanged();
  };

  const handleToggleCommand = (id: string) => {
    setCommands((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isEnabled: !c.isEnabled } : c))
    );
    markChanged();
  };

  const handleOpenEditCommand = (cmd: VoiceCommand) => {
    setEditingCommand(cmd);
    setCommandCooldown(cmd.cooldown);
    setCommandAlias(cmd.alias || '');
  };

  const handleSaveCommandSettings = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCommand) return;

    setCommands((prev) =>
      prev.map((c) =>
        c.id === editingCommand.id
          ? {
              ...c,
              cooldown: commandCooldown,
              alias: commandAlias.trim() || undefined,
            }
          : c
      )
    );
    setEditingCommand(null);
    markChanged();
  };

  if (isConfiguringHub) {
    return (
      <HubConfigPage
        hub={configuringHub}
        currentServer={currentServer}
        onBack={() => {
          setIsConfiguringHub(false);
          setConfiguringHub(null);
        }}
        onSave={(hubData) => {
          if (configuringHub) {
            setHubs((prev) =>
              prev.map((h) => (h.id === configuringHub.id ? { ...h, ...hubData } : h))
            );
          } else {
            const newHub: VoiceHub = {
              id: `hub-${Date.now()}`,
              name: hubData.name || 'Novo Hub de Voz',
              generatorChannel: hubData.generatorChannel || '➕ Criar Canal',
              category: hubData.category || 'Salas Temporárias',
              channelNameTemplate: hubData.channelNameTemplate || '#{index} - Canal de {username}',
              userLimit: hubData.userLimit ?? 5,
              bitrate: hubData.bitrate ?? 64,
              autoDeleteEmpty: hubData.autoDeleteEmpty ?? true,
              isEnabled: true,
            };
            setHubs((prev) => [...prev, newHub]);
          }
          setIsConfiguringHub(false);
          setConfiguringHub(null);
          markChanged();
        }}
      />
    );
  }

  return (
    <div
      className="flex flex-1 overflow-y-auto relative px-6 lg:px-10 py-0 lg:py-10 animate-fadeIn"
      id="dashboard__content"
    >
      <div className="min-h-full w-full max-w-[1540px] mx-auto space-y-6 pb-20">
        {/* Toast Feedback */}
      {saveSuccessMessage && (
        <div className="fixed top-20 right-6 z-50 flex items-center gap-3 bg-emerald-600 text-white px-5 py-3 rounded-xl shadow-2xl border border-emerald-500 animate-in fade-in slide-in-from-top-4 duration-200">
          <Check className="w-5 h-5 shrink-0" />
          <span className="text-sm font-medium">{saveSuccessMessage}</span>
        </div>
      )}

      {/* Header Container matching user snippet */}
      <div className="flex justify-between mb-8 lg:mb-6">
        <div className="flex flex-col grow items-center lg:items-start">
          <div className="bg-dark-800 sm:bg-transparent flex items-center justify-between w-[calc(100%+48px)] sm:w-full px-6 py-4 sm:px-0 sm:py-0 mb-3 sm:mb-0">
            <button
              type="button"
              onClick={onBackToDashboard}
              aria-label="Voltar"
              className="sm:hidden text-dark-100 p-1 hover:bg-dark-700 rounded-lg transition-colors cursor-pointer"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.5 17l-5-5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <h4 className="font-bold text-dark-100 text-2xl flex-1 text-center lg:text-left flex flex-row items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#5865F2]/15 border border-[#5865F2]/30 flex items-center justify-center text-[#70B1FF]">
                <Volume2 className="w-4 h-4" />
              </div>
              Canais Temporários
            </h4>
            <div>
              <DiscordSwitch
                checked={isActive}
                onChange={(val) => {
                  setIsActive(val);
                  markChanged();
                }}
                label={isActive ? 'Ativo' : 'Desativado'}
                activeColor="blurple"
                switchPosition="right"
              />
            </div>
          </div>
          <p className="text-base text-dark-300 max-w-[830px] ml-0 w-full mt-3 text-center sm:text-left">
            Permite que seus membros criem canais de voz temporários em um clique no seu servidor
          </p>
        </div>
      </div>

      {/* Main Feature Cards Container */}
      <div className="flex flex-col gap-4">
        {/* Action Button: Novo Hub */}
        <div
          onClick={handleOpenCreateHub}
          className="bg-dark-800 rounded-lg border border-solid p-6 flex items-center justify-between transition-all duration-200 relative border-brand-default/40 hover:border-brand-default hover:bg-dark-900 cursor-pointer shadow-sm group"
        >
          <p className="text-xl font-semibold text-dark-100 group-hover:text-white transition-colors">
            Novo Hub
          </p>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-brand-default group-hover:scale-115 transition-transform"
          >
            <path d="M6 12h12m-6-6v12" stroke="currentColor" data-stroke="main" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>

        {/* Card: Seus Hubs */}
        <div className="bg-dark-800 shadow-xs sub_feature_card rounded-lg mb-4 border border-dark-700/60" id="plugins.temporary_channels.list.title">
          <h3 className="text-dark-100 flex justify-between items-start hover:text-dark-200 transition-all py-4 lg:py-6 px-6">
            <div className="flex flex-col w-full pr-4 max-w-[760px]">
              <div className="sub_feature_title flex items-center text-lg font-semibold">
                Seus Hubs
              </div>
            </div>
            <div className="flex items-center gap-4">
              <p className="text-right text-xl text-dark-300">
                <span className="text-dark-100 font-bold">{hubs.length}</span>&nbsp;/&nbsp;100
              </p>
            </div>
          </h3>

          <div className="text-base transition-all">
            <div className="p-6 pt-0">
              <div className="grid w-full border-t border-solid border-dark-700 pt-4"></div>

              {hubs.length === 0 ? (
                /* Empty state matching user mockup */
                <div className="mx-auto w-full max-w-xl text-center my-8 py-6 space-y-4">
                  <div className="w-20 h-20 mx-auto rounded-3xl bg-dark-900 border border-dark-700 flex items-center justify-center text-brand-default shadow-inner">
                    <Mic className="w-10 h-10" />
                  </div>
                  <div>
                    <p className="text-dark-200 lg:text-xl text-base font-semibold">
                      Você não tem um Hub ainda.
                    </p>
                    <p className="text-sm text-dark-400 mt-1 max-w-sm mx-auto">
                      Crie um canal de voz mestre (Hub). Quando um membro entrar nele, uma sala privada temporária será criada automaticamente!
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleOpenCreateHub}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-default hover:bg-brand-hover text-dark-900 text-xs font-bold transition-all shadow-sm cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    Criar Meu Primeiro Hub
                  </button>
                </div>
              ) : (
                /* List of configured Hubs */
                <div className="space-y-3 divide-y divide-dark-700/60">
                  {hubs.map((hub) => (
                    <div
                      key={hub.id}
                      className="pt-3 first:pt-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-dark-900 border border-dark-700/60 hover:border-dark-600 transition-colors"
                    >
                      <div className="space-y-1.5 min-w-0">
                        <div className="flex items-center gap-2.5">
                          <span className="font-bold text-sm text-white">{hub.name}</span>
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-dark-800 text-[#70B1FF] border border-dark-700">
                            {hub.generatorChannel}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-dark-400">
                          <span className="flex items-center gap-1">
                            <Folder className="w-3 h-3 text-dark-500" />
                            {hub.category}
                          </span>
                          <span>•</span>
                          <span>Modelo: {hub.channelNameTemplate}</span>
                          <span>•</span>
                          <span>
                            {hub.userLimit === 0 ? 'Sem limite de membros' : `Máx ${hub.userLimit} membros`}
                          </span>
                          <span>•</span>
                          <span>{hub.bitrate} kbps</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 self-end sm:self-center shrink-0">
                        <DiscordSwitch
                          checked={hub.isEnabled}
                          onChange={() => handleToggleHub(hub.id)}
                          activeColor="blurple"
                        />
                        <button
                          type="button"
                          onClick={() => handleOpenEditHub(hub)}
                          className="p-2 rounded-lg bg-dark-800 hover:bg-dark-700 text-dark-300 hover:text-white border border-dark-700 transition-colors cursor-pointer"
                          title="Editar Hub"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteHub(hub.id)}
                          className="p-2 rounded-lg bg-dark-800 hover:bg-dark-700 text-dark-400 hover:text-red-400 border border-dark-700 transition-colors cursor-pointer"
                          title="Excluir Hub"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Card: Comandos */}
        <div className="bg-dark-800 shadow-xs sub_feature_card rounded-lg mt-2 border border-dark-700/60" id="plugins.commands">
          <h3
            onClick={() => setIsCommandsOpen(!isCommandsOpen)}
            className="text-dark-100 flex justify-between items-start hover:text-dark-200 transition-all py-4 lg:py-6 px-6 cursor-pointer select-none"
          >
            <div className="flex flex-col w-full pr-4 max-w-[760px]">
              <div className="sub_feature_title flex items-center text-lg font-semibold">
                Comandos
              </div>
            </div>
            <div className="flex items-center justify-between gap-4">
              <button
                type="button"
                className="pt-1 text-dark-400 hover:text-white transition-colors cursor-pointer"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={`cursor-pointer transition-transform duration-200 ${
                    isCommandsOpen ? 'rotate-180' : ''
                  }`}
                >
                  <path d="M7 14.5l5-5 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </h3>

          {isCommandsOpen && (
            <div className="text-base transition-all">
              <div className="p-6 pt-0">
                <div className="flex flex-col gap-2">
                  {commands.map((cmd) => (
                    <div
                      key={cmd.id}
                      className="flex items-center w-full shadow-xs relative rounded-lg cursor-pointer p-4 sm:p-5 bg-dark-900 border border-solid border-transparent transition-all hover:border-[#5865F2]/40"
                    >
                      <div className="flex flex-col min-w-0 pr-2">
                        <div className="flex items-center gap-2">
                          <h5 className="flex font-mono font-bold text-dark-100 text-sm">
                            {cmd.name}
                          </h5>
                          {cmd.alias && (
                            <span className="text-[11px] text-dark-400 font-mono">
                              ({cmd.alias})
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-dark-300 mt-0.5">{cmd.description}</p>
                      </div>

                      <div className="flex justify-start cursor-pointer gap-2.5 ml-auto items-center shrink-0">
                        <DiscordSwitch
                          checked={cmd.isEnabled}
                          onChange={() => handleToggleCommand(cmd.id)}
                          activeColor="blurple"
                        />
                      </div>

                      {/* Pen / Edit Icon button matching exact user SVG */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenEditCommand(cmd);
                        }}
                        title="Configurar comando"
                        className="relative flex overflow-hidden shrink-0 rounded-lg transition-all duration-200 items-center gap-1.5 bg-white bg-opacity-10 text-white hover:bg-opacity-20 active:bg-opacity-5 active:text-opacity-60 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-opacity-10 ml-4 text-base p-2 cursor-pointer"
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="inline-block"
                        >
                          <path
                            d="M9.31 10.448l4.57-4.57a3 3 0 014.241 4.243l-4.57 4.57a15.501 15.501 0 01-7.2 4.077l-.884.22a.376.376 0 01-.455-.455l.22-.883a15.501 15.501 0 014.078-7.202z"
                            fill="rgba(154,161,181,0.16)"
                          />
                          <path
                            d="M17.25 10.992c-2.121.707-4.95-2.121-4.242-4.242m.871-.871l-4.57 4.57a15.501 15.501 0 00-4.077 7.2l-.22.884a.376.376 0 00.455.455l.883-.22a15.501 15.501 0 007.202-4.078l4.57-4.57a3 3 0 10-4.243-4.241z"
                            stroke="#9B9D9F"
                            strokeWidth="1.5"
                          />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* MODAL: NOVO HUB / EDITAR HUB */}
      {isHubModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-dark-800 border border-dark-700 rounded-2xl shadow-2xl p-6 space-y-5 animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-dark-700/80 pb-3">
              <h3 className="text-base font-bold text-dark-100 flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-[#5865F2]" />
                {editingHubId ? 'Editar Hub de Voz' : 'Novo Hub de Voz'}
              </h3>
              <button
                type="button"
                onClick={() => setIsHubModalOpen(false)}
                className="p-1 rounded-lg text-dark-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveHub} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-dark-300 block mb-1.5 uppercase tracking-wider">
                  Nome do Hub
                </label>
                <input
                  type="text"
                  required
                  value={hubName}
                  onChange={(e) => setHubName(e.target.value)}
                  placeholder="Ex: Hub de Voz Geral, Salas de Jogos"
                  className="w-full bg-dark-900 border border-dark-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#5865F2]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-dark-300 block mb-1.5 uppercase tracking-wider">
                    Canal Gerador (Gatilho)
                  </label>
                  <input
                    type="text"
                    required
                    value={generatorChannel}
                    onChange={(e) => setGeneratorChannel(e.target.value)}
                    placeholder="Ex: ➕ Criar Canal"
                    className="w-full bg-dark-900 border border-dark-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#5865F2]"
                  />
                  <p className="text-[10px] text-dark-400 mt-1">Canal onde o membro clica para criar a sala.</p>
                </div>

                <div>
                  <label className="text-xs font-semibold text-dark-300 block mb-1.5 uppercase tracking-wider">
                    Categoria de Destino
                  </label>
                  <input
                    type="text"
                    required
                    value={hubCategory}
                    onChange={(e) => setHubCategory(e.target.value)}
                    placeholder="Ex: 📁 Salas Temporárias"
                    className="w-full bg-dark-900 border border-dark-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#5865F2]"
                  />
                  <p className="text-[10px] text-dark-400 mt-1">Categoria onde os canais serão criados.</p>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-dark-300 block mb-1.5 uppercase tracking-wider">
                  Modelo do Nome dos Canais Criados
                </label>
                <input
                  type="text"
                  required
                  value={channelTemplate}
                  onChange={(e) => setChannelTemplate(e.target.value)}
                  placeholder="Ex: Sala de {user}, 🎙️ {user}'s Room"
                  className="w-full bg-dark-900 border border-dark-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#5865F2]"
                />
                <div className="flex gap-2 mt-2">
                  <button
                    type="button"
                    onClick={() => setChannelTemplate((prev) => `${prev} {user}`)}
                    className="text-[10px] bg-dark-900 hover:bg-dark-750 text-[#70B1FF] border border-dark-700 px-2 py-0.5 rounded cursor-pointer"
                  >
                    + {'{user}'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setChannelTemplate((prev) => `${prev} #{count}`)}
                    className="text-[10px] bg-dark-900 hover:bg-dark-750 text-[#70B1FF] border border-dark-700 px-2 py-0.5 rounded cursor-pointer"
                  >
                    + {'{count}'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setChannelTemplate((prev) => `${prev} ({game})`)}
                    className="text-[10px] bg-dark-900 hover:bg-dark-750 text-[#70B1FF] border border-dark-700 px-2 py-0.5 rounded cursor-pointer"
                  >
                    + {'{game}'}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-dark-300 block mb-1.5 uppercase tracking-wider">
                    Limite de Membros
                  </label>
                  <select
                    value={userLimit}
                    onChange={(e) => setUserLimit(parseInt(e.target.value, 10) || 0)}
                    className="w-full bg-dark-900 border border-dark-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#5865F2]"
                  >
                    <option value={0}>Sem limite (Ilimitado)</option>
                    <option value={2}>Duo (2 pessoas)</option>
                    <option value={3}>Trio (3 pessoas)</option>
                    <option value={4}>Squad (4 pessoas)</option>
                    <option value={5}>5 pessoas</option>
                    <option value={10}>10 pessoas</option>
                    <option value={20}>20 pessoas</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-dark-300 block mb-1.5 uppercase tracking-wider">
                    Taxa de Bits (Qualidade)
                  </label>
                  <select
                    value={bitrate}
                    onChange={(e) => setBitrate(parseInt(e.target.value, 10) || 96)}
                    className="w-full bg-dark-900 border border-dark-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#5865F2]"
                  >
                    <option value={64}>64 kbps (Econômico)</option>
                    <option value={96}>96 kbps (Padrão Discord)</option>
                    <option value={128}>128 kbps (Alta Qualidade)</option>
                    <option value={256}>256 kbps (Ultra VIP)</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-dark-900 rounded-xl border border-dark-700/60">
                <span className="text-xs text-dark-200">Excluir canal automaticamente quando vazio</span>
                <DiscordSwitch
                  checked={autoDeleteEmpty}
                  onChange={setAutoDeleteEmpty}
                  activeColor="blurple"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-dark-700/80">
                <button
                  type="button"
                  onClick={() => setIsHubModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-dark-300 hover:text-white text-xs font-semibold transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-brand-default hover:bg-brand-hover text-dark-900 text-xs font-bold transition-all shadow-sm cursor-pointer"
                >
                  {editingHubId ? 'Salvar Hub' : 'Criar Hub'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDITAR COMANDO */}
      {editingCommand && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-dark-800 border border-dark-700 rounded-2xl shadow-2xl p-6 space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-dark-700/80 pb-3">
              <h3 className="text-base font-bold text-dark-100 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-brand-default" />
                Configurar {editingCommand.name}
              </h3>
              <button
                type="button"
                onClick={() => setEditingCommand(null)}
                className="p-1 rounded-lg text-dark-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveCommandSettings} className="space-y-4">
              <p className="text-xs text-dark-300">{editingCommand.description}</p>

              <div>
                <label className="text-xs font-semibold text-dark-300 block mb-1.5 uppercase tracking-wider">
                  Cooldown (Tempo de Espera em Segundos)
                </label>
                <input
                  type="number"
                  min={0}
                  max={3600}
                  value={commandCooldown}
                  onChange={(e) => setCommandCooldown(parseInt(e.target.value, 10) || 0)}
                  className="w-full bg-dark-900 border border-dark-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-brand-default"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-dark-300 block mb-1.5 uppercase tracking-wider">
                  Atalho / Alias Alternativo (Opcional)
                </label>
                <input
                  type="text"
                  value={commandAlias}
                  onChange={(e) => setCommandAlias(e.target.value)}
                  placeholder="Ex: /vban, /lock"
                  className="w-full bg-dark-900 border border-dark-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-brand-default"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-dark-700/80">
                <button
                  type="button"
                  onClick={() => setEditingCommand(null)}
                  className="px-4 py-2 rounded-xl text-dark-300 hover:text-white text-xs font-semibold transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-brand-default hover:bg-brand-hover text-dark-900 text-xs font-bold transition-all shadow-sm cursor-pointer"
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Sticky Unsaved Changes Bar */}
      <UnsavedChangesBar
        show={hasUnsavedChanges}
        onSave={handleSave}
        onReset={handleDiscard}
      />
      </div>
    </div>
  );
};
