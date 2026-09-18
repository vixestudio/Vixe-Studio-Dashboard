import React from 'react';
import { Crown, Check, Sparkles, Gem, ArrowRight, ShieldCheck, Zap, HelpCircle, CreditCard, Lock } from 'lucide-react';
import { ServerInfo } from '../types';

interface PremiumViewProps {
  currentServer: ServerInfo;
}

export const PremiumView: React.FC<PremiumViewProps> = ({ currentServer }) => {
  return (
    <div className="space-y-8 pb-16 animate-fadeIn" id="dashboard__content">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-dark-700 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded bg-dark-700 text-dark-200 border border-dark-600 text-[11px] font-bold uppercase tracking-wider">
              Vantagens Exclusivas
            </span>
          </div>
          <h2 className="text-2xl font-extrabold text-white mt-1 font-display">
            Vixe Premium para {currentServer.name}
          </h2>
          <p className="text-xs text-dark-400 mt-1 max-w-xl">
            Desbloqueie gravações de áudio de alta fidelidade, bot personalizado com seu próprio avatar e banner, mensagens incorporadas ilimitadas e monetização.
          </p>
        </div>
      </div>

      {/* Plans Pricing Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Monthly Plan */}
        <div className="bg-dark-800 border border-dark-700 rounded-2xl p-6 flex flex-col justify-between hover:border-slate-500 transition-colors shadow-xs">
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-dark-400">
              Mensal
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-extrabold text-dark-100 font-display">R$ 49</span>
              <span className="text-xs text-dark-400">/mês</span>
            </div>
            <p className="text-xs text-dark-400 leading-relaxed">
              Ideal para servidores em crescimento que querem recursos avançados de moderação e níveis.
            </p>

            <ul className="space-y-2.5 text-xs text-dark-300 pt-3 border-t border-dark-700">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Bot Personalizado (Avatar e Nome)</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Embeds e Imagens Ilimitadas</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Multiplicadores de XP Avançados</span>
              </li>
            </ul>
          </div>

          <button className="mt-6 w-full py-2.5 rounded-xl bg-dark-700 hover:bg-dark-600 text-white text-xs font-bold transition-colors cursor-pointer">
            Assinar Mensal
          </button>
        </div>

        {/* Lifetime / Popular Plan */}
        <div className="bg-dark-800 border-2 border-dark-600 rounded-2xl p-6 flex flex-col justify-between relative shadow-lg">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-dark-100 text-dark-default text-[10px] font-black rounded-full uppercase tracking-wider">
            Mais Escolhido
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-dark-200">
                Vitalício (Lifetime)
              </span>
              <Crown className="w-4 h-4 text-dark-100 fill-dark-100" />
            </div>

            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-extrabold text-dark-100 font-display">R$ 299</span>
              <span className="text-xs text-dark-400">pagamento único</span>
            </div>
            <p className="text-xs text-dark-300 leading-relaxed">
              Acesso definitivo para sempre a todos os plugins futuros, sem cobranças recorrentes.
            </p>

            <ul className="space-y-2.5 text-xs text-dark-200 pt-3 border-t border-dark-700">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Tudo do plano mensal</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Mascotes e Personagens de IA Sem Limites</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Monetização com Menor Taxa</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Suporte Prioritário VIP</span>
              </li>
            </ul>
          </div>

          <button className="mt-6 w-full py-2.5 rounded-xl bg-dark-100 hover:bg-white text-dark-default text-xs font-extrabold transition-all shadow-xs cursor-pointer">
            Garantir Acesso Vitalício
          </button>
        </div>

        {/* Annual Plan */}
        <div className="bg-dark-800 border border-dark-700 rounded-2xl p-6 flex flex-col justify-between hover:border-slate-500 transition-colors shadow-xs">
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-dark-400">
              Anual (Economize 40%)
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-extrabold text-dark-100 font-display">R$ 29</span>
              <span className="text-xs text-dark-400">/mês (cobrado anualmente)</span>
            </div>
            <p className="text-xs text-dark-400 leading-relaxed">
              A melhor opção para quem planeja uma comunidade ativa e sustentável a longo prazo.
            </p>

            <ul className="space-y-2.5 text-xs text-dark-300 pt-3 border-t border-dark-700">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Todas as funcionalidades Premium</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Gravação de canais de voz em 1080p áudio</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Canais de estatísticas ilimitados</span>
              </li>
            </ul>
          </div>

          <button className="mt-6 w-full py-2.5 rounded-xl bg-dark-700 hover:bg-dark-600 text-white text-xs font-bold transition-colors cursor-pointer">
            Assinar Plano Anual
          </button>
        </div>
      </div>

      {/* Main 12-Column Equivalent Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Left Column: Feature Comparison (Col 7 / 8) */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-6">
          <div className="bg-dark-800 border border-dark-700 rounded-2xl overflow-hidden shadow-xs">
            <div className="p-4 border-b border-dark-700 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-dark-300">
                Comparativo de Recursos
              </span>
              <span className="text-[11px] text-zinc-400">Ativação instantânea</span>
            </div>

            <div className="divide-y divide-[#272a35]/60">
              <div className="p-4 flex items-center justify-between text-xs">
                <span className="text-dark-200 font-medium">Nome e Avatar Personalizado do Bot</span>
                <div className="flex items-center gap-6">
                  <span className="text-dark-500 font-mono">Padrão</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> 100% Livre
                  </span>
                </div>
              </div>

              <div className="p-4 flex items-center justify-between text-xs">
                <span className="text-dark-200 font-medium">Painéis e Categorias de Tickets</span>
                <div className="flex items-center gap-6">
                  <span className="text-dark-400 font-mono">Até 3</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Ilimitado
                  </span>
                </div>
              </div>

              <div className="p-4 flex items-center justify-between text-xs">
                <span className="text-dark-200 font-medium">Notificações Sociais (Twitch, YT, Kick)</span>
                <div className="flex items-center gap-6">
                  <span className="text-dark-400 font-mono">1 canal</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Ilimitados
                  </span>
                </div>
              </div>

              <div className="p-4 flex items-center justify-between text-xs">
                <span className="text-dark-200 font-medium">Placar de XP com Banner Personalizado</span>
                <div className="flex items-center gap-6">
                  <span className="text-dark-500 font-mono">Básico</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> HD Custom
                  </span>
                </div>
              </div>

              <div className="p-4 flex items-center justify-between text-xs">
                <span className="text-dark-200 font-medium">Histórico de Auditoria e ModLogs</span>
                <div className="flex items-center gap-6">
                  <span className="text-dark-400 font-mono">7 dias</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> 365 dias
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Guarantee & Payment Methods (Col 5 / 4) */}
        <div className="lg:col-span-5 xl:col-span-4 space-y-5">
          <div className="bg-dark-800 border border-dark-700 rounded-2xl p-5 space-y-3.5 shadow-xs">
            <div className="flex items-center gap-2 pb-2 border-b border-dark-700">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <h5 className="text-xs font-bold uppercase tracking-wider text-dark-200">
                Garantia Incondicional de 7 Dias
              </h5>
            </div>
            <p className="text-xs text-dark-400 leading-relaxed">
              Experimente todas as vantagens Premium no {currentServer.name}. Se não estiver 100% satisfeito, devolvemos todo o seu dinheiro.
            </p>
          </div>

          <div className="bg-dark-800 border border-dark-700 rounded-2xl p-5 space-y-3.5 shadow-xs">
            <div className="flex items-center gap-2 pb-2 border-b border-dark-700">
              <CreditCard className="w-4 h-4 text-violet-400" />
              <h5 className="text-xs font-bold uppercase tracking-wider text-dark-200">
                Formas de Pagamento
              </h5>
            </div>
            <div className="space-y-2 text-xs text-dark-300">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-dark-900 border border-dark-700">
                <span className="font-semibold text-white">PIX Instantâneo</span>
                <span className="text-emerald-400 font-bold text-[11px]">Liberação Imediata</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-dark-900 border border-dark-700">
                <span className="font-semibold text-white">Cartão de Crédito</span>
                <span className="text-dark-400 text-[11px]">Até 12x</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
