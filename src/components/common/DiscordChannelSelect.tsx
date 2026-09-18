import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Hash, Search, X, Volume2, Megaphone } from 'lucide-react';
import { ServerCategory } from '../../types';
import { SERVER_CATEGORIES as DEFAULT_CATEGORIES, SERVER_CHANNELS as DEFAULT_CHANNELS } from '../../data/mockData';

export interface DiscordChannelSelectProps {
  id?: string;
  value: string | string[];
  onChange: (value: any) => void;
  multiple?: boolean;
  placeholder?: string;
  label?: string;
  required?: boolean;
  categories?: ServerCategory[];
  channels?: string[];
  className?: string;
  disabled?: boolean;
}

export const DiscordChannelSelect: React.FC<DiscordChannelSelectProps> = ({
  id,
  value,
  onChange,
  multiple = false,
  placeholder = 'Selecione um canal...',
  label,
  required = false,
  categories = DEFAULT_CATEGORIES,
  channels = DEFAULT_CHANNELS,
  className = '',
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const selectedArray = Array.isArray(value) ? value : value ? [value] : [];

  const handleSelectChannel = (channel: string) => {
    if (multiple) {
      if (selectedArray.includes(channel)) {
        onChange(selectedArray.filter((c) => c !== channel));
      } else {
        onChange([...selectedArray, channel]);
      }
    } else {
      onChange(channel);
      setIsOpen(false);
    }
  };

  const handleRemoveChannel = (channel: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (multiple) {
      onChange(selectedArray.filter((c) => c !== channel));
    } else {
      onChange('');
    }
  };

  // Filter channels based on search
  const filteredCategories = categories.map((cat) => ({
    ...cat,
    channels: cat.channels.filter((c) =>
      c.toLowerCase().includes(search.toLowerCase())
    ),
  })).filter((cat) => cat.channels.length > 0);

  const filteredFlatChannels = channels.filter((c) =>
    c.toLowerCase().includes(search.toLowerCase())
  );

  const renderChannelIcon = (chName: string) => {
    if (chName.includes('🔊') || chName.toLowerCase().includes('voice')) {
      return <Volume2 className="w-3.5 h-3.5 text-dark-400 flex-shrink-0" />;
    }
    if (chName.includes('📢') || chName.toLowerCase().includes('aviso')) {
      return <Megaphone className="w-3.5 h-3.5 text-dark-400 flex-shrink-0" />;
    }
    return <Hash className="w-3.5 h-3.5 text-dark-400 flex-shrink-0" />;
  };

  return (
    <div className={`relative w-full ${className}`} ref={containerRef} id={id}>
      {label && (
        <label className="text-sm font-medium text-dark-300 mb-2 flex items-center gap-1">
          <span>{label}</span>
          {required && <span className="text-rose-500 font-bold">*</span>}
        </label>
      )}

      {/* Trigger Box */}
      <div
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`rounded-lg cursor-pointer bg-dark-900 min-h-[44px] px-3 py-1.5 flex items-center justify-between border border-dark-700 hover:border-dark-600 transition duration-200 ${
          disabled ? 'opacity-50 cursor-not-allowed' : ''
        } ${isOpen ? 'ring-2 ring-[#5865F2] border-transparent' : ''}`}
      >
        <div className="flex-1 flex items-center flex-wrap gap-1.5 py-0.5">
          {selectedArray.length === 0 ? (
            <span className="text-sm text-dark-500 select-none">{placeholder}</span>
          ) : multiple ? (
            selectedArray.map((ch) => (
              <span
                key={ch}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-dark-800 text-xs font-medium text-dark-200 border border-dark-700"
              >
                {renderChannelIcon(ch)}
                <span className="truncate max-w-[150px]">{ch}</span>
                <button
                  type="button"
                  onClick={(e) => handleRemoveChannel(ch, e)}
                  className="text-dark-400 hover:text-white ml-0.5 p-0.5 rounded"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))
          ) : (
            <span className="inline-flex items-center gap-2 text-sm text-dark-100 font-medium truncate">
              {renderChannelIcon(selectedArray[0])}
              <span className="truncate">{selectedArray[0]}</span>
            </span>
          )}
        </div>

        <ChevronDown
          className={`w-4 h-4 text-dark-400 transform transition-transform duration-200 flex-shrink-0 ml-2 ${
            isOpen ? 'rotate-180 text-dark-200' : ''
          }`}
        />
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute left-0 top-[calc(100%+6px)] z-50 w-full rounded-xl bg-dark-900 border border-dark-700 shadow-2xl max-h-[320px] overflow-hidden flex flex-col animate-in fade-in duration-150">
          {/* Search Box */}
          <div className="p-2 border-b border-dark-800 bg-dark-950/50">
            <div className="relative">
              <Search className="w-4 h-4 text-dark-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Pesquisar canais..."
                className="w-full pl-8 pr-3 py-1.5 bg-dark-900 text-xs text-dark-100 placeholder-dark-500 rounded-lg border border-dark-700 focus:outline-none focus:border-[#5865F2]"
                autoFocus
              />
            </div>
          </div>

          {/* Channels List */}
          <div className="overflow-y-auto p-2 space-y-3 max-h-[260px]">
            {filteredCategories.length > 0 ? (
              filteredCategories.map((cat, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="uppercase text-[11px] font-bold text-dark-400 px-2 py-0.5 tracking-wider">
                    {cat.name}
                  </div>
                  <div className="space-y-0.5">
                    {cat.channels.map((ch) => {
                      const isSelected = selectedArray.includes(ch);
                      return (
                        <button
                          key={ch}
                          type="button"
                          onClick={() => handleSelectChannel(ch)}
                          className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between transition-colors ${
                            isSelected
                              ? 'bg-[#5865F2] text-white font-medium shadow-sm'
                              : 'text-dark-300 hover:bg-dark-800 hover:text-dark-100'
                          }`}
                        >
                          <span className="flex items-center gap-2 truncate">
                            {renderChannelIcon(ch)}
                            <span className="truncate">{ch}</span>
                          </span>
                          {isSelected && multiple && (
                            <span className="text-white text-[10px] bg-white/20 px-1.5 py-0.5 rounded">
                              Selecionado
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))
            ) : filteredFlatChannels.length > 0 ? (
              <div className="space-y-0.5">
                {filteredFlatChannels.map((ch) => {
                  const isSelected = selectedArray.includes(ch);
                  return (
                    <button
                      key={ch}
                      type="button"
                      onClick={() => handleSelectChannel(ch)}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between transition-colors ${
                        isSelected
                          ? 'bg-[#5865F2] text-white font-medium'
                          : 'text-dark-300 hover:bg-dark-800 hover:text-dark-100'
                      }`}
                    >
                      <span className="flex items-center gap-2 truncate">
                        {renderChannelIcon(ch)}
                        <span className="truncate">{ch}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="p-4 text-center text-xs text-dark-500">
                Nenhum canal encontrado.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
