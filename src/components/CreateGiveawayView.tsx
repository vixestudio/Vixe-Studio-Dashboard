import React, { useState } from 'react';
import {
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Clock,
  Eye,
  Trash2,
  Calendar as CalendarIcon,
  Check,
  ChevronLeft,
  ChevronRight,
  Shield,
  Plus,
  Maximize2,
  Minimize2,
  AlertCircle,
  ExternalLink,
  Sparkles,
  Smile,
  Image as ImageIcon,
  X,
} from 'lucide-react';
import { ServerInfo } from '../types';
import { DiscordChannelSelect, DiscordColorPicker, DiscordSwitch } from './common';

interface CreateGiveawayViewProps {
  currentServer: ServerInfo;
  onBack: () => void;
  onSave?: (giveawayData: any) => void;
}

export const CreateGiveawayView: React.FC<CreateGiveawayViewProps> = ({
  currentServer,
  onBack,
  onSave,
}) => {
  // Collapsible cards state
  const [isGiveawaysNameOpen, setIsGiveawaysNameOpen] = useState(true);
  const [isWinningOpen, setIsWinningOpen] = useState(true);
  const [isMessageOpen, setIsMessageOpen] = useState(true);
  const [isRequirementsOpen, setIsRequirementsOpen] = useState(true);

  // Form Fields
  const [selectedChannel, setSelectedChannel] = useState('');
  const [giveawayTitle, setGiveawayTitle] = useState('');

  // Winning configs
  const [prizeName, setPrizeName] = useState('');
  const [giveXp, setGiveXp] = useState(false);
  const [giveCoins, setGiveCoins] = useState(false);
  const [adjustRoleOdds, setAdjustRoleOdds] = useState(false);

  // Message & Embed configs
  const [stripeColor, setStripeColor] = useState('#70B1FF');
  const [colorHistory, setColorHistory] = useState<string[]>(['#70B1FF', '#607D8B']);
  const [hexInput, setHexInput] = useState('70B1FF');
  const [authorName, setAuthorName] = useState('');
  const [authorUrl, setAuthorUrl] = useState('');
  const [authorImage, setAuthorImage] = useState<string | null>(null);
  const [titleText, setTitleText] = useState('');
  const [titleUrl, setTitleUrl] = useState('');
  const [messageTemplate, setMessageTemplate] = useState('');
  const [customFieldName, setCustomFieldName] = useState('');
  const [customFieldDesc, setCustomFieldDesc] = useState('');
  const [footerText, setFooterText] = useState('');
  const [footerImage, setFooterImage] = useState<string | null>(null);
  const [embedImage, setEmbedImage] = useState<string | null>(null);
  const [thumbnailImage, setThumbnailImage] = useState<string | null>(null);
  const [isFieldInline, setIsFieldInline] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  // Requirements configs
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [winnersCount, setWinnersCount] = useState<number | string>('');
  const [rolePolicy, setRolePolicy] = useState<'deny_except' | 'allow_except'>('deny_except');
  const [selectedRole, setSelectedRole] = useState('');
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);

  // Mock channels
  const channels = [
    '🔹・liberar',
    '👋🏻・bem-vindos',
    '🔹・convites',
    '🔹・comunicados',
    '🔹・regras',
    '🔹・sobre-nós',
    '🔹・sorteios',
    '🔹・lançamentos',
    '🔹・recomendações',
    '🔹・atendimento',
    '🔹・feedback',
    '🔹・status',
    '🔹・atualizações',
    '🔹・fórum',
    '🔹・médias',
    '🔹・sugestões',
    '🔹・comandos',
    '🔹・ferramentas',
    '🔹・análise-parceria',
    '🔹・criar-produtos',
    '🔹・moderator',
    '🔹・log-parcerias-aprovadas',
    '🔹・log-parcerias-reprovadas',
  ];

  // Colors for stripe
  const stripeColors = [
    '#FFFFFF',
    '#607D8B',
    '#FF7673',
    '#FFBB5C',
    '#FFD74E',
    '#6DE194',
    '#63ECDB',
    '#5ACFF5',
    '#70B1FF',
    '#B072FF',
  ];

  // Mock roles
  const roles = [
    { name: 'Proprietário(a)', color: '#2F22DD' },
    { name: 'Gerenciamento', color: '#2F22DD' },
    { name: 'Vixe System', color: '#2F22DD' },
    { name: 'Moderador', color: '#2F22DD' },
    { name: 'Vixe Studio', color: '#2F22DD' },
    { name: 'Português', color: '#2F22DD' },
    { name: 'Inglês', color: '#2F22DD' },
    { name: 'Ferramentas', color: '#2F22DD' },
    { name: 'Cliente', color: '#2F22DD' },
    { name: 'Aluno(a)', color: '#2F22DD' },
  ];

  const handleResetForm = () => {
    setSelectedChannel('');
    setGiveawayTitle('');
    setPrizeName('');
    setGiveXp(false);
    setGiveCoins(false);
    setAdjustRoleOdds(false);
    setStripeColor('#70B1FF');
    setHexInput('70B1FF');
    setAuthorName('');
    setAuthorUrl('');
    setAuthorImage(null);
    setTitleText('');
    setTitleUrl('');
    setMessageTemplate('');
    setCustomFieldName('');
    setCustomFieldDesc('');
    setFooterText('');
    setFooterImage(null);
    setEmbedImage(null);
    setThumbnailImage(null);
    setEndDate('');
    setEndTime('');
    setWinnersCount('');
    setSelectedRole('');
  };

  const handlePublish = () => {
    if (!prizeName.trim()) {
      alert('Por favor, informe o que os membros ganharão (Nome do prêmio).');
      return;
    }
    if (onSave) {
      onSave({
        prize: prizeName,
        channel: selectedChannel || '🔹・sorteios',
        title: giveawayTitle || 'Novo Sorteio',
        winnersCount: Number(winnersCount) || 1,
        endDate: endDate ? `${endDate} às ${endTime || '23:59'}` : 'Em 24 horas',
      });
    }
    onBack();
  };

  const renderDiscordPreview = () => (
    <div className="flex items-start gap-3 sm:gap-4 text-left">
      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-violet-600 flex items-center justify-center font-bold text-white shrink-0 text-sm sm:text-base">
        V
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 sm:gap-2 mb-1 flex-wrap">
          <span className="font-bold text-white text-sm">Vixe Bot</span>
          <span className="text-[10px] bg-indigo-600 text-white font-bold px-1.5 py-0.5 rounded-md">
            BOT
          </span>
          <span className="text-xs text-zinc-400">Hoje às 15:42</span>
        </div>

        {/* Discord Embed */}
        <div
          className="rounded-lg bg-[#2b2d31] p-3.5 sm:p-4 text-xs space-y-2.5 border-l-4 shadow-sm relative overflow-hidden break-words"
          style={{ borderLeftColor: stripeColor }}
        >
          {/* Author row */}
          {authorName && (
            <div className="flex items-center gap-2">
              {authorImage && (
                <img
                  src={authorImage}
                  alt=""
                  className="w-5 h-5 rounded-full object-cover shrink-0"
                />
              )}
              {authorUrl ? (
                <a
                  href={authorUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-white hover:underline font-semibold truncate"
                >
                  {authorName}
                </a>
              ) : (
                <span className="text-[11px] text-zinc-300 font-semibold truncate">{authorName}</span>
              )}
            </div>
          )}

          {/* Title and Thumbnail container */}
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1.5 flex-1 min-w-0">
              {titleUrl ? (
                <a
                  href={titleUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base font-bold text-sky-400 hover:underline block break-words"
                >
                  {titleText || '🎉 Novo sorteio 🎉'}
                </a>
              ) : (
                <h4 className="text-base font-bold text-white break-words">
                  {titleText || '🎉 Novo sorteio 🎉'}
                </h4>
              )}

              <p className="text-zinc-300 whitespace-pre-wrap leading-relaxed break-words">
                {messageTemplate || 'Clique no botão abaixo para participar!'}
              </p>
            </div>

            {/* Capa / Thumbnail Preview */}
            {thumbnailImage && (
              <img
                src={thumbnailImage}
                alt="Thumbnail"
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-md object-cover shrink-0 ml-2"
              />
            )}
          </div>

          <div className="py-2 border-t border-b border-zinc-700/50 space-y-1">
            <div className="text-white font-semibold flex items-center gap-1.5 flex-wrap">
              <span>Prêmio:</span>
              <span className="text-emerald-400 font-bold break-words">
                {prizeName || 'Gift Card Digital'}
              </span>
            </div>
            <div className="text-zinc-400 flex items-center gap-3 sm:gap-4 flex-wrap text-[11px]">
              <span>Ganhadores: {winnersCount}</span>
              <span>Término: {endDate ? `${endDate} às ${endTime || '23:59'}` : 'Em 24 horas'}</span>
            </div>
          </div>

          {customFieldName && (
            <div className={isFieldInline ? 'inline-block mr-4 mb-2' : 'block mb-2'}>
              <div className="font-bold text-white text-[11px] break-words">{customFieldName}</div>
              <div className="text-zinc-400 text-[11px] break-words">{customFieldDesc}</div>
            </div>
          )}

          {/* Imagem / Big Image Preview */}
          {embedImage && (
            <div className="mt-2 rounded-lg overflow-hidden max-h-64">
              <img
                src={embedImage}
                alt="Banner"
                className="w-full object-cover max-h-64 rounded-md"
              />
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center gap-2 text-[10px] text-zinc-400 pt-1">
            {footerImage && (
              <img
                src={footerImage}
                alt=""
                className="w-4 h-4 rounded-full object-cover shrink-0"
              />
            )}
            <span className="truncate">
              {footerText || `Sorteio organizado via Vixe Bot • ${currentServer.name}`}
            </span>
          </div>
        </div>

        {/* Reaction Button */}
        <div className="mt-3">
          <button
            type="button"
            className="px-4 py-1.5 bg-[#2b2d31] hover:bg-[#35373c] border border-zinc-700 rounded-lg text-white font-semibold text-xs flex items-center gap-2 cursor-pointer transition-colors shadow-xs"
          >
            <span>🎉</span>
            <span>Participar (0)</span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div id="dashboard__content" className="w-full flex flex-col animate-fadeIn">
      {/* Header Action Bar */}
      <div className="mb-6 pt-4 lg:pt-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-dark-700/60 pb-5">
        <div className="flex items-center justify-start w-full sm:w-auto">
          <button
            onClick={onBack}
            className="cursor-pointer mr-3 text-dark-300 hover:text-white transition-colors p-1.5 -ml-1 rounded-lg hover:bg-dark-800"
            title="Voltar"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="font-bold text-white text-xl sm:text-2xl tracking-tight font-display">
              Criar novo Sorteio
            </h2>
            <p className="text-xs text-dark-400 mt-0.5">
              Configure prêmios, canal de postagem e regras do sorteio
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 w-full sm:w-auto justify-start sm:justify-end">
          <button
            type="button"
            onClick={() => setShowPreviewModal(true)}
            className="xl:hidden flex items-center gap-1.5 bg-dark-800 hover:bg-dark-750 border border-zinc-700 text-zinc-200 hover:text-white text-xs sm:text-sm px-3 py-2 rounded-xl font-medium cursor-pointer transition-colors shadow-xs"
          >
            <Eye className="w-4 h-4 text-brand-default" />
            <span>Ver Prévia</span>
          </button>
          <button
            type="button"
            onClick={handleResetForm}
            className="flex items-center gap-1.5 bg-dark-800 hover:bg-dark-750 border border-zinc-700 text-zinc-300 hover:text-white text-xs sm:text-sm px-3 py-2 rounded-xl font-medium cursor-pointer transition-colors shadow-xs"
            title="Limpar todos os campos preenchidos"
          >
            Limpar tudo
          </button>
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-1.5 bg-dark-800 hover:bg-dark-750 border border-zinc-700 text-zinc-300 hover:text-white text-xs sm:text-sm px-3 py-2 rounded-xl font-medium cursor-pointer transition-colors shadow-xs"
          >
            Descartar
          </button>
          <button
            type="button"
            onClick={handlePublish}
            disabled={!prizeName.trim()}
            className="flex items-center gap-1.5 bg-brand-default text-dark-900 hover:bg-brand-hover active:bg-brand-default disabled:cursor-not-allowed disabled:opacity-40 text-xs sm:text-sm px-4 sm:px-5 py-2 rounded-xl font-bold cursor-pointer transition-colors shadow-xs"
          >
            Publicar
          </button>
        </div>
      </div>

      {/* 2-Column Responsive Layout: Form on Left/Center, Live Discord Embed Preview on Right (Desktop) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 xl:gap-8 items-start pb-16 w-full">
        {/* Left Form Column */}
        <div className="xl:col-span-7 2xl:col-span-8 space-y-4 w-full min-w-0">
        {/* 1. Sorteios (Canal e Nome) */}
        <div
          className="bg-dark-800 shadow-xs sub_feature_card rounded-2xl border border-dark-700/80 overflow-hidden"
          id="plugins.giveaways.name"
        >
          <h3
            onClick={() => setIsGiveawaysNameOpen(!isGiveawaysNameOpen)}
            className="text-h6 text-dark-100 flex justify-between items-center hover:text-dark-200 transition-all py-4 lg:py-6 px-6 cursor-pointer select-none"
          >
            <span className="text-lg font-semibold text-dark-100">
              Sorteios
            </span>
            <div className="text-dark-300">
              {isGiveawaysNameOpen ? (
                <ChevronUp className="w-6 h-6 transition-all" />
              ) : (
                <ChevronDown className="w-6 h-6 transition-all" />
              )}
            </div>
          </h3>

          {isGiveawaysNameOpen && (
            <div className="text-base transition-all">
              <div className="p-6 pt-0 border-t border-dark-700/80">
                <div className="w-full grid grid-cols-1 gap-4 pt-4">
                      {/* Canal Selector */}
                      <DiscordChannelSelect
                        label="Canal"
                        required
                        value={selectedChannel}
                        onChange={setSelectedChannel}
                        placeholder="Selecione um canal..."
                      />

                      {/* Nome do Sorteio */}
                      <div>
                        <label className="text-sm font-medium text-dark-400 mb-2 flex items-start max-w-max justify-start">
                          Nome do sorteio<span className="text-rose-500 ml-1">*</span>
                        </label>
                        <div className="overflow-hidden flex items-center justify-start bg-dark-900 rounded-lg border border-solid transition-all duration-200 focus-within:ring-opacity-30 focus-within:ring-[4px] hover:border-brand-default focus-within:border-brand-default focus-within:ring-brand-default border-dark-900">
                          <input
                            type="text"
                            placeholder="Como você quer chamar esse sorteio?"
                            value={giveawayTitle}
                            onChange={(e) => setGiveawayTitle(e.target.value)}
                            className="bg-transparent outline-none border-none py-3 placeholder:text-dark-400 text-sm text-dark-100 w-full px-4"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 2. Configurar vencedores */}
            <div
              className="bg-dark-800 shadow-xs sub_feature_card rounded-2xl border border-dark-700/80 overflow-hidden"
              id="plugins.giveaways.winning"
            >
              <h3
                onClick={() => setIsWinningOpen(!isWinningOpen)}
                className="text-h6 text-dark-100 flex justify-between items-center hover:text-dark-200 transition-all py-4 lg:py-6 px-6 cursor-pointer select-none"
              >
                <span className="text-lg font-semibold text-dark-100">
                  Configurar vencedores
                </span>
                <div className="text-dark-300">
                  {isWinningOpen ? (
                    <ChevronUp className="w-6 h-6 transition-all" />
                  ) : (
                    <ChevronDown className="w-6 h-6 transition-all" />
                  )}
                </div>
              </h3>

              {isWinningOpen && (
                <div className="text-base transition-all">
                  <div className="p-6 pt-0 border-t border-dark-700/80">
                    <div className="w-full grid grid-cols-1 gap-5 pt-4">
                      <div>
                        <p className="text-base font-semibold text-dark-100 mb-3">Nome do prêmio</p>
                        <label className="text-sm font-medium text-dark-400 mb-2 flex items-start max-w-max justify-start">
                          O que os membros ganharão?<span className="text-rose-500 ml-1">*</span>
                        </label>
                        <div className="overflow-hidden flex items-center justify-start bg-dark-900 rounded-lg border border-solid transition-all duration-200 focus-within:ring-opacity-30 focus-within:ring-[4px] hover:border-brand-default focus-within:border-brand-default focus-within:ring-brand-default border-dark-900">
                          <input
                            type="text"
                            placeholder="Exemplo: Um gift card digital"
                            value={prizeName}
                            onChange={(e) => setPrizeName(e.target.value)}
                            className="bg-transparent outline-none border-none py-3 placeholder:text-dark-400 text-sm text-dark-100 w-full px-4"
                          />
                        </div>
                      </div>

                      <div>
                        <p className="text-base font-semibold text-dark-100 mb-3">
                          Configurações adicionais
                        </p>

                        <div className="space-y-4">
                          <DiscordSwitch
                            checked={giveXp}
                            onChange={setGiveXp}
                            label="Também dê XP aos vencedores"
                          />

                          <DiscordSwitch
                            checked={giveCoins}
                            onChange={setGiveCoins}
                            label="Também dê moedas aos vencedores"
                          />

                          <div className="flex items-center gap-2">
                            <DiscordSwitch
                              checked={adjustRoleOdds}
                              onChange={setAdjustRoleOdds}
                              label="Ajuste as probabilidades por cargos"
                            />

                            <div className="relative inline-block ml-1 group">
                              <HelpCircle className="w-4 h-4 text-dark-400 cursor-pointer" />
                              <div className="absolute left-6 top-0 hidden group-hover:block z-40 w-64 bg-dark-900 border border-dark-700 p-3 rounded-lg text-xs text-dark-200 shadow-xl">
                                Se um membro possuir vários dos cargos listados, o maior impulso
                                será levado em conta.
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 3. Mensagem */}
            <div className="bg-dark-800 shadow-xs sub_feature_card rounded-2xl border border-dark-700/80 overflow-hidden">
              <h3
                onClick={() => setIsMessageOpen(!isMessageOpen)}
                className="text-h6 text-dark-100 flex justify-between items-start hover:text-dark-200 transition-all py-4 lg:py-6 px-6 cursor-pointer select-none"
              >
                <div className="flex flex-col gap-3">
                  <span className="text-lg font-semibold text-dark-100">
                    Mensagem<span className="text-rose-500 ml-1">*</span>
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowPreviewModal(true);
                    }}
                    className="relative flex overflow-hidden shrink-0 rounded-lg transition-all duration-200 items-center gap-2 bg-white bg-opacity-10 text-white hover:bg-opacity-20 active:bg-opacity-5 text-xs px-4 py-2 w-max cursor-pointer font-medium"
                  >
                    <Eye className="w-4 h-4 text-dark-300" />
                    <span>Pré-visualizar a mensagem incorporada do Sorteio</span>
                  </button>
                </div>
                <div className="flex items-center justify-between gap-4 text-dark-300">
                  <button className="pt-1">
                    {isMessageOpen ? (
                      <ChevronUp className="w-6 h-6 transition-all" />
                    ) : (
                      <ChevronDown className="w-6 h-6 transition-all" />
                    )}
                  </button>
                </div>
              </h3>

              {isMessageOpen && (
                <div className="text-base transition-all">
                  <div className="p-6 pt-0 border-t border-dark-700/80">

                    {/* Color of the stripe */}
                    <div className="mb-5">
                      <label className="text-sm font-medium text-dark-400 mb-2 flex items-start max-w-max justify-start">
                        Cor da listra
                      </label>
                      <DiscordColorPicker
                        color={stripeColor}
                        onChange={(c) => {
                          setStripeColor(c);
                          setHexInput(c.replace('#', ''));
                        }}
                        triggerType="swatch"
                      />
                    </div>

                    {/* Form Embed Container with Lateral Color Stripe */}
                    <div className="flex gap-3 sm:gap-4 pt-2 relative items-stretch">
                      {/* Barra lateral de cor (Embed Color Stripe) */}
                      <div className="relative flex flex-col shrink-0 items-center">
                        <DiscordColorPicker
                          color={stripeColor}
                          onChange={(c) => {
                            setStripeColor(c);
                            setHexInput(c.replace('#', ''));
                          }}
                          triggerType="wheel"
                        />
                      </div>

                      {/* Embed Form Inputs */}
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 min-w-0">
                      {/* Left side inputs */}
                      <div className="flex w-full flex-1 flex-col order-2 lg:order-none lg:col-span-8 min-w-0">
                        {/* Author row with image and URL */}
                        <div className="flex flex-col items-start relative mb-4">
                          <div className="flex gap-4 items-center w-full">
                            {/* Author avatar with tooltip hover effect */}
                            <div className="relative inline-block group">
                              <div className="relative z-[1]">
                                <label
                                  className="relative cursor-pointer transition-all overflow-hidden rounded-full border border-dashed border-dark-400 hover:border-brand-default block"
                                  style={{ width: '48px', height: '48px' }}
                                >
                                  {authorImage ? (
                                    <img
                                      src={authorImage}
                                      alt="Imagem do autor"
                                      className="w-full h-full object-cover"
                                    />
                                  ) : (
                                    <div className="absolute w-full h-full left-0 top-0 flex items-center justify-center">
                                      <svg
                                        width="32"
                                        height="32"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M3.353 8.95A7.511 7.511 0 018.95 3.353c2.006-.47 4.094-.47 6.1 0a7.511 7.511 0 015.597 5.597c.47 2.006.47 4.094 0 6.1a7.511 7.511 0 01-5.597 5.597c-2.006.47-4.094.47-6.1 0a7.511 7.511 0 01-5.597-5.597 13.354 13.354 0 010-6.1z"
                                          fill="rgba(154,161,181,0.16)"
                                        />
                                        <path
                                          d="M3.353 15.05l.73-.172-.73.172zm0-6.1l.73.172-.73-.172zm17.294 0l-.73.172.73-.172zm0 6.1l.73.17-.73-.17zm-5.597 5.597l-.172-.73.172.73zm-6.1 0l-.17.73.17-.73zm0-17.294l.172.73-.172-.73zm6.1 0l-.172.73.172-.73zM4.188 16.67a.75.75 0 001.06 1.06l-1.06-1.06zm2.269-1.208l.53.53-.53-.53zm5.885 0l-.53.53.53-.53zm2.443 1.034l.53.53-.53-.53zm1.366 3.835a.75.75 0 001.06-1.06l-1.06 1.06zm3.238-3.626l-.576.48.576-.48zm-.163.976a.75.75 0 101.152-.96l-1.152.96zM4.083 14.877a12.604 12.604 0 010-5.756l-1.46-.343a14.103 14.103 0 000 6.442l1.46-.343zm15.834-5.756a12.603 12.603 0 010 5.756l1.46.343a14.104 14.104 0 000-6.442l-1.46.343zm-5.039 10.795a12.603 12.603 0 01-5.756 0l-.343 1.46c2.119.497 4.323.497 6.442 0l-.343-1.46zM9.122 4.083a12.604 12.604 0 015.756 0l.343-1.46a14.103 14.103 0 00-6.442 0l.343 1.46zm0 15.834a6.761 6.761 0 01-5.039-5.039l-1.46.343a8.261 8.261 0 006.156 6.156l.343-1.46zm6.099 1.46a8.261 8.261 0 006.156-6.156l-1.46-.343a6.761 6.761 0 01-5.039 5.039l.343 1.46zm-.343-17.294a6.761 6.761 0 015.039 5.039l1.46-.343a8.261 8.261 0 00-6.156-6.156l-.343 1.46zM8.78 2.623a8.261 8.261 0 00-6.156 6.156l1.46.343a6.761 6.761 0 015.039-5.039l-.343-1.46zM5.25 17.732l1.738-1.74-1.06-1.06-1.74 1.739 1.061 1.06zm6.562-1.74l1.74 1.74 1.06-1.061-1.739-1.739-1.06 1.06zm2.8 1.74l.704-.705-1.06-1.06-.705.704 1.06 1.06zm-1.06 0l2.6 2.6 1.06-1.06-2.6-2.601-1.06 1.06zm5.262-.546l.413.495 1.152-.96-.413-.495-1.152.96zm-3.498-.159a2.371 2.371 0 013.498.159l1.152-.96a3.87 3.87 0 00-5.71-.26l1.06 1.061zm-8.328-1.034a3.411 3.411 0 014.824 0l1.061-1.06a4.911 4.911 0 00-6.945 0l1.06 1.06z"
                                          fill="#9B9D9F"
                                        />
                                        <rect
                                          x="13"
                                          y="7"
                                          width="4"
                                          height="4"
                                          rx="2"
                                          stroke="#9B9D9F"
                                          strokeWidth="1.5"
                                        />
                                      </svg>
                                    </div>
                                  )}
                                  <input
                                    type="file"
                                    accept="image/gif, image/jpeg, image/jpg, image/png"
                                    className="hidden"
                                    onChange={(e) => {
                                      const file = e.target.files?.[0];
                                      if (file) setAuthorImage(URL.createObjectURL(file));
                                    }}
                                  />
                                </label>
                              </div>
                              {/* Tooltip */}
                              <div
                                className="w-full transition-opacity z-40 duration-200 block lg:w-[300px] opacity-0 group-hover:opacity-100 pointer-events-none absolute pl-2"
                                style={{ left: '56px', top: '0px' }}
                              >
                                <div className="relative flex justify-start items-center" style={{ height: '48px' }}>
                                  <div className="border-solid border-r-8 border-y-transparent border-y-8 border-l-0 border-r-dark-default"></div>
                                  <div className="bg-dark-default p-4 rounded-lg text-dark-100 text-sm flex gap-2 items-center shadow-lg">
                                    <p className="text-sm lg:text-base font-semibold text-dark-100">
                                      Imagem do autor
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Author name input */}
                            <div className="relative w-full ml-2 max-w-[428px] group/author">
                              <label className="text-sm font-medium text-dark-400 mb-2 flex items-start justify-start">
                                Autor
                              </label>
                              <div className="relative bg-grey-700 rounded-lg border border-solid border-grey-700 focus-within:ring-[4px] focus-within:ring-blue-default/30 focus-within:border-blue-default transition duration-200 py-1.5 pl-4 pr-10 min-h-[48px] flex items-center">
                                <input
                                  type="text"
                                  placeholder="Nome do autor"
                                  value={authorName}
                                  onChange={(e) => setAuthorName(e.target.value)}
                                  className="w-full bg-transparent outline-none text-base text-dark-100 placeholder-dark-400"
                                />
                                <button
                                  type="button"
                                  onClick={() => setAuthorName((prev) => prev + ' 👑')}
                                  className="absolute right-3 p-1 text-dark-400 hover:text-white transition-transform hover:scale-110"
                                >
                                  <Smile className="w-5 h-5" />
                                </button>
                              </div>

                              {/* Author URL - only appears when hovering over component */}
                              <div className="absolute right-0 top-full z-20 w-[210px] sm:w-[230px] flex items-center bg-grey-700 rounded-b-lg rounded-tl-lg border border-dark-800/80 px-3 py-1.5 shadow-xl opacity-0 pointer-events-none group-hover/author:opacity-100 group-hover/author:pointer-events-auto focus-within:opacity-100 focus-within:pointer-events-auto transition-opacity duration-200">
                                <input
                                  placeholder="URL do Autor"
                                  maxLength={2000}
                                  type="url"
                                  value={authorUrl}
                                  onChange={(e) => setAuthorUrl(e.target.value)}
                                  className="bg-transparent outline-none w-full text-xs text-dark-100 placeholder-dark-400"
                                />
                                <button
                                  type="button"
                                  onClick={() => {
                                    if (authorUrl) window.open(authorUrl, '_blank', 'noopener,noreferrer');
                                  }}
                                  className="text-dark-400 hover:text-white shrink-0 ml-2"
                                  title="Abrir URL"
                                >
                                  <ExternalLink className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Title text & Title URL */}
                        <div className="relative w-full mt-4 group/title">
                          <label className="text-sm font-medium text-dark-400 mb-2 flex items-start justify-start">
                            Texto do título
                          </label>
                          <div className="relative bg-grey-700 rounded-lg border border-solid border-grey-700 focus-within:ring-[4px] focus-within:ring-blue-default/30 focus-within:border-blue-default transition duration-200 py-1.5 pl-4 pr-10 min-h-[48px] flex items-center">
                            <input
                              type="text"
                              placeholder="Texto do título"
                              value={titleText}
                              onChange={(e) => setTitleText(e.target.value)}
                              className="w-full bg-transparent outline-none text-base text-dark-100 placeholder-dark-400"
                            />
                            <button
                              type="button"
                              onClick={() => setTitleText((prev) => prev + ' 🎉')}
                              className="absolute right-3 p-1 text-dark-400 hover:text-white transition-transform hover:scale-110"
                            >
                              <Smile className="w-5 h-5" />
                            </button>
                          </div>

                          {/* Title URL - only appears when hovering over component */}
                          <div className="absolute right-0 top-full z-20 w-[210px] sm:w-[230px] flex items-center bg-grey-700 rounded-b-lg rounded-tl-lg border border-dark-800/80 px-3 py-1.5 shadow-xl opacity-0 pointer-events-none group-hover/title:opacity-100 group-hover/title:pointer-events-auto focus-within:opacity-100 focus-within:pointer-events-auto transition-opacity duration-200">
                            <input
                              placeholder="URL do Título"
                              maxLength={2000}
                              type="url"
                              value={titleUrl}
                              onChange={(e) => setTitleUrl(e.target.value)}
                              className="bg-transparent outline-none w-full text-xs text-dark-100 placeholder-dark-400"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                if (titleUrl) window.open(titleUrl, '_blank', 'noopener,noreferrer');
                              }}
                              className="text-dark-400 hover:text-white shrink-0 ml-2"
                              title="Abrir URL"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Message template / Modelo de mensagem */}
                        <div className="relative w-full mt-4">
                          <label className="text-sm font-medium text-dark-400 mb-2 flex items-start justify-start">
                            Modelo de mensagem
                          </label>
                          <div className="relative bg-grey-700 rounded-lg border border-solid border-grey-700 focus-within:ring-[4px] focus-within:ring-blue-default/30 focus-within:border-blue-default transition duration-200 py-4 min-h-[144px]">
                            <textarea
                              rows={5}
                              value={messageTemplate}
                              onChange={(e) => setMessageTemplate(e.target.value)}
                              placeholder="Escreva sua mensagem aqui..."
                              maxLength={2000}
                              className="w-full bg-transparent outline-none pl-4 pr-12 text-base leading-relaxed text-dark-100 placeholder-dark-400 resize-none"
                            />
                            <button
                              type="button"
                              onClick={() => setMessageTemplate((prev) => prev + ' 🎁')}
                              className="absolute right-4 top-4 p-1 text-dark-400 hover:text-white transition-transform hover:scale-110"
                            >
                              <Smile className="w-5 h-5" />
                            </button>
                            <p className="absolute bottom-[12px] right-[16px] text-grey-500 text-sm pointer-events-none">
                              {messageTemplate.length} / 2000
                            </p>
                          </div>
                        </div>

                        {/* Additional fields / Campos adicionais */}
                        <div className="w-full mt-4">
                          <div className="relative w-full">
                            <label className="text-sm font-medium text-dark-400 mb-2 flex items-start justify-start">
                              Campos adicionais
                            </label>
                            {/* Nome do campo */}
                            <div className="relative bg-grey-700 rounded-lg border border-solid border-grey-700 focus-within:ring-[4px] focus-within:ring-blue-default/30 focus-within:border-blue-default transition duration-200 py-1.5 pl-4 pr-10 min-h-[48px] flex items-center">
                              <input
                                type="text"
                                placeholder="Nome do campo"
                                value={customFieldName}
                                onChange={(e) => setCustomFieldName(e.target.value)}
                                className="w-full bg-transparent outline-none text-base text-dark-100 placeholder-dark-400"
                              />
                              <button
                                type="button"
                                onClick={() => setCustomFieldName((prev) => prev + ' 📌')}
                                className="absolute right-3 p-1 text-dark-400 hover:text-white transition-transform hover:scale-110"
                              >
                                <Smile className="w-5 h-5" />
                              </button>
                            </div>

                            {/* Descrição do campo */}
                            <div className="relative bg-grey-700 rounded-lg border border-solid border-grey-700 focus-within:ring-[4px] focus-within:ring-blue-default/30 focus-within:border-blue-default transition duration-200 py-1.5 pl-4 pr-10 min-h-[48px] flex items-center mt-3">
                              <input
                                type="text"
                                placeholder="Descrição do campo"
                                value={customFieldDesc}
                                onChange={(e) => setCustomFieldDesc(e.target.value)}
                                className="w-full bg-transparent outline-none text-base text-dark-100 placeholder-dark-400"
                              />
                              <button
                                type="button"
                                onClick={() => setCustomFieldDesc((prev) => prev + ' ✨')}
                                className="absolute right-3 p-1 text-dark-400 hover:text-white transition-transform hover:scale-110"
                              >
                                <Smile className="w-5 h-5" />
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Imagem (Banner do Embed) - Posicionado em cima do Rodapé com tooltip */}
                        <div className="pt-4 flex flex-col items-start relative">
                          <label className="text-sm font-medium text-dark-400 mb-2 block">
                            Imagem
                          </label>
                          <div className="relative inline-block group">
                            <div className="relative z-[1]">
                              <label
                                className="relative cursor-pointer transition-all overflow-hidden rounded-lg border border-dashed border-dark-400 hover:border-brand-default block bg-dark-900/90"
                                style={{ width: '184px', height: '184px' }}
                              >
                                {embedImage ? (
                                  <div className="relative w-full h-full group">
                                    <img
                                      src={embedImage}
                                      alt="Imagem"
                                      className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                      <ImageIcon className="w-6 h-6 text-white" />
                                    </div>
                                  </div>
                                ) : (
                                  <div className="absolute w-full h-full left-0 top-0 flex items-center justify-center">
                                    <svg
                                      width="32"
                                      height="32"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M3.353 8.95A7.511 7.511 0 018.95 3.353c2.006-.47 4.094-.47 6.1 0a7.511 7.511 0 015.597 5.597c.47 2.006.47 4.094 0 6.1a7.511 7.511 0 01-5.597 5.597c-2.006.47-4.094.47-6.1 0a7.511 7.511 0 01-5.597-5.597 13.354 13.354 0 010-6.1z"
                                        fill="rgba(154,161,181,0.16)"
                                      />
                                      <path
                                        d="M3.353 15.05l.73-.172-.73.172zm0-6.1l.73.172-.73-.172zm17.294 0l-.73.172.73-.172zm0 6.1l.73.17-.73-.17zm-5.597 5.597l-.172-.73.172.73zm-6.1 0l-.17.73.17-.73zm0-17.294l.172.73-.172-.73zm6.1 0l-.172.73.172-.73zM4.188 16.67a.75.75 0 001.06 1.06l-1.06-1.06zm2.269-1.208l.53.53-.53-.53zm5.885 0l-.53.53.53-.53zm2.443 1.034l.53.53-.53-.53zm1.366 3.835a.75.75 0 001.06-1.06l-1.06 1.06zm3.238-3.626l-.576.48.576-.48zm-.163.976a.75.75 0 101.152-.96l-1.152.96zM4.083 14.877a12.604 12.604 0 010-5.756l-1.46-.343a14.103 14.103 0 000 6.442l1.46-.343zm15.834-5.756a12.603 12.603 0 010 5.756l1.46.343a14.104 14.104 0 000-6.442l-1.46.343zm-5.039 10.795a12.603 12.603 0 01-5.756 0l-.343 1.46c2.119.497 4.323.497 6.442 0l-.343-1.46zM9.122 4.083a12.604 12.604 0 015.756 0l.343-1.46a14.103 14.103 0 00-6.442 0l.343 1.46zm0 15.834a6.761 6.761 0 01-5.039-5.039l-1.46.343a8.261 8.261 0 006.156 6.156l.343-1.46zm6.099 1.46a8.261 8.261 0 006.156-6.156l-1.46-.343a6.761 6.761 0 01-5.039 5.039l.343 1.46zm-.343-17.294a6.761 6.761 0 015.039 5.039l1.46-.343a8.261 8.261 0 00-6.156-6.156l-.343 1.46zM8.78 2.623a8.261 8.261 0 00-6.156 6.156l1.46.343a6.761 6.761 0 015.039-5.039l-.343-1.46zM5.25 17.732l1.738-1.74-1.06-1.06-1.74 1.739 1.061 1.06zm6.562-1.74l1.74 1.74 1.06-1.061-1.739-1.739-1.06 1.06zm2.8 1.74l.704-.705-1.06-1.06-.705.704 1.06 1.06zm-1.06 0l2.6 2.6 1.06-1.06-2.6-2.601-1.06 1.06zm5.262-.546l.413.495 1.152-.96-.413-.495-1.152.96zm-3.498-.159a2.371 2.371 0 013.498.159l1.152-.96a3.87 3.87 0 00-5.71-.26l1.06 1.061zm-8.328-1.034a3.411 3.411 0 014.824 0l1.061-1.06a4.911 4.911 0 00-6.945 0l1.06 1.06z"
                                        fill="#9B9D9F"
                                      />
                                      <rect
                                        x="13"
                                        y="7"
                                        width="4"
                                        height="4"
                                        rx="2"
                                        stroke="#9B9D9F"
                                        strokeWidth="1.5"
                                      />
                                    </svg>
                                  </div>
                                )}
                                <input
                                  type="file"
                                  accept="image/gif, image/jpeg, image/jpg, image/png"
                                  className="hidden"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) setEmbedImage(URL.createObjectURL(file));
                                  }}
                                />
                              </label>
                            </div>
                            {/* Tooltip */}
                            <div
                              className="w-full transition-opacity z-40 duration-200 block lg:w-[300px] opacity-0 group-hover:opacity-100 pointer-events-none absolute pl-2"
                              style={{ left: '192px', top: '0px' }}
                            >
                              <div className="relative flex justify-start items-center" style={{ height: '184px' }}>
                                <div className="border-solid border-r-8 border-y-transparent border-y-8 border-l-0 border-r-dark-default"></div>
                                <div className="bg-dark-default p-4 rounded-lg text-dark-100 text-sm flex gap-2 items-center shadow-lg">
                                  <p className="text-sm lg:text-base font-semibold text-dark-100">
                                    Imagem
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Footer row / Rodapé */}
                        <div className="pt-4 flex flex-col items-start relative">
                          <div className="flex gap-4 items-center w-full">
                            {/* Footer image upload with tooltip */}
                            <div className="relative inline-block group">
                              <div className="relative z-[1]">
                                <label
                                  className="relative cursor-pointer transition-all overflow-hidden rounded-full border border-dashed border-dark-400 hover:border-brand-default block"
                                  style={{ width: '48px', height: '48px' }}
                                >
                                  {footerImage ? (
                                    <img
                                      src={footerImage}
                                      alt="Imagem do rodapé"
                                      className="w-full h-full object-cover"
                                    />
                                  ) : (
                                    <div className="absolute w-full h-full left-0 top-0 flex items-center justify-center">
                                      <svg
                                        width="32"
                                        height="32"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M3.353 8.95A7.511 7.511 0 018.95 3.353c2.006-.47 4.094-.47 6.1 0a7.511 7.511 0 015.597 5.597c.47 2.006.47 4.094 0 6.1a7.511 7.511 0 01-5.597 5.597c-2.006.47-4.094.47-6.1 0a7.511 7.511 0 01-5.597-5.597 13.354 13.354 0 010-6.1z"
                                          fill="rgba(154,161,181,0.16)"
                                        />
                                        <path
                                          d="M3.353 15.05l.73-.172-.73.172zm0-6.1l.73.172-.73-.172zm17.294 0l-.73.172.73-.172zm0 6.1l.73.17-.73-.17zm-5.597 5.597l-.172-.73.172.73zm-6.1 0l-.17.73.17-.73zm0-17.294l.172.73-.172-.73zm6.1 0l-.172.73.172-.73zM4.188 16.67a.75.75 0 001.06 1.06l-1.06-1.06zm2.269-1.208l.53.53-.53-.53zm5.885 0l-.53.53.53-.53zm2.443 1.034l.53.53-.53-.53zm1.366 3.835a.75.75 0 001.06-1.06l-1.06 1.06zm3.238-3.626l-.576.48.576-.48zm-.163.976a.75.75 0 101.152-.96l-1.152.96zM4.083 14.877a12.604 12.604 0 010-5.756l-1.46-.343a14.103 14.103 0 000 6.442l1.46-.343zm15.834-5.756a12.603 12.603 0 01-5.756 0l-.343 1.46c2.119.497 4.323.497 6.442 0l-.343-1.46zM9.122 4.083a12.604 12.604 0 015.756 0l.343-1.46a14.103 14.103 0 00-6.442 0l.343 1.46zm0 15.834a6.761 6.761 0 01-5.039-5.039l-1.46.343a8.261 8.261 0 006.156 6.156l.343-1.46zm6.099 1.46a8.261 8.261 0 006.156-6.156l-1.46-.343a6.761 6.761 0 01-5.039 5.039l.343 1.46zm-.343-17.294a6.761 6.761 0 015.039 5.039l1.46-.343a8.261 8.261 0 00-6.156-6.156l-.343 1.46zM8.78 2.623a8.261 8.261 0 00-6.156 6.156l1.46.343a6.761 6.761 0 015.039-5.039l-.343-1.46zM5.25 17.732l1.738-1.74-1.06-1.06-1.74 1.739 1.061 1.06zm6.562-1.74l1.74 1.74 1.06-1.061-1.739-1.739-1.06 1.06zm2.8 1.74l.704-.705-1.06-1.06-.705.704 1.06 1.06zm-1.06 0l2.6 2.6 1.06-1.06-2.6-2.601-1.06 1.06zm5.262-.546l.413.495 1.152-.96-.413-.495-1.152.96zm-3.498-.159a2.371 2.371 0 013.498.159l1.152-.96a3.87 3.87 0 00-5.71-.26l1.06 1.061zm-8.328-1.034a3.411 3.411 0 014.824 0l1.061-1.06a4.911 4.911 0 00-6.945 0l1.06 1.06z"
                                          fill="#9B9D9F"
                                        />
                                        <rect
                                          x="13"
                                          y="7"
                                          width="4"
                                          height="4"
                                          rx="2"
                                          stroke="#9B9D9F"
                                          strokeWidth="1.5"
                                        />
                                      </svg>
                                    </div>
                                  )}
                                  <input
                                    type="file"
                                    accept="image/gif, image/jpeg, image/jpg, image/png"
                                    className="hidden"
                                    onChange={(e) => {
                                      const file = e.target.files?.[0];
                                      if (file) setFooterImage(URL.createObjectURL(file));
                                    }}
                                  />
                                </label>
                              </div>
                              {/* Tooltip */}
                              <div
                                className="w-full transition-opacity z-40 duration-200 block lg:w-[300px] opacity-0 group-hover:opacity-100 pointer-events-none absolute pl-2"
                                style={{ left: '56px', top: '0px' }}
                              >
                                <div className="relative flex justify-start items-center" style={{ height: '48px' }}>
                                  <div className="border-solid border-r-8 border-y-transparent border-y-8 border-l-0 border-r-dark-default"></div>
                                  <div className="bg-dark-default p-4 rounded-lg text-dark-100 text-sm flex gap-2 items-center shadow-lg">
                                    <p className="text-sm lg:text-base font-semibold text-dark-100">
                                      Imagem do rodapé
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Footer text */}
                            <div className="relative w-full ml-2 max-w-[428px]">
                              <label className="text-sm font-medium text-dark-400 mb-2 flex items-start justify-start">
                                Rodapé
                              </label>
                              <div className="relative bg-grey-700 rounded-lg border border-solid border-grey-700 focus-within:ring-[4px] focus-within:ring-blue-default/30 focus-within:border-blue-default transition duration-200 py-1.5 pl-4 pr-10 min-h-[48px] flex items-center">
                                <input
                                  type="text"
                                  placeholder="Texto do rodapé"
                                  value={footerText}
                                  onChange={(e) => setFooterText(e.target.value)}
                                  className="w-full bg-transparent outline-none text-base text-dark-100 placeholder-dark-400"
                                />
                                <button
                                  type="button"
                                  onClick={() => setFooterText((prev) => prev + ' 🚀')}
                                  className="absolute right-3 p-1 text-dark-400 hover:text-white transition-transform hover:scale-110"
                                >
                                  <Smile className="w-5 h-5" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right side: Capa (Thumbnail) with tooltip */}
                      <div className="lg:col-span-4 flex flex-col gap-5 pt-1">
                        <div>
                          <div className="relative inline-block group">
                            <div className="relative z-[1]">
                              <label
                                className="relative cursor-pointer transition-all overflow-hidden rounded-lg border border-dashed border-dark-400 hover:border-brand-default block bg-dark-900/90"
                                style={{ width: '139px', height: '139px' }}
                              >
                                {thumbnailImage ? (
                                  <div className="relative w-full h-full group">
                                    <img
                                      src={thumbnailImage}
                                      alt="Capa"
                                      className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                      <ImageIcon className="w-6 h-6 text-white" />
                                    </div>
                                  </div>
                                ) : (
                                  <div className="absolute w-full h-full left-0 top-0 flex items-center justify-center">
                                    <svg
                                      width="32"
                                      height="32"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M3.353 8.95A7.511 7.511 0 018.95 3.353c2.006-.47 4.094-.47 6.1 0a7.511 7.511 0 015.597 5.597c.47 2.006.47 4.094 0 6.1a7.511 7.511 0 01-5.597 5.597c-2.006.47-4.094.47-6.1 0a7.511 7.511 0 01-5.597-5.597 13.354 13.354 0 010-6.1z"
                                        fill="rgba(154,161,181,0.16)"
                                      />
                                      <path
                                        d="M3.353 15.05l.73-.172-.73.172zm0-6.1l.73.172-.73-.172zm17.294 0l-.73.172.73-.172zm0 6.1l.73.17-.73-.17zm-5.597 5.597l-.172-.73.172.73zm-6.1 0l-.17.73.17-.73zm0-17.294l.172.73-.172-.73zm6.1 0l-.172.73.172-.73zM4.188 16.67a.75.75 0 001.06 1.06l-1.06-1.06zm2.269-1.208l.53.53-.53-.53zm5.885 0l-.53.53.53-.53zm2.443 1.034l.53.53-.53-.53zm1.366 3.835a.75.75 0 001.06-1.06l-1.06 1.06zm3.238-3.626l-.576.48.576-.48zm-.163.976a.75.75 0 101.152-.96l-1.152.96zM4.083 14.877a12.604 12.604 0 010-5.756l-1.46-.343a14.103 14.103 0 000 6.442l1.46-.343zm15.834-5.756a12.603 12.603 0 010 5.756l1.46.343a14.104 14.104 0 000-6.442l-1.46.343zm-5.039 10.795a12.603 12.603 0 01-5.756 0l-.343 1.46c2.119.497 4.323.497 6.442 0l-.343-1.46zM9.122 4.083a12.604 12.604 0 015.756 0l.343-1.46a14.103 14.103 0 00-6.442 0l.343 1.46zm0 15.834a6.761 6.761 0 01-5.039-5.039l-1.46.343a8.261 8.261 0 006.156 6.156l.343-1.46zm6.099 1.46a8.261 8.261 0 006.156-6.156l-1.46-.343a6.761 6.761 0 01-5.039 5.039l.343 1.46zm-.343-17.294a6.761 6.761 0 015.039 5.039l1.46-.343a8.261 8.261 0 00-6.156-6.156l-.343 1.46zM8.78 2.623a8.261 8.261 0 00-6.156 6.156l1.46.343a6.761 6.761 0 015.039-5.039l-.343-1.46zM5.25 17.732l1.738-1.74-1.06-1.06-1.74 1.739 1.061 1.06zm6.562-1.74l1.74 1.74 1.06-1.061-1.739-1.739-1.06 1.06zm2.8 1.74l.704-.705-1.06-1.06-.705.704 1.06 1.06zm-1.06 0l2.6 2.6 1.06-1.06-2.6-2.601-1.06 1.06zm5.262-.546l.413.495 1.152-.96-.413-.495-1.152.96zm-3.498-.159a2.371 2.371 0 013.498.159l1.152-.96a3.87 3.87 0 00-5.71-.26l1.06 1.061zm-8.328-1.034a3.411 3.411 0 014.824 0l1.061-1.06a4.911 4.911 0 00-6.945 0l1.06 1.06z"
                                        fill="#9B9D9F"
                                      />
                                      <rect
                                        x="13"
                                        y="7"
                                        width="4"
                                        height="4"
                                        rx="2"
                                        stroke="#9B9D9F"
                                        strokeWidth="1.5"
                                      />
                                    </svg>
                                  </div>
                                )}
                                <input
                                  type="file"
                                  accept="image/gif, image/jpeg, image/jpg, image/png"
                                  className="hidden"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) setThumbnailImage(URL.createObjectURL(file));
                                  }}
                                />
                              </label>
                            </div>
                            {/* Tooltip */}
                            <div
                              className="w-full transition-opacity z-40 duration-200 block lg:w-[300px] opacity-0 group-hover:opacity-100 pointer-events-none absolute pl-2"
                              style={{ left: '147px', top: '0px' }}
                            >
                              <div className="relative flex justify-start items-center" style={{ height: '139px' }}>
                                <div className="border-solid border-r-8 border-y-transparent border-y-8 border-l-0 border-r-dark-default"></div>
                                <div className="bg-dark-default p-4 rounded-lg text-dark-100 text-sm flex gap-2 items-center shadow-lg">
                                  <p className="text-sm lg:text-base font-semibold text-dark-100">
                                    Capa
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 4. Outros pré-requisitos */}
            <div
              className="bg-dark-800 shadow-xs sub_feature_card rounded-2xl border border-dark-700/80 overflow-hidden"
              id="plugins.giveaways.requirements"
            >
              <h3
                onClick={() => setIsRequirementsOpen(!isRequirementsOpen)}
                className="text-h6 text-dark-100 flex justify-between items-center hover:text-dark-200 transition-all py-4 lg:py-6 px-6 cursor-pointer select-none"
              >
                <span className="text-lg font-semibold text-dark-100">
                  Outros pré-requisitos
                </span>
                <div className="text-dark-300">
                  {isRequirementsOpen ? (
                    <ChevronUp className="w-6 h-6 transition-all" />
                  ) : (
                    <ChevronDown className="w-6 h-6 transition-all" />
                  )}
                </div>
              </h3>

              {isRequirementsOpen && (
                <div className="text-base transition-all">
                  <div className="p-6 pt-0 border-t border-dark-700/80">
                    <div className="w-full grid grid-cols-1 gap-5 pt-4">
                      {/* End Date & Timezone */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-dark-400 mb-2 flex items-start max-w-max justify-start">
                            Data de término<span className="text-rose-500 ml-1">*</span>
                          </label>
                          <div className="relative w-full">
                            <div
                              onClick={() => setShowDatePicker(!showDatePicker)}
                              className="pr-4 overflow-hidden flex items-center justify-between bg-dark-900 rounded-lg text-dark-100 border border-solid border-dark-900 hover:border-dark-700 cursor-pointer min-h-[48px]"
                            >
                              <div className="flex items-center justify-start text-sm">
                                <div className="h-full flex items-center min-h-[48px] border-r border-solid border-dark-700 px-3 pl-4 mr-3 text-dark-400">
                                  <CalendarIcon className="w-4 h-4" />
                                </div>
                                {endDate || endTime ? (
                                  <>
                                    <span className="font-medium text-white">{endDate || 'DD/MM/AA'}</span>
                                    <div className="mx-2 text-dark-400">|</div>
                                    <span className="font-medium text-white">{endTime || 'HH:mm'}</span>
                                  </>
                                ) : (
                                  <span className="text-dark-400 font-normal">Selecione data e hora</span>
                                )}
                              </div>
                            </div>

                            {/* Dropdown Calendar Picker */}
                            {showDatePicker && (
                              <div className="min-w-[320px] rounded-xl border border-solid border-dark-700 p-4 w-full shadow-2xl absolute z-30 bg-dark-800 mt-2">
                                <header className="flex items-center justify-between pb-3 border-b border-dark-700">
                                  <button
                                    type="button"
                                    className="p-1.5 rounded-lg bg-dark-700 hover:bg-dark-600 text-white cursor-pointer"
                                  >
                                    <ChevronLeft className="w-4 h-4" />
                                  </button>
                                  <p className="text-dark-100 font-semibold text-sm">
                                    Setembro 2026
                                  </p>
                                  <button
                                    type="button"
                                    className="p-1.5 rounded-lg bg-dark-700 hover:bg-dark-600 text-white cursor-pointer"
                                  >
                                    <ChevronRight className="w-4 h-4" />
                                  </button>
                                </header>

                                <div className="mt-3">
                                  <div className="flex items-center bg-dark-900 rounded-lg border border-dark-700 px-3 py-2 text-xs">
                                    <Clock className="w-4 h-4 text-dark-400 mr-2" />
                                    <input
                                      type="text"
                                      value={endTime}
                                      onChange={(e) => setEndTime(e.target.value)}
                                      placeholder="HH:mm (24h)"
                                      className="bg-transparent outline-none text-white w-full"
                                    />
                                  </div>
                                </div>

                                <div className="mt-3 grid grid-cols-7 gap-1 text-center text-xs">
                                  <div className="text-dark-500 font-bold">Seg</div>
                                  <div className="text-dark-500 font-bold">Ter</div>
                                  <div className="text-dark-500 font-bold">Qua</div>
                                  <div className="text-dark-500 font-bold">Qui</div>
                                  <div className="text-dark-500 font-bold">Sex</div>
                                  <div className="text-dark-500 font-bold">Sáb</div>
                                  <div className="text-dark-500 font-bold">Dom</div>

                                  {[...Array(17)].map((_, i) => (
                                    <div
                                      key={i}
                                      onClick={() => {
                                        setEndDate(`${i + 1}/09/26`);
                                      }}
                                      className="p-1.5 rounded-md hover:bg-dark-700 cursor-pointer text-dark-300"
                                    >
                                      {i + 1}
                                    </div>
                                  ))}
                                  <div className="p-1.5 rounded-md bg-brand-default font-bold text-dark-900 cursor-pointer">
                                    18
                                  </div>
                                  {[...Array(12)].map((_, i) => (
                                    <div
                                      key={i + 19}
                                      onClick={() => {
                                        setEndDate(`${i + 19}/09/26`);
                                      }}
                                      className="p-1.5 rounded-md hover:bg-dark-700 cursor-pointer text-dark-300"
                                    >
                                      {i + 19}
                                    </div>
                                  ))}
                                </div>

                                <footer className="mt-4 pt-3 border-t border-dark-700 grid grid-cols-2 gap-3">
                                  <button
                                    type="button"
                                    onClick={() => setShowDatePicker(false)}
                                    className="py-1.5 rounded-lg bg-dark-700 hover:bg-dark-600 text-xs font-semibold text-white"
                                  >
                                    Cancelar
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => setShowDatePicker(false)}
                                    className="py-1.5 rounded-lg bg-brand-default hover:bg-white text-xs font-bold text-dark-900"
                                  >
                                    Aplicar
                                  </button>
                                </footer>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Fuso horário */}
                        <div>
                          <label className="text-sm font-medium text-dark-400 mb-2 flex items-start max-w-max justify-start">
                            Fuso horário
                          </label>
                          <div className="relative flex flex-col">
                            <div className="overflow-hidden flex items-center justify-start bg-dark-900/80 rounded-lg border border-solid border-dark-900 px-4 min-h-[48px]">
                              <input
                                type="text"
                                disabled
                                value="America/Cuiaba"
                                className="bg-transparent outline-none border-none text-sm text-dark-400 w-full cursor-not-allowed"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Total winners */}
                      <div>
                        <label className="text-sm font-medium text-dark-400 mb-2 flex items-start max-w-max justify-start">
                          Número de ganhadores<span className="text-rose-500 ml-1">*</span>
                        </label>
                        <div className="overflow-hidden flex items-center justify-start bg-dark-900 rounded-lg border border-solid transition-all duration-200 focus-within:ring-opacity-30 focus-within:ring-[4px] hover:border-brand-default focus-within:border-brand-default focus-within:ring-brand-default border-dark-900">
                          <div className="h-full flex items-center min-h-[48px] whitespace-nowrap pl-4 text-dark-400">
                            <Shield className="w-5 h-5" />
                          </div>
                          <input
                            type="number"
                            min={1}
                            max={50}
                            placeholder="Ex: 1"
                            value={winnersCount}
                            onChange={(e) => {
                              const val = e.target.value;
                              setWinnersCount(val === '' ? '' : Math.max(1, parseInt(val) || 1));
                            }}
                            className="bg-transparent outline-none border-none py-3 placeholder:text-dark-400 text-sm text-dark-100 w-full pl-3 pr-4"
                          />
                        </div>
                        <div className="flex items-center justify-start text-xs text-dark-400 mt-2">
                          <HelpCircle className="w-4 h-4 mr-1.5 text-dark-400 shrink-0" />
                          <span>Os vencedores são selecionados aleatoriamente entre os participantes</span>
                        </div>
                      </div>

                      {/* Authorized Roles */}
                      <div>
                        <p className="text-base font-semibold text-dark-100 mb-3">
                          Cargos autorizados a participar
                        </p>

                        <div className="space-y-2 mb-4">
                          <label
                            onClick={() => setRolePolicy('deny_except')}
                            className="flex items-center gap-2.5 cursor-pointer text-sm text-dark-200"
                          >
                            <input
                              type="radio"
                              name="role_policy"
                              checked={rolePolicy === 'deny_except'}
                              onChange={() => setRolePolicy('deny_except')}
                              className="accent-brand-default"
                            />
                            <span>Negar para todos os cargos exceto</span>
                          </label>

                          <label
                            onClick={() => setRolePolicy('allow_except')}
                            className="flex items-center gap-2.5 cursor-pointer text-sm text-dark-200"
                          >
                            <input
                              type="radio"
                              name="role_policy"
                              checked={rolePolicy === 'allow_except'}
                              onChange={() => setRolePolicy('allow_except')}
                              className="accent-brand-default"
                            />
                            <span>Permitir para todos os cargos exceto</span>
                          </label>
                        </div>

                        {/* Role Selector Dropdown */}
                        <div className="relative w-full">
                          <div
                            onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
                            className="rounded-lg bg-dark-900 min-h-[50px] flex items-center justify-start border border-solid border-dark-900 hover:border-dark-700 px-3 cursor-pointer"
                          >
                            <div className="flex items-center justify-between w-full">
                              <div className="flex items-center gap-2">
                                <Plus className="w-4 h-4 text-dark-400" />
                                <span
                                  className={`text-sm ${
                                    selectedRole ? 'text-white font-medium' : 'text-dark-400'
                                  }`}
                                >
                                  {selectedRole ? `@${selectedRole}` : 'Selecione um cargo'}
                                </span>
                              </div>
                              <ChevronDown
                                className={`w-4 h-4 text-dark-400 transition-transform ${
                                  isRoleDropdownOpen ? 'rotate-180' : ''
                                }`}
                              />
                            </div>
                          </div>

                          {isRoleDropdownOpen && (
                            <div className="min-w-[300px] absolute left-0 z-30 w-full rounded-xl bg-dark-900 border border-dark-700 max-h-[300px] overflow-y-auto shadow-2xl p-2 mt-1">
                              <ul>
                                <li
                                  onClick={() => {
                                    setSelectedRole('Todos os cargos');
                                    setIsRoleDropdownOpen(false);
                                  }}
                                  className="flex p-2 rounded-lg items-center text-sm font-medium text-dark-200 hover:bg-dark-800 transition-colors cursor-pointer"
                                >
                                  <Plus className="w-4 h-4 mr-2 text-dark-400" />
                                  <span>Adicionar todos os cargos</span>
                                </li>
                              </ul>

                              <ul className="border-t border-solid border-dark-700 pt-2 mt-2 space-y-1">
                                {roles.map((r, idx) => (
                                  <li
                                    key={idx}
                                    onClick={() => {
                                      setSelectedRole(r.name);
                                      setIsRoleDropdownOpen(false);
                                    }}
                                    className="p-2 rounded-lg transition-colors hover:bg-dark-800 text-sm text-dark-100 cursor-pointer flex items-center justify-between"
                                  >
                                    <div className="flex items-center gap-2">
                                      <span
                                        className="w-2.5 h-2.5 rounded-full"
                                        style={{ backgroundColor: r.color }}
                                      />
                                      <span style={{ color: r.color }}>{r.name}</span>
                                    </div>
                                    {selectedRole === r.name && (
                                      <Check className="w-4 h-4 text-brand-default" />
                                    )}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Monetization / Extra banner */}
                      <div className="mt-4">
                        <div className="rounded-2xl bg-gradient-to-r from-blue-900/60 to-indigo-900/60 border border-blue-700/50 p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                          <div className="space-y-2">
                            <h4 className="text-base font-bold text-white leading-snug">
                              Ganhe renda extra: Deixe seus membros se inscreverem em seu Servidor
                            </h4>
                            <p className="text-xs text-blue-200">
                              Monetize sorteios e sorteios exclusivos para apoiadores do Discord.
                            </p>
                            <button
                              type="button"
                              className="mt-2 bg-white text-dark-900 font-bold py-2 px-4 rounded-xl text-xs hover:bg-blue-50 transition-colors cursor-pointer shadow-sm"
                            >
                              Comece a ganhar dinheiro
                            </button>
                          </div>
                          <Sparkles className="w-12 h-12 text-blue-300 shrink-0 opacity-80" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

        {/* Right Sticky Preview Column (Visible on Desktop >= xl) */}
        <div className="hidden xl:block xl:col-span-5 2xl:col-span-4 sticky top-20 space-y-3">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-bold text-zinc-300 uppercase tracking-wider">
                Prévia ao Vivo no Discord
              </span>
            </div>
            <span className="text-[11px] text-zinc-400 font-mono">tempo real</span>
          </div>

          <div className="bg-[#313338] border border-dark-700/80 rounded-2xl p-5 shadow-2xl overflow-hidden">
            {renderDiscordPreview()}
          </div>
        </div>
      </div>

      {/* Modal: Preview of Embedded Giveaway Message */}
      {showPreviewModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#313338] border border-dark-700 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-fadeIn max-h-[90vh] flex flex-col">
            <div className="p-4 border-b border-dark-700/80 flex items-center justify-between bg-dark-900 shrink-0">
              <span className="text-xs font-bold text-dark-300 uppercase tracking-wider">
                Pré-visualização do Discord
              </span>
              <button
                onClick={() => setShowPreviewModal(false)}
                className="text-dark-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-6 overflow-y-auto">
              {renderDiscordPreview()}
            </div>

            <div className="p-4 bg-dark-900 border-t border-dark-700/80 flex justify-end shrink-0">
              <button
                type="button"
                onClick={() => setShowPreviewModal(false)}
                className="px-4 py-2 rounded-xl bg-dark-800 hover:bg-dark-700 text-white font-semibold text-xs transition-colors cursor-pointer"
              >
                Fechar Pré-visualização
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
