'use client';

import React from 'react';
import { useDocumentContext } from '@/lib/DocumentContext';
import { 
  PlayCircle, 
  GraduationCap, 
  Briefcase, 
  ShieldCheck, 
  Award, 
  Smartphone, 
  Monitor,
  Sparkles,
  Database
} from 'lucide-react';

interface Props {
  isMobileView: boolean;
  setIsMobileView: (val: boolean) => void;
}

export function PresentationGuideBar({ isMobileView, setIsMobileView }: Props) {
  const { users, setCurrentUser, currentUser } = useDocumentContext();

  const handleStep = (role: string) => {
    const targetUser = users.find(u => u.role === role);
    if (targetUser) setCurrentUser(targetUser);
  };

  return (
    <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-4 shadow-xl border border-indigo-500/30">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        
        {/* Left: Presentation Badge */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-white p-1 flex items-center justify-center border border-amber-500/40 shadow-sm flex-shrink-0">
            <img src="/samdu-logo.png" alt="SamDU" className="w-full h-full object-contain" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold uppercase tracking-wider text-amber-300">
                Taqdimot Rejimi (SamDU Rektori Uchun Demo)
              </span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30 flex items-center gap-1 font-mono">
                <Database className="w-2.5 h-2.5" /> SamDU API: Online
              </span>
            </div>
            <p className="text-[11px] text-slate-300">
              Rektorga ko‘rsatish uchun 4 bosqichli amaliy stsenariyni bosing:
            </p>
          </div>
        </div>

        {/* Center: 4 Step Buttons (Swipeable on mobile) */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full lg:w-auto pb-1 lg:pb-0">
          
          <button
            onClick={() => handleStep('STUDENT')}
            className={`flex-shrink-0 px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
              currentUser.role === 'STUDENT'
                ? 'bg-blue-600 text-white ring-2 ring-blue-400 shadow-md'
                : 'bg-slate-800/90 text-slate-300 hover:bg-slate-750 border border-slate-700'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5 text-blue-300" />
            <span>1-qadam: Talaba (Spravka)</span>
          </button>

          <button
            onClick={() => handleStep('TEACHER')}
            className={`flex-shrink-0 px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
              currentUser.role === 'TEACHER'
                ? 'bg-indigo-600 text-white ring-2 ring-indigo-400 shadow-md'
                : 'bg-slate-800/90 text-slate-300 hover:bg-slate-750 border border-slate-700'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5 text-indigo-300" />
            <span>2-qadam: O‘qituvchi (Ariza)</span>
          </button>

          <button
            onClick={() => handleStep('DEAN')}
            className={`flex-shrink-0 px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
              currentUser.role === 'DEAN' || currentUser.role === 'HR'
                ? 'bg-emerald-600 text-white ring-2 ring-emerald-400 shadow-md'
                : 'bg-slate-800/90 text-slate-300 hover:bg-slate-750 border border-slate-700'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
            <span>3-qadam: Dekan & HR (Viza)</span>
          </button>

          <button
            onClick={() => handleStep('RECTOR')}
            className={`flex-shrink-0 px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
              currentUser.role === 'RECTOR'
                ? 'bg-amber-600 text-white ring-2 ring-amber-400 shadow-md'
                : 'bg-slate-800/90 text-slate-300 hover:bg-slate-750 border border-slate-700'
            }`}
          >
            <Award className="w-3.5 h-3.5 text-amber-300" />
            <span>4-qadam: Rektor (E-IMZO)</span>
          </button>

        </div>

        {/* Right: Mobile / Desktop Device View Toggle */}
        <div className="hidden sm:flex items-center gap-1 bg-slate-800/90 p-1 rounded-xl border border-slate-700 self-end lg:self-center flex-shrink-0">
          <button
            onClick={() => setIsMobileView(false)}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-medium flex items-center gap-1 transition cursor-pointer ${
              !isMobileView ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
            title="Katta ekran (Kompyuter)"
          >
            <Monitor className="w-3 h-3" />
            <span>Desktop</span>
          </button>
          <button
            onClick={() => setIsMobileView(true)}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-medium flex items-center gap-1 transition cursor-pointer ${
              isMobileView ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
            title="Mobil / Telegram WebApp ko'rinishi"
          >
            <Smartphone className="w-3 h-3" />
            <span>Mobil Rejim</span>
          </button>
        </div>

      </div>
    </div>
  );
}
