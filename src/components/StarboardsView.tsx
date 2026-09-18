import React, { useState } from 'react';
import {
  Star,
  Plus,
  Trash2,
  Edit2,
  Check,
  Hash,
  Sparkles,
} from 'lucide-react';
import { ServerInfo } from '../types';
import { StarboardConfigPage } from './StarboardConfigPage';

interface StarboardsViewProps {
  currentServer?: ServerInfo | null;
  onBackToDashboard?: () => void;
}

interface StarboardItem {
  id: string;
  name: string;
  channelName: string;
  emoji: string;
  minReactions: number;
  embedColor?: string;
  isActive: boolean;
  starsCount: number;
}

export const StarboardsView: React.FC<StarboardsViewProps> = ({
  currentServer,
  onBackToDashboard,
}) => {
  // Global plugin switch
  const [isPluginActive, setIsPluginActive] = useState(true);

  // Starboards list with initial item
  const [starboards, setStarboards] = useState<StarboardItem[]>([
    {
      id: 'sb_default',
      name: '⭐ Destaques da Comunidade',
      channelName: '⭐・destaques',
      emoji: '⭐',
      minReactions: 3,
      embedColor: '#FFAC33',
      isActive: true,
      starsCount: 14,
    },
  ]);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Navigation to edit/create page
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<StarboardItem | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleOpenCreate = () => {
    setEditingItem(null);
    setIsConfigOpen(true);
  };

  const handleOpenEdit = (item: StarboardItem) => {
    setEditingItem(item);
    setIsConfigOpen(true);
  };

  const handleSaveConfig = (data: any) => {
    if (editingItem) {
      setStarboards((prev) =>
        prev.map((s) =>
          s.id === editingItem.id
            ? {
                ...s,
                name: data.name || s.name,
                channelName: data.channel || s.channelName,
                emoji: data.emojis?.[0] || s.emoji,
                minReactions: data.minReactions || s.minReactions,
                embedColor: data.embedColor || s.embedColor,
              }
            : s
        )
      );
      showToast(`Starboard "${data.name || editingItem.name}" atualizado com sucesso!`);
    } else {
      const newStarboard: StarboardItem = {
        id: `sb_${Date.now()}`,
        name: data.name || 'New Starboard',
        channelName: data.channel || '⭐・destaques',
        emoji: data.emojis?.[0] || '⭐',
        minReactions: data.minReactions || 3,
        embedColor: data.embedColor || '#FFAC33',
        isActive: true,
        starsCount: 0,
      };
      setStarboards((prev) => [...prev, newStarboard]);
      showToast(`Starboard "${newStarboard.name}" criado com sucesso!`);
    }
    setIsConfigOpen(false);
    setEditingItem(null);
  };

  const handleDeleteStarboard = (id: string) => {
    const item = starboards.find((s) => s.id === id);
    setStarboards((prev) => prev.filter((s) => s.id !== id));
    showToast(`Starboard "${item?.name || 'Item'}" foi removido.`);
  };

  const handleToggleActive = (id: string) => {
    setStarboards((prev) =>
      prev.map((s) => (s.id === id ? { ...s, isActive: !s.isActive } : s))
    );
  };

  if (isConfigOpen) {
    return (
      <StarboardConfigPage
        initialName={editingItem ? editingItem.name : 'New Starboard'}
        initialChannel={editingItem ? editingItem.channelName : '⭐・destaques'}
        initialEmoji={editingItem ? editingItem.emoji : '⭐'}
        initialMinReactions={editingItem ? editingItem.minReactions : 3}
        initialEmbedColor={editingItem?.embedColor || '#FFAC33'}
        onBack={() => {
          setIsConfigOpen(false);
          setEditingItem(null);
        }}
        onSave={handleSaveConfig}
      />
    );
  }

  return (
    <div
      className="flex flex-1 overflow-y-auto relative px-6 lg:px-10 py-0 lg:py-10 animate-fadeIn"
      id="dashboard__content"
    >
      <div className="min-h-full w-full max-w-[1540px] mx-auto">
        <div className="w-full min-h-full transition-all flex flex-col opacity-100">
          {/* Header */}
          <div className="flex justify-between mb-8 lg:mb-6">
            <div className="flex flex-col grow items-center lg:items-start">
              <div className="bg-dark-800 sm:bg-transparent flex items-center justify-between w-[calc(100%+48px)] sm:w-full px-6 py-4 sm:px-0 sm:py-0 mb-3 sm:mb-0">
                <button
                  type="button"
                  onClick={onBackToDashboard}
                  className="sm:hidden text-zinc-400 hover:text-white p-1"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
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

                <h4 className="font-bold text-white text-2xl lg:text-3xl flex-1 text-center lg:text-left flex flex-row items-center gap-2.5">
                  <Star className="w-7 h-7 text-amber-400 fill-amber-400/20" />
                  <span>Starboards</span>
                </h4>

                <div>
                  <div className="flex justify-start cursor-pointer gap-2.5 items-center">
                    <div className="flex justify-start cursor-pointer gap-2.5 items-center flex-row-reverse">
                      <div
                        onClick={() => setIsPluginActive(!isPluginActive)}
                        className={`shrink-0 rounded-full transition-all duration-200 overflow-hidden relative cursor-pointer h-[28px] w-[56px] ${
                          isPluginActive ? 'bg-amber-500' : 'bg-zinc-700'
                        }`}
                      >
                        <div className="absolute left-0 top-0 w-full h-full flex items-center justify-start px-2">
                          <div className="text-[11px] font-bold text-zinc-900" translate="no">
                            {isPluginActive ? 'ON' : 'OFF'}
                          </div>
                        </div>
                        <div
                          className={`rounded-full top-1 absolute transition-all duration-200 transform flex items-center justify-center bg-white h-5 w-5 shadow ${
                            isPluginActive ? 'translate-x-8' : 'translate-x-1'
                          }`}
                        >
                          <div
                            className={`h-2 w-2 rounded-full transition-all duration-200 ${
                              isPluginActive ? 'bg-amber-600' : 'bg-zinc-400'
                            }`}
                          />
                        </div>
                      </div>

                      <label
                        onClick={() => setIsPluginActive(!isPluginActive)}
                        className="select-none cursor-pointer flex flex-col gap-0.5"
                      >
                        <div className="text-white text-base">
                          <p className="text-sm text-zinc-300 font-semibold hidden md:inline-block">
                            Ativo
                          </p>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-base text-zinc-400 max-w-[830px] ml-0 w-full mt-3 text-center sm:text-left">
                Destaque as mensagens populares exibindo-as em um canal dedicado quando receberem reações suficientes
              </p>
            </div>
          </div>

          {/* Main Card: Seus Starboards */}
          <div className="mt-8">
            <div
              className="bg-dark-800 shadow-xs sub_feature_card rounded-xl border border-zinc-800/80 mb-4 overflow-hidden"
              id="plugins.starboards.list.title"
            >
              <h3 className="text-white flex justify-between items-center py-4 lg:py-6 px-6">
                <div className="flex flex-col w-full pr-4 max-w-[760px]">
                  <div className="sub_feature_title flex items-center text-lg font-semibold text-white">
                    Seus Starboards
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <p className="text-right text-lg text-zinc-400">
                    <span className="text-white font-bold">{starboards.length}</span>
                    &nbsp;/&nbsp;10
                  </p>

                  <button
                    type="button"
                    onClick={handleOpenCreate}
                    className="relative flex overflow-hidden shrink-0 rounded-lg transition-all duration-200 items-center gap-1.5 bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-zinc-950 font-bold text-sm px-4 py-2 cursor-pointer shadow"
                  >
                    <Plus className="w-4 h-4 text-zinc-950" />
                    <div className="flex hidden lg:flex grow justify-center max-w-full">
                      <span className="transition-all duration-200 whitespace-nowrap text-ellipsis overflow-hidden block w-full shrink-0 text-center">
                        Criar Starboard
                      </span>
                    </div>
                  </button>
                </div>
              </h3>

              <div className="text-base transition-all">
                <div className="p-6 pt-0">
                  <div className="grid w-full border-t border-solid border-zinc-800/80 pt-4" />

                  {/* Empty State */}
                  {starboards.length === 0 ? (
                    <div className="min-h-full w-full max-w-[620px] mx-auto py-8">
                      {/* SVG Illustration */}
                      <div className="w-full flex items-center justify-center mb-6">
                        <div className="relative w-40 h-40 flex items-center justify-center">
                          {/* Radial ambient glow */}
                          <div className="absolute inset-0 rounded-full bg-amber-500/10 blur-2xl" />
                          <div className="relative w-28 h-28 rounded-3xl bg-zinc-900 border-2 border-amber-500/30 flex items-center justify-center shadow-xl">
                            <Star className="w-14 h-14 text-amber-400 fill-amber-400 animate-pulse" />
                            <Sparkles className="w-5 h-5 text-amber-300 absolute top-3 right-3" />
                          </div>
                        </div>
                      </div>

                      <div className="text-center grid grid-cols-1 gap-3">
                        <p className="text-white text-xl font-bold">
                          Sem starboards ainda
                        </p>
                        <p className="text-zinc-400 text-sm md:text-base font-normal max-w-lg mx-auto w-full leading-relaxed">
                          Crie seu primeiro starboard para começar a exibir mensagens populares em um canal dedicado
                        </p>
                        <div className="flex items-center justify-center mt-4">
                          <button
                            type="button"
                            onClick={handleOpenCreate}
                            className="relative flex overflow-hidden shrink-0 rounded-xl transition-all duration-200 items-center gap-2 bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-zinc-950 font-bold text-base px-6 py-3 cursor-pointer shadow-lg hover:shadow-amber-500/20"
                          >
                            <Plus className="w-5 h-5 text-zinc-950 stroke-[2.5]" />
                            <span className="whitespace-nowrap">
                              Criar Starboard
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Populated List */
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                      {starboards.map((sb) => (
                        <div
                          key={sb.id}
                          className="bg-dark-900 border border-zinc-800 rounded-xl p-5 flex flex-col justify-between hover:border-zinc-700 transition-all shadow-sm"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-2xl shrink-0">
                                {sb.emoji}
                              </div>
                              <div>
                                <h5 className="text-white font-bold text-base flex items-center gap-1.5">
                                  <span>{sb.name}</span>
                                </h5>
                                <p className="text-xs text-zinc-400 mt-0.5 flex items-center gap-1">
                                  <Hash className="w-3.5 h-3.5 text-zinc-500" />
                                  <span>{sb.channelName}</span>
                                  <span>•</span>
                                  <span>Gatilho: {sb.minReactions} {sb.emoji} reações</span>
                                </p>
                              </div>
                            </div>

                            <button
                              type="button"
                              onClick={() => handleToggleActive(sb.id)}
                              className={`shrink-0 rounded-full transition-all duration-200 overflow-hidden relative cursor-pointer h-[24px] w-[46px] ${
                                sb.isActive ? 'bg-amber-500' : 'bg-zinc-700'
                              }`}
                            >
                              <div
                                className={`rounded-full top-0.5 absolute transition-all duration-200 transform flex items-center justify-center bg-white h-5 w-5 shadow ${
                                  sb.isActive ? 'translate-x-6' : 'translate-x-0.5'
                                }`}
                              />
                            </button>
                          </div>

                          <div className="flex items-center justify-between pt-4 mt-4 border-t border-zinc-800 text-xs text-zinc-400">
                            <div className="flex items-center gap-2">
                              <span className="px-2 py-0.5 rounded bg-zinc-800 border border-zinc-700 text-[11px] text-zinc-300">
                                Canal: {sb.channelName}
                              </span>
                              {sb.embedColor && (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-zinc-800 border border-zinc-700 text-[11px] text-zinc-400">
                                  <span
                                    className="w-2.5 h-2.5 rounded-full"
                                    style={{ backgroundColor: sb.embedColor }}
                                  />
                                  <span>Embed</span>
                                </span>
                              )}
                            </div>

                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => handleOpenEdit(sb)}
                                className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                                title="Editar configurações"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteStarboard(sb.id)}
                                className="p-1.5 rounded-lg bg-zinc-800 hover:bg-rose-900/60 text-zinc-400 hover:text-rose-400 transition-colors cursor-pointer"
                                title="Excluir Starboard"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Toast Notification */}
          {toastMessage && (
            <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl bg-zinc-900 border border-amber-500/40 text-white shadow-2xl animate-fadeIn">
              <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-sm font-medium">{toastMessage}</span>
              <button
                type="button"
                onClick={() => setToastMessage(null)}
                className="text-zinc-400 hover:text-white ml-2 text-xs"
              >
                ✕
              </button>
            </div>
          )}

          <div className="h-10" />
        </div>
      </div>
    </div>
  );
};
