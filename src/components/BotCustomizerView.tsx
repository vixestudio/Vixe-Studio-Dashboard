import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Pencil,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
  Check,
  Upload,
  Link as LinkIcon,
  X,
  Dice5,
  Info,
  Hash,
  Smile,
  Plus,
} from 'lucide-react';
import { ServerInfo } from '../types';

interface BotCustomizerViewProps {
  currentServer: ServerInfo;
  onOpenDirectImageModal?: () => void;
  onNavigateToCharacters?: () => void;
  onBackToDashboard?: () => void;
}

type StatusOption = 'online' | 'idle' | 'invisible' | 'dnd';
type ActivityOption = 'none' | 'playing' | 'streaming' | 'listening' | 'watching' | 'custom';

const SAMPLE_LORES = [
  'Você é o Sr. Meeseeks de "Rick and Morty". Seu tom é muito entusiasmado, você está usando frases de preenchimento como "sou eu, Sr. Meeseeks" ou "olhe para mim", você é obcecado em servir as pessoas e sempre tenta ser útil em suas respostas',
  'Você é Darth Vader, o Lorde Sith de Star Wars. Seu tom é imponente, frio e autoritário. Você responde de forma calculada e direta, com respiração mecânica e citações sobre o poder do Lado Sombrio da Força.',
  'Você é Sherlock Holmes, o lendário detetive de Baker Street. Seu tom é analítico, perspicaz e levemente sarcástico. Você observa detalhes minuciosos e deduz conclusões lógicas sobre as mensagens dos membros.',
  'Você é J.A.R.V.I.S., a inteligência artificial criada por Tony Stark. Seu tom é britânico polido, altamente cortês, sarcástico na medida certa e com vasto conhecimento tecnológico.',
  'Você é Rick Sanchez de "Rick and Morty". Seu tom é cínico, genial, impaciente e cheio de arrotos e deboches científicos. Você acha quase tudo tedioso, mas responde brilhantemente quando provocado.',
];

const ALL_CHANNELS = [
  { id: 'c1', name: '🔹・log-parcerias-reprovadas' },
  { id: 'c2', name: '🔹・liberar' },
  { id: 'c3', name: '👋🏻・bem-vindos' },
  { id: 'c4', name: '🔹・convites' },
  { id: 'c5', name: '🔹・comunicados' },
  { id: 'c6', name: '🔹・regras' },
  { id: 'c7', name: '🔹・sobre-nós' },
  { id: 'c8', name: '🔹・sorteios' },
  { id: 'c9', name: '🔹・lançamentos' },
  { id: 'c10', name: '🔹・recomendações' },
  { id: 'c11', name: '🔹・props' },
  { id: 'c12', name: '🔹・mapas' },
  { id: 'c13', name: '🔹・roupas' },
  { id: 'c14', name: '🔹・atendimento' },
  { id: 'c15', name: '🔹・feedback' },
  { id: 'c16', name: '🔹・status' },
  { id: 'c17', name: '🔹・atualizações' },
  { id: 'c18', name: '🔹・fórum' },
  { id: 'c19', name: '🔹・médias' },
  { id: 'c20', name: '🔹・sugestões' },
  { id: 'c21', name: '🔹・comandos' },
  { id: 'c22', name: '🔹・ferramentas' },
  { id: 'c23', name: '🔹・parcerias' },
  { id: 'c24', name: '🔹・análise-parceria' },
  { id: 'c25', name: '🔹・criar-produtos' },
  { id: 'c26', name: '🔹・moderator' },
  { id: 'c27', name: '🔹・log-parcerias-aprovadas' },
];

const DICAS_ILLUSTRATION_BASE64 =
  'data:image/png;base64,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';

