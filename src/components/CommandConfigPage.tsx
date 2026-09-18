import React, { useState, useRef, useEffect } from 'react';
import {
  ChevronDown,
  ChevronUp,
  Plus,
  X,
  Hash,
  Volume2,
  Lock,
  Search,
  Check,
} from 'lucide-react';

export interface CommandConfig {
  roleMode: 'deny_all_except' | 'allow_all_except';
  selectedRoles: string[];
  channelMode: 'deny_all_except' | 'allow_all_except';
  selectedChannels: string[];
  cooldownType: 'none' | 'server' | 'user';
  cooldownDays: number;
  cooldownHrs: number;
  cooldownMin: number;
  cooldownSec: number;
  responseVisibility: 'public' | 'anonymous' | 'ephemeral';
}

interface CommandConfigPageProps {
  commandName: string;
  onBack: () => void;
  onSave?: (config: CommandConfig) => void;
}

const ROLES_LIST = [
  { id: 'r1', name: 'Proprietário(a)', color: '#2F22DD' },
  { id: 'r2', name: 'Gerenciamento', color: '#2F22DD' },
  { id: 'r3', name: 'Vixe System', color: '#2F22DD' },
  { id: 'r4', name: 'Moderador', color: '#2F22DD' },
  { id: 'r5', name: 'Vixe Studio', color: '#2F22DD' },
  { id: 'r6', name: 'Português', color: '#2F22DD' },
  { id: 'r7', name: 'Inglês', color: '#2F22DD' },
  { id: 'r8', name: 'Ferramentas', color: '#2F22DD' },
  { id: 'r9', name: 'Cliente', color: '#2F22DD' },
  { id: 'r10', name: 'Aluno(a)', color: '#2F22DD' },
];

const CHANNELS_LIST = [
  '🔹・liberar',
  '👋🏻・bem-vindos',
  '🔹・convites',
  '🔹・comunicados',
  '🔹・regras',
  '🔹・sobre-nós',
  '🔹・sorteios',
  '🔹・lançamentos',
  '🔹・recomendações',
  '🔹・comandos',
  '🔹・ferramentas',
  '🔹・parcerias',
  '🔹・análise-parceria',
  '🔹・criar-produtos',
  '🔹・moderator',
  '🔹・log-parcerias-aprovadas',
  '🔹・log-parcerias-reprovadas',
];

