import React, { useState } from 'react';
import { ServerInfo } from '../types';
import { VoiceHub } from './TemporaryChannelsView';
import { DiscordSwitch, DiscordRoleSelect } from './common';

export interface HubConfigPageProps {
  hub?: VoiceHub | null;
  onSave: (hubData: Partial<VoiceHub>) => void;
  onBack: () => void;
  currentServer: ServerInfo;
}

export const CrownBadgeIcon: React.FC = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#prefix__clip0)">
      <path d="M13.174 17.44h-1.349v.003h1.349v-.003z" fill="#FFCB39" />
      <path opacity="0.3" d="M13.174 17.44h-1.349v.003h1.349v-.003z" fill="#fff" />
      <path d="M12.144 6.184a.317.317 0 00-.056-.074l-.019-.015a.44.44 0 00-.059-.037h-.016l-.072-.021a.332.332 0 00-.088 0v4.47l1.137-2.774-.827-1.549z" fill="#FFCB39" />
      <path d="M11.826 18.91v-1.186H4.154a1.62 1.62 0 00-1.135.462c-.301.296-.47.697-.47 1.116v.131c0 .418.169.82.47 1.116.301.295.71.462 1.135.462h6.858l.803-1.986.01-.115z" fill="#FFE570" />
      <path d="M21.977 19.088a.42.42 0 000-.052c-.009-.06-.022-.12-.04-.179v-.018a1.463 1.463 0 00-.072-.19l-.016-.034a1.655 1.655 0 00-.094-.165 1.616 1.616 0 00-.283-.321 1.673 1.673 0 00-.375-.24l-.155-.06-.153-.042h-.016l-.13-.021-1.339 3.26h1.121a1.58 1.58 0 001.012-.357c.079-.065.152-.137.22-.213a1.601 1.601 0 00.352-.818V19.302a1.346 1.346 0 00-.032-.213zM16.548 17.724L15.205 21h1.857l1.343-3.276h-1.857z" fill="#FFCB39" />
      <path d="M11.012 21h.813v-1.985L11.012 21z" fill="#FFE570" />
      <path opacity="0.3" d="M11.012 21h.813v-1.985L11.012 21z" fill="#fff" />
      <path d="M12.355 17.724l-.53 1.29V21h3.38l1.343-3.276h-4.193z" fill="#FFCB39" />
      <path opacity="0.3" d="M12.355 17.724l-.53 1.29V21h3.38l1.343-3.276h-4.193z" fill="#fff" />
      <path d="M11.825 19.015l.53-1.291h-.53v1.291zM20.596 17.737h-2.191l-1.338 3.276h2.21l1.338-3.26-.019-.016z" fill="#FFCB39" />
      <path opacity="0.3" d="M20.596 17.737h-2.191l-1.338 3.276h2.21l1.338-3.26-.019-.016z" fill="#fff" />
      <path d="M18.763 8.784c-.789-1.717-.647-1.577-2.394-2.366 1.747-.773 1.605-.634 2.394-2.353.787 1.72.645 1.577 2.395 2.366-1.75.776-1.608.64-2.395 2.353zM22.224 6.492c-.587-1.276-.482-1.17-1.777-1.746 1.295-.576 1.19-.47 1.777-1.746.583 1.275.478 1.17 1.776 1.746-1.298.576-1.193.47-1.776 1.746z" fill="#C8D4FF" />
      <path d="M20.968 17.443H3.578a.281.281 0 00-.283.278v.003c0 .154.127.279.284.279h17.39a.281.281 0 00.283-.28v-.002a.281.281 0 00-.284-.278z" fill="#D0A500" />
      <path d="M11.825 6.024a.308.308 0 00-.22.155l-3.7 7.075a.296.296 0 01-.22.157.305.305 0 01-.259-.083l-4.91-4.822a.304.304 0 00-.474.063.293.293 0 00-.04.173l1.496 8.7h5.48l2.847-6.94V6.023z" fill="#FFE570" />
      <path d="M16.297 13.333a.308.308 0 01-.474-.082l-.522-1.001-2.14 5.19h1.806l1.902-4.636-.572.529zM22.303 8.077a.297.297 0 00-.267.074l-1.648 1.488-3.211 7.801h3.917l1.448-9.029a.29.29 0 00-.051-.214.3.3 0 00-.188-.12z" fill="#FFCB39" />
      <path d="M11.825 10.501L8.98 17.443h2.847V10.5z" fill="#FFE570" />
      <path opacity="0.3" d="M11.825 10.501L8.98 17.443h2.847V10.5z" fill="#fff" />
      <path d="M12.957 7.743l-1.132 2.758v6.939h1.349l2.127-5.19-2.344-4.507z" fill="#FFCB39" />
      <path opacity="0.3" d="M12.957 7.743l-1.132 2.758v6.939h1.349l2.127-5.19-2.344-4.507z" fill="#fff" />
      <path d="M16.882 12.805L14.98 17.44h2.213l3.2-7.801-3.51 3.166z" fill="#FFCB39" />
      <path opacity="0.3" d="M16.882 12.805L14.98 17.44h2.213l3.2-7.801-3.51 3.166z" fill="#fff" />
    </g>
    <defs>
      <clipPath id="prefix__clip0">
        <path fill="#fff" transform="translate(2 3)" d="M0 0h22v18H0z" />
      </clipPath>
    </defs>
  </svg>
);

