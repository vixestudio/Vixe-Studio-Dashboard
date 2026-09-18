import React, { useState, useEffect } from 'react';
import {
  Award,
  BarChart2,
  BarChart3,
  Bot,
  Cake,
  Check,
  ChevronDown,
  ChevronRight,
  Clock,
  Coins,
  Cpu,
  Crown,
  DoorOpen,
  Gem,
  Gift,
  Headphones,
  HelpCircle,
  Instagram,
  Landmark,
  Layers,
  LayoutDashboard,
  LayoutTemplate,
  Lock,
  MessageSquare,
  Music,
  Radio,
  Rss,
  Search,
  Settings,
  ShieldAlert,
  Smile,
  SmilePlus,
  Sparkles,
  Star,
  Tag,
  Terminal,
  Ticket,
  TrendingUp,
  Trophy,
  Twitch,
  Twitter,
  UserCheck,
  UserPlus,
  Users,
  Volume2,
  X,
  Youtube,
} from 'lucide-react';
import { ServerInfo } from '../types';
import { SERVERS } from '../data/mockData';

interface SidebarProps {
  currentServer: ServerInfo;
  onSelectServer: (server: ServerInfo) => void;
  activeScreen: string;
  onNavigate: (screenId: string, categoryId?: string) => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentServer,
  onSelectServer,
  activeScreen,
  onNavigate,
  isMobileOpen,
  onCloseMobile,
}) => {
  const [isServerDropdownOpen, setIsServerDropdownOpen] = useState(false);

  // Categorias colapsáveis: apenas 'essenciais' e 'ia' iniciam abertas por padrão
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    essenciais: true,
    ia: true,
    gerenciar: false,
    utilidades: false,
    sociais: false,
    engajamento: false,
    monetizacao: false,
  });

  useEffect(() => {
    if (activeScreen === 'giveaways') {
      setOpenSections((prev) => ({ ...prev, engajamento: true }));
    } else if (activeScreen === 'tickets' || activeScreen === 'commands') {
      setOpenSections((prev) => ({ ...prev, gerenciar: true }));
    } else if (activeScreen === 'customizer' || activeScreen === 'ai') {
      setOpenSections((prev) => ({ ...prev, ia: true }));
    }
  }, [activeScreen]);

  const toggleSection = (sectionKey: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [sectionKey]: !prev[sectionKey],
    }));
    handleNavClick('painel', sectionKey);
  };

  const handleNavClick = (screen: string, category?: string) => {
    onNavigate(screen, category);
    if (window.innerWidth < 1024) {
      onCloseMobile();
    }
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isMobileOpen && (
        <div
          id="sidebar-mobile-backdrop"
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-black/75 backdrop-blur-xs lg:hidden transition-opacity"
        />
      )}

      {/* Off-canvas Retractable Drawer (<1024px) / Fixed Sidebar (>=1024px) */}
      <aside
        id="main-sidebar"
        className={`fixed top-14 bottom-0 left-0 z-50 w-72 max-w-[85vw] lg:w-64 bg-dark-900 border-r border-zinc-800 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isMobileOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
      >
        {/* Mobile Drawer Header with Close Button */}
        <div className="lg:hidden flex items-center justify-between px-3 py-2 border-b border-zinc-800 bg-dark-950">
          <span className="text-xs font-bold text-zinc-300 uppercase tracking-wider">
            Navegação do Servidor
          </span>
          <button
            onClick={onCloseMobile}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
            title="Fechar menu"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Server Selector Top Box */}
        <div className="p-3 border-b border-zinc-800 relative">
          <button
            id="server-selector-trigger"
            onClick={() => setIsServerDropdownOpen(!isServerDropdownOpen)}
            className="w-full flex items-center justify-between p-2 rounded-xl bg-dark-800 hover:bg-dark-750 border border-zinc-800 hover:border-zinc-700 transition-colors group cursor-pointer"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="relative">
                <img
                  src={currentServer.iconUrl}
                  alt={currentServer.name}
                  className="w-9 h-9 rounded-full object-cover border border-zinc-700 group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="text-left min-w-0">
                <div className="flex items-center gap-1">
                  <span className="text-xs font-bold text-white truncate max-w-[120px]">
                    {currentServer.name}
                  </span>
                  {currentServer.isVerified && (
                    <span className="w-3.5 h-3.5 rounded-full bg-dark-700 text-zinc-300 flex items-center justify-center text-[9px] font-black border border-zinc-700">
                      ✓
                    </span>
                  )}
                </div>
                <div className="text-[11px] text-zinc-400 font-medium">
                  <span>{currentServer.memberCount.toLocaleString('pt-BR')} membros</span>
                </div>
              </div>
            </div>
            <ChevronDown
              className={`w-4 h-4 text-zinc-400 transition-transform ${
                isServerDropdownOpen ? 'rotate-180 text-white' : ''
              }`}
            />
          </button>

          {/* Server Switcher Dropdown */}
          {isServerDropdownOpen && (
            <div
              id="server-switcher-dropdown"
              className="absolute left-3 right-3 top-full mt-1 bg-dark-800 border border-zinc-700 rounded-xl shadow-2xl p-2 z-50 space-y-1"
            >
              <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                Seus Servidores
              </div>
              {SERVERS.map((server) => (
                <button
                  key={server.id}
                  onClick={() => {
                    onSelectServer(server);
                    setIsServerDropdownOpen(false);
                  }}
                  className={`w-full flex items-center justify-between p-2 rounded-lg text-left transition-colors cursor-pointer ${
                    server.id === currentServer.id
                      ? 'bg-zinc-700/60 text-white border border-zinc-600'
                      : 'hover:bg-dark-700 text-zinc-300'
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <img
                      src={server.iconUrl}
                      alt={server.name}
                      className="w-7 h-7 rounded-full object-cover"
                    />
                    <div className="min-w-0">
                      <div className="text-xs font-semibold truncate text-white">{server.name}</div>
                      <div className="text-[10px] text-zinc-400">
                        {server.memberCount.toLocaleString('pt-BR')} membros
                      </div>
                    </div>
                  </div>
                  {server.id === currentServer.id && (
                    <Check className="w-4 h-4 text-zinc-200 shrink-0" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Scrollable Nav Items */}
        <div className="flex-1 overflow-y-auto p-3 space-y-4 text-xs">
          {/* Main Core Links */}
          <div className="space-y-1 pb-1">
            <button
              id="nav-painel-btn"
              onClick={() => handleNavClick('painel', 'todos')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg font-semibold transition-all cursor-pointer ${
                activeScreen === 'painel'
                  ? 'bg-zinc-800 text-white border border-zinc-700 shadow-xs'
                  : 'text-zinc-300 hover:text-white hover:bg-zinc-800/70'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 text-zinc-300" />
              <span>Painel</span>
            </button>

            <button
              id="nav-placar-xp-btn"
              onClick={() => handleNavClick('leaderboard')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg font-semibold transition-all cursor-pointer ${
                activeScreen === 'leaderboard'
                  ? 'bg-zinc-800 text-white border border-zinc-700 shadow-xs'
                  : 'text-zinc-300 hover:text-white hover:bg-zinc-800/70'
              }`}
            >
              <Trophy className="w-4 h-4 text-zinc-300" />
              <span>Placar de XP</span>
            </button>

            <button
              id="nav-premium-btn"
              onClick={() => handleNavClick('premium')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg font-semibold transition-all cursor-pointer ${
                activeScreen === 'premium'
                  ? 'bg-zinc-800 text-white border border-zinc-700 shadow-xs'
                  : 'text-zinc-300 hover:text-white hover:bg-zinc-800/70'
              }`}
            >
              <Crown className="w-4 h-4 text-zinc-300" />
              <span>Premium</span>
            </button>

            <button
              id="nav-config-btn"
              onClick={() => handleNavClick('settings')}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg font-semibold text-zinc-300 hover:text-white hover:bg-zinc-800/70 transition-all cursor-pointer"
            >
              <Settings className="w-4 h-4 text-zinc-400" />
              <span>Configurações</span>
            </button>
          </div>

          {/* Categorized Collapsible: ESSENCIAIS (Aberto por padrão) */}
          <div className="space-y-1 pt-1 border-t border-zinc-800">
            <button
              onClick={() => toggleSection('essenciais')}
              className="w-full flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-zinc-400 hover:text-white py-1 px-1 transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-1.5">
                <span>ESSENCIAIS</span>
                <span className="text-[10px] text-zinc-500 font-normal">(7)</span>
              </span>
              {openSections['essenciais'] ? (
                <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
              ) : (
                <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
              )}
            </button>

            {openSections['essenciais'] && (
              <div className="space-y-0.5 pl-1">
                <button
                  onClick={() => handleNavClick('welcome')}
                  className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-left transition-colors cursor-pointer ${
                    activeScreen === 'welcome'
                      ? 'bg-zinc-800 text-white font-semibold border border-zinc-700'
                      : 'text-zinc-300 hover:text-white hover:bg-zinc-800/70'
                  }`}
                >
                  <UserCheck className="w-3.5 h-3.5 shrink-0 text-zinc-400" />
                  <span className="truncate">Recepção e Despedida</span>
                </button>
                <button
                  onClick={() => handleNavClick('welcome')}
                  className="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-left text-zinc-300 hover:text-white hover:bg-zinc-800/70 transition-colors cursor-pointer"
                >
                  <DoorOpen className="w-3.5 h-3.5 shrink-0 text-zinc-400" />
                  <span className="truncate">Canal de boas-vindas</span>
                </button>
                <button
                  onClick={() => handleNavClick('embeds')}
                  className="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-left text-zinc-300 hover:text-white hover:bg-zinc-800/70 transition-colors cursor-pointer"
                >
                  <SmilePlus className="w-3.5 h-3.5 shrink-0 text-zinc-400" />
                  <span className="truncate">Cargos por Reação</span>
                </button>
                <button
                  onClick={() => handleNavClick('moderator')}
                  className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-left transition-colors cursor-pointer ${
                    activeScreen === 'moderator'
                      ? 'bg-zinc-800 text-white font-semibold border border-zinc-700'
                      : 'text-zinc-300 hover:text-white hover:bg-zinc-800/70'
                  }`}
                >
                  <ShieldAlert className="w-3.5 h-3.5 shrink-0 text-zinc-400" />
                  <span className="truncate">Moderador</span>
                </button>
                <button
                  onClick={() => handleNavClick('leaderboard')}
                  className="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-left text-zinc-300 hover:text-white hover:bg-zinc-800/70 transition-colors cursor-pointer"
                >
                  <Trophy className="w-3.5 h-3.5 shrink-0 text-zinc-400" />
                  <span className="truncate">Níveis</span>
                </button>
                <button
                  onClick={() => handleNavClick('painel', 'essenciais')}
                  className="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-left text-zinc-300 hover:text-white hover:bg-zinc-800/70 transition-colors cursor-pointer"
                >
                  <Award className="w-3.5 h-3.5 shrink-0 text-zinc-400" />
                  <span className="truncate">Conquistas</span>
                </button>
                <button
                  onClick={() => handleNavClick('painel', 'essenciais')}
                  className="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-left text-zinc-300 hover:text-white hover:bg-zinc-800/70 transition-colors cursor-pointer"
                >
                  <Star className="w-3.5 h-3.5 shrink-0 text-zinc-400" />
                  <span className="truncate">Starboards</span>
                </button>
              </div>
            )}
          </div>

          {/* Categorized Collapsible: IA VIXE (Aberto por padrão) */}
          <div className="space-y-1 pt-1 border-t border-zinc-800">
            <button
              onClick={() => toggleSection('ia')}
              className="w-full flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-zinc-400 hover:text-white py-1 px-1 transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-1.5">
                <span>IA VIXE</span>
                <span className="text-[10px] text-zinc-500 font-normal">(4)</span>
              </span>
              {openSections['ia'] ? (
                <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
              ) : (
                <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
              )}
            </button>

            {openSections['ia'] && (
              <div className="space-y-0.5 pl-1">
                <button
                  onClick={() => handleNavClick('ai')}
                  className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-left transition-colors cursor-pointer ${
                    activeScreen === 'ai'
                      ? 'bg-zinc-800 text-white font-semibold border border-zinc-700'
                      : 'text-zinc-300 hover:text-white hover:bg-zinc-800/70'
                  }`}
                >
                  <Users className="w-3.5 h-3.5 shrink-0 text-zinc-400" />
                  <span className="truncate">Personagens de IA</span>
                </button>
                <button
                  onClick={() => handleNavClick('customizer')}
                  className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-left transition-colors cursor-pointer ${
                    activeScreen === 'customizer'
                      ? 'bg-zinc-800 text-white font-semibold border border-zinc-700'
                      : 'text-zinc-300 hover:text-white hover:bg-zinc-800/70'
                  }`}
                >
                  <Bot className="w-3.5 h-3.5 shrink-0 text-zinc-400" />
                  <span className="truncate">Personalizador de Bot</span>
                </button>
                <button
                  onClick={() => handleNavClick('ai')}
                  className="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-left text-zinc-300 hover:text-white hover:bg-zinc-800/70 transition-colors cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 shrink-0 text-zinc-400" />
                  <span className="truncate">Mascotes Virtuais</span>
                </button>
                <button
                  onClick={() => handleNavClick('ai')}
                  className="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-left text-zinc-300 hover:text-white hover:bg-zinc-800/70 transition-colors cursor-pointer"
                >
                  <Bot className="w-3.5 h-3.5 shrink-0 text-zinc-400" />
                  <span className="truncate">Assistente de Moderação IA</span>
                </button>
              </div>
            )}
          </div>

          {/* Categorized Collapsible: GERENCIAR SERVIDOR (Fechado por padrão) */}
          <div className="space-y-1 pt-1 border-t border-zinc-800">
            <button
              onClick={() => toggleSection('gerenciar')}
              className="w-full flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-zinc-400 hover:text-white py-1 px-1 transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-1.5">
                <span>GERENCIAR SERVIDOR</span>
                <span className="text-[10px] text-zinc-500 font-normal">(4)</span>
              </span>
              {openSections['gerenciar'] ? (
                <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
              ) : (
                <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
              )}
            </button>

            {openSections['gerenciar'] && (
              <div className="space-y-0.5 pl-1">
                <button
                  onClick={() => handleNavClick('painel', 'gerenciar')}
                  className="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-left text-zinc-300 hover:text-white hover:bg-zinc-800/70 transition-colors cursor-pointer"
                >
                  <Cpu className="w-3.5 h-3.5 shrink-0 text-zinc-400" />
                  <span className="truncate">Automações</span>
                </button>
                <button
                  onClick={() => handleNavClick('commands')}
                  className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-left transition-colors cursor-pointer ${
                    activeScreen === 'commands'
                      ? 'bg-zinc-800 text-white font-semibold border border-zinc-700'
                      : 'text-zinc-300 hover:text-white hover:bg-zinc-800/70'
                  }`}
                >
                  <Terminal className="w-3.5 h-3.5 shrink-0 text-zinc-400" />
                  <span className="truncate">Comandos Customizáveis</span>
                </button>
                <button
                  onClick={() => handleNavClick('painel', 'gerenciar')}
                  className="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-left text-zinc-300 hover:text-white hover:bg-zinc-800/70 transition-colors cursor-pointer"
                >
                  <UserPlus className="w-3.5 h-3.5 shrink-0 text-zinc-400" />
                  <span className="truncate">Rastreador de Convites</span>
                </button>
                <button
                  id="nav-tickets-btn"
                  onClick={() => handleNavClick('tickets')}
                  className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-left transition-colors cursor-pointer ${
                    activeScreen === 'tickets'
                      ? 'bg-zinc-800 text-white font-semibold border border-zinc-700'
                      : 'text-zinc-300 hover:text-white hover:bg-zinc-800/70'
                  }`}
                >
                  <Ticket className="w-3.5 h-3.5 shrink-0 text-zinc-400" />
                  <span className="truncate">Tickets</span>
                </button>
              </div>
            )}
          </div>

          {/* Categorized Collapsible: UTILIDADES (Fechado por padrão) */}
          <div className="space-y-1 pt-1 border-t border-zinc-800">
            <button
              onClick={() => toggleSection('utilidades')}
              className="w-full flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-zinc-400 hover:text-white py-1 px-1 transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-1.5">
                <span>UTILIDADES</span>
                <span className="text-[10px] text-zinc-500 font-normal">(8)</span>
              </span>
              {openSections['utilidades'] ? (
                <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
              ) : (
                <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
              )}
            </button>

            {openSections['utilidades'] && (
              <div className="space-y-0.5 pl-1">
                <button
                  onClick={() => handleNavClick('painel', 'utilidades')}
                  className="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-left text-zinc-300 hover:text-white hover:bg-zinc-800/70 transition-colors cursor-pointer"
                >
                  <Smile className="w-3.5 h-3.5 shrink-0 text-zinc-400" />
                  <span className="truncate">Emojis</span>
                </button>
                <button
                  onClick={() => handleNavClick('painel', 'utilidades')}
                  className="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-left text-zinc-300 hover:text-white hover:bg-zinc-800/70 transition-colors cursor-pointer"
                >
                  <BarChart2 className="w-3.5 h-3.5 shrink-0 text-zinc-400" />
                  <span className="truncate">Enquetes</span>
                </button>
                <button
                  onClick={() => handleNavClick('embeds')}
                  className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-left transition-colors cursor-pointer ${
                    activeScreen === 'embeds'
                      ? 'bg-zinc-800 text-white font-semibold border border-zinc-700'
                      : 'text-zinc-300 hover:text-white hover:bg-zinc-800/70'
                  }`}
                >
                  <LayoutTemplate className="w-3.5 h-3.5 shrink-0 text-zinc-400" />
                  <span className="truncate">Mensagens incorporadas</span>
                </button>
                <button
                  onClick={() => handleNavClick('painel', 'utilidades')}
                  className="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-left text-zinc-300 hover:text-white hover:bg-zinc-800/70 transition-colors cursor-pointer"
                >
                  <Search className="w-3.5 h-3.5 shrink-0 text-zinc-400" />
                  <span className="truncate">Procure algo</span>
                </button>
                <button
                  onClick={() => handleNavClick('painel', 'utilidades')}
                  className="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-left text-zinc-300 hover:text-white hover:bg-zinc-800/70 transition-colors cursor-pointer"
                >
                  <HelpCircle className="w-3.5 h-3.5 shrink-0 text-zinc-400" />
                  <span className="truncate">Ajuda</span>
                </button>
                <button
                  onClick={() => handleNavClick('painel', 'utilidades')}
                  className="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-left text-zinc-300 hover:text-white hover:bg-zinc-800/70 transition-colors cursor-pointer"
                >
                  <Clock className="w-3.5 h-3.5 shrink-0 text-zinc-400" />
                  <span className="truncate">Temporizadores</span>
                </button>
                <button
                  onClick={() => handleNavClick('painel', 'utilidades')}
                  className="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-left text-zinc-300 hover:text-white hover:bg-zinc-800/70 transition-colors cursor-pointer"
                >
                  <BarChart3 className="w-3.5 h-3.5 shrink-0 text-zinc-400" />
                  <span className="truncate">Canais de estatísticas</span>
                </button>
                <button
                  onClick={() => handleNavClick('painel', 'utilidades')}
                  className="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-left text-zinc-300 hover:text-white hover:bg-zinc-800/70 transition-colors cursor-pointer"
                >
                  <Volume2 className="w-3.5 h-3.5 shrink-0 text-zinc-400" />
                  <span className="truncate">Canais Temporários</span>
                </button>
              </div>
            )}
          </div>

          {/* Categorized Collapsible: ALERTAS SOCIAIS (Fechado por padrão) */}
          <div className="space-y-1 pt-1 border-t border-zinc-800">
            <button
              onClick={() => toggleSection('sociais')}
              className="w-full flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-zinc-400 hover:text-white py-1 px-1 transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-1.5">
                <span>ALERTAS SOCIAIS</span>
                <span className="text-[10px] text-zinc-500 font-normal">(10)</span>
              </span>
              {openSections['sociais'] ? (
                <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
              ) : (
                <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
              )}
            </button>

            {openSections['sociais'] && (
              <div className="space-y-0.5 pl-1">
                <button
                  onClick={() => handleNavClick('painel', 'sociais')}
                  className="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-left text-zinc-300 hover:text-white hover:bg-zinc-800/70 transition-colors cursor-pointer"
                >
                  <Twitch className="w-3.5 h-3.5 shrink-0 text-zinc-400" />
                  <span className="truncate">Alertas da Twitch</span>
                </button>
                <button
                  onClick={() => handleNavClick('painel', 'sociais')}
                  className="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-left text-zinc-300 hover:text-white hover:bg-zinc-800/70 transition-colors cursor-pointer"
                >
                  <Music className="w-3.5 h-3.5 shrink-0 text-zinc-400" />
                  <span className="truncate">Alertas do TikTok</span>
                </button>
                <button
                  onClick={() => handleNavClick('painel', 'sociais')}
                  className="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-left text-zinc-300 hover:text-white hover:bg-zinc-800/70 transition-colors cursor-pointer"
                >
                  <Twitter className="w-3.5 h-3.5 shrink-0 text-zinc-400" />
                  <span className="truncate">Alertas do X</span>
                </button>
                <button
                  onClick={() => handleNavClick('painel', 'sociais')}
                  className="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-left text-zinc-300 hover:text-white hover:bg-zinc-800/70 transition-colors cursor-pointer"
                >
                  <Radio className="w-3.5 h-3.5 shrink-0 text-zinc-400" />
                  <span className="truncate">Alertas Bluesky</span>
                </button>
                <button
                  onClick={() => handleNavClick('painel', 'sociais')}
                  className="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-left text-zinc-300 hover:text-white hover:bg-zinc-800/70 transition-colors cursor-pointer"
                >
                  <Youtube className="w-3.5 h-3.5 shrink-0 text-zinc-400" />
                  <span className="truncate">Alertas do YouTube</span>
                </button>
                <button
                  onClick={() => handleNavClick('painel', 'sociais')}
                  className="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-left text-zinc-300 hover:text-white hover:bg-zinc-800/70 transition-colors cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5 shrink-0 text-zinc-400" />
                  <span className="truncate">Alertas do Reddit</span>
                </button>
                <button
                  onClick={() => handleNavClick('painel', 'sociais')}
                  className="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-left text-zinc-300 hover:text-white hover:bg-zinc-800/70 transition-colors cursor-pointer"
                >
                  <Instagram className="w-3.5 h-3.5 shrink-0 text-zinc-400" />
                  <span className="truncate">Alertas do Instagram</span>
                </button>
                <button
                  onClick={() => handleNavClick('painel', 'sociais')}
                  className="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-left text-zinc-300 hover:text-white hover:bg-zinc-800/70 transition-colors cursor-pointer"
                >
                  <Rss className="w-3.5 h-3.5 shrink-0 text-zinc-400" />
                  <span className="truncate">RSS Feeds</span>
                </button>
                <button
                  onClick={() => handleNavClick('painel', 'sociais')}
                  className="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-left text-zinc-300 hover:text-white hover:bg-zinc-800/70 transition-colors cursor-pointer"
                >
                  <Radio className="w-3.5 h-3.5 shrink-0 text-zinc-400" />
                  <span className="truncate">Alertas da Kick</span>
                </button>
                <button
                  onClick={() => handleNavClick('painel', 'sociais')}
                  className="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-left text-zinc-300 hover:text-white hover:bg-zinc-800/70 transition-colors cursor-pointer"
                >
                  <Headphones className="w-3.5 h-3.5 shrink-0 text-zinc-400" />
                  <span className="truncate">Podcasts</span>
                </button>
              </div>
            )}
          </div>

          {/* Categorized Collapsible: ENGAJAMENTO & DIVERSÃO (Fechado por padrão) */}
          <div className="space-y-1 pt-1 border-t border-zinc-800">
            <button
              onClick={() => toggleSection('engajamento')}
              className="w-full flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-zinc-400 hover:text-white py-1 px-1 transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-1.5">
                <span>ENGAJAMENTO & DIVERSÃO</span>
                <span className="text-[10px] text-zinc-500 font-normal">(3)</span>
              </span>
              {openSections['engajamento'] ? (
                <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
              ) : (
                <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
              )}
            </button>

            {openSections['engajamento'] && (
              <div className="space-y-0.5 pl-1">
                <button
                  id="nav-giveaways-btn"
                  onClick={() => handleNavClick('giveaways')}
                  className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-left transition-colors cursor-pointer ${
                    activeScreen === 'giveaways'
                      ? 'bg-zinc-800 text-white font-semibold border border-zinc-700'
                      : 'text-zinc-300 hover:text-white hover:bg-zinc-800/70'
                  }`}
                >
                  <Gift className="w-3.5 h-3.5 shrink-0 text-zinc-400" />
                  <span className="truncate">Sorteios</span>
                </button>
                <button
                  onClick={() => handleNavClick('painel', 'engajamento')}
                  className="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-left text-zinc-300 hover:text-white hover:bg-zinc-800/70 transition-colors cursor-pointer"
                >
                  <Cake className="w-3.5 h-3.5 shrink-0 text-zinc-400" />
                  <span className="truncate">Aniversários</span>
                </button>
                <button
                  onClick={() => handleNavClick('painel', 'engajamento')}
                  className="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-left text-zinc-300 hover:text-white hover:bg-zinc-800/70 transition-colors cursor-pointer"
                >
                  <Landmark className="w-3.5 h-3.5 shrink-0 text-zinc-400" />
                  <span className="truncate">Economia</span>
                </button>
              </div>
            )}
          </div>

          {/* Categorized Collapsible: MONETIZAÇÃO (Fechado por padrão) */}
          <div className="space-y-1 pt-1 border-t border-zinc-800">
            <button
              onClick={() => toggleSection('monetizacao')}
              className="w-full flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-zinc-400 hover:text-white py-1 px-1 transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-1.5">
                <span>MONETIZAÇÃO</span>
                <span className="text-[10px] text-zinc-500 font-normal">(1)</span>
              </span>
              {openSections['monetizacao'] ? (
                <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
              ) : (
                <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
              )}
            </button>

            {openSections['monetizacao'] && (
              <div className="space-y-0.5 pl-1">
                <button
                  onClick={() => handleNavClick('premium')}
                  className="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-left text-zinc-300 hover:text-white hover:bg-zinc-800/70 transition-colors cursor-pointer"
                >
                  <Gem className="w-3.5 h-3.5 shrink-0 text-zinc-400" />
                  <span className="truncate">Monetizar Servidor</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Status Card */}
        <div className="p-3 border-t border-zinc-800 bg-dark-900/95">
          <div className="p-2.5 rounded-xl bg-dark-800/80 border border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-zinc-500" />
              <div>
                <p className="text-xs font-bold text-zinc-200">Vixe Bot</p>
                <p className="text-[10px] text-zinc-400">Estado: Desativado</p>
              </div>
            </div>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-dark-700 text-zinc-400 border border-zinc-700">
              Offline
            </span>
          </div>
        </div>
      </aside>
    </>
  );
};
