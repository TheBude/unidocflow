'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useDocumentContext } from '@/lib/DocumentContext';
import { 
  Building2, 
  ShieldCheck, 
  Moon, 
  Sun, 
  ChevronDown, 
  Bell, 
  Search, 
  X,
  Sparkles
} from 'lucide-react';

export function Header() {
  const { 
    currentUser, 
    setCurrentUser, 
    users, 
    documents, 
    theme, 
    toggleTheme,
    searchQuery,
    setSearchQuery 
  } = useDocumentContext();

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const pendingCount = documents.filter(doc => 
    doc.workflow.some(s => s.role === currentUser.role && s.status === 'PENDING')
  ).length;

  return (
    <header className="bg-slate-900/95 dark:bg-slate-950/95 backdrop-blur-xl border-b border-slate-800 text-white sticky top-0 z-40 shadow-lg">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 gap-2 sm:gap-4">
          
          {/* Logo & Platform Name */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="h-9 w-9 sm:h-11 sm:w-11 rounded-xl sm:rounded-2xl bg-white p-1 flex items-center justify-center shadow-md shadow-blue-500/20 border border-slate-700/60 overflow-hidden flex-shrink-0">
              <img
                src="/samdu-logo.png"
                alt="SamDU Logotipi"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-extrabold text-sm sm:text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-blue-300 bg-clip-text text-transparent truncate">
                  SamDU UniDocFlow
                </span>
                <span className="text-[9px] sm:text-[10px] uppercase font-bold px-1.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/40 flex-shrink-0">
                  Rasmiy
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-400 hidden sm:block truncate">
                Sharof Rashidov nomidagi Samarqand Davlat Universiteti
              </p>
            </div>
          </div>

          {/* Desktop Search Box */}
          <div className="hidden lg:flex items-center relative flex-1 max-w-xs">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
            <input
              type="text"
              placeholder="Hujjatlar yoki arizalarni izlash..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-slate-800/80 dark:bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* Right Toolbar: Mobile Search Toggle + Theme Toggle + User Switcher */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 flex-shrink-0">
            
            {/* Mobile Search Button */}
            <button
              onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
              className="lg:hidden p-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
              aria-label="Izlash"
            >
              {isMobileSearchOpen ? <X className="w-4 h-4 text-rose-400" /> : <Search className="w-4 h-4 text-slate-300" />}
            </button>

            {/* Dark / Light Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white transition cursor-pointer relative"
              title={theme === 'dark' ? "Kunduzgi rejimga o'tish" : "Tungi rejimga o'tish"}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400 rotate-0 transition" />
              ) : (
                <Moon className="w-4 h-4 text-indigo-400 rotate-0 transition" />
              )}
            </button>

            {/* User Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-1.5 sm:gap-2.5 bg-slate-800/90 hover:bg-slate-750 px-2 sm:px-3 py-1.5 rounded-xl border border-slate-700 cursor-pointer transition shadow-sm text-left"
              >
                <div className="relative flex-shrink-0">
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover border border-slate-600"
                  />
                  <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full absolute bottom-0 right-0 ring-2 ring-slate-900" />
                </div>
                
                <div className="text-left hidden md:block max-w-[120px]">
                  <div className="text-xs font-semibold text-white leading-tight flex items-center gap-1 truncate">
                    {currentUser.name}
                    {pendingCount > 0 && (
                      <span className="bg-amber-500 text-black text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                        {pendingCount}
                      </span>
                    )}
                  </div>
                  <div className="text-[10px] text-blue-400 font-medium leading-tight truncate">
                    {currentUser.roleTitle}
                  </div>
                </div>
                <ChevronDown className={`w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-72 max-w-[calc(100vw-24px)] bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl py-2 z-50 animate-slide-in">
                  <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-800 flex items-center justify-between">
                    <span>Foydalanuvchi tanlang</span>
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  </div>
                  <div className="max-h-72 overflow-y-auto">
                    {users.map(u => {
                      const isSelected = u.id === currentUser.id;
                      const uPending = documents.filter(doc => 
                        doc.workflow.some(s => s.role === u.role && s.status === 'PENDING')
                      ).length;

                      return (
                        <button
                          key={u.id}
                          onClick={() => {
                            setCurrentUser(u);
                            setIsUserMenuOpen(false);
                          }}
                          className={`w-full text-left px-3 py-2.5 flex items-center gap-3 hover:bg-slate-800 transition cursor-pointer ${
                            isSelected ? 'bg-blue-600/20 border-l-2 border-blue-500' : ''
                          }`}
                        >
                          <img src={u.avatar} alt={u.name} className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-medium text-white flex items-center justify-between">
                              <span className="truncate">{u.name}</span>
                              {uPending > 0 && (
                                <span className="bg-amber-500/20 text-amber-300 text-[10px] px-1.5 rounded-full font-bold flex-shrink-0">
                                  {uPending} kutilmoqda
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-slate-400 truncate">{u.roleTitle}</div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>

        {/* Mobile Search Bar Dropdown */}
        {isMobileSearchOpen && (
          <div className="lg:hidden pb-3 pt-1 animate-slide-in">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
              <input
                type="text"
                placeholder="Hujjatlar yoki arizalarni izlash..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="w-full pl-9 pr-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        )}

      </div>
    </header>
  );
}
