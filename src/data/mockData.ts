import { BotCustomizerConfig, DiscordEmbedData, DiscordRole, LeaderboardUser, ServerCategory, ServerInfo, WelcomeConfig } from '../types';

export const SERVERS: ServerInfo[] = [
  {
    id: 'vixe-studio',
    name: 'Vixe Studio',
    memberCount: 1420,
    iconUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
    isVerified: true,
    bannerUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&auto=format&fit=crop&q=80',
  },
  {
    id: 'pixel-gaming',
    name: 'Pixel Gaming Hub',
    memberCount: 5840,
    iconUrl: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=150&auto=format&fit=crop&q=80',
    isVerified: true,
    bannerUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&auto=format&fit=crop&q=80',
  },
  {
    id: 'cyber-community',
    name: 'CyberDev Brasil',
    memberCount: 890,
    iconUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=150&auto=format&fit=crop&q=80',
    isVerified: false,
    bannerUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=80',
  },
];

export const AI_MASCOTS = [
  {
    id: 'echo-eagle',
    name: 'Echo Eagle',
    tag: 'BOT',
    avatar: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=150&auto=format&fit=crop&q=80',
    message: 'Ei @Krypton! Você acabou de vencer o torneio de Valorant no servidor! Parabéns pela vitória épica! 🦅',
    badgeColor: 'bg-dark-700 text-dark-200 border border-dark-600',
    status: 'Online no canal #geral',
  },
  {
    id: 'garrison-angel',
    name: "Garrison's Angel",
    tag: 'BOT',
    avatar: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=150&auto=format&fit=crop&q=80',
    message: 'Boas-vindas @Matt! É uma alegria imensa ter você conosco. Que sua estadia aqui seja incrível e cheia de diversão! ✨',
    badgeColor: 'bg-dark-700 text-dark-200 border border-dark-600',
    status: 'Recebendo novos membros',
  },
  {
    id: 'pixel-devil',
    name: 'Pixel Devil',
    tag: 'BOT',
    avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=150&auto=format&fit=crop&q=80',
    message: 'Uau, parece que o Adenn finalmente subiu de nível! Continue ativo se quiser alcançar o topo do placar de XP! 😈',
    badgeColor: 'bg-dark-700 text-dark-200 border border-dark-600',
    status: 'Monitorando canal #placar-xp',
  },
];

export const LEADERBOARD_USERS: LeaderboardUser[] = [
  {
    rank: 1,
    id: 'user-1',
    username: 'Adenn',
    discriminator: '0001',
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    xp: 148920,
    level: 74,
    messagesCount: 14320,
    role: 'Lenda do Servidor',
    roleColor: '#E2E4EE',
  },
  {
    rank: 2,
    id: 'user-2',
    username: 'Krypton',
    discriminator: '7721',
    avatarUrl: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80',
    xp: 112450,
    level: 68,
    messagesCount: 10850,
    role: 'VIP Mítico',
    roleColor: '#C6C8D7',
  },
  {
    rank: 3,
    id: 'user-3',
    username: 'Matt',
    discriminator: '4040',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    xp: 98400,
    level: 59,
    messagesCount: 9140,
    role: 'Veterano',
    roleColor: '#9195AB',
  },
  {
    rank: 4,
    id: 'user-4',
    username: 'Valkyrie_Nova',
    discriminator: '1337',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    xp: 84210,
    level: 52,
    messagesCount: 7800,
    role: 'Moderador',
    roleColor: '#9195AB',
  },
  {
    rank: 5,
    id: 'user-5',
    username: 'CyberSamurai',
    discriminator: '2099',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    xp: 67390,
    level: 45,
    messagesCount: 6120,
    role: 'Membro Ativo',
    roleColor: '#656A83',
  },
  {
    rank: 6,
    id: 'user-6',
    username: 'LunarEclipse',
    discriminator: '9002',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    xp: 54100,
    level: 39,
    messagesCount: 4890,
    role: 'Membro Ativo',
    roleColor: '#656A83',
  },
  {
    rank: 7,
    id: 'user-7',
    username: 'Vixe_Player1',
    discriminator: '0101',
    avatarUrl: 'https://images.unsplash.com/photo-1628157582853-a796fa650a6a?w=150&auto=format&fit=crop&q=80',
    xp: 41200,
    level: 31,
    messagesCount: 3750,
    role: 'Iniciado',
    roleColor: '#656A83',
  },
];

