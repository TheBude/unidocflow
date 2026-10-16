'use client';

import React, { useState } from 'react';
import { useDocumentContext } from '@/lib/DocumentContext';
import { DocumentRequest } from '@/lib/types';
import { 
  CheckCheck, 
  XCircle, 
  Clock, 
  FileText, 
  User, 
  ShieldCheck, 
  Calendar, 
  Building,
  CheckCircle2,
  AlertTriangle,
  History,
  Sparkles
} from 'lucide-react';
import { OfficialDocumentModal } from './OfficialDocumentModal';

export function ApprovalsPortal() {
  const { currentUser, documents, approveStep, rejectStep, searchQuery } = useDocumentContext();

  const [comment, setComment] = useState('');
  const [rejectModalDoc, setRejectModalDoc] = useState<DocumentRequest | null>(null);
  const [previewDoc, setPreviewDoc] = useState<any>(null);

  // Filter requests waiting for this user's role approval
  const pendingForMe = documents
    .filter(doc => doc.workflow.some(s => s.role === currentUser.role && s.status === 'PENDING'))
    .filter(doc => !searchQuery || doc.title.toLowerCase().includes(searchQuery.toLowerCase()) || doc.applicantName.toLowerCase().includes(searchQuery.toLowerCase()));

  // Filter requests already approved by this role
  const historyForMe = documents.filter(doc => 
    doc.workflow.some(s => s.role === currentUser.role && s.status === 'APPROVED')
  );

  const handleApprove = async (docId: string) => {
    await approveStep(docId, comment || 'Hujjat talablarga to‘liq javob beradi. Maqullandi.');
    setComment('');
  };

  const handleReject = async () => {
    if (!rejectModalDoc) return;
    await rejectStep(rejectModalDoc.id, comment || 'Talab qilingan me’yorlarga nomuvofiqlik aniqlanganligi sababli rad etildi.');
    setRejectModalDoc(null);
    setComment('');
  };

  return (
    <div className="space-y-5 sm:space-y-8">
      
      {/* Banner */}
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 p-4 sm:p-8 text-white shadow-xl sm:shadow-2xl border border-blue-900/40">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="relative flex-shrink-0">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-13 h-13 sm:w-16 sm:h-16 rounded-2xl object-cover border-2 border-blue-400/50 shadow-md"
              />
              <img
                src="/samdu-logo.png"
                alt="SamDU"
                className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white p-0.5 object-contain absolute -bottom-1 -right-1 border border-slate-700 shadow"
              />
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <h2 className="text-lg sm:text-2xl font-bold truncate">{currentUser.name}</h2>
                <span className="bg-blue-500/20 text-blue-300 text-[10px] sm:text-xs px-2 py-0.5 rounded-full font-semibold border border-blue-500/30">
                  {currentUser.roleTitle}
                </span>
              </div>
              <p className="text-[11px] sm:text-sm text-slate-300 mt-1 line-clamp-2 sm:line-clamp-none">
                SamDU • {currentUser.department} {currentUser.faculty ? `• ${currentUser.faculty}` : ''}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-4">
            <div className="flex-1 sm:flex-none bg-white/10 dark:bg-slate-800/80 backdrop-blur-md px-3 sm:px-4 py-2 sm:py-3 rounded-xl sm:rounded-2xl border border-white/10 dark:border-slate-700 text-center">
              <span className="text-xl sm:text-2xl font-extrabold text-amber-400">{pendingForMe.length}</span>
              <span className="text-[10px] sm:text-xs text-slate-300 dark:text-slate-400 block font-medium">Kutilayotgan Vizalar</span>
            </div>
            <div className="flex-1 sm:flex-none bg-white/10 dark:bg-slate-800/80 backdrop-blur-md px-3 sm:px-4 py-2 sm:py-3 rounded-xl sm:rounded-2xl border border-white/10 dark:border-slate-700 text-center">
              <span className="text-xl sm:text-2xl font-extrabold text-emerald-400">{historyForMe.length}</span>
              <span className="text-[10px] sm:text-xs text-slate-300 dark:text-slate-400 block font-medium">Imzolanganlar</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Inbox: Pending approvals */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base sm:text-lg">Kelib Tushgan Arizalar va Kelishuvlar (Inbox)</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Sizning elektron vizangizni kutayotgan faol arizalar</p>
          </div>
          <span className="text-[11px] sm:text-xs font-semibold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 px-3 py-1 rounded-full self-start sm:self-auto">
            SLA: 24 soat ichida ko‘rib chiqilishi shart
          </span>
        </div>

        {pendingForMe.length === 0 ? (
          <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-slate-800 dark:text-white text-sm">Barcha arizalar o‘z vaqtida ko‘rib chiqilgan!</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
              Hozirda sizning tasdig‘ingizni kutayotgan hujjatlar mavjud emas. Byurokratik kechikishlar yo‘q.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {pendingForMe.map((doc) => {
              return (
                <div key={doc.id} className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 sm:space-y-6">
                  
                  {/* Top info */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-1 rounded-md">
                          {doc.type}
                        </span>
                        <span className="text-xs font-mono text-slate-400">ID: {doc.id}</span>
                      </div>
                      <h4 className="text-base font-bold text-slate-900 dark:text-white">{doc.title}</h4>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600 dark:text-slate-400 pt-1">
                        <span className="flex items-center gap-1">
                          <User className="w-3.5 h-3.5 text-slate-400" />
                          Ariza muallifi: <strong className="text-slate-850 dark:text-slate-200">{doc.applicantName}</strong>
                        </span>
                        <span className="flex items-center gap-1">
                          <Building className="w-3.5 h-3.5 text-slate-400" />
                          Bo‘lim: {doc.department}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          Yuborilgan vaqt: {doc.createdAt}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 px-3 py-1.5 rounded-xl border border-amber-200 dark:border-amber-800 text-xs font-semibold self-start">
                      <Clock className="w-4 h-4 animate-pulse" />
                      <span>Qolgan SLA: 21 soat 40 daqiqa</span>
                    </div>
                  </div>

                  {/* Form Details Preview */}
                  <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700 space-y-2 text-xs">
                    <div className="font-semibold text-slate-700 dark:text-slate-300">Ariza Tafsilotlari:</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-600 dark:text-slate-400">
                      {doc.formData.startDate && (
                        <div>
                          <span className="text-slate-400">Ta’til muddati: </span>
                          <strong className="text-slate-800 dark:text-white">{doc.formData.startDate} dan {doc.formData.endDate} gacha ({doc.formData.daysCount} kun)</strong>
                        </div>
                      )}
                      {doc.formData.reason && (
                        <div className="sm:col-span-2">
                          <span className="text-slate-400">Izoh/Sabab: </span>
                          <span className="text-slate-800 dark:text-slate-200">{doc.formData.reason}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Previous Approvals Chain */}
                  <div className="space-y-2">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Oldingi Vizalar:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {doc.workflow.map((s) => (
                        <span
                          key={s.stepNumber}
                          className={`text-xs px-2.5 py-1 rounded-lg border font-medium flex items-center gap-1 ${
                            s.status === 'APPROVED'
                              ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
                              : s.status === 'PENDING'
                              ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800'
                              : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
                          }`}
                        >
                          {s.status === 'APPROVED' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />}
                          <span>{s.roleName}: {s.status === 'APPROVED' ? `Tasdiqladi (${s.approverName})` : 'Kutilmoqda'}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      <span>Tasdiqlanganda shaxsiy E-IMZO raqamli kalitingiz bilan imzolanadi.</span>
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto">
                      <button
                        onClick={() => setRejectModalDoc(doc)}
                        className="flex-1 sm:flex-none px-4 py-2.5 bg-rose-50 dark:bg-rose-950/60 hover:bg-rose-100 dark:hover:bg-rose-900 text-rose-700 dark:text-rose-300 font-semibold rounded-xl text-xs border border-rose-200 dark:border-rose-800 transition cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <XCircle className="w-4 h-4" />
                        <span>Rad Etish</span>
                      </button>

                      <button
                        onClick={() => handleApprove(doc.id)}
                        className="flex-1 sm:flex-none px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow-lg shadow-emerald-600/30 transition cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <CheckCheck className="w-4 h-4" />
                        <span>Elektron Viza Qo‘yish (Tasdiqlash)</span>
                      </button>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* History of signed documents */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <History className="w-5 h-5 text-slate-400" />
          <h3 className="font-bold text-slate-900 dark:text-white text-base">Siz Tomoningizdan Imzolangan Hujjatlar Arxivi</h3>
        </div>

        {historyForMe.length === 0 ? (
          <p className="text-xs text-slate-400">Hozircha imzolangan hujjatlar mavjud emas.</p>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {historyForMe.map((doc) => (
              <div key={doc.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="font-semibold text-xs text-slate-900 dark:text-white">{doc.title}</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">
                    Muallif: {doc.applicantName} • Sana: {doc.updatedAt}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded font-mono">
                    ✓ E-IMZO bilan viza qo‘yilgan
                  </span>
                  {doc.generatedDoc && (
                    <button
                      onClick={() => setPreviewDoc(doc.generatedDoc)}
                      className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-medium"
                    >
                      Blankni ko‘rish
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Reject Modal */}
      {rejectModalDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-2xl p-4 sm:p-6 max-w-md w-full space-y-4 shadow-2xl border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400">
              <AlertTriangle className="w-5 h-5 flex-shrink-0" />
              <h4 className="font-bold text-sm sm:text-base">Arizani Rad Etish</h4>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Arizani rad etish sababini kiriting. Ushbu izoh ariza muallifiga ko‘rsatiladi.
            </p>
            <textarea
              rows={3}
              placeholder="Masalan: Taqdim etilgan muddatda imtihon komissiyasi faoliyati mavjud..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full p-3 border border-slate-300 dark:border-slate-700 rounded-xl text-xs focus:ring-2 focus:ring-rose-500 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none"
            />
            <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 pt-2">
              <button
                onClick={() => setRejectModalDoc(null)}
                className="w-full sm:w-auto px-4 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-semibold cursor-pointer text-center"
              >
                Bekor Qilish
              </button>
              <button
                onClick={handleReject}
                className="w-full sm:w-auto px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-semibold cursor-pointer text-center"
              >
                Rad Etishni Tasdiqlash
              </button>
            </div>
          </div>
        </div>
      )}

      {previewDoc && (
        <OfficialDocumentModal
          doc={previewDoc}
          onClose={() => setPreviewDoc(null)}
        />
      )}

    </div>
  );
}
