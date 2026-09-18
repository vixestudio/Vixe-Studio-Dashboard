import React, { useState } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { DashboardView } from './components/DashboardView';
import { LeaderboardView } from './components/LeaderboardView';
import { EmbedBuilderView } from './components/EmbedBuilderView';
import { WelcomeGoodbyeView } from './components/WelcomeGoodbyeView';
import { BotCustomizerView } from './components/BotCustomizerView';
import { ModeratorView } from './components/ModeratorView';
import { CustomCommandsView } from './components/CustomCommandsView';
import { PremiumView } from './components/PremiumView';
import { NotificationsView } from './components/NotificationsView';
import { TicketsView } from './components/TicketsView';
import { GiveawaysView } from './components/GiveawaysView';
import { PluginConfigModal } from './components/PluginConfigModal';
import { DirectImageModal } from './components/DirectImageModal';
import { CategoryId, PluginItem, ServerInfo } from './types';
import { SERVERS } from './data/mockData';
import { INITIAL_PLUGINS } from './data/pluginsData';

export default function App() {
  const [currentServer, setCurrentServer] = useState<ServerInfo>(SERVERS[0]); // Vixe Studio
  const [plugins, setPlugins] = useState<PluginItem[]>(INITIAL_PLUGINS);
  const [activeScreen, setActiveScreen] = useState<string>('painel');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('todos');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Modals state
  const [isDirectImageModalOpen, setIsDirectImageModalOpen] = useState(false);
  const [configuringPlugin, setConfiguringPlugin] = useState<PluginItem | null>(null);

  const handleTogglePluginActive = (pluginId: string, newState: boolean) => {
    setPlugins((prev) =>
      prev.map((p) => (p.id === pluginId ? { ...p, isActive: newState } : p))
    );
  };

  const handleNavigate = (screenId: string, categoryId?: string) => {
    setActiveScreen(screenId);
    if (categoryId) {
      setSelectedCategory(categoryId as CategoryId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleConfigurePlugin = (plugin: PluginItem) => {
    if (plugin.targetScreen) {
      handleNavigate(plugin.targetScreen);
    } else {
      setConfiguringPlugin(plugin);
    }
  };

  return (
    <div className="min-h-screen bg-dark-default text-dark-200 flex flex-col font-sans">
      {/* Persistent Top Navigation Bar */}
      <Header
        currentServer={currentServer}
        onOpenDirectImageModal={() => setIsDirectImageModalOpen(true)}
        onOpenMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        isMobileMenuOpen={isMobileMenuOpen}
        activeScreen={activeScreen}
        onNavigate={handleNavigate}
      />

      <div className="flex-1 flex pt-0 w-full min-w-0">
        {/* Left Sidebar (256px wide, fixed) */}
        <Sidebar
          currentServer={currentServer}
          onSelectServer={(server) => setCurrentServer(server)}
          activeScreen={activeScreen}
          onNavigate={handleNavigate}
          isMobileOpen={isMobileMenuOpen}
          onCloseMobile={() => setIsMobileMenuOpen(false)}
        />

        {/* Primary Content Container */}
        <div className="flex-1 min-w-0 lg:pl-64 flex flex-col w-full">
          <main
            id="main-content-area"
            className="flex-1 w-[1280px] max-w-full min-w-0 px-4 sm:px-6 lg:px-8 xl:px-10 py-6 mx-auto transition-all"
          >
            {activeScreen === 'painel' && (
              <DashboardView
                plugins={plugins}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                onConfigurePlugin={handleConfigurePlugin}
                onTogglePluginActive={handleTogglePluginActive}
                onOpenDirectImageModal={() => setIsDirectImageModalOpen(true)}
                onNavigateToScreen={handleNavigate}
              />
            )}

            {activeScreen === 'leaderboard' && (
              <LeaderboardView
                currentServer={currentServer}
                onOpenDirectImageModal={() => setIsDirectImageModalOpen(true)}
              />
            )}

            {activeScreen === 'embeds' && (
              <EmbedBuilderView
                onOpenDirectImageModal={() => setIsDirectImageModalOpen(true)}
              />
            )}

            {activeScreen === 'welcome' && (
              <WelcomeGoodbyeView
                currentServer={currentServer}
                onOpenDirectImageModal={() => setIsDirectImageModalOpen(true)}
              />
            )}

            {activeScreen === 'customizer' && (
              <BotCustomizerView
                currentServer={currentServer}
                onOpenDirectImageModal={() => setIsDirectImageModalOpen(true)}
                onNavigateToCharacters={() => handleNavigate('ai')}
                onBackToDashboard={() => handleNavigate('painel')}
              />
            )}

            {activeScreen === 'moderator' && (
              <ModeratorView currentServer={currentServer} />
            )}

            {activeScreen === 'commands' && (
              <CustomCommandsView currentServer={currentServer} />
            )}

            {activeScreen === 'tickets' && (
              <TicketsView
                currentServer={currentServer}
                onBackToDashboard={() => handleNavigate('painel')}
              />
            )}

            {activeScreen === 'giveaways' && (
              <GiveawaysView
                currentServer={currentServer}
                onBackToDashboard={() => handleNavigate('painel')}
              />
            )}

            {(activeScreen === 'premium' || activeScreen === 'monetization') && (
              <PremiumView currentServer={currentServer} />
            )}

            {activeScreen === 'ai' && (
              <DashboardView
                plugins={plugins}
                selectedCategory="ia"
                onSelectCategory={setSelectedCategory}
                onConfigurePlugin={handleConfigurePlugin}
                onTogglePluginActive={handleTogglePluginActive}
                onOpenDirectImageModal={() => setIsDirectImageModalOpen(true)}
                onNavigateToScreen={handleNavigate}
              />
            )}

            {activeScreen === 'settings' && (
              <BotCustomizerView
                currentServer={currentServer}
                onOpenDirectImageModal={() => setIsDirectImageModalOpen(true)}
              />
            )}

            {activeScreen === 'notifications' && (
              <NotificationsView
                currentServer={currentServer}
                onBackToDashboard={() => handleNavigate('painel')}
              />
            )}
          </main>
        </div>
      </div>

      {/* Direct Image Link Helper & Tester Modal */}
      <DirectImageModal
        isOpen={isDirectImageModalOpen}
        onClose={() => setIsDirectImageModalOpen(false)}
      />

      {/* Plugin Quick Configuration Modal */}
      <PluginConfigModal
        plugin={configuringPlugin}
        isOpen={!!configuringPlugin}
        onClose={() => setConfiguringPlugin(null)}
        onToggleActive={handleTogglePluginActive}
        onNavigateToScreen={handleNavigate}
        onOpenDirectImageTester={() => {
          setConfiguringPlugin(null);
          setIsDirectImageModalOpen(true);
        }}
      />
    </div>
  );
}
