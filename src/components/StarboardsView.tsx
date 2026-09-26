import React, { useState, useEffect } from 'react';
import {
  Star,
  Plus,
  Trash2,
  Copy,
  MoreVertical,
  Hash,
} from 'lucide-react';
import { ServerInfo } from '../types';
import { StarboardConfigPage } from './StarboardConfigPage';
import { DiscordSwitch } from './common';

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

  // Starboards list with initial item matching user's snippet
  const [starboards, setStarboards] = useState<StarboardItem[]>([
    {
      id: 'sb_default',
      name: 'New Starboard',
      channelName: '#🔹・liberar',
      emoji: '⭐',
      minReactions: 3,
      embedColor: '#FFAC33',
      isActive: true,
      starsCount: 3,
    },
  ]);

  // Context menu for each item
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Navigation to edit/create page
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<StarboardItem | null>(null);

  useEffect(() => {
    const handleClickOutside = () => setActiveMenuId(null);
    if (activeMenuId) {
      window.addEventListener('click', handleClickOutside);
      return () => window.removeEventListener('click', handleClickOutside);
    }
  }, [activeMenuId]);

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

  const handleDuplicate = (sb: StarboardItem) => {
    const duplicated: StarboardItem = {
      ...sb,
      id: `sb_${Date.now()}`,
      name: `${sb.name} (Cópia)`,
    };
    setStarboards((prev) => [...prev, duplicated]);
    setActiveMenuId(null);
    showToast(`Starboard "${duplicated.name}" duplicado com sucesso!`);
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
        channelName: data.channel || '#🔹・liberar',
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
    setActiveMenuId(null);
    showToast(`Starboard "${item?.name || 'Item'}" foi removido.`);
  };

  if (isConfigOpen) {
    return (
      <StarboardConfigPage
        initialName={editingItem ? editingItem.name : 'New Starboard'}
        initialChannel={editingItem ? editingItem.channelName : '#🔹・liberar'}
        initialEmoji={editingItem ? editingItem.emoji : '⭐'}
        initialMinReactions={editingItem ? editingItem.minReactions : 3}
        initialEmbedColor={editingItem?.embedColor || '#FFAC33'}
        onBack={() => {
          setIsConfigOpen(false);
          setEditingItem(null);
        }}
        onSave={handleSaveConfig}
        onDelete={editingItem ? () => {
          handleDeleteStarboard(editingItem.id);
          setIsConfigOpen(false);
          setEditingItem(null);
        } : () => {
          setIsConfigOpen(false);
          setEditingItem(null);
        }}
      />
    );
  }

  return (
    <div
      className="flex flex-1 overflow-y-auto relative px-6 lg:px-10 py-0 lg:py-10 animate-fadeIn"
      id="dashboard__content"
    >
      <div className="min-h-full w-full max-w-[1540px]">
        {/* Fixed toast notification container matching original dashboard */}
        <div className="fixed lg:max-w-[calc(100%-300px)] w-full z-30 right-0 top-16 p-6 md:p-10 pointer-events-none">
          <div className="w-full pointer-events-auto flex flex-col gap-6">
            {toastMessage && (
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-zinc-900 border border-brand-default/40 text-white shadow-2xl animate-fadeIn self-end">
                <div className="w-2 h-2 rounded-full bg-brand-default animate-pulse" />
                <span className="text-sm font-medium">{toastMessage}</span>
                <button
                  type="button"
                  onClick={() => setToastMessage(null)}
                  className="text-zinc-400 hover:text-white ml-2 text-xs cursor-pointer"
                >
                  ✕
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="w-full min-h-full transition-all flex flex-col opacity-100">
          {/* Header */}
          <div className="flex justify-between mb-8 lg:mb-6">
            <div className="flex flex-col grow items-center lg:items-start">
              <div className="bg-dark-800 sm:bg-transparent flex items-center justify-between w-[calc(100%+48px)] sm:w-full px-6 py-4 sm:px-0 sm:py-0 mb-3 sm:mb-0">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="sm:hidden cursor-pointer"
                  onClick={onBackToDashboard}
                >
                  <path
                    d="M14.5 17l-5-5 5-5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <h4 className="font-bold text-dark-100 text-h5 flex-1 text-center lg:text-left flex flex-row items-center">
                  Starboards
                </h4>

                <div>
                  <div className="flex justify-start cursor-pointer gap-2.5 undefined items-center">
                    <div className="flex justify-start cursor-pointer gap-2.5 items-center flex-row-reverse">
                      <div
                        onClick={() => setIsPluginActive(!isPluginActive)}
                        className={`shrink-0 rounded-full transition-all duration-200 overflow-hidden relative cursor-pointer h-[28px] w-[56px] ${
                          isPluginActive ? 'bg-brand-default' : 'bg-dark-600'
                        }`}
                      >
                        <div
                          className={`absolute left-0 top-0 w-full h-full flex items-center px-1.5 ${
                            isPluginActive ? 'justify-start' : 'justify-end'
                          }`}
                        >
                          <div className="text-xs font-semibold text-dark-100" translate="no">
                            {isPluginActive ? 'ON' : 'OFF'}
                          </div>
                        </div>
                        <div
                          className={`rounded-full top-1 absolute transition-all duration-200 transform flex items-center justify-center bg-grey-100 h-5 w-5 ${
                            isPluginActive ? 'translate-x-8' : 'translate-x-1'
                          }`}
                        >
                          <div
                            className={`h-2 w-2 rounded-full transition-all duration-200 ${
                              isPluginActive ? 'bg-brand-default' : 'bg-dark-600'
                            }`}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-base text-dark-300 max-w-[830px] ml-0 w-full mt-3 text-center sm:text-left">
                Destaque as mensagens populares exibindo-as em um canal dedicado quando receberem reações suficientes
              </p>
            </div>
          </div>

          {/* Main Card: Seus Starboards */}
          <div className="mt-8">
            <div
              className="bg-dark-800 shadow-xs sub_feature_card rounded-lg mb-4"
              id="plugins.starboards.list.title"
            >
              <h3 className="text-h6 text-dark-100 flex justify-between items-start hover:text-dark-200 transition-all py-4 lg:py-6 px-6 false">
                <div className="flex flex-col w-full pr-4 max-w-[760px]">
                  <div className="sub_feature_title flex items-center text-lg font-semibold">
                    Seus Starboards
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <p className="text-right text-xl text-dark-300">
                    <span className="text-dark-100 font-semibold">{starboards.length}</span>
                    &nbsp;/&nbsp;10
                  </p>

                  <button
                    type="button"
                    onClick={handleOpenCreate}
                    className="relative flex overflow-hidden shrink-0 rounded-lg transition-all duration-200 items-center gap-1.5 bg-brand-default text-dark-100 hover:bg-brand-hover active:bg-brand-default active:bg-opacity-40 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-brand-default undefined text-sm px-4 py-2 cursor-pointer"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="sc-eldPxv kIKVos inline-block mr-1.5"
                    >
                      <path
                        d="M6 12h12m-6-6v12"
                        stroke="#9B9D9F"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
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
                  <div className="grid w-full border-t border-solid border-dark-700 pt-4" />

                  {/* Empty State */}
                  {starboards.length === 0 ? (
                    <div className="min-h-full w-full max-w-[620px] mx-auto py-8">
                      <div className="w-full flex items-center justify-center mb-6">
                        <div className="relative w-40 h-40 flex items-center justify-center">
                          <div className="absolute inset-0 rounded-full bg-amber-500/10 blur-2xl" />
                          <div className="relative w-28 h-28 rounded-3xl bg-zinc-900 border-2 border-amber-500/30 flex items-center justify-center shadow-xl">
                            <Star className="w-14 h-14 text-amber-400 fill-amber-400" />
                          </div>
                        </div>
                      </div>

                      <div className="text-center grid grid-cols-1 gap-3">
                        <p className="text-dark-100 text-xl font-bold">
                          Sem starboards ainda
                        </p>
                        <p className="text-dark-300 text-sm md:text-base font-normal max-w-lg mx-auto w-full leading-relaxed">
                          Crie seu primeiro starboard para começar a exibir mensagens populares em um canal dedicado
                        </p>
                        <div className="flex items-center justify-center mt-4">
                          <button
                            type="button"
                            onClick={handleOpenCreate}
                            className="relative flex overflow-hidden shrink-0 rounded-lg transition-all duration-200 items-center gap-2 bg-brand-default text-dark-100 hover:bg-brand-hover active:bg-brand-default font-bold text-sm px-6 py-3 cursor-pointer shadow-sm"
                          >
                            <Plus className="w-5 h-5 text-dark-100 stroke-[2.5]" />
                            <span className="whitespace-nowrap">
                              Criar Starboard
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Populated List */
                    <div>
                      <div className="mb-6" />
                      <div className="flex flex-col gap-2">
                        <div className="grid grid-cols-1 gap-3">
                          {starboards.map((sb) => (
                            <div
                              key={sb.id}
                              className="bg-dark-900 rounded p-6 transition-all duration-200 border border-solid cursor-pointer border-dark-900 hover:border-brand-light"
                            >
                              <div className="flex items-center justify-between">
                                <div
                                  className="w-full mr-4"
                                  onClick={() => handleOpenEdit(sb)}
                                >
                                  <div className="flex items-center mb-2">
                                    <p className="text-dark-100 font-semibold text-lg mr-2">
                                      {sb.name}
                                    </p>
                                    <p className="text-dark-300">
                                      {sb.channelName.startsWith('#')
                                        ? sb.channelName
                                        : `#${sb.channelName}`}
                                    </p>
                                  </div>
                                  <div className="flex items-center justify-start gap-2">
                                    <div className="bg-dark-800 rounded px-2 py-1 flex items-center justify-center">
                                      <div style={{ width: '20px' }} className="flex items-center justify-center">
                                        <img
                                          draggable="false"
                                          className="emoji w-5 h-5 object-contain"
                                          alt={sb.emoji}
                                          src="https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/72x72/2b50.png"
                                          onError={(e) => {
                                            (e.target as HTMLElement).style.display = 'none';
                                          }}
                                        />
                                      </div>
                                    </div>
                                    <span className="text-dark-400 text-sm ml-2">
                                      {sb.minReactions} reações
                                    </span>
                                  </div>
                                </div>

                                {/* 3-dots action menu */}
                                <div
                                  className="relative max-w-max"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <div>
                                    <button
                                      type="button"
                                      onClick={() =>
                                        setActiveMenuId(
                                          activeMenuId === sb.id ? null : sb.id
                                        )
                                      }
                                      className="relative flex overflow-hidden shrink-0 rounded-lg transition-all duration-200 items-center gap-1.5 bg-white bg-opacity-10 text-white hover:bg-opacity-20 active:bg-opacity-5 active:text-opacity-60 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-opacity-10 undefined text-sm p-1.5 cursor-pointer"
                                      title="Opções"
                                    >
                                      <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="sc-eldPxv kIKVos inline-block"
                                      >
                                        <path
                                          d="M14 5c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2zM14 19c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2zM14 12c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2z"
                                          fill="rgba(154,161,181,0.16)"
                                          stroke="#9B9D9F"
                                          strokeWidth="1.5"
                                        />
                                      </svg>
                                    </button>
                                  </div>

                                  {activeMenuId === sb.id && (
                                    <div className="z-10 rounded-lg shadow-sm p-2 min-w-[170px] max-w-max absolute right-0 mt-2 transform transition-all duration-200 bg-dark-800 border border-solid border-dark-600 animate-fadeIn">
                                      <div>
                                        <div
                                          onClick={() => handleDuplicate(sb)}
                                          className="whitespace-nowrap relative rounded-lg flex items-center justify-start p-3 undefined text-dark-300 text-base hover:bg-dark-900 hover:bg-opacity-30 cursor-pointer"
                                        >
                                          <div className="inline-block mr-2.5">
                                            <svg
                                              width="24"
                                              height="24"
                                              viewBox="0 0 24 24"
                                              fill="none"
                                              xmlns="http://www.w3.org/2000/svg"
                                              className="sc-eldPxv ilSpPw"
                                            >
                                              <path
                                                d="M7.426 7.577a5.778 5.778 0 014.306-4.306 10.272 10.272 0 014.691 0 5.778 5.778 0 014.306 4.306 10.271 10.271 0 010 4.691 5.778 5.778 0 01-4.306 4.306 10.271 10.271 0 01-4.691 0 5.778 5.778 0 01-4.306-4.306 10.271 10.271 0 010-4.691z"
                                                fill="rgba(154,161,181,0.16)"
                                              />
                                              <path
                                                d="M7.173 9.31a8.779 8.779 0 00-.25.055 4.952 4.952 0 00-3.69 3.69 8.804 8.804 0 000 4.022 4.952 4.952 0 003.69 3.69c1.322.31 2.699.31 4.021 0a4.952 4.952 0 003.69-3.69c.02-.083.038-.167.055-.25a10.27 10.27 0 01-2.957-.253 5.778 5.778 0 01-4.306-4.306 10.271 10.271 0 01-.253-2.957z"
                                                fill="rgba(154,161,181,0.16)"
                                              />
                                              <path
                                                d="M7.426 12.268a10.271 10.271 0 010-4.691 5.778 5.778 0 014.306-4.306 10.272 10.272 0 014.691 0 5.778 5.778 0 014.306 4.306 10.271 10.271 0 010 4.691 5.778 5.778 0 01-4.306 4.306 10.271 10.271 0 01-4.691 0m-4.306-4.306a5.778 5.778 0 004.306 4.306m-4.306-4.306a10.271 10.271 0 01-.253-2.957 8.779 8.779 0 00-.25.054 4.952 4.952 0 00-3.69 3.69 8.804 8.804 0 000 4.022 4.952 4.952 0 003.69 3.69c1.322.31 2.699.31 4.021 0a4.952 4.952 0 003.69-3.69c.02-.083.038-.167.055-.25a10.27 10.27 0 01-2.957-.253"
                                                stroke="#9B9D9F"
                                                strokeWidth="1.5"
                                              />
                                            </svg>
                                          </div>
                                          <span className="transition-all duration-200">
                                            Duplicar
                                          </span>
                                        </div>
                                        <div className="h-[1px] w-full bg-dark-700" />
                                      </div>
                                      <div>
                                        <div
                                          onClick={() =>
                                            handleDeleteStarboard(sb.id)
                                          }
                                          className="whitespace-nowrap relative rounded-lg flex items-center justify-start p-3 undefined text-dark-300 text-base hover:bg-dark-900 hover:bg-opacity-30 cursor-pointer"
                                        >
                                          <div className="inline-block mr-2.5">
                                            <svg
                                              width="24"
                                              height="24"
                                              viewBox="0 0 24 24"
                                              fill="none"
                                              xmlns="http://www.w3.org/2000/svg"
                                              className="sc-eldPxv cSPQgc"
                                            >
                                              <path
                                                d="M5 7.033h14v5.143c0 1.575-.222 3.142-.658 4.654a5.627 5.627 0 01-4.46 3.999l-.158.026a10.344 10.344 0 01-3.448 0l-.158-.026a5.627 5.627 0 01-4.46-3.999A16.783 16.783 0 015 12.176V7.033z"
                                                fill="rgba(154,161,181,0.16)"
                                              />
                                              <path
                                                d="M3 6.283a.75.75 0 000 1.5v-1.5zm18 1.5a.75.75 0 000-1.5v1.5zm-16-.75v-.75h-.75v.75H5zm14 0h.75v-.75H19v.75zm-.658 9.797l.72.208-.72-.208zm-4.618 4.025l.125.74-.125-.74zm-3.448 0l.125-.74-.125.74zm-.158-.026l-.125.74.125-.74zm-4.46-3.999l-.72.208.72-.208zm8.224 3.999l-.125-.74.125.74zm-6.04-15.34l.681.315-.68-.315zm.976-1.308l-.5-.558.5.558zm1.46-.874l.26.703-.26-.703zm3.444 0l.261-.703-.26.703zm2.435 2.182l.681-.314-.68.314zM3 7.783h18v-1.5H3v1.5zm10.757 12.306l-.158.027.25 1.479.158-.027-.25-1.479zm-3.356.027l-.158-.027-.25 1.48.158.026.25-1.48zM18.25 7.033v5.143h1.5V7.033h-1.5zm-12.5 5.143V7.033h-1.5v5.143h1.5zm12.5 0c0 1.505-.212 3.002-.629 4.446l1.441.416c.456-1.58.688-3.217.688-4.862h-1.5zm-4.651 7.94a9.595 9.595 0 01-3.198 0l-.25 1.479c1.224.207 2.474.207 3.698 0l-.25-1.48zm-3.356-.027a4.877 4.877 0 01-3.864-3.467l-1.441.416a6.377 6.377 0 005.055 4.53l.25-1.479zM6.38 16.622a16.033 16.033 0 01-.629-4.446h-1.5c0 1.645.231 3.282.688 4.862l1.44-.416zm7.628 4.946a6.377 6.377 0 005.055-4.53l-1.44-.416a4.877 4.877 0 01-3.865 3.467l.25 1.48zM8.25 7.033c0-.42.092-.837.273-1.229l-1.361-.63a4.422 4.422 0 00-.412 1.859h1.5zm.273-1.229c.182-.393.45-.755.796-1.064L8.317 3.623c-.49.44-.884.966-1.155 1.552l1.361.63zM9.32 4.74c.345-.31.759-.559 1.22-.73l-.522-1.406c-.63.234-1.209.579-1.7 1.019L9.32 4.74zm1.22-.73c.461-.171.958-.26 1.461-.26v-1.5c-.679 0-1.352.12-1.983.354l.522 1.406zM12 3.75c.503 0 1 .089 1.461.26l.522-1.406A5.707 5.707 0 0012 2.25v1.5zm1.461.26c.461.171.875.42 1.22.73l1.002-1.117a5.317 5.317 0 00-1.7-1.02l-.522 1.407zm1.22.73c.345.309.614.671.796 1.064l1.361-.63a4.784 4.784 0 00-1.156-1.551l-1 1.117zm.796 1.064c.181.392.273.81.273 1.229h1.5c0-.64-.14-1.272-.412-1.858l-1.361.63zM5 7.783h14v-1.5H5v1.5z"
                                                stroke="#9B9D9F"
                                                strokeWidth="1.5"
                                              />
                                              <path
                                                d="M10 12v4m4-4v4"
                                                stroke="#9B9D9F"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                              />
                                            </svg>
                                          </div>
                                          <span className="transition-all duration-200">
                                            Deletar
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Toast Notification */}
          {toastMessage && (
            <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl bg-zinc-900 border border-brand-default/40 text-white shadow-2xl animate-fadeIn">
              <div className="w-2 h-2 rounded-full bg-brand-default animate-pulse" />
              <span className="text-sm font-medium">{toastMessage}</span>
              <button
                type="button"
                onClick={() => setToastMessage(null)}
                className="text-zinc-400 hover:text-white ml-2 text-xs cursor-pointer"
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
