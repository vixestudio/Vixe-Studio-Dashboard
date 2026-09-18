import React, { useState } from 'react';
import {
  Gift,
  Plus,
  ChevronDown,
  ChevronUp,
  Clock,
  Users,
  Trophy,
  Trash2,
  RotateCw,
  Check,
  Sparkles,
  ArrowLeft,
  Settings2,
  Sliders,
  Calendar,
  X,
  Radio,
  Tag,
} from 'lucide-react';
import { ServerInfo } from '../types';
import { CreateGiveawayView } from './CreateGiveawayView';

interface Giveaway {
  id: string;
  prize: string;
  description: string;
  channel: string;
  winnersCount: number;
  participantsCount: number;
  roleRequirement?: string;
  status: 'active' | 'ended';
  endsAt: string;
  winnerNames?: string[];
}

interface GiveawaysViewProps {
  currentServer: ServerInfo;
  onBackToDashboard: () => void;
}

export const GiveawaysView: React.FC<GiveawaysViewProps> = ({
  currentServer,
  onBackToDashboard,
}) => {
  const [isPluginActive, setIsPluginActive] = useState(true);
  const [isCommandsOpen, setIsCommandsOpen] = useState(true);
  const [isRerollActive, setIsRerollActive] = useState(true);
  const [isCreatingGiveaway, setIsCreatingGiveaway] = useState(false);
  const [showRerollConfig, setShowRerollConfig] = useState(false);

  // Giveaways list state (inicia sem dados pré-preenchidos)
  const [giveaways, setGiveaways] = useState<Giveaway[]>([]);

  const handlePublishGiveaway = (data: any) => {
    const newGiveaway: Giveaway = {
      id: `gw-${Date.now()}`,
      prize: data.prize,
      description: data.title || 'Reaja com 🎉 para concorrer!',
      channel: data.channel || '🔹・sorteios',
      winnersCount: Number(data.winnersCount) || 1,
      participantsCount: 0,
      status: 'active',
      endsAt: data.endDate || 'Em 24 horas',
    };

    setGiveaways([newGiveaway, ...giveaways]);
    setIsCreatingGiveaway(false);
  };

  const handleEndGiveaway = (id: string) => {
    setGiveaways((prev) =>
      prev.map((g) =>
        g.id === id
          ? {
              ...g,
              status: 'ended',
              winnerNames: ['@kaio_dev', '@mari_pixel'].slice(0, g.winnersCount),
              endsAt: 'Finalizado agora',
            }
          : g
      )
    );
  };

  const handleReroll = (id: string) => {
    const mockWinners = [
      '@pedro_vixe',
      '@ana_gamer',
      '@lucas_tech',
      '@bia_art',
      '@thiago_99',
      '@carol_streamer',
    ];
    const picked: string[] = [];
    for (let i = 0; i < 2; i++) {
      const randomWinner = mockWinners[Math.floor(Math.random() * mockWinners.length)];
      if (!picked.includes(randomWinner)) {
        picked.push(randomWinner);
      }
    }

    setGiveaways((prev) =>
      prev.map((g) =>
        g.id === id
          ? {
              ...g,
              winnerNames: picked.slice(0, g.winnersCount),
            }
          : g
      )
    );
  };

  const handleDeleteGiveaway = (id: string) => {
    setGiveaways((prev) => prev.filter((g) => g.id !== id));
  };

  if (isCreatingGiveaway) {
    return (
      <CreateGiveawayView
        currentServer={currentServer}
        onBack={() => setIsCreatingGiveaway(false)}
        onSave={handlePublishGiveaway}
      />
    );
  }

  return (
    <div
      className="flex flex-1 overflow-y-auto relative px-3 sm:px-6 lg:px-10 py-0 lg:py-6 animate-fadeIn"
      id="dashboard__content"
    >
      <div className="min-h-full w-full max-w-[1540px] mx-auto">
        <div className="w-full min-h-full transition-all flex flex-col opacity-100">
          {/* Header Section */}
          <div className="flex justify-between mb-8 lg:mb-6">
            <div className="flex flex-col grow items-center lg:items-start">
              <div className="bg-dark-800 sm:bg-transparent flex items-center justify-between w-[calc(100%+24px)] -mx-3 sm:mx-0 sm:w-full px-6 py-4 sm:px-0 sm:py-0 mb-3 sm:mb-0 rounded-2xl sm:rounded-none">
                <button
                  onClick={onBackToDashboard}
                  className="sm:hidden p-1.5 -ml-2 rounded-lg text-dark-300 hover:text-white hover:bg-dark-700 transition-colors"
                  title="Voltar ao Painel"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <h4 className="font-bold text-dark-100 text-h5 flex-1 text-center lg:text-left flex flex-row items-center gap-2">
                  <Gift className="w-6 h-6 text-brand-default hidden sm:inline-block" />
                  <span>Sorteios</span>
                </h4>
                <div>
                  <div className="flex justify-start cursor-pointer gap-2.5 items-center">
                    <div className="flex justify-start cursor-pointer gap-2.5 items-center flex-row-reverse">
                      <div
                        onClick={() => setIsPluginActive(!isPluginActive)}
                        className={`shrink-0 rounded-full transition-all duration-200 overflow-hidden relative cursor-pointer h-[28px] w-[56px] ${
                          isPluginActive ? 'bg-brand-default' : 'bg-dark-700'
                        }`}
                      >
                        <div className="absolute left-0 top-0 w-full h-full flex items-center justify-start px-1.5 pointer-events-none">
                          <div
                            className={`text-xs font-semibold ${
                              isPluginActive ? 'text-dark-900' : 'text-dark-400'
                            }`}
                            translate="no"
                          >
                            {isPluginActive ? 'ON' : 'OFF'}
                          </div>
                        </div>
                        <div
                          className={`rounded-full top-1 absolute transition-all duration-200 transform flex items-center justify-center bg-grey-100 h-5 w-5 shadow-sm ${
                            isPluginActive ? 'translate-x-8' : 'translate-x-1'
                          }`}
                        >
                          <div
                            className={`h-2 w-2 rounded-full transition-all duration-200 ${
                              isPluginActive ? 'bg-brand-default' : 'bg-dark-500'
                            }`}
                          />
                        </div>
                      </div>
                      <label
                        onClick={() => setIsPluginActive(!isPluginActive)}
                        className="select-none cursor-pointer flex flex-col gap-0.5"
                      >
                        <div className="text-dark-100 text-base">
                          <p className="text-sm text-dark-100 hidden md:inline-block font-medium">
                            {isPluginActive ? 'Ativo' : 'Desativado'}
                          </p>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-base text-dark-300 max-w-[830px] ml-0 w-full mt-3 text-center sm:text-left">
                Inicie sorteios e loterias em seu servidor com apenas um clique
              </p>
            </div>
          </div>

          {/* Body Content Grid */}
          <div className="grid grid-cols-1 gap-5 max-sm:mb-[120px]">
            {/* 1. "Novo sorteio" Action Card */}
            <div
              onClick={() => setIsCreatingGiveaway(true)}
              className="bg-dark-800 rounded-2xl border border-solid border-brand-default/60 p-6 flex items-center justify-between transition-all duration-200 cursor-pointer hover:bg-dark-900 hover:border-brand-hover shadow-xs group"
            >
              <div>
                <p className="text-dark-100 text-xl font-bold">Novo sorteio</p>
                <p className="text-xs text-dark-400">
                  Defina o prêmio, canal, tempo e número de ganhadores
                </p>
              </div>
              <div className="p-2 rounded-xl bg-dark-700/80 text-dark-300 group-hover:text-white transition-colors">
                <Plus className="w-5 h-5" />
              </div>
            </div>

            {/* 2. "Seus sorteios" Card */}
            <div className="bg-dark-800 p-6 rounded-2xl border border-dark-700/60 shadow-xs space-y-6">
              <header className="border-b border-solid border-dark-700 pb-5 grid-cols-2 grid gap-6 items-center">
                <div className="flex items-center gap-2">
                  <p className="text-dark-100 text-xl font-bold">Seus sorteios</p>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-dark-700 text-dark-300 font-semibold">
                    {giveaways.filter((g) => g.status === 'active').length} em andamento
                  </span>
                </div>
                <p className="text-right text-xl text-dark-300 font-medium">
                  <span className="text-white font-bold">{giveaways.length}</span>&nbsp;/&nbsp;100
                </p>
              </header>

              {giveaways.length === 0 ? (
                <div className="mx-auto w-full max-w-xl text-center my-8 py-6">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-dark-900 border border-dark-700 flex items-center justify-center text-dark-400">
                    <Gift className="w-10 h-10 text-dark-400" />
                  </div>
                  <p className="text-dark-300 lg:text-xl text-base font-semibold mb-2">
                    Você não tem sorteios ainda.
                  </p>
                  <p className="text-xs text-dark-400 mb-6 max-w-md mx-auto">
                    Crie sorteios automáticos para engajar os membros do {currentServer.name} com recompensas e cargos especiais.
                  </p>
                  <button
                    onClick={() => setIsCreatingGiveaway(true)}
                    className="px-5 py-2.5 rounded-xl bg-brand-default text-dark-900 font-bold text-xs hover:bg-white transition-colors cursor-pointer inline-flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Criar Primeiro Sorteio</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {giveaways.map((gw) => (
                    <div
                      key={gw.id}
                      className="p-5 rounded-xl bg-dark-900 border border-dark-700 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all hover:border-dark-600"
                    >
                      <div className="space-y-1.5 flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span
                            className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${
                              gw.status === 'active'
                                ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/60'
                                : 'bg-dark-700 text-dark-400 border border-dark-600'
                            }`}
                          >
                            {gw.status === 'active' ? '● Em Andamento' : '✓ Encerrado'}
                          </span>
                          <span className="font-bold text-white text-base truncate">
                            {gw.prize}
                          </span>
                        </div>

                        <p className="text-xs text-dark-300 line-clamp-1">{gw.description}</p>

                        <div className="flex items-center gap-4 text-xs text-dark-400 flex-wrap pt-1">
                          <span className="flex items-center gap-1 text-violet-400 font-medium">
                            <Tag className="w-3.5 h-3.5" />
                            {gw.channel}
                          </span>
                          <span className="flex items-center gap-1">
                            <Trophy className="w-3.5 h-3.5 text-amber-400" />
                            {gw.winnersCount} {gw.winnersCount === 1 ? 'vencedor' : 'vencedores'}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="w-3.5 h-3.5 text-dark-300" />
                            {gw.participantsCount} participantes
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-dark-300" />
                            {gw.endsAt}
                          </span>
                          {gw.roleRequirement && (
                            <span className="text-[11px] px-2 py-0.5 rounded bg-dark-800 text-dark-300 border border-dark-700">
                              Cargo: @{gw.roleRequirement}
                            </span>
                          )}
                        </div>

                        {gw.winnerNames && gw.winnerNames.length > 0 && (
                          <div className="pt-2 flex items-center gap-2 text-xs">
                            <span className="text-emerald-400 font-semibold">Ganhadores:</span>
                            <div className="flex items-center gap-1.5 flex-wrap">
                              {gw.winnerNames.map((w, idx) => (
                                <span
                                  key={idx}
                                  className="px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800/40 font-mono text-[11px]"
                                >
                                  {w}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                        {gw.status === 'active' ? (
                          <button
                            onClick={() => handleEndGiveaway(gw.id)}
                            className="px-3 py-1.5 rounded-lg bg-dark-800 hover:bg-dark-700 text-dark-200 border border-dark-700 text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5"
                          >
                            <Clock className="w-3.5 h-3.5 text-amber-400" />
                            <span>Encerrar</span>
                          </button>
                        ) : (
                          <button
                            onClick={() => handleReroll(gw.id)}
                            className="px-3 py-1.5 rounded-lg bg-dark-800 hover:bg-dark-700 text-violet-300 border border-dark-700 text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5"
                            title="Sortear novamente"
                          >
                            <RotateCw className="w-3.5 h-3.5" />
                            <span>Reroll</span>
                          </button>
                        )}

                        <button
                          onClick={() => handleDeleteGiveaway(gw.id)}
                          className="p-2 rounded-lg text-dark-400 hover:text-rose-400 hover:bg-dark-800 transition-colors cursor-pointer"
                          title="Excluir sorteio"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 3. "Comandos" Collapsible Card */}
            <div
              className="bg-dark-800 shadow-xs sub_feature_card rounded-2xl border border-dark-700/60 overflow-hidden mb-4"
              id="plugins.commands"
            >
              <h3
                onClick={() => setIsCommandsOpen(!isCommandsOpen)}
                className="text-h6 text-dark-100 flex justify-between items-start hover:text-dark-200 transition-all py-4 lg:py-6 px-6 cursor-pointer select-none"
              >
                <div className="flex flex-col w-full pr-4 max-w-[760px]">
                  <div className="sub_feature_title flex items-center text-lg font-semibold">
                    Comandos
                  </div>
                  <span className="text-xs text-dark-400 font-normal mt-0.5">
                    Comandos de barra para gerenciar sorteios no Discord
                  </span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <button className="pt-1 text-dark-300">
                    {isCommandsOpen ? (
                      <ChevronUp className="w-6 h-6 transition-all" />
                    ) : (
                      <ChevronDown className="w-6 h-6 transition-all" />
                    )}
                  </button>
                </div>
              </h3>

              {isCommandsOpen && (
                <div className="text-base transition-all">
                  <div className="p-6 pt-0 space-y-3">
                    {/* Command: /reroll */}
                    <div className="flex items-center w-full shadow-xs relative rounded-xl p-5 bg-dark-900 border border-dark-700/80 transition-all hover:border-blue-supplementary justify-between gap-4">
                      <div className="flex flex-col">
                        <h5 className="flex text-body font-bold text-dark-100 font-mono text-sm">
                          /reroll
                        </h5>
                        <p className="text-xs text-dark-300 mt-0.5">
                          Sortear um novo vencedor da lista de participantes
                        </p>
                      </div>

                      <div className="flex items-center gap-3 ml-auto">
                        <div
                          onClick={() => setIsRerollActive(!isRerollActive)}
                          className={`shrink-0 rounded-full transition-all duration-200 overflow-hidden relative cursor-pointer h-[28px] w-[56px] ${
                            isRerollActive ? 'bg-brand-default' : 'bg-dark-700'
                          }`}
                        >
                          <div
                            className={`rounded-full top-1 absolute transition-all duration-200 transform flex items-center justify-center bg-grey-100 h-5 w-5 shadow-xs ${
                              isRerollActive ? 'translate-x-8' : 'translate-x-1'
                            }`}
                          >
                            <div
                              className={`h-2 w-2 rounded-full transition-all duration-200 ${
                                isRerollActive ? 'bg-brand-default' : 'bg-dark-500'
                              }`}
                            />
                          </div>
                        </div>

                        <button
                          onClick={() => setShowRerollConfig(true)}
                          className="relative flex overflow-hidden shrink-0 rounded-lg transition-all duration-200 items-center gap-1.5 bg-white bg-opacity-10 text-white hover:bg-opacity-20 active:bg-opacity-5 p-2 text-sm cursor-pointer"
                          title="Permissões do comando"
                        >
                          <Settings2 className="w-4 h-4 text-dark-300" />
                        </button>
                      </div>
                    </div>

                    {/* Command: /giveaway start */}
                    <div className="flex items-center w-full shadow-xs relative rounded-xl p-5 bg-dark-900 border border-dark-700/80 transition-all hover:border-blue-supplementary justify-between gap-4">
                      <div className="flex flex-col">
                        <h5 className="flex text-body font-bold text-dark-100 font-mono text-sm">
                          /giveaway start
                        </h5>
                        <p className="text-xs text-dark-300 mt-0.5">
                          Inicia um novo sorteio diretamente a partir de um canal de texto
                        </p>
                      </div>

                      <span className="text-[11px] font-semibold px-2.5 py-1 rounded-md bg-dark-800 text-dark-300 border border-dark-700">
                        Ativo Padrão
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal: Configuração do /reroll */}
      {showRerollConfig && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-dark-800 border border-dark-700 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-fadeIn">
            <div className="p-5 border-b border-dark-700 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Settings2 className="w-5 h-5 text-violet-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Configurar Comando /reroll
                </h3>
              </div>
              <button
                onClick={() => setShowRerollConfig(false)}
                className="p-1 rounded-lg text-dark-400 hover:text-white hover:bg-dark-700 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-4 text-xs">
              <div>
                <label className="text-dark-300 font-semibold block mb-1">
                  Quem pode usar o comando /reroll?
                </label>
                <p className="text-[11px] text-dark-400 mb-2">
                  Escolha os cargos autorizados a realizar um sorteio novamente no Discord.
                </p>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 p-2.5 rounded-xl bg-dark-900 border border-dark-700 cursor-pointer">
                    <input type="checkbox" defaultChecked className="accent-violet-500 rounded" />
                    <span className="text-white font-medium">Administradores</span>
                  </label>
                  <label className="flex items-center gap-2 p-2.5 rounded-xl bg-dark-900 border border-dark-700 cursor-pointer">
                    <input type="checkbox" defaultChecked className="accent-violet-500 rounded" />
                    <span className="text-white font-medium">Moderadores</span>
                  </label>
                  <label className="flex items-center gap-2 p-2.5 rounded-xl bg-dark-900 border border-dark-700 cursor-pointer">
                    <input type="checkbox" className="accent-violet-500 rounded" />
                    <span className="text-dark-300 font-medium">Criador do Sorteio</span>
                  </label>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setShowRerollConfig(false)}
                  className="px-4 py-2 bg-brand-default text-dark-900 font-bold rounded-xl hover:bg-white transition-colors cursor-pointer"
                >
                  Salvar Preferências
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