export const CommandConfigPage: React.FC<CommandConfigPageProps> = ({
  commandName,
  onBack,
  onSave,
}) => {
  // Collapsible sections
  const [permissionsOpen, setPermissionsOpen] = useState(true);
  const [settingsOpen, setSettingsOpen] = useState(true);

  // Role permissions
  const [roleMode, setRoleMode] = useState<'deny_all_except' | 'allow_all_except'>(
    'deny_all_except'
  );
  const [selectedRoles, setSelectedRoles] = useState<string[]>(['Moderador', 'Vixe System']);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const roleDropdownRef = useRef<HTMLDivElement>(null);

  // Channel permissions
  const [channelMode, setChannelMode] = useState<'deny_all_except' | 'allow_all_except'>(
    'allow_all_except'
  );
  const [selectedChannels, setSelectedChannels] = useState<string[]>([
    '🔹・comandos',
    '🔹・ferramentas',
  ]);
  const [channelDropdownOpen, setChannelDropdownOpen] = useState(false);
  const channelDropdownRef = useRef<HTMLDivElement>(null);

  // Cooldown
  const [cooldownType, setCooldownType] = useState<'none' | 'server' | 'user'>('server');
  const [cooldownDays, setCooldownDays] = useState(0);
  const [cooldownHrs, setCooldownHrs] = useState(0);
  const [cooldownMin, setCooldownMin] = useState(0);
  const [cooldownSec, setCooldownSec] = useState(5);

  // Visibility
  const [visibility, setVisibility] = useState<'public' | 'anonymous' | 'ephemeral'>('public');

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        roleDropdownRef.current &&
        !roleDropdownRef.current.contains(event.target as Node)
      ) {
        setRoleDropdownOpen(false);
      }
      if (
        channelDropdownRef.current &&
        !channelDropdownRef.current.contains(event.target as Node)
      ) {
        setChannelDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleRole = (roleName: string) => {
    setSelectedRoles((prev) =>
      prev.includes(roleName) ? prev.filter((r) => r !== roleName) : [...prev, roleName]
    );
  };

  const addAllRoles = () => {
    setSelectedRoles(ROLES_LIST.map((r) => r.name));
  };

  const toggleChannel = (channelName: string) => {
    setSelectedChannels((prev) =>
      prev.includes(channelName)
        ? prev.filter((c) => c !== channelName)
        : [...prev, channelName]
    );
  };

  const addAllChannels = () => {
    setSelectedChannels([...CHANNELS_LIST]);
  };

  const handleSave = () => {
    if (onSave) {
      onSave({
        roleMode,
        selectedRoles,
        channelMode,
        selectedChannels,
        cooldownType,
        cooldownDays,
        cooldownHrs,
        cooldownMin,
        cooldownSec,
        responseVisibility: visibility,
      });
    }
    onBack();
  };

  return (
    <div
      className="flex flex-1 overflow-y-auto relative px-6 lg:px-10 py-0 lg:py-10 animate-fadeIn"
      id="dashboard__content"
    >
      <div className="min-h-full w-full max-w-[1540px] mx-auto">
        <div className="w-full min-h-full transition-all flex flex-col opacity-100">
          <div>
            {/* Top Bar with Title and Actions */}
            <div className="flex flex-row justify-between items-center mb-8">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={onBack}
                  className="p-2 rounded-lg bg-dark-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                  title="Voltar"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-zinc-400"
                  >
                    <path
                      d="M14.5 17l-5-5 5-5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <h4 className="font-bold text-white text-xl lg:text-2xl flex items-center">
                  Editar {commandName}
                </h4>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={onBack}
                  className="relative flex overflow-hidden shrink-0 rounded-lg transition-all duration-200 items-center gap-1.5 bg-white bg-opacity-10 text-white hover:bg-opacity-20 active:bg-opacity-5 px-4 py-2 text-sm font-medium cursor-pointer"
                >
                  <span>Descartar</span>
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="relative flex overflow-hidden shrink-0 rounded-lg transition-all duration-200 items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 text-sm font-semibold shadow cursor-pointer"
                >
                  <span>Salvar e Fechar</span>
                </button>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={(e) => { e.preventDefault(); handleSave(); }} className="max-sm:mb-[120px] space-y-6">
              {/* SECTION 1: PERMISSÕES */}
              <div
                className="bg-dark-800 shadow-xs sub_feature_card rounded-xl border border-zinc-800/80 overflow-hidden"
                id="command.config.permissions"
              >
                <h3
                  onClick={() => setPermissionsOpen(!permissionsOpen)}
                  className="text-white flex justify-between items-center hover:bg-zinc-800/40 transition-all py-4 lg:py-5 px-6 cursor-pointer select-none"
                >
                  <div className="flex flex-col w-full pr-4 max-w-[760px]">
                    <div className="sub_feature_title flex items-center text-lg font-semibold text-white">
                      Permissões
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <button
                      type="button"
                      className="p-1 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                    >
                      {permissionsOpen ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </h3>

                {permissionsOpen && (
                  <div className="text-base transition-all">
                    <div className="p-6 pt-0 border-t border-zinc-800/60 mt-2">
                      {/* Permissões do cargo */}
                      <p className="text-zinc-100 text-base mb-3 font-semibold pt-4">
                        Permissões do cargo
                      </p>

                      <div className="space-y-3">
                        {/* Radio 1: Negar para todos os cargos exceto */}
                        <div
                          onClick={() => setRoleMode('deny_all_except')}
                          className="flex items-center gap-3 cursor-pointer select-none"
                        >
                          <div
                            className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                              roleMode === 'deny_all_except'
                                ? 'border-indigo-500 bg-indigo-600'
                                : 'border-zinc-600 bg-dark-700'
                            }`}
                          >
                            {roleMode === 'deny_all_except' && (
                              <div className="w-2 h-2 rounded-full bg-white" />
                            )}
                          </div>
                          <p className="text-sm text-zinc-200">
                            Negar para todos os cargos exceto
                          </p>
                        </div>

                        {/* Role Selector Box with Dropdown */}
                        <div className="relative w-full max-w-2xl" ref={roleDropdownRef}>
                          <div
                            onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                            className="rounded-lg bg-dark-900 min-h-[50px] flex items-center justify-between border border-zinc-700 px-3 py-2 cursor-pointer hover:border-zinc-600 transition-colors"
                          >
                            <div className="flex items-center gap-2 flex-wrap">
                              {selectedRoles.length === 0 ? (
                                <div className="flex items-center gap-2 text-zinc-400 text-sm">
                                  <Plus className="w-4 h-4 text-zinc-400" />
                                  <span>Selecione um cargo</span>
                                </div>
                              ) : (
                                selectedRoles.map((roleName) => (
                                  <span
                                    key={roleName}
                                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-800 border border-zinc-700 text-xs text-white font-medium"
                                  >
                                    <span
                                      className="w-2 h-2 rounded-full"
                                      style={{ backgroundColor: '#2F22DD' }}
                                    />
                                    <span>{roleName}</span>
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        toggleRole(roleName);
                                      }}
                                      className="text-zinc-400 hover:text-white"
                                    >
                                      <X className="w-3 h-3" />
                                    </button>
                                  </span>
                                ))
                              )}
                            </div>
                            <ChevronDown className="w-4 h-4 text-zinc-400 shrink-0 ml-2" />
                          </div>

                          {roleDropdownOpen && (
                            <div className="absolute left-0 top-full mt-1 z-30 w-full rounded-xl bg-dark-900 border border-zinc-700 shadow-xl max-h-[300px] overflow-y-auto p-2 animate-fadeIn">
                              <ul>
                                <li
                                  onClick={addAllRoles}
                                  className="flex p-2.5 rounded-lg items-center text-zinc-200 text-sm font-medium hover:bg-zinc-800 transition-colors cursor-pointer"
                                >
                                  <Plus className="w-4 h-4 mr-2 text-zinc-400" />
                                  Adicionar todos os cargos
                                </li>
                              </ul>
                              <ul className="border-t border-zinc-800 pt-2 mt-2 space-y-1">
                                {ROLES_LIST.map((role) => {
                                  const isSelected = selectedRoles.includes(role.name);
                                  return (
                                    <li
                                      key={role.id}
                                      onClick={() => toggleRole(role.name)}
                                      className={`p-2.5 rounded-lg text-sm cursor-pointer flex items-center justify-between transition-colors ${
                                        isSelected
                                          ? 'bg-zinc-800 text-white font-semibold'
                                          : 'text-zinc-300 hover:bg-zinc-800/60'
                                      }`}
                                    >
                                      <div className="flex items-center gap-2">
                                        <span
                                          className="w-2.5 h-2.5 rounded-full"
                                          style={{ backgroundColor: role.color }}
                                        />
                                        <span>{role.name}</span>
                                      </div>
                                      {isSelected && <Check className="w-4 h-4 text-indigo-400" />}
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>
                          )}
                        </div>

                        {/* Radio 2: Permitir para todos os cargos exceto */}
                        <div
                          onClick={() => setRoleMode('allow_all_except')}
                          className="flex items-center gap-3 cursor-pointer select-none pt-1"
                        >
                          <div
                            className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                              roleMode === 'allow_all_except'
                                ? 'border-indigo-500 bg-indigo-600'
                                : 'border-zinc-600 bg-dark-700'
                            }`}
                          >
                            {roleMode === 'allow_all_except' && (
                              <div className="w-2 h-2 rounded-full bg-white" />
                            )}
                          </div>
                          <p className="text-sm text-zinc-200">
                            Permitir para todos os cargos exceto
                          </p>
                        </div>
                      </div>

                      {/* Divider */}
                      <div className="my-6 border-t border-zinc-800/60" />

                      {/* Permissões do canal */}
                      <p className="text-zinc-100 text-base mb-3 font-semibold">
                        Permissões do canal
                      </p>

                      <div className="space-y-3">
                        {/* Radio 1: Negar para todos os canais exceto */}
                        <div
                          onClick={() => setChannelMode('deny_all_except')}
                          className="flex items-center gap-3 cursor-pointer select-none"
                        >
                          <div
                            className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                              channelMode === 'deny_all_except'
                                ? 'border-indigo-500 bg-indigo-600'
                                : 'border-zinc-600 bg-dark-700'
                            }`}
                          >
                            {channelMode === 'deny_all_except' && (
                              <div className="w-2 h-2 rounded-full bg-white" />
                            )}
                          </div>
                          <p className="text-sm text-zinc-200">
                            Negar para todos os canais exceto
                          </p>
                        </div>

                        {/* Radio 2: Permitir para todos os canais exceto */}
                        <div
                          onClick={() => setChannelMode('allow_all_except')}
                          className="flex items-center gap-3 cursor-pointer select-none"
                        >
                          <div
                            className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                              channelMode === 'allow_all_except'
                                ? 'border-indigo-500 bg-indigo-600'
                                : 'border-zinc-600 bg-dark-700'
                            }`}
                          >
                            {channelMode === 'allow_all_except' && (
                              <div className="w-2 h-2 rounded-full bg-white" />
                            )}
                          </div>
                          <p className="text-sm text-zinc-200">
                            Permitir para todos os canais exceto
                          </p>
                        </div>

                        {/* Channel Selector Box with Checkboxes */}
                        <div className="relative w-full max-w-2xl" ref={channelDropdownRef}>
                          <div
                            onClick={() => setChannelDropdownOpen(!channelDropdownOpen)}
                            className="rounded-lg bg-dark-900 min-h-[50px] flex items-center justify-between border border-zinc-700 px-3 py-2 cursor-pointer hover:border-zinc-600 transition-colors"
                          >
                            <div className="flex items-center gap-2 flex-wrap">
                              {selectedChannels.length === 0 ? (
                                <div className="flex items-center gap-2 text-zinc-400 text-sm">
                                  <Plus className="w-4 h-4 text-zinc-400" />
                                  <span>Selecione um canal</span>
                                </div>
                              ) : (
                                selectedChannels.map((channelName) => (
                                  <span
                                    key={channelName}
                                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-800 border border-zinc-700 text-xs text-white font-medium"
                                  >
                                    <Hash className="w-3 h-3 text-zinc-400" />
                                    <span>{channelName}</span>
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        toggleChannel(channelName);
                                      }}
                                      className="text-zinc-400 hover:text-white"
                                    >
                                      <X className="w-3 h-3" />
                                    </button>
                                  </span>
                                ))
                              )}
                            </div>
                            <ChevronDown className="w-4 h-4 text-zinc-400 shrink-0 ml-2" />
                          </div>

                          {channelDropdownOpen && (
                            <div className="absolute left-0 top-full mt-1 z-30 w-full rounded-xl bg-dark-900 border border-zinc-700 shadow-xl max-h-[320px] overflow-y-auto p-3 animate-fadeIn">
                              <div className="border-b border-zinc-800 pb-2 mb-2">
                                <p className="uppercase text-zinc-400 font-bold text-xs px-2 mb-1.5">
                                  Opções
                                </p>
                                <button
                                  type="button"
                                  onClick={addAllChannels}
                                  className="w-full flex p-2 rounded-lg items-center text-zinc-200 text-sm font-medium hover:bg-zinc-800 transition-colors text-left cursor-pointer"
                                >
                                  <Plus className="w-4 h-4 mr-2 text-zinc-400" />
                                  Adicionar todos os canais
                                </button>
                              </div>

                              <div>
                                <p className="uppercase text-zinc-400 font-bold text-xs px-2 mb-1">
                                  Canais ({CHANNELS_LIST.length})
                                </p>
                                <div className="space-y-1">
                                  {CHANNELS_LIST.map((chan) => {
                                    const isChecked = selectedChannels.includes(chan);
                                    return (
                                      <div
                                        key={chan}
                                        onClick={() => toggleChannel(chan)}
                                        className="flex items-center justify-between p-2 rounded-lg hover:bg-zinc-800 cursor-pointer transition-colors"
                                      >
                                        <div className="flex items-center text-sm text-zinc-200">
                                          <div
                                            className={`w-4 h-4 rounded border mr-2.5 flex items-center justify-center transition-colors ${
                                              isChecked
                                                ? 'bg-indigo-600 border-indigo-500'
                                                : 'border-zinc-600 bg-dark-700'
                                            }`}
                                          >
                                            {isChecked && (
                                              <Check className="w-3 h-3 text-white" />
                                            )}
                                          </div>
                                          <span>{chan}</span>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* SECTION 2: CONFIGURAÇÕES ADICIONAIS */}
              <div
                className="bg-dark-800 shadow-xs sub_feature_card rounded-xl border border-zinc-800/80 overflow-hidden"
                id="command.config.settings"
              >
                <h3
                  onClick={() => setSettingsOpen(!settingsOpen)}
                  className="text-white flex justify-between items-center hover:bg-zinc-800/40 transition-all py-4 lg:py-5 px-6 cursor-pointer select-none"
                >
                  <div className="flex flex-col w-full pr-4 max-w-[760px]">
                    <div className="sub_feature_title flex items-center text-lg font-semibold text-white">
                      Configurações adicionais
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <button
                      type="button"
                      className="p-1 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                    >
                      {settingsOpen ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </h3>

                {settingsOpen && (
                  <div className="text-base transition-all">
                    <div className="p-6 pt-0 border-t border-zinc-800/60 mt-2">
                      {/* Tempo de Espera */}
                      <p className="text-zinc-100 text-base mb-3 font-semibold pt-4">
                        Tempo de Espera
                      </p>

                      {/* Segmented control: Nenhum / Servidor / Usuário */}
                      <div className="flex w-full justify-start mb-4">
                        <div className="bg-dark-900 select-none p-1 rounded-xl flex items-center gap-1 border border-zinc-700/80">
                          {(['none', 'server', 'user'] as const).map((type) => {
                            const label =
                              type === 'none'
                                ? 'Nenhum'
                                : type === 'server'
                                ? 'Servidor'
                                : 'Usuário';
                            const isActive = cooldownType === type;
                            return (
                              <button
                                key={type}
                                type="button"
                                onClick={() => setCooldownType(type)}
                                className={`cursor-pointer rounded-lg py-2 px-5 text-xs font-semibold uppercase tracking-wider transition-all ${
                                  isActive
                                    ? 'bg-zinc-700 text-white shadow'
                                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                                }`}
                              >
                                {label}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Time Stepper Inputs (days, hrs, min, sec) */}
                      {cooldownType !== 'none' && (
                        <div className="flex items-start gap-2.5 mb-6">
                          {/* Days */}
                          <div className="flex items-center justify-center flex-col text-white gap-1 select-none">
                            <button
                              type="button"
                              onClick={() => setCooldownDays((prev) => Math.min(364, prev + 1))}
                              className="p-1 text-zinc-400 hover:text-white"
                            >
                              <ChevronUp className="w-4 h-4" />
                            </button>
                            <div className="bg-dark-900 rounded-lg h-[60px] w-[54px] text-center flex items-center justify-center flex-col border border-zinc-700">
                              <input
                                className="text-lg text-center font-bold text-white bg-transparent outline-none w-[44px]"
                                max="364"
                                min="0"
                                type="number"
                                value={cooldownDays}
                                onChange={(e) =>
                                  setCooldownDays(Math.max(0, parseInt(e.target.value) || 0))
                                }
                              />
                              <p className="uppercase text-[10px] text-zinc-400 font-semibold">
                                days
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => setCooldownDays((prev) => Math.max(0, prev - 1))}
                              className="p-1 text-zinc-400 hover:text-white"
                            >
                              <ChevronDown className="w-4 h-4" />
                            </button>
                          </div>

                          {/* Hours */}
                          <div className="flex items-center justify-center flex-col text-white gap-1 select-none">
                            <button
                              type="button"
                              onClick={() => setCooldownHrs((prev) => Math.min(23, prev + 1))}
                              className="p-1 text-zinc-400 hover:text-white"
                            >
                              <ChevronUp className="w-4 h-4" />
                            </button>
                            <div className="bg-dark-900 rounded-lg h-[60px] w-[54px] text-center flex items-center justify-center flex-col border border-zinc-700">
                              <input
                                className="text-lg text-center font-bold text-white bg-transparent outline-none w-[44px]"
                                max="23"
                                min="0"
                                type="number"
                                value={cooldownHrs}
                                onChange={(e) =>
                                  setCooldownHrs(Math.max(0, parseInt(e.target.value) || 0))
                                }
                              />
                              <p className="uppercase text-[10px] text-zinc-400 font-semibold">
                                hrs
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => setCooldownHrs((prev) => Math.max(0, prev - 1))}
                              className="p-1 text-zinc-400 hover:text-white"
                            >
                              <ChevronDown className="w-4 h-4" />
                            </button>
                          </div>

                          {/* Minutes */}
                          <div className="flex items-center justify-center flex-col text-white gap-1 select-none">
                            <button
                              type="button"
                              onClick={() => setCooldownMin((prev) => Math.min(59, prev + 1))}
                              className="p-1 text-zinc-400 hover:text-white"
                            >
                              <ChevronUp className="w-4 h-4" />
                            </button>
                            <div className="bg-dark-900 rounded-lg h-[60px] w-[54px] text-center flex items-center justify-center flex-col border border-zinc-700">
                              <input
                                className="text-lg text-center font-bold text-white bg-transparent outline-none w-[44px]"
                                max="59"
                                min="0"
                                type="number"
                                value={cooldownMin}
                                onChange={(e) =>
                                  setCooldownMin(Math.max(0, parseInt(e.target.value) || 0))
                                }
                              />
                              <p className="uppercase text-[10px] text-zinc-400 font-semibold">
                                min
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => setCooldownMin((prev) => Math.max(0, prev - 1))}
                              className="p-1 text-zinc-400 hover:text-white"
                            >
                              <ChevronDown className="w-4 h-4" />
                            </button>
                          </div>

                          {/* Seconds */}
                          <div className="flex items-center justify-center flex-col text-white gap-1 select-none">
                            <button
                              type="button"
                              onClick={() => setCooldownSec((prev) => Math.min(59, prev + 1))}
                              className="p-1 text-zinc-400 hover:text-white"
                            >
                              <ChevronUp className="w-4 h-4" />
                            </button>
                            <div className="bg-dark-900 rounded-lg h-[60px] w-[54px] text-center flex items-center justify-center flex-col border border-zinc-700">
                              <input
                                className="text-lg text-center font-bold text-white bg-transparent outline-none w-[44px]"
                                max="59"
                                min="0"
                                type="number"
                                value={cooldownSec}
                                onChange={(e) =>
                                  setCooldownSec(Math.max(0, parseInt(e.target.value) || 0))
                                }
                              />
                              <p className="uppercase text-[10px] text-zinc-400 font-semibold">
                                sec
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => setCooldownSec((prev) => Math.max(0, prev - 1))}
                              className="p-1 text-zinc-400 hover:text-white"
                            >
                              <ChevronDown className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Response Visibility */}
                      <div className="mt-6">
                        <p className="text-zinc-100 text-base mb-3 font-semibold">
                          Response visibility
                        </p>
                        <div className="grid grid-cols-1 gap-3">
                          {/* Option 1: Public */}
                          <div
                            onClick={() => setVisibility('public')}
                            className="flex items-start gap-3 cursor-pointer select-none"
                          >
                            <div
                              className={`min-w-[1.25rem] min-h-[1.25rem] w-5 h-5 rounded-full border flex items-center justify-center mt-0.5 transition-colors ${
                                visibility === 'public'
                                  ? 'border-indigo-500 bg-indigo-600'
                                  : 'border-zinc-600 bg-dark-700'
                              }`}
                            >
                              {visibility === 'public' && (
                                <div className="w-2 h-2 rounded-full bg-white" />
                              )}
                            </div>
                            <div>
                              <p className="text-white text-sm font-semibold mb-0.5">
                                Public
                              </p>
                              <p className="text-zinc-400 text-xs leading-relaxed">
                                The answer is posted in the channel, and Discord shows who used the command.
                              </p>
                            </div>
                          </div>

                          {/* Option 2: Public, anonymous */}
                          <div
                            onClick={() => setVisibility('anonymous')}
                            className="flex items-start gap-3 cursor-pointer select-none"
                          >
                            <div
                              className={`min-w-[1.25rem] min-h-[1.25rem] w-5 h-5 rounded-full border flex items-center justify-center mt-0.5 transition-colors ${
                                visibility === 'anonymous'
                                  ? 'border-indigo-500 bg-indigo-600'
                                  : 'border-zinc-600 bg-dark-700'
                              }`}
                            >
                              {visibility === 'anonymous' && (
                                <div className="w-2 h-2 rounded-full bg-white" />
                              )}
                            </div>
                            <div>
                              <p className="text-white text-sm font-semibold mb-0.5">
                                Public, anonymous
                              </p>
                              <p className="text-zinc-400 text-xs leading-relaxed">
                                The answer is posted in the channel as a normal message, so nobody can see who ran the command. The person who ran the command gets an ephemeral confirmation only they can see.
                              </p>
                            </div>
                          </div>

                          {/* Option 3: Private (ephemeral) */}
                          <div
                            onClick={() => setVisibility('ephemeral')}
                            className="flex items-start gap-3 cursor-pointer select-none"
                          >
                            <div
                              className={`min-w-[1.25rem] min-h-[1.25rem] w-5 h-5 rounded-full border flex items-center justify-center mt-0.5 transition-colors ${
                                visibility === 'ephemeral'
                                  ? 'border-indigo-500 bg-indigo-600'
                                  : 'border-zinc-600 bg-dark-700'
                              }`}
                            >
                              {visibility === 'ephemeral' && (
                                <div className="w-2 h-2 rounded-full bg-white" />
                              )}
                            </div>
                            <div>
                              <p className="text-white text-sm font-semibold mb-0.5">
                                Private (ephemeral)
                              </p>
                              <p className="text-zinc-400 text-xs leading-relaxed">
                                The answer is an ephemeral message, visible only to the person who ran the command. Nothing is posted in the channel.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Discord Message Preview */}
                      <div className="mt-8">
                        <p className="text-zinc-100 text-base mb-3 font-semibold">
                          Visibilidade
                        </p>
                        <div className="bg-[#2E3036] px-5 py-5 rounded-xl max-w-xl grid grid-cols-1 gap-4 select-none border border-[#202225]">
                          {/* User Message */}
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 min-w-[40px] rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold text-sm">
                              🐕
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <p className="text-[#5865F2] font-semibold text-sm">
                                  Doggo Doggovich
                                </p>
                                <p className="text-xs text-[#72767D]">Hoje às 03:50</p>
                              </div>
                              <p className="text-[#DCDDDE] text-sm mt-0.5 font-mono">
                                {commandName}
                              </p>
                            </div>
                          </div>

                          {/* Bot Response */}
                          <div className="flex items-start gap-3">
                            <img
                              src="https://cdn.discordapp.com/embed/avatars/0.png"
                              alt="Bot"
                              className="w-10 h-10 min-w-[40px] rounded-full object-cover"
                            />
                            <div>
                              <div className="flex items-center gap-2">
                                <p className="text-white font-semibold text-sm">vixestudio</p>
                                <div className="text-[10px] text-white bg-[#5865F2] rounded px-1.5 py-0.5 font-bold flex items-center gap-1">
                                  BOT
                                </div>
                                <p className="text-xs text-[#72767D]">Hoje às 03:50</p>
                              </div>
                              <p className="text-[#DCDDDE] text-sm mt-0.5">
                                {visibility === 'ephemeral'
                                  ? 'Apenas você pode ver esta resposta efêmera.'
                                  : 'Comando executado com sucesso no canal!'}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