export const InfoCircledIcon: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="transparent" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 shrink-0">
    <path
      d="M2.79406 7.45869C3.33698 5.14417 5.14417 3.33698 7.45869 2.79406C9.13021 2.40198 10.8698 2.40198 12.5413 2.79406C14.8558 3.33698 16.663 5.14417 17.2059 7.4587C17.598 9.13021 17.598 10.8698 17.2059 12.5413C16.663 14.8558 14.8558 16.663 12.5413 17.2059C10.8698 17.598 9.13021 17.598 7.4587 17.2059C5.14418 16.663 3.33698 14.8558 2.79406 12.5413C2.40198 10.8698 2.40198 9.13021 2.79406 7.45869Z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path d="M10 12.9167V9.58334" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="10" cy="7.5" r="0.833" fill="currentColor" />
  </svg>
);

export const SpeakerVoiceIcon: React.FC = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 shrink-0 mr-2 text-[#949ba4]">
    <path
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.383 3.07904C11.009 2.92504 10.579 3.01004 10.293 3.29604L6 8.00204H3C2.45 8.00204 2 8.45304 2 9.00204V15.002C2 15.552 2.45 16.002 3 16.002H6L10.293 20.71C10.579 20.996 11.009 21.082 11.383 20.927C11.757 20.772 12 20.407 12 20.002V4.00204C12 3.59904 11.757 3.23204 11.383 3.07904ZM14 5.00195V7.00195C16.757 7.00195 19 9.24595 19 12.002C19 14.759 16.757 17.002 14 17.002V19.002C17.86 19.002 21 15.863 21 12.002C21 8.14295 17.86 5.00195 14 5.00195ZM14 9.00195C15.654 9.00195 17 10.349 17 12.002C17 13.657 15.654 15.002 14 15.002V13.002C14.551 13.002 15 12.553 15 12.002C15 11.451 14.551 11.002 14 11.002V9.00195Z"
    />
  </svg>
);

