import React, { useState } from 'react';
import {
  Crown,
  Flame,
  Image as ImageIcon,
  MessageSquare,
  Plus,
  Search,
  Sparkles,
  Trophy,
  UserCheck,
} from 'lucide-react';
import { LeaderboardUser, ServerInfo } from '../types';
import { LEADERBOARD_USERS } from '../data/mockData';

interface LeaderboardViewProps {
  currentServer: ServerInfo;
  onOpenDirectImageModal: () => void;
}

export const LeaderboardView: React.FC<LeaderboardViewProps> = ({
  currentServer,
  onOpenDirectImageModal,
}) => {
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

  return (
    <div className="space-y-8 pb-16 animate-fadeIn">
      {/* Top Customizable Banner with Direct HTML Image Link */}
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
        {/* 2nd Place */}
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

        {/* 1st Place (Center, Elevated) */}
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
              <strong className="text-dark-100 text-sm">{top3[0].xp.toLocaleString('pt-BR')}</strong>{' '}
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

        {/* 3rd Place */}
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
        {/* Table Header / Filter Bar */}
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

        {/* Table List */}
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
                  className="px-2.5 py-1 bg-dark-default hover:bg-dark-600 hover:text-white border border-dark-700 text-dark-300 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1"
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
};
