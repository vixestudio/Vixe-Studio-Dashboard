import React, { useState, useEffect } from 'react';
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
import { DiscordSwitch } from './common';

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

  // Giveaways list state (inicia com o layout do sorteio criado conforme especificação)
  const [giveaways, setGiveaways] = useState<Giveaway[]>([
    {
      id: '1550384097870884864',
      prize: 'Nome do sorteio',
      description: 'Reaja com 🎉 para concorrer!',
      channel: '🔹・sorteios',
      winnersCount: 1,
      participantsCount: 0,
      status: 'active',
      endsAt: '18.09.2026, 03:00 -04',
    },
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  useEffect(() => {
    const handleClickOutside = () => setActiveMenuId(null);
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  const handleDuplicateGiveaway = (gw: Giveaway) => {
    const duplicated: Giveaway = {
      ...gw,
      id: `gw-${Date.now()}`,
      prize: `${gw.prize} (Cópia)`,
      participantsCount: 0,
      status: 'active',
    };
    setGiveaways((prev) => [duplicated, ...prev]);
  };

  const handlePublishGiveaway = (data: any) => {
    const newGiveaway: Giveaway = {
      id: `gw-${Date.now()}`,
      prize: data.prize || data.title || 'Nome do sorteio',
      description: data.title || 'Reaja com 🎉 para concorrer!',
      channel: data.channel || '🔹・sorteios',
      winnersCount: Number(data.winnersCount) || 1,
      participantsCount: 0,
      status: 'active',
      endsAt: data.endDate
        ? `${data.endDate}${data.endTime ? `, ${data.endTime}` : ''} -04`
        : '18.09.2026, 03:00 -04',
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
      className="flex flex-1 overflow-y-auto relative px-6 lg:px-10 py-0 lg:py-10 animate-fadeIn"
      id="dashboard__content"
    >
      <div className="min-h-full w-full max-w-[1540px] mx-auto space-y-6 pb-16">
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
                <div className="flex items-center gap-2.5">
                  <span className="text-sm text-dark-100 hidden md:inline-block font-medium">
                    {isPluginActive ? 'Ativo' : 'Desativado'}
                  </span>
                  <DiscordSwitch
                    checked={isPluginActive}
                    onChange={setIsPluginActive}
                    activeColor="brand"
                  />
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
            <div className="bg-dark-800 p-6 rounded-2xl border border-dark-700/60 shadow-xs">
              <header className="border-b border-solid border-dark-700 pb-6 grid-cols-2 grid gap-6">
                <p className="text-dark-100 text-xl">Seus sorteios</p>
                <p className="text-right text-xl text-dark-300">
                  <span className="">{giveaways.length}</span>&nbsp;/&nbsp;100
                </p>
              </header>
              <div>
                <div className="group border-b border-solid border-dark-700 mb-6 flex items-center justify-start">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-5 transition-all duration-200 opacity-50 group-focus-within:opacity-100 shrink-0"
                  >
                    <path
                      d="M3.316 8.324a6.72 6.72 0 015.008-5.008 11.948 11.948 0 015.457 0 6.72 6.72 0 015.008 5.008 11.947 11.947 0 010 5.457 6.72 6.72 0 01-5.008 5.008 11.947 11.947 0 01-5.457 0 6.72 6.72 0 01-5.008-5.008 11.948 11.948 0 010-5.457z"
                      fill="rgba(154,161,181,0.16)"
                    />
                    <path
                      d="M3.316 13.781l.73-.171-.73.171zm0-5.457l.73.171-.73-.171zm15.473 0l.73-.171-.73.171zm0 5.457l.73.171-.73-.171zm-5.008 5.008l-.171-.73.171.73zm-5.457 0l-.171.73.171-.73zm0-15.473l-.171-.73.171.73zm5.457 0l.171-.73-.171.73zM20.47 21.53a.75.75 0 101.06-1.06l-1.06 1.06zM4.046 13.61a11.198 11.198 0 010-5.115l-1.46-.342a12.698 12.698 0 000 5.8l1.46-.343zm14.013-5.115a11.196 11.196 0 010 5.115l1.46.342a12.698 12.698 0 000-5.8l-1.46.343zm-4.45 9.564a11.196 11.196 0 01-5.114 0l-.342 1.46c1.907.448 3.892.448 5.8 0l-.343-1.46zM8.496 4.046a11.198 11.198 0 015.115 0l.342-1.46a12.698 12.698 0 00-5.8 0l.343 1.46zm0 14.013a5.97 5.97 0 01-4.45-4.45l-1.46.343a7.47 7.47 0 005.568 5.568l.342-1.46zm5.457 1.46a7.47 7.47 0 005.568-5.567l-1.46-.342a5.97 5.97 0 01-4.45 4.45l.342 1.46zM13.61 4.046a5.97 5.97 0 014.45 4.45l1.46-.343a7.47 7.47 0 00-5.568-5.567l-.342 1.46zm-5.457-1.46a7.47 7.47 0 00-5.567 5.567l1.46.342a5.97 5.97 0 014.45-4.45l-.343-1.46zm8.652 15.28l3.665 3.664 1.06-1.06-3.665-3.665-1.06 1.06z"
                      fill="#9B9D9F"
                    />
                  </svg>
                  <input
                    placeholder="Procurar..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full border-none bg-transparent outline-none text-base text-dark-300 py-6"
                  />
                </div>
                <main>
                  <div className="px-6 mb-4 flex items-center justify-between">
                    <div className="w-full grid grid-cols-11 gap-4">
                      <p className="col-span-4 lg:col-span-3 text-dark-400 text-sm">Sorteio</p>
                      <p className="col-span-4 lg:col-span-2 hidden lg:flex text-dark-400 text-sm">
                        Participantes
                      </p>
                      <p className="col-span-4 lg:col-span-2 hidden lg:flex text-dark-400 text-sm">
                        Status
                      </p>
                      <p className="col-span-3 hidden lg:flex text-dark-400 text-sm">
                        Horário de término
                      </p>
                      <p></p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-3">
                    {giveaways
                      .filter(
                        (gw) =>
                          gw.prize.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          gw.channel.toLowerCase().includes(searchQuery.toLowerCase())
                      )
                      .map((gw) => (
                        <a
                          key={gw.id}
                          href={`#/giveaways/${gw.id}`}
                          onClick={(e) => {
                            e.preventDefault();
                            setIsCreatingGiveaway(true);
                          }}
                          className="block no-underline"
                        >
                          <div className="bg-dark-900 rounded-xl p-6 flex items-center justify-between transition-all duration-200 border border-solid border-dark-900 cursor-pointer hover:border-brand-light">
                            <div className="w-full flex flex-col items-start lg:items-center lg:grid lg:grid-cols-11 gap-4">
                              {/* Sorteio info */}
                              <div className="flex items-center justify-between w-full lg:block lg:col-span-3">
                                <div>
                                  <p className="text-dark-100 font-semibold text-base mb-1">
                                    {gw.prize}
                                  </p>
                                  <p className="text-dark-300 flex items-center">
                                    <svg
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="text-dark-100 mr-1 h-4 w-4 shrink-0"
                                    >
                                      <path
                                        fill="currentColor"
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M5.88657 21C5.57547 21 5.3399 20.7189 5.39427 20.4126L6.00001 17H2.59511C2.28449 17 2.04905 16.7198 2.10259 16.4138L2.27759 15.4138C2.31946 15.1746 2.52722 15 2.77011 15H6.35001L7.41001 9H4.00511C3.69449 9 3.45905 8.71977 3.51259 8.41381L3.68759 7.41381C3.72946 7.17456 3.93722 7 4.18011 7H7.76001L8.39677 3.41262C8.43914 3.17391 8.64664 3 8.88907 3H9.87344C10.1845 3 10.4201 3.28107 10.3657 3.58738L9.76001 7H15.76L16.3968 3.41262C16.4391 3.17391 16.6466 3 16.8891 3H17.8734C18.1845 3 18.4201 3.28107 18.3657 3.58738L17.76 7H21.1649C21.4755 7 21.711 7.28023 21.6574 7.58619L21.4824 8.58619C21.4406 8.82544 21.2328 9 20.9899 9H17.41L16.35 15H19.7549C20.0655 15 20.301 15.2802 20.2474 15.5862L20.0724 16.5862C20.0306 16.8254 19.8228 17 19.5799 17H16L15.3632 20.5874C15.3209 20.8261 15.1134 21 14.8709 21H13.8866C13.5755 21 13.3399 20.7189 13.3943 20.4126L14 17H8.00001L7.36325 20.5874C7.32088 20.8261 7.11337 21 6.87094 21H5.88657ZM9.41045 9L8.35045 15H14.3504L15.4104 9H9.41045Z"
                                      />
                                    </svg>
                                    {gw.channel}
                                  </p>
                                </div>
                                <div className="lg:hidden block ml-2">
                                  <div className="relative max-w-max">
                                    <div>
                                      <button
                                        type="button"
                                        onClick={(e) => {
                                          e.preventDefault();
                                          e.stopPropagation();
                                          setActiveMenuId(
                                            activeMenuId === `${gw.id}-mobile`
                                              ? null
                                              : `${gw.id}-mobile`
                                          );
                                        }}
                                        className="relative flex overflow-hidden shrink-0 rounded-lg transition-all duration-200 items-center gap-1.5 bg-white/10 text-white hover:bg-white/20 active:bg-white/5 text-sm p-1.5 cursor-pointer"
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
                                            d="M14 5c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2zM14 19c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2zM14 12c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2z"
                                            fill="rgba(154,161,181,0.16)"
                                            stroke="#9B9D9F"
                                            strokeWidth="1.5"
                                          />
                                        </svg>
                                      </button>
                                    </div>
                                    <div
                                      className={`z-20 rounded-xl shadow-xl p-2 min-w-[170px] max-w-max absolute right-0 mt-2 transform transition-all duration-200 bg-dark-800 border border-solid border-dark-600 ${
                                        activeMenuId === `${gw.id}-mobile`
                                          ? 'opacity-100 pointer-events-auto translate-y-0 h-auto overflow-visible'
                                          : 'opacity-0 pointer-events-none -translate-y-6 h-0 overflow-hidden'
                                      }`}
                                    >
                                      <div>
                                        <div
                                          onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            handleDuplicateGiveaway(gw);
                                            setActiveMenuId(null);
                                          }}
                                          className="whitespace-nowrap relative rounded-lg flex items-center justify-start p-3 text-dark-300 text-base hover:bg-dark-900 hover:bg-opacity-30 cursor-pointer"
                                        >
                                          <div className="inline-block mr-2.5">
                                            <svg
                                              width="24"
                                              height="24"
                                              viewBox="0 0 24 24"
                                              fill="none"
                                              xmlns="http://www.w3.org/2000/svg"
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
                                          <span className="transition-all duration-200">Duplicado</span>
                                          <span className="transition-all duration-200 absolute top-0 left-0 w-full h-full flex items-center justify-center opacity-0">
                                            loading
                                          </span>
                                        </div>
                                        <div className="h-[1px] w-full bg-dark-700" />
                                      </div>
                                      <div>
                                        <div
                                          onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            handleDeleteGiveaway(gw.id);
                                            setActiveMenuId(null);
                                          }}
                                          className="whitespace-nowrap relative rounded-lg flex items-center justify-start p-3 text-dark-300 text-base hover:bg-dark-900 hover:bg-opacity-30 cursor-pointer"
                                        >
                                          <div className="inline-block mr-2.5">
                                            <svg
                                              width="24"
                                              height="24"
                                              viewBox="0 0 24 24"
                                              fill="none"
                                              xmlns="http://www.w3.org/2000/svg"
                                            >
                                              <path
                                                d="M5 7.033h14v5.143c0 1.575-.222 3.142-.658 4.654a5.627 5.627 0 01-4.46 3.999l-.158.026a10.344 10.344 0 01-3.448 0l-.158-.026a5.627 5.627 0 01-4.46-3.999A16.783 16.783 0 015 12.176V7.033z"
                                                fill="rgba(154,161,181,0.16)"
                                              />
                                              <path
                                                d="M3 6.283a.75.75 0 000 1.5v-1.5zm18 1.5a.75.75 0 000-1.5v1.5zm-16-.75v-.75h-.75v.75H5zm14 0h.75v-.75H19v.75zm-.658 9.797l.72.208-.72-.208zm-4.618 4.025l.125.74-.125-.74zm-3.448 0l.125-.74-.125.74zm-.158-.026l-.125.74.125-.74zm-4.46-3.999l-.72.208.72-.208zm8.224 3.999l-.125-.74.125.74zm-6.04-15.34l.681.315-.68-.315zm.976-1.308l-.5-.558.5.558zm1.46-.874l.26.703-.26-.703zm3.444 0l.261-.703-.26.703zm2.435 2.182l.681-.314-.68.314zM3 7.783h18v-1.5H3v1.5zm10.757 12.306l-.158.027.25 1.479.158-.027-.25-1.479zm-3.356.027l-.158-.027-.25 1.48.158.026.25-1.48zM18.25 7.033v5.143h1.5V7.033h-1.5zm-12.5 5.143V7.033h-1.5v5.143h1.5zm12.5 0c0 1.505-.212 3.002-.629 4.446l1.441.416c.456-1.58.688-3.217.688-4.862h-1.5zm-4.651 7.94a9.595 9.595 0 01-3.198 0l-.25 1.479c1.224.207 2.474.207 3.698 0l-.25-1.48zm-3.356-.027a4.877 4.877 0 01-3.864-3.467l-1.441.416a6.377 6.377 0 005.055 4.53l.25-1.479zM6.38 16.622a16.033 16.033 0 01-.629-4.446h-1.5c0 1.645.231 3.282.688 4.862l1.44-.416zm7.628 4.946a6.377 6.377 0 005.055-4.53l-1.44-.416a4.877 4.877 0 01-3.865 3.467l.25 1.48zM8.25 7.033c0-.42.092-.837.273-1.229l-1.361-.63a4.422 4.422 0 00-.412 1.859h1.5zm.273-1.229c.182-.393.45-.755.796-1.064L8.317 3.623c-.49.44-.884.966-1.155 1.552l1.361.63zM9.32 4.74c.345-.31.759-.559 1.22-.73l-.522-1.406c-.63.234-1.209.579-1.7 1.019L9.32 4.74zm1.22-.73c.461-.171.958-.26 1.461-.26v-1.5c-.679 0-1.352.12-1.983.354l.522 1.406zM12 3.75c.503 0 1 .089 1.461.26l.522-1.406A5.707 5.707 0 0012 2.25v1.5zm1.461.26c.461.171.875.42 1.22.73l1.002-1.117a5.317 5.317 0 00-1.7-1.02l-.522 1.407zm1.22.73c.345.309.614.671.796 1.064l1.361-.63a4.784 4.784 0 00-1.156-1.551l-1 1.117zm.796 1.064c.181.392.273.81.273 1.229h1.5c0-.64-.14-1.272-.412-1.858l-1.361.63zM5 7.783h14v-1.5H5v1.5z"
                                                fill="rgba(154,161,181,0.16)"
                                              />
                                              <path
                                                d="M10 12v4m4-4v4"
                                                stroke="#9B9D9F"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                              />
                                            </svg>
                                          </div>
                                          <span className="transition-all duration-200">Deletar</span>
                                          <span className="transition-all duration-200 absolute top-0 left-0 w-full h-full flex items-center justify-center opacity-0">
                                            loading
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Participantes */}
                              <div className="col-span-4 lg:col-span-2 flex items-center justify-start">
                                <p className="inline-block lg:hidden text-dark-400 text-sm mr-1">
                                  Participantes:
                                </p>
                                <div className="flex items-center justify-start">
                                  <div className="relative mr-2">
                                    <div className="rounded-full bg-success-default h-[6px] w-[6px]"></div>
                                    <div className="absolute top-0 left-0 transition-all duration-200 animate-ping rounded-full bg-success-default h-[6px] w-[6px]"></div>
                                  </div>
                                  <p className="text-dark-100">{gw.participantsCount}</p>
                                </div>
                              </div>

                              {/* Status */}
                              <div className="col-span-4 lg:col-span-2 flex items-center justify-start">
                                <p className="inline-block lg:hidden text-dark-400 text-sm mr-1">
                                  Status:
                                </p>
                                <div className="flex items-center gap-2">
                                  <div
                                    className={`inline-block relative rounded-full transition-all duration-200 text-xs px-2.5 py-0.5 font-medium ${
                                      gw.status === 'active'
                                        ? 'bg-[rgba(34,197,94,0.18)] text-success-default'
                                        : 'bg-[rgba(154,161,181,0.16)] text-dark-300'
                                    }`}
                                  >
                                    <div className="max-w-max flex items-center justify-start whitespace-nowrap">
                                      {gw.status === 'active' ? 'Em andamento' : 'Encerrado'}
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Horário de término */}
                              <div className="col-span-3 flex items-center justify-start">
                                <p className="text-dark-100 font-medium">
                                  {gw.endsAt}
                                </p>
                              </div>

                              {/* Ações (Desktop) */}
                              <div className="col-span-1 hidden lg:flex items-center justify-end">
                                <div className="relative max-w-max">
                                  <div>
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        setActiveMenuId(
                                          activeMenuId === `${gw.id}-desktop`
                                            ? null
                                            : `${gw.id}-desktop`
                                        );
                                      }}
                                      className="relative flex overflow-hidden shrink-0 rounded-lg transition-all duration-200 items-center gap-1.5 bg-white/10 text-white hover:bg-white/20 active:bg-white/5 text-sm p-1.5 cursor-pointer"
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
                                          d="M14 5c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2zM14 19c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2zM14 12c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2z"
                                          fill="rgba(154,161,181,0.16)"
                                          stroke="#9B9D9F"
                                          strokeWidth="1.5"
                                        />
                                      </svg>
                                    </button>
                                  </div>
                                  <div
                                    className={`z-20 rounded-xl shadow-xl p-2 min-w-[170px] max-w-max absolute right-0 mt-2 transform transition-all duration-200 bg-dark-800 border border-solid border-dark-600 ${
                                      activeMenuId === `${gw.id}-desktop`
                                        ? 'opacity-100 pointer-events-auto translate-y-0 h-auto overflow-visible'
                                        : 'opacity-0 pointer-events-none -translate-y-6 h-0 overflow-hidden'
                                    }`}
                                  >
                                    <div>
                                      <div
                                        onClick={(e) => {
                                          e.preventDefault();
                                          e.stopPropagation();
                                          handleDuplicateGiveaway(gw);
                                          setActiveMenuId(null);
                                        }}
                                        className="whitespace-nowrap relative rounded-lg flex items-center justify-start p-3 text-dark-300 text-base hover:bg-dark-900 hover:bg-opacity-30 cursor-pointer"
                                      >
                                        <div className="inline-block mr-2.5">
                                          <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
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
                                        <span className="transition-all duration-200">Duplicado</span>
                                        <span className="transition-all duration-200 absolute top-0 left-0 w-full h-full flex items-center justify-center opacity-0">
                                          loading
                                        </span>
                                      </div>
                                      <div className="h-[1px] w-full bg-dark-700" />
                                    </div>
                                    <div>
                                      <div
                                        onClick={(e) => {
                                          e.preventDefault();
                                          e.stopPropagation();
                                          handleDeleteGiveaway(gw.id);
                                          setActiveMenuId(null);
                                        }}
                                        className="whitespace-nowrap relative rounded-lg flex items-center justify-start p-3 text-dark-300 text-base hover:bg-dark-900 hover:bg-opacity-30 cursor-pointer"
                                      >
                                        <div className="inline-block mr-2.5">
                                          <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                          >
                                            <path
                                              d="M5 7.033h14v5.143c0 1.575-.222 3.142-.658 4.654a5.627 5.627 0 01-4.46 3.999l-.158.026a10.344 10.344 0 01-3.448 0l-.158-.026a5.627 5.627 0 01-4.46-3.999A16.783 16.783 0 015 12.176V7.033z"
                                              fill="rgba(154,161,181,0.16)"
                                            />
                                            <path
                                              d="M3 6.283a.75.75 0 000 1.5v-1.5zm18 1.5a.75.75 0 000-1.5v1.5zm-16-.75v-.75h-.75v.75H5zm14 0h.75v-.75H19v.75zm-.658 9.797l.72.208-.72-.208zm-4.618 4.025l.125.74-.125-.74zm-3.448 0l.125-.74-.125.74zm-.158-.026l-.125.74.125-.74zm-4.46-3.999l-.72.208.72-.208zm8.224 3.999l-.125-.74.125.74zm-6.04-15.34l.681.315-.68-.315zm.976-1.308l-.5-.558.5.558zm1.46-.874l.26.703-.26-.703zm3.444 0l.261-.703-.26.703zm2.435 2.182l.681-.314-.68.314zM3 7.783h18v-1.5H3v1.5zm10.757 12.306l-.158.027.25 1.479.158-.027-.25-1.479zm-3.356.027l-.158-.027-.25 1.48.158.026.25-1.48zM18.25 7.033v5.143h1.5V7.033h-1.5zm-12.5 5.143V7.033h-1.5v5.143h1.5zm12.5 0c0 1.505-.212 3.002-.629 4.446l1.441.416c.456-1.58.688-3.217.688-4.862h-1.5zm-4.651 7.94a9.595 9.595 0 01-3.198 0l-.25 1.479c1.224.207 2.474.207 3.698 0l-.25-1.48zm-3.356-.027a4.877 4.877 0 01-3.864-3.467l-1.441.416a6.377 6.377 0 005.055 4.53l.25-1.479zM6.38 16.622a16.033 16.033 0 01-.629-4.446h-1.5c0 1.645.231 3.282.688 4.862l1.44-.416zm7.628 4.946a6.377 6.377 0 005.055-4.53l-1.44-.416a4.877 4.877 0 01-3.865 3.467l.25 1.48zM8.25 7.033c0-.42.092-.837.273-1.229l-1.361-.63a4.422 4.422 0 00-.412 1.859h1.5zm.273-1.229c.182-.393.45-.755.796-1.064L8.317 3.623c-.49.44-.884.966-1.155 1.552l1.361.63zM9.32 4.74c.345-.31.759-.559 1.22-.73l-.522-1.406c-.63.234-1.209.579-1.7 1.019L9.32 4.74zm1.22-.73c.461-.171.958-.26 1.461-.26v-1.5c-.679 0-1.352.12-1.983.354l.522 1.406zM12 3.75c.503 0 1 .089 1.461.26l.522-1.406A5.707 5.707 0 0012 2.25v1.5zm1.461.26c.461.171.875.42 1.22.73l1.002-1.117a5.317 5.317 0 00-1.7-1.02l-.522 1.407zm1.22.73c.345.309.614.671.796 1.064l1.361-.63a4.784 4.784 0 00-1.156-1.551l-1 1.117zm.796 1.064c.181.392.273.81.273 1.229h1.5c0-.64-.14-1.272-.412-1.858l-1.361.63zM5 7.783h14v-1.5H5v1.5z"
                                              fill="rgba(154,161,181,0.16)"
                                            />
                                            <path
                                              d="M10 12v4m4-4v4"
                                              stroke="#9B9D9F"
                                              strokeWidth="1.5"
                                              strokeLinecap="round"
                                            />
                                          </svg>
                                        </div>
                                        <span className="transition-all duration-200">Deletar</span>
                                        <span className="transition-all duration-200 absolute top-0 left-0 w-full h-full flex items-center justify-center opacity-0">
                                          loading
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </a>
                      ))}
                  </div>
                </main>
              </div>
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
                    <div className="flex items-center w-full shadow-xs relative rounded-xl p-5 bg-dark-900 border border-dark-700/80 transition-all hover:border-dark-600 justify-between gap-4">
                      <div className="flex flex-col">
                        <h5 className="flex text-body font-bold text-dark-100 font-mono text-sm">
                          /reroll
                        </h5>
                        <p className="text-xs text-dark-300 mt-0.5">
                          Sortear um novo vencedor da lista de participantes
                        </p>
                      </div>

                      <div className="flex items-center gap-3 ml-auto">
                        <DiscordSwitch
                          checked={isRerollActive}
                          onChange={setIsRerollActive}
                          activeColor="brand"
                        />

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
                    <div className="flex items-center w-full shadow-xs relative rounded-xl p-5 bg-dark-900 border border-dark-700/80 transition-all hover:border-dark-600 justify-between gap-4">
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
                    <input type="checkbox" defaultChecked className="accent-violet-500 rounded-md" />
                    <span className="text-white font-medium">Administradores</span>
                  </label>
                  <label className="flex items-center gap-2 p-2.5 rounded-xl bg-dark-900 border border-dark-700 cursor-pointer">
                    <input type="checkbox" defaultChecked className="accent-violet-500 rounded-md" />
                    <span className="text-white font-medium">Moderadores</span>
                  </label>
                  <label className="flex items-center gap-2 p-2.5 rounded-xl bg-dark-900 border border-dark-700 cursor-pointer">
                    <input type="checkbox" className="accent-violet-500 rounded-md" />
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
    </div>
  );
};
