'use client';

import React, { useState } from 'react';
import { useDocumentContext } from '@/lib/DocumentContext';
import { UNIVERSITY_ANALYTICS } from '@/lib/mockData';
import { 
  Award, 
  TrendingDown, 
  Clock, 
  FileCheck2, 
  ShieldCheck, 
  AlertOctagon, 
  KeyRound, 
  CheckCircle, 
  Layers, 
  Sparkles,
  ArrowRight,
  Send,
  Lock,
  Cpu
} from 'lucide-react';
import { OfficialDocumentModal } from './OfficialDocumentModal';

export function RectorDashboard() {
  const { currentUser, documents, signRectorOrder, searchQuery } = useDocumentContext();

  const [isSigning, setIsSigning] = useState(false);
  const [signingModalDoc, setSigningModalDoc] = useState<any>(null);
  const [signingStep, setSigningStep] = useState(1);
  const [previewDoc, setPreviewDoc] = useState<any>(null);

  // Orders or requests awaiting Rector's final signature
  const pendingOrders = documents
    .filter(doc => doc.workflow.some(s => s.role === 'RECTOR' && s.status === 'PENDING'))
    .filter(doc => !searchQuery || doc.title.toLowerCase().includes(searchQuery.toLowerCase()) || doc.id.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleStartSign = (doc: any) => {
    setSigningModalDoc(doc);
    setSigningStep(1);
  };

  const handleConfirmSign = async () => {
    if (!signingModalDoc) return;
    setIsSigning(true);
    setSigningStep(2); // Connecting to E-IMZO Client

    setTimeout(() => {
      setSigningStep(3); // Kriptografik imzolash
    }, 800);

    setTimeout(async () => {
      await signRectorOrder(signingModalDoc.id);
      setIsSigning(false);
      setSigningStep(4); // Muvaffaqiyatli
      setTimeout(() => {
        setSigningModalDoc(null);
      }, 1200);
    }, 1800);
  };

  return (
    <div className="space-y-5 sm:space-y-8">
      
      {/* Rector Header */}
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 p-4 sm:p-8 text-white shadow-xl sm:shadow-2xl border border-slate-800">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="relative flex-shrink-0">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-13 h-13 sm:w-16 sm:h-16 rounded-2xl object-cover border-2 border-amber-400/60 shadow-lg"
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
                <span className="bg-amber-500/20 text-amber-300 text-[10px] sm:text-xs px-2.5 py-0.5 rounded-full font-semibold border border-amber-500/30">
                  SamDU Rektori
                </span>
              </div>
              <p className="text-[11px] sm:text-sm text-slate-300 mt-1 line-clamp-2 sm:line-clamp-none">
                Sharof Rashidov nomidagi Samarqand Davlat Universiteti Boshqaruv & Ijro Nazorati Bosh Paneli
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/30 px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl text-emerald-300 text-xs shadow-inner">
            <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0 animate-pulse" />
            <div>
              <strong className="block text-[11px] sm:text-xs">E-IMZO Davlat Kaliti Ulangan</strong>
              <span className="text-[10px] sm:text-[11px] text-emerald-400/80">PINFL: {currentUser.pinfl} (Sertifikat faol)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Real-Time Efficiency & Paperless Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
        
        <div className="bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2 transition hover:border-emerald-500">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Tejalgan Qog‘oz</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <TrendingDown className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            {UNIVERSITY_ANALYTICS.savedPaperSheets.toLocaleString()} <span className="text-xs font-normal text-slate-400">varaq</span>
          </div>
          <p className="text-[11px] text-emerald-700 dark:text-emerald-400 font-medium">
            ↓ 92% qog‘oz va toner xarajatlari tejaldi
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2 transition hover:border-blue-500">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Tejalgan Ish Vaqti</span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            {UNIVERSITY_ANALYTICS.savedWorkHours.toLocaleString()} <span className="text-xs font-normal text-slate-400">soat</span>
          </div>
          <p className="text-[11px] text-blue-700 dark:text-blue-400 font-medium">
            Xodimlar navbatda emas, ta’lim jarayonida
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2 transition hover:border-indigo-500">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">O‘rtacha Ko‘rib Chiqish</span>
            <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <FileCheck2 className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            {UNIVERSITY_ANALYTICS.averageApprovalHours} <span className="text-xs font-normal text-slate-400">soat</span>
          </div>
          <p className="text-[11px] text-indigo-700 dark:text-indigo-400 font-medium">
            Ilgari: 5–7 kun (xonalarda yurish davri)
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2 transition hover:border-amber-500">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Imzo Kutilayotganlar</span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <KeyRound className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            {pendingOrders.length} <span className="text-xs font-normal text-slate-400">ta buyruq</span>
          </div>
          <p className="text-[11px] text-amber-700 dark:text-amber-400 font-medium">
            Rektor vizasi va E-IMZO kutilmoqda
          </p>
        </div>

      </div>

      {/* Bottleneck Radar & Efficiency Analysis */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 sm:space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center">
              <AlertOctagon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Byurokratiya Radari (Bottleneck Detector)</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Universitet bo‘yicha hujjatlar qayerda to‘xtab qolayotganini aniqlash tizimi</p>
            </div>
          </div>
          <span className="text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-3 py-1 rounded-full">
            Avtomatik monitoring
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          <div className="p-5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-emerald-900 dark:text-emerald-200">
              <span>Eng Tezkor Bo‘linma (Namunali):</span>
              <span className="bg-emerald-200/80 dark:bg-emerald-900/60 text-emerald-950 dark:text-emerald-200 px-2 py-0.5 rounded text-[10px]">Yuqori SLA</span>
            </div>
            <div className="text-sm font-bold text-emerald-950 dark:text-emerald-200">
              {UNIVERSITY_ANALYTICS.fastestFaculty}
            </div>
            <p className="text-[11px] text-emerald-800 dark:text-emerald-400">
              Barcha dekanat va kafedra arizalari o‘rtacha 2.1 soat ichida elektron viza bilan tasdiqlanmoqda.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-rose-50/80 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800/60 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-rose-900 dark:text-rose-200">
              <span>Diqqat: Kechikishlar Aniqlangan Qizil Zona:</span>
              <span className="bg-rose-200/80 dark:bg-rose-900/60 text-rose-950 dark:text-rose-200 px-2 py-0.5 rounded text-[10px]">Ogohlantirish</span>
            </div>
            <div className="text-sm font-bold text-rose-950 dark:text-rose-200">
              {UNIVERSITY_ANALYTICS.slowestFaculty}
            </div>
            <p className="text-[11px] text-rose-800 dark:text-rose-400">
              Ushbu fakultet dekanatida 7 ta ariza 19 soatdan ortiq ko‘rib chiqilmasdan turibdi. Tizim avtomatik eslatma yubordi.
            </p>
          </div>

        </div>
      </div>

      {/* Awaiting Rector E-IMZO Signatures */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 sm:space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">Rektorat Buyruqlari va E-IMZO Bilan Tasdiqlash</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Bo‘limlar tomonidan to‘liq kelishilgan va Rektor imzosi kutilayotgan hujjatlar</p>
          </div>
          <span className="text-[11px] sm:text-xs font-semibold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 px-3 py-1 rounded-full border border-amber-200 dark:border-amber-800 self-start sm:self-auto">
            {pendingOrders.length} ta hujjat kutmoqda
          </span>
        </div>

        {pendingOrders.length === 0 ? (
          <div className="p-8 text-center text-slate-500 dark:text-slate-400 text-xs border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
            Hozirda Rektor imzosi kutilayotgan buyruqlar mavjud emas.
          </div>
        ) : (
          <div className="space-y-4">
            {pendingOrders.map((doc) => (
              <div key={doc.id} className="p-4 sm:p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono bg-blue-100 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300 font-bold px-2 py-0.5 rounded">
                        {doc.id}
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">{doc.createdAt}</span>
                    </div>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white">{doc.title}</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      Tashabbuskor: <strong className="text-slate-800 dark:text-slate-200">{doc.applicantName}</strong> ({doc.applicantRole}) • {doc.department}
                    </p>
                  </div>

                  <span className="bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold px-3 py-1 rounded-full self-start border border-emerald-200 dark:border-emerald-800">
                    ✓ Barcha quyi vizalar to‘plangan
                  </span>
                </div>

                {/* Workflow steps recap */}
                <div className="flex flex-wrap gap-2 text-xs">
                  {doc.workflow.map(s => (
                    <span
                      key={s.stepNumber}
                      className={`px-2.5 py-1 rounded-lg border font-medium ${
                        s.status === 'APPROVED' 
                          ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800' 
                          : 'bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800'
                      }`}
                    >
                      {s.roleName}: {s.status === 'APPROVED' ? `✓ ${s.approverName}` : 'Kutilmoqda'}
                    </span>
                  ))}
                </div>

                {/* Execution tasks attached */}
                {doc.executionTasks && (
                  <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1.5 text-xs">
                    <span className="font-bold text-slate-700 dark:text-slate-300 block">Buyruq Imzolangach Avtomatik Yaratiladigan Ijro Vazifalari:</span>
                    {doc.executionTasks.map(t => (
                      <div key={t.id} className="text-slate-600 dark:text-slate-400 flex items-center justify-between">
                        <span>• {t.title} ({t.assigneeDepartment})</span>
                        <span className="font-mono text-slate-400">Muddat: {t.deadline}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* E-IMZO Sign Trigger */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200 dark:border-slate-750">
                  <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                    <KeyRound className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    <span>Tugmani bosish orqali milliy E-IMZO kaliti bilan buyruq imzolandi va kuchga kiradi.</span>
                  </div>

                  <button
                    onClick={() => handleStartSign(doc)}
                    className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold rounded-xl text-xs shadow-lg shadow-amber-600/25 transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>E-IMZO Bilan Imzolash va Ijroga Qaratish</span>
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

      {/* Simulated Interactive E-IMZO Certificate Modal */}
      {signingModalDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-md">
          <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4 sm:space-y-6 animate-slide-in">
            
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="w-12 h-12 rounded-2xl bg-white p-1 flex items-center justify-center border border-amber-500/40 shadow-sm flex-shrink-0">
                <img src="/samdu-logo.png" alt="SamDU" className="w-full h-full object-contain" />
              </div>
              <div>
                <h4 className="font-extrabold text-base">SamDU E-IMZO Davlat Sertifikati</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">Yuridik kuchga ega raqamli kalit yordamida imzolash</p>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Imzolovchi:</span>
                <span className="font-bold">{currentUser.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">PINFL / JSHSHIR:</span>
                <span className="font-mono">{currentUser.pinfl}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Sertifikat berilgan:</span>
                <span>Davlat Soliq Qo‘mitasi (E-IMZO Markazi)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Hujjat:</span>
                <span className="font-semibold text-amber-600 dark:text-amber-400">{signingModalDoc.title}</span>
              </div>
            </div>

            {/* Animation state during signing */}
            {isSigning ? (
              <div className="py-4 text-center space-y-3">
                <div className="w-10 h-10 border-3 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-xs font-semibold text-amber-600 dark:text-amber-400">
                  {signingStep === 2 && "E-IMZO USB kalit bilan ulanish o‘rnatilmoqda..."}
                  {signingStep === 3 && "SHA-256 kriptografik imzo hosil qilinmoqda..."}
                  {signingStep === 4 && "✓ Muvaffaqiyatli imzolandi va bazaga yozildi!"}
                </p>
              </div>
            ) : (
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => setSigningModalDoc(null)}
                  className="px-4 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-semibold transition"
                >
                  Bekor Qilish
                </button>
                <button
                  onClick={handleConfirmSign}
                  className="px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl text-xs shadow-lg shadow-amber-600/30 transition flex items-center gap-2 cursor-pointer"
                >
                  <Lock className="w-4 h-4" />
                  <span>Sertifikatni Tasdiqlash va Imzolash</span>
                </button>
              </div>
            )}

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
