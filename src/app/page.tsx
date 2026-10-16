'use client';

import React, { useState } from 'react';
import { DocumentProvider, useDocumentContext } from '@/lib/DocumentContext';
import { Header } from '@/components/Header';
import { StudentPortal } from '@/components/StudentPortal';
import { StaffPortal } from '@/components/StaffPortal';
import { ApprovalsPortal } from '@/components/ApprovalsPortal';
import { RectorDashboard } from '@/components/RectorDashboard';
import { PresentationGuideBar } from '@/components/PresentationGuideBar';
import { ToastContainer } from '@/components/ToastContainer';
import { 
  GraduationCap, 
  Briefcase, 
  ShieldCheck, 
  Users, 
  Award,
  Smartphone
} from 'lucide-react';

function MainApp() {
  const { currentUser, setCurrentUser, users, theme } = useDocumentContext();
  const [isMobileView, setIsMobileView] = useState(false);

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark' : ''} bg-slate-100/80 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200`}>
      <Header />
      <ToastContainer />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Presentation Guide Bar for Rector pitch */}
        <PresentationGuideBar
          isMobileView={isMobileView}
          setIsMobileView={setIsMobileView}
        />

        {/* Interactive Role Switcher Tabs */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-2 sm:p-2.5 border border-slate-200/90 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 transition">
          <div className="flex items-center gap-1.5 px-2 py-0.5 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            <span className="text-[11px] sm:text-xs">Rolni tanlash:</span>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 sm:pb-0 -mx-1 px-1 sm:mx-0 sm:px-0">
            {users.map(u => {
              const isSelected = u.id === currentUser.id;
              
              const getIcon = () => {
                switch(u.role) {
                  case 'STUDENT': return <GraduationCap className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />;
                  case 'TEACHER': return <Briefcase className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />;
                  case 'DEAN': return <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />;
                  case 'HR': return <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />;
                  case 'RECTOR': return <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />;
                }
              };

              const getShortRole = () => {
                switch(u.role) {
                  case 'STUDENT': return 'Talaba';
                  case 'TEACHER': return 'O‘qituvchi';
                  case 'DEAN': return 'Dekan';
                  case 'HR': return 'Kadrlar';
                  case 'RECTOR': return 'Rektor';
                }
              };

              return (
                <button
                  key={u.id}
                  onClick={() => setCurrentUser(u)}
                  className={`flex-shrink-0 flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
                    isSelected
                      ? 'bg-slate-900 dark:bg-blue-600 text-white shadow-md'
                      : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200/60 dark:border-slate-700/60'
                  }`}
                >
                  {getIcon()}
                  <span className="sm:hidden">{getShortRole()}</span>
                  <span className="hidden sm:inline">{u.name} ({u.role})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Screen Layout: Mobile Simulator vs Standard Full Desktop */}
        {isMobileView ? (
          <div className="py-2 sm:py-6 flex flex-col items-center justify-center animate-slide-in">
            <div className="text-center mb-3 sm:mb-4 space-y-1">
              <span className="bg-indigo-100 dark:bg-indigo-950/80 text-indigo-800 dark:text-indigo-300 text-xs font-bold px-3 py-1 rounded-full inline-flex items-center gap-1.5 border border-indigo-200 dark:border-indigo-800">
                <Smartphone className="w-3.5 h-3.5" /> Telegram WebApp / Smartfon Rejimi
              </span>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Talabalar va xodimlar uchun moslashtirilgan to‘liq mobil interfeys
              </p>
            </div>

            {/* Smartphone Mockup Frame for larger screens, direct full view on mobile */}
            <div className="w-full max-w-md sm:bg-slate-900 sm:rounded-[44px] sm:p-3 md:p-4 sm:shadow-2xl sm:border-4 sm:border-slate-700 sm:ring-4 sm:ring-slate-800/50">
              
              {/* Dynamic Island (desktop simulation only) */}
              <div className="hidden sm:flex w-28 h-4 bg-black rounded-full mx-auto mb-3 items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-800 ml-auto mr-2" />
              </div>

              {/* Mobile Screen Container - displays fully without height clipping */}
              <div className="bg-slate-50 dark:bg-slate-950 sm:rounded-[32px] overflow-visible sm:p-3 border sm:border-slate-300 dark:sm:border-slate-800 text-slate-900 dark:text-white">
                {currentUser.role === 'STUDENT' && <StudentPortal />}
                {currentUser.role === 'TEACHER' && <StaffPortal />}
                {(currentUser.role === 'DEAN' || currentUser.role === 'HR') && <ApprovalsPortal />}
                {currentUser.role === 'RECTOR' && <RectorDashboard />}
              </div>

              {/* Bottom Home Indicator (desktop simulation only) */}
              <div className="hidden sm:block w-32 h-1 bg-white/40 rounded-full mx-auto mt-3" />
            </div>
          </div>
        ) : (
          <div className="transition-all">
            {currentUser.role === 'STUDENT' && <StudentPortal />}
            {currentUser.role === 'TEACHER' && <StaffPortal />}
            {(currentUser.role === 'DEAN' || currentUser.role === 'HR') && <ApprovalsPortal />}
            {currentUser.role === 'RECTOR' && <RectorDashboard />}
          </div>
        )}


      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-6 text-center text-xs text-slate-500 dark:text-slate-400 transition">
        <div className="flex items-center justify-center gap-2 mb-1.5">
          <img src="/samdu-logo.png" alt="SamDU" className="w-5 h-5 object-contain" />
          <span className="font-semibold text-slate-700 dark:text-slate-300">SamDU UniDocFlow</span>
        </div>
        <p>© 2026 Sharof Rashidov nomidagi Samarqand Davlat Universiteti • Qog‘ozsiz Hujjat Aylanmasi Ekotizimi</p>
      </footer>
    </div>
  );
}

export default function Home() {
  return (
    <DocumentProvider>
      <MainApp />
    </DocumentProvider>
  );
}
