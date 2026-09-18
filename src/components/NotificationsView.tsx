import React, { useState } from 'react';
import {
  Bell,
  BellOff,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Info,
  Trash2,
  PlusCircle,
  ArrowLeft,
} from 'lucide-react';
import { ServerInfo } from '../types';

interface NotificationsViewProps {
  currentServer: ServerInfo;
  onBackToDashboard?: () => void;
}

interface NotificationItem {
  id: string;
  type: 'info' | 'warning' | 'error' | 'success';
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
}

export const NotificationsView: React.FC<NotificationsViewProps> = ({
  currentServer,
  onBackToDashboard,
}) => {
  const [filter, setFilter] = useState<'all' | 'errors' | 'alerts'>('all');
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  const handleAddSampleNotification = (type: 'error' | 'warning' | 'info') => {
    const samples: Record<'error' | 'warning' | 'info', { title: string; desc: string }> = {
      error: {
        title: 'Falha de permissão no canal de logs',
        desc: `O bot não possui a permissão 'Gerenciar Webhooks' no servidor ${currentServer.name}.`,
      },
      warning: {
        title: 'Limite de mensagens atingido',
        desc: 'O comando personalizado atingiu a taxa máxima de 5 execuções por minuto.',
      },
      info: {
        title: 'Servidor atualizado',
        desc: 'As configurações do Vixe Bot foram sincronizadas com sucesso.',
      },
    };

    const newNotif: NotificationItem = {
      id: Date.now().toString(),
      type,
      title: samples[type].title,
      description: samples[type].desc,
      timestamp: 'Agora mesmo',
      read: false,
    };

    setNotifications((prev) => [newNotif, ...prev]);
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  const handleDelete = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const filteredNotifications = notifications.filter((n) => {
    if (filter === 'errors') return n.type === 'error';
    if (filter === 'alerts') return n.type === 'warning';
    return true;
  });

  return (
    <div className="space-y-6 pb-16 animate-fadeIn" id="dashboard__content">
      {/* Header area */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-zinc-800 pb-5">
            <div className="flex items-center gap-3">
              {onBackToDashboard && (
                <button
                  onClick={onBackToDashboard}
                  className="p-2 rounded-xl bg-dark-800 hover:bg-dark-750 border border-zinc-700 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                  title="Voltar ao Painel"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
              )}
              <div>
                <h4 className="font-bold text-white text-2xl lg:text-3xl font-display">
                  Notificações
                </h4>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Central de avisos, erros e eventos do bot para {currentServer.name}
                </p>
              </div>
            </div>

            {/* Actions: Filter and Clear */}
            <div className="flex items-center gap-2">
              {notifications.length > 0 && (
                <button
                  onClick={handleClearAll}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-dark-800 hover:bg-dark-750 border border-zinc-700 text-xs text-zinc-300 hover:text-rose-400 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Limpar todas</span>
                </button>
              )}

              <button
                onClick={() => handleAddSampleNotification('error')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-xs font-semibold text-zinc-200 hover:text-white transition-colors cursor-pointer"
                title="Simular um erro para testar a central de notificações"
              >
                <PlusCircle className="w-3.5 h-3.5 text-zinc-400" />
                <span>Simular Erro</span>
              </button>
            </div>
          </div>

        {/* Main 12-Column Equivalent Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left Column: Feed de Notificações */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-4">
            {/* Filter Tabs */}
          {notifications.length > 0 && (
            <div className="flex items-center gap-2 mb-6 text-xs">
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-1.5 rounded-xl font-medium transition-colors cursor-pointer ${
                  filter === 'all'
                    ? 'bg-zinc-800 text-white border border-zinc-700 font-semibold'
                    : 'text-zinc-400 hover:text-white bg-dark-800'
                }`}
              >
                Todas ({notifications.length})
              </button>
              <button
                onClick={() => setFilter('errors')}
                className={`px-3 py-1.5 rounded-xl font-medium transition-colors cursor-pointer ${
                  filter === 'errors'
                    ? 'bg-zinc-800 text-white border border-zinc-700 font-semibold'
                    : 'text-zinc-400 hover:text-white bg-dark-800'
                }`}
              >
                Erros ({notifications.filter((n) => n.type === 'error').length})
              </button>
              <button
                onClick={() => setFilter('alerts')}
                className={`px-3 py-1.5 rounded-xl font-medium transition-colors cursor-pointer ${
                  filter === 'alerts'
                    ? 'bg-zinc-800 text-white border border-zinc-700 font-semibold'
                    : 'text-zinc-400 hover:text-white bg-dark-800'
                }`}
              >
                Alertas ({notifications.filter((n) => n.type === 'warning').length})
              </button>
            </div>
          )}

          {/* List or Empty State */}
          {filteredNotifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 sm:py-24 text-center px-4">
              {/* Notification Center SVG Illustration */}
              <div className="relative mb-6">
                <div className="w-48 h-48 sm:w-56 sm:h-56 relative flex items-center justify-center">
                  {/* Subtle ambient rings */}
                  <div className="absolute inset-0 rounded-full bg-zinc-800/30 border border-zinc-800 animate-pulse" />
                  <div className="absolute inset-6 rounded-full bg-dark-850/80 border border-zinc-750" />

                  {/* SVG Center Graphic */}
                  <svg
                    className="w-28 h-28 sm:w-32 sm:h-32 text-zinc-500 relative z-10"
                    viewBox="0 0 160 160"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Shadow / Base */}
                    <ellipse cx="80" cy="135" rx="45" ry="10" fill="#18181b" opacity="0.6" />

                    {/* Main Bell Body */}
                    <path
                      d="M80 30C58 30 50 48 50 78C50 102 40 108 34 114C32 116 34 120 38 120H122C126 120 128 116 126 114C120 108 110 102 110 78C110 48 102 30 80 30Z"
                      fill="#27272a"
                      stroke="#3f3f46"
                      strokeWidth="3"
                    />

                    {/* Bell Top Knob */}
                    <path
                      d="M74 30V24C74 20.6863 76.6863 18 80 18C83.3137 18 86 20.6863 86 24V30"
                      stroke="#52525b"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />

                    {/* Clapper / Ping */}
                    <circle cx="80" cy="126" r="8" fill="#3f3f46" stroke="#52525b" strokeWidth="2" />

                    {/* Decorative Stars / Sparks */}
                    <path
                      d="M32 46L36 50M32 50L36 46"
                      stroke="#71717a"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M124 40L128 44M124 44L128 40"
                      stroke="#71717a"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <circle cx="132" cy="70" r="3" fill="#52525b" />
                    <circle cx="28" cy="80" r="2.5" fill="#52525b" />
                  </svg>
                </div>
              </div>

              {/* Exact text requested */}
              <div className="text-zinc-400 font-medium text-base sm:text-lg max-w-md mx-auto leading-relaxed">
                Todas as notificações e erros serão exibidos aqui
              </div>

              <p className="text-xs text-zinc-500 mt-2 max-w-sm">
                Nenhuma pendência ou falha encontrada no momento. O Vixe Bot está operando normalmente.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredNotifications.map((notif) => (
                <div
                  key={notif.id}
                  className="bg-dark-800 border border-zinc-800 hover:border-zinc-700 rounded-2xl p-4 sm:p-5 flex items-start justify-between gap-4 transition-all"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="mt-0.5 shrink-0">
                      {notif.type === 'error' && (
                        <div className="w-9 h-9 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
                          <XCircle className="w-5 h-5" />
                        </div>
                      )}
                      {notif.type === 'warning' && (
                        <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                          <AlertTriangle className="w-5 h-5" />
                        </div>
                      )}
                      {notif.type === 'success' && (
                        <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                          <CheckCircle2 className="w-5 h-5" />
                        </div>
                      )}
                      {notif.type === 'info' && (
                        <div className="w-9 h-9 rounded-xl bg-zinc-700/30 border border-zinc-700 flex items-center justify-center text-zinc-300">
                          <Info className="w-5 h-5" />
                        </div>
                      )}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h5 className="text-sm font-bold text-white truncate">{notif.title}</h5>
                        <span className="text-[10px] text-zinc-500">{notif.timestamp}</span>
                      </div>
                      <p className="text-xs text-zinc-300 mt-1 leading-relaxed">
                        {notif.description}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDelete(notif.id)}
                    className="p-1.5 text-zinc-500 hover:text-rose-400 transition-colors rounded-lg hover:bg-dark-700"
                    title="Excluir notificação"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Saúde dos Serviços e Preferências */}
        <div className="lg:col-span-5 xl:col-span-4 space-y-5">
          {/* Card: Status do Sistema & Gateway */}
          <div className="bg-dark-800 border border-zinc-800 rounded-2xl p-5 space-y-4 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                Saúde dos Serviços
              </span>
              <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                100% Online
              </span>
            </div>

            <div className="space-y-2.5">
              <div className="flex items-center justify-between p-3 rounded-xl bg-dark-900 border border-zinc-800/80">
                <div>
                  <p className="text-xs font-semibold text-white">Discord Gateway</p>
                  <p className="text-[11px] text-zinc-400">Shard #1 • Heartbeat estável</p>
                </div>
                <span className="text-xs font-bold text-emerald-400 font-mono">14 ms</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-dark-900 border border-zinc-800/80">
                <div>
                  <p className="text-xs font-semibold text-white">Webhook Dispatcher</p>
                  <p className="text-[11px] text-zinc-400">4 canais monitorados</p>
                </div>
                <span className="text-xs font-bold text-emerald-400 font-mono">Ativo</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-dark-900 border border-zinc-800/80">
                <div>
                  <p className="text-xs font-semibold text-white">Banco de Dados</p>
                  <p className="text-[11px] text-zinc-400">Sincronização em tempo real</p>
                </div>
                <span className="text-xs font-bold text-emerald-400 font-mono">OK</span>
              </div>
            </div>
          </div>

          {/* Card: Preferências de Alertas */}
          <div className="bg-dark-800 border border-zinc-800 rounded-2xl p-5 space-y-3.5 shadow-xs">
            <h5 className="text-xs font-bold uppercase tracking-wider text-zinc-300">
              Configurações de Alerta
            </h5>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Receba notificações críticas diretamente no canal administrativo do Discord configurado para {currentServer.name}.
            </p>
            <div className="p-3 rounded-xl bg-dark-900 border border-zinc-800/80 flex items-center justify-between">
              <span className="text-xs text-zinc-300 font-medium">Canal de Registro:</span>
              <span className="text-xs font-semibold text-violet-400 bg-violet-950/40 px-2 py-0.5 rounded border border-violet-800/40">
                #bot-logs
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
