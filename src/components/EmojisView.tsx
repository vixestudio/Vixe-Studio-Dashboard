import React, { useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  Search,
  Plus,
  Trash2,
  Edit2,
  Sparkles,
  Smile,
  Check,
  X,
  Upload,
} from 'lucide-react';
import { ServerInfo } from '../types';
import { CommandConfigPage } from './CommandConfigPage';
import { DiscordSwitch } from './common';

interface EmojisViewProps {
  currentServer?: ServerInfo | null;
  onBackToDashboard?: () => void;
}

interface ServerEmoji {
  id: string;
  name: string;
  url: string;
  isAnimated: boolean;
  author: string;
}

interface GalleryEmoji {
  id: string;
  name: string;
  url: string;
  category: string;
  isAnimated: boolean;
}

const INITIAL_SERVER_EMOJIS: ServerEmoji[] = [
  {
    id: 'e1',
    name: 'pepe_hype',
    url: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f973.png',
    isAnimated: false,
    author: 'Admin',
  },
  {
    id: 'e2',
    name: 'party_blob',
    url: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f389.png',
    isAnimated: true,
    author: 'Moderator',
  },
  {
    id: 'e3',
    name: 'fire_crown',
    url: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f525.png',
    isAnimated: false,
    author: 'Admin',
  },
  {
    id: 'e4',
    name: 'vip_star',
    url: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/2b50.png',
    isAnimated: false,
    author: 'VixeBot',
  },
  {
    id: 'e5',
    name: 'pepe_sip',
    url: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/2615.png',
    isAnimated: true,
    author: 'Admin',
  },
  {
    id: 'e6',
    name: 'cyber_heart',
    url: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f496.png',
    isAnimated: false,
    author: 'Admin',
  },
];

const GALLERY_PACKS: GalleryEmoji[] = [
  {
    id: 'g1',
    name: 'pepe_cool',
    url: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f60e.png',
    category: 'Memes',
    isAnimated: false,
  },
  {
    id: 'g2',
    name: 'cyber_sparkle',
    url: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/2728.png',
    category: 'Anime',
    isAnimated: true,
  },
  {
    id: 'g3',
    name: 'rocket_launch',
    url: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f680.png',
    category: 'Jogos',
    isAnimated: false,
  },
  {
    id: 'g4',
    name: 'gold_trophy',
    url: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f3c6.png',
    category: 'Jogos',
    isAnimated: false,
  },
  {
    id: 'g5',
    name: 'ninja_cat',
    url: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f431.png',
    category: 'Fofos',
    isAnimated: true,
  },
  {
    id: 'g6',
    name: 'pepe_cry',
    url: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f622.png',
    category: 'Memes',
    isAnimated: false,
  },
  {
    id: 'g7',
    name: 'laser_eyes',
    url: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f440.png',
    category: 'Memes',
    isAnimated: true,
  },
  {
    id: 'g8',
    name: 'cyber_skull',
    url: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f480.png',
    category: 'Jogos',
    isAnimated: false,
  },
];

