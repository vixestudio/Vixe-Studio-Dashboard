import React, { useState } from 'react';
import {
  Copy,
  ExternalLink,
  Image as ImageIcon,
  Plus,
  Save,
  Send,
  Trash2,
  Check,
  Code2,
  Sparkles,
} from 'lucide-react';
import { DiscordEmbedData } from '../types';
import { DEFAULT_EMBED, DIRECT_IMAGE_PRESETS } from '../data/mockData';

interface EmbedBuilderViewProps {
  onOpenDirectImageModal: () => void;
}

export const EmbedBuilderView: React.FC<EmbedBuilderViewProps> = ({
  onOpenDirectImageModal,
}) => {
  const [embed, setEmbed] = useState<DiscordEmbedData>(DEFAULT_EMBED);
  const [channel, setChannel] = useState('#regras-e-anuncios');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [sentSuccess, setSentSuccess] = useState(false);

  const addField = () => {
    setEmbed((prev) => ({
      ...prev,
      fields: [
        ...prev.fields,
        {
          id: `f-${Date.now()}`,
          name: 'Novo Campo',
          value: 'Descrição do campo ou link informativo.',
          inline: true,
        },
      ],
    }));
  };

  const removeField = (id: string) => {
    setEmbed((prev) => ({
      ...prev,
      fields: prev.fields.filter((f) => f.id !== id),
    }));
  };

  const updateField = (id: string, key: 'name' | 'value' | 'inline', val: string | boolean) => {
    setEmbed((prev) => ({
      ...prev,
      fields: prev.fields.map((f) => (f.id === id ? { ...f, [key]: val } : f)),
    }));
  };

  const handleSendToDiscord = () => {
    setSentSuccess(true);
    setTimeout(() => setSentSuccess(false), 3000);
  };

  const exportHtmlSnippet = `<!-- Discord Embed Rendered in HTML -->
<div class="discord-embed" style="border-left: 4px solid ${embed.color}; background: #2b2d31; padding: 16px; border-radius: 4px; max-width: 520px; font-family: sans-serif; color: #dbdee1;">
  <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
    ${embed.authorIconUrl ? `<img src="${embed.authorIconUrl}" alt="${embed.authorName}" style="width: 24px; height: 24px; border-radius: 50%;" />` : ''}
    <span style="font-size: 13px; font-weight: bold; color: #fff;">${embed.authorName}</span>
  </div>
  <h3 style="margin: 0 0 8px 0; color: #fff; font-size: 16px;">${embed.title}</h3>
  <p style="font-size: 14px; margin: 0 0 12px 0; line-height: 1.4;">${embed.description}</p>
  ${embed.imageUrl ? `<img src="${embed.imageUrl}" alt="Embed Banner" style="max-width: 100%; border-radius: 4px; margin-top: 8px;" />` : ''}
  ${embed.thumbnailUrl ? `<img src="${embed.thumbnailUrl}" alt="Thumbnail" style="max-width: 80px; float: right; border-radius: 4px;" />` : ''}
  <div style="margin-top: 12px; font-size: 11px; color: #949ba4;">${embed.footerText}</div>
</div>`;

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(label);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="space-y-8 pb-16 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-dark-700 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded bg-dark-700 text-dark-200 border border-dark-600 text-[11px] font-bold uppercase tracking-wider">
              Utilidades • Mensagens Incorporadas
            </span>
            <span className="px-2 py-0.5 rounded bg-dark-700 text-dark-200 border border-dark-600 text-[10px] font-bold">
              HTML Images OK
            </span>
          </div>
          <h2 className="text-2xl font-extrabold text-white mt-1 font-display">
            Criador de Embeds com Imagens Diretas
          </h2>
          <p className="text-xs text-dark-400 mt-1 max-w-xl">
            Crie anúncios, mensagens de regras e comunicados. Você pode adicionar links diretos de qualquer imagem HTML na Thumbnail, Imagem Principal, Ícone de Autor e Rodapé!
          </p>
        </div>

        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 w-full sm:w-auto">
          <button
            onClick={onOpenDirectImageModal}
            className="flex-1 sm:flex-initial px-3 py-2 bg-dark-800 hover:bg-dark-700 border border-dark-700 text-dark-200 hover:text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <ImageIcon className="w-4 h-4 text-dark-200" />
            <span>Biblioteca de Links</span>
          </button>

          <button
            onClick={handleSendToDiscord}
            className="flex-1 sm:flex-initial px-4 py-2 bg-dark-100 hover:bg-white text-dark-default text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-colors shadow-xs cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>{sentSuccess ? 'Enviado!' : 'Publicar no Servidor'}</span>
          </button>
        </div>
      </div>

      {/* Grid: Editor Form on Left, Live Discord Preview on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Form */}
        <div className="lg:col-span-7 space-y-6">
          {/* Target Channel and Embed Color */}
          <div className="bg-dark-800 border border-dark-700 rounded-2xl p-5 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Destino & Aparência
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-dark-400 block mb-1.5">
                  Canal do Discord
                </label>
                <select
                  value={channel}
                  onChange={(e) => setChannel(e.target.value)}
                  className="w-full bg-dark-default border border-dark-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-dark-500"
                >
                  <option value="#regras-e-anuncios">#regras-e-anuncios</option>
                  <option value="#geral">#geral</option>
                  <option value="#boas-vindas">#boas-vindas</option>
                  <option value="#sorteios">#sorteios</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-medium text-dark-400 block mb-1.5">
                  Cor da Barra Lateral ({embed.color})
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={embed.color}
                    onChange={(e) => setEmbed({ ...embed, color: e.target.value })}
                    className="w-9 h-9 rounded-lg bg-transparent border border-dark-700 cursor-pointer p-0.5"
                  />
                  <input
                    type="text"
                    value={embed.color}
                    onChange={(e) => setEmbed({ ...embed, color: e.target.value })}
                    className="flex-1 bg-dark-default border border-dark-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none font-mono"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Author info with Direct Image Link */}
          <div className="bg-dark-800 border border-dark-700 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Autor & Ícone (Link Direto)
              </h3>
              <span className="text-[11px] text-dark-200 font-mono">HTML &lt;img&gt; Link</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-dark-400 block mb-1">
                  Nome do Autor
                </label>
                <input
                  type="text"
                  value={embed.authorName}
                  onChange={(e) => setEmbed({ ...embed, authorName: e.target.value })}
                  className="w-full bg-dark-default border border-dark-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-dark-500"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-dark-400 block mb-1">
                  URL Direta do Ícone (PNG/JPG)
                </label>
                <input
                  type="url"
                  value={embed.authorIconUrl}
                  onChange={(e) => setEmbed({ ...embed, authorIconUrl: e.target.value })}
                  placeholder="https://.../icone.png"
                  className="w-full bg-dark-default border border-dark-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-dark-500"
                />
              </div>
            </div>
          </div>

          {/* Main Title and Description */}
          <div className="bg-dark-800 border border-dark-700 rounded-2xl p-5 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Conteúdo da Mensagem
            </h3>

            <div>
              <label className="text-xs font-medium text-dark-400 block mb-1">
                Título do Embed
              </label>
              <input
                type="text"
                value={embed.title}
                onChange={(e) => setEmbed({ ...embed, title: e.target.value })}
                className="w-full bg-dark-default border border-dark-700 rounded-xl px-3.5 py-2 text-xs text-white font-semibold focus:outline-none focus:border-dark-500"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-dark-400 block mb-1">
                Descrição (Suporta Quebras de Linha e Links)
              </label>
              <textarea
                rows={4}
                value={embed.description}
                onChange={(e) => setEmbed({ ...embed, description: e.target.value })}
                className="w-full bg-dark-default border border-dark-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-dark-500 leading-relaxed"
              />
            </div>
          </div>

          {/* Direct Images Fields (Thumbnail & Large Banner Image) */}
          <div className="bg-dark-800 border border-dark-700 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-dark-200" />
                <span>Imagens com Link Direto do HTML</span>
              </h3>
              <button
                onClick={onOpenDirectImageModal}
                className="text-xs text-dark-200 hover:underline"
              >
                Ver presets
              </button>
            </div>

            <div>
              <label className="text-xs font-medium text-dark-400 block mb-1">
                Thumbnail Lateral (URL Direta da Imagem)
              </label>
              <input
                type="url"
                value={embed.thumbnailUrl}
                onChange={(e) => setEmbed({ ...embed, thumbnailUrl: e.target.value })}
                placeholder="https://exemplo.com/thumb.jpg"
                className="w-full bg-dark-default border border-dark-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-dark-500"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-dark-400 block mb-1">
                Imagem Principal Grande / Banner (URL Direta da Imagem)
              </label>
              <input
                type="url"
                value={embed.imageUrl}
                onChange={(e) => setEmbed({ ...embed, imageUrl: e.target.value })}
                placeholder="https://exemplo.com/banner.jpg"
                className="w-full bg-dark-default border border-dark-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-dark-500"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-dark-400 block mb-1">
                Texto do Rodapé (Footer)
              </label>
              <input
                type="text"
                value={embed.footerText}
                onChange={(e) => setEmbed({ ...embed, footerText: e.target.value })}
                className="w-full bg-dark-default border border-dark-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-dark-500"
              />
            </div>
          </div>

          {/* Dynamic Fields */}
          <div className="bg-dark-800 border border-dark-700 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Campos Personalizados ({embed.fields.length})
              </h3>
              <button
                onClick={addField}
                className="px-2.5 py-1 bg-dark-100 hover:bg-white text-dark-default rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Adicionar Campo</span>
              </button>
            </div>

            <div className="space-y-3">
              {embed.fields.map((f) => (
                <div
                  key={f.id}
                  className="p-3 bg-dark-default border border-dark-700 rounded-xl space-y-2"
                >
                  <div className="flex flex-wrap sm:flex-nowrap items-center gap-2">
                    <input
                      type="text"
                      value={f.name}
                      onChange={(e) => updateField(f.id, 'name', e.target.value)}
                      placeholder="Título do Campo"
                      className="flex-1 min-w-[130px] bg-dark-800 border border-dark-700 rounded-lg px-2.5 py-1.5 text-xs text-white font-medium focus:outline-none"
                    />
                    <div className="flex items-center gap-2">
                      <label className="flex items-center gap-1.5 text-[11px] text-dark-400 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={f.inline}
                          onChange={(e) => updateField(f.id, 'inline', e.target.checked)}
                          className="rounded cursor-pointer"
                        />
                        <span>Em linha (Inline)</span>
                      </label>
                      <button
                        onClick={() => removeField(f.id)}
                        className="text-dark-400 hover:text-white p-1 cursor-pointer transition-colors"
                        title="Remover campo"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <textarea
                    rows={2}
                    value={f.value}
                    onChange={(e) => updateField(f.id, 'value', e.target.value)}
                    placeholder="Valor do Campo"
                    className="w-full bg-dark-800 border border-dark-700 rounded-lg px-2.5 py-1.5 text-xs text-dark-300 focus:outline-none"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Discord Chat Realistic Preview */}
        <div className="lg:col-span-5 space-y-6">
          <div className="sticky top-20 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-dark-300 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-dark-300" />
                Prévia em Tempo Real no Discord ({channel})
              </span>
              <button
                onClick={() => copyToClipboard(exportHtmlSnippet, 'html-code')}
                className="text-xs text-dark-200 hover:text-white flex items-center gap-1 font-medium"
              >
                {copiedCode === 'html-code' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-dark-200" />
                    <span className="text-dark-200">Código Copiado!</span>
                  </>
                ) : (
                  <>
                    <Code2 className="w-3.5 h-3.5" />
                    <span>Copiar HTML Pronto</span>
                  </>
                )}
              </button>
            </div>

            {/* Discord Dark Client Frame */}
            <div className="bg-[#313338] rounded-2xl p-4 sm:p-5 border border-dark-700 text-[#dbdee1] shadow-2xl space-y-3 font-sans">
              {/* Bot Post Header */}
              <div className="flex items-start gap-3">
                <img
                  src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80"
                  alt="Vixe Bot"
                  className="w-10 h-10 rounded-full object-cover shrink-0 cursor-pointer"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-sm text-white hover:underline cursor-pointer">
                      Vixe
                    </span>
                    <span className="bg-dark-700 text-dark-300 border border-dark-600 text-[10px] font-bold px-1.5 py-0.2 rounded">
                      BOT
                    </span>
                    <span className="text-[11px] text-[#949ba4] ml-1">Hoje às 14:20</span>
                  </div>

                  {/* Embed Box */}
                  <div
                    className="mt-2 rounded-lg bg-[#2b2d31] p-4 text-[#dbdee1] border-l-4 space-y-3 relative overflow-hidden"
                    style={{ borderLeftColor: embed.color || '#313442' }}
                  >
                    {/* Author line */}
                    {embed.authorName && (
                      <div className="flex items-center gap-2">
                        {embed.authorIconUrl && (
                          <img
                            src={embed.authorIconUrl}
                            alt={embed.authorName}
                            className="w-5 h-5 rounded-full object-cover"
                            onError={(e) => ((e.target as HTMLImageElement).style.display = 'none')}
                          />
                        )}
                        <span className="text-xs font-bold text-white">
                          {embed.authorName}
                        </span>
                      </div>
                    )}

                    {/* Title & Description with Thumbnail */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1.5 flex-1 min-w-0">
                        {embed.title && (
                          <h4 className="text-sm sm:text-base font-bold text-white hover:underline cursor-pointer">
                            {embed.title}
                          </h4>
                        )}
                        {embed.description && (
                          <p className="text-xs text-[#dbdee1] whitespace-pre-wrap leading-relaxed">
                            {embed.description}
                          </p>
                        )}
                      </div>

                      {embed.thumbnailUrl && (
                        <img
                          src={embed.thumbnailUrl}
                          alt="Thumbnail Direct Link"
                          className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg border border-black/20 shrink-0"
                          onError={(e) => ((e.target as HTMLImageElement).style.display = 'none')}
                        />
                      )}
                    </div>

                    {/* Fields */}
                    {embed.fields.length > 0 && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                        {embed.fields.map((f) => (
                          <div
                            key={f.id}
                            className={f.inline ? 'col-span-1' : 'col-span-full'}
                          >
                            <div className="text-xs font-bold text-white mb-0.5">
                              {f.name}
                            </div>
                            <div className="text-xs text-[#dbdee1] whitespace-pre-wrap leading-relaxed">
                              {f.value}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Big Image Banner from Direct HTML Link */}
                    {embed.imageUrl && (
                      <div className="pt-2">
                        <img
                          src={embed.imageUrl}
                          alt="Banner Embed Direct Link"
                          className="w-full max-h-72 object-cover rounded-lg border border-black/20 shadow-md"
                          onError={(e) => ((e.target as HTMLImageElement).style.display = 'none')}
                        />
                      </div>
                    )}

                    {/* Footer */}
                    {(embed.footerText || embed.footerIconUrl) && (
                      <div className="flex items-center gap-2 pt-2 border-t border-white/5 text-[11px] text-[#949ba4]">
                        {embed.footerIconUrl && (
                          <img
                            src={embed.footerIconUrl}
                            alt="Footer Icon"
                            className="w-4 h-4 rounded-full object-cover"
                            onError={(e) => ((e.target as HTMLImageElement).style.display = 'none')}
                          />
                        )}
                        <span>{embed.footerText}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Image Advice Callout */}
            <div className="bg-dark-800 border border-dark-700 rounded-xl p-4 text-xs space-y-2">
              <span className="font-bold text-white flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-dark-300" />
                Como adicionar links diretos de imagens?
              </span>
              <p className="text-dark-400 leading-relaxed">
                Você pode colar qualquer link direto HTTP ou HTTPS (terminado em .png, .jpg, .webp ou links do Unsplash/Imgur) diretamente nos campos de <strong>Thumbnail</strong> e <strong>Imagem Principal</strong>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