export const HubConfigPage: React.FC<HubConfigPageProps> = ({
  hub,
  onSave,
  onBack,
  currentServer,
}) => {
  // Accordion open states
  const [openCards, setOpenCards] = useState<Record<string, boolean>>({
    hub: true,
    settings: true,
    permissions: true,
    owner_permissions: true,
    text_channel: true,
  });

  // Card 1: Hub details
  const [channelTemplate, setChannelTemplate] = useState(
    hub?.channelNameTemplate || '#{index} - Canal de {username}'
  );

  // Card 2: Settings
  const [userLimit, setUserLimit] = useState<number>(hub?.userLimit ?? 5);
  const [bitrate, setBitrate] = useState<number>(hub?.bitrate ?? 64);
  const [keepAliveMinutes, setKeepAliveMinutes] = useState<number>(0);
  const [claimLockMinutes, setClaimLockMinutes] = useState<number>(0);

  // Card 3: Permissions
  const [syncWithCategory, setSyncWithCategory] = useState(false);
  const [syncWithChannel, setSyncWithChannel] = useState(false);
  const [rolePermissionMode, setRolePermissionMode] = useState<'deny_except' | 'allow_except'>('deny_except');
  const [selectedRoleIds, setSelectedRoleIds] = useState<string[]>(['1']);
  const [useRolesForAccess, setUseRolesForAccess] = useState(false);
  const [ignoredRoleIds, setIgnoredRoleIds] = useState<string[]>([]);
  const [moderatorRoleIds, setModeratorRoleIds] = useState<string[]>([]);

  // Card 4: Owner Permissions
  const [canManageChannels, setCanManageChannels] = useState(true);
  const [canManagePermissions, setCanManagePermissions] = useState(false);
  const [hasPriorityVoice, setHasPriorityVoice] = useState(false);
  const [canMoveMembers, setCanMoveMembers] = useState(false);

  // Card 5: Text Channel
  const [enableTextChannel, setEnableTextChannel] = useState(false);
  const [restrictCommandsToText, setRestrictCommandsToText] = useState(false);
  const [pinCommandUsage, setPinCommandUsage] = useState(false);
  const [restrictTextChannel, setRestrictTextChannel] = useState(false);

  const toggleCard = (cardId: string) => {
    setOpenCards((prev) => ({ ...prev, [cardId]: !prev[cardId] }));
  };

  const handleSave = () => {
    onSave({
      name: channelTemplate.replace('{index}', '1').replace('{username}', 'Username') || 'Hub de Voz',
      channelNameTemplate: channelTemplate,
      userLimit,
      bitrate,
      autoDeleteEmpty: keepAliveMinutes === 0,
      isEnabled: true,
    });
  };

  // Preview computation
  const previewName = channelTemplate
    .replace('{index}', '1')
    .replace('{username}', 'Username')
    .replace('{user}', 'Username');

  return (
    <div className="flex flex-1 overflow-y-auto relative px-6 lg:px-10 py-0 lg:py-6 animate-fadeIn" id="dashboard__content">
      <div className="min-h-full w-full max-w-[1540px]">
        <div className="w-full min-h-full transition-all flex flex-col opacity-100">
          {/* Top Bar Header with Back and Action Buttons matching snippet */}
          <div className="mb-9 pt-6 lg:pt-0 flex flex-col lg:flex-row items-center justify-between">
            <div className="flex mb-6 lg:mb-0 items-center justify-start">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                onClick={onBack}
                className="cursor-pointer mr-4 text-dark-200 hover:text-white transition-colors"
                title="Voltar aos Canais Temporários"
              >
                <path d="M14.5 17l-5-5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className="font-bold text-dark-100 text-2xl">
                {hub ? 'Editar Hub' : 'Novo Hub'}
              </p>
            </div>

            <div className="grid gap-3 grid-flow-col auto-cols-max w-full lg:w-max">
              <button
                type="button"
                onClick={onBack}
                className="relative flex overflow-hidden shrink-0 rounded-lg transition-all duration-200 items-center gap-1.5 bg-white bg-opacity-10 text-white hover:bg-opacity-20 active:bg-opacity-5 active:text-opacity-60 text-sm px-4 py-2 cursor-pointer"
              >
                <div className="flex flex-grow justify-center max-w-full">
                  <span className="transition-all duration-200 whitespace-nowrap text-ellipsis overflow-hidden block w-full shrink-0 text-center font-medium">
                    Descartar
                  </span>
                </div>
              </button>

              <button
                type="button"
                onClick={handleSave}
                className="relative flex overflow-hidden shrink-0 rounded-lg transition-all duration-200 items-center gap-1.5 bg-brand-default text-dark-900 hover:bg-brand-hover active:bg-brand-default text-sm px-5 py-2 cursor-pointer font-bold shadow-sm"
              >
                <div className="flex flex-grow justify-center max-w-full">
                  <span className="transition-all duration-200 whitespace-nowrap text-ellipsis overflow-hidden block w-full shrink-0 text-center font-bold">
                    Salvar
                  </span>
                </div>
              </button>
            </div>
          </div>

          {/* CARD 1: HUB */}
          <div className="bg-dark-800 shadow-xs sub_feature_card rounded-lg mb-4 border border-dark-700/60" id="plugins.temporary_channels.edition.hub">
            <h3
              onClick={() => toggleCard('hub')}
              className="text-dark-100 flex justify-between items-start hover:text-dark-200 transition-all py-4 lg:py-6 px-6 cursor-pointer select-none"
            >
              <div className="flex flex-col w-full pr-4 max-w-[760px]">
                <div className="sub_feature_title flex items-center text-lg font-semibold">
                  <div className="flex items-center gap-2">
                    <span>Hub</span>
                    <CrownBadgeIcon />
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between gap-4">
                <button type="button" className="pt-1 text-dark-400">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={`cursor-pointer transition-transform duration-200 ${
                      openCards['hub'] ? '' : 'rotate-180'
                    }`}
                  >
                    <path d="M7 14.5l5-5 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </h3>

            {openCards['hub'] && (
              <div className="text-base transition-all">
                <div className="p-6 pt-0">
                  <div className="grid w-full border-t border-solid border-dark-700 pt-4"></div>
                  <div className="relative flex flex-col max-w-xl">
                    <label className="text-sm font-medium text-dark-400 mb-2 flex items-start max-w-max justify-start">
                      Nome dos Canais Temporários
                    </label>
                    <div className="overflow-hidden flex items-center justify-start group bg-dark-900 rounded-lg border border-solid transition-all duration-200 focus-within:ring-opacity-30 focus-within:ring-[4px] hover:border-[#5865F2] focus-within:border-[#5865F2] focus-within:ring-[#5865F2] border-dark-700">
                      <input
                        type="text"
                        placeholder="#{index} - Canal de {username}"
                        value={channelTemplate}
                        onChange={(e) => setChannelTemplate(e.target.value)}
                        className="bg-transparent outline-none border-none py-3 placeholder:text-dark-400 text-base text-dark-100 w-full px-4"
                      />
                    </div>
                  </div>

                  <div className="flex items-start gap-2 text-sm text-dark-400 mt-2 max-w-2xl">
                    <InfoCircledIcon />
                    <span>
                      Nome do canal para todos os canais temporários. Pode ser alterado diretamente no Discord para cada canal separadamente. Pode incluir {'{index}'} e {'{username}'}.
                    </span>
                  </div>

                  <label className="mt-6 flex uppercase font-semibold text-sm text-dark-400">
                    Pré-visualização:
                  </label>
                  <div className="flex flex-col items-start">
                    <div className="text-[#dbdee1] bg-[#2b2d31] border border-[#1e1f22] font-semibold rounded mt-2 flex items-center py-1.5 px-3 shadow-sm text-sm">
                      <SpeakerVoiceIcon />
                      <span>{previewName}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* CARD 2: CONFIGURAÇÕES */}
          <div className="bg-dark-800 shadow-xs sub_feature_card rounded-lg mb-4 border border-dark-700/60" id="plugins.temporary_channels.edition.settings">
            <h3
              onClick={() => toggleCard('settings')}
              className="text-dark-100 flex justify-between items-start hover:text-dark-200 transition-all py-4 lg:py-6 px-6 cursor-pointer select-none"
            >
              <div className="flex flex-col w-full pr-4 max-w-[760px]">
                <div className="sub_feature_title flex items-center text-lg font-semibold">
                  <div className="flex items-center gap-2">
                    <span>Configurações</span>
                    <CrownBadgeIcon />
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between gap-4">
                <button type="button" className="pt-1 text-dark-400">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={`cursor-pointer transition-transform duration-200 ${
                      openCards['settings'] ? '' : 'rotate-180'
                    }`}
                  >
                    <path d="M7 14.5l5-5 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </h3>

            {openCards['settings'] && (
              <div className="text-base transition-all">
                <div className="p-6 pt-0 space-y-6">
                  <div className="grid w-full border-t border-solid border-dark-700 pt-4"></div>

                  {/* Limite de Usuário */}
                  <div>
                    <div className="flex items-center justify-between max-w-xl">
                      <label className="text-body font-semibold text-dark-100">Limite de Usuário</label>
                      <span className="text-xs font-bold px-2 py-0.5 rounded bg-dark-900 text-[#70B1FF] border border-dark-700">
                        {userLimit === 0 ? '∞ (Sem limite)' : `${userLimit} membros`}
                      </span>
                    </div>
                    <div className="text-dark-300 text-sm max-w-xl mt-1 mb-4">
                      Limite de usuários padrão para todos os canais de voz temporários. Pode ser alterado diretamente no Discord para cada canal separadamente.
                    </div>

                    <div className="relative py-2 max-w-xl">
                      <div className="relative w-full h-4 mb-2 text-xs flex items-center justify-between text-dark-400 font-mono">
                        <span>∞</span>
                        <span>20</span>
                        <span>40</span>
                        <span>60</span>
                        <span>80</span>
                        <span>99</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={99}
                        value={userLimit}
                        onChange={(e) => setUserLimit(parseInt(e.target.value, 10) || 0)}
                        className="w-full h-1.5 bg-dark-900 rounded-lg appearance-none cursor-pointer accent-[#5865F2]"
                      />
                    </div>
                  </div>

                  {/* Taxa de Bits */}
                  <div>
                    <div className="flex items-center justify-between max-w-xl">
                      <label className="text-body font-semibold text-dark-100">Taxa de bits</label>
                      <span className="text-xs font-bold px-2 py-0.5 rounded bg-dark-900 text-[#70B1FF] border border-dark-700">
                        {bitrate} kbps
                      </span>
                    </div>
                    <div className="text-dark-300 text-sm max-w-xl mt-1 mb-4">
                      Taxa de bits padrão em kbps para todos os canais de voz temporários. Pode ser alterado diretamente no Discord para cada canal separadamente.
                    </div>

                    <div className="relative py-2 max-w-xl">
                      <div className="relative w-full h-4 mb-2 text-xs flex items-center justify-between text-dark-400 font-mono">
                        <span>8 kbps</span>
                        <span>64 kbps</span>
                        <span>96 kbps</span>
                        <span>128 kbps</span>
                        <span>256 kbps</span>
                        <span>384 kbps</span>
                      </div>
                      <input
                        type="range"
                        min={8}
                        max={384}
                        step={8}
                        value={bitrate}
                        onChange={(e) => setBitrate(parseInt(e.target.value, 10) || 64)}
                        className="w-full h-1.5 bg-dark-900 rounded-lg appearance-none cursor-pointer accent-[#5865F2]"
                      />
                    </div>
                  </div>

                  {/* Manter Ativo */}
                  <div>
                    <div className="flex items-center justify-between max-w-xl">
                      <label className="text-body font-semibold text-dark-100">Manter ativo</label>
                      <span className="text-xs font-bold px-2 py-0.5 rounded bg-dark-900 text-[#70B1FF] border border-dark-700">
                        {keepAliveMinutes === 0 ? '0 (Imediatamente)' : `${keepAliveMinutes} min`}
                      </span>
                    </div>
                    <div className="text-dark-300 text-sm max-w-xl mt-1 mb-4">
                      Duração em minutos até que os canais temporários sejam apagados depois que todos saíram do canal de voz temporário. 0 é imediatamente, ∞ é nunca.
                    </div>

                    <div className="relative py-2 max-w-xl">
                      <div className="relative w-full h-4 mb-2 text-xs flex items-center justify-between text-dark-400 font-mono">
                        <span>0</span>
                        <span>1</span>
                        <span>2</span>
                        <span>3</span>
                        <span>4</span>
                        <span>5</span>
                        <span>6</span>
                        <span>7</span>
                        <span>8</span>
                        <span>9</span>
                        <span>10 min</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={10}
                        value={keepAliveMinutes}
                        onChange={(e) => setKeepAliveMinutes(parseInt(e.target.value, 10) || 0)}
                        className="w-full h-1.5 bg-dark-900 rounded-lg appearance-none cursor-pointer accent-[#5865F2]"
                      />
                    </div>
                  </div>

                  {/* Bloqueio de Propriedade */}
                  <div>
                    <div className="flex items-center justify-between max-w-xl">
                      <label className="text-body font-semibold text-dark-100">Bloqueio de propriedade</label>
                      <span className="text-xs font-bold px-2 py-0.5 rounded bg-dark-900 text-[#70B1FF] border border-dark-700">
                        {claimLockMinutes === 0 ? '0 (Imediatamente)' : `${claimLockMinutes} min`}
                      </span>
                    </div>
                    <div className="text-dark-300 text-sm max-w-xl mt-1 mb-4">
                      Duração em minutos até que os canais temporários estejam disponíveis para posse de propriedade após o proprietário ter deixado o canal de voz temporário. 0 é imediatamente, ∞ é nunca.
                    </div>

                    <div className="relative py-2 max-w-xl">
                      <div className="relative w-full h-4 mb-2 text-xs flex items-center justify-between text-dark-400 font-mono">
                        <span>0</span>
                        <span>1</span>
                        <span>2</span>
                        <span>3</span>
                        <span>4</span>
                        <span>5</span>
                        <span>6</span>
                        <span>7</span>
                        <span>8</span>
                        <span>9</span>
                        <span>10 min</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={10}
                        value={claimLockMinutes}
                        onChange={(e) => setClaimLockMinutes(parseInt(e.target.value, 10) || 0)}
                        className="w-full h-1.5 bg-dark-900 rounded-lg appearance-none cursor-pointer accent-[#5865F2]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* CARD 3: PERMISSÕES */}
          <div className="bg-dark-800 shadow-xs sub_feature_card rounded-lg mb-4 border border-dark-700/60" id="plugins.temporary_channels.edition.permissions">
            <h3
              onClick={() => toggleCard('permissions')}
              className="text-dark-100 flex justify-between items-start hover:text-dark-200 transition-all py-4 lg:py-6 px-6 cursor-pointer select-none"
            >
              <div className="flex flex-col w-full pr-4 max-w-[760px]">
                <div className="sub_feature_title flex items-center text-lg font-semibold">
                  <div className="flex items-center gap-2">
                    <span>Permissões</span>
                    <CrownBadgeIcon />
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between gap-4">
                <button type="button" className="pt-1 text-dark-400">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={`cursor-pointer transition-transform duration-200 ${
                      openCards['permissions'] ? '' : 'rotate-180'
                    }`}
                  >
                    <path d="M7 14.5l5-5 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </h3>

            {openCards['permissions'] && (
              <div className="text-base transition-all">
                <div className="p-6 pt-0 space-y-6">
                  <div className="grid w-full border-t border-solid border-dark-700 pt-4"></div>

                  {/* Sync Category */}
                  <div className="flex items-start justify-between gap-4 max-w-2xl">
                    <div>
                      <div className="text-dark-100 text-sm font-semibold">
                        Sincronizar permissões com a categoria do Hub
                      </div>
                      <div className="text-dark-300 text-xs mt-0.5">
                        Sincronizar as permissões dos canais temporários quando são criados com as permissões da categoria Hub.
                      </div>
                    </div>
                    <DiscordSwitch
                      checked={syncWithCategory}
                      onChange={setSyncWithCategory}
                      activeColor="blurple"
                    />
                  </div>

                  {/* Sync Channel */}
                  <div className="flex items-start justify-between gap-4 max-w-2xl pt-2 border-t border-dark-700/60">
                    <div>
                      <div className="text-dark-100 text-sm font-semibold">
                        Sincronizar permissões com o canal do Hub
                      </div>
                      <div className="text-dark-300 text-xs mt-0.5">
                        Sincronizar as permissões dos canais temporários quando forem criados com as permissões do canal Hub.
                      </div>
                    </div>
                    <DiscordSwitch
                      checked={syncWithChannel}
                      onChange={setSyncWithChannel}
                      activeColor="blurple"
                    />
                  </div>

                  {/* Role Permissions Options */}
                  <div className="pt-2 border-t border-dark-700/60">
                    <label className="text-body font-semibold text-dark-100 block mb-3">
                      Permissões do cargo
                    </label>

                    <div className="space-y-2 mb-4">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="rolePermissionMode"
                          checked={rolePermissionMode === 'deny_except'}
                          onChange={() => setRolePermissionMode('deny_except')}
                          className="accent-[#5865F2] w-4 h-4 cursor-pointer"
                        />
                        <span className="text-sm text-dark-200">Negar para todos os cargos exceto</span>
                      </label>

                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="rolePermissionMode"
                          checked={rolePermissionMode === 'allow_except'}
                          onChange={() => setRolePermissionMode('allow_except')}
                          className="accent-[#5865F2] w-4 h-4 cursor-pointer"
                        />
                        <span className="text-sm text-dark-200">Permitir para todos os cargos exceto</span>
                      </label>
                    </div>

                    <div className="max-w-xl">
                      <DiscordRoleSelect
                        selectedRoleIds={selectedRoleIds}
                        onChange={setSelectedRoleIds}
                        placeholder="Selecione um cargo"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-4 max-w-2xl">
                    <span className="text-dark-300 text-xs">
                      Use também esses cargos para controlar o acesso aos canais temporários.
                    </span>
                    <DiscordSwitch
                      checked={useRolesForAccess}
                      onChange={setUseRolesForAccess}
                      activeColor="blurple"
                    />
                  </div>

                  {/* Ignored Roles */}
                  <div className="pt-2 border-t border-dark-700/60">
                    <label className="pb-2 text-dark-400 text-sm font-semibold flex">
                      Cargos Ignorados
                    </label>
                    <div className="max-w-xl">
                      <DiscordRoleSelect
                        selectedRoleIds={ignoredRoleIds}
                        onChange={setIgnoredRoleIds}
                        placeholder="Selecione um cargo"
                      />
                    </div>
                    <div className="text-dark-400 flex items-center gap-2 text-xs mt-2">
                      <InfoCircledIcon />
                      <span>Usuários com um desses cargos NÃO serão impactados pelos comandos /voice-*.</span>
                    </div>
                  </div>

                  {/* Moderator Roles */}
                  <div className="pt-2 border-t border-dark-700/60">
                    <label className="pb-2 text-dark-400 text-sm font-semibold flex">
                      Cargos de Moderadores
                    </label>
                    <div className="max-w-xl">
                      <DiscordRoleSelect
                        selectedRoleIds={moderatorRoleIds}
                        onChange={setModeratorRoleIds}
                        placeholder="Selecione um cargo"
                      />
                    </div>
                    <div className="text-dark-400 flex items-center gap-2 text-xs mt-2">
                      <InfoCircledIcon />
                      <span>
                        Os usuários com um destes cargos podem executar os comandos /voice-* sem serem os proprietários dos canais temporários e NÃO são afetados por eles.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* CARD 4: PERMISSÕES DO PROPRIETÁRIO */}
          <div className="bg-dark-800 shadow-xs sub_feature_card rounded-lg mb-4 border border-dark-700/60" id="plugins.temporary_channels.owner_permissions.title">
            <h3
              onClick={() => toggleCard('owner_permissions')}
              className="text-dark-100 flex justify-between items-start hover:text-dark-200 transition-all py-4 lg:py-6 px-6 cursor-pointer select-none"
            >
              <div className="flex flex-col w-full pr-4 max-w-[760px]">
                <div className="sub_feature_title flex items-center text-lg font-semibold">
                  <div className="flex items-center gap-2">
                    <span>Permissões do Proprietário</span>
                    <CrownBadgeIcon />
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between gap-4">
                <button type="button" className="pt-1 text-dark-400">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={`cursor-pointer transition-transform duration-200 ${
                      openCards['owner_permissions'] ? '' : 'rotate-180'
                    }`}
                  >
                    <path d="M7 14.5l5-5 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </h3>

            {openCards['owner_permissions'] && (
              <div className="text-base transition-all">
                <div className="p-6 pt-0 space-y-4">
                  <div className="grid w-full border-t border-solid border-dark-700 pt-4"></div>

                  {/* Gerenciar Canais */}
                  <div className="flex items-start justify-between gap-4 max-w-2xl">
                    <div>
                      <div className="text-dark-100 text-sm font-semibold">Gerenciar Canais</div>
                      <div className="text-dark-300 text-xs mt-0.5">
                        O usuário que acionou a criação temporária de canais pode renomeá-la no Discord e alterar o limite temporário de usuários do canal de voz.
                      </div>
                    </div>
                    <DiscordSwitch
                      checked={canManageChannels}
                      onChange={setCanManageChannels}
                      activeColor="blurple"
                    />
                  </div>

                  {/* Gerenciar Permissões */}
                  <div className="flex items-start justify-between gap-4 max-w-2xl pt-3 border-t border-dark-700/60">
                    <div>
                      <div className="text-dark-100 text-sm font-semibold">Gerenciar Permissões</div>
                      <div className="text-dark-300 text-xs mt-0.5">
                        O usuário que acionou a criação de canais temporários pode gerenciar as permissões avançadas no Discord.
                      </div>
                    </div>
                    <DiscordSwitch
                      checked={canManagePermissions}
                      onChange={setCanManagePermissions}
                      activeColor="blurple"
                    />
                  </div>

                  {/* Voz Prioritária */}
                  <div className="flex items-start justify-between gap-4 max-w-2xl pt-3 border-t border-dark-700/60">
                    <div>
                      <div className="text-dark-100 text-sm font-semibold">Voz Prioritária</div>
                      <div className="text-dark-300 text-xs mt-0.5">
                        O usuário que acionou a criação dos canais temporários será o único orador prioritário do canal de voz temporário no Discord.
                      </div>
                    </div>
                    <DiscordSwitch
                      checked={hasPriorityVoice}
                      onChange={setHasPriorityVoice}
                      activeColor="blurple"
                    />
                  </div>

                  {/* Mover Membros */}
                  <div className="flex items-start justify-between gap-4 max-w-2xl pt-3 border-t border-dark-700/60">
                    <div>
                      <div className="text-dark-100 text-sm font-semibold">Mover Membros</div>
                      <div className="text-dark-300 text-xs mt-0.5">
                        O usuário que acionou a criação de canais temporários pode desconectar outros usuários do canal de voz temporário no Discord.
                      </div>
                    </div>
                    <DiscordSwitch
                      checked={canMoveMembers}
                      onChange={setCanMoveMembers}
                      activeColor="blurple"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* CARD 5: CANAL DE TEXTO */}
          <div className="bg-dark-800 shadow-xs sub_feature_card rounded-lg mb-4 border border-dark-700/60" id="plugins.temporary_channels.text_channel.title">
            <h3
              onClick={() => toggleCard('text_channel')}
              className="text-dark-100 flex justify-between items-start hover:text-dark-200 transition-all py-4 lg:py-6 px-6 cursor-pointer select-none"
            >
              <div className="flex flex-col w-full pr-4 max-w-[760px]">
                <div className="sub_feature_title flex items-center text-lg font-semibold">
                  <div className="flex items-center gap-2">
                    <span>Canal de Texto</span>
                    <CrownBadgeIcon />
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between gap-4">
                <button type="button" className="pt-1 text-dark-400">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={`cursor-pointer transition-transform duration-200 ${
                      openCards['text_channel'] ? '' : 'rotate-180'
                    }`}
                  >
                    <path d="M7 14.5l5-5 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </h3>

            {openCards['text_channel'] && (
              <div className="text-base transition-all">
                <div className="p-6 pt-0 space-y-4">
                  <div className="grid w-full border-t border-solid border-dark-700 pt-4"></div>

                  {/* Canal de Texto Toggle */}
                  <div className="flex items-start justify-between gap-4 max-w-2xl">
                    <div>
                      <div className="text-dark-100 text-sm font-semibold">Canal de Texto</div>
                      <div className="text-dark-300 text-xs mt-0.5">
                        Criar um canal de texto temporário associado ao canal de voz temporário.
                      </div>
                    </div>
                    <DiscordSwitch
                      checked={enableTextChannel}
                      onChange={setEnableTextChannel}
                      activeColor="blurple"
                    />
                  </div>

                  {/* Restringir comandos a este canal */}
                  <div className="flex items-start justify-between gap-4 max-w-2xl pt-3 border-t border-dark-700/60">
                    <div>
                      <div className="text-dark-100 text-sm font-semibold">Restringir comandos a este canal</div>
                      <div className="text-dark-300 text-xs mt-0.5">
                        Comandos /voice-* só podem ser executados no canal de texto temporário associado.
                      </div>
                    </div>
                    <DiscordSwitch
                      checked={restrictCommandsToText}
                      onChange={setRestrictCommandsToText}
                      activeColor="blurple"
                    />
                  </div>

                  {/* Fixar uso de comandos */}
                  <div className="flex items-start justify-between gap-4 max-w-2xl pt-3 border-t border-dark-700/60">
                    <div>
                      <div className="text-dark-100 text-sm font-semibold">Fixar uso de comandos</div>
                      <div className="text-dark-300 text-xs mt-0.5">
                        Fixa uma mensagem incorporada que contém as utilizações e descrições dos comandos de voz /voice-* no canal de texto temporário associado.
                      </div>
                    </div>
                    <DiscordSwitch
                      checked={pinCommandUsage}
                      onChange={setPinCommandUsage}
                      activeColor="blurple"
                    />
                  </div>

                  {/* Restringir o canal de texto */}
                  <div className="flex items-start justify-between gap-4 max-w-2xl pt-3 border-t border-dark-700/60">
                    <div>
                      <div className="text-dark-100 text-sm font-semibold">Restringir o canal de texto</div>
                      <div className="text-dark-300 text-xs mt-0.5">
                        Apenas os Gerenciadores do Bot, moderadores e usuários ligados ao canal de voz temporário poderão ler e enviar mensagens no canal de texto temporário associado.
                      </div>
                    </div>
                    <DiscordSwitch
                      checked={restrictTextChannel}
                      onChange={setRestrictTextChannel}
                      activeColor="blurple"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
