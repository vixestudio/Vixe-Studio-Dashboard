import React, { useState } from 'react';
import {
  Landmark,
  Coins,
  Sparkles,
  ShoppingBag,
  Terminal,
  ShieldAlert,
  RotateCcw,
  Plus,
  Trash2,
  Edit2,
  DollarSign,
  TrendingUp,
  Users,
  Award,
  AlertTriangle,
  Check,
  X,
  Lock,
  Flame,
  Gift,
  HelpCircle,
} from 'lucide-react';
import { ServerInfo } from '../types';
import {
  DiscordSwitch,
  DiscordColorPicker,
  DiscordChannelSelect,
  DiscordRoleSelect,
  UnsavedChangesBar,
} from './common';

export interface EconomyViewProps {
  currentServer: ServerInfo;
  onBackToDashboard?: () => void;
  onOpenDirectImageModal?: () => void;
}

export interface ShopItem {
  id: string;
  name: string;
  description: string;
  price: number;
  currencyType: 'primary' | 'secondary';
  type: 'role' | 'static' | 'mystery';
  roleId?: string;
  roleName?: string;
  color?: string;
  icon: string;
  stock: number | null; // null = unlimited
  isEnabled: boolean;
}

export interface EconomyCommand {
  id: string;
  name: string;
  alias: string;
  description: string;
  cooldown: number; // in seconds
  isEnabled: boolean;
  category: 'básico' | 'ganhos' | 'jogos' | 'loja';
}

const INITIAL_SHOP_ITEMS: ShopItem[] = [
  {
    id: 'item-1',
    name: 'Cargo VIP Ouro',
    description: 'Acesso a canais exclusivos, prioridade de voz e tag de ouro.',
    price: 5000,
    currencyType: 'primary',
    type: 'role',
    roleId: 'role-vip-ouro',
    roleName: 'VIP Ouro',
    color: '#FFD74E',
    icon: '👑',
    stock: null,
    isEnabled: true,
  },
  {
    id: 'item-2',
    name: 'Cargo Apoiador',
    description: 'Destaque no topo da lista de membros e ícone exclusivo.',
    price: 2500,
    currencyType: 'primary',
    type: 'role',
    roleId: 'role-apoiador',
    roleName: 'Apoiador',
    color: '#70B1FF',
    icon: '⭐',
    stock: null,
    isEnabled: true,
  },
  {
    id: 'item-3',
    name: 'Cor Personalizada no Nome',
    description: 'Item estático que permite escolher qualquer cor para seu apelido.',
    price: 1500,
    currencyType: 'primary',
    type: 'static',
    color: '#B072FF',
    icon: '🎨',
    stock: 50,
    isEnabled: true,
  },
  {
    id: 'item-4',
    name: 'Caixa Misteriosa Sortuda',
    description: 'Abra para concorrer a prêmios aleatórios entre 100 e 5.000 moedas!',
    price: 600,
    currencyType: 'primary',
    type: 'mystery',
    color: '#FF7673',
    icon: '🎁',
    stock: null,
    isEnabled: true,
  },
  {
    id: 'item-5',
    name: 'Passe Premium Mensal',
    description: 'Multiplicador de 2x moedas em todo o servidor por 30 dias.',
    price: 120,
    currencyType: 'secondary',
    type: 'static',
    color: '#6DE194',
    icon: '💎',
    stock: 20,
    isEnabled: true,
  },
];

const INITIAL_COMMANDS: EconomyCommand[] = [
  {
    id: 'cmd-daily',
    name: '/daily',
    alias: '/diario',
    description: 'Resgata a recompensa diária com bônus consecutivo (streak)',
    cooldown: 86400,
    isEnabled: true,
    category: 'ganhos',
  },
  {
    id: 'cmd-balance',
    name: '/saldo',
    alias: '/bal, /carteira',
    description: 'Verifica a quantidade de moedas na carteira e no banco do usuário',
    cooldown: 5,
    isEnabled: true,
    category: 'básico',
  },
  {
    id: 'cmd-pay',
    name: '/pagar',
    alias: '/transferir, /pix',
    description: 'Transfere moedas diretamente para a carteira de outro usuário',
    cooldown: 15,
    isEnabled: true,
    category: 'básico',
  },
  {
    id: 'cmd-work',
    name: '/trabalhar',
    alias: '/work',
    description: 'Realiza uma tarefa ou mini-jogo para ganhar moedas de trabalho',
    cooldown: 1800,
    isEnabled: true,
    category: 'ganhos',
  },
  {
    id: 'cmd-shop',
    name: '/loja',
    alias: '/shop, /mercado',
    description: 'Exibe os itens e cargos disponíveis para compra com detalhes',
    cooldown: 5,
    isEnabled: true,
    category: 'loja',
  },
  {
    id: 'cmd-buy',
    name: '/comprar',
    alias: '/buy',
    description: 'Adquire um item da loja do servidor debitando o saldo',
    cooldown: 10,
    isEnabled: true,
    category: 'loja',
  },
  {
    id: 'cmd-coinflip',
    name: '/apostar',
    alias: '/coinflip, /roleta',
    description: 'Aposta moedas no cara ou coroa contra o bot ou outro membro',
    cooldown: 30,
    isEnabled: true,
    category: 'jogos',
  },
  {
    id: 'cmd-rob',
    name: '/roubar',
    alias: '/crime, /assalto',
    description: 'Tenta roubar moedas de outro membro com risco de multa e prisão',
    cooldown: 7200,
    isEnabled: false,
    category: 'jogos',
  },
  {
    id: 'cmd-leaderboard',
    name: '/ranking-economia',
    alias: '/ricos, /top-coins',
    description: 'Exibe a tabela dos membros mais ricos e com maiores fortunas',
    cooldown: 10,
    isEnabled: true,
    category: 'básico',
  },
];