export const BotCustomizerView: React.FC<BotCustomizerViewProps> = ({
  currentServer,
  onOpenDirectImageModal,
  onNavigateToCharacters,
  onBackToDashboard,
}) => {
  // Config state
  const [isActive, setIsActive] = useState(true);
  const [activeTab, setActiveTab] = useState<'basics' | 'backstory'>('backstory');
  
  // Bot identity
  const [botName, setBotName] = useState('vixestudio');
  const [botIcon, setBotIcon] = useState('https://cdn.discordapp.com/embed/avatars/0.png');
  const [botBanner, setBotBanner] = useState<string | null>(null);
  
  // Status & Activity
  const [status, setStatus] = useState<StatusOption>('online');
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);

  const [activityType, setActivityType] = useState<ActivityOption>('listening');
  const [isActivityDropdownOpen, setIsActivityDropdownOpen] = useState(false);

  const [statusText, setStatusText] = useState('/help');
  const [streamUrl, setStreamUrl] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  // Backstory AI states
  const [isBackstoryActive, setIsBackstoryActive] = useState(true);
  const [backstoryPrompt, setBackstoryPrompt] = useState(
    'Por exemplo: Você é o Sr. Meeseeks de "Rick and Morty". Seu tom é muito entusiasmado, você está usando frases de preenchimento como "sou eu, Sr. Meeseeks" ou "olhe para mim", você é obcecado em servir as pessoas e sempre tenta ser útil em suas respostas'
  );
  const [showBanner, setShowBanner] = useState(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState(true);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  
  // Channel permissions multi-select
  const [selectedChannels, setSelectedChannels] = useState<string[]>([
    '🔹・log-parcerias-reprovadas',
  ]);
  const [isChannelDropdownOpen, setIsChannelDropdownOpen] = useState(false);
  const [channelSearch, setChannelSearch] = useState('');
  const channelDropdownRef = useRef<HTMLDivElement>(null);

  // Image modal
  const [imageModalType, setImageModalType] = useState<'icon' | 'banner' | null>(null);
  const [customImageUrl, setCustomImageUrl] = useState('');
  const iconFileInputRef = useRef<HTMLInputElement>(null);
  const bannerFileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (channelDropdownRef.current && !channelDropdownRef.current.contains(e.target as Node)) {
        setIsChannelDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const statusConfigs: Record<StatusOption, { label: string; color: string; dotClass: string }> = {
    online: {
      label: 'Online',
      color: 'rgb(35, 165, 90)',
      dotClass: 'bg-[#23a55a] border-[#23a55a]',
    },
    idle: {
      label: 'Ausente',
      color: 'rgb(240, 178, 50)',
      dotClass: 'bg-[#f0b232] border-[#f0b232]',
    },
    invisible: {
      label: 'Invisível',
      color: 'rgb(128, 132, 142)',
      dotClass: 'bg-[#80848e] border-[#80848e]',
    },
    dnd: {
      label: 'Não incomodar',
      color: 'rgb(242, 63, 67)',
      dotClass: 'bg-[#f23f43] border-[#f23f43]',
    },
  };

  const activityLabels: Record<ActivityOption, string> = {
    none: 'Nenhum',
    playing: 'Jogando',
    streaming: 'Transmitindo',
    listening: 'Ouvindo',
    watching: 'Assistindo',
    custom: 'Customizado',
  };

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
    }, 2500);
  };

  const handleRandomize = () => {
    const available = SAMPLE_LORES.filter((l) => l !== backstoryPrompt);
    const chosen = available[Math.floor(Math.random() * available.length)];
    setBackstoryPrompt(chosen);
  };

  const handleToggleChannel = (channelName: string) => {
    setSelectedChannels((prev) =>
      prev.includes(channelName)
        ? prev.filter((c) => c !== channelName)
        : [...prev, channelName]
    );
  };

  const handleAddAllChannels = () => {
    setSelectedChannels(ALL_CHANNELS.map((c) => c.name));
  };

  const handleRemoveChannel = (channelName: string) => {
    setSelectedChannels((prev) => prev.filter((c) => c !== channelName));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'icon' | 'banner') => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      if (type === 'icon') {
        setBotIcon(url);
      } else {
        setBotBanner(url);
      }
    }
  };

  const applyCustomUrl = () => {
    if (customImageUrl.trim()) {
      if (imageModalType === 'icon') {
        setBotIcon(customImageUrl.trim());
      } else if (imageModalType === 'banner') {
        setBotBanner(customImageUrl.trim());
      }
      setCustomImageUrl('');
      setImageModalType(null);
    }
  };

  const filteredChannels = ALL_CHANNELS.filter((c) =>
    c.name.toLowerCase().includes(channelSearch.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-16 animate-fadeIn" id="dashboard__content">
      {/* Header Bar */}
      <div className="flex justify-between mb-2">
            <div className="flex flex-col grow items-center lg:items-start">
              <div className="bg-dark-800 sm:bg-transparent flex items-center justify-between w-full px-4 py-3 sm:px-0 sm:py-0 mb-3 sm:mb-0 rounded-xl sm:rounded-none border border-zinc-800 sm:border-none">
                {onBackToDashboard && (
                  <button
                    onClick={onBackToDashboard}
                    className="sm:hidden p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors mr-2 cursor-pointer"
                    title="Voltar ao Painel"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                )}

                <h4 className="font-bold text-white text-xl sm:text-2xl lg:text-3xl flex-1 text-center lg:text-left flex flex-row items-center font-display">
                  Personalizador de Bot
                </h4>

                {/* Main Active Toggle Switch */}
                <div
                  onClick={() => setIsActive(!isActive)}
                  className="flex justify-start cursor-pointer gap-2.5 items-center flex-row-reverse select-none"
                >
                  <div
                    className={`shrink-0 rounded-full transition-all duration-200 overflow-hidden relative cursor-pointer h-[28px] w-[56px] ${
                      isActive ? 'bg-zinc-200' : 'bg-dark-700 border border-zinc-700'
                    }`}
                  >
                    <div
                      className={`rounded-full top-1 absolute transition-all duration-200 transform flex items-center justify-center h-5 w-5 ${
                        isActive
                          ? 'translate-x-8 bg-zinc-950 shadow-sm'
                          : 'translate-x-1 bg-zinc-400'
                      }`}
                    >
                      <div
                        className={`h-2 w-2 rounded-full transition-all duration-200 ${
                          isActive ? 'bg-zinc-200' : 'bg-dark-800'
                        }`}
                      />
                    </div>
                  </div>
                  <label className="select-none cursor-pointer flex flex-col gap-0.5">
                    <div className="text-zinc-300 text-sm max-w-field flex font-medium">
                      {isActive ? 'Ativo' : 'Desativado'}
                    </div>
                  </label>
                </div>
              </div>

              <p className="text-sm sm:text-base text-zinc-300 max-w-[830px] ml-0 w-full mt-2 sm:mt-3 text-center sm:text-left leading-relaxed">
                Torne seu bot realmente especial alterando seu nome de usuário, avatar, atividade e histórico.
              </p>
            </div>
          </div>

          {/* Navigation Subtabs: Basics / História de fundo (AI) */}
          <div className="relative max-sm:mb-6">
            <div className="mt-2 relative flex items-center justify-start border-b border-solid border-zinc-800 mb-8 overflow-auto no-scrollbar scroll-smooth">
              <div>
                <button
                  onClick={() => setActiveTab('basics')}
                  className={`transition-all duration-200 hover:text-white font-medium capitalize text-base cursor-pointer px-4 pb-3 flex items-center justify-start whitespace-nowrap ${
                    activeTab === 'basics' ? 'text-white font-bold' : 'text-zinc-400'
                  }`}
                >
                  Basics
                </button>
              </div>
              <div>
                <button
                  onClick={() => setActiveTab('backstory')}
                  className={`transition-all duration-200 hover:text-white font-medium capitalize text-base cursor-pointer px-4 pb-3 flex items-center justify-start whitespace-nowrap ${
                    activeTab === 'backstory' ? 'text-white font-bold' : 'text-zinc-400'
                  }`}
                >
                  <div className="flex items-center justify-start gap-2">
                    <p>História de fundo</p>
                    <div className="text-white bg-gradient-to-r from-violet-600 to-indigo-600 px-1.5 py-0.5 rounded text-[11px] font-extrabold tracking-wider">
                      AI
                    </div>
                  </div>
                </button>
              </div>

              {/* Active Indicator Underline */}
              <div
                className="h-0.5 bg-white rounded-full absolute bottom-0 transition-all duration-200"
                style={{
                  width: activeTab === 'basics' ? '77px' : '191px',
                  left: activeTab === 'basics' ? '0px' : '77px',
                }}
              />
            </div>

            {/* TAB CONTENT 1: HISTÓRIA DE FUNDO (BACKSTORY) */}
            {activeTab === 'backstory' && (
              <div className="pb-8 animate-fadeIn">
                {/* Bookworm Intro Banner */}
                {showBanner && (
                  <div className="bg-dark-750 border border-zinc-800 rounded-xl p-5 w-full relative z-1 flex items-start sm:items-center justify-start gap-5 mb-6 shadow-sm">
                    <div className="w-[120px] h-[96px] shrink-0 hidden lg:flex items-center justify-center bg-dark-850 rounded-xl border border-zinc-700/60 p-2">
                      <div className="relative flex flex-col items-center">
                        <div className="w-12 h-12 rounded-full bg-violet-600/30 border border-violet-500/50 flex items-center justify-center text-2xl shadow-inner">
                          📖
                        </div>
                        <span className="text-[10px] text-violet-300 font-bold mt-1 uppercase tracking-wider">
                          Lore Master
                        </span>
                      </div>
                    </div>

                    <div className="pr-8">
                      <p className="text-white font-bold text-base mb-2">
                        Dê ao seu bot uma história de fundo
                      </p>
                      <p className="text-zinc-300 text-sm whitespace-pre-line leading-relaxed">
                        Sua comunidade agora pode conversar com Harry Potter, Rick Sanchez, Lara Croft... você decide!{'\n'}
                        Basta adicionar detalhes, descrever o tom de voz e outros atributos, nós fazemos o resto.{'\n\n'}
                        <span className="font-bold text-white">O que consigo fazer?</span> Qualquer coisa que vier à mente! Use sua criatividade ou nosso gerador de IA para encontrar uma inspiração.
                      </p>
                    </div>

                    {/* Close button */}
                    <button
                      onClick={() => setShowBanner(false)}
                      className="cursor-pointer text-zinc-400 hover:text-white p-1 rounded-lg hover:bg-dark-800 absolute right-4 top-4 transition-colors"
                      title="Fechar aviso"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {/* Sub-Feature Card: História de fundo (customBot.backstory) */}
                <div
                  className="bg-dark-800 border border-zinc-800 shadow-xs rounded-2xl mb-6 overflow-hidden"
                  id="customBot.backstory"
                >
                  {/* Card Header with Toggle */}
                  <div className="flex justify-between items-center py-4 lg:py-5 px-6 border-b border-zinc-800">
                    <div className="flex items-center text-lg font-bold text-white font-display">
                      História de fundo
                    </div>

                    <div
                      onClick={() => setIsBackstoryActive(!isBackstoryActive)}
                      className="flex justify-start cursor-pointer gap-2.5 items-center flex-row select-none"
                    >
                      <div
                        className={`shrink-0 rounded-full transition-all duration-200 overflow-hidden relative cursor-pointer h-[28px] w-[56px] ${
                          isBackstoryActive ? 'bg-zinc-200' : 'bg-dark-700 border border-zinc-700'
                        }`}
                      >
                        <div
                          className={`rounded-full top-1 absolute transition-all duration-200 transform flex items-center justify-center h-5 w-5 ${
                            isBackstoryActive
                              ? 'translate-x-8 bg-zinc-950 shadow-sm'
                              : 'translate-x-1 bg-zinc-400'
                          }`}
                        >
                          <div
                            className={`h-2 w-2 rounded-full transition-all duration-200 ${
                              isBackstoryActive ? 'bg-zinc-200' : 'bg-dark-800'
                            }`}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                      {/* Left: Textarea, Counter, Emoji, Info Note and Save Button */}
                      <div className="lg:col-span-7 xl:col-span-8 w-full space-y-4">
                        <div className="w-full flex items-center justify-between mb-1">
                          <label className="text-sm font-medium text-zinc-300">
                            História de fundo
                          </label>

                          <button
                            type="button"
                            onClick={handleRandomize}
                            className="flex items-center justify-end gap-1.5 text-white hover:text-zinc-200 text-sm font-semibold cursor-pointer group transition-colors"
                          >
                            <Dice5 className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" />
                            <span>Randomizar</span>
                          </button>
                        </div>

                        {/* Slate Editor / Textarea container */}
                        <div className="relative w-full">
                          <textarea
                            rows={7}
                            value={backstoryPrompt}
                            onChange={(e) => setBackstoryPrompt(e.target.value)}
                            placeholder='Por exemplo: Você é o Sr. Meeseeks de "Rick and Morty". Seu tom é muito entusiasmado, você está usando frases de preenchimento como "sou eu, Sr. Meeseeks" ou "olhe para mim", você é obcecado em servir as pessoas e sempre tenta ser útil em suas respostas'
                            maxLength={2000}
                            className="w-full outline-none bg-dark-900 rounded-xl p-4 pr-12 text-sm text-zinc-100 placeholder-zinc-500 leading-relaxed border border-zinc-800 focus:border-zinc-500 transition duration-200 resize-y min-h-[180px]"
                          />

                          {/* Quick Emoji Picker Button */}
                          <div className="absolute top-3 right-3">
                            <button
                              type="button"
                              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-dark-800 transition-colors"
                              title="Inserir Emoji"
                            >
                              <Smile className="w-4 h-4" />
                            </button>

                            {showEmojiPicker && (
                              <div className="absolute right-0 top-8 z-30 bg-dark-850 border border-zinc-700 rounded-xl p-2 shadow-2xl flex gap-1 animate-fadeIn">
                                {['🤖', '🧙‍♂️', '⚔️', '✨', '⚡', '👑', '🔥', '🛡️'].map((emoji) => (
                                  <button
                                    key={emoji}
                                    type="button"
                                    onClick={() => {
                                      setBackstoryPrompt((prev) => prev + ' ' + emoji);
                                      setShowEmojiPicker(false);
                                    }}
                                    className="p-1.5 hover:bg-dark-700 rounded text-base cursor-pointer transition-transform hover:scale-110"
                                  >
                                    {emoji}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>

                          <p className="absolute bottom-3 right-4 text-zinc-500 text-xs pointer-events-none font-mono">
                            {backstoryPrompt.length} / 2000
                          </p>
                        </div>

                        {/* Subscription info note */}
                        <div className="text-zinc-400 text-xs flex items-start gap-2 pt-1 leading-relaxed">
                          <Info className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
                          <span>
                            Para desbloquear pacotes de respostas do seu bot personalizado, você pode comprar uma{' '}
                            <span className="text-white underline hover:text-zinc-200 cursor-pointer font-semibold">
                              assinatura de IA
                            </span>{' '}
                            para todo o servidor.
                          </span>
                        </div>

                        {/* Save Button with AI Gradient */}
                        <div className="pt-3">
                          <button
                            onClick={handleSave}
                            className="relative flex overflow-hidden shrink-0 rounded-xl transition-all duration-200 items-center justify-center gap-2 font-bold bg-white text-zinc-950 hover:bg-zinc-200 active:scale-95 px-8 py-3 text-base shadow-md cursor-pointer"
                          >
                            {isSaved ? (
                              <>
                                <Check className="w-5 h-5 text-emerald-600" />
                                <span>Mudanças Salvas</span>
                              </>
                            ) : (
                              <span>Salvar Mudanças</span>
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Right: Discord Previews & Tips Box */}
                      <div className="lg:col-span-5 xl:col-span-4 w-full flex flex-col gap-5">
                        <div className="w-full space-y-4">
                          {/* Member List Preview */}
                          <div>
                            <p className="text-zinc-400 text-sm font-medium mb-2">
                              Pré-visualização da lista de membros
                            </p>
                            <div className="bg-[#2E3036] rounded-xl p-3.5 border border-zinc-700/50 shadow-md">
                              <div className="flex items-center justify-start gap-3">
                                <div className="w-[32px] h-[32px] min-w-[32px] relative">
                                  <img
                                    src={botIcon}
                                    alt="Avatar Mini"
                                    className="w-full h-full object-cover rounded-full"
                                  />
                                  <div
                                    className="rounded-full w-[16px] h-[16px] absolute -bottom-0.5 -right-0.5 border-[3px] border-solid"
                                    style={{
                                      borderColor: 'rgb(46, 48, 54)',
                                      backgroundColor: statusConfigs[status].color,
                                    }}
                                  />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <div className="flex items-center justify-start gap-1.5">
                                    <p className="text-white text-sm font-semibold text-ellipsis overflow-hidden max-w-[120px] whitespace-nowrap">
                                      {botName}
                                    </p>
                                    <div className="bg-[#5865F2] rounded px-1 text-[10px] font-semibold py-0.5 text-white uppercase">
                                      APP
                                    </div>
                                  </div>
                                  <p className="text-[#8A8C91] text-xs truncate">
                                    {activityType !== 'none' && statusText
                                      ? `${activityLabels[activityType]} ${statusText}`
                                      : statusConfigs[status].label}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Profile Popout Preview */}
                          <div>
                            <p className="text-zinc-400 text-sm font-medium mb-2">
                              Pré-visualização do perfil
                            </p>
                            <div className="bg-[#2E3036] rounded-2xl overflow-hidden border border-zinc-700/60 shadow-xl">
                              <div className="h-[60px] bg-gradient-to-r from-[#5865F2] to-[#7289da]">
                                {botBanner && (
                                  <img
                                    src={botBanner}
                                    alt="Banner"
                                    className="w-full h-full object-cover"
                                  />
                                )}
                              </div>
                              <div className="px-4 relative">
                                <div className="flex items-end gap-2">
                                  <div className="w-[72px] h-[72px] min-w-[72px] -mt-[36px] relative rounded-full bg-[#2E3036]">
                                    <img
                                      src={botIcon}
                                      alt="Avatar Grande"
                                      className="w-full h-full object-cover rounded-full border-[5px] border-[#2E3036]"
                                    />
                                    <div
                                      className="rounded-full w-[24px] h-[24px] min-w-[24px] absolute bottom-0 right-0 border-[4px] border-solid"
                                      style={{
                                        borderColor: 'rgb(46, 48, 54)',
                                        backgroundColor: statusConfigs[status].color,
                                      }}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="px-4 pb-4">
                                <div className="mt-2">
                                  <div className="flex items-center gap-1.5">
                                    <p className="text-white text-lg font-bold">{botName}</p>
                                    <div className="bg-[#5865F2] rounded px-1.5 text-[10px] font-semibold py-0.5 text-white uppercase">
                                      APP
                                    </div>
                                  </div>
                                  <p className="text-[#B5BAC1] text-xs font-medium">
                                    {botName.toLowerCase()}#0710
                                  </p>
                                </div>
                                {activityType !== 'none' && statusText && (
                                  <div className="mt-3 bg-[#3A3C41] rounded-xl p-3 border border-white/5">
                                    <p className="text-[#B5BAC1] text-xs font-semibold mb-1">
                                      {activityLabels[activityType]}
                                    </p>
                                    <p className="text-white text-sm font-semibold truncate">
                                      {statusText}
                                    </p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Tips card with original base64 Darth Vader artwork */}
                        <div className="bg-dark-750 border border-zinc-800 rounded-2xl p-5 w-full relative z-1 shadow-sm overflow-hidden">
                          <p className="text-zinc-400 uppercase text-xs font-bold tracking-wider">
                            DICAS
                          </p>
                          <p className="text-sm font-bold text-white mt-1 mb-2.5">
                            Use a forma imperativa
                          </p>
                          <ul className="space-y-2 relative z-10">
                            <li className="flex items-center justify-start gap-2 text-zinc-300 text-xs">
                              <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                                ✓
                              </span>
                              <span>Você é Darth Vader e você é...</span>
                            </li>
                            <li className="flex items-center justify-start gap-2 text-zinc-300 text-xs">
                              <span className="w-4 h-4 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0">
                                ✕
                              </span>
                              <span>Eu sou Darth Vader e eu sou...</span>
                            </li>
                          </ul>

                          {/* Base64 Illustration Art */}
                          <img
                            src={DICAS_ILLUSTRATION_BASE64}
                            alt="Dicas Ilustração"
                            className="w-full max-w-[125px] object-contain rounded-lg absolute bottom-0 right-0 opacity-40 pointer-events-none -z-0"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sub-Feature Card 2: Configurações da história de fundo (customBot.backstory.settings) */}
                <div
                  className="bg-dark-800 border border-zinc-800 shadow-xs rounded-2xl overflow-hidden"
                  id="customBot.backstory.settings"
                >
                  {/* Header with expand/collapse */}
                  <div
                    onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                    className="flex justify-between items-center py-4 lg:py-5 px-6 cursor-pointer hover:bg-dark-750 transition-colors border-b border-zinc-800 select-none"
                  >
                    <div className="flex flex-col w-full pr-4">
                      <div className="flex items-center text-lg font-bold text-white font-display">
                        Configurações da história de fundo
                      </div>
                    </div>
                    <button className="pt-1 text-zinc-400 hover:text-white cursor-pointer">
                      {isSettingsOpen ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </button>
                  </div>

                  {/* Body */}
                  {isSettingsOpen && (
                    <div className="p-6 space-y-4">
                      <p className="text-white text-base font-semibold">Permissões do canal</p>

                      <div className="w-full" ref={channelDropdownRef}>
                        <label className="text-sm font-medium text-zinc-300 mb-2 flex items-start max-w-max justify-start">
                          Canais onde a história de fundo é permitida (se vazio: todos os canais permitidos)
                        </label>

                        {/* Selector box */}
                        <div id="1-channel_selector" className="relative w-full">
                          <div
                            onClick={() => setIsChannelDropdownOpen(!isChannelDropdownOpen)}
                            className="rounded-xl cursor-pointer bg-dark-900 min-h-[50px] px-3 py-2 flex items-center justify-between border border-zinc-800 hover:border-zinc-700 transition duration-200"
                          >
                            <div className="w-full flex items-center justify-start flex-wrap gap-2">
                              {selectedChannels.length === 0 ? (
                                <span className="text-sm text-zinc-500 py-1">
                                  Todos os canais permitidos (clique para restringir)
                                </span>
                              ) : (
                                selectedChannels.map((ch) => (
                                  <div
                                    key={ch}
                                    className="inline-flex items-center gap-1.5 font-medium rounded-full text-xs px-2.5 py-1 bg-zinc-800 text-zinc-200 border border-zinc-700 shadow-xs"
                                  >
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleRemoveChannel(ch);
                                      }}
                                      className="hover:text-rose-400 cursor-pointer"
                                    >
                                      <X className="w-3 h-3" />
                                    </button>
                                    <Hash className="w-3.5 h-3.5 text-zinc-400" />
                                    <span>{ch}</span>
                                  </div>
                                ))
                              )}
                            </div>

                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setIsChannelDropdownOpen(!isChannelDropdownOpen);
                              }}
                              className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-dark-800 transition-colors shrink-0 ml-2"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>

                          {/* Channel Picker Dropdown */}
                          {isChannelDropdownOpen && (
                            <div className="absolute left-0 top-[calc(100%+6px)] z-30 w-full rounded-2xl bg-dark-900 border border-zinc-700 shadow-2xl max-h-[360px] overflow-hidden flex flex-col animate-fadeIn">
                              {/* Search */}
                              <div className="p-3 border-b border-zinc-800">
                                <input
                                  type="text"
                                  placeholder="Filtrar canal..."
                                  value={channelSearch}
                                  onChange={(e) => setChannelSearch(e.target.value)}
                                  className="w-full px-3 py-1.5 text-xs bg-dark-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
                                />
                              </div>

                              <div className="overflow-y-auto p-2 divide-y divide-zinc-800/50 scrollbar-thin scrollbar-thumb-zinc-700">
                                {/* Options header */}
                                <div className="pb-2">
                                  <p className="uppercase text-zinc-500 font-bold text-[10px] px-2 py-1 tracking-wider">
                                    Opções
                                  </p>
                                  <button
                                    type="button"
                                    onClick={handleAddAllChannels}
                                    className="w-full flex p-2 rounded-lg items-center justify-start text-zinc-200 text-sm font-medium hover:bg-dark-800 transition duration-150 cursor-pointer gap-2"
                                  >
                                    <Plus className="w-4 h-4 text-zinc-400" />
                                    <span>Adicionar todos os canais</span>
                                  </button>
                                </div>

                                {/* Channels list */}
                                <div className="pt-2">
                                  <p className="uppercase text-zinc-500 font-bold text-[10px] px-2 py-1 tracking-wider">
                                    Canais
                                  </p>
                                  <div className="space-y-0.5">
                                    {filteredChannels.map((channel) => {
                                      const isChecked = selectedChannels.includes(channel.name);
                                      return (
                                        <div
                                          key={channel.id}
                                          onClick={() => handleToggleChannel(channel.name)}
                                          className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors ${
                                            isChecked ? 'bg-zinc-800/80' : 'hover:bg-dark-800'
                                          }`}
                                        >
                                          <div className="flex items-center gap-2 text-sm text-zinc-200">
                                            <div
                                              className={`w-4 h-4 rounded flex items-center justify-center border transition-colors ${
                                                isChecked
                                                  ? 'bg-white border-white text-zinc-950'
                                                  : 'border-zinc-600 bg-dark-800'
                                              }`}
                                            >
                                              {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                                            </div>
                                            <Hash className="w-4 h-4 text-zinc-400" />
                                            <span className="text-xs sm:text-sm font-medium">
                                              {channel.name}
                                            </span>
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB CONTENT 2: BASICS (WITH FULL FORM AND DISCORD PREVIEWS) */}
            {activeTab === 'basics' && (
              <div className="pb-8 animate-fadeIn">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Left Column: Form & Assets (Col 7 / 8) */}
                  <div className="lg:col-span-7 xl:col-span-8 space-y-6">
                    {/* Card 1: Identidade Visual */}
                    <div className="bg-dark-800 border border-zinc-800 shadow-xs p-6 rounded-2xl">
                      <h4 className="text-base font-bold text-white mb-5 font-display">Identidade Visual</h4>
                      <div className="flex flex-col sm:flex-row items-start gap-8">
                      <div>
                        <p className="text-dark-400 text-sm font-medium mb-3">Ícone</p>
                        <div
                          onClick={() => iconFileInputRef.current?.click()}
                          className="relative group cursor-pointer w-fit"
                          title="Clique para alterar o ícone"
                        >
                          <img
                            src={botIcon}
                            alt="Ícone do Bot"
                            className="rounded-lg w-[120px] h-[120px] object-cover"
                          />
                          <div className="absolute top-2 right-2 flex gap-1.5 opacity-100 xl:opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="bg-dark-800 bg-opacity-80 rounded p-1.5 hover:bg-opacity-100">
                              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
                              </svg>
                            </div>
                          </div>
                          <input
                            type="file"
                            ref={iconFileInputRef}
                            accept="image/*"
                            onChange={(e) => handleFileChange(e, 'icon')}
                            className="hidden"
                          />
                        </div>
                      </div>

                      <div>
                        <p className="text-dark-400 text-sm font-medium mb-3">Papel de parede</p>
                        <div
                          onClick={() => bannerFileInputRef.current?.click()}
                          className="relative group w-fit cursor-pointer"
                          title="Clique para carregar o banner"
                        >
                          <div className="rounded-lg w-[272px] h-[96px] overflow-hidden">
                            {botBanner ? (
                              <img
                                src={botBanner}
                                alt="Papel de parede"
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full bg-dark-700 flex items-center justify-center">
                                <span className="text-dark-400 text-sm">
                                  Click to upload your banner
                                </span>
                              </div>
                            )}
                          </div>
                          <div className="absolute top-2 right-2 flex gap-1.5 opacity-100 xl:opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="bg-dark-800 bg-opacity-80 rounded p-1.5 hover:bg-opacity-100 cursor-pointer">
                              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
                              </svg>
                            </div>
                          </div>
                          <input
                            type="file"
                            ref={bannerFileInputRef}
                            accept="image/*"
                            onChange={(e) => handleFileChange(e, 'banner')}
                            className="hidden"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card 2: Inputs Form */}
                  <div className="bg-dark-800 border border-zinc-800 shadow-xs p-6 rounded-2xl">
                    <h4 className="text-base font-bold text-white mb-5 font-display">Configurações Gerais</h4>
                    <div className="w-full flex flex-col lg:grid lg:grid-cols-2 gap-5">
                      <div className="relative flex flex-col lg:col-span-2">
                        <label className="text-sm font-medium text-dark-400 mb-2 flex items-start max-w-max justify-start">
                          Nome do bot
                        </label>
                        <div className="overflow-hidden flex items-center justify-start group bg-dark-900 rounded-lg border border-solid transition-all duration-200 focus-within:ring-opacity-30 focus-within:ring-[4px] hover:border-brand-default focus-within:border-brand-default focus-within:ring-brand-default border-dark-900">
                          <input
                            type="text"
                            value={botName}
                            onChange={(e) => setBotName(e.target.value)}
                            className="bg-transparent outline-none border-none py-3 placeholder:text-dark-300 text-base text-dark-100 w-full px-4"
                          />
                        </div>
                      </div>

                      <div className="relative lg:col-span-2">
                        <label className="text-sm font-medium text-dark-400 mb-2 flex items-start max-w-max justify-start">
                          Status do bot
                        </label>
                        <div translate="no" className="relative">
                          <div
                            onClick={() => {
                              setIsStatusDropdownOpen(!isStatusDropdownOpen);
                              setIsActivityDropdownOpen(false);
                            }}
                            className="overflow-hidden flex items-center justify-start group bg-dark-900 rounded-lg border border-solid transition-all duration-200 active:ring-opacity-30 active:ring-[4px] hover:border-blue-default border-dark-900 active:border-blue-default ring-blue-default cursor-pointer"
                          >
                            <div className="bg-transparent outline-none border-none py-3 w-full px-4 cursor-pointer flex justify-between items-center text-body text-dark-100">
                              <div className="flex-1 min-w-0 overflow-hidden">
                                <div className="flex items-center justify-start">
                                  <div
                                    className="h-2 w-2 rounded-full mr-2 border-[2px] border-solid"
                                    style={{
                                      backgroundColor: statusConfigs[status].color,
                                      borderColor: statusConfigs[status].color,
                                    }}
                                  />
                                  {statusConfigs[status].label}
                                </div>
                              </div>
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className={`transition-all flex-shrink-0 ml-auto ${
                                  isStatusDropdownOpen ? 'rotate-0' : 'rotate-180'
                                }`}
                              >
                                <path
                                  d="M7 14.5l5-5 5 5"
                                  stroke="currentColor"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                ></path>
                              </svg>
                            </div>
                          </div>

                          {isStatusDropdownOpen && (
                            <div className="top-[81px] absolute left-0 z-30 w-full rounded-lg bg-dark-900 max-h-[320px] overflow-y-auto overflow-x-hidden transition-all duration-200 shadow-xl p-2 border border-zinc-700">
                              <ul className="space-y-1">
                                {(Object.keys(statusConfigs) as StatusOption[]).map((st) => (
                                  <li
                                    key={st}
                                    onClick={() => {
                                      setStatus(st);
                                      setIsStatusDropdownOpen(false);
                                    }}
                                    className={`p-2 rounded-lg transition duration-200 font-sans text-base text-dark-100 cursor-pointer flex items-center justify-start ${
                                      status === st ? 'bg-zinc-700 font-semibold' : 'hover:bg-dark-700'
                                    }`}
                                  >
                                    <div className="w-full">
                                      <div className="flex items-center justify-start">
                                        <div
                                          className="h-2 w-2 rounded-full mr-2 border-[2px] border-solid"
                                          style={{
                                            backgroundColor: statusConfigs[st].color,
                                            borderColor: statusConfigs[st].color,
                                          }}
                                        />
                                        {statusConfigs[st].label}
                                      </div>
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className={`relative ${activityType === 'none' ? 'lg:col-span-2' : ''}`}>
                        <label className="text-sm font-medium text-dark-400 mb-2 flex items-start max-w-max justify-start">
                          Tipo de Atividade
                        </label>
                        <div translate="no" className="relative">
                          <div
                            onClick={() => {
                              setIsActivityDropdownOpen(!isActivityDropdownOpen);
                              setIsStatusDropdownOpen(false);
                            }}
                            className="overflow-hidden flex items-center justify-start group bg-dark-900 rounded-lg border border-solid transition-all duration-200 active:ring-opacity-30 active:ring-[4px] hover:border-blue-default border-dark-900 active:border-blue-default ring-blue-default cursor-pointer"
                          >
                            <div className="bg-transparent outline-none border-none py-3 w-full px-4 cursor-pointer flex justify-between items-center text-body text-dark-100">
                              <div className="flex-1 min-w-0 overflow-hidden">
                                <div className="flex items-center justify-start gap-2">
                                  {activityLabels[activityType]}
                                </div>
                              </div>
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className={`transition-all flex-shrink-0 ml-auto ${
                                  isActivityDropdownOpen ? 'rotate-0' : 'rotate-180'
                                }`}
                              >
                                <path
                                  d="M7 14.5l5-5 5 5"
                                  stroke="currentColor"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                ></path>
                              </svg>
                            </div>
                          </div>

                          {isActivityDropdownOpen && (
                            <div className="top-[81px] absolute left-0 z-30 w-full rounded-lg bg-dark-900 max-h-[320px] overflow-y-auto overflow-x-hidden transition-all duration-200 shadow-xl p-2 border border-zinc-700">
                              <ul className="space-y-1">
                                {(Object.keys(activityLabels) as ActivityOption[]).map((act) => (
                                  <li
                                    key={act}
                                    onClick={() => {
                                      setActivityType(act);
                                      setIsActivityDropdownOpen(false);
                                    }}
                                    className={`p-2 rounded-lg transition duration-200 font-sans text-base text-dark-100 cursor-pointer flex items-center justify-start ${
                                      activityType === act ? 'bg-zinc-700 font-semibold' : 'hover:bg-dark-700'
                                    }`}
                                  >
                                    <div className="w-full">
                                      <div className="flex items-center justify-start gap-2">
                                        {activityLabels[act]}
                                      </div>
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>

                      {activityType !== 'none' && (
                        <div className="relative flex flex-col">
                          <label className="text-sm font-medium text-dark-400 mb-2 flex items-start max-w-max justify-start">
                            Texto do status
                          </label>
                          <div className="overflow-hidden flex items-center justify-start group bg-dark-900 rounded-lg border border-solid transition-all duration-200 focus-within:ring-opacity-30 focus-within:ring-[4px] hover:border-brand-default focus-within:border-brand-default focus-within:ring-brand-default border-dark-900">
                            <input
                              type="text"
                              placeholder="Insira um texto de status"
                              value={statusText}
                              onChange={(e) => setStatusText(e.target.value)}
                              className="bg-transparent outline-none border-none py-3 placeholder:text-dark-300 text-base text-dark-100 w-full px-4"
                            />
                          </div>
                        </div>
                      )}

                      {activityType === 'streaming' && (
                        <div className="lg:col-span-2">
                          <div className="relative flex flex-col">
                            <label className="text-sm font-medium text-dark-400 mb-2 flex items-start max-w-max justify-start">
                              Link da transmissão
                            </label>
                            <div className="overflow-hidden flex items-center justify-start group bg-dark-900 rounded-lg border border-solid transition-all duration-200 focus-within:ring-opacity-30 focus-within:ring-[4px] hover:border-brand-default focus-within:border-brand-default focus-within:ring-brand-default border-dark-900">
                              <input
                                type="text"
                                placeholder="Enter Twitch or Youtube URL"
                                value={streamUrl}
                                onChange={(e) => setStreamUrl(e.target.value)}
                                className="bg-transparent outline-none border-none py-3 placeholder:text-dark-300 text-base text-dark-100 w-full px-4"
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="lg:col-span-2 mt-2">
                        <button
                          onClick={handleSave}
                          className="relative flex overflow-hidden shrink-0 rounded-lg transition-all duration-200 items-center gap-1.5 bg-brand-default text-dark-900 hover:bg-brand-hover active:bg-brand-default active:bg-opacity-40 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-brand-default !px-8 text-base px-4 py-2 cursor-pointer font-bold"
                        >
                          <div className="flex flex-grow justify-center max-w-full">
                            <span className="transition-all duration-200 whitespace-nowrap text-ellipsis overflow-hidden block w-full shrink-0 text-center">
                              {isSaved ? 'Mudanças Salvas' : 'Salvar Alterações'}
                            </span>
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                  {/* Right: Previews in Discord (Col 5 / 4) */}
                  <div className="lg:col-span-5 xl:col-span-4 w-full space-y-4">
                      {/* Member List Preview */}
                      <div>
                        <p className="text-dark-400 text-sm font-medium mb-2">
                          Pré-visualização da lista de membros
                        </p>
                        <div className="bg-[#2E3036] rounded-lg p-4">
                          <div className="flex items-center justify-start gap-3">
                            <div className="w-[32px] h-[32px] min-w-[32px] relative">
                              <img
                                src={botIcon}
                                alt="Avatar Mini"
                                className="w-full h-full object-cover rounded-full"
                              />
                              <div
                                className="rounded-full w-[20px] h-[20px] min-w-[20px] absolute -bottom-1.5 -right-0.5 border-[4px] border-solid"
                                style={{
                                  borderColor: 'rgb(46, 48, 54)',
                                  backgroundColor:
                                    activityType === 'streaming'
                                      ? '#593695'
                                      : statusConfigs[status].color,
                                }}
                              />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center justify-start gap-1.5">
                                <p className="text-white text-sm font-medium text-ellipsis overflow-hidden max-w-[120px] whitespace-nowrap">
                                  {botName || 'vixestudio'}
                                </p>
                                <div className="bg-[#5865F2] rounded px-1 text-[10px] font-semibold py-0.5 text-white uppercase">
                                  APP
                                </div>
                              </div>
                              {activityType !== 'none' && statusText && (
                                <p className="text-[#8A8C91] text-xs truncate">
                                  {activityLabels[activityType]} {statusText}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Profile Preview */}
                      <div>
                        <p className="text-dark-400 text-sm font-medium mb-2">
                          Pré-visualização do perfil
                        </p>
                        <div className="bg-[#2E3036] rounded-lg overflow-hidden">
                          <div className="h-[60px] bg-gradient-to-r from-[#5865F2] to-[#7289da] relative overflow-hidden">
                            {botBanner && (
                              <img
                                src={botBanner}
                                alt="Banner de Perfil"
                                className="w-full h-full object-cover"
                              />
                            )}
                          </div>

                          <div className="px-4 relative">
                            <div className="flex items-end gap-2">
                              <div className="w-[72px] h-[72px] min-w-[72px] -mt-[36px] relative rounded-full bg-[#2E3036]">
                                <img
                                  src={botIcon}
                                  alt="Avatar Grande"
                                  className="w-full h-full object-cover rounded-full border-[5px] border-[#2E3036]"
                                />
                                <div
                                  className="rounded-full w-[28px] h-[28px] min-w-[28px] absolute -bottom-1 -right-1 border-[5px] border-solid"
                                  style={{
                                    borderColor: 'rgb(46, 48, 54)',
                                    backgroundColor:
                                      activityType === 'streaming'
                                        ? '#593695'
                                        : statusConfigs[status].color,
                                  }}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="px-4 pb-4">
                            <div className="mt-2">
                              <div className="flex items-center gap-1.5">
                                <p className="text-white text-lg font-semibold">
                                  {botName || 'vixestudio'}
                                </p>
                                <div className="bg-[#5865F2] rounded px-1.5 text-[10px] font-semibold py-0.5 text-white uppercase">
                                  APP
                                </div>
                              </div>
                              <p className="text-[#B5BAC1] text-sm">
                                {botName
                                  ? `${botName.toLowerCase().replace(/\s+/g, '')}#0710`
                                  : 'vixestudio#0710'}
                              </p>
                            </div>

                            {activityType !== 'none' && statusText && (
                              <div className="mt-3 bg-[#3A3C41] rounded-lg p-3 border border-white/5">
                                <p className="text-[#B5BAC1] text-xs font-bold uppercase tracking-wider mb-1">
                                  {activityLabels[activityType]}
                                </p>
                                <p className="text-white text-sm font-semibold truncate">
                                  {statusText}
                                </p>
                                {activityType === 'streaming' && streamUrl && (
                                  <p className="text-[#00b0f4] text-xs font-medium truncate mt-1">
                                    {streamUrl}
                                  </p>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            )}

            {/* Bottom Tip Banner */}
            <div className="bg-dark-800 rounded-2xl px-6 py-5 mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-zinc-800 shadow-sm">
              <div className="flex items-center justify-start gap-3.5">
                <div className="text-zinc-950 bg-white font-extrabold rounded-lg px-2.5 py-1 text-xs shrink-0 shadow-xs">
                  Dica
                </div>
                <p className="w-full font-semibold text-sm sm:text-base lg:text-lg text-white leading-snug">
                  Gostando da história de fundo? Agora você pode adicionar{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-300 to-indigo-400 font-bold">
                    vários personagens diferentes
                  </span>{' '}
                  que falam com você e entre eles
                </p>
              </div>

              <button
                onClick={onNavigateToCharacters}
                className="relative flex overflow-hidden shrink-0 rounded-xl transition-all duration-200 items-center gap-1.5 bg-white text-zinc-950 hover:bg-zinc-200 active:scale-95 text-sm font-bold px-5 py-2.5 cursor-pointer shadow-sm"
              >
                <span>Ver mais</span>
              </button>
            </div>
          </div>

      {/* Modal for setting custom image direct URL */}
      {imageModalType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="bg-dark-800 border border-zinc-700 rounded-2xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Upload className="w-5 h-5 text-zinc-300" />
              <span>
                {imageModalType === 'icon' ? 'Alterar Ícone do Bot' : 'Alterar Papel de Parede'}
              </span>
            </h3>

            <p className="text-xs text-zinc-300 leading-relaxed">
              Você pode enviar uma imagem do seu computador ou colar o link direto (URL pública) da imagem.
            </p>

            <div className="space-y-3">
              <div>
                <label className="text-xs text-zinc-400 block mb-1">
                  Enviar arquivo do computador:
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    handleFileChange(e, imageModalType);
                    setImageModalType(null);
                  }}
                  className="w-full text-xs text-zinc-300 file:mr-3 file:py-2 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-zinc-700 file:text-white hover:file:bg-zinc-600 cursor-pointer"
                />
              </div>

              <div className="relative flex py-1 items-center">
                <div className="flex-grow border-t border-zinc-700"></div>
                <span className="flex-shrink mx-3 text-zinc-500 text-[11px] uppercase tracking-wider">
                  ou URL direta
                </span>
                <div className="flex-grow border-t border-zinc-700"></div>
              </div>

              <div>
                <label className="text-xs text-zinc-400 block mb-1">Cole a URL direta da imagem:</label>
                <input
                  type="url"
                  value={customImageUrl}
                  onChange={(e) => setCustomImageUrl(e.target.value)}
                  placeholder="https://exemplo.com/minha-imagem.png"
                  className="w-full bg-dark-900 border border-zinc-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => {
                  setImageModalType(null);
                  setCustomImageUrl('');
                }}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-zinc-400 hover:text-white hover:bg-dark-700 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={applyCustomUrl}
                disabled={!customImageUrl.trim()}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-white text-zinc-950 hover:bg-zinc-200 disabled:opacity-50 transition-colors"
              >
                Aplicar URL
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