export const DIRECT_IMAGE_PRESETS = [
  {
    title: 'Banner Futurista Cyberpunk (HTML Direto)',
    url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&auto=format&fit=crop&q=80',
    category: 'Banners',
    dimensions: '1200x400',
  },
  {
    title: 'Arte Abstrata Violeta Neon (Boas-vindas)',
    url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80',
    category: 'Banners',
    dimensions: '1200x500',
  },
  {
    title: 'Logo Oficial Vixe / Bot Crown (PNG Direto)',
    url: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f451.png',
    category: 'Ícones & Avatares',
    dimensions: '72x72',
  },
  {
    title: 'Avatar Robô Assistente IA (PNG Transparente)',
    url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&auto=format&fit=crop&q=80',
    category: 'Ícones & Avatares',
    dimensions: '200x200',
  },
  {
    title: 'Thumbnail Discord Embed (Regras & Anúncios)',
    url: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=400&auto=format&fit=crop&q=80',
    category: 'Embeds',
    dimensions: '400x300',
  },
  {
    title: 'Selo Verificado / Insígnia Dourada',
    url: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/2728.png',
    category: 'Ícones & Avatares',
    dimensions: '72x72',
  },
];

export const DEFAULT_EMBED: DiscordEmbedData = {
  title: '🎉 Boas-vindas oficiais ao servidor Vixe Studio!',
  description: 'Seja muito bem-vindo à nossa comunidade! Por favor, leia atentamente as instruções abaixo para desbloquear todos os canais e participar dos sorteios semanais.',
  color: '#313442',
  authorName: 'Vixe Studio Bot Oficial',
  authorIconUrl: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f451.png',
  authorUrl: 'https://vixe.studio',
  thumbnailUrl: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=300&auto=format&fit=crop&q=80',
  imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1000&auto=format&fit=crop&q=80',
  footerText: 'Vixe Studio • Hoje às 14:20 • Link de imagem direto validado',
  footerIconUrl: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/2728.png',
  timestamp: true,
  fields: [
    {
      id: 'f1',
      name: '📜 Regras Principais',
      value: '1. Respeite todos os membros\n2. Não envie spam ou links maliciosos\n3. Mantenha os tópicos nos canais corretos',
      inline: false,
    },
    {
      id: 'f2',
      name: '🎁 Sorteios & XP',
      value: 'Converse no bate-papo para subir de nível e desbloquear cargos exclusivos!',
      inline: true,
    },
    {
      id: 'f3',
      name: '🎫 Suporte',
      value: 'Abra um ticket no canal #suporte para falar com nossa equipe.',
      inline: true,
    },
  ],
};

export const DEFAULT_WELCOME: WelcomeConfig = {
  enabled: false,
  channel: '#boas-vindas',
  messageText: 'Olá {user}, seja muito bem-vindo ao {server}! Você é o membro #{member_count}!',
  sendCard: false,
  cardBannerUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1000&auto=format&fit=crop&q=80',
  cardTextColor: '#FFFFFF',
  sendPrivateDm: false,
  dmText: 'Obrigado por entrar no Vixe Studio! Confira nossos canais de anúncios.',
  giveRole: false,
  roleToGive: 'Membro Recruta',
};

export const DEFAULT_BOT_CUSTOMIZER: BotCustomizerConfig = {
  botName: 'Vixe Assistant',
  botAvatarUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=250&auto=format&fit=crop&q=80',
  botBannerUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1000&auto=format&fit=crop&q=80',
  prefix: '!',
  activityType: 'PLAYING',
  activityStatus: 'Desativado • Offline',
};

