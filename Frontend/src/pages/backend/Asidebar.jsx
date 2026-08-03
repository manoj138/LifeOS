import React, { useState } from "react";
import {
  Menu,
  X,
  Home,
  User,
  ShoppingCart,
  Package,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Asidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  // Logic unchanged: Checks if the path matches or is the base
  const isActive = (path) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <div
      className={`h-screen relative transition-all duration-500 ease-in-out print:hidden border-r border-white/10 ${
        isOpen ? "w-64" : "w-20"
      } bg-surface-dark text-white shadow-premium`}
    >
      {/* HEADER - With Glass Effect */}
      <div className="flex items-center justify-between p-5 mb-4">
        <h1 
          className={`font-bold tracking-tight text-gradient text-xl transition-opacity duration-300 ${
            !isOpen ? "opacity-0 invisible" : "opacity-100 visible"
          }`}
        >
          Admin Panel
        </h1>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-lg hover:bg-white/10 transition-colors duration-200 focus:outline-none"
        >
          {isOpen ? <X size={20} /> : <Menu size={24} />}
        </button>
      </div>

      {/* MENU */}
      <nav className="mt-4 px-3">
        <ul className="space-y-2">
          {/* Dashboard Link */}
          <li>
            <Link
              to="/"
              className={`flex items-center gap-4 p-3.5 rounded-xl transition-all duration-300 group ${
                isActive("/") 
                  ? "bg-brand-500/10 border border-brand-500/20 text-brand-400 shadow-[0_0_20px_rgba(59,130,246,0.1)]" 
                  : "hover:bg-white/5 text-gray-400 hover:text-white"
              }`}
            >
              <Home className={`shrink-0 transition-transform duration-300 group-hover:scale-110 ${isActive("/") ? "text-brand-400" : ""}`} size={22} />
              <span className={`font-medium transition-all duration-300 ${!isOpen && "opacity-0 translate-x-4 pointer-events-none"}`}>
                Dashboard
              </span>
            </Link>
          </li>

          {/* Customers Link */}
          <li>
            <Link
              to="/customers"
              className={`flex items-center gap-4 p-3.5 rounded-xl transition-all duration-300 group ${
                isActive("/customers") 
                  ? "bg-brand-500/10 border border-brand-500/20 text-brand-400 shadow-[0_0_20px_rgba(59,130,246,0.1)]" 
                  : "hover:bg-white/5 text-gray-400 hover:text-white"
              }`}
            >
              <User className={`shrink-0 transition-transform duration-300 group-hover:scale-110 ${isActive("/customers") ? "text-brand-400" : ""}`} size={22} />
              <span className={`font-medium transition-all duration-300 ${!isOpen && "opacity-0 translate-x-4 pointer-events-none"}`}>
                Customers
              </span>
            </Link>
          </li>

          {/* Products Link */}
          <li>
            <Link
              to="/products"
              className={`flex items-center gap-4 p-3.5 rounded-xl transition-all duration-300 group ${
                isActive("/products") 
                  ? "bg-brand-500/10 border border-brand-500/20 text-brand-400 shadow-[0_0_20px_rgba(59,130,246,0.1)]" 
                  : "hover:bg-white/5 text-gray-400 hover:text-white"
              }`}
            >
              <Package className={`shrink-0 transition-transform duration-300 group-hover:scale-110 ${isActive("/products") ? "text-brand-400" : ""}`} size={22} />
              <span className={`font-medium transition-all duration-300 ${!isOpen && "opacity-0 translate-x-4 pointer-events-none"}`}>
                Products
              </span>
            </Link>
          </li>

          {/* Sales Link */}
          <li>
            <Link
              to="/salemasters"
              className={`flex items-center gap-4 p-3.5 rounded-xl transition-all duration-300 group ${
                isActive("/salemasters") 
                  ? "bg-brand-500/10 border border-brand-500/20 text-brand-400 shadow-[0_0_20px_rgba(59,130,246,0.1)]" 
                  : "hover:bg-white/5 text-gray-400 hover:text-white"
              }`}
            >
              <ShoppingCart className={`shrink-0 transition-transform duration-300 group-hover:scale-110 ${isActive("/salemasters") ? "text-brand-400" : ""}`} size={22} />
              <span className={`font-medium transition-all duration-300 ${!isOpen && "opacity-0 translate-x-4 pointer-events-none"}`}>
                Sales
              </span>
            </Link>
          </li>
        </ul>
      </nav>

      {/* Decorative Bottom Element (Optional) */}
      {isOpen && (
        <div className="absolute bottom-8 left-6 right-6 p-4 rounded-2xl glass bg-white/5 border border-white/10 text-center">
          <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold">MERN Stack Pro</p>
        </div>
      )}
    </div>
  );
};

export default Asidebar;