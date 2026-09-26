import React, { useState, useRef, useEffect } from 'react';
import {
  ChevronDown,
  ChevronUp,
  Plus,
  Minus,
  X,
  Check,
  Hash,
  Sparkles,
  Search,
  ExternalLink,
  Edit2,
  Info,
  Palette,
  Sliders,
  ShieldAlert,
  Image as ImageIcon,
  MessageSquare,
  CheckSquare,
  Square,
  Eye,
} from 'lucide-react';

import { DiscordColorPicker, DiscordSwitch } from './common';
import { SERVER_CHANNELS, SERVER_CATEGORIES, ROLES_LIST } from '../data/mockData';

interface StarboardConfigPageProps {
  initialName?: string;
  initialChannel?: string;
  initialEmoji?: string;
  initialMinReactions?: number;
  initialEmbedColor?: string;
  onBack: () => void;
  onSave: (data: any) => void;
}

export const StarboardConfigPage: React.FC<StarboardConfigPageProps> = ({
  initialName = 'New Starboard',
  initialChannel = '⭐・destaques',
  initialEmoji = '⭐',
  initialMinReactions = 3,
  initialEmbedColor = '#FFAC33',
  onBack,
  onSave,
}) => {
  // Starboard Name
  const [starboardName, setStarboardName] = useState(initialName);

  // Section collapse states
  const [channelSectionOpen, setChannelSectionOpen] = useState(true);
  const [reactionsSectionOpen, setReactionsSectionOpen] = useState(true);
  const [appearanceSectionOpen, setAppearanceSectionOpen] = useState(true);
  const [behaviorSectionOpen, setBehaviorSectionOpen] = useState(true);
  const [antiAbuseSectionOpen, setAntiAbuseSectionOpen] = useState(true);
  const [restrictionsSectionOpen, setRestrictionsSectionOpen] = useState(true);

  // Channel Selection
  const [selectedChannel, setSelectedChannel] = useState<string | null>(initialChannel);
  const [channelDropdownOpen, setChannelDropdownOpen] = useState(false);
  const [channelSearch, setChannelSearch] = useState('');
  const channelDropdownRef = useRef<HTMLDivElement>(null);

  // Reactions
  const [emojis, setEmojis] = useState<string[]>([initialEmoji]);
  const [reactionLimit, setReactionLimit] = useState(initialMinReactions);
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
  const [customEmojiInput, setCustomEmojiInput] = useState('');

  // Appearance controls (All fully configurable)
  const [embedColor, setEmbedColor] = useState(initialEmbedColor);
  const [botMessageFormat, setBotMessageFormat] = useState(
    '{starboard.first_emoji} {message.stars_count} | {channel.mention}'
  );
  const [showAttachments, setShowAttachments] = useState(true);
  const [showJumpButton, setShowJumpButton] = useState(true);
  const [showAuthorInfo, setShowAuthorInfo] = useState(true);
  const [showFooterInfo, setShowFooterInfo] = useState(true);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [embedTitle, setEmbedTitle] = useState('');
  const [embedFooter, setEmbedFooter] = useState('');
  const [customButtonLabel, setCustomButtonLabel] = useState('Seu botão');
  const [customButtonUrl, setCustomButtonUrl] = useState('');

  const handleSelectColor = (color: string) => {
    setEmbedColor(color);
  };

  // Behavior
  const [multipleReactionsPerUser, setMultipleReactionsPerUser] = useState(false);
  const [autoReactPosts, setAutoReactPosts] = useState(true);
  const [firstEmojiOnly, setFirstEmojiOnly] = useState(false);
  const [allowNsfw, setAllowNsfw] = useState(false);
  const [hideSpoilers, setHideSpoilers] = useState(false);

  // Anti-Abuse
  const [removeOnUnstar, setRemoveOnUnstar] = useState(true);
  const [repostCooldown, setRepostCooldown] = useState(true);
  const [removeOnDelete, setRemoveOnDelete] = useState(true);
  const [ignoreSelfStar, setIgnoreSelfStar] = useState(true);
  const [removeSelfReactions, setRemoveSelfReactions] = useState(true);
  const [blockBotReactions, setBlockBotReactions] = useState(true);
  const [removeBotReactions, setRemoveBotReactions] = useState(false);
  const [minMessageAge, setMinMessageAge] = useState('Sem mínimo');
  const [maxMessageAge, setMaxMessageAge] = useState('Sem máximo');
  const [minAgeDropdownOpen, setMinAgeDropdownOpen] = useState(false);
  const [maxAgeDropdownOpen, setMaxAgeDropdownOpen] = useState(false);

  // Restrictions: Roles
  const [roleRestrictionMode, setRoleRestrictionMode] = useState<'only' | 'except'>('except');
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [roleSearch, setRoleSearch] = useState('');
  const roleDropdownRef = useRef<HTMLDivElement>(null);

  // Restrictions: Channels
  const [channelRestrictionMode, setChannelRestrictionMode] = useState<'only' | 'except'>('except');
  const [selectedChannels, setSelectedChannels] = useState<string[]>([]);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [categorySearch, setCategorySearch] = useState('');
  const categoryDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        channelDropdownRef.current &&
        !channelDropdownRef.current.contains(event.target as Node)
      ) {
        setChannelDropdownOpen(false);
      }
      if (
        roleDropdownRef.current &&
        !roleDropdownRef.current.contains(event.target as Node)
      ) {
        setRoleDropdownOpen(false);
      }
      if (
        categoryDropdownRef.current &&
        !categoryDropdownRef.current.contains(event.target as Node)
      ) {
        setCategoryDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSave = () => {
    onSave({
      name: starboardName,
      channel: selectedChannel,
      emojis,
      minReactions: reactionLimit,
      embedColor,
      botMessageFormat,
      showAttachments,
      showJumpButton,
      showAuthorInfo,
      showFooterInfo,
      multipleReactionsPerUser,
      autoReactPosts,
      firstEmojiOnly,
      allowNsfw,
      hideSpoilers,
      removeOnUnstar,
      repostCooldown,
      removeOnDelete,
      ignoreSelfStar,
      removeSelfReactions,
      blockBotReactions,
      removeBotReactions,
      minMessageAge,
      maxMessageAge,
      roleRestrictionMode,
      selectedRoles,
      channelRestrictionMode,
      selectedChannels,
    });
  };

  const toggleEmoji = (em: string) => {
    if (emojis.includes(em)) {
      if (emojis.length > 1) {
        setEmojis(emojis.filter((e) => e !== em));
      }
    } else {
      setEmojis([...emojis, em]);
    }
  };

  const handleAddCustomEmoji = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = customEmojiInput.trim();
    if (trimmed && !emojis.includes(trimmed)) {
      setEmojis([...emojis, trimmed]);
      setCustomEmojiInput('');
      setEmojiPickerOpen(false);
    }
  };

  const toggleChannelSelection = (ch: string) => {
    setSelectedChannels((prev) =>
      prev.includes(ch) ? prev.filter((c) => c !== ch) : [...prev, ch]
    );
  };

  const toggleCategorySelection = (channels: string[]) => {
    const allSelected = channels.every((c) => selectedChannels.includes(c));
    if (allSelected) {
      setSelectedChannels((prev) => prev.filter((c) => !channels.includes(c)));
    } else {
      const merged = Array.from(new Set([...selectedChannels, ...channels]));
      setSelectedChannels(merged);
    }
  };

  const toggleRoleSelection = (role: string) => {
    setSelectedRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]
    );
  };

  const insertVariableIntoFormat = (variableTag: string) => {
    setBotMessageFormat((prev) => `${prev} ${variableTag}`);
  };

  const AVAILABLE_EMOJIS = ['⭐', '🌟', '✨', '🔥', '❤️', '🏆', '💎', '🎉', '👏', '🎯', '💯', '🚀'];

  const filteredChannels = SERVER_CHANNELS.filter((ch) =>
    ch.toLowerCase().includes(channelSearch.toLowerCase())
  );

  const filteredRoles = ROLES_LIST.filter((r) =>
    r.name.toLowerCase().includes(roleSearch.toLowerCase())
  );

  // Render dynamic bot message preview text replacing variables
  const renderBotMessagePreview = () => {
    return botMessageFormat
      .replace(/\{starboard\.first_emoji\}/g, emojis[0] || '⭐')
      .replace(/\{message\.stars_count\}/g, String(reactionLimit))
      .replace(/\{channel\.mention\}/g, '#chat-geral')
      .replace(/\{user\.name\}/g, 'Membro Da Comunidade')
      .replace(/\{message\.id\}/g, '1234567890');
  };

  return (
    <div
      className="flex flex-1 overflow-y-auto relative px-6 lg:px-10 py-0 lg:py-10 animate-fadeIn"
      id="dashboard__content"
    >
      <div className="min-h-full w-full max-w-[1540px] mx-auto">
        <div className="w-full min-h-full transition-all flex flex-col opacity-100">
          {/* Top Sticky Header */}
          <div
            className="transition-all duration-200 md:px-10 md:py-6 flex flex-col md:flex-row items-center justify-between bg-dark-700 sticky top-0 z-10 -mr-[24px] -ml-[24px] md:-mr-[40px] md:-ml-[40px] transform sm:-translate-y-[40px]"
            id="edit-item-header"
          >
            <div className="flex mb-6 sm:mb-0 items-center justify-between md:justify-start bg-dark-800 sm:bg-dark-700 w-full px-8 md:px-0 py-6 md:py-0">
              <svg
                onClick={onBack}
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="sc-eldPxv kAGEjM cursor-pointer mr-3"
                data-main="#9B9D9F"
              >
                <path
                  d="M14.5 17l-5-5 5-5"
                  stroke="#9B9D9F"
                  data-stroke="main"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="flex items-center justify-start">
                <div className="group rounded px-2 py-1 w-auto flex items-center justify-start max-w-[50vw] lg:max-w-[30vw] hover:bg-brand-hover focus-within:bg-brand-hover">
                  <div
                    contentEditable
                    suppressContentEditableWarning
                    id="item_header__name"
                    placeholder="New Starboard"
                    onBlur={(e) => setStarboardName(e.currentTarget.textContent?.trim() || 'New Starboard')}
                    className="plugin_header__contenteditable border-0 outline-none text-dark-100 text-h5 font-bold bg-transparent transition-all duration-200 rounded w-auto whitespace-nowrap overflow-hidden"
                    translate="no"
                  >
                    {starboardName}
                  </div>
                </div>
                <svg
                  onClick={() => {
                    const el = document.getElementById('item_header__name');
                    if (el) el.focus();
                  }}
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="sc-eldPxv dIglqQ cursor-pointer"
                  data-main="#9B9D9F"
                  data-secondary="rgba(154,161,181,0.16)"
                >
                  <path
                    d="M9.31 10.448l4.57-4.57a3 3 0 014.241 4.243l-4.57 4.57a15.501 15.501 0 01-7.2 4.077l-.884.22a.376.376 0 01-.455-.455l.22-.883a15.501 15.501 0 014.078-7.202z"
                    fill="rgba(154,161,181,0.16)"
                    data-fill="secondary"
                  />
                  <path
                    d="M17.25 10.992c-2.121.707-4.95-2.121-4.242-4.242m.871-.871l-4.57 4.57a15.501 15.501 0 00-4.077 7.2l-.22.884a.376.376 0 00.455.455l.883-.22a15.501 15.501 0 007.202-4.078l4.57-4.57a3 3 0 10-4.243-4.241z"
                    stroke="#9B9D9F"
                    data-stroke="main"
                    strokeWidth="1.5"
                  />
                </svg>
              </div>
              <div />
            </div>

            <div className="flex justify-center lg:grid gap-3 lg:grid-flow-col lg:auto-cols-max w-full md:w-max px-8 md:px-0 pb-8 md:pb-0 flex-wrap">
              <button
                type="button"
                onClick={onBack}
                className="relative flex overflow-hidden shrink-0 rounded-lg transition-all duration-200 items-center gap-1.5 bg-danger-default bg-opacity-[0.14] text-danger-default hover:bg-opacity-[0.25] active:bg-opacity-[0.08] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-opacity-[0.14] text-base px-4 py-2 cursor-pointer"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="sc-eldPxv fpIvEY inline-block mr-1.5"
                  data-main="#9B9D9F"
                  data-secondary="rgba(154,161,181,0.16)"
                >
                  <path
                    d="M5 7.033h14v5.143c0 1.575-.222 3.142-.658 4.654a5.627 5.627 0 01-4.46 3.999l-.158.026a10.344 10.344 0 01-3.448 0l-.158-.026a5.627 5.627 0 01-4.46-3.999A16.783 16.783 0 015 12.176V7.033z"
                    fill="rgba(154,161,181,0.16)"
                    data-fill="secondary"
                  />
                  <path
                    d="M3 6.283a.75.75 0 000 1.5v-1.5zm18 1.5a.75.75 0 000-1.5v1.5zm-16-.75v-.75h-.75v.75H5zm14 0h.75v-.75H19v.75zm-.658 9.797l.72.208-.72-.208zm-4.618 4.025l.125.74-.125-.74zm-3.448 0l.125-.74-.125.74zm-.158-.026l-.125.74.125-.74zm-4.46-3.999l-.72.208.72-.208zm8.224 3.999l-.125-.74.125.74zm-6.04-15.34l.681.315-.68-.315zm.976-1.308l-.5-.558.5.558zm1.46-.874l.26.703-.26-.703zm3.444 0l.261-.703-.26.703zm2.435 2.182l.681-.314-.68.314zM3 7.783h18v-1.5H3v1.5zm10.757 12.306l-.158.027.25 1.479.158-.027-.25-1.479zm-3.356.027l-.158-.027-.25 1.48.158.026.25-1.48zM18.25 7.033v5.143h1.5V7.033h-1.5zm-12.5 5.143V7.033h-1.5v5.143h1.5zm12.5 0c0 1.505-.212 3.002-.629 4.446l1.441.416c.456-1.58.688-3.217.688-4.862h-1.5zm-4.651 7.94a9.595 9.595 0 01-3.198 0l-.25 1.479c1.224.207 2.474.207 3.698 0l-.25-1.48zm-3.356-.027a4.877 4.877 0 01-3.864-3.467l-1.441.416a6.377 6.377 0 005.055 4.53l.25-1.479zM6.38 16.622a16.033 16.033 0 01-.629-4.446h-1.5c0 1.645.231 3.282.688 4.862l1.44-.416zm7.628 4.946a6.377 6.377 0 005.055-4.53l-1.44-.416a4.877 4.877 0 01-3.865 3.467l.25 1.48zM8.25 7.033c0-.42.092-.837.273-1.229l-1.361-.63a4.422 4.422 0 00-.412 1.859h1.5zm.273-1.229c.182-.393.45-.755.796-1.064L8.317 3.623c-.49.44-.884.966-1.155 1.552l1.361.63zM9.32 4.74c.345-.31.759-.559 1.22-.73l-.522-1.406c-.63.234-1.209.579-1.7 1.019L9.32 4.74zm1.22-.73c.461-.171.958-.26 1.461-.26v-1.5c-.679 0-1.352.12-1.983.354l.522 1.406zM12 3.75c.503 0 1 .089 1.461.26l.522-1.406A5.707 5.707 0 0012 2.25v1.5zm1.461.26c.461.171.875.42 1.22.73l1.002-1.117a5.317 5.317 0 00-1.7-1.02l-.522 1.407zm1.22.73c.345.309.614.671.796 1.064l1.361-.63a4.784 4.784 0 00-1.156-1.551l-1 1.117zm.796 1.064c.181.392.273.81.273 1.229h1.5c0-.64-.14-1.272-.412-1.858l-1.361.63zM5 7.783h14v-1.5H5v1.5z"
                    fill="#9B9D9F"
                    data-fill="main"
                  />
                  <path
                    d="M10 12v4m4-4v4"
                    stroke="#9B9D9F"
                    data-stroke="main"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="flex flex grow justify-center max-w-full">
                  <span className="transition-all duration-200 whitespace-nowrap text-ellipsis overflow-hidden block w-full shrink-0 text-center">
                    Deletar
                  </span>
                </div>
              </button>
              <button
                type="button"
                onClick={onBack}
                className="relative flex overflow-hidden shrink-0 rounded-lg transition-all duration-200 items-center gap-1.5 bg-white bg-opacity-10 text-white hover:bg-opacity-20 active:bg-opacity-5 active:text-opacity-60 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-opacity-10 text-base px-4 py-2 cursor-pointer"
              >
                <div className="flex flex grow justify-center max-w-full">
                  <span className="transition-all duration-200 whitespace-nowrap text-ellipsis overflow-hidden block w-full shrink-0 text-center">
                    Descartar
                  </span>
                </div>
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="relative flex overflow-hidden shrink-0 rounded-lg transition-all duration-200 items-center gap-1.5 bg-brand-default text-dark-100 hover:bg-brand-hover active:bg-brand-default active:bg-opacity-40 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-brand-default text-base px-4 py-2 cursor-pointer"
              >
                <div className="flex flex grow justify-center max-w-full">
                  <span className="transition-all duration-200 whitespace-nowrap text-ellipsis overflow-hidden block w-full shrink-0 text-center">
                    Salvar
                  </span>
                </div>
              </button>
            </div>
          </div>

          <div className="transform sm:-translate-y-[40px] space-y-4">
            {/* Info Banner */}
            <div className="flex items-start gap-2.5 p-3.5 rounded-xl text-xs border border-zinc-700/60 bg-dark-800 text-dark-200 mb-4 leading-relaxed">
              <Info className="w-4 h-4 text-brand-light flex-shrink-0 mt-0.5" />
              <span>
                Mensagens só podem ser promovidas a este starboard uma vez por minuto. Se o limite for atingido, a mensagem será promovida quando receber outra reação mais tarde.
              </span>
            </div>

            {/* CARD 1: Canal do Starboard */}
            <div
              className="bg-dark-800 shadow-xs sub_feature_card rounded-xl border border-zinc-800/80 mb-4 overflow-hidden"
              id="plugins.starboards.form.channel.title"
            >
              <h3
                onClick={() => setChannelSectionOpen(!channelSectionOpen)}
                className="text-white flex justify-between items-start hover:bg-zinc-800/30 transition-all py-4 lg:py-5 px-6 cursor-pointer select-none"
              >
                <div className="flex flex-col w-full pr-4 max-w-[760px]">
                  <div className="sub_feature_title flex items-center text-lg font-semibold text-white">
                    Canal do Starboard
                    <span className="text-rose-500 ml-1 font-bold">*</span>
                  </div>
                  <div className="mt-1 text-sm text-zinc-400">
                    Escolha o canal onde as mensagens destacadas serão publicadas
                  </div>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <button type="button" className="pt-1 text-zinc-400 hover:text-white">
                    {channelSectionOpen ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </h3>

              {channelSectionOpen && (
                <div className="text-base transition-all">
                  <div className="p-6 pt-0 border-t border-zinc-800/60 mt-1">
                    <div className="max-w-xl pt-4">
                      <label className="text-sm font-semibold text-zinc-300 mb-2 block">
                        Canal
                      </label>
                      <div id="16-channel_selector" className="relative w-full" ref={channelDropdownRef}>
                        <div
                          onClick={() => setChannelDropdownOpen(!channelDropdownOpen)}
                          className="rounded-lg cursor-pointer bg-dark-900 min-h-[50px] px-3.5 flex items-center justify-between border border-zinc-700 hover:border-zinc-600 transition-colors"
                        >
                          <div className="flex items-center gap-2 text-white">
                            {selectedChannel ? (
                              <div className="flex items-center gap-2">
                                <Hash className="w-4 h-4 text-zinc-400" />
                                <span className="text-sm font-medium">{selectedChannel}</span>
                              </div>
                            ) : (
                              <span className="text-zinc-400 text-sm">Selecione um canal</span>
                            )}
                          </div>
                          <ChevronDown
                            className={`w-4 h-4 text-zinc-400 transition-transform duration-200 ${
                              channelDropdownOpen ? 'rotate-180' : ''
                            }`}
                          />
                        </div>

                        {channelDropdownOpen && (
                          <div className="absolute left-0 top-full mt-1.5 z-30 w-full rounded-xl bg-dark-900 border border-zinc-700 shadow-2xl max-h-[340px] overflow-y-auto p-2 animate-fadeIn">
                            {/* Search bar */}
                            <div className="p-1 mb-2">
                              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-dark-800 border border-zinc-700/80">
                                <Search className="w-3.5 h-3.5 text-zinc-400" />
                                <input
                                  type="text"
                                  value={channelSearch}
                                  onChange={(e) => setChannelSearch(e.target.value)}
                                  placeholder="Pesquisar canal..."
                                  className="w-full bg-transparent text-white text-xs outline-none placeholder:text-zinc-500"
                                  onClick={(e) => e.stopPropagation()}
                                />
                                {channelSearch && (
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setChannelSearch('');
                                    }}
                                    className="text-zinc-400 hover:text-white"
                                  >
                                    <X className="w-3.5 h-3.5" />
                                  </button>
                                )}
                              </div>
                            </div>

                            <ul className="border-b border-zinc-800 pb-2 mb-2">
                              <p className="uppercase text-zinc-400 font-bold text-xs px-2 mb-1">
                                Opções
                              </p>
                              <li
                                onClick={() => {
                                  setSelectedChannel('⭐・starboard-auto');
                                  setChannelDropdownOpen(false);
                                }}
                                className="flex p-2.5 rounded-lg items-center text-brand-light text-sm font-medium hover:bg-zinc-800 cursor-pointer transition-colors"
                              >
                                <Plus className="w-4 h-4 mr-2" />
                                Crie um canal de starboard para mim
                              </li>
                            </ul>

                            <div>
                              <p className="uppercase text-zinc-400 font-bold text-xs px-2 mb-1">
                                Canais ({filteredChannels.length})
                              </p>
                              <div className="space-y-1">
                                {filteredChannels.map((ch) => (
                                  <div
                                    key={ch}
                                    onClick={() => {
                                      setSelectedChannel(ch);
                                      setChannelDropdownOpen(false);
                                    }}
                                    className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors ${
                                      selectedChannel === ch
                                        ? 'bg-zinc-800 text-white font-semibold'
                                        : 'text-zinc-300 hover:bg-zinc-800/60'
                                    }`}
                                  >
                                    <div className="flex items-center gap-2 text-sm">
                                      <Hash className="w-4 h-4 text-zinc-400" />
                                      <span>{ch}</span>
                                    </div>
                                    {selectedChannel === ch && (
                                      <Check className="w-4 h-4 text-brand-default" />
                                    )}
                                  </div>
                                ))}
                                {filteredChannels.length === 0 && (
                                  <p className="text-xs text-zinc-500 p-2 text-center">
                                    Nenhum canal encontrado.
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* CARD 2: Reactions */}
            <div
              className="bg-dark-800 shadow-xs sub_feature_card rounded-xl border border-zinc-800/80 mb-4 overflow-hidden"
              id="plugins.starboards.form.reactions.title"
            >
              <h3
                onClick={() => setReactionsSectionOpen(!reactionsSectionOpen)}
                className="text-white flex justify-between items-start hover:bg-zinc-800/30 transition-all py-4 lg:py-5 px-6 cursor-pointer select-none"
              >
                <div className="flex flex-col w-full pr-4 max-w-[760px]">
                  <div className="sub_feature_title flex items-center text-lg font-semibold text-white">
                    Reactions
                  </div>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <button type="button" className="pt-1 text-zinc-400 hover:text-white">
                    {reactionsSectionOpen ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </h3>

              {reactionsSectionOpen && (
                <div className="text-base transition-all">
                  <div className="p-6 pt-0 border-t border-zinc-800/60 mt-1">
                    <div className="flex flex-col gap-6 pt-4">
                      {/* Emojis selector */}
                      <div className="flex flex-col gap-2">
                        <div className="flex flex-col gap-0.5">
                          <span className="text-base font-semibold text-white">Emojis</span>
                          <span className="text-sm text-zinc-400">
                            Qualquer um desses emojis contará no limite. Deixe em branco para aceitar todos os emojis.
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 pt-1">
                          {emojis.map((em) => (
                            <div
                              key={em}
                              className="bg-dark-900 border h-[42px] border-zinc-700 px-3.5 rounded-xl flex items-center justify-center gap-2 group relative shadow"
                            >
                              <span className="text-xl">{em}</span>
                              {emojis.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => toggleEmoji(em)}
                                  className="w-4 h-4 rounded-full bg-zinc-700 hover:bg-rose-500 text-white flex items-center justify-center transition-colors cursor-pointer text-[10px]"
                                  title="Remover emoji"
                                >
                                  ×
                                </button>
                              )}
                            </div>
                          ))}

                          <div className="relative">
                            <button
                              type="button"
                              onClick={() => setEmojiPickerOpen(!emojiPickerOpen)}
                              className="bg-dark-900 border h-[42px] border-zinc-700 px-4 rounded-xl hover:border-brand-default cursor-pointer hover:bg-zinc-800 flex items-center justify-center text-zinc-300 font-bold transition-all text-lg"
                              title="Adicionar emoji"
                            >
                              +
                            </button>

                            {emojiPickerOpen && (
                              <div className="absolute left-0 top-full mt-2 z-30 p-3 bg-dark-900 border border-zinc-700 rounded-xl shadow-2xl flex flex-col gap-2.5 animate-fadeIn min-w-[240px]">
                                <div className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                                  Escolha um emoji
                                </div>
                                <div className="grid grid-cols-6 gap-1.5">
                                  {AVAILABLE_EMOJIS.map((em) => (
                                    <button
                                      key={em}
                                      type="button"
                                      onClick={() => {
                                        toggleEmoji(em);
                                        setEmojiPickerOpen(false);
                                      }}
                                      className={`w-8 h-8 rounded-lg flex items-center justify-center text-lg transition-transform hover:scale-110 cursor-pointer ${
                                        emojis.includes(em)
                                          ? 'bg-brand-default/20 border border-brand-default text-white'
                                          : 'hover:bg-zinc-800'
                                      }`}
                                    >
                                      {em}
                                    </button>
                                  ))}
                                </div>

                                <form onSubmit={handleAddCustomEmoji} className="pt-2 border-t border-zinc-800 flex items-center gap-1.5">
                                  <input
                                    type="text"
                                    value={customEmojiInput}
                                    onChange={(e) => setCustomEmojiInput(e.target.value)}
                                    placeholder="Outro emoji..."
                                    className="px-2.5 py-1.5 rounded-lg bg-dark-800 border border-zinc-700 text-xs text-white outline-none w-full"
                                  />
                                  <button
                                    type="submit"
                                    className="px-2.5 py-1.5 bg-brand-default hover:bg-brand-hover text-dark-900 text-xs font-bold rounded-lg cursor-pointer shrink-0"
                                  >
                                    Adicionar
                                  </button>
                                </form>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Limite de Reação */}
                      <div className="flex flex-col gap-2">
                        <div className="flex flex-col gap-0.5">
                          <span className="text-base font-semibold text-white">
                            Limite de Reação
                          </span>
                          <span className="text-sm text-zinc-400">
                            Número de reações necessárias para publicar uma mensagem no starboard.
                          </span>
                        </div>

                        <div className="flex items-center gap-2 pt-1">
                          <button
                            type="button"
                            onClick={() => setReactionLimit((prev) => Math.max(1, prev - 1))}
                            className="w-10 h-10 flex items-center justify-center rounded-xl bg-dark-900 border border-zinc-700 hover:bg-zinc-800 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                          >
                            <Minus className="w-4 h-4" />
                          </button>

                          <div className="w-20">
                            <input
                              type="number"
                              min="1"
                              max="50"
                              value={reactionLimit}
                              onChange={(e) =>
                                setReactionLimit(Math.max(1, parseInt(e.target.value) || 1))
                              }
                              className="w-full bg-dark-900 border border-zinc-700 rounded-xl py-2 px-3 text-center text-white font-bold text-base outline-none focus:border-brand-default"
                            />
                          </div>

                          <button
                            type="button"
                            onClick={() => setReactionLimit((prev) => Math.min(50, prev + 1))}
                            className="w-10 h-10 flex items-center justify-center rounded-xl bg-dark-900 border border-zinc-700 hover:bg-zinc-800 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* CARD 3: Aparência (Restaurado com o Layout Exato do Dashboard) */}
            <div
              className="bg-dark-800 shadow-xs sub_feature_card rounded-lg mb-4"
              id="plugins.starboards.form.appearance.title"
            >
              <h3
                onClick={() => setAppearanceSectionOpen(!appearanceSectionOpen)}
                className="text-h6 text-dark-100 flex justify-between items-start hover:text-dark-200 transition-all py-4 lg:py-6 px-6 cursor-pointer select-none"
              >
                <div className="flex flex-col w-full pr-4 max-w-[760px]">
                  <div className="sub_feature_title flex items-center text-lg font-semibold">
                    Aparência
                  </div>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <button type="button" className="pt-1 text-dark-300 hover:text-white">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className={`cursor-pointer transition-all ${!appearanceSectionOpen ? 'rotate-180' : ''}`}
                    >
                      <path
                        d="M7 14.5l5-5 5 5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </h3>

              {appearanceSectionOpen && (
                <div className="text-base transition-all">
                  <div className="p-6 pt-0">
                    <div className="grid w-full border-t border-solid border-dark-700 pt-4"></div>
                    <div className="max-w-[600px] font-gg-sans">
                      {/* Bot Header Line */}
                      <div className="flex items-center mb-1">
                        <div className="w-8 min-w-[2rem] mr-3 flex-shrink-0">
                          <img
                            src="https://cdn.discordapp.com/embed/avatars/0.png"
                            alt="vixestudio"
                            className="w-8 h-8 rounded-full"
                          />
                        </div>
                        <div className="flex items-center justify-start">
                          <span className="text-dark-100 font-bold text-xs">vixestudio</span>
                          <span className="rounded bg-discord-default text-dark-100 uppercase text-[9px] px-1 flex items-center ml-2 font-semibold justify-center leading-[13px]">
                            app
                          </span>
                          <p className="text-[9px] text-dark-300 ml-2">Hoje às 08:45</p>
                        </div>
                      </div>

                      <div className="group relative">
                        {/* Top Slate.js message box */}
                        <div className="mb-2 ml-11">
                          <div className="relative w-full">
                            <div>
                              <div
                                role="textbox"
                                aria-multiline="true"
                                className="outline-none bg-dark-900 rounded-lg pl-3 pr-10 lg:pr-10 py-2.5 text-base leading-relaxed text-dark-100 relative whitespace-pre-wrap overflow-wrap-break-word min-h-[44px] flex items-center flex-wrap gap-1"
                                data-slate-editor="true"
                                data-slate-node="value"
                                contentEditable={false}
                              >
                                <span className="font-semibold bg-grey-600 rounded-md px-1.5 py-0.5 mx-0.5 text-sm cursor-pointer hover:bg-grey-500 inline-block text-dark-100">
                                  {'{starboard.first_emoji}'}
                                </span>
                                <span className="text-dark-100">&nbsp;</span>
                                <span className="font-semibold bg-grey-600 rounded-md px-1.5 py-0.5 mx-0.5 text-sm cursor-pointer hover:bg-grey-500 inline-block text-dark-100">
                                  {'{message.stars_count}'}
                                </span>
                                <span className="text-dark-100">&nbsp;&nbsp;|&nbsp;&nbsp;</span>
                                <span className="font-semibold bg-grey-600 rounded-md px-1.5 py-0.5 mx-0.5 text-sm cursor-pointer hover:bg-grey-500 inline-block text-dark-100">
                                  {'{channel.mention}'}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Embed row + Left controls */}
                        <div className="flex items-start justify-start">
                          {/* Left icon bar */}
                          <div className="w-8 min-w-[2rem] mr-3 flex-shrink-0 relative z-20">
                            {/* Reusable Discord Color Picker */}
                            <div className="relative">
                              <DiscordColorPicker
                                color={embedColor}
                                onChange={handleSelectColor}
                                triggerType="wheel"
                              />
                            </div>

                            {/* Preview Eye Button */}
                            <div className="mt-1.5">
                              <div className="relative inline-block">
                                <div className="relative z-[1]">
                                  <button
                                    type="button"
                                    onClick={() => setShowPreviewModal(true)}
                                    className="relative flex overflow-hidden shrink-0 rounded-lg transition-all duration-200 items-center gap-1.5 bg-brand-default text-dark-100 hover:bg-brand-hover active:bg-brand-default active:bg-opacity-40 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-brand-default !bg-dark-900 !bg-opacity-100 hover:!bg-dark-default hover:!bg-opacity-100 text-sm p-1.5 cursor-pointer"
                                    title="Pré-visualizar no Discord"
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
                                        d="M3.907 8.651c3.63-6.201 12.555-6.201 16.186 0a6.633 6.633 0 010 6.698c-3.63 6.201-12.555 6.201-16.186 0a6.633 6.633 0 010-6.698z"
                                        fill="rgba(154,161,181,0.16)"
                                      />
                                      <path
                                        d="M3.907 8.651l-.647-.379.647.38zm16.186 0l.647-.379-.647.38zm0 6.698l-.648-.38.648.38zm-16.186 0l.648-.38-.648.38zm.648-6.319c3.34-5.707 11.55-5.707 14.89 0l1.295-.758c-3.92-6.696-13.56-6.696-17.48 0l1.295.758zm14.89 0a5.883 5.883 0 010 5.94l1.295.757a7.383 7.383 0 000-7.455l-1.295.758zm0 5.94c-3.34 5.707-11.55 5.707-14.89 0l-1.295.757c3.92 6.697 13.56 6.697 17.48 0l-1.295-.757zm-14.89 0a5.883 5.883 0 010-5.94L3.26 8.272a7.383 7.383 0 000 7.455l1.295-.757zm10.252-2.91c0 1.593-1.268 2.863-2.808 2.863v1.5c2.39 0 4.308-1.963 4.308-4.362h-1.5zm-2.808 2.863c-1.539 0-2.806-1.27-2.806-2.862h-1.5c0 2.398 1.917 4.362 4.306 4.362v-1.5zm-2.806-2.862c0-1.594 1.268-2.864 2.806-2.864v-1.5c-2.39 0-4.306 1.964-4.306 4.364h1.5zM12 9.197c1.54 0 2.808 1.27 2.808 2.864h1.5c0-2.4-1.918-4.364-4.308-4.364v1.5z"
                                        fill="#9B9D9F"
                                      />
                                    </svg>
                                  </button>
                                </div>
                              </div>
                            </div>

                            {/* Reset Button (Mobile) */}
                            <div className="mt-1.5 lg:hidden">
                              <div className="relative inline-block">
                                <div className="relative z-[1]">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setEmbedColor('#FFAC33');
                                      setEmbedTitle('');
                                      setEmbedFooter('');
                                    }}
                                    className="relative flex overflow-hidden shrink-0 rounded-lg transition-all duration-200 items-center gap-1.5 bg-white bg-opacity-10 text-white hover:bg-opacity-20 active:bg-opacity-5 text-sm p-1.5 cursor-pointer"
                                    title="Restaurar padrão"
                                  >
                                    <svg
                                      width="20"
                                      height="20"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="sc-eldPxv kIKVos inline-block"
                                    >
                                      <circle cx="12" cy="12" r="9" fill="rgba(154,161,181,0.16)" fillOpacity="0.16" />
                                      <path
                                        d="M3 12.152C3 17.04 7.03 21 12 21s9-3.961 9-8.848c0-4.886-4-8.847-9-8.847-6 0-9 4.915-9 4.915m0 0V3m0 5.22h4.655"
                                        stroke="#9B9D9F"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Embed container with colored left-border */}
                          <div className="flex-1 min-w-0 relative">
                            <div
                              className="pl-[3px] rounded-l-md rounded-r-lg transition-colors"
                              style={{ backgroundColor: embedColor }}
                            >
                              <div className="bg-dark-900 py-4 px-3 rounded-r-md">
                                <div className="flex gap-4">
                                  <div className="flex-1 min-w-0">
                                    {/* Author row */}
                                    <div className="flex items-center justify-between w-full mb-1.5">
                                      <div className="flex items-center justify-start flex-1">
                                        <div className="relative flex items-center">
                                          <div className="w-6 h-6 rounded-full flex items-center justify-center cursor-pointer overflow-hidden border border-dashed border-dark-400 hover:border-brand-default">
                                            <svg
                                              width="16"
                                              height="16"
                                              viewBox="0 0 24 24"
                                              fill="none"
                                              xmlns="http://www.w3.org/2000/svg"
                                              className="sc-eldPxv bbhNfM"
                                            >
                                              <path
                                                d="M5 19.111c0-2.413 1.697-4.468 4.004-4.848l.208-.035a17.134 17.134 0 015.576 0l.208.035c2.307.38 4.004 2.435 4.004 4.848C19 20.154 18.181 21 17.172 21H6.828C5.818 21 5 20.154 5 19.111zM16.083 6.938c0 2.174-1.828 3.937-4.083 3.937S7.917 9.112 7.917 6.937C7.917 4.764 9.745 3 12 3s4.083 1.763 4.083 3.938z"
                                                fill="rgba(154,161,181,0.16)"
                                              />
                                              <path
                                                d="M5 19.111c0-2.413 1.697-4.468 4.004-4.848l.208-.035a17.134 17.134 0 015.576 0l.208.035c2.307.38 4.004 2.435 4.004 4.848C19 20.154 18.181 21 17.172 21H6.828C5.818 21 5 20.154 5 19.111zM16.083 6.938c0 2.174-1.828 3.937-4.083 3.937S7.917 9.112 7.917 6.937C7.917 4.764 9.745 3 12 3s4.083 1.763 4.083 3.938z"
                                                stroke="#9B9D9F"
                                                strokeWidth="1.5"
                                              />
                                            </svg>
                                          </div>
                                        </div>
                                        <div className="ml-2 flex-1 flex items-center">
                                          <div className="relative w-full flex-1">
                                            <div
                                              role="textbox"
                                              aria-multiline="true"
                                              className="outline-none text-dark-100 !min-h-max embed-component__contenteditable text-sm font-semibold min-w-[105px] pl-1 pr-6 lg:pr-10"
                                              data-slate-editor="true"
                                            >
                                              <span className="font-semibold bg-grey-600 rounded-md px-1.5 py-0.5 mx-0.5 text-xs cursor-pointer hover:bg-grey-500 inline-block text-dark-100">
                                                {'{user.name}'}
                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                    {/* Title line */}
                                    <div className="mb-1.5">
                                      <div className="flex items-center justify-between w-full">
                                        <div className="flex-1">
                                          <div className="relative w-full">
                                            <input
                                              type="text"
                                              placeholder="Título"
                                              value={embedTitle}
                                              onChange={(e) => setEmbedTitle(e.target.value)}
                                              className="w-full bg-transparent outline-none text-dark-100 placeholder:text-dark-400 text-sm font-semibold pl-1"
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                    {/* Description with {message.text} pill */}
                                    <div className="relative w-full">
                                      <div className="outline-none text-dark-100 text-sm text-opacity-80 !min-h-max embed-component__contenteditable leading-[24px] min-w-[105px] pl-1 pr-6 lg:pr-10 min-h-[72px]">
                                        <span className="font-semibold bg-grey-600 rounded-md px-1.5 py-0.5 mx-0.5 text-xs cursor-pointer hover:bg-grey-500 inline-block text-dark-100">
                                          {'{message.text}'}
                                        </span>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Thumbnail placeholder */}
                                  <div className="relative flex-shrink-0 self-start">
                                    <div
                                      className="w-16 h-16 rounded flex items-center justify-center cursor-pointer overflow-hidden border border-dashed border-dark-400 hover:border-brand-default transition-colors"
                                      title="Adicionar miniatura"
                                    >
                                      <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M2 8c1.5-3 3.5-4.5 6-4.5s4.5 1.5 6 4.5c-1.5 3-3.5 4.5-6 4.5S3.5 11 2 8z" stroke="#72767d" strokeWidth="1.5" fill="none" />
                                        <circle cx="8" cy="8" r="2" stroke="#72767d" strokeWidth="1.5" fill="none" />
                                        <line x1="3" y1="13" x2="13" y2="3" stroke="#72767d" strokeWidth="1.5" strokeLinecap="round" />
                                      </svg>
                                    </div>
                                  </div>
                                </div>

                                {/* Fields line */}
                                <div className="mt-3">
                                  <div className="flex flex-wrap"></div>
                                  <p className="text-brand-default text-sm font-medium hover:text-brand-hover cursor-pointer flex items-center justify-start gap-1 mt-2 transition-colors">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="sc-eldPxv jcVfsI w-4">
                                      <path d="M6 12h12m-6-6v12" stroke="#9B9D9F" strokeWidth="1.5" strokeLinecap="round" />
                                    </svg>
                                    Adicionar novo campo
                                  </p>
                                </div>

                                {/* Image placeholder */}
                                <div className="relative mt-2">
                                  <div
                                    className="w-full h-[140px] rounded-lg flex items-center justify-center cursor-pointer overflow-hidden border border-dashed border-dark-400 hover:border-brand-default transition-colors"
                                    title="Adicionar imagem"
                                  >
                                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="sc-eldPxv ckaIyA">
                                      <path d="M3.353 8.95A7.511 7.511 0 018.95 3.353c2.006-.47 4.094-.47 6.1 0a7.511 7.511 0 015.597 5.597c.47 2.006.47 4.094 0 6.1a7.511 7.511 0 01-5.597 5.597c-2.006.47-4.094.47-6.1 0a7.511 7.511 0 01-5.597-5.597 13.354 13.354 0 010-6.1z" fill="rgba(154,161,181,0.16)" />
                                      <path d="M5.25 17.732l1.738-1.74-1.06-1.06-1.74 1.739 1.061 1.06zm6.562-1.74l1.74 1.74 1.06-1.061-1.739-1.739-1.06 1.06zm2.8 1.74l.704-.705-1.06-1.06-.705.704 1.06 1.06zm-1.06 0l2.6 2.6 1.06-1.06-2.6-2.601-1.06 1.06zm5.262-.546l.413.495 1.152-.96-.413-.495-1.152.96zm-3.498-.159a2.371 2.371 0 013.498.159l1.152-.96a3.87 3.87 0 00-5.71-.26l1.06 1.061zm-8.328-1.034a3.411 3.411 0 014.824 0l1.061-1.06a4.911 4.911 0 00-6.945 0l1.06 1.06z" fill="#9B9D9F" />
                                      <rect x="13" y="7" width="4" height="4" rx="2" stroke="#9B9D9F" strokeWidth="1.5" />
                                    </svg>
                                  </div>
                                </div>

                                {/* Footer row */}
                                <div className="text-dark-300 mt-2 flex items-start gap-2">
                                  <div className="mt-[5px]">
                                    <div className="relative">
                                      <div className="w-5 h-5 rounded-full flex items-center justify-center cursor-pointer overflow-hidden border border-dashed border-dark-400 hover:border-brand-default">
                                        <svg width="10" height="10" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M2 8c1.5-3 3.5-4.5 6-4.5s4.5 1.5 6 4.5c-1.5 3-3.5 4.5-6 4.5S3.5 11 2 8z" stroke="#72767d" strokeWidth="1.5" fill="none" />
                                          <circle cx="8" cy="8" r="2" stroke="#72767d" strokeWidth="1.5" fill="none" />
                                          <line x1="3" y1="13" x2="13" y2="3" stroke="#72767d" strokeWidth="1.5" strokeLinecap="round" />
                                        </svg>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="relative w-full flex-1">
                                    <input
                                      type="text"
                                      placeholder="Rodapé"
                                      value={embedFooter}
                                      onChange={(e) => setEmbedFooter(e.target.value)}
                                      className="w-full bg-transparent outline-none text-dark-100 placeholder:text-dark-400 text-sm text-opacity-80 leading-[24px] pl-1"
                                    />
                                  </div>
                                  <div className="mt-[5px] ml-auto">
                                    <div className="relative">
                                      <div className="w-5 h-5 rounded flex items-center justify-center cursor-pointer border border-dashed border-dark-400 hover:border-brand-default">
                                        <svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <rect x="2" y="3" width="12" height="11" rx="1" stroke="#666" strokeWidth="1.5" fill="none" />
                                          <path d="M2 6h12" stroke="#666" strokeWidth="1.5" />
                                          <path d="M5 1v3M11 1v3" stroke="#666" strokeWidth="1.5" strokeLinecap="round" />
                                        </svg>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* External Links */}
                            <div className="mt-3 max-w-field">
                              <p className="text-dark-100 text-base font-semibold">Links externos</p>
                              <p className="mt-2 mb-5 text-dark-300 text-sm">Adicionar links externos na sua mensagem</p>

                              {/* Jump to message button */}
                              <div className="grid grid-cols-1 gap-4 mb-6">
                                <div>
                                  <div className="flex flex-col lg:flex-row gap-3 items-start justify-start">
                                    <div className="flex items-center">
                                      <svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="mr-2 text-dark-400">
                                        <path d="M8.333 4.167c0-.917-.75-1.667-1.666-1.667C5.75 2.5 5 3.25 5 4.167c0 .916.75 1.666 1.667 1.666.916 0 1.666-.75 1.666-1.666zM15 4.167c0-.917-.75-1.667-1.667-1.667-.916 0-1.666.75-1.666 1.667 0 .916.75 1.666 1.666 1.666.917 0 1.667-.75 1.667-1.666zM8.333 15.833c0-.917-.75-1.667-1.666-1.667-.917 0-1.667.75-1.667 1.667S5.75 17.5 6.667 17.5c.916 0 1.666-.75 1.666-1.667zM15 15.833c0-.917-.75-1.667-1.667-1.667-.916 0-1.666.75-1.666 1.667s.75 1.667 1.666 1.667c.917 0 1.667-.75 1.667-1.667zM8.333 10c0-.916-.75-1.666-1.666-1.666C5.75 8.334 5 9.084 5 10c0 .917.75 1.667 1.667 1.667.916 0 1.666-.75 1.666-1.667zM15 10c0-.916-.75-1.666-1.667-1.666-.916 0-1.666.75-1.666 1.666 0 .917.75 1.667 1.666 1.667.917 0 1.667-.75 1.667-1.667z" fill="currentColor" />
                                      </svg>
                                      <button
                                        type="button"
                                        className="min-h-[46px] min-w-[144px] max-w-[144px] px-4 py-2.5 text-base w-full flex items-center justify-center rounded-lg text-dark-100 relative group overflow-hidden bg-discord-secondary font-medium"
                                      >
                                        <span className="whitespace-nowrap text-ellipsis overflow-hidden">Jump to message</span>
                                      </button>
                                    </div>
                                    <div className="flex-1 flex items-center gap-2 w-full">
                                      <div className="relative w-full opacity-50 !cursor-not-allowed font-italic">
                                        <div className="pointer-events-none">
                                          <div
                                            role="textbox"
                                            aria-multiline="true"
                                            className="outline-none bg-dark-900 rounded-lg pl-3 pr-10 lg:pr-10 py-2.5 text-base leading-relaxed text-dark-100"
                                          >
                                            <span className="font-semibold bg-grey-600 rounded-md px-1.5 py-0.5 mx-0.5 text-sm cursor-pointer inline-block text-dark-100">
                                              {'{message.link}'}
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                      <button
                                        type="button"
                                        className="relative flex overflow-hidden shrink-0 rounded-lg transition-all duration-200 items-center gap-1.5 bg-danger-default bg-opacity-[0.14] text-danger-default hover:bg-opacity-[0.25] text-sm p-2 cursor-pointer"
                                        title="Remover"
                                      >
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="sc-eldPxv fpIvEY inline-block">
                                          <path d="M5 7.033h14v5.143c0 1.575-.222 3.142-.658 4.654a5.627 5.627 0 01-4.46 3.999l-.158.026a10.344 10.344 0 01-3.448 0l-.158-.026a5.627 5.627 0 01-4.46-3.999A16.783 16.783 0 015 12.176V7.033z" fill="rgba(154,161,181,0.16)" />
                                          <path d="M3 6.283a.75.75 0 000 1.5v-1.5zm18 1.5a.75.75 0 000-1.5v1.5zm-16-.75v-.75h-.75v.75H5zm14 0h.75v-.75H19v.75zm-.658 9.797l.72.208-.72-.208zm-4.618 4.025l.125.74-.125-.74zm-3.448 0l.125-.74-.125.74zm-.158-.026l-.125.74.125-.74zm-4.46-3.999l-.72.208.72-.208zm8.224 3.999l-.125-.74.125.74zm-6.04-15.34l.681.315-.68-.315zm.976-1.308l-.5-.558.5.558zm1.46-.874l.26.703-.26-.703zm3.444 0l.261-.703-.26.703zm2.435 2.182l.681-.314-.68.314zM3 7.783h18v-1.5H3v1.5zm10.757 12.306l-.158.027.25 1.479.158-.027-.25-1.479zm-3.356.027l-.158-.027-.25 1.48.158.026.25-1.48zM18.25 7.033v5.143h1.5V7.033h-1.5zm-12.5 5.143V7.033h-1.5v5.143h1.5zm12.5 0c0 1.505-.212 3.002-.629 4.446l1.441.416c.456-1.58.688-3.217.688-4.862h-1.5zm-4.651 7.94a9.595 9.595 0 01-3.198 0l-.25 1.479c1.224.207 2.474.207 3.698 0l-.25-1.48zm-3.356-.027a4.877 4.877 0 01-3.864-3.467l-1.441.416a6.377 6.377 0 005.055 4.53l.25-1.479zM6.38 16.622a16.033 16.033 0 01-.629-4.446h-1.5c0 1.645.231 3.282.688 4.862l1.44-.416zm7.628 4.946a6.377 6.377 0 005.055-4.53l-1.44-.416a4.877 4.877 0 01-3.865 3.467l.25 1.48zM8.25 7.033c0-.42.092-.837.273-1.229l-1.361-.63a4.422 4.422 0 00-.412 1.859h1.5zm.273-1.229c.182-.393.45-.755.796-1.064L8.317 3.623c-.49.44-.884.966-1.155 1.552l1.361.63zM9.32 4.74c.345-.31.759-.559 1.22-.73l-.522-1.406c-.63.234-1.209.579-1.7 1.019L9.32 4.74zm1.22-.73c.461-.171.958-.26 1.461-.26v-1.5c-.679 0-1.352.12-1.983.354l.522 1.406zM12 3.75c.503 0 1 .089 1.461.26l.522-1.406A5.707 5.707 0 0012 2.25v1.5zm1.461.26c.461.171.875.42 1.22.73l1.002-1.117a5.317 5.317 0 00-1.7-1.02l-.522 1.407zm1.22.73c.345.309.614.671.796 1.064l1.361-.63a4.784 4.784 0 00-1.156-1.551l-1 1.117zm.796 1.064c.181.392.273.81.273 1.229h1.5c0-.64-.14-1.272-.412-1.858l-1.361.63zM5 7.783h14v-1.5H5v1.5z" fill="#9B9D9F" />
                                          <path d="M10 12v4m4-4v4" stroke="#9B9D9F" strokeWidth="1.5" strokeLinecap="round" />
                                        </svg>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Button editor */}
                              <div className="max-w-field">
                                <div className="flex flex-col lg:flex-row items-start justify-start mb-3 gap-3">
                                  <button
                                    type="button"
                                    className="min-h-[46px] min-w-[144px] max-w-[144px] px-4 py-2.5 text-base w-full flex items-center justify-center rounded-lg text-dark-100 relative group overflow-hidden bg-discord-secondary font-medium"
                                  >
                                    <span className="whitespace-nowrap text-ellipsis overflow-hidden">{customButtonLabel || 'Seu botão'}</span>
                                  </button>
                                  <div className="relative w-full">
                                    <input
                                      type="text"
                                      value={customButtonUrl}
                                      onChange={(e) => setCustomButtonUrl(e.target.value)}
                                      placeholder="Digitar ou colar URL"
                                      className="w-full bg-dark-900 rounded-lg pl-3 pr-10 py-2.5 text-base text-dark-100 placeholder:text-dark-400 outline-none border border-transparent focus:border-dark-700"
                                    />
                                  </div>
                                </div>
                                <div>
                                  <p className="text-dark-100 uppercase mb-3 text-xs font-semibold">Editor de botões</p>
                                  <div className="flex items-start flex-wrap lg:flex-nowrap justify-start border-l-2 border-solid border-dark-500 pl-4 gap-2 lg:gap-4">
                                    <div>
                                      <p className="text-dark-400 text-sm mb-1">Emoji</p>
                                      <div className="rounded-lg bg-dark-900 px-3 flex items-center justify-center h-[47px]">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 cursor-pointer text-dark-200 w-6">
                                          <path d="M3.353 8.95A7.511 7.511 0 018.95 3.353c2.006-.47 4.094-.47 6.1 0a7.511 7.511 0 015.597 5.597c.47 2.006.47 4.094 0 6.1a7.511 7.511 0 01-5.597 5.597c-2.006.47-4.094.47-6.1 0a7.511 7.511 0 01-5.597-5.597 13.354 13.354 0 010-6.1z" fill="transparent" stroke="currentColor" strokeWidth="1.5" />
                                          <path d="M14.5 12h-5m2.5 2.5v-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                        </svg>
                                      </div>
                                    </div>
                                    <div className="w-full">
                                      <p className="text-dark-400 text-sm mb-1">Rótulo</p>
                                      <input
                                        type="text"
                                        value={customButtonLabel}
                                        onChange={(e) => setCustomButtonLabel(e.target.value)}
                                        placeholder="Seu botão"
                                        className="w-full bg-dark-900 rounded-lg pl-3 pr-10 py-2.5 text-base text-dark-100 outline-none border border-transparent focus:border-dark-700"
                                      />
                                    </div>
                                  </div>
                                  <div className="flex items-center mt-5">
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setCustomButtonLabel('Seu botão');
                                        setCustomButtonUrl('');
                                      }}
                                      className="relative flex overflow-hidden shrink-0 rounded-lg transition-all duration-200 items-center gap-1.5 bg-white bg-opacity-10 text-white hover:bg-opacity-20 active:bg-opacity-5 text-sm px-4 py-2 cursor-pointer mr-3"
                                    >
                                      Cancelar
                                    </button>
                                    <button
                                      type="button"
                                      disabled={!customButtonUrl.trim()}
                                      className="relative flex overflow-hidden shrink-0 rounded-lg transition-all duration-200 items-center gap-1.5 bg-white bg-opacity-10 text-white hover:bg-opacity-20 active:bg-opacity-5 disabled:cursor-not-allowed disabled:opacity-30 text-sm px-4 py-2"
                                    >
                                      Salvar link
                                    </button>
                                  </div>
                                </div>

                                {/* Add Link Button (dashed) */}
                                <div className="select-none w-full border-dashed border-[1px] border-dark-500 rounded-lg flex items-center justify-start px-3 py-3 gap-2 hover:border-dark-400 transition-all duration-200 group mt-5 opacity-50 hover:border-dark-500 !cursor-not-allowed">
                                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 text-dark-300 w-6">
                                    <path d="M3.353 8.95A7.511 7.511 0 018.95 3.353c2.006-.47 4.094-.47 6.1 0a7.511 7.511 0 015.597 5.597c.47 2.006.47 4.094 0 6.1a7.511 7.511 0 01-5.597 5.597c-2.006.47-4.094.47-6.1 0a7.511 7.511 0 01-5.597-5.597 13.354 13.354 0 010-6.1z" fill="transparent" stroke="currentColor" strokeWidth="1.5" />
                                    <path d="M14.5 12h-5m2.5 2.5v-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                  </svg>
                                  <p className="font-medium text-dark-300 group-hover:text-dark-200 transition-all duration-200 text-base">
                                    Adicionar botão de link
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Restore default button (desktop) */}
                          <div className="absolute right-0 top-0 translate-x-full pl-2 hidden lg:flex flex-col gap-2">
                            <div className="relative inline-block">
                              <div className="relative z-[1]">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setEmbedColor('#FFAC33');
                                    setEmbedTitle('');
                                    setEmbedFooter('');
                                  }}
                                  className="relative flex overflow-hidden shrink-0 rounded-lg transition-all duration-200 items-center gap-1.5 bg-white bg-opacity-10 text-white hover:bg-opacity-20 active:bg-opacity-5 text-sm p-1.5 cursor-pointer"
                                  title="Restaurar padrão"
                                >
                                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="sc-eldPxv kIKVos inline-block">
                                    <circle cx="12" cy="12" r="9" fill="rgba(154,161,181,0.16)" fillOpacity="0.16" />
                                    <path d="M3 12.152C3 17.04 7.03 21 12 21s9-3.961 9-8.848c0-4.886-4-8.847-9-8.847-6 0-9 4.915-9 4.915m0 0V3m0 5.22h4.655" stroke="#9B9D9F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                  </svg>
                                </button>
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

            {/* CARD 4: Comportamento */}
            <div
              className="bg-dark-800 shadow-xs sub_feature_card rounded-xl border border-zinc-800/80 mb-4 overflow-hidden"
              id="plugins.starboards.form.behavior.title"
            >
              <h3
                onClick={() => setBehaviorSectionOpen(!behaviorSectionOpen)}
                className="text-white flex justify-between items-start hover:bg-zinc-800/30 transition-all py-4 lg:py-5 px-6 cursor-pointer select-none"
              >
                <div className="flex flex-col w-full pr-4 max-w-[760px]">
                  <div className="sub_feature_title flex items-center text-lg font-semibold text-white">
                    Comportamento
                  </div>
                  <div className="mt-1 text-sm text-zinc-400">
                    Configure como as reações são contabilizadas e como as postagens do starboard se comportam
                  </div>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <button type="button" className="pt-1 text-zinc-400 hover:text-white">
                    {behaviorSectionOpen ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </h3>

              {behaviorSectionOpen && (
                <div className="text-base transition-all">
                  <div className="p-6 pt-0 border-t border-zinc-800/60 mt-1 space-y-5 pt-4">
                    {/* Toggle 1: Permitir múltiplas reações por usuário */}
                    <DiscordSwitch
                      checked={multipleReactionsPerUser}
                      onChange={setMultipleReactionsPerUser}
                      label="Permitir múltiplas reações por usuário"
                      description="Quando ativado, cada reação com emoji do mesmo usuário irá contar separadamente para o limite. Só se aplica quando vários emojis estão configurados."
                      activeColor="brand"
                      switchPosition="left"
                    />

                    {/* Toggle 2: Reagir automaticamente às publicações */}
                    <div>
                      <DiscordSwitch
                        checked={autoReactPosts}
                        onChange={setAutoReactPosts}
                        label="Reagir automaticamente às publicações"
                        description="Adicione reações automaticamente às publicações do Starboard para que os usuários possam continuar votando."
                        activeColor="brand"
                        switchPosition="left"
                      />

                      {/* Sub-checkbox: First emoji only */}
                      <div
                        onClick={() => setFirstEmojiOnly(!firstEmojiOnly)}
                        className="pl-[68px] mt-3 flex items-start gap-3 cursor-pointer select-none"
                      >
                        <div
                          className={`w-5 h-5 rounded-md border flex items-center justify-center mt-0.5 transition-colors ${
                            firstEmojiOnly
                              ? 'bg-brand-default border-brand-default text-dark-900'
                              : 'border-zinc-700 bg-dark-900 text-transparent'
                          }`}
                        >
                          {firstEmojiOnly && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                        <div>
                          <p className="text-white text-sm font-medium">First emoji only</p>
                          <p className="text-zinc-400 text-xs leading-relaxed">
                            Adicione apenas o primeiro emoji configurado como reação, em vez de todos os emojis.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Toggle 3: Permitir conteúdo NSFW */}
                    <DiscordSwitch
                      checked={allowNsfw}
                      onChange={setAllowNsfw}
                      label="Permitir mensagens de canais NSFW"
                      description="Permitir que mensagens de canais marcados como conteúdo adulto sejam promovidas se o canal do starboard for seguro."
                      activeColor="brand"
                      switchPosition="left"
                    />

                    {/* Toggle 4: Ocultar conteúdo com spoiler */}
                    <DiscordSwitch
                      checked={hideSpoilers}
                      onChange={setHideSpoilers}
                      label="Ocultar spoilers"
                      description="Preservar marcações ||spoiler|| e mascarar anexos com aviso de spoiler por padrão."
                      activeColor="brand"
                      switchPosition="left"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* CARD 5: Anti-Abuso */}
            <div
              className="bg-dark-800 shadow-xs sub_feature_card rounded-xl border border-zinc-800/80 mb-4 overflow-hidden"
              id="plugins.starboards.form.anti_abuse.title"
            >
              <h3
                onClick={() => setAntiAbuseSectionOpen(!antiAbuseSectionOpen)}
                className="text-white flex justify-between items-start hover:bg-zinc-800/30 transition-all py-4 lg:py-5 px-6 cursor-pointer select-none"
              >
                <div className="flex flex-col w-full pr-4 max-w-[760px]">
                  <div className="sub_feature_title flex items-center text-lg font-semibold text-white">Anti-Abuso</div>
                  <div className="mt-1 text-sm text-zinc-400">
                    Configure como o starboard lida com a prevenção de abusos e casos extremos
                  </div>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <button type="button" className="pt-1 text-zinc-400 hover:text-white">
                    {antiAbuseSectionOpen ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </h3>

              {antiAbuseSectionOpen && (
                <div className="text-base transition-all">
                  <div className="p-6 pt-0 border-t border-zinc-800/60 mt-1 space-y-5 pt-4">
                    {/* Item 1: Remover ao desfazer a reação de estrela */}
                    <div>
                      <DiscordSwitch
                        checked={removeOnUnstar}
                        onChange={setRemoveOnUnstar}
                        label="Remover ao desfazer a reação de estrela"
                        description="Remover a publicação do starboard quando as reações ficarem abaixo do limite"
                        activeColor="brand"
                        switchPosition="left"
                      />

                      <div className="pl-[68px] mt-2">
                        <div
                          onClick={() => setRepostCooldown(!repostCooldown)}
                          className="flex items-start gap-3 cursor-pointer select-none"
                        >
                          <div
                            className={`w-5 h-5 rounded-md border flex items-center justify-center mt-0.5 transition-colors shrink-0 ${
                              repostCooldown
                                ? 'bg-brand-default border-brand-default text-dark-900'
                                : 'border-zinc-700 bg-dark-900 text-transparent'
                            }`}
                          >
                            {repostCooldown && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>
                          <div>
                            <p className="text-white text-sm font-medium">Tempo de espera para repostar</p>
                            <p className="text-zinc-400 text-xs leading-relaxed">
                              Quando um usuário remove uma publicação da sua lista de favoritos, ele não pode reativá-la por 60 segundos. Outros usuários ainda podem reativá-la.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Item 2: Remover ao excluir */}
                    <DiscordSwitch
                      checked={removeOnDelete}
                      onChange={setRemoveOnDelete}
                      label="Remover ao excluir"
                      description="Remova a publicação do starboard quando a publicação original for apagada."
                      activeColor="brand"
                      switchPosition="left"
                    />

                    {/* Item 3: Ignorar auto-reações de estrelas */}
                    <div>
                      <DiscordSwitch
                        checked={ignoreSelfStar}
                        onChange={setIgnoreSelfStar}
                        label="Ignorar auto-reações de estrelas"
                        description="As estrelas inseridas pelo próprio autor não serão contabilizadas no limite do starboard"
                        activeColor="brand"
                        switchPosition="left"
                      />

                      <div className="pl-[68px] mt-2">
                        <div
                          onClick={() => setRemoveSelfReactions(!removeSelfReactions)}
                          className="flex items-start gap-3 cursor-pointer select-none"
                        >
                          <div
                            className={`w-5 h-5 rounded-md border flex items-center justify-center mt-0.5 transition-colors shrink-0 ${
                              removeSelfReactions
                                ? 'bg-brand-default border-brand-default text-dark-900'
                                : 'border-zinc-700 bg-dark-900 text-transparent'
                            }`}
                          >
                            {removeSelfReactions && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>
                          <div>
                            <p className="text-white text-sm font-medium">Remover reações inseridas pelo próprio autor</p>
                            <p className="text-zinc-400 text-xs leading-relaxed">
                              Remover automaticamente a reação quando alguém destacar a própria mensagem com estrela
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Item 4: Bloquear reações a mensagens de bots */}
                    <div>
                      <DiscordSwitch
                        checked={blockBotReactions}
                        onChange={setBlockBotReactions}
                        label="Bloquear reações a mensagens de bots"
                        description="Reações às mensagens de bots não serão contabilizadas no limite"
                        activeColor="brand"
                        switchPosition="left"
                      />

                      <div className="pl-[68px] mt-2">
                        <div
                          onClick={() => setRemoveBotReactions(!removeBotReactions)}
                          className="flex items-start gap-3 cursor-pointer select-none"
                        >
                          <div
                            className={`w-5 h-5 rounded-md border flex items-center justify-center mt-0.5 transition-colors shrink-0 ${
                              removeBotReactions
                                ? 'bg-brand-default border-brand-default text-dark-900'
                                : 'border-zinc-700 bg-dark-900 text-transparent'
                            }`}
                          >
                            {removeBotReactions && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>
                          <div>
                            <p className="text-white text-sm font-medium">Remover reações</p>
                            <p className="text-zinc-400 text-xs leading-relaxed">
                              Remover automaticamente as reações às mensagens do bot
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Item 5: Idade mínima da mensagem */}
                      <div className="flex flex-col gap-3">
                        <span className="text-sm text-dark-200">Idade mínima da mensagem</span>
                        <div className="relative w-48">
                          <div translate="no">
                            <div
                              onClick={() => {
                                minAgeDropdownOpen ? setMinAgeDropdownOpen(false) : (setMinAgeDropdownOpen(true), setMaxAgeDropdownOpen(false));
                              }}
                              className="overflow-hidden flex items-center justify-start group bg-dark-900 rounded-lg border border-solid transition-all duration-200 hover:border-brand-default border-dark-900 cursor-pointer"
                            >
                              <div className="bg-transparent outline-none border-none w-full cursor-pointer flex justify-between items-center text-dark-100 py-3 px-4 text-base">
                                <div className="flex-1 min-w-0 overflow-hidden text-sm">{minMessageAge}</div>
                                <svg
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                  className={`transition-all flex-shrink-0 ml-auto ${minAgeDropdownOpen ? '' : 'rotate-180'}`}
                                >
                                  <path d="M7 14.5l5-5 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              </div>
                            </div>

                            {minAgeDropdownOpen && (
                              <div className="top-[50px] absolute left-0 z-20 w-full rounded-lg bg-dark-900 max-h-[320px] overflow-y-auto overflow-x-hidden transition-all duration-200 shadow-xl border border-dark-700 p-2 transform">
                                <ul>
                                  {['Sem mínimo', '1 minuto', '5 minutos', '10 minutos', '30 minutos', '1 hora'].map((opt) => (
                                    <li
                                      key={opt}
                                      onClick={() => {
                                        setMinMessageAge(opt);
                                        setMinAgeDropdownOpen(false);
                                      }}
                                      className={`p-2 rounded-lg transition duration-200 hover:bg-dark-700 font-sans text-sm text-dark-100 cursor-pointer flex items-center justify-start ${
                                        minMessageAge === opt ? 'bg-dark-700 font-semibold' : ''
                                      }`}
                                    >
                                      <div className="w-full">{opt}</div>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </div>
                        <span className="text-xs text-dark-400">
                          A idade mínima que uma mensagem deve ter para poder ser favoritada. Para desativar esse requisito, defina como 0.
                        </span>
                      </div>

                      {/* Item 6: Idade máxima da mensagem */}
                      <div className="flex flex-col gap-3">
                        <span className="text-sm text-dark-200">Idade máxima da mensagem</span>
                        <div className="relative w-48">
                          <div translate="no">
                            <div
                              onClick={() => {
                                setMaxAgeDropdownOpen(!maxAgeDropdownOpen);
                                setMinAgeDropdownOpen(false);
                              }}
                              className="overflow-hidden flex items-center justify-start group bg-dark-900 rounded-lg border border-solid transition-all duration-200 hover:border-brand-default border-dark-900 cursor-pointer"
                            >
                              <div className="bg-transparent outline-none border-none w-full cursor-pointer flex justify-between items-center text-dark-100 py-3 px-4 text-base">
                                <div className="flex-1 min-w-0 overflow-hidden text-sm">{maxMessageAge}</div>
                                <svg
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                  className={`transition-all flex-shrink-0 ml-auto ${maxAgeDropdownOpen ? '' : 'rotate-180'}`}
                                >
                                  <path d="M7 14.5l5-5 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              </div>
                            </div>

                            {maxAgeDropdownOpen && (
                              <div className="top-[50px] absolute left-0 z-20 w-full rounded-lg bg-dark-900 max-h-[320px] overflow-y-auto overflow-x-hidden transition-all duration-200 shadow-xl border border-dark-700 p-2 transform">
                                <ul>
                                  {['Sem máximo', '1 hora', '6 horas', '12 horas', '1 dia', '3 dias', '7 dias', '14 dias', '30 dias'].map((opt) => (
                                    <li
                                      key={opt}
                                      onClick={() => {
                                        setMaxMessageAge(opt);
                                        setMaxAgeDropdownOpen(false);
                                      }}
                                      className={`p-2 rounded-lg transition duration-200 hover:bg-dark-700 font-sans text-sm text-dark-100 cursor-pointer flex items-center justify-start ${
                                        maxMessageAge === opt ? 'bg-dark-700 font-semibold' : ''
                                      }`}
                                    >
                                      <div className="w-full">{opt}</div>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </div>
                        <span className="text-xs text-dark-400">
                          Limite de tempo que uma mensagem deve ter para ser favoritada. Para desativar esse requisito, defina como 0.
                        </span>
                      </div>
                  </div>
                </div>
              )}
            </div>

            {/* CARD 6: Restrições */}
            <div
              className="bg-dark-800 shadow-xs sub_feature_card rounded-xl border border-zinc-800/80 mb-4 overflow-hidden"
              id="plugins.starboards.form.restrictions.title"
            >
              <h3
                onClick={() => setRestrictionsSectionOpen(!restrictionsSectionOpen)}
                className="text-white flex justify-between items-start hover:bg-zinc-800/30 transition-all py-4 lg:py-5 px-6 cursor-pointer select-none"
              >
                <div className="flex flex-col w-full pr-4 max-w-[760px]">
                  <div className="sub_feature_title flex items-center text-lg font-semibold text-white">
                    Restrições
                  </div>
                  <div className="mt-1 text-sm text-zinc-400">
                    Limitar quais cargos ou canais podem participar deste starboard
                  </div>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <button type="button" className="pt-1 text-zinc-400 hover:text-white">
                    {restrictionsSectionOpen ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </h3>

              {restrictionsSectionOpen && (
                <div className="text-base transition-all">
                  <div className="p-6 pt-0 border-t border-zinc-800/60 mt-1 space-y-6 pt-4">
                    {/* Restrições de cargo */}
                    <div>
                      <p className="text-zinc-100 text-base mb-3 font-semibold">
                        Restrições de cargo
                      </p>

                      <div className="space-y-3">
                        <div
                          onClick={() => setRoleRestrictionMode('only')}
                          className="flex items-center gap-3 cursor-pointer select-none"
                        >
                          <div
                            className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                              roleRestrictionMode === 'only'
                                ? 'border-brand-default bg-brand-default'
                                : 'border-zinc-600 bg-dark-900'
                            }`}
                          >
                            {roleRestrictionMode === 'only' && (
                              <div className="w-2 h-2 rounded-full bg-dark-900" />
                            )}
                          </div>
                          <p className="text-sm text-zinc-200">
                            Apenas esses cargos podem destacar mensagens
                          </p>
                        </div>

                        <div
                          onClick={() => setRoleRestrictionMode('except')}
                          className="flex items-center gap-3 cursor-pointer select-none"
                        >
                          <div
                            className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                              roleRestrictionMode === 'except'
                                ? 'border-brand-default bg-brand-default'
                                : 'border-zinc-600 bg-dark-900'
                            }`}
                          >
                            {roleRestrictionMode === 'except' && (
                              <div className="w-2 h-2 rounded-full bg-dark-900" />
                            )}
                          </div>
                          <p className="text-sm text-zinc-200">
                            Todos os cargos podem destacar, exceto
                          </p>
                        </div>

                        {/* Role selector dropdown */}
                        <div className="relative max-w-xl" ref={roleDropdownRef}>
                          <div
                            onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                            className="rounded-lg bg-dark-900 min-h-[50px] flex items-center justify-between border border-zinc-700 px-3 py-2 cursor-pointer hover:border-zinc-600 transition-colors"
                          >
                            <div className="flex items-center gap-2 flex-wrap">
                              {selectedRoles.length === 0 ? (
                                <div className="flex items-center gap-2 text-zinc-400 text-sm">
                                  <Plus className="w-4 h-4 text-zinc-400" />
                                  <span>Selecione um cargo</span>
                                </div>
                              ) : (
                                selectedRoles.map((roleName) => (
                                  <span
                                    key={roleName}
                                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-800 border border-zinc-700 text-xs text-white font-medium"
                                  >
                                    <span
                                      className="w-2 h-2 rounded-full"
                                      style={{ backgroundColor: '#2F22DD' }}
                                    />
                                    <span>{roleName}</span>
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        toggleRoleSelection(roleName);
                                      }}
                                      className="text-zinc-400 hover:text-white"
                                    >
                                      <X className="w-3 h-3" />
                                    </button>
                                  </span>
                                ))
                              )}
                            </div>
                            <ChevronDown className="w-4 h-4 text-zinc-400 shrink-0 ml-2" />
                          </div>

                          {roleDropdownOpen && (
                            <div className="absolute left-0 top-full mt-1 z-30 w-full rounded-xl bg-dark-900 border border-zinc-700 shadow-2xl max-h-[320px] overflow-y-auto p-2 animate-fadeIn">
                              {/* Role search */}
                              <div className="p-1 mb-1">
                                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-dark-800 border border-zinc-700/80">
                                  <Search className="w-3.5 h-3.5 text-zinc-400" />
                                  <input
                                    type="text"
                                    value={roleSearch}
                                    onChange={(e) => setRoleSearch(e.target.value)}
                                    placeholder="Pesquisar cargos..."
                                    className="w-full bg-transparent text-white text-xs outline-none placeholder:text-zinc-500"
                                    onClick={(e) => e.stopPropagation()}
                                  />
                                </div>
                              </div>

                              <ul>
                                <li
                                  onClick={() => setSelectedRoles(ROLES_LIST.map((r) => r.name))}
                                  className="flex p-2 rounded-lg items-center text-zinc-200 text-xs font-semibold hover:bg-zinc-800 transition-colors cursor-pointer"
                                >
                                  <Plus className="w-4 h-4 mr-2 text-zinc-400" />
                                  Adicionar todos os cargos
                                </li>
                              </ul>
                              <ul className="border-t border-zinc-800 pt-1 mt-1 space-y-1">
                                {filteredRoles.map((role) => {
                                  const isSelected = selectedRoles.includes(role.name);
                                  return (
                                    <li
                                      key={role.id}
                                      onClick={() => toggleRoleSelection(role.name)}
                                      className={`p-2 rounded-lg text-xs cursor-pointer flex items-center justify-between transition-colors ${
                                        isSelected
                                          ? 'bg-zinc-800 text-white font-semibold'
                                          : 'text-zinc-300 hover:bg-zinc-800/60'
                                      }`}
                                    >
                                      <div className="flex items-center gap-2">
                                        <span
                                          className="w-2.5 h-2.5 rounded-full"
                                          style={{ backgroundColor: role.color }}
                                        />
                                        <span>{role.name}</span>
                                      </div>
                                      {isSelected && <Check className="w-4 h-4 text-brand-default" />}
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Restrições de canal */}
                    <div>
                      <p className="text-zinc-100 text-base mb-3 font-semibold">
                        Restrições de canal
                      </p>

                      <div className="space-y-3">
                        <div
                          onClick={() => setChannelRestrictionMode('only')}
                          className="flex items-center gap-3 cursor-pointer select-none"
                        >
                          <div
                            className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                              channelRestrictionMode === 'only'
                                ? 'border-brand-default bg-brand-default'
                                : 'border-zinc-600 bg-dark-900'
                            }`}
                          >
                            {channelRestrictionMode === 'only' && (
                              <div className="w-2 h-2 rounded-full bg-dark-900" />
                            )}
                          </div>
                          <p className="text-sm text-zinc-200">
                            Apenas mensagens destes canais
                          </p>
                        </div>

                        <div
                          onClick={() => setChannelRestrictionMode('except')}
                          className="flex items-center gap-3 cursor-pointer select-none"
                        >
                          <div
                            className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                              channelRestrictionMode === 'except'
                                ? 'border-brand-default bg-brand-default'
                                : 'border-zinc-600 bg-dark-900'
                            }`}
                          >
                            {channelRestrictionMode === 'except' && (
                              <div className="w-2 h-2 rounded-full bg-dark-900" />
                            )}
                          </div>
                          <p className="text-sm text-zinc-200">
                            Mensagens de todos os canais, exceto
                          </p>
                        </div>

                        {/* Channel and Category Selector Tree */}
                        <div className="relative max-w-xl" ref={categoryDropdownRef}>
                          <div
                            onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
                            className="rounded-lg bg-dark-900 min-h-[50px] flex items-center justify-between border border-zinc-700 px-3 py-2 cursor-pointer hover:border-zinc-600 transition-colors"
                          >
                            <div className="flex items-center gap-2 flex-wrap">
                              {selectedChannels.length === 0 ? (
                                <div className="flex items-center gap-2 text-zinc-400 text-sm">
                                  <Plus className="w-4 h-4 text-zinc-400" />
                                  <span>Selecione um canal ou categoria</span>
                                </div>
                              ) : (
                                selectedChannels.map((ch) => (
                                  <span
                                    key={ch}
                                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-800 border border-zinc-700 text-xs text-white font-medium"
                                  >
                                    <Hash className="w-3 h-3 text-zinc-400" />
                                    <span>{ch}</span>
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        toggleChannelSelection(ch);
                                      }}
                                      className="text-zinc-400 hover:text-white"
                                    >
                                      <X className="w-3 h-3" />
                                    </button>
                                  </span>
                                ))
                              )}
                            </div>
                            <ChevronDown className="w-4 h-4 text-zinc-400 shrink-0 ml-2" />
                          </div>

                          {categoryDropdownOpen && (
                            <div className="absolute left-0 top-full mt-1 z-30 w-full rounded-xl bg-dark-900 border border-zinc-700 shadow-2xl max-h-[380px] overflow-y-auto p-3 animate-fadeIn">
                              {/* Search bar */}
                              <div className="p-1 mb-2">
                                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-dark-800 border border-zinc-700/80">
                                  <Search className="w-3.5 h-3.5 text-zinc-400" />
                                  <input
                                    type="text"
                                    value={categorySearch}
                                    onChange={(e) => setCategorySearch(e.target.value)}
                                    placeholder="Pesquisar canais e categorias..."
                                    className="w-full bg-transparent text-white text-xs outline-none placeholder:text-zinc-500"
                                    onClick={(e) => e.stopPropagation()}
                                  />
                                </div>
                              </div>

                              <div className="border-b border-zinc-800 pb-2 mb-2">
                                <p className="uppercase text-zinc-400 font-bold text-xs px-2 mb-1">
                                  Opções
                                </p>
                                <button
                                  type="button"
                                  onClick={() =>
                                    setSelectedChannels([
                                      ...SERVER_CHANNELS,
                                      '🔹・veículos',
                                      '🔹・props',
                                      '🔹・mapas',
                                      '🔹・roupas',
                                    ])
                                  }
                                  className="w-full flex p-2 rounded-lg items-center text-zinc-200 text-xs font-semibold hover:bg-zinc-800 transition-colors text-left cursor-pointer"
                                >
                                  <Plus className="w-4 h-4 mr-2 text-zinc-400" />
                                  Adicionar todos os canais
                                </button>
                              </div>

                              <div className="space-y-3">
                                <p className="uppercase text-zinc-400 font-bold text-xs px-2 mb-1">
                                  Canais e Categorias
                                </p>

                                {SERVER_CATEGORIES.map((cat) => {
                                  const filteredCatChannels = cat.channels.filter(
                                    (chan) =>
                                      chan
                                        .toLowerCase()
                                        .includes(categorySearch.toLowerCase()) ||
                                      cat.name
                                        .toLowerCase()
                                        .includes(categorySearch.toLowerCase())
                                  );

                                  if (
                                    categorySearch &&
                                    filteredCatChannels.length === 0
                                  ) {
                                    return null;
                                  }

                                  const allInCatSelected =
                                    cat.channels.length > 0 &&
                                    cat.channels.every((c) =>
                                      selectedChannels.includes(c)
                                    );

                                  return (
                                    <div key={cat.name} className="space-y-1">
                                      <div
                                        onClick={() =>
                                          toggleCategorySelection(cat.channels)
                                        }
                                        className="flex items-center justify-between p-2 rounded-lg bg-zinc-800/40 hover:bg-zinc-800/80 text-xs font-bold text-zinc-300 uppercase tracking-wider cursor-pointer transition-colors"
                                        title="Clique para selecionar ou desmarcar toda a categoria"
                                      >
                                        <span>{cat.name}</span>
                                        <span className="text-[10px] text-brand-light lowercase font-normal">
                                          {allInCatSelected
                                            ? 'desmarcar todos'
                                            : 'selecionar todos'}
                                        </span>
                                      </div>
                                      <div className="pl-3 space-y-1">
                                        {filteredCatChannels.map((chan) => {
                                          const isChecked =
                                            selectedChannels.includes(chan);
                                          return (
                                            <div
                                              key={chan}
                                              onClick={() =>
                                                toggleChannelSelection(chan)
                                              }
                                              className="flex items-center justify-between p-1.5 rounded-lg hover:bg-zinc-800 cursor-pointer transition-colors"
                                            >
                                              <div className="flex items-center gap-2 text-sm text-zinc-200">
                                                <div
                                                  className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                                                    isChecked
                                                      ? 'bg-brand-default border-brand-default text-dark-900'
                                                      : 'border-zinc-700 bg-dark-800 text-transparent'
                                                  }`}
                                                >
                                                  {isChecked && (
                                                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                                                  )}
                                                </div>
                                                <span>{chan}</span>
                                              </div>
                                            </div>
                                          );
                                        })}
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Live Discord Preview Modal */}
      {showPreviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="bg-dark-800 border border-dark-600 rounded-2xl max-w-lg w-full p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-dark-700 mb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span>Pré-visualização do Discord</span>
              </h3>
              <button
                onClick={() => setShowPreviewModal(false)}
                className="p-1.5 rounded-lg text-dark-300 hover:text-white hover:bg-dark-700 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 rounded-xl bg-[#313338] border border-zinc-800">
              <div className="flex items-center mb-2">
                <img
                  src="https://cdn.discordapp.com/embed/avatars/0.png"
                  alt="vixestudio"
                  className="w-8 h-8 rounded-full mr-3"
                />
                <div className="flex items-center gap-2">
                  <span className="text-white font-bold text-sm">vixestudio</span>
                  <span className="rounded bg-[#5865F2] text-white uppercase text-[9px] px-1.5 py-0.5 font-bold leading-none">
                    BOT
                  </span>
                  <p className="text-xs text-[#949ba4]">Hoje às 08:45</p>
                </div>
              </div>

              <div className="mb-2.5 ml-11">
                <p className="text-sm text-white font-medium">
                  {renderBotMessagePreview()}
                </p>
              </div>

              <div
                className="ml-11 rounded-r-lg rounded-l-xs overflow-hidden flex bg-[#2b2d31] shadow"
                style={{ borderLeft: `4px solid ${embedColor}` }}
              >
                <div className="p-3.5 flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-zinc-700 flex items-center justify-center text-[10px] text-white font-bold">
                      U
                    </div>
                    <span className="text-xs font-bold text-white">Membro Da Comunidade</span>
                  </div>

                  {embedTitle && (
                    <h4 className="text-sm font-bold text-white">{embedTitle}</h4>
                  )}

                  <p className="text-sm text-[#dbdee1] leading-relaxed">
                    Essa é uma mensagem de exemplo altamente votada pela comunidade que foi parar no canal de destaques! ⭐
                  </p>

                  <div className="text-[11px] text-[#949ba4] flex items-center justify-between pt-1 border-t border-[#3f4147]/50">
                    <span>{embedFooter || 'ID da Mensagem: 1234567890'}</span>
                    <span>Hoje às 08:42</span>
                  </div>
                </div>
              </div>

              <div className="ml-11 mt-2.5 flex items-center gap-3">
                <button
                  type="button"
                  className="min-h-[38px] px-4 py-2 text-xs font-medium rounded-lg text-white bg-[#4e5058] hover:bg-[#6d6f78] flex items-center gap-1.5 transition-colors"
                >
                  <span>Jump to message</span>
                </button>
                {customButtonUrl && (
                  <a
                    href={customButtonUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="min-h-[38px] px-4 py-2 text-xs font-medium rounded-lg text-white bg-[#4e5058] hover:bg-[#6d6f78] flex items-center gap-1.5 transition-colors"
                  >
                    <span>{customButtonLabel || 'Seu botão'}</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
