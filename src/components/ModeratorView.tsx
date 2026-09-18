import React, { useState } from 'react';
import { ShieldAlert, ShieldCheck, Check, Plus, Trash2, Save, AlertTriangle, Lock, Eye } from 'lucide-react';
import { ServerInfo } from '../types';

interface ModeratorViewProps {
  currentServer: ServerInfo;
}

export const ModeratorView: React.FC<ModeratorViewProps> = ({ currentServer }) => {
  const [antiSpam, setAntiSpam] = useState(true);
  const [antiInvites, setAntiInvites] = useState(true);
  const [antiLinks, setAntiLinks] = useState(false);
  const [badWords, setBadWords] = useState<string[]>([
    'palavrao1',
    'discord.gg/malicious',
    'free-nitro-scam',
    'token-stealer',
  ]);
  const [newBadWord, setNewBadWord] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const addBadWord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBadWord.trim()) return;
    setBadWords([...badWords, newBadWord.trim()]);
    setNewBadWord('');
  };

  const removeBadWord = (index: number) => {
    setBadWords(badWords.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="space-y-8 pb-16 animate-fadeIn" id="dashboard__content">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-dark-700 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-dark-700 text-dark-200 border border-dark-600 text-[11px] font-bold uppercase tracking-wider">
              Essenciais • Moderador
            </span>
          </div>
          <h2 className="text-2xl font-extrabold text-white mt-1 font-display">
            Auto-Moderação & Proteção do Servidor
          </h2>
          <p className="text-xs text-dark-400 mt-1 max-w-xl">
            Proteja o {currentServer.name} contra spam, links não autorizados, palavras ofensivas e bots invasores.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="px-4 py-2 bg-dark-100 hover:bg-white text-dark-default text-xs font-bold rounded-xl flex items-center gap-2 transition-colors shadow-xs cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>{savedSuccess ? 'Proteções Salvas!' : 'Salvar Regras'}</span>
        </button>
      </div>

      {/* Main 12-Column Equivalent Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Left Column: Automated Filter Rules & Bad Words (Col 7 / 8) */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-6">
          {/* Automated Filter Rules */}
          <div className="space-y-3.5">
            <div className="p-5 bg-dark-800 border border-dark-700 rounded-2xl flex items-center justify-between shadow-xs">
              <div className="space-y-0.5 pr-4">
                <span className="text-sm font-bold text-white">Filtro Anti-Spam</span>
                <p className="text-xs text-dark-400 leading-relaxed">
                  Detecta membros enviando mensagens repetidas ou menções em massa instantaneamente.
                </p>
              </div>
              <button
                onClick={() => setAntiSpam(!antiSpam)}
                className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer shrink-0 ${
                  antiSpam ? 'bg-emerald-500 justify-end' : 'bg-dark-700 justify-start'
                }`}
              >
                <div className="bg-white w-4 h-4 rounded-full shadow-md" />
              </button>
            </div>

            <div className="p-5 bg-dark-800 border border-dark-700 rounded-2xl flex items-center justify-between shadow-xs">
              <div className="space-y-0.5 pr-4">
                <span className="text-sm font-bold text-white">Bloquear Convites de Outros Servidores</span>
                <p className="text-xs text-dark-400 leading-relaxed">
                  Apaga automaticamente links de convite (como discord.gg/ e discord.com/invite) em canais públicos.
                </p>
              </div>
              <button
                onClick={() => setAntiInvites(!antiInvites)}
                className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer shrink-0 ${
                  antiInvites ? 'bg-emerald-500 justify-end' : 'bg-dark-700 justify-start'
                }`}
              >
                <div className="bg-white w-4 h-4 rounded-full shadow-md" />
              </button>
            </div>

            <div className="p-5 bg-dark-800 border border-dark-700 rounded-2xl flex items-center justify-between shadow-xs">
              <div className="space-y-0.5 pr-4">
                <span className="text-sm font-bold text-white">Bloquear Links Externos Não Autorizados</span>
                <p className="text-xs text-dark-400 leading-relaxed">
                  Permite o envio de links externos somente para administradores ou cargos com permissão explícita.
                </p>
              </div>
              <button
                onClick={() => setAntiLinks(!antiLinks)}
                className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer shrink-0 ${
                  antiLinks ? 'bg-emerald-500 justify-end' : 'bg-dark-700 justify-start'
                }`}
              >
                <div className="bg-white w-4 h-4 rounded-full shadow-md" />
              </button>
            </div>
          </div>

          {/* Bad words blacklist */}
          <div className="p-5 bg-dark-800 border border-dark-700 rounded-2xl space-y-4 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-dark-700">
              <h3 className="text-xs font-bold uppercase tracking-wider text-dark-300">
                Palavras Bloqueadas ({badWords.length})
              </h3>
              <span className="text-[11px] text-zinc-400 font-medium">Auto-apagar mensagem</span>
            </div>

            <form onSubmit={addBadWord} className="flex gap-2">
              <input
                type="text"
                value={newBadWord}
                onChange={(e) => setNewBadWord(e.target.value)}
                placeholder="Adicionar termo, palavra ofensiva ou domínio proibido..."
                className="flex-1 bg-dark-default border border-dark-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-dark-500"
              />
              <button
                type="submit"
                className="px-3.5 py-2 bg-dark-100 hover:bg-white text-dark-default rounded-xl text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Adicionar</span>
              </button>
            </form>

            <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto pt-2">
              {badWords.map((word, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-lg bg-dark-default border border-dark-700 text-xs text-dark-300 flex items-center gap-2"
                >
                  <span className="font-mono">{word}</span>
                  <button
                    onClick={() => removeBadWord(i)}
                    className="text-dark-400 hover:text-rose-400 transition-colors cursor-pointer"
                    title="Remover palavra"
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: ModLogs & Safety Overview (Col 5 / 4) */}
        <div className="lg:col-span-5 xl:col-span-4 space-y-5">
          {/* Card: Status da Proteção */}
          <div className="bg-dark-800 border border-dark-700 rounded-2xl p-5 space-y-4 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-dark-700">
              <span className="text-xs font-bold uppercase tracking-wider text-dark-300">
                Status de Proteção
              </span>
              <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Ativo
              </span>
            </div>

            <div className="space-y-2.5">
              <div className="p-3 rounded-xl bg-dark-900 border border-dark-700 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-white">Mensagens Bloqueadas (24h)</p>
                  <p className="text-[11px] text-zinc-400">Spam e links suspeitos</p>
                </div>
                <span className="text-xs font-bold text-white font-mono">42</span>
              </div>

              <div className="p-3 rounded-xl bg-dark-900 border border-dark-700 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-white">Membros Advertidos</p>
                  <p className="text-[11px] text-zinc-400">Violações de conduta</p>
                </div>
                <span className="text-xs font-bold text-amber-400 font-mono">7</span>
              </div>
            </div>
          </div>

          {/* Card: Canal de ModLogs */}
          <div className="bg-dark-800 border border-dark-700 rounded-2xl p-5 space-y-3.5 shadow-xs">
            <div className="flex items-center gap-2 pb-2 border-b border-dark-700">
              <Eye className="w-4 h-4 text-violet-400" />
              <h5 className="text-xs font-bold uppercase tracking-wider text-dark-200">
                Auditoria & Logs de Moderação
              </h5>
            </div>
            <p className="text-xs text-dark-400 leading-relaxed">
              Todas as punições automáticas e mensagens excluídas são registradas no canal administrativo de auditoria.
            </p>
            <div className="p-3 rounded-xl bg-dark-900 border border-dark-700 flex items-center justify-between">
              <span className="text-xs text-dark-300 font-medium">Canal de ModLog:</span>
              <span className="text-xs font-semibold text-violet-400 bg-violet-950/40 px-2 py-0.5 rounded-md border border-violet-800/40">
                #mod-logs
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