export const EmojisView: React.FC<EmojisViewProps> = ({
  currentServer,
  onBackToDashboard,
}) => {
  const [activeTab, setActiveTab] = useState<'gallery' | 'my_emojis' | 'commands'>('commands');
  const [commandsOpen, setCommandsOpen] = useState(true);
  const [addEmojiEnabled, setAddEmojiEnabled] = useState(true);
  const [removeEmojiEnabled, setRemoveEmojiEnabled] = useState(true);
  const [emojiInfoEnabled, setEmojiInfoEnabled] = useState(true);

  // My emojis state
  const [serverEmojis, setServerEmojis] = useState<ServerEmoji[]>(INITIAL_SERVER_EMOJIS);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [newEmojiName, setNewEmojiName] = useState('');
  const [newEmojiUrl, setNewEmojiUrl] = useState('');
  const [newEmojiAnimated, setNewEmojiAnimated] = useState(false);

  // Gallery state
  const [galleryFilter, setGalleryFilter] = useState('Todos');
  const [gallerySearch, setGallerySearch] = useState('');
  const [addedIds, setAddedIds] = useState<string[]>([]);

  // Command editing state
  const [editingCommand, setEditingCommand] = useState<string | null>(null);

  const handleAddFromGallery = (emoji: GalleryEmoji) => {
    if (addedIds.includes(emoji.id)) return;
    setAddedIds((prev) => [...prev, emoji.id]);
    setServerEmojis((prev) => [
      ...prev,
      {
        id: `custom_${Date.now()}_${emoji.id}`,
        name: emoji.name,
        url: emoji.url,
        isAnimated: emoji.isAnimated,
        author: 'Painel Vixe',
      },
    ]);
  };

  const handleUploadEmoji = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmojiName.trim()) return;

    const emojiToAdd: ServerEmoji = {
      id: `custom_${Date.now()}`,
      name: newEmojiName.trim().toLowerCase().replace(/\s+/g, '_'),
      url:
        newEmojiUrl.trim() ||
        'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/2728.png',
      isAnimated: newEmojiAnimated,
      author: 'Você',
    };

    setServerEmojis((prev) => [emojiToAdd, ...prev]);
    setNewEmojiName('');
    setNewEmojiUrl('');
    setNewEmojiAnimated(false);
    setShowUploadModal(false);
  };

  const handleDeleteEmoji = (id: string) => {
    setServerEmojis((prev) => prev.filter((e) => e.id !== id));
  };

  const filteredGallery = GALLERY_PACKS.filter((e) => {
    const matchesCategory = galleryFilter === 'Todos' || e.category === galleryFilter;
    const matchesSearch = e.name.toLowerCase().includes(gallerySearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const staticCount = serverEmojis.filter((e) => !e.isAnimated).length;
  const animatedCount = serverEmojis.filter((e) => e.isAnimated).length;

  if (editingCommand) {
    return (
      <CommandConfigPage
        commandName={editingCommand}
        onBack={() => setEditingCommand(null)}
      />
    );
  }

  return (
    <div
      className="flex flex-1 overflow-y-auto relative px-6 lg:px-10 py-6 lg:py-10 animate-fadeIn"
      id="dashboard__content"
    >
      <div className="min-h-full w-full max-w-[1540px] mx-auto">
        <div className="w-full min-h-full transition-all flex flex-col opacity-100">
          {/* Header */}
          <div className="flex justify-between mb-8 lg:mb-6">
            <div className="flex flex-col grow items-start">
              <div className="flex items-center gap-3 mb-2">
                <h4 className="font-bold text-white text-2xl lg:text-3xl flex items-center gap-2">
                  <Smile className="w-7 h-7 text-brand-light" />
                  <span>Emojis</span>
                </h4>
              </div>
              <p className="text-sm lg:text-base text-zinc-400 max-w-[830px] ml-0 w-full mt-1">
                Melhore seu servidor adicionando emojis personalizados
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="mt-4">
            <div className="relative max-sm:mb-[120px]">
              <div className="relative flex items-center justify-start border-b border-zinc-800 mb-8 overflow-auto no-scrollbar scroll-smooth">
                <div>
                  <button
                    onClick={() => setActiveTab('gallery')}
                    className={`transition-all duration-200 hover:text-white font-medium capitalize text-base cursor-pointer px-4 pb-3 flex items-center justify-start whitespace-nowrap ${
                      activeTab === 'gallery' ? 'text-white font-bold' : 'text-zinc-400'
                    }`}
                  >
                    Galeria
                  </button>
                </div>
                <div>
                  <button
                    onClick={() => setActiveTab('my_emojis')}
                    className={`transition-all duration-200 hover:text-white font-medium capitalize text-base cursor-pointer px-4 pb-3 flex items-center justify-start whitespace-nowrap ${
                      activeTab === 'my_emojis' ? 'text-white font-bold' : 'text-zinc-400'
                    }`}
                  >
                    Meus emojis
                  </button>
                </div>
                <div>
                  <button
                    onClick={() => setActiveTab('commands')}
                    className={`transition-all duration-200 hover:text-white font-medium capitalize text-base cursor-pointer px-4 pb-3 flex items-center justify-start whitespace-nowrap ${
                      activeTab === 'commands' ? 'text-white font-bold' : 'text-zinc-400'
                    }`}
                  >
                    Comandos
                  </button>
                </div>

                {/* Animated Indicator */}
                <div
                  className="h-0.5 bg-white rounded-full absolute bottom-0 transition-all duration-200"
                  style={{
                    width:
                      activeTab === 'gallery'
                        ? '84px'
                        : activeTab === 'my_emojis'
                        ? '122px'
                        : '110px',
                    left:
                      activeTab === 'gallery'
                        ? '0px'
                        : activeTab === 'my_emojis'
                        ? '84px'
                        : '206px',
                  }}
                />
              </div>

              {/* TAB 1: COMMANDS */}
              {activeTab === 'commands' && (
                <div
                  className="bg-dark-800 shadow-xs border border-zinc-800/80 rounded-xl mb-4 overflow-hidden"
                  id="plugins.commands"
                >
                  <h3
                    onClick={() => setCommandsOpen(!commandsOpen)}
                    className="text-white flex justify-between items-center hover:bg-zinc-800/40 transition-all py-4 lg:py-5 px-6 cursor-pointer select-none"
                  >
                    <div className="flex flex-col w-full pr-4 max-w-[760px]">
                      <div className="flex items-center gap-2 text-lg font-semibold text-white">
                        <span>Comandos</span>
                      </div>
                      <p className="text-xs text-zinc-400 mt-0.5">
                        Gerencie comandos slash que permitem adicionar e interagir com emojis
                      </p>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <div className="p-1 text-zinc-400 hover:text-white transition-colors">
                        {commandsOpen ? (
                          <ChevronUp className="w-5 h-5" />
                        ) : (
                          <ChevronDown className="w-5 h-5" />
                        )}
                      </div>
                    </div>
                  </h3>

                  {commandsOpen && (
                    <div className="p-6 pt-0 border-t border-zinc-800/60">
                      <div className="flex flex-col gap-3 mt-4">
                        {/* Command: /add_emoji */}
                        <div className="flex items-center justify-between w-full shadow-xs relative rounded-xl p-5 bg-dark-900 border border-zinc-800/80 transition-all hover:border-zinc-700">
                          <div className="flex flex-col pr-4">
                            <h5 className="flex items-center gap-2 text-base font-bold text-white">
                              <span>/add_emoji</span>
                              {/* Premium / Sparkle Icon */}
                              <span
                                className="inline-flex items-center justify-center p-1 rounded-md bg-amber-500/10 text-amber-400"
                                title="Recurso Avançado"
                              >
                                <Sparkles className="w-4 h-4 text-amber-400" />
                              </span>
                            </h5>
                            <p className="text-sm text-zinc-400 mt-1">
                              Copie e cole o emoji que deseja adicionar ao seu servidor
                            </p>
                          </div>

                          <div className="flex items-center gap-3 shrink-0">
                            {/* Toggle Switch */}
                            <DiscordSwitch
                              checked={addEmojiEnabled}
                              onChange={setAddEmojiEnabled}
                              activeColor="brand"
                            />

                            {/* Edit Pencil Button */}
                            <button
                              type="button"
                              onClick={() => setEditingCommand('/add_emoji')}
                              className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                              title="Configurar permissões do comando"
                            >
                              <Edit2 className="w-4 h-4 text-zinc-300" />
                            </button>
                          </div>
                        </div>

                        {/* Command: /remove_emoji */}
                        <div className="flex items-center justify-between w-full shadow-xs relative rounded-xl p-5 bg-dark-900 border border-zinc-800/80 transition-all hover:border-zinc-700">
                          <div className="flex flex-col pr-4">
                            <h5 className="flex items-center gap-2 text-base font-bold text-white">
                              <span>/remove_emoji</span>
                            </h5>
                            <p className="text-sm text-zinc-400 mt-1">
                              Remova rapidamente um emoji personalizado existente do servidor
                            </p>
                          </div>

                          <div className="flex items-center gap-3 shrink-0">
                            <DiscordSwitch
                              checked={removeEmojiEnabled}
                              onChange={setRemoveEmojiEnabled}
                              activeColor="brand"
                            />

                            <button
                              type="button"
                              onClick={() => setEditingCommand('/remove_emoji')}
                              className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                              title="Configurar permissões do comando"
                            >
                              <Edit2 className="w-4 h-4 text-zinc-300" />
                            </button>
                          </div>
                        </div>

                        {/* Command: /emoji_info */}
                        <div className="flex items-center justify-between w-full shadow-xs relative rounded-xl p-5 bg-dark-900 border border-zinc-800/80 transition-all hover:border-zinc-700">
                          <div className="flex flex-col pr-4">
                            <h5 className="flex items-center gap-2 text-base font-bold text-white">
                              <span>/emoji_info</span>
                            </h5>
                            <p className="text-sm text-zinc-400 mt-1">
                              Exibe autor, data de criação e estatísticas de uso de um emoji
                            </p>
                          </div>

                          <div className="flex items-center gap-3 shrink-0">
                            <DiscordSwitch
                              checked={emojiInfoEnabled}
                              onChange={setEmojiInfoEnabled}
                              activeColor="brand"
                            />

                            <button
                              type="button"
                              onClick={() => setEditingCommand('/emoji_info')}
                              className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                              title="Configurar permissões do comando"
                            >
                              <Edit2 className="w-4 h-4 text-zinc-300" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: GALLERY */}
              {activeTab === 'gallery' && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="relative flex-1 max-w-md">
                      <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
                      <input
                        type="text"
                        value={gallerySearch}
                        onChange={(e) => setGallerySearch(e.target.value)}
                        placeholder="Buscar emojis na galeria..."
                        className="w-full pl-10 pr-4 py-2 bg-dark-800 border border-zinc-800 rounded-lg text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-brand-default"
                      />
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      {['Todos', 'Memes', 'Anime', 'Jogos', 'Fofos'].map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setGalleryFilter(cat)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                            galleryFilter === cat
                              ? 'bg-brand-default text-dark-900 font-bold shadow-sm'
                              : 'bg-dark-800 text-zinc-400 hover:text-white hover:bg-zinc-700'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {filteredGallery.map((emoji) => {
                      const isAdded = addedIds.includes(emoji.id);
                      return (
                        <div
                          key={emoji.id}
                          className="bg-dark-800 border border-zinc-800 rounded-xl p-4 flex flex-col items-center gap-3 hover:border-zinc-700 transition-all text-center group"
                        >
                          <div className="w-14 h-14 rounded-lg bg-dark-900 flex items-center justify-center p-2">
                            <img
                              src={emoji.url}
                              alt={emoji.name}
                              className="w-10 h-10 object-contain"
                              crossOrigin="anonymous"
                            />
                          </div>
                          <div className="w-full">
                            <p className="text-xs font-bold text-white truncate">:{emoji.name}:</p>
                            <span className="text-[10px] text-zinc-400">{emoji.category}</span>
                          </div>
                          <button
                            onClick={() => handleAddFromGallery(emoji)}
                            disabled={isAdded}
                            className={`w-full py-1.5 px-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                              isAdded
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 cursor-default'
                                : 'bg-brand-default hover:bg-brand-hover text-dark-900 shadow-sm'
                            }`}
                          >
                            {isAdded ? (
                              <>
                                <Check className="w-3.5 h-3.5" />
                                <span>Adicionado</span>
                              </>
                            ) : (
                              <>
                                <Plus className="w-3.5 h-3.5" />
                                <span>Adicionar</span>
                              </>
                            )}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TAB 3: MY EMOJIS */}
              {activeTab === 'my_emojis' && (
                <div className="space-y-6">
                  {/* Slots Tracker & Upload Button */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-dark-800 border border-zinc-800 rounded-xl p-4 flex items-center justify-between">
                      <div>
                        <p className="text-xs text-zinc-400">Emojis Estáticos</p>
                        <h4 className="text-xl font-bold text-white mt-0.5">
                          {staticCount} <span className="text-xs text-zinc-500 font-normal">/ 50</span>
                        </h4>
                      </div>
                      <div className="w-10 h-10 rounded-lg bg-brand-default/10 text-brand-default flex items-center justify-center font-bold text-sm">
                        {Math.round((staticCount / 50) * 100)}%
                      </div>
                    </div>

                    <div className="bg-dark-800 border border-zinc-800 rounded-xl p-4 flex items-center justify-between">
                      <div>
                        <p className="text-xs text-zinc-400">Emojis Animados</p>
                        <h4 className="text-xl font-bold text-white mt-0.5">
                          {animatedCount} <span className="text-xs text-zinc-500 font-normal">/ 50</span>
                        </h4>
                      </div>
                      <div className="w-10 h-10 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold text-sm">
                        {Math.round((animatedCount / 50) * 100)}%
                      </div>
                    </div>

                    <div className="flex items-center">
                      <button
                        onClick={() => setShowUploadModal(true)}
                        className="w-full h-full min-h-[64px] rounded-xl bg-brand-default hover:bg-brand-hover text-dark-900 font-bold text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm"
                      >
                        <Upload className="w-4 h-4" />
                        <span>Fazer Upload de Emoji</span>
                      </button>
                    </div>
                  </div>

                  {/* List of Emojis */}
                  <div className="bg-dark-800 border border-zinc-800 rounded-xl p-6">
                    <h3 className="text-base font-bold text-white mb-4">
                      Emojis do Servidor ({serverEmojis.length})
                    </h3>

                    {serverEmojis.length === 0 ? (
                      <div className="text-center py-12 text-zinc-400 space-y-2">
                        <Smile className="w-10 h-10 mx-auto text-zinc-600" />
                        <p className="text-sm">Nenhum emoji personalizado cadastrado ainda.</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {serverEmojis.map((emoji) => (
                          <div
                            key={emoji.id}
                            className="bg-dark-900 border border-zinc-800/80 rounded-lg p-3 flex items-center justify-between hover:border-zinc-700 transition-colors"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <div className="w-10 h-10 rounded-md bg-dark-800 flex items-center justify-center p-1.5 shrink-0">
                                <img
                                  src={emoji.url}
                                  alt={emoji.name}
                                  className="w-full h-full object-contain"
                                  crossOrigin="anonymous"
                                />
                              </div>
                              <div className="min-w-0">
                                <p className="text-sm font-semibold text-white truncate">
                                  :{emoji.name}:
                                </p>
                                <span className="text-[10px] text-zinc-400">
                                  Por {emoji.author} • {emoji.isAnimated ? 'Animado' : 'Estático'}
                                </span>
                              </div>
                            </div>

                            <button
                              onClick={() => handleDeleteEmoji(emoji.id)}
                              className="p-1.5 text-zinc-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-md transition-colors cursor-pointer ml-2 shrink-0"
                              title="Remover emoji"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="h-10" />
        </div>
      </div>

      {/* Upload Emoji Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
          <div className="bg-dark-800 border border-zinc-800 rounded-2xl w-full max-w-md p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Upload className="w-5 h-5 text-brand-default" />
                <span>Adicionar Novo Emoji</span>
              </h3>
              <button
                onClick={() => setShowUploadModal(false)}
                className="text-zinc-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUploadEmoji} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">
                  Nome do Emoji
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 text-sm">
                    :
                  </span>
                  <input
                    type="text"
                    required
                    value={newEmojiName}
                    onChange={(e) => setNewEmojiName(e.target.value)}
                    placeholder="meu_emoji"
                    className="w-full pl-6 pr-6 py-2.5 bg-dark-900 border border-zinc-700 rounded-lg text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-brand-default"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 text-sm">
                    :
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">
                  URL da Imagem ou GIF
                </label>
                <input
                  type="url"
                  value={newEmojiUrl}
                  onChange={(e) => setNewEmojiUrl(e.target.value)}
                  placeholder="https://exemplo.com/emoji.png"
                  className="w-full px-3.5 py-2.5 bg-dark-900 border border-zinc-700 rounded-lg text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-brand-default"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="animated_check"
                  checked={newEmojiAnimated}
                  onChange={(e) => setNewEmojiAnimated(e.target.checked)}
                  className="w-4 h-4 rounded bg-dark-900 border-zinc-700 accent-white"
                />
                <label htmlFor="animated_check" className="text-xs text-zinc-300 cursor-pointer">
                  Emoji Animado (.gif)
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 rounded-lg text-sm text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg text-sm font-bold bg-brand-default hover:bg-brand-hover text-dark-900 transition-colors cursor-pointer shadow-sm"
                >
                  Salvar Emoji
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
