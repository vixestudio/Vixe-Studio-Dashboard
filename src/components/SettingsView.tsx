import React, { useState } from 'react';
import {
  AlertCircle,
  Check,
  ChevronDown,
  ChevronUp,
  Info,
  Loader2,
  RefreshCw,
  Shield,
  Sparkles,
} from 'lucide-react';
import { ServerInfo } from '../types';
import { ROLES_LIST } from '../data/mockData';
import { Mee6CrownBadge } from './LeaderboardView';
import { DiscordColorPicker, DiscordRoleSelect } from './common';

interface SettingsViewProps {
  currentServer: ServerInfo;
  onBackToDashboard?: () => void;
}

interface LanguageOption {
  code: string;
  name: string;
  flagSvg: React.ReactNode;
}

const LANGUAGES: LanguageOption[] = [
  {
    code: 'pt',
    name: 'Português',
    flagSvg: (
      <svg width="20" height="20" viewBox="0 0 211 211" className="shrink-0">
        <circle fill="#00C85F" cx="105.5" cy="105.5" r="105.5" />
        <path
          d="M101.45 43.22L11.62 102.97c-2.16 1.44-2.16 4.61 0 6.05l89.83 59.75c2.45 1.63 5.64 1.63 8.09 0l89.83-59.75c2.16-1.44 2.16-4.61 0-6.05L109.54 43.22c-2.45-1.63-5.64-1.63-8.09 0z"
          fill="#FFF046"
        />
        <circle fill="#4B82E1" cx="105.5" cy="105.5" r="43.5" />
        <path
          d="M67.62 83.06c-1.43 2.36-2.65 4.86-3.62 7.48 20.34-1.38 52.98 2.24 81.65 31.46 1.02-2.54 1.82-5.19 2.35-7.94C119.95 87.2 88.8 82.37 67.62 83.06z"
          fill="#FFFFFF"
        />
      </svg>
    ),
  },
  {
    code: 'en',
    name: 'English',
    flagSvg: (
      <svg width="20" height="20" viewBox="0 0 24 24" className="shrink-0">
        <circle cx="12" cy="12" r="12" fill="#0052B4" />
        <path d="M0 0l24 24M24 0L0 24" stroke="#fff" strokeWidth="4" />
        <path d="M0 0l24 24M24 0L0 24" stroke="#D80027" strokeWidth="2" />
        <path d="M12 0v24M0 12h24" stroke="#fff" strokeWidth="6" />
        <path d="M12 0v24M0 12h24" stroke="#D80027" strokeWidth="3.5" />
      </svg>
    ),
  },
  {
    code: 'fr',
    name: 'Français',
    flagSvg: (
      <svg width="20" height="20" viewBox="0 0 24 24" className="shrink-0">
        <circle cx="12" cy="12" r="12" fill="#F0F0F0" />
        <path d="M0 12c0 5.16 3.26 9.56 7.83 11.25V.75C3.26 2.44 0 6.84 0 12z" fill="#0052B4" />
        <path d="M24 12c0-5.16-3.26-9.56-7.83-11.25v22.5C20.74 21.56 24 17.16 24 12z" fill="#D80027" />
      </svg>
    ),
  },
  {
    code: 'es',
    name: 'Español',
    flagSvg: (
      <svg width="20" height="20" viewBox="0 0 24 24" className="shrink-0">
        <circle cx="12" cy="12" r="12" fill="#FFDA44" />
        <path d="M23.25 7.83C21.56 3.26 17.16 0 12 0 6.84 0 2.44 3.26.75 7.83h22.5z" fill="#D80027" />
        <path d="M.75 16.17C2.44 20.74 6.84 24 12 24c5.16 0 9.56-3.26 11.25-7.83H.75z" fill="#D80027" />
      </svg>
    ),
  },
  {
    code: 'de',
    name: 'Deutsch',
    flagSvg: (
      <svg width="20" height="20" viewBox="0 0 24 24" className="shrink-0">
        <path d="M12 0C6.84 0 2.44 3.26.75 7.83h22.5C21.56 3.26 17.16 0 12 0z" fill="#000" />
        <path d="M.75 7.83A11.97 11.97 0 000 12c0 1.47.26 2.87.75 4.17h22.5c.48-1.3.75-2.7.75-4.17 0-1.47-.26-2.87-.75-4.17H.75z" fill="#D80027" />
        <path d="M.75 16.17C2.44 20.74 6.84 24 12 24c5.16 0 9.56-3.26 11.25-7.83H.75z" fill="#FFDA44" />
      </svg>
    ),
  },
];

