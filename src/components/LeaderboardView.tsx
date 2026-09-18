import React, { useState } from 'react';
import {
  ArrowLeft,
  Check,
  ChevronDown,
  ChevronUp,
  Crown,
  Image as ImageIcon,
  MessageSquare,
  Plus,
  Search,
  Trophy,
} from 'lucide-react';
import { LeaderboardUser, ServerInfo } from '../types';
import { LEADERBOARD_USERS, SERVER_CATEGORIES, SERVER_CHANNELS } from '../data/mockData';
import { DiscordSwitch, DiscordChannelSelect } from './common';

interface LeaderboardViewProps {
  currentServer: ServerInfo;
  onOpenDirectImageModal: () => void;
}

// Authentic MEE6 VIP / Crown Sparkles Badge SVG
export const Mee6CrownBadge: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`shrink-0 inline-block ${className}`}
  >
    <g clipPath="url(#prefix__clip0)">
      <path d="M13.174 17.44h-1.349v.003h1.349v-.003z" fill="#FFCB39" />
      <path opacity="0.3" d="M13.174 17.44h-1.349v.003h1.349v-.003z" fill="#fff" />
      <path
        d="M12.144 6.184a.317.317 0 00-.056-.074l-.019-.015a.44.44 0 00-.059-.037h-.016l-.072-.021a.332.332 0 00-.088 0v4.47l1.137-2.774-.827-1.549z"
        fill="#FFCB39"
      />
      <path
        d="M11.826 18.91v-1.186H4.154a1.62 1.62 0 00-1.135.462c-.301.296-.47.697-.47 1.116v.131c0 .418.169.82.47 1.116.301.295.71.462 1.135.462h6.858l.803-1.986.01-.115z"
        fill="#FFE570"
      />
      <path
        d="M21.977 19.088a.42.42 0 000-.052c-.009-.06-.022-.12-.04-.179v-.018a1.463 1.463 0 00-.072-.19l-.016-.034a1.655 1.655 0 00-.094-.165 1.616 1.616 0 00-.283-.321 1.673 1.673 0 00-.375-.24l-.155-.06-.153-.042h-.016l-.13-.021-1.339 3.26h1.121a1.58 1.58 0 001.012-.357c.079-.065.152-.137.22-.213a1.601 1.601 0 00.352-.818V19.302a1.346 1.346 0 00-.032-.213zM16.548 17.724L15.205 21h1.857l1.343-3.276h-1.857z"
        fill="#FFCB39"
      />
      <path d="M11.012 21h.813v-1.985L11.012 21z" fill="#FFE570" />
      <path opacity="0.3" d="M11.012 21h.813v-1.985L11.012 21z" fill="#fff" />
      <path d="M12.355 17.724l-.53 1.29V21h3.38l1.343-3.276h-4.193z" fill="#FFCB39" />
      <path opacity="0.3" d="M12.355 17.724l-.53 1.29V21h3.38l1.343-3.276h-4.193z" fill="#fff" />
      <path d="M11.825 19.015l.53-1.291h-.53v1.291zM20.596 17.737h-2.191l-1.338 3.276h2.21l1.338-3.26-.019-.016z" fill="#FFCB39" />
      <path opacity="0.3" d="M20.596 17.737h-2.191l-1.338 3.276h2.21l1.338-3.26-.019-.016z" fill="#fff" />
      <path
        d="M18.763 8.784c-.789-1.717-.647-1.577-2.394-2.366 1.747-.773 1.605-.634 2.394-2.353.787 1.72.645 1.577 2.395 2.366-1.75.776-1.608.64-2.395 2.353zM22.224 6.492c-.587-1.276-.482-1.17-1.777-1.746 1.295-.576 1.19-.47 1.777-1.746.583 1.275.478 1.17 1.776 1.746-1.298.576-1.193.47-1.776 1.746z"
        fill="#C8D4FF"
      />
      <path
        d="M20.968 17.443H3.578a.281.281 0 00-.283.278v.003c0 .154.127.279.284.279h17.39a.281.281 0 00.283-.28v-.002a.281.281 0 00-.284-.278z"
        fill="#D0A500"
      />
      <path
        d="M11.825 6.024a.308.308 0 00-.22.155l-3.7 7.075a.296.296 0 01-.22.157.305.305 0 01-.259-.083l-4.91-4.822a.304.304 0 00-.474.063.293.293 0 00-.04.173l1.496 8.7h5.48l2.847-6.94V6.023z"
        fill="#FFE570"
      />
      <path
        d="M16.297 13.333a.308.308 0 01-.474-.082l-.522-1.001-2.14 5.19h1.806l1.902-4.636-.572.529zM22.303 8.077a.297.297 0 00-.267.074l-1.648 1.488-3.211 7.801h3.917l1.448-9.029a.29.29 0 00-.051-.214.3.3 0 00-.188-.12z"
        fill="#FFCB39"
      />
      <path d="M11.825 10.501L8.98 17.443h2.847V10.5z" fill="#FFE570" />
      <path opacity="0.3" d="M11.825 10.501L8.98 17.443h2.847V10.5z" fill="#fff" />
      <path
        d="M12.957 7.743l-1.132 2.758v6.939h1.349l2.127-5.19-2.344-4.507z"
        fill="#FFCB39"
      />
      <path opacity="0.3" d="M12.957 7.743l-1.132 2.758v6.939h1.349l2.127-5.19-2.344-4.507z" fill="#fff" />
      <path d="M16.882 12.805L14.98 17.44h2.213l3.2-7.801-3.51 3.166z" fill="#FFCB39" />
      <path opacity="0.3" d="M16.882 12.805L14.98 17.44h2.213l3.2-7.801-3.51 3.166z" fill="#fff" />
    </g>
    <defs>
      <clipPath id="prefix__clip0">
        <path fill="#fff" transform="translate(2 3)" d="M0 0h22v18H0z" />
      </clipPath>
    </defs>
  </svg>
);

