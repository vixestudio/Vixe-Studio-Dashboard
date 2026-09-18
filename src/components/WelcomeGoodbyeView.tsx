import React, { useState } from 'react';
import {
  DoorOpen,
  Image as ImageIcon,
  Save,
  Send,
  Sparkles,
  UserCheck,
  CheckCircle2,
} from 'lucide-react';
import { WelcomeConfig, ServerInfo } from '../types';
import { DEFAULT_WELCOME, ROLES_LIST } from '../data/mockData';
import { DiscordChannelSelect, DiscordSwitch, VariablePills } from './common';

interface WelcomeGoodbyeViewProps {
  currentServer: ServerInfo;
  onOpenDirectImageModal: () => void;
}

export const WelcomeGoodbyeView: React.FC<WelcomeGoodbyeViewProps> = ({
  currentServer,
  onOpenDirectImageModal,
}) => {
  const [config, setConfig] = useState<WelcomeConfig>(DEFAULT_WELCOME);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="space-y-8 pb-16 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-dark-700 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-dark-700 text-dark-200 border border-dark-600 text-[11px] font-bold uppercase tracking-wider">
              Essenciais • Recepção e Despedida
            </span>
            <span className="px-2 py-0.5 rounded-md bg-dark-700 text-dark-200 border border-dark-600 text-[10px] font-bold">
              Imagens HTML Diretas
            </span>
          </div>
          <h2 className="text-2xl font-extrabold text-white mt-1 font-display">
            Configurar Recepção & Cartão de Boas-Vindas
          </h2>
          <p className="text-xs text-dark-400 mt-1 max-w-xl">
            Envie uma mensagem calorosa aos novos integrantes do {currentServer.name} com cartão ilustrado, avatar e cargos automáticos.
          </p>
        </div>

        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 w-full sm:w-auto">
          <button
            onClick={onOpenDirectImageModal}
            className="flex-1 sm:flex-initial px-3 py-2 bg-dark-800 hover:bg-dark-700 border border-dark-700 text-dark-200 hover:text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <ImageIcon className="w-4 h-4 text-dark-200" />
            <span>Links Diretos</span>
          </button>

          <button
            onClick={handleSave}
            className="flex-1 sm:flex-initial px-4 py-2 bg-dark-100 hover:bg-white text-dark-default text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-colors shadow-xs cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>{savedSuccess ? 'Configuração Salva!' : 'Salvar Alterações'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Form Settings */}
        <div className="lg:col-span-7 space-y-6">
          {/* Main Activation Box */}
          <div className="p-5 bg-dark-800 border border-dark-700 rounded-2xl">
            <DiscordSwitch
              checked={config.enabled}
              onChange={(checked) => setConfig({ ...config, enabled: checked })}
              label="Enviar uma mensagem quando um usuário entrar no servidor"
              description="Ativa os alertas automáticos no canal selecionado."
            />
          </div>

          {/* Channel and Message Text */}
          <div className="p-5 bg-dark-800 border border-dark-700 rounded-2xl space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-dark-300">
              Canal e Mensagem de Boas-Vindas
            </h3>

            <DiscordChannelSelect
              label="Canal de Recepção"
              value={config.channel}
              onChange={(val) => setConfig({ ...config, channel: val })}
              placeholder="Selecione o canal de recepção..."
            />

            <div className="space-y-2">
              <label className="text-xs text-dark-400 block">
                Texto da Mensagem
              </label>
              <textarea
                rows={3}
                value={config.messageText}
                onChange={(e) => setConfig({ ...config, messageText: e.target.value })}
                className="w-full bg-dark-default border border-dark-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#5865F2] leading-relaxed"
              />
              <VariablePills
                variables={[
                  { tag: '{user}', label: 'Menção do membro', description: 'Menciona o novo usuário (@Nome)' },
                  { tag: '{server}', label: 'Nome do servidor', description: 'Nome deste servidor' },
                  { tag: '{member_count}', label: 'Contagem de membros', description: 'Número total de membros' },
                ]}
                onSelect={(tag) =>
                  setConfig({
                    ...config,
                    messageText: `${config.messageText} ${tag}`,
                  })
                }
              />
            </div>
          </div>

          {/* Welcome Card Image with Direct Link */}
          <div className="p-5 bg-dark-800 border border-dark-700 rounded-2xl space-y-4">
            <DiscordSwitch
              checked={config.sendCard}
              onChange={(checked) => setConfig({ ...config, sendCard: checked })}
              label="Cartão Ilustrado de Boas-Vindas (Link Direto)"
              description="Gera um cartão com avatar do novo membro sobre a imagem de fundo especificada."
            />

            {config.sendCard && (
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs text-dark-400">
                    URL Direta da Imagem de Fundo (PNG, JPG, WebP)
                  </label>
                  <button
                    onClick={onOpenDirectImageModal}
                    className="text-xs text-dark-200 hover:text-white hover:underline"
                  >
                    Abrir biblioteca
                  </button>
                </div>
                <input
                  type="url"
                  value={config.cardBannerUrl}
                  onChange={(e) => setConfig({ ...config, cardBannerUrl: e.target.value })}
                  placeholder="https://exemplo.com/fundo-boas-vindas.jpg"
                  className="w-full bg-dark-default border border-dark-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-dark-500 font-mono"
                />
              </div>
            )}
          </div>

          {/* Automatic Role on Join */}
          <div className="p-5 bg-dark-800 border border-dark-700 rounded-2xl space-y-4">
            <DiscordSwitch
              checked={config.giveRole}
              onChange={(checked) => setConfig({ ...config, giveRole: checked })}
              label="Dar um Cargo Automaticamente aos Novos Membros"
              description="Atribui instantaneamente um cargo inicial assim que a pessoa entra."
            />

            {config.giveRole && (
              <div>
                <label className="text-xs text-dark-400 block mb-1">Cargo a Atribuir</label>
                <select
                  value={config.roleToGive}
                  onChange={(e) => setConfig({ ...config, roleToGive: e.target.value })}
                  className="w-full bg-dark-default border border-dark-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-dark-500"
                >
                  <option value="Membro Recruta">@Membro Recruta</option>
                  <option value="Comunidade">@Comunidade</option>
                  <option value="Visitante">@Visitante</option>
                  {ROLES_LIST.map((r) => (
                    <option key={r.id} value={r.name}>
                      @{r.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>

        {/* Right Live Preview of Welcome Card */}
        <div className="lg:col-span-5 space-y-4">
          <div className="sticky top-20 space-y-4">
            <span className="text-xs font-bold text-dark-300 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-dark-300" />
              Pré-visualização do Cartão em {config.channel}
            </span>

            {/* Discord chat frame */}
            <div className="bg-[#313338] rounded-2xl p-5 border border-dark-700 space-y-3 font-sans shadow-2xl">
              <div className="flex items-center gap-2">
                <img
                  src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80"
                  alt="Vixe"
                  className="w-9 h-9 rounded-full object-cover"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-xs text-white">Vixe</span>
                    <span className="bg-dark-700 text-dark-300 border border-dark-600 text-[9px] font-bold px-1 rounded-md">
                      BOT
                    </span>
                    <span className="text-[10px] text-[#949ba4]">Hoje às 14:25</span>
                  </div>
                  <p className="text-xs text-[#dbdee1] mt-1">
                    {config.messageText
                      .replace('{user}', '@NovoMembro')
                      .replace('{server}', currentServer.name)
                      .replace('{member_count}', (currentServer.memberCount + 1).toString())}
                  </p>
                </div>
              </div>

              {/* Rendered Welcome Card */}
              {config.sendCard && (
                <div className="relative rounded-xl overflow-hidden border border-black/30 shadow-lg mt-3">
                  <img
                    src={config.cardBannerUrl}
                    alt="Fundo do Cartão"
                    className="w-full h-44 object-cover filter brightness-50"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                    <img
                      src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80"
                      alt="Avatar do Usuário"
                      className="w-16 h-16 rounded-full object-cover ring-4 ring-white/40 shadow-2xl mb-2"
                    />
                    <h4 className="text-base font-extrabold text-white tracking-wide font-display drop-shadow">
                      BEM-VINDO(A)!
                    </h4>
                    <p className="text-xs font-semibold text-dark-200 drop-shadow">
                      NovoMembro entrou no {currentServer.name}
                    </p>
                    <span className="text-[11px] text-white/75 mt-1">
                      Membro #{currentServer.memberCount + 1}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Direct Image Advice */}
            <div className="bg-dark-800 border border-dark-700 rounded-xl p-4 text-xs space-y-2">
              <span className="font-bold text-white flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-dark-200" />
                Dica para Imagens HTML de Boas-Vindas
              </span>
              <p className="text-dark-400 leading-relaxed">
                Você pode utilizar links diretos de qualquer site ou serviço de hospedagem. Para melhor qualidade, utilize banners com proporção retangular como 1200x500 pixels.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