export const EconomyView: React.FC<EconomyViewProps> = ({
  currentServer,
  onBackToDashboard,
}) => {
  const [isActive, setIsActive] = useState(true);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [saveSuccessMessage, setSaveSuccessMessage] = useState<string | null>(null);

  // Tab navigation
  const [activeTab, setActiveTab] = useState<
    'moeda' | 'recompensas' | 'loja' | 'comandos' | 'restricoes' | 'gerenciar'
  >('moeda');

  // Currency Settings
  const [currencyName, setCurrencyName] = useState('Vixe Coins');
  const [currencySymbol, setCurrencySymbol] = useState('🪙');
  const [currencyColor, setCurrencyColor] = useState('#FFBB5C');
  const [startingBalance, setStartingBalance] = useState(250);
  const [hasSecondaryCurrency, setHasSecondaryCurrency] = useState(true);
  const [secondaryCurrencyName, setSecondaryCurrencyName] = useState('Gemas');
  const [secondaryCurrencySymbol, setSecondaryCurrencySymbol] = useState('💎');
  const [isEditingIconModalOpen, setIsEditingIconModalOpen] = useState(false);

  // Rewards Settings
  const [dailyAmount, setDailyAmount] = useState(300);
  const [dailyStreakPercent, setDailyStreakPercent] = useState(10);
  const [dailyMaxStreakDays, setDailyMaxStreakDays] = useState(7);
  const [chatMinReward, setChatMinReward] = useState(5);
  const [chatMaxReward, setChatMaxReward] = useState(15);
  const [chatCooldownSec, setChatCooldownSec] = useState(60);
  const [voiceRewardAmount, setVoiceRewardAmount] = useState(50);
  const [voiceIntervalMin, setVoiceIntervalMin] = useState(15);
  const [boostedChannels, setBoostedChannels] = useState<string[]>(['1']);

  // Shop & Items
  const [shopItems, setShopItems] = useState<ShopItem[]>(INITIAL_SHOP_ITEMS);
  const [isNewItemModalOpen, setIsNewItemModalOpen] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [newItemDesc, setNewItemDesc] = useState('');
  const [newItemPrice, setNewItemPrice] = useState(1000);
  const [newItemCurrency, setNewItemCurrency] = useState<'primary' | 'secondary'>('primary');
  const [newItemType, setNewItemType] = useState<'role' | 'static' | 'mystery'>('role');
  const [newItemRoles, setNewItemRoles] = useState<string[]>([]);
  const [newItemIcon, setNewItemIcon] = useState('🎁');
  const [newItemColor, setNewItemColor] = useState('#70B1FF');
  const [newItemStock, setNewItemStock] = useState<string>('ilimitado');

  // Commands
  const [commands, setCommands] = useState<EconomyCommand[]>(INITIAL_COMMANDS);

  // Restrictions
  const [dailyTransferLimit, setDailyTransferLimit] = useState(10000);
  const [restrictedChannels, setRestrictedChannels] = useState<string[]>([]);
  const [immuneRoles, setImmuneRoles] = useState<string[]>(['role-admin', 'role-mod']);

  // Management / Reset
  const [userAdjustmentQuery, setUserAdjustmentQuery] = useState('');
  const [adjustmentAmount, setAdjustmentAmount] = useState(500);
  const [adjustmentType, setAdjustmentType] = useState<'add' | 'remove'>('add');
  const [adjustmentNote, setAdjustmentNote] = useState('');
  const [adjustmentSuccess, setAdjustmentSuccess] = useState<string | null>(null);

  // Reset Confirmation Modal
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [resetConfirmText, setResetConfirmText] = useState('');

  const markChanged = () => {
    setHasUnsavedChanges(true);
    setSaveSuccessMessage(null);
  };

  const handleSave = () => {
    setHasUnsavedChanges(false);
    setSaveSuccessMessage('Configurações de economia salvas com sucesso!');
    setTimeout(() => {
      setSaveSuccessMessage(null);
    }, 3500);
  };

  const handleDiscard = () => {
    setHasUnsavedChanges(false);
  };

  const handleToggleCommand = (cmdId: string) => {
    setCommands((prev) =>
      prev.map((c) => (c.id === cmdId ? { ...c, isEnabled: !c.isEnabled } : c))
    );
    markChanged();
  };

  const handleCommandCooldownChange = (cmdId: string, newCooldown: number) => {
    setCommands((prev) =>
      prev.map((c) => (c.id === cmdId ? { ...c, cooldown: Math.max(0, newCooldown) } : c))
    );
    markChanged();
  };

  const handleToggleItem = (itemId: string) => {
    setShopItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, isEnabled: !item.isEnabled } : item))
    );
    markChanged();
  };

  const handleDeleteItem = (itemId: string) => {
    setShopItems((prev) => prev.filter((item) => item.id !== itemId));
    markChanged();
  };

  const handleCreateItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;

    const stockVal = newItemStock === 'ilimitado' || !newItemStock ? null : parseInt(newItemStock, 10) || null;

    const newItem: ShopItem = {
      id: `item-${Date.now()}`,
      name: newItemName.trim(),
      description: newItemDesc.trim() || 'Item da loja do servidor.',
      price: newItemPrice || 100,
      currencyType: newItemCurrency,
      type: newItemType,
      roleId: newItemRoles[0],
      roleName: newItemType === 'role' ? 'Cargo Personalizado' : undefined,
      color: newItemColor,
      icon: newItemIcon || '💎',
      stock: stockVal,
      isEnabled: true,
    };

    setShopItems((prev) => [...prev, newItem]);
    setIsNewItemModalOpen(false);
    setNewItemName('');
    setNewItemDesc('');
    setNewItemRoles([]);
    markChanged();
  };

  const handlePerformAdjustment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userAdjustmentQuery.trim()) return;

    const verb = adjustmentType === 'add' ? 'adicionadas a' : 'removidas de';
    setAdjustmentSuccess(
      `${adjustmentAmount} ${currencyName} foram ${verb} ${userAdjustmentQuery}! Motivo: ${adjustmentNote || 'Ajuste manual da administração'}.`
    );
    setUserAdjustmentQuery('');
    setAdjustmentNote('');
    setTimeout(() => {
      setAdjustmentSuccess(null);
    }, 4500);
  };

  const handleExecuteReset = () => {
    if (resetConfirmText !== 'RESETAR') return;
    setIsResetModalOpen(false);
    setResetConfirmText('');
    setSaveSuccessMessage('Economia reiniciada com sucesso! Todos os saldos foram redefinidos para o valor padrão.');
    setTimeout(() => {
      setSaveSuccessMessage(null);
    }, 4000);
  };

  return (
    <div
      className="flex flex-1 overflow-y-auto relative px-6 lg:px-10 py-0 lg:py-10 animate-fadeIn"
      id="dashboard__content"
    >
      <div className="min-h-full w-full max-w-[1540px] mx-auto space-y-6 pb-20">
        {/* Toast Banner */}
      {saveSuccessMessage && (
        <div className="fixed top-20 right-6 z-50 flex items-center gap-3 bg-emerald-600 text-white px-5 py-3 rounded-xl shadow-2xl border border-emerald-500 animate-in fade-in slide-in-from-top-4 duration-200">
          <Check className="w-5 h-5 shrink-0" />
          <span className="text-sm font-medium">{saveSuccessMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between mb-8 lg:mb-6">
        <div className="flex flex-col grow items-center lg:items-start">
          <div className="bg-dark-800 sm:bg-transparent flex items-center justify-between w-[calc(100%+48px)] sm:w-full px-6 py-4 sm:px-0 sm:py-0 mb-3 sm:mb-0">
            <button
              type="button"
              onClick={onBackToDashboard}
              aria-label="Voltar"
              className="sm:hidden text-dark-100 p-1 hover:bg-dark-700 rounded-lg transition-colors cursor-pointer"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.5 17l-5-5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div className="flex items-center gap-3 flex-1 text-center lg:text-left">
              <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Landmark className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-dark-100 text-2xl">Economia</h4>
            </div>
            <div>
              <DiscordSwitch
                checked={isActive}
                onChange={(state) => {
                  setIsActive(state);
                  markChanged();
                }}
                label={isActive ? 'Ativo' : 'Desativado'}
                activeColor="blurple"
                switchPosition="right"
              />
            </div>
          </div>
          <p className="text-base text-dark-300 max-w-[830px] ml-0 w-full mt-3 text-center sm:text-left">
            Crie uma experiência vibrante e engajadora no seu servidor com moedas personalizadas, recompensas diárias, loja de cargos compráveis, mini-jogos e comandos de economia.
          </p>
        </div>
      </div>

      {/* Tab Navigation Pill Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-dark-700/80">
        {[
          { id: 'moeda', label: 'Moeda & Símbolo', icon: Coins },
          { id: 'recompensas', label: 'Daily & Ganhos', icon: Flame },
          { id: 'loja', label: 'Loja do Servidor', icon: ShoppingBag },
          { id: 'comandos', label: 'Comandos (/daily, etc.)', icon: Terminal },
          { id: 'restricoes', label: 'Restrições & Anti-Abuso', icon: ShieldAlert },
          { id: 'gerenciar', label: 'Saldos & Reset', icon: RotateCcw },
        ].map((tab) => {
          const Icon = tab.icon;
          const isSelected = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                isSelected
                  ? 'bg-brand-default text-dark-900 font-bold shadow-sm'
                  : 'text-dark-300 hover:text-white hover:bg-dark-800'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: MOEDA & SÍMBOLO */}
      {activeTab === 'moeda' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start animate-fadeIn">
          {/* Main Currency Settings */}
          <div className="lg:col-span-8 space-y-6">
            <div className="p-6 bg-dark-800 border border-dark-700/80 rounded-2xl space-y-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-dark-700/80 pb-4">
                <div>
                  <h3 className="text-base font-bold text-dark-100 flex items-center gap-2">
                    <Coins className="w-4 h-4 text-amber-400" />
                    Moeda Principal
                  </h3>
                  <p className="text-xs text-dark-400 mt-0.5">
                    Defina o nome, representação visual e valores iniciais da sua moeda oficial.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Nome da Moeda */}
                <div>
                  <label className="text-xs font-semibold text-dark-300 block mb-2 uppercase tracking-wider">
                    Nome da Moeda
                  </label>
                  <input
                    type="text"
                    value={currencyName}
                    onChange={(e) => {
                      setCurrencyName(e.target.value);
                      markChanged();
                    }}
                    placeholder="Ex: Vixe Coins, Rubis, Ouros"
                    className="w-full bg-dark-900 border border-dark-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#5865F2] transition-colors"
                  />
                  <p className="text-[11px] text-dark-400 mt-1.5">
                    Nome exibido nas mensagens, perfis e comandos do bot.
                  </p>
                </div>

                {/* Símbolo / Ícone */}
                <div>
                  <label className="text-xs font-semibold text-dark-300 block mb-2 uppercase tracking-wider">
                    Ícone / Emoji da Moeda
                  </label>
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-dark-900 border border-dark-700 flex items-center justify-center text-xl shrink-0">
                      {currencySymbol}
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsEditingIconModalOpen(true)}
                      className="px-3.5 py-2 bg-dark-750 hover:bg-dark-700 border border-dark-700 text-xs font-semibold text-dark-100 rounded-xl transition-colors cursor-pointer flex items-center gap-2"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      Editar ícone da moeda
                    </button>
                  </div>
                  <p className="text-[11px] text-dark-400 mt-1.5">
                    Emoji ou caractere que acompanha os valores de saldo.
                  </p>
                </div>
              </div>

              {/* Cor Temática da Moeda com DiscordColorPicker */}
              <div className="border-t border-dark-700/60 pt-5">
                <label className="text-xs font-semibold text-dark-300 block mb-2 uppercase tracking-wider">
                  Cor Temática da Moeda (Embeds & Badges)
                </label>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <DiscordColorPicker
                      color={currencyColor}
                      onChange={(c) => {
                        setCurrencyColor(c);
                        markChanged();
                      }}
                      triggerType="wheel"
                    />
                  </div>
                  <div className="flex items-center gap-2 bg-dark-900 border border-dark-700 rounded-xl px-3 py-1.5">
                    <div className="w-4 h-4 rounded-full shadow-inner" style={{ backgroundColor: currencyColor }} />
                    <span className="text-xs font-mono font-medium text-dark-200 uppercase">{currencyColor}</span>
                  </div>
                  <span className="text-xs text-dark-400">
                    Utilizada na borda lateral de mensagens e alertas de saldo no Discord.
                  </span>
                </div>
              </div>

              {/* Saldo Inicial para novos membros */}
              <div className="border-t border-dark-700/60 pt-5">
                <label className="text-xs font-semibold text-dark-300 block mb-2 uppercase tracking-wider">
                  Saldo Inicial para Novos Membros
                </label>
                <div className="max-w-xs flex items-center gap-3">
                  <div className="relative flex-1">
                    <input
                      type="number"
                      min={0}
                      value={startingBalance}
                      onChange={(e) => {
                        setStartingBalance(parseInt(e.target.value, 10) || 0);
                        markChanged();
                      }}
                      className="w-full bg-dark-900 border border-dark-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#5865F2]"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-400 text-sm">
                      {currencySymbol}
                    </span>
                  </div>
                </div>
                <p className="text-[11px] text-dark-400 mt-1.5">
                  Quantidade creditada automaticamente assim que um novo membro entra no servidor.
                </p>
              </div>
            </div>

            {/* Secondary Currency (Premium / Gems) */}
            <div className="p-6 bg-dark-800 border border-dark-700/80 rounded-2xl space-y-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-dark-700/80 pb-4">
                <div>
                  <h3 className="text-base font-bold text-dark-100 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-purple-400" />
                    Moeda Secundária / Premium
                  </h3>
                  <p className="text-xs text-dark-400 mt-0.5">
                    Ative uma moeda rara (ex: Gemas, Cristais) para recompensas de eventos, boosts ou doações.
                  </p>
                </div>
                <DiscordSwitch
                  checked={hasSecondaryCurrency}
                  onChange={(val) => {
                    setHasSecondaryCurrency(val);
                    markChanged();
                  }}
                  activeColor="blurple"
                />
              </div>

              {hasSecondaryCurrency && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-1 animate-fadeIn">
                  <div>
                    <label className="text-xs font-semibold text-dark-300 block mb-2 uppercase tracking-wider">
                      Nome da Moeda Secundária
                    </label>
                    <input
                      type="text"
                      value={secondaryCurrencyName}
                      onChange={(e) => {
                        setSecondaryCurrencyName(e.target.value);
                        markChanged();
                      }}
                      placeholder="Ex: Gemas, Diamantes"
                      className="w-full bg-dark-900 border border-dark-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#5865F2]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-dark-300 block mb-2 uppercase tracking-wider">
                      Símbolo / Emoji Secundário
                    </label>
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-dark-900 border border-dark-700 flex items-center justify-center text-xl shrink-0">
                        {secondaryCurrencySymbol}
                      </div>
                      <input
                        type="text"
                        maxLength={4}
                        value={secondaryCurrencySymbol}
                        onChange={(e) => {
                          setSecondaryCurrencySymbol(e.target.value);
                          markChanged();
                        }}
                        className="w-20 bg-dark-900 border border-dark-700 rounded-xl px-3 py-2 text-center text-base text-white focus:outline-none focus:border-[#5865F2]"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Side: Live Discord Preview Card */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-5 bg-dark-800 border border-dark-700/80 rounded-2xl space-y-4">
              <span className="text-xs font-bold text-dark-400 uppercase tracking-wider block">
                Pré-visualização do /saldo
              </span>

              {/* Discord Embed Preview Container */}
              <div className="bg-[#2b2d31] rounded-xl p-4 border border-[#1e1f22] text-white shadow-lg space-y-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-[#5865F2] flex items-center justify-center text-white font-bold text-sm">
                    {currentServer.name.substring(0, 1)}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-white">{currentServer.name}</span>
                      <span className="bg-[#5865F2] text-[9px] uppercase px-1 py-0.2 rounded font-bold">bot</span>
                    </div>
                    <span className="text-[10px] text-zinc-400">Hoje às 14:32</span>
                  </div>
                </div>

                {/* Embed Body with Colored Lateral Stripe */}
                <div className="flex bg-[#232428] rounded-lg overflow-hidden border border-black/20">
                  <div className="w-1 shrink-0" style={{ backgroundColor: currencyColor }} />
                  <div className="p-3.5 space-y-2.5 flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                        <span>Carteira & Saldo</span>
                        <span>{currencySymbol}</span>
                      </h4>
                      <span className="text-[10px] text-zinc-400">@Astral</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="bg-black/25 rounded-md p-2">
                        <span className="text-[10px] text-zinc-400 block">Carteira:</span>
                        <span className="font-bold text-emerald-400">
                          1.450 {currencySymbol}
                        </span>
                      </div>
                      <div className="bg-black/25 rounded-md p-2">
                        <span className="text-[10px] text-zinc-400 block">Banco:</span>
                        <span className="font-bold text-amber-300">
                          12.800 {currencySymbol}
                        </span>
                      </div>
                    </div>

                    {hasSecondaryCurrency && (
                      <div className="bg-black/25 rounded-md p-2 text-xs flex items-center justify-between">
                        <span className="text-[10px] text-zinc-400">{secondaryCurrencyName}:</span>
                        <span className="font-bold text-purple-300">
                          45 {secondaryCurrencySymbol}
                        </span>
                      </div>
                    )}

                    <div className="pt-1 text-[10px] text-zinc-400 border-t border-white/5 flex items-center justify-between">
                      <span>Sequência diária: 5 dias 🔥</span>
                      <span>Posição: #3</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Informative tips box */}
              <div className="p-3.5 bg-dark-900/60 rounded-xl border border-dark-700/60 text-xs text-dark-300 space-y-1">
                <p className="font-semibold text-dark-200 flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
                  Dica de Economia
                </p>
                <p className="text-[11px] text-dark-400 leading-relaxed">
                  Os membros adoram competir! Aumente o engajamento ativando multiplicadores de bônus diários para manter os usuários retornando ao servidor.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: RECOMPENSAS & DAILY */}
      {activeTab === 'recompensas' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start animate-fadeIn">
          <div className="lg:col-span-8 space-y-6">
            {/* Daily (/daily) Card */}
            <div className="p-6 bg-dark-800 border border-dark-700/80 rounded-2xl space-y-6 shadow-sm">
              <div className="border-b border-dark-700/80 pb-4">
                <h3 className="text-base font-bold text-dark-100 flex items-center gap-2">
                  <Flame className="w-4 h-4 text-orange-400" />
                  Resgate Diário (/daily) & Sequência (Streak)
                </h3>
                <p className="text-xs text-dark-400 mt-0.5">
                  Recompensa que pode ser resgatada 1x a cada 24 horas, acumulando bônus para quem entra todos os dias.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                  <label className="text-xs font-semibold text-dark-300 block mb-2 uppercase tracking-wider">
                    Valor Base Diário
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min={10}
                      value={dailyAmount}
                      onChange={(e) => {
                        setDailyAmount(parseInt(e.target.value, 10) || 0);
                        markChanged();
                      }}
                      className="w-full bg-dark-900 border border-dark-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#5865F2]"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-400 text-xs">
                      {currencySymbol}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-dark-300 block mb-2 uppercase tracking-wider">
                    Bônus por Dia Consecutivo
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={dailyStreakPercent}
                      onChange={(e) => {
                        setDailyStreakPercent(parseInt(e.target.value, 10) || 0);
                        markChanged();
                      }}
                      className="w-full bg-dark-900 border border-dark-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#5865F2]"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-400 text-xs font-bold">
                      %
                    </span>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-dark-300 block mb-2 uppercase tracking-wider">
                    Dias Máximos de Streak
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={30}
                    value={dailyMaxStreakDays}
                    onChange={(e) => {
                      setDailyMaxStreakDays(parseInt(e.target.value, 10) || 1);
                      markChanged();
                    }}
                    className="w-full bg-dark-900 border border-dark-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#5865F2]"
                  />
                </div>
              </div>

              {/* Streak Preview Pill Row */}
              <div className="p-4 bg-dark-900/70 border border-dark-700/60 rounded-xl space-y-2">
                <span className="text-xs font-semibold text-dark-300 block">
                  Simulação do bônus diário para os membros:
                </span>
                <div className="flex flex-wrap gap-2">
                  {Array.from({ length: Math.min(7, dailyMaxStreakDays) }).map((_, idx) => {
                    const day = idx + 1;
                    const bonusMult = 1 + ((day - 1) * dailyStreakPercent) / 100;
                    const totalReward = Math.round(dailyAmount * bonusMult);
                    return (
                      <div
                        key={day}
                        className="px-3 py-1.5 rounded-lg bg-dark-800 border border-dark-700 text-center text-xs"
                      >
                        <span className="text-[10px] text-dark-400 block">Dia {day}</span>
                        <span className="font-bold text-amber-400">
                          {totalReward} {currencySymbol}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Chat & Voice Activity Rewards Card */}
            <div className="p-6 bg-dark-800 border border-dark-700/80 rounded-2xl space-y-6 shadow-sm">
              <div className="border-b border-dark-700/80 pb-4">
                <h3 className="text-base font-bold text-dark-100 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  Ganhos por Atividade no Chat e em Canais de Voz
                </h3>
                <p className="text-xs text-dark-400 mt-0.5">
                  Recompense membros ativos que conversam em texto ou passam tempo em chamadas de voz.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                  <label className="text-xs font-semibold text-dark-300 block mb-2 uppercase tracking-wider">
                    Moedas Mínimas por Mensagem
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={chatMinReward}
                    onChange={(e) => {
                      setChatMinReward(parseInt(e.target.value, 10) || 1);
                      markChanged();
                    }}
                    className="w-full bg-dark-900 border border-dark-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#5865F2]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-dark-300 block mb-2 uppercase tracking-wider">
                    Moedas Máximas por Mensagem
                  </label>
                  <input
                    type="number"
                    min={chatMinReward}
                    value={chatMaxReward}
                    onChange={(e) => {
                      setChatMaxReward(parseInt(e.target.value, 10) || chatMinReward);
                      markChanged();
                    }}
                    className="w-full bg-dark-900 border border-dark-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#5865F2]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-dark-300 block mb-2 uppercase tracking-wider">
                    Cooldown no Chat (Segundos)
                  </label>
                  <input
                    type="number"
                    min={10}
                    value={chatCooldownSec}
                    onChange={(e) => {
                      setChatCooldownSec(parseInt(e.target.value, 10) || 60);
                      markChanged();
                    }}
                    className="w-full bg-dark-900 border border-dark-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#5865F2]"
                  />
                </div>
              </div>

              {/* Voice Call Settings */}
              <div className="border-t border-dark-700/60 pt-5 grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-xs font-semibold text-dark-300 block mb-2 uppercase tracking-wider">
                    Moedas por Intervalo em Chamada
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min={0}
                      value={voiceRewardAmount}
                      onChange={(e) => {
                        setVoiceRewardAmount(parseInt(e.target.value, 10) || 0);
                        markChanged();
                      }}
                      className="w-full bg-dark-900 border border-dark-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#5865F2]"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-400 text-xs">
                      {currencySymbol}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-dark-300 block mb-2 uppercase tracking-wider">
                    Intervalo de Voz (Minutos)
                  </label>
                  <input
                    type="number"
                    min={5}
                    value={voiceIntervalMin}
                    onChange={(e) => {
                      setVoiceIntervalMin(parseInt(e.target.value, 10) || 15);
                      markChanged();
                    }}
                    className="w-full bg-dark-900 border border-dark-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#5865F2]"
                  />
                </div>
              </div>

              {/* Boosted Channels */}
              <div className="border-t border-dark-700/60 pt-5">
                <label className="text-xs font-semibold text-dark-300 block mb-2 uppercase tracking-wider">
                  Canais com Multiplicador de Recompensa 2x
                </label>
                <DiscordChannelSelect
                  selectedChannelIds={boostedChannels}
                  onChange={(channels) => {
                    setBoostedChannels(channels);
                    markChanged();
                  }}
                  placeholder="Selecione canais que concedem bônus duplo de moedas"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <div className="p-5 bg-dark-800 border border-dark-700/80 rounded-2xl space-y-4">
              <span className="text-xs font-bold text-dark-400 uppercase tracking-wider block">
                Mecanismos Anti-Spam
              </span>
              <div className="space-y-3 text-xs text-dark-300">
                <div className="flex items-start gap-2.5 p-3 bg-dark-900 rounded-xl border border-dark-700/60">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-dark-100 block">Filtro de Mensagens Curtas</span>
                    <span className="text-[11px] text-dark-400">Mensagens com menos de 5 caracteres não geram moedas.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 bg-dark-900 rounded-xl border border-dark-700/60">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-dark-100 block">Detecção de Usuário AFK</span>
                    <span className="text-[11px] text-dark-400">Usuários mutados ou ensurdecidos em canais de voz não recebem recompensas.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 bg-dark-900 rounded-xl border border-dark-700/60">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-dark-100 block">Proteção contra Bots</span>
                    <span className="text-[11px] text-dark-400">Outros bots de terceiros são ignorados automaticamente.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: LOJA DO SERVIDOR & ITENS */}
      {activeTab === 'loja' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Header Action Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-dark-800 border border-dark-700/80 rounded-2xl">
            <div>
              <h3 className="text-base font-bold text-dark-100 flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-[#5865F2]" />
                Catálogo da Loja (/loja)
              </h3>
              <p className="text-xs text-dark-400 mt-0.5">
                Cargos do Discord, itens estáticos, cores personalizadas e caixas que membros podem comprar com moedas.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsNewItemModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-default hover:bg-brand-hover text-dark-900 text-xs font-bold transition-all shadow-sm cursor-pointer shrink-0"
            >
              <Plus className="w-4 h-4" />
              Adicionar Item à Loja
            </button>
          </div>

          {/* Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {shopItems.map((item) => (
              <div
                key={item.id}
                className={`p-5 rounded-2xl border transition-all ${
                  item.isEnabled
                    ? 'bg-dark-800 border-dark-700/80 shadow-xs'
                    : 'bg-dark-850/60 border-dark-800 opacity-60'
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0 shadow-inner"
                      style={{
                        backgroundColor: item.color ? `${item.color}20` : '#313338',
                        borderColor: item.color ? `${item.color}50` : '#404249',
                        borderWidth: 1,
                      }}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-dark-100 flex items-center gap-1.5">
                        {item.name}
                      </h4>
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-dark-900 text-dark-300 inline-block mt-0.5">
                        {item.type === 'role' ? 'Cargo Discord' : item.type === 'mystery' ? 'Caixa Misteriosa' : 'Item Estático'}
                      </span>
                    </div>
                  </div>

                  <DiscordSwitch
                    checked={item.isEnabled}
                    onChange={() => handleToggleItem(item.id)}
                    activeColor="blurple"
                  />
                </div>

                <p className="text-xs text-dark-300 min-h-[36px] line-clamp-2 mb-4 leading-relaxed">
                  {item.description}
                </p>

                {/* Price & Stock Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-dark-700/60 text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-amber-400">
                    <span>{item.price.toLocaleString('pt-BR')}</span>
                    <span>{item.currencyType === 'primary' ? currencySymbol : secondaryCurrencySymbol}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-dark-400">
                      {item.stock === null ? 'Estoque Ilimitado' : `${item.stock} restantes`}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleDeleteItem(item.id)}
                      className="p-1.5 text-dark-400 hover:text-red-400 hover:bg-dark-700 rounded-lg transition-colors cursor-pointer"
                      title="Excluir item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: COMANDOS (/daily, /saldo, etc.) */}
      {activeTab === 'comandos' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="p-5 bg-dark-800 border border-dark-700/80 rounded-2xl">
            <h3 className="text-base font-bold text-dark-100 flex items-center gap-2">
              <Terminal className="w-4 h-4 text-emerald-400" />
              Comandos de Slash e Mensagem
            </h3>
            <p className="text-xs text-dark-400 mt-0.5">
              Ative ou desative comandos individuais da economia e defina o tempo de espera (cooldown) para cada um.
            </p>
          </div>

          <div className="bg-dark-800 border border-dark-700/80 rounded-2xl overflow-hidden divide-y divide-dark-700/60 shadow-sm">
            {commands.map((cmd) => (
              <div
                key={cmd.id}
                className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-dark-750/40 transition-colors"
              >
                <div className="space-y-1 min-w-0 flex-1">
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-sm font-bold text-[#70B1FF] bg-[#70B1FF]/10 px-2 py-0.5 rounded-md">
                      {cmd.name}
                    </span>
                    <span className="text-xs text-dark-400">({cmd.alias})</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-dark-400 px-2 py-0.5 rounded-full bg-dark-900">
                      {cmd.category}
                    </span>
                  </div>
                  <p className="text-xs text-dark-300">{cmd.description}</p>
                </div>

                <div className="flex items-center gap-4 shrink-0 justify-between sm:justify-end">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-dark-400">Cooldown:</span>
                    <input
                      type="number"
                      min={0}
                      value={cmd.cooldown}
                      onChange={(e) =>
                        handleCommandCooldownChange(cmd.id, parseInt(e.target.value, 10) || 0)
                      }
                      className="w-20 bg-dark-900 border border-dark-700 rounded-lg px-2.5 py-1.5 text-xs text-center text-white focus:outline-none focus:border-[#5865F2]"
                    />
                    <span className="text-xs text-dark-400">seg</span>
                  </div>

                  <DiscordSwitch
                    checked={cmd.isEnabled}
                    onChange={() => handleToggleCommand(cmd.id)}
                    activeColor="blurple"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: RESTRIÇÕES & ANTI-ABUSO */}
      {activeTab === 'restricoes' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start animate-fadeIn">
          <div className="lg:col-span-8 space-y-6">
            <div className="p-6 bg-dark-800 border border-dark-700/80 rounded-2xl space-y-6 shadow-sm">
              <div className="border-b border-dark-700/80 pb-4">
                <h3 className="text-base font-bold text-dark-100 flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-red-400" />
                  Regras de Segurança & Anti-Fraude
                </h3>
                <p className="text-xs text-dark-400 mt-0.5">
                  Evite transferências fraudulentas entre contas secundárias (alts) e controle onde os comandos podem ser usados.
                </p>
              </div>

              {/* Limite de Transferência Diária */}
              <div>
                <label className="text-xs font-semibold text-dark-300 block mb-2 uppercase tracking-wider">
                  Limite Máximo de Transferência Diária entre Membros (/pagar)
                </label>
                <div className="max-w-xs relative">
                  <input
                    type="number"
                    min={100}
                    value={dailyTransferLimit}
                    onChange={(e) => {
                      setDailyTransferLimit(parseInt(e.target.value, 10) || 0);
                      markChanged();
                    }}
                    className="w-full bg-dark-900 border border-dark-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#5865F2]"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-400 text-xs">
                    {currencySymbol} / dia
                  </span>
                </div>
                <p className="text-[11px] text-dark-400 mt-1.5">
                  Impede que grandes quantias sejam movidas rapidamente em caso de invasão de conta.
                </p>
              </div>

              {/* Canais Ignorados */}
              <div className="border-t border-dark-700/60 pt-5">
                <label className="text-xs font-semibold text-dark-300 block mb-2 uppercase tracking-wider">
                  Canais Bloqueados para Comandos de Economia
                </label>
                <DiscordChannelSelect
                  selectedChannelIds={restrictedChannels}
                  onChange={(channels) => {
                    setRestrictedChannels(channels);
                    markChanged();
                  }}
                  placeholder="Selecione canais onde comandos de bot são proibidos (ex: #regras, #anuncios)"
                />
              </div>

              {/* Cargos Imunes a Roubo */}
              <div className="border-t border-dark-700/60 pt-5">
                <label className="text-xs font-semibold text-dark-300 block mb-2 uppercase tracking-wider">
                  Cargos Imunes a Roubo (/roubar, /crime)
                </label>
                <DiscordRoleSelect
                  selectedRoleIds={immuneRoles}
                  onChange={(roles) => {
                    setImmuneRoles(roles);
                    markChanged();
                  }}
                  placeholder="Selecione os cargos protegidos contra roubos"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <div className="p-5 bg-dark-800 border border-dark-700/80 rounded-2xl space-y-4">
              <span className="text-xs font-bold text-dark-400 uppercase tracking-wider block">
                Auditoria & Logs
              </span>
              <p className="text-xs text-dark-300 leading-relaxed">
                Todas as transações suspeitas ou comandos abusivos são registrados no canal de logs da moderação do Vixe Bot.
              </p>
              <div className="p-3 bg-dark-900 rounded-xl border border-dark-700/60 text-xs space-y-2">
                <div className="flex items-center justify-between text-dark-300">
                  <span>Tentativas de roubo hoje:</span>
                  <span className="font-bold text-white">42</span>
                </div>
                <div className="flex items-center justify-between text-dark-300">
                  <span>Multas aplicadas:</span>
                  <span className="font-bold text-amber-400">18.400 {currencySymbol}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: SALDOS & RESET */}
      {activeTab === 'gerenciar' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Stats Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 bg-dark-800 border border-dark-700/80 rounded-2xl">
              <span className="text-[11px] font-bold uppercase tracking-wider text-dark-400 block mb-1">
                Total em Circulação
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-black text-amber-400">1.482.350</span>
                <span className="text-sm text-dark-300">{currencySymbol}</span>
              </div>
            </div>

            <div className="p-5 bg-dark-800 border border-dark-700/80 rounded-2xl">
              <span className="text-[11px] font-bold uppercase tracking-wider text-dark-400 block mb-1">
                Membros com Saldo
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-black text-white">1.240</span>
                <span className="text-sm text-dark-400">usuários</span>
              </div>
            </div>

            <div className="p-5 bg-dark-800 border border-dark-700/80 rounded-2xl">
              <span className="text-[11px] font-bold uppercase tracking-wider text-dark-400 block mb-1">
                Média por Usuário
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-black text-emerald-400">1.195</span>
                <span className="text-sm text-dark-300">{currencySymbol}</span>
              </div>
            </div>

            <div className="p-5 bg-dark-800 border border-dark-700/80 rounded-2xl">
              <span className="text-[11px] font-bold uppercase tracking-wider text-dark-400 block mb-1">
                Maior Fortuna
              </span>
              <div className="flex items-baseline gap-1.5 truncate">
                <span className="text-2xl font-black text-purple-400">84.500</span>
                <span className="text-xs text-dark-400 truncate">@Astral</span>
              </div>
            </div>
          </div>

          {/* Quick Adjustment Box */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-8 p-6 bg-dark-800 border border-dark-700/80 rounded-2xl space-y-6">
              <div className="border-b border-dark-700/80 pb-4">
                <h3 className="text-base font-bold text-dark-100 flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-emerald-400" />
                  Ajuste Manual de Saldo (Adicionar ou Remover Moedas)
                </h3>
                <p className="text-xs text-dark-400 mt-0.5">
                  Adicione recompensas de eventos especiais ou penalize membros que violaram as regras.
                </p>
              </div>

              {adjustmentSuccess && (
                <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-xs text-emerald-300 flex items-center gap-2 animate-fadeIn">
                  <Check className="w-4 h-4 shrink-0 text-emerald-400" />
                  <span>{adjustmentSuccess}</span>
                </div>
              )}

              <form onSubmit={handlePerformAdjustment} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-1">
                    <label className="text-xs font-semibold text-dark-300 block mb-2 uppercase tracking-wider">
                      Ação
                    </label>
                    <select
                      value={adjustmentType}
                      onChange={(e) => setAdjustmentType(e.target.value as 'add' | 'remove')}
                      className="w-full bg-dark-900 border border-dark-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#5865F2]"
                    >
                      <option value="add">Adicionar (+) moedas</option>
                      <option value="remove">Remover (-) moedas</option>
                    </select>
                  </div>

                  <div className="sm:col-span-1">
                    <label className="text-xs font-semibold text-dark-300 block mb-2 uppercase tracking-wider">
                      Usuário (ID ou @Nome)
                    </label>
                    <input
                      type="text"
                      required
                      value={userAdjustmentQuery}
                      onChange={(e) => setUserAdjustmentQuery(e.target.value)}
                      placeholder="@membro ou ID Discord"
                      className="w-full bg-dark-900 border border-dark-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#5865F2]"
                    />
                  </div>

                  <div className="sm:col-span-1">
                    <label className="text-xs font-semibold text-dark-300 block mb-2 uppercase tracking-wider">
                      Quantidade
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        min={1}
                        required
                        value={adjustmentAmount}
                        onChange={(e) => setAdjustmentAmount(parseInt(e.target.value, 10) || 1)}
                        className="w-full bg-dark-900 border border-dark-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#5865F2]"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-400 text-xs">
                        {currencySymbol}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-dark-300 block mb-2 uppercase tracking-wider">
                    Motivo da Modificação (Opcional)
                  </label>
                  <input
                    type="text"
                    value={adjustmentNote}
                    onChange={(e) => setAdjustmentNote(e.target.value)}
                    placeholder="Ex: Prêmio do Torneio de Valorant"
                    className="w-full bg-dark-900 border border-dark-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#5865F2]"
                  />
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-brand-default hover:bg-brand-hover text-dark-900 text-xs font-bold transition-all shadow-sm cursor-pointer"
                  >
                    Confirmar Alteração de Saldo
                  </button>
                </div>
              </form>
            </div>

            {/* Danger Zone: Reset Economy */}
            <div className="lg:col-span-4 p-6 bg-red-950/20 border border-red-900/40 rounded-2xl space-y-4">
              <div className="flex items-center gap-2.5 text-red-400">
                <AlertTriangle className="w-5 h-5 shrink-0" />
                <h4 className="text-sm font-bold uppercase tracking-wider">Zona de Perigo</h4>
              </div>
              <p className="text-xs text-dark-300 leading-relaxed">
                Deseja reiniciar a economia do servidor para o início de uma nova temporada? Esta ação zera todas as carteiras e bancos de todos os membros.
              </p>
              <button
                type="button"
                onClick={() => setIsResetModalOpen(true)}
                className="w-full py-2.5 px-4 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-md shadow-red-900/30"
              >
                <RotateCcw className="w-4 h-4" />
                Resetar Economia do Servidor
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: EDITAR ÍCONE DA MOEDA */}
      {isEditingIconModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-dark-800 border border-dark-700 rounded-2xl shadow-2xl p-6 space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-dark-700/80 pb-3">
              <h3 className="text-base font-bold text-dark-100 flex items-center gap-2">
                <Coins className="w-4 h-4 text-amber-400" />
                Editar Ícone da Moeda
              </h3>
              <button
                type="button"
                onClick={() => setIsEditingIconModalOpen(false)}
                className="p-1 rounded-lg text-dark-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-dark-300 block mb-2 uppercase tracking-wider">
                  Presets Rápidos de Emoji
                </label>
                <div className="grid grid-cols-6 gap-2">
                  {['🪙', '💰', '💎', '👑', '⭐', '⚡', '🍀', '🔥', '🏆', '🎯', '💵', '🎖️'].map((em) => (
                    <button
                      key={em}
                      type="button"
                      onClick={() => {
                        setCurrencySymbol(em);
                        markChanged();
                      }}
                      className={`h-11 rounded-xl text-xl flex items-center justify-center border transition-all cursor-pointer ${
                        currencySymbol === em
                          ? 'bg-brand-default/15 border-brand-default text-white scale-105 shadow-md'
                          : 'bg-dark-900 border-dark-700 hover:bg-dark-750'
                      }`}
                    >
                      {em}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-dark-300 block mb-2 uppercase tracking-wider">
                  Ou digite um emoji ou caractere customizado
                </label>
                <input
                  type="text"
                  maxLength={4}
                  value={currencySymbol}
                  onChange={(e) => {
                    setCurrencySymbol(e.target.value);
                    markChanged();
                  }}
                  className="w-full bg-dark-900 border border-dark-700 rounded-xl px-4 py-2.5 text-center text-xl text-white focus:outline-none focus:border-[#5865F2]"
                />
              </div>
            </div>

            <div className="flex justify-end pt-3 border-t border-dark-700/80">
              <button
                type="button"
                onClick={() => setIsEditingIconModalOpen(false)}
                className="px-5 py-2 rounded-xl bg-brand-default hover:bg-brand-hover text-dark-900 text-xs font-bold transition-colors cursor-pointer"
              >
                Concluir
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: CRIAR NOVO ITEM NA LOJA */}
      {isNewItemModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-dark-800 border border-dark-700 rounded-2xl shadow-2xl p-6 space-y-5 animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-dark-700/80 pb-3">
              <h3 className="text-base font-bold text-dark-100 flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-[#5865F2]" />
                Adicionar Novo Item à Loja
              </h3>
              <button
                type="button"
                onClick={() => setIsNewItemModalOpen(false)}
                className="p-1 rounded-lg text-dark-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateItem} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-dark-300 block mb-1.5 uppercase tracking-wider">
                  Nome do Item
                </label>
                <input
                  type="text"
                  required
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  placeholder="Ex: Cargo Dono do Chat, Cor Vermelha, Caixa VIP"
                  className="w-full bg-dark-900 border border-dark-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#5865F2]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-dark-300 block mb-1.5 uppercase tracking-wider">
                  Descrição do Item
                </label>
                <textarea
                  rows={2}
                  value={newItemDesc}
                  onChange={(e) => setNewItemDesc(e.target.value)}
                  placeholder="Benefícios e instruções de uso deste item..."
                  className="w-full bg-dark-900 border border-dark-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#5865F2] resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-dark-300 block mb-1.5 uppercase tracking-wider">
                    Preço
                  </label>
                  <input
                    type="number"
                    min={1}
                    required
                    value={newItemPrice}
                    onChange={(e) => setNewItemPrice(parseInt(e.target.value, 10) || 1)}
                    className="w-full bg-dark-900 border border-dark-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#5865F2]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-dark-300 block mb-1.5 uppercase tracking-wider">
                    Moeda de Pagamento
                  </label>
                  <select
                    value={newItemCurrency}
                    onChange={(e) => setNewItemCurrency(e.target.value as 'primary' | 'secondary')}
                    className="w-full bg-dark-900 border border-dark-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#5865F2]"
                  >
                    <option value="primary">Moeda Principal ({currencySymbol})</option>
                    {hasSecondaryCurrency && (
                      <option value="secondary">Moeda Secundária ({secondaryCurrencySymbol})</option>
                    )}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-dark-300 block mb-1.5 uppercase tracking-wider">
                    Tipo do Item
                  </label>
                  <select
                    value={newItemType}
                    onChange={(e) => setNewItemType(e.target.value as typeof newItemType)}
                    className="w-full bg-dark-900 border border-dark-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#5865F2]"
                  >
                    <option value="role">Cargo do Servidor (Atribui cargo)</option>
                    <option value="static">Item Estático / Colecionável</option>
                    <option value="mystery">Caixa Misteriosa</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-dark-300 block mb-1.5 uppercase tracking-wider">
                    Estoque
                  </label>
                  <select
                    value={newItemStock}
                    onChange={(e) => setNewItemStock(e.target.value)}
                    className="w-full bg-dark-900 border border-dark-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#5865F2]"
                  >
                    <option value="ilimitado">Ilimitado (Infinito)</option>
                    <option value="10">10 unidades</option>
                    <option value="25">25 unidades</option>
                    <option value="50">50 unidades</option>
                    <option value="100">100 unidades</option>
                  </select>
                </div>
              </div>

              {newItemType === 'role' && (
                <div>
                  <label className="text-xs font-semibold text-dark-300 block mb-1.5 uppercase tracking-wider">
                    Cargo Concedido na Compra
                  </label>
                  <DiscordRoleSelect
                    selectedRoleIds={newItemRoles}
                    onChange={setNewItemRoles}
                    placeholder="Selecione o cargo que o comprador receberá"
                  />
                </div>
              )}

              {/* Color & Icon Picker */}
              <div className="grid grid-cols-2 gap-4 items-center">
                <div>
                  <label className="text-xs font-semibold text-dark-300 block mb-1.5 uppercase tracking-wider">
                    Ícone (Emoji)
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      maxLength={4}
                      value={newItemIcon}
                      onChange={(e) => setNewItemIcon(e.target.value)}
                      className="w-16 bg-dark-900 border border-dark-700 rounded-xl px-3 py-1.5 text-center text-base text-white focus:outline-none focus:border-[#5865F2]"
                    />
                    <div className="flex gap-1.5 text-lg">
                      {['👑', '⭐', '🎨', '🎁', '🚀', '💎'].map((em) => (
                        <button
                          key={em}
                          type="button"
                          onClick={() => setNewItemIcon(em)}
                          className="hover:scale-120 transition-transform cursor-pointer"
                        >
                          {em}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-dark-300 block mb-1.5 uppercase tracking-wider">
                    Cor de Destaque
                  </label>
                  <div className="flex items-center gap-2">
                    <DiscordColorPicker
                      color={newItemColor}
                      onChange={setNewItemColor}
                      triggerType="wheel"
                    />
                    <div
                      className="w-5 h-5 rounded-full border border-white/20 shadow-xs"
                      style={{ backgroundColor: newItemColor }}
                    />
                    <span className="text-xs font-mono uppercase text-dark-300">{newItemColor}</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-dark-700/80">
                <button
                  type="button"
                  onClick={() => setIsNewItemModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-dark-300 hover:text-white text-xs font-semibold transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-brand-default hover:bg-brand-hover text-dark-900 text-xs font-bold transition-all shadow-sm cursor-pointer"
                >
                  Criar Item na Loja
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: CONFIRMAÇÃO DE RESET DA ECONOMIA */}
      {isResetModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-dark-800 border border-red-900/60 rounded-2xl shadow-2xl p-6 space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center gap-3 text-red-400">
              <div className="w-10 h-10 rounded-xl bg-red-500/15 border border-red-500/30 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Resetar Toda a Economia</h3>
                <span className="text-xs text-red-400">Esta ação é irreversível</span>
              </div>
            </div>

            <p className="text-xs text-dark-300 leading-relaxed">
              Todos os saldos em carteira e banco de <strong>todos os membros</strong> serão zerados ou redefinidos para o saldo inicial padrão ({startingBalance} {currencySymbol}). Os itens comprados na loja permanecerão intactos.
            </p>

            <div>
              <label className="text-xs font-semibold text-dark-300 block mb-2">
                Para confirmar, digite exatamente <strong className="text-red-400">RESETAR</strong> abaixo:
              </label>
              <input
                type="text"
                value={resetConfirmText}
                onChange={(e) => setResetConfirmText(e.target.value)}
                placeholder="RESETAR"
                className="w-full bg-dark-900 border border-red-900/60 rounded-xl px-4 py-2.5 text-center text-sm font-bold text-red-300 focus:outline-none focus:border-red-500 uppercase tracking-widest"
              />
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-dark-700/80">
              <button
                type="button"
                onClick={() => {
                  setIsResetModalOpen(false);
                  setResetConfirmText('');
                }}
                className="px-4 py-2 rounded-xl text-dark-300 hover:text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                disabled={resetConfirmText !== 'RESETAR'}
                onClick={handleExecuteReset}
                className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-bold transition-all shadow-md shadow-red-900/30 cursor-pointer"
              >
                Confirmar Reset Definitivo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Persistent Bottom Bar for Unsaved Changes */}
      <UnsavedChangesBar
        show={hasUnsavedChanges}
        onSave={handleSave}
        onReset={handleDiscard}
      />
      </div>
    </div>
  );
};