export const SERVER_CHANNELS: string[] = [
  '🔹・liberar',
  '👋🏻・bem-vindos',
  '🔹・convites',
  '🔹・comunicados',
  '🔹・regras',
  '🔹・sobre-nós',
  '🔹・sorteios',
  '🔹・lançamentos',
  '🔹・recomendações',
  '🔹・comandos',
  '🔹・ferramentas',
  '🔹・análise-parceria',
  '🔹・criar-produtos',
  '🔹・moderator',
  '🔹・log-parcerias-aprovadas',
  '🔹・log-parcerias-reprovadas',
  '⭐・destaques',
  '🌟・starboard',
];

export const SERVER_CATEGORIES: ServerCategory[] = [
  {
    name: 'Acesso',
    channels: ['🔹・liberar'],
  },
  {
    name: 'VISÃO GERAL',
    channels: ['👋🏻・bem-vindos', '🔹・convites', '🔹・regras', '🔹・sobre-nós'],
  },
  {
    name: 'INFORMAÇÕES',
    channels: ['🔹・comunicados', '🔹・sorteios', '🔹・lançamentos'],
  },
  {
    name: 'PRODUTOS',
    channels: ['🔹・veículos', '🔹・props', '🔹・mapas', '🔹・roupas'],
  },
  {
    name: 'PARCERIA',
    channels: ['🔹・parcerias', '🔹・análise-parceria'],
  },
  {
    name: 'ᴇǫᴜɪᴘᴇ ᴠɪxᴇ sᴛᴜᴅɪᴏ',
    channels: ['🔹・moderator', '🔹・log-parcerias-aprovadas', '🔹・log-parcerias-reprovadas'],
  },
  {
    name: 'FERRAMENTA',
    channels: [
      '🔹・comandos',
      '🔹・ferramentas',
      '🔹・fórum',
      '🔹・médias',
      '🔹・recomendações',
      '🔹・atendimento',
      '🔹・feedback',
      '🔹・status',
      '⭐・destaques',
    ],
  },
];

export const ROLES_LIST: DiscordRole[] = [
  { id: 'r1', name: 'Proprietário(a)', color: 'rgb(47, 34, 221)' },
  { id: 'r2', name: 'Gerenciamento', color: 'rgb(47, 34, 221)' },
  { id: 'r3', name: 'Moderador', color: 'rgb(47, 34, 221)' },
  { id: 'r4', name: 'Português', color: 'rgb(47, 34, 221)' },
  { id: 'r5', name: 'Inglês', color: 'rgb(47, 34, 221)' },
  { id: 'r6', name: 'Ferramentas', color: 'rgb(47, 34, 221)' },
  { id: 'r7', name: 'Cliente', color: 'rgb(47, 34, 221)' },
  { id: 'r8', name: 'Aluno(a)', color: 'rgb(47, 34, 221)' },
  { id: 'r9', name: 'Parceiro', color: 'rgb(47, 34, 221)' },
  { id: 'r10', name: 'Membros', color: 'rgb(47, 34, 221)' },
];

export const DISCORD_PRESET_COLORS = [
  { label: 'Dourado Estrela', value: '#FFAC33' },
  { label: 'Blurple Discord', value: '#5865F2' },
  { label: 'Verde Discord', value: '#57F287' },
  { label: 'Amarelo Discord', value: '#FEE75C' },
  { label: 'Fúcsia Discord', value: '#EB459E' },
  { label: 'Vermelho Discord', value: '#ED4245' },
  { label: 'Esmeralda', value: '#10B981' },
  { label: 'Roxo Estelar', value: '#8B5CF6' },
  { label: 'Ciano Neon', value: '#06B6D4' },
  { label: 'Dark Discord', value: '#2B2D31' },
];
