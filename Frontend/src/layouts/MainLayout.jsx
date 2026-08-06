import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const { user } = useUser();
  const location = useLocation();

  const isAdmin = user?.role === 'admin' || user?.email?.toLowerCase().includes('admin');

  // Auto-close mobile drawer on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-[#070709] text-gray-100 selection:bg-purple-500/30 selection:text-purple-200 relative overflow-x-hidden">
      {/* PIN Security Screen Overlay */}
      <PinLockModal />

      {/* 2-Way Interactive AI Voice Assistant Modal */}
      <VoiceAssistantModal />

      {/* Background ambient glowing light meshes */}
      <div className="fixed top-0 left-1/4 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-cyan-500/10 rounded-full blur-[100px] sm:blur-[140px] pointer-events-none -z-10 animate-pulse-glow" />
      <div className="fixed bottom-0 right-1/4 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-purple-600/10 rounded-full blur-[100px] sm:blur-[140px] pointer-events-none -z-10 animate-pulse-glow" style={{ animationDelay: '3s' }} />

      {/* Collapsible / Responsive Sidebar */}
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        isMobileOpen={isMobileOpen}
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        onCloseMobile={() => setIsMobileOpen(false)}
      />

      {/* Floating Top Navbar */}
      <Navbar
        isSidebarCollapsed={isSidebarCollapsed}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onToggleMobileSidebar={() => setIsMobileOpen(!isMobileOpen)}
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
          "pt-20 px-3 sm:px-6 md:px-8 transition-all duration-300 min-h-screen",
          isAdmin ? "pb-12" : "pb-28 sm:pb-24",
          "ml-0",
          isSidebarCollapsed ? "md:ml-[80px]" : "md:ml-[260px]"
        )}
      >
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

