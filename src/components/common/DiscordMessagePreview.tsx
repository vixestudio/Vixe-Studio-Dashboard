import React from 'react';
import { ExternalLink } from 'lucide-react';
import { DiscordEmbedButton, DiscordEmbedData } from '../../types';

export interface DiscordMessagePreviewProps {
  botName?: string;
  botAvatar?: string;
  isBot?: boolean;
  timestamp?: string;
  messageContent?: string;
  embed?: Partial<DiscordEmbedData>;
  buttons?: DiscordEmbedButton[];
  reactions?: Array<{ emoji: string; count: number; active?: boolean }>;
  className?: string;
}

export const DiscordMessagePreview: React.FC<DiscordMessagePreviewProps> = ({
  botName = 'Vixe Bot',
  botAvatar = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
  isBot = true,
  timestamp = 'Hoje às 14:20',
  messageContent,
  embed,
  buttons = [],
  reactions = [],
  className = '',
}) => {
  const embedColor = embed?.color || '#5865F2';

  const buttonStyleClasses = {
    primary: 'bg-[#5865F2] hover:bg-[#4752C4] text-white',
    secondary: 'bg-[#4E5058] hover:bg-[#6D6F78] text-white',
    success: 'bg-[#248046] hover:bg-[#1A6334] text-white',
    danger: 'bg-[#DA373C] hover:bg-[#A12828] text-white',
    link: 'bg-[#4E5058] hover:bg-[#6D6F78] text-white',
  };

  return (
    <div
      className={`bg-[#313338] text-[#DBDEE1] rounded-xl p-4 font-sans text-sm border border-zinc-800 shadow-xl select-none ${className}`}
    >
      <div className="flex items-start gap-3.5">
        {/* Bot Avatar */}
        <div className="relative flex-shrink-0">
          <img
            src={botAvatar}
            alt={botName}
            className="w-10 h-10 rounded-full object-cover shadow-sm bg-dark-950"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80';
            }}
          />
        </div>

        {/* Message Body */}
        <div className="flex-1 min-w-0 space-y-1.5">
          {/* Header (Username + Bot Badge + Timestamp) */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-white hover:underline cursor-pointer text-[15px]">
              {botName}
            </span>
            {isBot && (
              <span className="bg-[#5865F2] text-white text-[10px] font-bold px-1.5 py-0.5 rounded leading-none flex items-center uppercase tracking-wider">
                APP
              </span>
            )}
            <span className="text-xs text-[#949BA4]">{timestamp}</span>
          </div>

          {/* Standard Text Content */}
          {messageContent && (
            <div className="text-[15px] leading-relaxed text-[#DBDEE1] whitespace-pre-wrap break-words">
              {messageContent}
            </div>
          )}

          {/* Embed Container */}
          {embed && (
            <div
              className="bg-[#2B2D31] rounded border-l-4 p-4 mt-2 max-w-xl text-xs space-y-3 relative overflow-hidden shadow-sm"
              style={{ borderLeftColor: embedColor }}
            >
              {/* Author */}
              {embed.authorName && (
                <div className="flex items-center gap-2">
                  {embed.authorIconUrl && (
                    <img
                      src={embed.authorIconUrl}
                      alt={embed.authorName}
                      className="w-5 h-5 rounded-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  )}
                  <span className="font-semibold text-white hover:underline cursor-pointer">
                    {embed.authorName}
                  </span>
                </div>
              )}

              {/* Title & Thumbnail Row */}
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1 min-w-0 space-y-1.5">
                  {embed.title && (
                    <h4 className="font-bold text-white text-base leading-snug hover:text-[#00A8FC] cursor-pointer transition-colors">
                      {embed.title}
                    </h4>
                  )}
                  {embed.description && (
                    <div className="text-[#DBDEE1] text-xs leading-relaxed whitespace-pre-wrap break-words">
                      {embed.description}
                    </div>
                  )}
                </div>

                {embed.thumbnailUrl && (
                  <img
                    src={embed.thumbnailUrl}
                    alt="Thumbnail"
                    className="w-16 h-16 rounded object-cover flex-shrink-0 bg-dark-900 border border-white/5"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                )}
              </div>

              {/* Fields */}
              {embed.fields && embed.fields.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                  {embed.fields.map((field, idx) => (
                    <div
                      key={field.id || idx}
                      className={field.inline ? 'col-span-1' : 'col-span-full'}
                    >
                      <span className="font-bold text-white block mb-0.5 text-xs">
                        {field.name}
                      </span>
                      <span className="text-[#DBDEE1] text-xs leading-relaxed whitespace-pre-wrap block">
                        {field.value}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Large Image / Banner */}
              {embed.imageUrl && (
                <div className="pt-2">
                  <img
                    src={embed.imageUrl}
                    alt="Embed Media"
                    className="rounded max-h-72 w-full object-cover bg-dark-900 border border-white/5"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>
              )}

              {/* Footer */}
              {(embed.footerText || embed.timestamp) && (
                <div className="flex items-center gap-2 pt-2 text-[11px] text-[#949BA4] border-t border-white/5">
                  {embed.footerIconUrl && (
                    <img
                      src={embed.footerIconUrl}
                      alt="Footer icon"
                      className="w-4 h-4 rounded-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  )}
                  <span>
                    {embed.footerText}
                    {embed.footerText && embed.timestamp && ' • '}
                    {embed.timestamp && timestamp}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Action Row / Buttons */}
          {buttons && buttons.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {buttons.map((btn, idx) => {
                const styleClass = buttonStyleClasses[btn.style || 'secondary'];
                return (
                  <a
                    key={idx}
                    href={btn.url || '#'}
                    target={btn.url ? '_blank' : undefined}
                    rel="noreferrer"
                    onClick={(e) => {
                      if (!btn.url) e.preventDefault();
                    }}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold shadow-sm transition-colors ${styleClass} ${
                      btn.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                    }`}
                  >
                    <span>{btn.label}</span>
                    {btn.url && <ExternalLink className="w-3 h-3 opacity-75" />}
                  </a>
                );
              })}
            </div>
          )}

          {/* Reactions */}
          {reactions && reactions.length > 0 && (
            <div className="flex flex-wrap gap-1 pt-2">
              {reactions.map((react, idx) => (
                <div
                  key={idx}
                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium border ${
                    react.active
                      ? 'bg-[#5865F2]/20 border-[#5865F2] text-white'
                      : 'bg-[#2B2D31] border-[#3F4147] text-[#B5BAC1]'
                  }`}
                >
                  <span>{react.emoji}</span>
                  <span>{react.count}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
