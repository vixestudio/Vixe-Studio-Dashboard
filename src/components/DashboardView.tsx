import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { CategoryId, PluginItem } from '../types';
import { CATEGORIES } from '../data/pluginsData';
import { HeroBanner } from './HeroBanner';
import { DynamicIcon } from './DynamicIcon';

interface DashboardViewProps {
  plugins: PluginItem[];
  selectedCategory: CategoryId;
  onSelectCategory: (cat: CategoryId) => void;
  onConfigurePlugin: (plugin: PluginItem) => void;
  onTogglePluginActive: (pluginId: string, newState: boolean) => void;
  onOpenDirectImageModal: () => void;
  onNavigateToScreen: (screenId: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  plugins,
  selectedCategory,
  onSelectCategory,
  onConfigurePlugin,
  onTogglePluginActive,
  onOpenDirectImageModal,
  onNavigateToScreen,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  // Auto-scroll the selected tab button into center view when category changes
  useEffect(() => {
    const activeEl = tabRefs.current[selectedCategory];
    if (activeEl && tabsContainerRef.current) {
      activeEl.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });
    }
  }, [selectedCategory]);

  // Filtered plugins based on category and search
  const filteredPlugins = useMemo(() => {
    return plugins.filter((plugin) => {
      // Search text match
      const matchesSearch =
        plugin.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        plugin.description.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      // Category tab match
      if (selectedCategory === 'todos') return true;
      return plugin.category === selectedCategory;
    });
  }, [plugins, selectedCategory, searchQuery]);

  // Group plugins by category for structured layout
  const groupedSections = useMemo(() => {
    if (selectedCategory !== 'todos') {
      const catInfo = CATEGORIES.find((c) => c.id === selectedCategory);
      return [
        {
          id: selectedCategory,
          name: catInfo ? catInfo.name : 'Plugins',
          items: filteredPlugins,
        },
      ];
    }

    // Default 'Todos Os Plugins': display categorized sections matching screenshot
    const sections: Array<{ id: CategoryId; name: string; items: PluginItem[] }> = [
      {
        id: 'essenciais',
        name: 'Essenciais',
        items: filteredPlugins.filter((p) => p.category === 'essenciais'),
      },
      {
        id: 'gerenciar',
        name: 'Gerenciar Servidor',
        items: filteredPlugins.filter((p) => p.category === 'gerenciar'),
      },
      {
        id: 'utilidades',
        name: 'Utilidades',
        items: filteredPlugins.filter((p) => p.category === 'utilidades'),
      },
      {
        id: 'sociais',
        name: 'Alertas Sociais',
        items: filteredPlugins.filter((p) => p.category === 'sociais'),
      },
      {
        id: 'engajamento',
        name: 'Engajamento & Diversão',
        items: filteredPlugins.filter((p) => p.category === 'engajamento'),
      },
      {
        id: 'ia',
        name: 'IA Vixe',
        items: filteredPlugins.filter((p) => p.category === 'ia'),
      },
      {
        id: 'monetizacao',
        name: 'Monetização',
        items: filteredPlugins.filter((p) => p.category === 'monetizacao'),
      },
    ];

    return sections.filter((sec) => sec.items.length > 0);
  }, [selectedCategory, filteredPlugins]);

  return (
    <div className="space-y-8 pb-16 animate-fadeIn">
      {/* Top Radiant Hero Banner */}
      <HeroBanner onOpenDirectImageModal={onOpenDirectImageModal} />

      {/* Plugins Section Header & Tabs */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight font-display">
              Plugins
            </h2>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-dark-800 border border-zinc-700 text-zinc-300">
              {plugins.filter((p) => p.isActive).length} ativos
            </span>
          </div>

          {/* Quick Search */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Pesquisar plugins..."
              className="w-full bg-dark-800 border border-zinc-700 focus:border-zinc-500 rounded-xl pl-9 pr-4 py-2 text-xs text-zinc-100 placeholder-zinc-400 focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Category Horizontal Filter Tabs */}
        <div className="border-b border-zinc-800 pb-2">
          {/* Scrollable Tabs List */}
          <div
            ref={tabsContainerRef}
            className="flex items-center gap-1.5 overflow-x-auto scroll-smooth scrollbar-none text-xs w-full py-0.5"
          >
            {CATEGORIES.map((category) => {
              const isSelected = selectedCategory === category.id;
              const count =
                category.id === 'todos'
                  ? plugins.length
                  : plugins.filter((p) => p.category === category.id).length;

              return (
                <button
                  key={category.id}
                  ref={(el) => {
                    tabRefs.current[category.id] = el;
                  }}
                  onClick={() => onSelectCategory(category.id)}
                  className={`px-3.5 py-2 rounded-xl whitespace-nowrap font-medium transition-all cursor-pointer shrink-0 flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-zinc-800 text-white border border-zinc-600 shadow-xs font-semibold ring-1 ring-zinc-500/30'
                      : 'text-zinc-400 hover:text-white hover:bg-dark-800 border border-transparent'
                  }`}
                >
                  <span>{category.name}</span>
                  {count > 0 && (
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold ${
                        isSelected
                          ? 'bg-zinc-700 text-zinc-200'
                          : 'bg-dark-700 text-zinc-400'
                      }`}
                    >
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Render Categorized Grid Sections */}
      <div className="space-y-10">
        {groupedSections.length === 0 ? (
          <div className="bg-dark-800 border border-zinc-800 rounded-2xl p-12 text-center space-y-3">
            <SlidersHorizontal className="w-8 h-8 text-zinc-400 mx-auto" />
            <h3 className="text-base font-bold text-white">Nenhum plugin encontrado</h3>
            <p className="text-xs text-zinc-300 max-w-sm mx-auto">
              Não encontramos nenhum plugin com o termo "{searchQuery}". Tente buscar por palavras como "boas-vindas", "embed", "moderador" ou "níveis".
            </p>
          </div>
        ) : (
          groupedSections.map((section) => (
            <div key={section.id} id={`section-${section.id}`} className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white font-display flex items-center gap-2">
                  <span>{section.name}</span>
                  <span className="text-xs font-normal text-zinc-400">
                    ({section.items.length})
                  </span>
                </h3>
              </div>

              {/* Fluid responsive grid (auto-fill, minmax(280px, 1fr)) */}
              <div className="grid gap-4 [grid-template-columns:repeat(auto-fill,minmax(280px,1fr))]">
                {section.items.map((plugin) => (
                  <div
                    key={plugin.id}
                    className="bg-dark-800 border border-zinc-800 hover:border-zinc-700 rounded-xl p-4 flex flex-col justify-between transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 group relative"
                  >
                    {/* Top Row: Icon and Badges */}
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <div
                          className={`w-10 h-10 rounded-xl ${
                            plugin.iconBgColor || 'bg-dark-700'
                          } flex items-center justify-center ${
                            plugin.iconTextColor || 'text-zinc-200'
                          } transition-transform group-hover:scale-105 border border-zinc-700/60`}
                        >
                          <DynamicIcon name={plugin.iconName} className="w-5 h-5" />
                        </div>

                        <div className="flex items-center gap-1.5">
                          {plugin.isNew && (
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-dark-700 text-zinc-300 border border-zinc-700">
                              Novo!
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Title */}
                      <h4 className="text-sm font-bold text-white group-hover:text-zinc-100 transition-colors mb-1.5 font-display">
                        {plugin.title}
                      </h4>

                      {/* Description */}
                      <p className="text-xs text-zinc-300 line-clamp-2 leading-relaxed">
                        {plugin.description}
                      </p>
                    </div>

                    {/* Action Button at bottom: subtle secondary styling for + Ativar */}
                    <div className="mt-5 pt-3 border-t border-zinc-800">
                      <button
                        onClick={() => onConfigurePlugin(plugin)}
                        className={`w-full py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                          plugin.isActive
                            ? 'bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-600 shadow-xs'
                            : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white border border-zinc-700 shadow-xs active:scale-[0.98]'
                        }`}
                      >
                        {plugin.isActive && (
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                        )}
                        <span>{plugin.isActive ? 'Configurar' : '+ Ativar'}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
