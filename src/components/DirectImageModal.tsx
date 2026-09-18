import React, { useState } from 'react';
import { Check, Copy, ExternalLink, Image as ImageIcon, Sparkles, X, CheckCircle2, AlertCircle } from 'lucide-react';
import { DIRECT_IMAGE_PRESETS } from '../data/mockData';

interface DirectImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectImage?: (url: string) => void;
}

export const DirectImageModal: React.FC<DirectImageModalProps> = ({
  isOpen,
  onClose,
  onSelectImage,
}) => {
  const [testUrl, setTestUrl] = useState(
    'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&auto=format&fit=crop&q=80'
  );
  const [altText, setAltText] = useState('Banner do Servidor');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  if (!isOpen) return null;

  const htmlCodeSnippet = `<img src="${testUrl}" alt="${altText}" class="rounded-lg max-w-full h-auto shadow-md" />`;
  const markdownSnippet = `![${altText}](${testUrl})`;
  const discordJsonSnippet = `"image": {\n  "url": "${testUrl}"\n}`;

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div id="direct-image-modal-backdrop" className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div 
        id="direct-image-modal-container" 
        className="bg-dark-800 border border-dark-700 rounded-2xl w-full max-w-[calc(100vw-24px)] sm:max-w-3xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 border-b border-dark-700 bg-dark-900">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-dark-700 border border-dark-600 flex items-center justify-center text-dark-200 shrink-0">
              <ImageIcon className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0">
              <h3 className="text-sm sm:text-base font-bold text-white flex flex-wrap items-center gap-1.5 sm:gap-2">
                <span className="truncate">Links Diretos para Imagens</span>
                <span className="text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-full bg-dark-700 text-dark-200 border border-dark-600 shrink-0">
                  Totalmente Suportado
                </span>
              </h3>
              <p className="text-xs text-dark-400 truncate max-w-[220px] sm:max-w-none">
                Utilize links HTTP/HTTPS de imagens em tags HTML, embeds e avatares do bot.
              </p>
            </div>
          </div>
          <button
            id="close-image-modal-btn"
            onClick={onClose}
            className="text-dark-400 hover:text-white p-1.5 sm:p-2 rounded-lg hover:bg-dark-700 transition-colors cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 sm:space-y-6 flex-1">
          {/* Quick Explanation */}
          <div className="bg-dark-default border border-dark-700 p-4 rounded-xl">
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-dark-300 mt-0.5 shrink-0" />
              <div className="space-y-1 text-sm text-dark-300">
                <p className="font-semibold text-white">
                  Como funcionam os links diretos para imagens?
                </p>
                <p className="text-xs text-dark-400 leading-relaxed">
                  Sim! Imagens hospedadas online (em serviços como CDN, Imgur, Discord CDN, Unsplash, Cloudinary, etc.) podem ser inseridas diretamente usando o atributo <code className="text-dark-100 bg-dark-700 border border-dark-600 px-1.5 py-0.5 rounded text-[11px]">src="URL_DIRETA"</code> no HTML ou nos campos de imagem das mensagens incorporadas e banners do Vixe.
                </p>
              </div>
            </div>
          </div>

          {/* Direct Link Input and Test */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-dark-300 uppercase tracking-wider block">
              Testar URL Direta da Imagem
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                id="test-image-url-input"
                type="url"
                value={testUrl}
                onChange={(e) => {
                  setTestUrl(e.target.value);
                  setImageError(false);
                  setImageLoaded(false);
                }}
                placeholder="https://exemplo.com/imagem.png"
                className="flex-1 bg-dark-default border border-dark-700 focus:border-dark-500 focus:outline-none text-sm text-white px-3.5 py-2.5 rounded-lg"
              />
              <button
                id="apply-selected-image-btn"
                onClick={() => {
                  if (onSelectImage && testUrl) {
                    onSelectImage(testUrl);
                    onClose();
                  }
                }}
                className="px-4 py-2.5 bg-dark-100 hover:bg-white text-dark-default font-bold text-xs rounded-lg transition-colors whitespace-nowrap shadow-xs cursor-pointer text-center"
              >
                Aplicar no App
              </button>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-xs text-dark-400">Texto Alternativo (alt):</label>
              <input
                type="text"
                value={altText}
                onChange={(e) => setAltText(e.target.value)}
                className="bg-dark-default border border-dark-700 text-xs text-dark-200 px-2.5 py-1 rounded max-w-xs focus:outline-none focus:border-dark-500"
              />
            </div>
          </div>

          {/* Live Render Preview */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-dark-300 uppercase tracking-wider">
                Pré-visualização da Imagem Renderizada
              </span>
              <span className="text-xs flex items-center gap-1.5 text-dark-400">
                {imageLoaded && !imageError && (
                  <span className="text-dark-200 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> URL Válida & Carregada
                  </span>
                )}
                {imageError && (
                  <span className="text-dark-300 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" /> Erro ao carregar link
                  </span>
                )}
              </span>
            </div>

            <div className="bg-dark-default border border-dark-700 rounded-xl p-4 flex items-center justify-center min-h-[160px] overflow-hidden">
              {testUrl ? (
                <div className="relative group max-w-full">
                  <img
                    src={testUrl}
                    alt={altText}
                    onLoad={() => {
                      setImageLoaded(true);
                      setImageError(false);
                    }}
                    onError={() => {
                      setImageError(true);
                      setImageLoaded(false);
                    }}
                    className="max-h-56 max-w-full object-contain rounded-lg border border-dark-700/60 shadow-lg"
                  />
                  <a
                    href={testUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="absolute top-2 right-2 p-1.5 bg-black/70 hover:bg-black text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-xs"
                    title="Abrir link original"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              ) : (
                <span className="text-xs text-slate-500">Nenhuma URL informada</span>
              )}
            </div>
          </div>

          {/* Code Snippets to Copy */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-dark-300 uppercase tracking-wider block">
              Copiar Código Pronto para Uso
            </span>

            {/* HTML Tag */}
            <div className="bg-dark-default border border-dark-700 rounded-lg p-3 flex items-center justify-between gap-3">
              <div className="min-w-0 flex-1">
                <span className="text-[11px] font-bold text-dark-200 block mb-1">
                  Tag HTML (&lt;img /&gt;)
                </span>
                <code className="text-xs font-mono text-dark-300 break-all block">
                  {htmlCodeSnippet}
                </code>
              </div>
              <button
                id="copy-html-tag-btn"
                onClick={() => copyToClipboard(htmlCodeSnippet, 'html')}
                className="px-3 py-1.5 bg-dark-700 hover:bg-dark-600 text-dark-200 text-xs font-medium rounded flex items-center gap-1.5 shrink-0 transition-colors"
              >
                {copiedKey === 'html' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-dark-200" />
                    <span className="text-dark-200">Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar HTML</span>
                  </>
                )}
              </button>
            </div>

            {/* Markdown */}
            <div className="bg-dark-default border border-dark-700 rounded-lg p-3 flex items-center justify-between gap-3">
              <div className="min-w-0 flex-1">
                <span className="text-[11px] font-bold text-dark-300 block mb-1">
                  Markdown (Discord Chat / GitHub)
                </span>
                <code className="text-xs font-mono text-dark-300 break-all block">
                  {markdownSnippet}
                </code>
              </div>
              <button
                id="copy-markdown-tag-btn"
                onClick={() => copyToClipboard(markdownSnippet, 'md')}
                className="px-3 py-1.5 bg-dark-700 hover:bg-dark-600 text-dark-200 text-xs font-medium rounded flex items-center gap-1.5 shrink-0 transition-colors"
              >
                {copiedKey === 'md' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-dark-200" />
                    <span className="text-dark-200">Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar Markdown</span>
                  </>
                )}
              </button>
            </div>

            {/* Discord Embed JSON */}
            <div className="bg-dark-default border border-dark-700 rounded-lg p-3 flex items-center justify-between gap-3">
              <div className="min-w-0 flex-1">
                <span className="text-[11px] font-bold text-dark-300 block mb-1">
                  JSON de Embed do Bot Discord
                </span>
                <code className="text-xs font-mono text-dark-300 whitespace-pre-wrap block">
                  {discordJsonSnippet}
                </code>
              </div>
              <button
                id="copy-discord-json-btn"
                onClick={() => copyToClipboard(discordJsonSnippet, 'json')}
                className="px-3 py-1.5 bg-dark-700 hover:bg-dark-600 text-dark-200 text-xs font-medium rounded flex items-center gap-1.5 shrink-0 transition-colors"
              >
                {copiedKey === 'json' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-dark-200" />
                    <span className="text-dark-200">Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar JSON</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Image Presets */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-dark-300 uppercase tracking-wider block">
              Modelos Rápidos Pré-Carregados
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {DIRECT_IMAGE_PRESETS.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setTestUrl(preset.url);
                    setAltText(preset.title);
                    setImageError(false);
                    setImageLoaded(false);
                  }}
                  className="p-2.5 bg-dark-default hover:bg-dark-700 border border-dark-700 hover:border-dark-500 rounded-xl flex items-center gap-3 text-left transition-colors group"
                >
                  <img
                    src={preset.url}
                    alt={preset.title}
                    className="w-11 h-11 rounded-lg object-cover bg-black/40 border border-dark-700"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-dark-200 group-hover:text-white truncate">
                      {preset.title}
                    </p>
                    <span className="text-[11px] text-slate-500 flex items-center gap-2">
                      <span>{preset.category}</span>
                      <span>•</span>
                      <span>{preset.dimensions}</span>
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-dark-700 bg-dark-900 flex items-center justify-between">
          <span className="text-xs text-dark-400">
            Dica: No Construtor de Embeds e no Personalizador, você pode inserir qualquer URL direta.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-dark-700 hover:bg-dark-600 text-dark-200 text-xs font-semibold rounded-lg transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
