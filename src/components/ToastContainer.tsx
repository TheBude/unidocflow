'use client';

import React from 'react';
import { useDocumentContext } from '@/lib/DocumentContext';
import { CheckCircle2, Info, AlertTriangle, X, Bell } from 'lucide-react';

export function ToastContainer() {
  const { toasts, removeToast } = useDocumentContext();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-16 sm:top-20 right-2 sm:right-4 left-2 sm:left-auto max-w-sm z-50 flex flex-col gap-2.5 pointer-events-none">
      {toasts.map(toast => {
        const isSuccess = toast.type === 'success';
        const isWarning = toast.type === 'warning';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl shadow-2xl border backdrop-blur-xl animate-slide-in transition-all ${
              isSuccess
                ? 'bg-slate-900/95 text-white border-emerald-500/50 shadow-emerald-950/40'
                : isWarning
                ? 'bg-slate-900/95 text-white border-rose-500/50 shadow-rose-950/40'
                : 'bg-slate-900/95 text-white border-blue-500/50 shadow-blue-950/40'
            }`}
          >
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                isSuccess
                  ? 'bg-emerald-500/20 text-emerald-400'
                  : isWarning
                  ? 'bg-rose-500/20 text-rose-400'
                  : 'bg-blue-500/20 text-blue-400'
              }`}
            >
              {isSuccess && <CheckCircle2 className="w-5 h-5" />}
              {isWarning && <AlertTriangle className="w-5 h-5" />}
              {!isSuccess && !isWarning && <Bell className="w-5 h-5" />}
            </div>

            <div className="flex-1 space-y-0.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-white tracking-wide">
                  {toast.title}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  {toast.timestamp}
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {toast.message}
              </p>
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-white p-1 rounded-lg transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
