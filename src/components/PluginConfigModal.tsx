import React, { useState } from 'react';
import { ExternalLink, Image as ImageIcon, Save, ShieldCheck, X } from 'lucide-react';
import { PluginItem } from '../types';
import { DynamicIcon } from './DynamicIcon';

interface PluginConfigModalProps {
  plugin: PluginItem | null;
  isOpen: boolean;
  onClose: () => void;
  onToggleActive: (pluginId: string, newState: boolean) => void;
  onNavigateToScreen?: (screen: string) => void;
  onOpenDirectImageTester?: () => void;
}

export const PluginConfigModal: React.FC<PluginConfigModalProps> = ({
  plugin,
  isOpen,
  onClose,
  onToggleActive,
  onNavigateToScreen,
  onOpenDirectImageTester,
}) => {
  if (!isOpen || !plugin) return null;

  const [active, setActive] = useState(plugin.isActive);
  const [channel, setChannel] = useState('#geral');
  const [customBannerUrl, setCustomBannerUrl] = useState(
    'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1000&auto=format&fit=crop&q=80'
  );
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleSave = () => {
    onToggleActive(plugin.id, active);
    setToastMessage('Configurações salvas com sucesso!');
    setTimeout(() => {
      setToastMessage(null);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="bg-dark-800 border border-dark-700 rounded-2xl w-full max-w-[calc(100vw-24px)] sm:max-w-lg overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="px-4 sm:px-6 py-3.5 sm:py-4 border-b border-dark-700 bg-dark-900 flex items-center justify-between">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl ${plugin.iconBgColor || 'bg-dark-700'} flex items-center justify-center ${plugin.iconTextColor || 'text-dark-200'} shrink-0`}>
              <DynamicIcon name={plugin.iconName} className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-bold text-dark-100 font-display truncate">{plugin.title}</h3>
                {plugin.isNew && (
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-dark-700 text-dark-200 border border-dark-600 shrink-0">
                    Novo!
                  </span>
                )}
              </div>
              <p className="text-xs text-dark-400 truncate max-w-[200px] sm:max-w-[280px]">
                {plugin.description}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-dark-400 hover:text-white p-1.5 sm:p-2 rounded-lg hover:bg-dark-700 transition-colors cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-5 overflow-y-auto max-h-[75vh]">
          {/* Status Switch */}
          <div className="flex items-center justify-between p-3.5 bg-dark-default border border-dark-700 rounded-xl">
            <div className="space-y-0.5">
              <span className="text-sm font-semibold text-white">Status do Plugin</span>
              <p className="text-xs text-dark-400">
                {active ? 'O plugin está ativo e funcionando no servidor' : 'O plugin está desativado'}
              </p>
            </div>
            <button
              id="plugin-toggle-switch-btn"
              type="button"
              onClick={() => setActive(!active)}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-200 ease-in-out cursor-pointer ${
                active ? 'bg-dark-100 justify-end' : 'bg-dark-700 justify-start'
              }`}
            >
              <div className="bg-white w-4 h-4 rounded-full shadow-md transform transition-transform" />
            </button>
          </div>

          {/* Quick Target Screen Redirect if available */}
          {plugin.targetScreen && (
            <div className="p-3.5 bg-dark-700/50 border border-dark-600 rounded-xl flex items-center justify-between">
              <div className="text-xs text-dark-300">
                <span className="font-semibold text-white block">Configurações Avançadas Disponíveis</span>
                Este plugin possui uma tela visual dedicada para customização completa.
              </div>
              <button
                onClick={() => {
                  onClose();
                  if (onNavigateToScreen && plugin.targetScreen) {
                    onNavigateToScreen(plugin.targetScreen);
                  }
                }}
                className="px-3 py-1.5 bg-dark-100 hover:bg-white text-dark-default font-bold text-xs rounded-lg flex items-center gap-1.5 transition-colors shrink-0 shadow-xs"
              >
                <span>Abrir Tela</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Channel Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-dark-400">
              Canal Principal de Envio
            </label>
            <select
              value={channel}
              onChange={(e) => setChannel(e.target.value)}
              className="w-full bg-dark-default border border-dark-700 rounded-lg text-sm text-white px-3 py-2 focus:outline-none focus:border-dark-500"
            >
              <option value="#geral">#geral</option>
              <option value="#boas-vindas">#boas-vindas</option>
              <option value="#avisos">#avisos</option>
              <option value="#comandos">#comandos</option>
              <option value="#moderacao">#moderacao</option>
            </select>
          </div>

          {/* Direct Image URL support */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-dark-400">
                Link Direto para Imagem (HTML / Web URL)
              </label>
              {onOpenDirectImageTester && (
                <button
                  type="button"
                  onClick={onOpenDirectImageTester}
                  className="text-xs text-dark-200 hover:text-white hover:underline flex items-center gap-1"
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  Testar Links
                </button>
              )}
            </div>
            <input
              type="url"
              value={customBannerUrl}
              onChange={(e) => setCustomBannerUrl(e.target.value)}
              placeholder="https://exemplo.com/banner.png"
              className="w-full bg-dark-default border border-dark-700 rounded-lg text-sm text-white px-3 py-2 focus:outline-none focus:border-dark-500"
            />
            {customBannerUrl && (
              <div className="mt-2 rounded-lg overflow-hidden border border-dark-700 bg-dark-default p-2 flex items-center justify-center">
                <img
                  src={customBannerUrl}
                  alt="Prévia direta"
                  className="h-24 w-full object-cover rounded-md"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-dark-700 bg-dark-900 flex items-center justify-between">
          <span className="text-xs text-dark-400 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-dark-200" />
            Permissões sincronizadas
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-dark-700 hover:bg-dark-600 text-dark-300 text-xs font-semibold rounded-lg transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-dark-100 hover:bg-white text-dark-default text-xs font-bold rounded-lg flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{toastMessage || 'Salvar Alterações'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
