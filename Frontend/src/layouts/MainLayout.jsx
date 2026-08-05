import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/common/Sidebar';
import { Navbar } from '../components/common/Navbar';
import { CommandPalette } from '../components/ui/CommandPalette';
import { FloatingDock } from '../components/ui/FloatingDock';
import { VoiceGuiderProvider } from '../context/VoiceGuiderContext';
import { PinLockModal } from '../components/voice/PinLockModal';
import { VoiceAssistantModal } from '../components/voice/VoiceAssistantModal';
import { useUser } from '../context/UserContext';
import { cn } from '../utils/cn';

export const MainLayout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const { user } = useUser();

  const isAdmin = user?.role === 'admin' || user?.email?.toLowerCase().includes('admin');

  return (
    <div className="min-h-screen bg-[#070709] text-gray-100 selection:bg-purple-500/30 selection:text-purple-200 relative overflow-x-hidden">
      {/* PIN Security Screen Overlay */}
      <PinLockModal />

      {/* 2-Way Interactive AI Voice Assistant Modal */}
      <VoiceAssistantModal />

      {/* Background ambient glowing light meshes */}
      <div className="fixed top-0 left-1/4 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none -z-10 animate-pulse-glow" />
      <div className="fixed bottom-0 right-1/4 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none -z-10 animate-pulse-glow" style={{ animationDelay: '3s' }} />

      {/* Collapsible Sidebar */}
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      {/* Floating Top Navbar */}
      <Navbar
        isSidebarCollapsed={isSidebarCollapsed}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
      />

      {/* Command Palette Modal */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
      />

      {/* Floating Arc / VisionOS Bottom Action Dock (Candidates Only) */}
      {!isAdmin && (
        <FloatingDock
          onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        />
      )}

      {/* Main Workspace Area */}
      <main
        className={cn(
          "pt-20 px-6 sm:px-8 transition-all duration-300 min-h-screen",
          isAdmin ? "pb-12" : "pb-28",
          isSidebarCollapsed ? "ml-[80px]" : "ml-[260px]"
        )}
      >
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