const TIMEZONES = [
  'América/Cuiabá',
  'América/Sao_Paulo',
  'América/Manaus',
  'América/Fortaleza',
  'América/Bahia',
  'América/Belem',
  'América/Noronha',
  'África/Abidjan',
  'África/Acra',
  'África/Addis_Abeba',
  'África/Argel',
  'África/Asmara',
  'África/Bamako',
  'África/Bangui',
  'África/Banjul',
  'África/Bissau',
  'UTC',
  'Europa/Lisbon',
  'Europa/Madrid',
  'America/New_York',
];

export const SettingsView: React.FC<SettingsViewProps> = ({ currentServer }) => {
  // Accordion open/close states
  const [isBotMasterOpen, setIsBotMasterOpen] = useState(true);
  const [isLanguageOpen, setIsLanguageOpen] = useState(true);
  const [isTimezoneOpen, setIsTimezoneOpen] = useState(true);
  const [isEmbedColorOpen, setIsEmbedColorOpen] = useState(true);
  const [isPrefixOpen, setIsPrefixOpen] = useState(true);
  const [isResyncOpen, setIsResyncOpen] = useState(true);

  // Form State
  const [additionalRoles, setAdditionalRoles] = useState<string[]>([]);
  const [monetizeAccess, setMonetizeAccess] = useState<'none' | 'readonly' | 'manage'>('none');
  const [language, setLanguage] = useState<string>('pt');
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [timezone, setTimezone] = useState<string>('América/Cuiabá');
  const [isTimezoneDropdownOpen, setIsTimezoneDropdownOpen] = useState(false);
  const [embedColor, setEmbedColor] = useState<string>('#70B1FF');
  const [commandPrefix, setCommandPrefix] = useState<string>('');

  // Baseline Saved State for Unsaved Changes detection
  const [savedConfig, setSavedConfig] = useState({
    additionalRoles: [] as string[],
    monetizeAccess: 'none' as 'none' | 'readonly' | 'manage',
    language: 'pt',
    timezone: 'América/Cuiabá',
    embedColor: '#70B1FF',
    commandPrefix: '',
  });

  const [showSaveToast, setShowSaveToast] = useState(false);
  const [isResyncing, setIsResyncing] = useState(false);
  const [resyncDone, setResyncDone] = useState(false);

  // Check if anything has been altered
  const hasChanges =
    JSON.stringify(additionalRoles) !== JSON.stringify(savedConfig.additionalRoles) ||
    monetizeAccess !== savedConfig.monetizeAccess ||
    language !== savedConfig.language ||
    timezone !== savedConfig.timezone ||
    embedColor !== savedConfig.embedColor ||
    commandPrefix !== savedConfig.commandPrefix;

  const handleSave = () => {
    setSavedConfig({
      additionalRoles: [...additionalRoles],
      monetizeAccess,
      language,
      timezone,
      embedColor,
      commandPrefix,
    });
    setShowSaveToast(true);
    setTimeout(() => setShowSaveToast(false), 3000);
  };

  const handleCancel = () => {
    setAdditionalRoles([...savedConfig.additionalRoles]);
    setMonetizeAccess(savedConfig.monetizeAccess);
    setLanguage(savedConfig.language);
    setTimezone(savedConfig.timezone);
    setEmbedColor(savedConfig.embedColor);
    setCommandPrefix(savedConfig.commandPrefix);
  };

  const handleResync = () => {
    if (isResyncing) return;
    setIsResyncing(true);
    setResyncDone(false);
    setTimeout(() => {
      setIsResyncing(false);
      setResyncDone(true);
      setTimeout(() => setResyncDone(false), 4000);
    }, 1500);
  };

  const activePrefix = commandPrefix.trim() || '!';
  const selectedLangObj = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];

  // Admin roles from server
  const adminRoles = ROLES_LIST.slice(0, 2); // 'Proprietário(a)', 'Gerenciamento'

  return (
    <div className="w-full min-h-full transition-all flex flex-col opacity-100 pb-24 animate-fadeIn">
      {/* Save Toast Notification */}
      {showSaveToast && (
        <div className="fixed top-20 right-6 z-50 bg-emerald-600 text-white text-sm font-semibold px-4 py-2.5 rounded-lg shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-top-3 duration-200">
          <Check className="w-4 h-4" />
          Configurações do servidor salvas com sucesso!
        </div>
      )}

      {/* Page Title & Subtitle */}
      <div className="flex flex-col mb-8">
        <h4 className="font-bold text-dark-100 text-xl sm:text-2xl font-display">
          Configurações
        </h4>
        <p className="text-sm text-dark-300 max-w-[830px] mt-2 sm:mt-4 text-center lg:text-left">
          Aqui você pode configurar o bot MEE6 do seu servidor.
        </p>
      </div>

      {/* CARD 1: Gerenciadores do Bot */}
      <div
        className="bg-dark-800 shadow-xs sub_feature_card rounded-lg mb-4 border border-dark-700/40"
        id="settings.botMaster.heading"
      >
        <h3
          onClick={() => setIsBotMasterOpen(!isBotMasterOpen)}
          className="text-h6 text-dark-100 flex justify-between items-start hover:text-dark-200 transition-all py-4 lg:py-6 px-6 cursor-pointer select-none"
        >
          <div className="flex flex-col w-full pr-4 max-w-[760px]">
            <div className="sub_feature_title flex items-center text-lg font-semibold">
              Gerenciadores do Bot
            </div>
            <div className="mt-2 text-sm text-dark-300 leading-relaxed">
              <p>
                Os Gerenciadores do Bot são cargos do Discord que podem administrar o MEE6 neste servidor. Cargos com
                a permissão de Administrador são automaticamente gerenciadores do bot — você também pode definir
                cargos adicionais abaixo.
              </p>
              <div className="mt-3">
                <div className="flex items-center gap-2 text-left text-amber-400 font-semibold text-xs sm:text-sm">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>
                    Os gerenciadores do bot têm poder de nível administrativo no seu servidor.{' '}
                    <span className="underline underline-offset-2 hover:text-amber-300 cursor-pointer">
                      Ver mais
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between gap-4">
            <button
              type="button"
              className="pt-1 text-dark-300 hover:text-white transition-colors"
            >
              {isBotMasterOpen ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
            </button>
          </div>
        </h3>

        {isBotMasterOpen && (
          <div className="text-base transition-all animate-fadeIn">
            <div className="p-6 pt-0">
              <div className="grid w-full border-t border-solid border-dark-700 pt-4" />

              {/* Cargos de Administrador (read-only auto bot masters) */}
              <label className="pb-2 text-dark-400 text-sm flex">
                <div className="flex gap-2 mb-2 items-center font-medium">
                  <span>Cargos de Administrador</span>
                  <Shield className="w-4 h-4 text-dark-400" />
                </div>
              </label>

              <div className="relative max-w-field w-full">
                <div className="rounded-lg bg-dark-900 border border-dark-700 min-h-[50px] flex items-center justify-start px-3 py-2 gap-2 flex-wrap">
                  {adminRoles.map((role) => (
                    <span
                      key={role.id}
                      className="px-2.5 py-1 rounded-md text-xs font-semibold flex items-center gap-1.5 border"
                      style={{
                        backgroundColor: `${role.color}15`,
                        color: role.color,
                        borderColor: `${role.color}40`,
                      }}
                    >
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: role.color }}
                      />
                      {role.name}
                    </span>
                  ))}
                </div>
              </div>

              <p className="flex gap-2 text-xs mt-2 mb-6 text-dark-400 items-center">
                <Info className="w-4 h-4 text-dark-400 shrink-0" />
                Qualquer cargo com a permissão de administrador é considerado um Gerenciador do Bot.
              </p>

              {/* Cargos adicionais de Gerenciadores do Bot (VIP) */}
              <label className="pb-2 text-dark-400 text-sm flex">
                <div className="flex gap-2 mb-2 items-end font-medium">
                  Cargos adicionais de Gerenciadores do Bot
                  <Mee6CrownBadge className="w-5 h-5" />
                </div>
              </label>

              <div className="max-w-field w-full">
                <DiscordRoleSelect
                  selectedRoleIds={additionalRoles}
                  onChange={setAdditionalRoles}
                  roles={ROLES_LIST}
                  placeholder="Selecione um cargo"
                />
              </div>

              <p className="flex text-dark-400 max-w-field text-xs gap-2 mt-2 items-center">
                <Info className="w-4 h-4 text-dark-400 shrink-0" />
                Cargos que também serão considerados como gerenciadores do bot, mesmo que não tenham a
                permissão de Administrador.
              </p>

              {/* Monetize sub-section */}
              <div className="mt-8 border-t border-dark-700 pt-6">
                <h5 className="text-dark-100 text-base font-semibold mb-2">Monetização</h5>
                <p className="text-dark-300 text-sm mb-4">
                  Defina o que os administradores de bots podem ver e fazer no plugin de Monetização
                </p>

                <div className="grid grid-cols-1 gap-3">
                  {/* Option 1 */}
                  <div
                    onClick={() => setMonetizeAccess('none')}
                    className="flex items-start cursor-pointer group"
                  >
                    <div className="cursor-pointer overflow-hidden min-w-[1.25rem] min-h-[1.25rem] w-5 h-5 flex items-center justify-center rounded-full border border-dark-600 group-hover:border-brand-default transition-all duration-200 mt-0.5 bg-dark-900">
                      {monetizeAccess === 'none' && (
                        <div className="rounded-full bg-brand-default w-2.5 h-2.5" />
                      )}
                    </div>
                    <div className="ml-3 select-none">
                      <p className="text-dark-100 text-sm font-medium mb-0.5">Sem acesso</p>
                      <p className="text-dark-300 text-xs sm:text-sm">
                        Os administradores do bot não conseguem ver o plugin Monetizar
                      </p>
                    </div>
                  </div>

                  {/* Option 2 */}
                  <div
                    onClick={() => setMonetizeAccess('readonly')}
                    className="flex items-start cursor-pointer group"
                  >
                    <div className="cursor-pointer overflow-hidden min-w-[1.25rem] min-h-[1.25rem] w-5 h-5 flex items-center justify-center rounded-full border border-dark-600 group-hover:border-brand-default transition-all duration-200 mt-0.5 bg-dark-900">
                      {monetizeAccess === 'readonly' && (
                        <div className="rounded-full bg-brand-default w-2.5 h-2.5" />
                      )}
                    </div>
                    <div className="ml-3 select-none">
                      <p className="text-dark-100 text-sm font-medium mb-0.5">
                        Acesso para somente leitura
                      </p>
                      <p className="text-dark-300 text-xs sm:text-sm">
                        Os administradores do bot podem visualizar os dados da monetização, mas não podem
                        realizar ações
                      </p>
                    </div>
                  </div>

                  {/* Option 3 */}
                  <div
                    onClick={() => setMonetizeAccess('manage')}
                    className="flex items-start cursor-pointer group"
                  >
                    <div className="cursor-pointer overflow-hidden min-w-[1.25rem] min-h-[1.25rem] w-5 h-5 flex items-center justify-center rounded-full border border-dark-600 group-hover:border-brand-default transition-all duration-200 mt-0.5 bg-dark-900">
                      {monetizeAccess === 'manage' && (
                        <div className="rounded-full bg-brand-default w-2.5 h-2.5" />
                      )}
                    </div>
                    <div className="ml-3 select-none">
                      <p className="text-dark-100 text-sm font-medium mb-0.5">
                        Acesso de Gerenciamento
                      </p>
                      <p className="text-dark-300 text-xs sm:text-sm">
                        Os administradores do bot podem gerenciar assinaturas, cargos e ações de
                        membros
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* CARD 2: Idioma */}
      <div
        className="bg-dark-800 shadow-xs sub_feature_card rounded-lg mb-4 border border-dark-700/40"
        id="settings.language.heading"
      >
        <h3
          onClick={() => setIsLanguageOpen(!isLanguageOpen)}
          className="text-h6 text-dark-100 flex justify-between items-start hover:text-dark-200 transition-all py-4 lg:py-6 px-6 cursor-pointer select-none"
        >
          <div className="flex flex-col w-full pr-4 max-w-[760px]">
            <div className="sub_feature_title flex items-center text-lg font-semibold">Idioma</div>
            <div className="mt-2 text-sm text-dark-300">
              Mude o idioma padrão do MEE6 no seu servidor.
            </div>
          </div>
          <div className="flex items-center justify-between gap-4">
            <button
              type="button"
              className="pt-1 text-dark-300 hover:text-white transition-colors"
            >
              {isLanguageOpen ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
            </button>
          </div>
        </h3>

        {isLanguageOpen && (
          <div className="text-base transition-all animate-fadeIn">
            <div className="p-6 pt-0">
              <div className="grid w-full border-t border-solid border-dark-700 pt-4" />
              <div className="relative max-w-md">
                <label className="text-sm font-medium text-dark-400 mb-2 flex items-start max-w-max justify-start">
                  Idioma do bot
                </label>
                <div className="relative">
                  <div
                    onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                    className="overflow-hidden flex items-center justify-between bg-dark-900 rounded-lg border border-dark-700 hover:border-brand-default px-4 py-3 cursor-pointer transition-all duration-200"
                  >
                    <div className="flex items-center gap-2.5 text-dark-100 font-medium text-sm">
                      {selectedLangObj.flagSvg}
                      <span>{selectedLangObj.name}</span>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-dark-400 transition-transform ${
                        isLanguageDropdownOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </div>

                  {isLanguageDropdownOpen && (
                    <div className="absolute top-[54px] left-0 z-30 w-full rounded-lg bg-dark-900 border border-dark-700 max-h-[300px] overflow-y-auto shadow-xl p-1.5 animate-fadeIn">
                      {LANGUAGES.map((lang) => (
                        <div
                          key={lang.code}
                          onClick={() => {
                            setLanguage(lang.code);
                            setIsLanguageDropdownOpen(false);
                          }}
                          className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm cursor-pointer transition-colors ${
                            language === lang.code
                              ? 'bg-dark-700 text-white font-semibold'
                              : 'text-dark-200 hover:bg-dark-800'
                          }`}
                        >
                          {lang.flagSvg}
                          <span>{lang.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* CARD 3: Fuso horário */}
      <div
        className="bg-dark-800 shadow-xs sub_feature_card rounded-lg mb-4 border border-dark-700/40"
        id="settings.timezone.heading"
      >
        <h3
          onClick={() => setIsTimezoneOpen(!isTimezoneOpen)}
          className="text-h6 text-dark-100 flex justify-between items-start hover:text-dark-200 transition-all py-4 lg:py-6 px-6 cursor-pointer select-none"
        >
          <div className="flex flex-col w-full pr-4 max-w-[760px]">
            <div className="sub_feature_title flex items-center text-lg font-semibold">
              Fuso horário
            </div>
            <div className="mt-2 text-sm text-dark-300">
              Altere o fuso horário predefinido do MEE6 no seu servidor.
            </div>
          </div>
          <div className="flex items-center justify-between gap-4">
            <button
              type="button"
              className="pt-1 text-dark-300 hover:text-white transition-colors"
            >
              {isTimezoneOpen ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
            </button>
          </div>
        </h3>

        {isTimezoneOpen && (
          <div className="text-base transition-all animate-fadeIn">
            <div className="p-6 pt-0">
              <div className="grid w-full border-t border-solid border-dark-700 pt-4" />
              <div className="relative max-w-md">
                <label className="text-sm font-medium text-dark-400 mb-2 flex items-start max-w-max justify-start">
                  Fuso horário do bot
                </label>
                <div className="relative">
                  <div
                    onClick={() => setIsTimezoneDropdownOpen(!isTimezoneDropdownOpen)}
                    className="overflow-hidden flex items-center justify-between bg-dark-900 rounded-lg border border-dark-700 hover:border-brand-default px-4 py-3 cursor-pointer transition-all duration-200"
                  >
                    <span className="text-dark-100 text-sm font-medium">{timezone}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-dark-400 transition-transform ${
                        isTimezoneDropdownOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </div>

                  {isTimezoneDropdownOpen && (
                    <div className="absolute top-[54px] left-0 z-30 w-full rounded-lg bg-dark-900 border border-dark-700 max-h-[260px] overflow-y-auto shadow-xl p-1.5 animate-fadeIn">
                      {TIMEZONES.map((tz) => (
                        <div
                          key={tz}
                          onClick={() => {
                            setTimezone(tz);
                            setIsTimezoneDropdownOpen(false);
                          }}
                          className={`px-3 py-2 rounded-lg text-sm cursor-pointer transition-colors ${
                            timezone === tz
                              ? 'bg-dark-700 text-white font-semibold'
                              : 'text-dark-200 hover:bg-dark-800'
                          }`}
                        >
                          {tz}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* CARD 4: Cor padrão da mensagem incorporada */}
      <div
        className="bg-dark-800 shadow-xs sub_feature_card rounded-lg mb-4 border border-dark-700/40"
        id="settings.embed.heading"
      >
        <h3
          onClick={() => setIsEmbedColorOpen(!isEmbedColorOpen)}
          className="text-h6 text-dark-100 flex justify-between items-start hover:text-dark-200 transition-all py-4 lg:py-6 px-6 cursor-pointer select-none"
        >
          <div className="flex flex-col w-full pr-4 max-w-[760px]">
            <div className="sub_feature_title flex items-center text-lg font-semibold gap-2 flex-wrap">
              <span>Cor padrão da mensagem incorporada</span>
              <Mee6CrownBadge className="w-5 h-5" />
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs px-2.5 py-0.5 font-medium border border-emerald-500/30">
                <Sparkles className="w-3 h-3" />
                Novo!
              </span>
            </div>
            <div className="mt-2 text-sm text-dark-300">
              Altere a cor padrão da mensagem incorporada do MEE6 em seu servidor.
            </div>
          </div>
          <div className="flex items-center justify-between gap-4">
            <button
              type="button"
              className="pt-1 text-dark-300 hover:text-white transition-colors"
            >
              {isEmbedColorOpen ? (
                <ChevronUp className="w-6 h-6" />
              ) : (
                <ChevronDown className="w-6 h-6" />
              )}
            </button>
          </div>
        </h3>

        {isEmbedColorOpen && (
          <div className="text-base transition-all animate-fadeIn">
            <div className="p-6 pt-0">
              <div className="grid w-full border-t border-solid border-dark-700 pt-4" />

              {/* Discord message preview with color wheel picker */}
              <div className="flex items-start justify-start gap-3.5 max-w-xl">
                {/* Left: Avatar + Color Picker Trigger */}
                <div className="w-8 min-w-[2rem] flex flex-col gap-3 shrink-0">
                  <img
                    src={currentServer.iconUrl}
                    alt={currentServer.name}
                    className="rounded-full object-cover w-8 h-8 ring-1 ring-dark-600"
                  />
                  <div className="relative">
                    <DiscordColorPicker
                      color={embedColor}
                      onChange={setEmbedColor}
                      triggerType="wheel"
                    />
                  </div>
                </div>

                {/* Right: Message Header & Colored Embed Preview */}
                <div className="w-full min-w-0">
                  <div className="flex items-center justify-start gap-2">
                    <span className="text-dark-100 font-bold text-xs">{currentServer.name}</span>
                    <span className="rounded bg-[#5865F2] text-white uppercase text-[9px] px-1.5 py-0.2 flex items-center font-bold">
                      bot
                    </span>
                    <p className="text-[10px] text-dark-400">Hoje às 05:18</p>
                  </div>

                  {/* Embed Box */}
                  <div className="mt-2 relative w-full max-w-[480px]">
                    <div
                      className="rounded-lg overflow-hidden border-l-4 shadow-md bg-dark-900 transition-all duration-200"
                      style={{ borderLeftColor: embedColor }}
                    >
                      <div className="p-4 flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-sm font-semibold mb-1">
                            Exemplo de título de uma mensagem incorporada
                          </p>
                          <p className="text-dark-300 text-xs sm:text-sm leading-relaxed">
                            Exemplo de descrição de uma mensagem incorporada
                          </p>
                        </div>
                        <Shield className="w-6 h-6 text-dark-500 shrink-0 mt-0.5" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* CARD 5: Prefixo de comandos personalizados */}
      <div
        className="bg-dark-800 shadow-xs sub_feature_card rounded-lg mb-4 border border-dark-700/40"
        id="settings.customCommandsPrefix.heading"
      >
        <h3
          onClick={() => setIsPrefixOpen(!isPrefixOpen)}
          className="text-h6 text-dark-100 flex justify-between items-start hover:text-dark-200 transition-all py-4 lg:py-6 px-6 cursor-pointer select-none"
        >
          <div className="flex flex-col w-full pr-4 max-w-[760px]">
            <div className="sub_feature_title flex items-center text-lg font-semibold gap-2">
              <span>Prefixo de comandos personalizados</span>
              <Mee6CrownBadge className="w-5 h-5" />
            </div>
            <div className="mt-2 text-sm text-dark-300">
              Você pode alterar o prefixo usado para acionar seus comandos personalizados.
            </div>
          </div>
          <div className="flex items-center justify-between gap-4">
            <button
              type="button"
              className="pt-1 text-dark-300 hover:text-white transition-colors"
            >
              {isPrefixOpen ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
            </button>
          </div>
        </h3>

        {isPrefixOpen && (
          <div className="text-base transition-all animate-fadeIn">
            <div className="p-6 pt-0">
              <div className="grid w-full border-t border-solid border-dark-700 pt-4" />
              <div className="relative flex flex-col max-w-sm">
                <label className="text-sm font-medium text-dark-400 mb-2 flex items-start max-w-max justify-start">
                  Prefixo de comandos personalizados
                </label>
                <div className="overflow-hidden flex items-center justify-start bg-dark-900 rounded-lg border border-dark-700 hover:border-brand-default focus-within:ring-2 focus-within:ring-brand-light transition-all duration-200">
                  <input
                    type="text"
                    maxLength={3}
                    placeholder="!"
                    value={commandPrefix}
                    onChange={(e) => setCommandPrefix(e.target.value)}
                    className="bg-transparent outline-none border-none py-3 px-4 text-sm text-dark-100 w-full placeholder:text-dark-500 font-mono font-bold"
                  />
                </div>
              </div>

              {/* Dynamic examples with prefix */}
              <div className="flex flex-wrap gap-2 mt-3">
                <code className="px-2.5 py-1 rounded bg-dark-900 border border-dark-700 text-xs font-mono text-dark-200">
                  <strong className="text-white">{activePrefix}</strong>welcome
                </code>
                <code className="px-2.5 py-1 rounded bg-dark-900 border border-dark-700 text-xs font-mono text-dark-200">
                  <strong className="text-white">{activePrefix}</strong>faq
                </code>
                <code className="px-2.5 py-1 rounded bg-dark-900 border border-dark-700 text-xs font-mono text-dark-200">
                  <strong className="text-white">{activePrefix}</strong>socials
                </code>
              </div>

              <p className="flex gap-2 text-xs mt-4 text-dark-400 items-center">
                <Info className="w-4 h-4 text-dark-400 shrink-0" />
                Este prefixo se aplica apenas ao plugin de Comandos Personalizados. Todos os outros comandos do MEE6 são
                Comandos de Barra (Slash Commands) e são sempre acionados com /.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* CARD 6: Ressincronizar comandos de barra */}
      <div
        className="bg-dark-800 shadow-xs sub_feature_card rounded-lg mb-4 border border-dark-700/40"
        id="settings.resync.heading"
      >
        <h3
          onClick={() => setIsResyncOpen(!isResyncOpen)}
          className="text-h6 text-dark-100 flex justify-between items-start hover:text-dark-200 transition-all py-4 lg:py-6 px-6 cursor-pointer select-none"
        >
          <div className="flex flex-col w-full pr-4 max-w-[760px]">
            <div className="sub_feature_title flex items-center text-lg font-semibold">
              Ressincronizar comandos de barra
            </div>
            <div className="mt-2 text-sm text-dark-300 leading-relaxed">
              <p>
                Registra novamente os comandos de barra deste servidor no Discord e reaplica as
                permissões que você definiu para cada comando. Use quando:
              </p>
              <ul className="list-disc space-y-1 pl-5 mt-2 text-xs sm:text-sm">
                <li>um comando estiver ausente do menu /;</li>
                <li>membros com o cargo correto não conseguirem ver um comando;</li>
                <li>um comando estiver visível, mas responder que o membro não tem permissão;</li>
                <li>
                  alguém tiver alterado as permissões de comando manualmente nas configurações de Integrações do Discord
                  e você desejar restaurá-las.
                </li>
              </ul>
              <p className="mt-2 text-xs text-dark-400">Leva até um minuto.</p>
            </div>
          </div>
          <div className="flex items-center justify-between gap-4">
            <button
              type="button"
              className="pt-1 text-dark-300 hover:text-white transition-colors"
            >
              {isResyncOpen ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
            </button>
          </div>
        </h3>

        {isResyncOpen && (
          <div className="text-base transition-all animate-fadeIn">
            <div className="p-6 pt-0">
              <div className="grid w-full border-t border-solid border-dark-700 pt-4" />
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  disabled={isResyncing}
                  onClick={handleResync}
                  className="relative flex overflow-hidden shrink-0 rounded-lg transition-all duration-200 items-center gap-2 bg-brand-default text-dark-900 hover:bg-brand-hover active:bg-brand-default active:bg-opacity-40 disabled:cursor-not-allowed disabled:opacity-50 text-sm px-4 py-2 font-bold cursor-pointer shadow-sm"
                >
                  {isResyncing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Ressincronizando...</span>
                    </>
                  ) : resyncDone ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>Ressincronizado com sucesso!</span>
                    </>
                  ) : (
                    <>
                      <RefreshCw className="w-4 h-4" />
                      <span>Ressincronizar agora</span>
                    </>
                  )}
                </button>
              </div>
              <p className="flex gap-2 text-xs mt-3 text-dark-400 items-center">
                <Info className="w-4 h-4 text-dark-400 shrink-0" />
                A ressincronização pode ser executada uma vez a cada 5 minutos.
              </p>
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
