export type CategoryId =
  | 'todos'
  | 'essenciais'
  | 'gerenciar'
  | 'utilidades'
  | 'sociais'
  | 'engajamento'
  | 'ia'
  | 'monetizacao';

export interface PluginItem {
  id: string;
  title: string;
  description: string;
  category: CategoryId;
  iconName: string;
  iconBgColor?: string;
  iconTextColor?: string;
  isNew?: boolean;
  isActive: boolean;
  popular?: boolean;
  actionType?: 'toggle' | 'configure' | 'screen';
  targetScreen?: string;
}

export interface ServerInfo {
  id: string;
  name: string;
  memberCount: number;
  iconUrl: string;
  isVerified?: boolean;
  bannerUrl?: string;
}

export interface LeaderboardUser {
  rank: number;
  id: string;
  username: string;
  discriminator: string;
  avatarUrl: string;
  xp: number;
  level: number;
  messagesCount: number;
  role: string;
  roleColor: string;
}

export interface DiscordEmbedData {
  title: string;
  description: string;
  color: string;
  authorName: string;
  authorIconUrl: string;
  authorUrl: string;
  thumbnailUrl: string;
  imageUrl: string;
  footerText: string;
  footerIconUrl: string;
  timestamp: boolean;
  fields: Array<{
    id: string;
    name: string;
    value: string;
    inline: boolean;
  }>;
}

export interface WelcomeConfig {
  enabled: boolean;
  channel: string;
  messageText: string;
  sendCard: boolean;
  cardBannerUrl: string;
  cardTextColor: string;
  sendPrivateDm: boolean;
  dmText: string;
  giveRole: boolean;
  roleToGive: string;
}

export interface BotCustomizerConfig {
  botName: string;
  botAvatarUrl: string;
  botBannerUrl: string;
  prefix: string;
  activityType: 'PLAYING' | 'LISTENING' | 'WATCHING' | 'STREAMING';
  activityStatus: string;
}
