import React, { useState, useRef, useEffect } from 'react';
import { Bell, Crown, Menu, Sparkles, X, ChevronRight } from 'lucide-react';
import { ServerInfo } from '../types';

interface HeaderProps {
  currentServer: ServerInfo;
  onOpenDirectImageModal?: () => void;
  onOpenMobileMenu: () => void;
  isMobileMenuOpen: boolean;
  activeScreen: string;
  onNavigate?: (screen: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentServer,
  onOpenMobileMenu,
  isMobileMenuOpen,
  activeScreen,
  onNavigate,
}) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLanguageHovered, setIsLanguageHovered] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('Português');
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
        setIsLanguageHovered(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleItemClick = (screen?: string) => {
    if (screen && onNavigate) {
      onNavigate(screen);
    }
    setIsUserMenuOpen(false);
  };
  return (
    <header
      id="main-header"
      className="h-14 bg-dark-900 border-b border-zinc-800 sticky top-0 z-40 px-3 sm:px-4 flex items-center justify-between"
    >
      {/* Brand & Left Controls */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        <button
          id="mobile-menu-toggle-btn"
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2 rounded-xl bg-dark-800 hover:bg-dark-750 border border-zinc-700 text-zinc-200 hover:text-white transition-colors cursor-pointer"
          aria-label="Abrir menu de navegação"
        >
          {isMobileMenuOpen ? <X className="w-4.5 h-4.5" /> : <Menu className="w-4.5 h-4.5" />}
        </button>

        <div className="flex items-center gap-2">
          {/* Vixe Crown / Brand Icon */}
          <div className="w-8 h-8 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center text-white shadow-xs">
            <Crown className="w-4 h-4 text-white" />
          </div>
          <span className="font-extrabold text-lg tracking-wider text-white font-display">
            Vixe
          </span>
        </div>

        <div className="hidden xs:flex items-center gap-2 text-xs text-zinc-400 pl-2 sm:pl-3 border-l border-zinc-800 min-w-0">
          <span className="text-zinc-500 hidden sm:inline">Servidor:</span>
          <span className="font-semibold text-zinc-200 truncate max-w-[110px] sm:max-w-[160px] md:max-w-none">{currentServer.name}</span>
          <span className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-dark-800 text-zinc-300 border border-zinc-700 text-[11px] font-medium">
            <span>{currentServer.memberCount.toLocaleString('pt-BR')} membros</span>
          </span>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Upgrade / Premium CTA button */}
        <a
          href="#premium"
          className="hidden md:flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-xs font-semibold text-zinc-200 hover:text-white shadow-xs transition-all cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 text-zinc-400" />
          <span>Obter Premium</span>
        </a>

        {/* Notification Bell */}
        <button
          id="header-notifications-btn"
          onClick={() => {
            if (onNavigate) {
              onNavigate(activeScreen === 'notifications' ? 'painel' : 'notifications');
            }
          }}
          className={`relative p-2 rounded-xl transition-colors cursor-pointer ${
            activeScreen === 'notifications'
              ? 'bg-zinc-800 text-white border border-zinc-700 shadow-xs'
              : 'text-zinc-400 hover:text-white hover:bg-dark-800'
          }`}
          title="Notificações"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-zinc-400 rounded-full ring-2 ring-dark-900"></span>
        </button>

        {/* User Profile Badge & Dropdown */}
        <div
          id="header-user-profile-badge"
          ref={userMenuRef}
          className="relative z-20 ml-1 sm:ml-4 border-l border-zinc-800 pl-2 sm:pl-4"
        >
          <div
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className="flex items-center cursor-pointer select-none group"
            title="Menu do Usuário"
          >
            <div className="rounded-full bg-dark-800 text-dark-100 border border-solid border-dark-400 h-8 w-8 flex items-center justify-center text-sm font-bold group-hover:border-zinc-400 transition-colors shadow-xs">
              v
            </div>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={`ltr:ml-1 rtl:mr-1 text-zinc-400 group-hover:text-white transition-transform duration-200 ${
                isUserMenuOpen ? 'rotate-180' : ''
              }`}
            >
              <path
                d="M7 14.5l5-5 5 5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* User Menu Dropdown */}
          {isUserMenuOpen && (
            <div className="absolute w-[232px] max-w-[calc(100vw-24px)] right-0 transition-all bg-dark-900 border border-zinc-800 shadow-2xl rounded-xl p-2 top-[calc(100%+8px)] pointer-events-auto z-50 animate-fadeIn text-left font-sans">
              <h4 className="text-xs text-zinc-400 font-bold p-3 uppercase tracking-wider">
                Vixe
              </h4>

              <div
                onClick={() => handleItemClick('leaderboard')}
                className="relative py-2 px-3 hover:bg-dark-800 hover:text-white bg-transparent transition-all rounded-lg cursor-pointer whitespace-nowrap text-sm text-zinc-300"
              >
                Editar meu rank card pessoal
              </div>

              <div
                onClick={() => handleItemClick('premium')}
                className="relative py-2 px-3 hover:bg-dark-800 hover:text-white bg-transparent transition-all rounded-lg cursor-pointer whitespace-nowrap text-sm text-zinc-300 flex items-center justify-between"
              >
                <span>Pro</span>
                <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  VIP
                </span>
              </div>

              <div
                onClick={() => handleItemClick('monetization')}
                className="relative py-2 px-3 hover:bg-dark-800 hover:text-white bg-transparent transition-all rounded-lg cursor-pointer whitespace-nowrap text-sm text-zinc-300"
              >
                Monetizar comunidade
              </div>

              <div
                onClick={() => handleItemClick('ai')}
                className="relative py-2 px-3 hover:bg-dark-800 hover:text-white bg-transparent transition-all rounded-lg cursor-pointer whitespace-nowrap text-sm text-zinc-300"
              >
                Personagens de IA
              </div>

              <h4 className="text-xs text-zinc-400 font-bold p-3 uppercase tracking-wider pt-3">
                Donos de Servidores
              </h4>

              <div
                onClick={() => handleItemClick('painel')}
                className="relative py-2 px-3 hover:bg-dark-800 hover:text-white bg-transparent transition-all rounded-lg cursor-pointer whitespace-nowrap text-sm text-zinc-300"
              >
                Meus servidores
              </div>

              <div
                onClick={() => handleItemClick('premium')}
                className="relative py-2 px-3 hover:bg-dark-800 hover:text-white bg-transparent transition-all rounded-lg cursor-pointer whitespace-nowrap text-sm text-zinc-300"
              >
                Transferir premium
              </div>

              <div
                onClick={() => handleItemClick()}
                className="relative py-2 px-3 hover:bg-dark-800 hover:text-white bg-transparent transition-all rounded-lg cursor-pointer whitespace-nowrap text-sm text-zinc-300"
              >
                Gerenciar Passe NFT
              </div>

              <h4 className="text-xs text-zinc-400 font-bold p-3 uppercase tracking-wider pt-3">
                Pagamento
              </h4>

              <div
                onClick={() => handleItemClick()}
                className="relative py-2 px-3 hover:bg-dark-800 hover:text-white bg-transparent transition-all rounded-lg cursor-pointer whitespace-nowrap text-sm text-zinc-300"
              >
                Faturas
              </div>

              <div className="py-2 px-3">
                <div className="h-px bg-zinc-800 w-full" />
              </div>

              {/* Idioma Selector with flyout submenu */}
              <div
                onMouseEnter={() => setIsLanguageHovered(true)}
                onMouseLeave={() => setIsLanguageHovered(false)}
                className="relative py-2 px-3 hover:bg-dark-800 hover:text-white bg-transparent transition-all rounded-lg cursor-pointer whitespace-nowrap text-sm text-zinc-300 group flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <span>Idioma</span>
                  <span className="text-xs text-zinc-500 font-normal">({selectedLanguage})</span>
                </div>
                <ChevronRight className="w-4 h-4 text-zinc-500 group-hover:text-zinc-300" />

                {/* Submenu for languages */}
                <div
                  className={`absolute right-full mr-1 transition-all z-50 top-0 ${
                    isLanguageHovered
                      ? 'opacity-100 pointer-events-auto'
                      : 'opacity-0 pointer-events-none'
                  }`}
                >
                  <div className="bg-dark-900 border border-zinc-800 shadow-2xl p-2 rounded-xl max-h-[360px] w-[180px] overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-dark-800">
                    {[
                      { flag: '🇺🇸', name: 'English' },
                      { flag: '🇫🇷', name: 'Français' },
                      { flag: '🇪🇸', name: 'Español' },
                      { flag: '🇩🇪', name: 'Deutsch' },
                      { flag: '🇹🇷', name: 'Türkçe' },
                      { flag: '🇸🇦', name: 'العربية' },
                      { flag: '🇧🇷', name: 'Português' },
                      { flag: '🇹🇼', name: '繁體中文' },
                      { flag: '🇷🇺', name: 'Русский' },
                      { flag: '🇰🇷', name: '한국어' },
                    ].map((lang) => (
                      <div
                        key={lang.name}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedLanguage(lang.name);
                          setIsLanguageHovered(false);
                        }}
                        className={`relative py-2 px-2.5 hover:bg-dark-800 transition-all rounded-lg cursor-pointer whitespace-nowrap text-xs flex items-center justify-between ${
                          selectedLanguage === lang.name
                            ? 'text-white font-bold bg-zinc-800/60'
                            : 'text-zinc-300'
                        }`}
                      >
                        <div className="flex gap-2 items-center">
                          <span className="text-base">{lang.flag}</span>
                          <span>{lang.name}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div
                onClick={() => handleItemClick()}
                className="relative py-2 px-3 hover:bg-dark-800 hover:text-white bg-transparent transition-all rounded-lg cursor-pointer whitespace-nowrap text-sm text-zinc-300"
              >
                Registro de alterações
              </div>

              <div
                onClick={() => handleItemClick()}
                className="relative py-2 px-3 hover:bg-dark-800 hover:text-white bg-transparent transition-all rounded-lg cursor-pointer whitespace-nowrap text-sm text-zinc-300"
              >
                Servidor de Suporte
              </div>

              <div
                onClick={() => handleItemClick()}
                className="relative py-2 px-3 hover:bg-rose-500/10 hover:text-rose-400 text-zinc-400 bg-transparent transition-all rounded-lg cursor-pointer whitespace-nowrap text-sm"
              >
                Sair
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