export const LeaderboardView: React.FC<LeaderboardViewProps> = ({
  currentServer,
  onOpenDirectImageModal,
}) => {
  // Navigation mode: 'settings' (Configurações do Placar) or 'rankings' (Ver classificações)
  const [viewMode, setViewMode] = useState<'settings' | 'rankings'>('settings');

  // Settings state matching MEE6
  const [isPublic, setIsPublic] = useState(true);
  const [allowInvite, setAllowInvite] = useState(true);
  const [inviteChannel, setInviteChannel] = useState('🔹・liberar');
  const [vanityUrl, setVanityUrl] = useState('vixestudio');

  // Accordion state
  const [isMonetizeOpen, setIsMonetizeOpen] = useState(true);
  const [isVanityOpen, setIsVanityOpen] = useState(true);

  // Baseline state for tracking unsaved modifications
  const [savedSettings, setSavedSettings] = useState({
    isPublic: true,
    allowInvite: true,
    inviteChannel: '🔹・liberar',
    vanityUrl: 'vixestudio',
  });

  const [showSaveToast, setShowSaveToast] = useState(false);

  const hasChanges =
    isPublic !== savedSettings.isPublic ||
    allowInvite !== savedSettings.allowInvite ||
    inviteChannel !== savedSettings.inviteChannel ||
    vanityUrl !== savedSettings.vanityUrl;

  const handleSave = () => {
    setSavedSettings({
      isPublic,
      allowInvite,
      inviteChannel,
      vanityUrl,
    });
    setShowSaveToast(true);
    setTimeout(() => setShowSaveToast(false), 3000);
  };

  const handleCancel = () => {
    setIsPublic(savedSettings.isPublic);
    setAllowInvite(savedSettings.allowInvite);
    setInviteChannel(savedSettings.inviteChannel);
    setVanityUrl(savedSettings.vanityUrl);
  };

  // Rankings state
  const [users, setUsers] = useState<LeaderboardUser[]>(LEADERBOARD_USERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [serverBanner, setServerBanner] = useState(
    'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&auto=format&fit=crop&q=80'
  );
  const [isEditingBanner, setIsEditingBanner] = useState(false);

  const filteredUsers = users.filter(
    (u) =>
      u.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleGiveXp = (userId: string) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          const newXp = u.xp + 500;
          const newLevel = Math.floor(newXp / 2000) + 1;
          return {
            ...u,
            xp: newXp,
            level: newLevel,
            messagesCount: u.messagesCount + 1,
          };
        }
        return u;
      })
    );
  };

  const top3 = users.slice(0, 3);

  // ==========================================
  // VIEW: RANKINGS (Ver classificações)
  // ==========================================
  if (viewMode === 'rankings') {
    return (
      <div className="space-y-8 pb-16 animate-fadeIn">
        {/* Navigation Bar back to Settings */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setViewMode('settings')}
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-dark-800 hover:bg-dark-700 text-dark-100 font-semibold text-sm border border-dark-600 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Configurações do Placar de XP
          </button>
          <span className="text-xs text-dark-300 font-medium hidden sm:inline-block">
            Visualização Pública da Classificação
          </span>
        </div>

        {/* Top Customizable Banner */}
        <div className="relative rounded-2xl overflow-hidden border border-dark-700 bg-dark-800 shadow-xl group">
          <img
            src={serverBanner}
            alt="Banner do Placar de XP"
            className="w-full h-48 sm:h-64 object-cover filter brightness-75 group-hover:brightness-90 transition-all duration-300"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-dark-default via-dark-default/50 to-transparent" />

          {/* Edit Banner Action */}
          <div className="absolute top-3 right-3 sm:top-4 sm:right-4 flex items-center gap-2">
            <button
              onClick={() => setIsEditingBanner(!isEditingBanner)}
              className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/20 text-white text-[11px] sm:text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <ImageIcon className="w-3.5 h-3.5 text-dark-200" />
              <span className="hidden xs:inline">Mudar Banner</span>
              <span className="xs:hidden">Banner</span>
            </button>
          </div>

          {/* Server Info Overlay */}
          <div className="absolute bottom-3 sm:bottom-4 left-3 right-3 sm:left-6 sm:right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4">
            <div className="flex items-end gap-3 sm:gap-4 min-w-0">
              <img
                src={currentServer.iconUrl}
                alt={currentServer.name}
                className="w-14 h-14 sm:w-20 sm:h-20 rounded-2xl object-cover ring-2 sm:ring-4 ring-dark-default shadow-2xl shrink-0"
              />
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                  <h1 className="text-lg sm:text-2xl font-extrabold text-dark-100 font-display truncate">
                    Placar de XP • {currentServer.name}
                  </h1>
                  <span className="text-[10px] sm:text-xs px-2 py-0.5 rounded-md bg-dark-700 text-dark-200 font-bold border border-dark-600 shrink-0">
                    Temporada Ativa
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs text-dark-300 mt-1 line-clamp-1 sm:line-clamp-none">
                  Converse nos canais de texto para subir de nível e desbloquear cargos e recompensas exclusivas!
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[11px] sm:text-xs text-dark-400">
                Total de Membros no Placar: <strong className="text-white">{users.length}</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Banner Edit Sub-bar if opened */}
        {isEditingBanner && (
          <div className="p-3 sm:p-4 bg-dark-800 border border-dark-700 rounded-xl flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 animate-fadeIn">
            <label className="text-xs font-bold uppercase tracking-wider text-dark-400 shrink-0">
              URL Direta do Banner:
            </label>
            <input
              type="url"
              value={serverBanner}
              onChange={(e) => setServerBanner(e.target.value)}
              placeholder="https://exemplo.com/banner.png"
              className="flex-1 bg-dark-default border border-dark-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-dark-500"
            />
            <button
              onClick={onOpenDirectImageModal}
              className="px-3 py-1.5 bg-dark-100 hover:bg-white text-dark-default text-xs font-semibold rounded-lg shrink-0 cursor-pointer"
            >
              Escolher dos Presets
            </button>
          </div>
        )}

        {/* Podium Top 3 */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-2">
          {top3[1] && (
            <div className="bg-dark-800 border border-dark-700 rounded-2xl p-4 sm:p-5 flex flex-col items-center text-center relative overflow-hidden order-2 sm:order-1">
              <div className="w-10 h-10 rounded-full bg-slate-400/20 text-dark-300 font-black text-sm flex items-center justify-center mb-3">
                #2
              </div>
              <div className="relative mb-3">
                <img
                  src={top3[1].avatarUrl}
                  alt={top3[1].username}
                  className="w-16 h-16 rounded-full object-cover ring-2 ring-slate-400 shadow-lg"
                />
                <span className="absolute -bottom-1 -right-1 px-1.5 py-0.2 bg-slate-700 text-white rounded-full text-[10px] font-bold">
                  Nv. {top3[1].level}
                </span>
              </div>
              <h4 className="text-sm font-bold text-dark-100 font-display">{top3[1].username}</h4>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md mt-1 bg-dark-700 text-dark-200 border border-dark-600">
                {top3[1].role}
              </span>
              <div className="mt-3 text-xs text-dark-400">
                <strong className="text-white">{top3[1].xp.toLocaleString('pt-BR')}</strong> XP •{' '}
                {top3[1].messagesCount.toLocaleString('pt-BR')} msgs
              </div>
              <button
                onClick={() => handleGiveXp(top3[1].id)}
                className="mt-3 px-3 py-1 rounded-lg bg-dark-700 hover:bg-dark-600 text-dark-200 hover:text-dark-100 text-[11px] font-semibold transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3 h-3" /> Dar +500 XP
              </button>
            </div>
          )}

          {top3[0] && (
            <div className="bg-dark-800 border-2 border-dark-600 rounded-2xl p-6 flex flex-col items-center text-center relative overflow-hidden order-1 md:order-2 shadow-lg">
              <div className="absolute top-2 right-2">
                <Crown className="w-6 h-6 text-dark-100 fill-dark-100" />
              </div>
              <div className="w-12 h-12 rounded-full bg-dark-700 text-dark-100 border border-dark-600 font-black text-base flex items-center justify-center mb-3">
                #1
              </div>
              <div className="relative mb-3">
                <img
                  src={top3[0].avatarUrl}
                  alt={top3[0].username}
                  className="w-20 h-20 rounded-full object-cover ring-4 ring-dark-500 shadow-2xl"
                />
                <span className="absolute -bottom-1 -right-1 px-2 py-0.5 bg-dark-100 text-dark-default rounded-full text-xs font-black">
                  Nv. {top3[0].level}
                </span>
              </div>
              <h4 className="text-base font-extrabold text-dark-100 font-display">
                {top3[0].username}
              </h4>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-md mt-1 bg-dark-700 text-dark-200 border border-dark-600">
                {top3[0].role}
              </span>
              <div className="mt-3 text-xs text-dark-300">
                <strong className="text-dark-100 text-sm">
                  {top3[0].xp.toLocaleString('pt-BR')}
                </strong>{' '}
                XP • {top3[0].messagesCount.toLocaleString('pt-BR')} msgs
              </div>
              <button
                onClick={() => handleGiveXp(top3[0].id)}
                className="mt-4 px-4 py-1.5 rounded-lg bg-dark-100 hover:bg-white text-dark-default text-xs font-extrabold transition-colors flex items-center gap-1 shadow-xs cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" /> Dar +500 XP
              </button>
            </div>
          )}

          {top3[2] && (
            <div className="bg-dark-800 border border-dark-700 rounded-2xl p-5 flex flex-col items-center text-center relative overflow-hidden order-3">
              <div className="w-10 h-10 rounded-full bg-dark-700 text-dark-200 border border-dark-600 font-black text-sm flex items-center justify-center mb-3">
                #3
              </div>
              <div className="relative mb-3">
                <img
                  src={top3[2].avatarUrl}
                  alt={top3[2].username}
                  className="w-16 h-16 rounded-full object-cover ring-2 ring-dark-600 shadow-lg"
                />
                <span className="absolute -bottom-1 -right-1 px-1.5 py-0.2 bg-dark-700 text-dark-200 border border-dark-600 rounded-full text-[10px] font-bold">
                  Nv. {top3[2].level}
                </span>
              </div>
              <h4 className="text-sm font-bold text-dark-100 font-display">{top3[2].username}</h4>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md mt-1 bg-dark-700 text-dark-200 border border-dark-600">
                {top3[2].role}
              </span>
              <div className="mt-3 text-xs text-dark-400">
                <strong className="text-white">{top3[2].xp.toLocaleString('pt-BR')}</strong> XP •{' '}
                {top3[2].messagesCount.toLocaleString('pt-BR')} msgs
              </div>
              <button
                onClick={() => handleGiveXp(top3[2].id)}
                className="mt-3 px-3 py-1 rounded-lg bg-dark-700 hover:bg-dark-600 text-dark-200 hover:text-dark-100 text-[11px] font-semibold transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3 h-3" /> Dar +500 XP
              </button>
            </div>
          )}
        </div>

        {/* Member Ranking Table */}
        <div className="bg-dark-800 border border-dark-700 rounded-2xl overflow-hidden shadow-xl">
          <div className="p-4 border-b border-dark-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-dark-300" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Classificação Completa dos Membros
              </h3>
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 text-dark-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Pesquisar por membro ou cargo..."
                className="w-full bg-dark-default border border-dark-700 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-dark-500"
              />
            </div>
          </div>

          <div className="divide-y divide-[#272a35]/60 overflow-x-auto">
            {filteredUsers.map((user, idx) => (
              <div
                key={user.id}
                className="p-3.5 sm:p-4 flex items-center justify-between gap-4 hover:bg-dark-700/50 transition-colors"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <span
                    className={`w-7 text-center text-xs font-black shrink-0 ${
                      idx === 0
                        ? 'text-dark-300'
                        : idx === 1
                        ? 'text-dark-300'
                        : idx === 2
                        ? 'text-dark-400'
                        : 'text-slate-500'
                    }`}
                  >
                    #{idx + 1}
                  </span>

                  <img
                    src={user.avatarUrl}
                    alt={user.username}
                    className="w-10 h-10 rounded-full object-cover border border-dark-700 shrink-0"
                  />

                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs sm:text-sm font-bold text-white truncate">
                        {user.username}
                      </span>
                      <span className="text-[10px] text-slate-500">#{user.discriminator}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span
                        className="text-[10px] font-semibold px-2 py-0.2 rounded-full"
                        style={{
                          backgroundColor: `${user.roleColor}22`,
                          color: user.roleColor,
                          border: `1px solid ${user.roleColor}44`,
                        }}
                      >
                        {user.role}
                      </span>
                      <span className="text-[11px] text-dark-400 flex items-center gap-1">
                        <MessageSquare className="w-3 h-3 text-slate-500" />
                        {user.messagesCount.toLocaleString('pt-BR')}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 sm:gap-6 shrink-0">
                  <div className="text-right">
                    <div className="text-xs sm:text-sm font-extrabold text-white">
                      {user.xp.toLocaleString('pt-BR')}{' '}
                      <span className="text-[10px] font-normal text-dark-400">XP</span>
                    </div>
                    <div className="text-[11px] font-bold text-dark-200">Nível {user.level}</div>
                  </div>

                  <button
                    onClick={() => handleGiveXp(user.id)}
                    title="Adicionar +500 XP de teste"
                    className="px-2.5 py-1 bg-dark-default hover:bg-dark-600 hover:text-white border border-dark-700 text-dark-300 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">+XP</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW: CONFIGURAÇÕES DO PLACAR DE XP (Settings)
  // Matches exact MEE6 DOM layout and styling
  // ==========================================
  return (
    <div className="w-full min-h-full transition-all flex flex-col opacity-100 pb-24 animate-fadeIn">
      {/* Save Toast Notification */}
      {showSaveToast && (
        <div className="fixed top-20 right-6 z-50 bg-emerald-600 text-white text-sm font-semibold px-4 py-2.5 rounded-lg shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-top-3 duration-200">
          <Check className="w-4 h-4" />
          Configurações do Placar de XP salvas com sucesso!
        </div>
      )}

      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-start mb-8 gap-4">
        <div className="flex flex-col">
          <h3 className="text-dark-100 text-lg sm:text-xl font-semibold">
            Configurações do Placar de XP
          </h3>
          <p className="text-dark-300 mt-2 sm:mt-4 text-sm sm:text-base">
            A cada minuto que você mandar mensagens, você ganha uma quantidade aleatória de XP.
          </p>
        </div>
        <div className="shrink-0">
          <button
            onClick={() => setViewMode('rankings')}
            className="relative flex overflow-hidden shrink-0 rounded-lg transition-all duration-200 items-center gap-1.5 bg-brand-default text-dark-900 hover:bg-brand-hover active:bg-brand-default active:bg-opacity-40 text-base px-4 py-2 font-medium cursor-pointer shadow-sm"
          >
            <div className="flex flex grow justify-center max-w-full">
              <span className="transition-all duration-200 whitespace-nowrap text-ellipsis overflow-hidden block w-full shrink-0 text-center">
                Ver classificações
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Card 1: Tornar o Placar de XP do meu servidor público */}
      <div
        className="sub_feature_card mb-4 rounded-lg bg-dark-800 shadow-xs p-6 border border-dark-700/40"
        id="leaderboardSettings.public"
      >
        <div className="flex justify-between items-start gap-4">
          <div className="flex flex-col max-w-[820px]">
            <div className="flex items-center text-lg font-semibold text-dark-100">
              Tornar o Placar de XP do meu servidor público
            </div>
            <div className="mt-2 text-sm text-dark-300 leading-relaxed">
              Habilitando essa opção vai permitir com que seu Placar de XP seja visto por qualquer
              pessoa que possua o link, ou procurando seu servidor no Google.
            </div>
          </div>
          <div className="shrink-0">
            <DiscordSwitch
              checked={isPublic}
              onChange={setIsPublic}
              activeColor="brand"
              size="md"
            />
          </div>
        </div>
      </div>

      {/* Card 2: Permitir que usuários consigam entrar em seu servidor através do placar de xp */}
      <div
        className="sub_feature_card mb-4 rounded-lg bg-dark-800 shadow-xs p-6 border border-dark-700/40"
        id="leaderboardSettings.invite"
      >
        <div className="flex justify-between items-start gap-4">
          <div className="flex flex-col max-w-[820px]">
            <div className="flex items-center text-lg font-semibold text-dark-100 gap-2">
              <span>Permitir que usuários consigam entrar em seu servidor através do placar de xp</span>
              <Mee6CrownBadge className="w-5 h-5" />
            </div>
            <div className="mt-2 text-sm text-dark-300 leading-relaxed">
              Disponibiliza um botão para entrar no seu servidor através da sua página de Placar de XP.
            </div>
          </div>
          <div className="shrink-0">
            <DiscordSwitch
              checked={allowInvite}
              onChange={setAllowInvite}
              activeColor="brand"
              size="md"
            />
          </div>
        </div>

        {/* Channel Selector Section when enabled */}
        {allowInvite && (
          <div className="animate-fadeIn">
            <div className="grid w-full gap-4 lg:gap-6 grid-cols-1 lg:grid-cols-3 border-t border-solid border-dark-600 pt-6 mt-6" />
            <div className="max-w-md">
              <DiscordChannelSelect
                label="Convidar para o canal"
                required={true}
                value={inviteChannel}
                onChange={(val) => setInviteChannel(val as string)}
                channels={SERVER_CHANNELS}
                categories={SERVER_CATEGORIES}
                placeholder="Selecione um canal"
              />
            </div>
          </div>
        )}
      </div>

      {/* Card 3: Recursos de monetização (Accordion) */}
      <div
        className="bg-dark-800 shadow-xs sub_feature_card rounded-lg mb-4 border border-dark-700/40"
        id="leaderboard.settings.monetize.title"
      >
        <h3
          onClick={() => setIsMonetizeOpen(!isMonetizeOpen)}
          className="text-h6 text-dark-100 flex justify-between items-start hover:text-dark-200 transition-all py-4 lg:py-6 px-6 cursor-pointer select-none"
        >
          <div className="flex flex-col w-full pr-4 max-w-[760px]">
            <div className="sub_feature_title flex items-center text-lg font-semibold">
              Recursos de monetização
            </div>
          </div>
          <div className="flex items-center justify-between gap-4">
            <button
              type="button"
              className="pt-1 text-dark-300 hover:text-white transition-colors"
            >
              {isMonetizeOpen ? (
                <ChevronUp className="w-6 h-6" />
              ) : (
                <ChevronDown className="w-6 h-6" />
              )}
            </button>
          </div>
        </h3>

        {isMonetizeOpen && (
          <div className="text-base transition-all animate-fadeIn">
            <div className="p-6 pt-0">
              <div className="grid w-full border-t border-solid border-dark-700 pt-4" />
              <div className="flex flex-col items-start">
                <div className="text-dark-300 text-sm max-w-field mb-4 leading-relaxed">
                  Com o Monetize, você pode oferecer Bônus de XP como uma das vantagens de
                  assinatura e ganhar dinheiro de verdade com isso
                </div>
                <button
                  type="button"
                  onClick={() =>
                    alert('Redirecionando para as opções de monetização e assinaturas do servidor!')
                  }
                  className="relative flex overflow-hidden shrink-0 rounded-lg transition-all duration-200 items-center gap-1.5 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-dark-900 font-bold text-base px-4 py-2 hover:brightness-110 active:brightness-90 shadow-sm cursor-pointer"
                >
                  <div className="flex flex grow justify-center max-w-full">
                    <span className="transition-all duration-200 whitespace-nowrap text-ellipsis overflow-hidden block w-full shrink-0 text-center">
                      Comece a ganhar dinheiro
                    </span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Card 4: Link customizado (Accordion) */}
      <div
        className="bg-dark-800 shadow-xs sub_feature_card rounded-lg mb-4 border border-dark-700/40"
        id="leaderboardSettings.vanity"
      >
        <h3
          onClick={() => setIsVanityOpen(!isVanityOpen)}
          className="text-h6 text-dark-100 flex justify-between items-start hover:text-dark-200 transition-all py-4 lg:py-6 px-6 cursor-pointer select-none"
        >
          <div className="flex flex-col w-full pr-4 max-w-[760px]">
            <div className="sub_feature_title flex items-center text-lg font-semibold gap-2">
              <span>Link customizado</span>
              <Mee6CrownBadge className="w-5 h-5" />
            </div>
            <div className="mt-2 text-sm text-dark-300 leading-relaxed">
              Adquira um link customizado com o nome do seu servidor para acessar o Placar de XP.
            </div>
          </div>
          <div className="flex items-center justify-between gap-4">
            <button
              type="button"
              className="pt-1 text-dark-300 hover:text-white transition-colors"
            >
              {isVanityOpen ? (
                <ChevronUp className="w-6 h-6" />
              ) : (
                <ChevronDown className="w-6 h-6" />
              )}
            </button>
          </div>
        </h3>

        {isVanityOpen && (
          <div className="text-base transition-all animate-fadeIn">
            <div className="p-6 pt-0">
              <div className="grid w-full border-t border-solid border-dark-700 pt-4" />
              <div className="relative flex flex-col max-w-md">
                <div className="overflow-hidden flex items-center justify-start group bg-dark-900 rounded-lg border border-solid transition-all duration-200 focus-within:ring-2 focus-within:ring-brand-light hover:border-dark-600 border-dark-700">
                  <div className="h-full flex items-center min-h-[48px] whitespace-nowrap pl-4 select-none">
                    <label className="text-dark-300 text-sm font-medium">https://mee6.gg/</label>
                  </div>
                  <input
                    type="text"
                    value={vanityUrl}
                    onChange={(e) => setVanityUrl(e.target.value)}
                    className="bg-transparent outline-none border-none py-3 placeholder:text-dark-400 text-sm text-dark-100 w-full px-2 pr-3 font-medium"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Floating Unsaved Changes Bar */}
      {hasChanges && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-2xl bg-dark-800/95 backdrop-blur-md border border-dark-600 shadow-2xl rounded-2xl px-5 py-3.5 flex items-center justify-between gap-4 animate-in slide-in-from-bottom-5 duration-200 select-none">
          <div className="flex flex-1 text-dark-100 font-medium text-sm">
            Mudanças detectadas! Por favor, salve ou cancele.
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={handleCancel}
              className="relative flex overflow-hidden shrink-0 rounded-lg transition-all duration-200 items-center gap-1.5 bg-white bg-opacity-10 text-white hover:bg-opacity-20 active:bg-opacity-5 text-sm px-4 py-2 cursor-pointer font-medium"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="relative flex overflow-hidden shrink-0 rounded-lg transition-all duration-200 items-center gap-1.5 bg-brand-default text-dark-900 hover:bg-brand-hover active:bg-brand-default active:bg-opacity-40 text-sm px-4 py-2 font-bold cursor-pointer shadow-sm"
            >
              Salvar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
