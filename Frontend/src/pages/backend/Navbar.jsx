import React from "react";
import { User, Bell } from "lucide-react"; // Bell icon for more professional look
import ThemeToggle from "../../components/common/ThemeToggle";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-40 w-full transition-all duration-300 print:hidden 
      bg-white/80 dark:bg-surface-dark/80 backdrop-blur-md 
      border-b border-gray-200 dark:border-white/10 px-6 py-3.5 
      flex justify-between items-center shadow-premium">
      
      {/* Left side: Page title with Gradient */}
      <div className="flex items-center gap-4">
        <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          <span className="text-gradient">Dashboard</span>
        </h2>
      </div>

      {/* Right side: Actions + User Profile */}
      <div className="flex items-center gap-6">
        {/* Notification Icon (Adds professional touch) */}
        <button className="relative p-2 text-gray-500 hover:text-brand-500 hover:bg-brand-500/10 rounded-full transition-all duration-200">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-danger rounded-full border-2 border-white dark:border-surface-dark"></span>
        </button>

        {/* Theme Toggle Component */}
        <div className="h-6 w-[1px] bg-gray-200 dark:bg-white/10 mx-1"></div>
        
        <ThemeToggle />

        {/* User Profile Section */}
        <div className="flex items-center gap-3 pl-2 group cursor-pointer">
          <div className="flex flex-col items-end hidden sm:flex">
            <span className="text-sm font-semibold text-gray-900 dark:text-white leading-tight group-hover:text-brand-500 transition-colors">
              Admin
            </span>
            <span className="text-[10px] font-medium text-gray-500 dark:text-gray-400 uppercase tracking-tighter">
              Superuser
            </span>
          </div>
          
          {/* Avatar with Premium Border */}
          <div className="relative p-[2px] rounded-full bg-linear-to-tr from-brand-500 to-indigo-500 shadow-md transform transition-transform group-hover:scale-105">
            <div className="w-9 h-9 bg-white dark:bg-surface-card-dark rounded-full flex items-center justify-center overflow-hidden">
              <User size={20} className="text-gray-600 dark:text-gray-300" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;