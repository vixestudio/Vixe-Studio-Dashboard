import React, { useState } from 'react';
import { Terminal, Plus, Trash2, Edit2, Check, MessageSquare, Code2, BarChart2 } from 'lucide-react';
import { ServerInfo } from '../types';
import { CommandConfigPage } from './CommandConfigPage';

interface CustomCommandsViewProps {
  currentServer: ServerInfo;
}

interface CommandItem {
  id: string;
  name: string;
  response: string;
  roleReward?: string;
  usesCount: number;
}

export const CustomCommandsView: React.FC<CustomCommandsViewProps> = ({ currentServer }) => {
  const [commands, setCommands] = useState<CommandItem[]>([
    {
      id: 'cmd-1',
      name: '!regras',
      response: 'Por favor, consulte o canal #regras para ler nosso código de conduta completo!',
      usesCount: 384,
    },
    {
      id: 'cmd-2',
      name: '!socials',
      response: 'Siga nossas redes sociais oficiais: Twitter @vixestudio, YouTube /vixestudio!',
      usesCount: 192,
    },
    {
      id: 'cmd-3',
      name: '!vip',
      response: 'Para saber como se tornar VIP e ter acesso antecipado aos projetos, visite nosso canal #vip-info!',
      roleReward: 'Interessado VIP',
      usesCount: 89,
    },
  ]);

  const [newCmdName, setNewCmdName] = useState('');
  const [newCmdResponse, setNewCmdResponse] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCommand, setEditingCommand] = useState<string | null>(null);

  const handleAddCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCmdName.trim() || !newCmdResponse.trim()) return;

    let formattedName = newCmdName.trim();
    if (!formattedName.startsWith('!') && !formattedName.startsWith('/')) {
      formattedName = `!${formattedName}`;
    }

    setCommands([
      ...commands,
      {
        id: `cmd-${Date.now()}`,
        name: formattedName,
        response: newCmdResponse.trim(),
        usesCount: 0,
      },
    ]);

    setNewCmdName('');
    setNewCmdResponse('');
    setShowAddForm(false);
  };

  const handleDelete = (id: string) => {
    setCommands(commands.filter((c) => c.id !== id));
  };

  const totalUses = commands.reduce((acc, curr) => acc + curr.usesCount, 0);

  if (editingCommand) {
    return (
      <CommandConfigPage
        commandName={editingCommand}
        onBack={() => setEditingCommand(null)}
      />
    );
  }

  return (
    <div className="space-y-8 pb-16 animate-fadeIn" id="dashboard__content">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-dark-700 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-dark-700 text-dark-200 border border-dark-600 text-[11px] font-bold uppercase tracking-wider">
              Gerenciar Servidor • Comandos Customizáveis
            </span>
          </div>
          <h2 className="text-2xl font-extrabold text-white mt-1 font-display">
            Comandos de Texto Personalizados
          </h2>
          <p className="text-xs text-dark-400 mt-1 max-w-xl">
            Crie respostas automáticas e atalhos rápidos para dúvidas frequentes no {currentServer.name}.
          </p>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-4 py-2 bg-dark-100 hover:bg-white text-dark-default text-xs font-bold rounded-xl flex items-center gap-2 transition-colors shadow-sm shadow-xs cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>{showAddForm ? 'Fechar Formulário' : 'Novo Comando'}</span>
        </button>
      </div>

      {/* Main 12-Column Equivalent Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Left Column: Form & Commands List (Col 7 / 8) */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-6">
          {/* Add Form */}
          {showAddForm && (
            <form
              onSubmit={handleAddCommand}
              className="p-5 bg-dark-800 border border-dark-700 rounded-2xl space-y-4 animate-fadeIn shadow-sm"
            >
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Adicionar Novo Comando
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs text-dark-400 block mb-1">Gatilho / Nome do Comando</label>
                  <input
                    type="text"
                    value={newCmdName}
                    onChange={(e) => setNewCmdName(e.target.value)}
                    placeholder="ex: !ajuda ou !site"
                    className="w-full bg-dark-default border border-dark-700 rounded-xl px-3.5 py-2 text-xs text-white font-mono focus:outline-none focus:border-dark-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs text-dark-400 block mb-1">Resposta do Bot</label>
                  <input
                    type="text"
                    value={newCmdResponse}
                    onChange={(e) => setNewCmdResponse(e.target.value)}
                    placeholder="ex: Olá {user}, visite nosso site oficial em https://exemplo.com"
                    className="w-full bg-dark-default border border-dark-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-dark-500"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-3 py-1.5 bg-dark-700 text-dark-300 rounded-lg text-xs cursor-pointer hover:bg-dark-600 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-dark-100 hover:bg-white text-dark-default rounded-lg text-xs font-semibold cursor-pointer transition-colors"
                >
                  Salvar Comando
                </button>
              </div>
            </form>
          )}

          {/* Commands List */}
          <div className="bg-dark-800 border border-dark-700 rounded-2xl overflow-hidden shadow-xl">
            <div className="p-4 border-b border-dark-700 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-dark-300">
                Comandos Ativos ({commands.length})
              </span>
              <span className="text-xs text-dark-400">
                Gatilhos com prefixo <code className="text-violet-400 font-mono">!</code> ou <code className="text-violet-400 font-mono">/</code>
              </span>
            </div>

            <div className="divide-y divide-[#272a35]/60">
              {commands.map((cmd) => (
                <div
                  key={cmd.id}
                  className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-dark-700/50 transition-colors"
                >
                  <div className="space-y-1 min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-md bg-dark-700 text-dark-200 border border-dark-600">
                        {cmd.name}
                      </span>
                      {cmd.roleReward && (
                        <span className="text-[10px] px-2 py-0.2 rounded-md bg-dark-700 text-dark-300 border border-dark-600">
                          Atribui cargo @{cmd.roleReward}
                        </span>
                      )}
                      <span className="text-[11px] text-slate-500">
                        {cmd.usesCount.toLocaleString('pt-BR')} execuções
                      </span>
                    </div>
                    <p className="text-xs text-dark-300 leading-relaxed truncate">{cmd.response}</p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => setEditingCommand(cmd.name)}
                      className="p-2 text-dark-400 hover:text-white hover:bg-dark-700 rounded-lg transition-colors cursor-pointer"
                      title="Configurar comando"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(cmd.id)}
                      className="p-2 text-dark-400 hover:text-rose-400 hover:bg-dark-700 rounded-lg transition-colors cursor-pointer"
                      title="Excluir comando"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Placeholders & Quick Stats (Col 5 / 4) */}
        <div className="lg:col-span-5 xl:col-span-4 space-y-5">
          {/* Card: Placeholders / Variáveis */}
          <div className="bg-dark-800 border border-dark-700 rounded-2xl p-5 space-y-3.5 shadow-xs">
            <div className="flex items-center gap-2 pb-2 border-b border-dark-700">
              <Code2 className="w-4 h-4 text-violet-400" />
              <h5 className="text-xs font-bold uppercase tracking-wider text-dark-200">
                Variáveis Dinâmicas
              </h5>
            </div>
            <p className="text-xs text-dark-400 leading-relaxed">
              Insira tags no texto de resposta para personalizar a mensagem enviada pelo bot:
            </p>
            <div className="space-y-2">
              <div className="p-2.5 rounded-xl bg-dark-900 border border-dark-700 flex items-center justify-between">
                <code className="text-xs font-mono font-bold text-violet-300">{"{user}"}</code>
                <span className="text-xs text-dark-300">Menciona o autor</span>
              </div>
              <div className="p-2.5 rounded-xl bg-dark-900 border border-dark-700 flex items-center justify-between">
                <code className="text-xs font-mono font-bold text-violet-300">{"{server}"}</code>
                <span className="text-xs text-dark-300">Nome deste servidor</span>
              </div>
              <div className="p-2.5 rounded-xl bg-dark-900 border border-dark-700 flex items-center justify-between">
                <code className="text-xs font-mono font-bold text-violet-300">{"{channel}"}</code>
                <span className="text-xs text-dark-300">Canal atual</span>
              </div>
              <div className="p-2.5 rounded-xl bg-dark-900 border border-dark-700 flex items-center justify-between">
                <code className="text-xs font-mono font-bold text-violet-300">{"{count}"}</code>
                <span className="text-xs text-dark-300">Número de usos</span>
              </div>
            </div>
          </div>

          {/* Card: Estatísticas de Comandos */}
          <div className="bg-dark-800 border border-dark-700 rounded-2xl p-5 space-y-3.5 shadow-xs">
            <div className="flex items-center gap-2 pb-2 border-b border-dark-700">
              <BarChart2 className="w-4 h-4 text-emerald-400" />
              <h5 className="text-xs font-bold uppercase tracking-wider text-dark-200">
                Métricas de Execução
              </h5>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-dark-900 border border-dark-700">
                <span className="text-[11px] text-dark-400 block">Total Ativo</span>
                <span className="text-xl font-bold text-white font-display">{commands.length}</span>
              </div>
              <div className="p-3 rounded-xl bg-dark-900 border border-dark-700">
                <span className="text-[11px] text-dark-400 block">Total de Usos</span>
                <span className="text-xl font-bold text-emerald-400 font-display">
                  {totalUses.toLocaleString('pt-BR')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
