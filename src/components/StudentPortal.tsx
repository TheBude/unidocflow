'use client';

import React, { useState } from 'react';
import { useDocumentContext } from '@/lib/DocumentContext';
import { 
  FileCheck, 
  Sparkles, 
  Clock, 
  Download, 
  CheckCircle2, 
  QrCode, 
  FileText, 
  GraduationCap, 
  Search,
  ExternalLink,
  Layers,
  Award
} from 'lucide-react';
import { OfficialDocumentModal } from './OfficialDocumentModal';

export function StudentPortal() {
  const { currentUser, documents, createStudentReference, searchQuery } = useDocumentContext();
  const [selectedDocType, setSelectedDocType] = useState('STUDENT_REFERENCE');
  const [selectedPurpose, setSelectedPurpose] = useState('Mudofaa ishlari bo‘limiga (Harbiy hisob)');
  const [customPurpose, setCustomPurpose] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [previewDoc, setPreviewDoc] = useState<any>(null);

  // Filter student docs and match search query
  const studentDocs = documents
    .filter(doc => doc.applicantId === currentUser.id)
    .filter(doc => !searchQuery || doc.title.toLowerCase().includes(searchQuery.toLowerCase()) || doc.id.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleGenerate = async () => {
    setIsGenerating(true);
    setGenerationProgress(15);

    const timer1 = setTimeout(() => setGenerationProgress(55), 400);
    const timer2 = setTimeout(() => setGenerationProgress(90), 900);

    const purpose = selectedPurpose === 'Boshqa' ? customPurpose : selectedPurpose;

    setTimeout(async () => {
      setGenerationProgress(100);
      const newDoc = await createStudentReference(purpose);
      setIsGenerating(false);
      setGenerationProgress(0);
      setPreviewDoc(newDoc.generatedDoc);
    }, 1400);
  };

  return (
    <div className="space-y-5 sm:space-y-8">
      
      {/* Student Welcome Header with animated gradient */}
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 p-4 sm:p-8 text-white shadow-xl sm:shadow-2xl border border-blue-700/40">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="relative flex-shrink-0">
              <div className="w-13 h-13 sm:w-16 sm:h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-blue-300 shadow-inner">
                <GraduationCap className="w-7 h-7 sm:w-9 sm:h-9 animate-float" />
              </div>
              <img
                src="/samdu-logo.png"
                alt="SamDU"
                className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white p-0.5 object-contain absolute -bottom-1 -right-1 border border-slate-700 shadow"
              />
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <h2 className="text-lg sm:text-2xl font-extrabold tracking-tight truncate">{currentUser.name}</h2>
                <span className="bg-emerald-500/20 text-emerald-300 text-[10px] sm:text-xs px-2 py-0.5 rounded-full font-semibold border border-emerald-500/30">
                  SamDU • HEMIS Faol
                </span>
              </div>
              <p className="text-[11px] sm:text-sm text-blue-200/80 mt-1 line-clamp-2 sm:line-clamp-none">
                Samarqand Davlat Universiteti • {currentUser.faculty} • {currentUser.department} • ID: {currentUser.studentId}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3 bg-white/10 backdrop-blur-md px-3 sm:px-4 py-2.5 sm:py-3 rounded-2xl border border-white/15 shadow-sm">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 flex-shrink-0 animate-pulse" />
            <div className="text-xs">
              <span className="font-bold text-white block">No-Touch Xizmat:</span>
              <span className="text-blue-200 text-[11px] sm:text-xs">Dekanatga bormasdan 3 soniyada rasmiy QR-hujjat oling.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Action Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8">
        
        {/* Instant Document Request Generator (8 cols) */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5 sm:space-y-6 transition">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0">
                <FileCheck className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">Avtomatlashtirilgan QR-Ma’lumotnoma Olish</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Hech qanday navbatlarsiz, HEMIS orqali yuridik kuchga ega PDF yaratiladi.</p>
              </div>
            </div>
            <span className="text-xs bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-bold px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800 self-start sm:self-auto flex-shrink-0">
              ⚡ 3 Soniya
            </span>
          </div>

          <div className="space-y-4 pt-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Ma’lumotnoma talab qilinadigan maqsad:
              </label>
              <select
                value={selectedPurpose}
                onChange={(e) => setSelectedPurpose(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 text-sm focus:ring-2 focus:ring-blue-500 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white transition"
              >
                <option value="Mudofaa ishlari bo‘limiga (Harbiy hisob)">Mudofaa ishlari bo‘limiga (Harbiy hisob)</option>
                <option value="Yashash joyidagi mahalliy hokimlik yoki mahalla qo‘mitasiga">Mahalliy hokimlik yoki mahalla qo‘mitasiga</option>
                <option value="Tijorat bankiga (Ta’lim krediti yoki karta ochish uchun)">Tijorat bankiga (Kredit yoki karta ochish)</option>
                <option value="Ota-onaning ish joyiga (Daromad solig‘i imtiyozi uchun)">Ota-onaning ish joyiga (Solik imtiyozi)</option>
                <option value="Boshqa">Boshqa maqsad (qo‘lda kiritish)...</option>
              </select>
            </div>

            {selectedPurpose === 'Boshqa' && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Aniq maqsadni yozing:
                </label>
                <input
                  type="text"
                  placeholder="Masalan: Tashqi ishlar vazirligi viza bo‘limiga..."
                  value={customPurpose}
                  onChange={(e) => setCustomPurpose(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-sm focus:ring-2 focus:ring-blue-500 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>
            )}

            {/* Simulated Progress Bar */}
            {isGenerating && (
              <div className="space-y-2 py-2">
                <div className="flex justify-between text-xs text-blue-600 dark:text-blue-400 font-semibold">
                  <span>HEMIS tekshiruvdan o‘tmoqda va E-MUHR bosilmoqda...</span>
                  <span>{generationProgress}%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-600 to-emerald-500 transition-all duration-300"
                    style={{ width: `${generationProgress}%` }}
                  />
                </div>
              </div>
            )}

            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-800 text-white font-bold rounded-2xl text-sm shadow-xl shadow-blue-600/30 flex items-center justify-center gap-2 transition disabled:opacity-50 cursor-pointer"
            >
              {isGenerating ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Kriptografik Blank Yaratilmoqda...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 text-amber-300" />
                  <span>1-Bosishda QR-Ma’lumotnoma Shakllantirish (No-Touch)</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Quick Services Sidebar (4 cols) */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Boshqa Avtomatlashtirilgan Xizmatlar
          </h4>

          <div className="space-y-3">
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 hover:border-blue-500 transition cursor-pointer group">
              <div className="flex items-center justify-between text-xs font-bold text-slate-900 dark:text-white mb-1">
                <span>To‘lov-shartnoma yuklab olish</span>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full font-mono">Faol</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">2026/2027 o‘quv yili uchun rasmiy to‘lov-shartnoma.</p>
            </div>

            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 hover:border-blue-500 transition cursor-pointer group">
              <div className="flex items-center justify-between text-xs font-bold text-slate-900 dark:text-white mb-1">
                <span>Akademik transkript (GPA)</span>
                <span className="text-[10px] text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded-full font-mono">Sync</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Barcha semestrlar baholari va kredit-modul transkripti.</p>
            </div>

            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 hover:border-blue-500 transition cursor-pointer group">
              <div className="flex items-center justify-between text-xs font-bold text-slate-900 dark:text-white mb-1">
                <span>Talabalar turar joyiga ariza</span>
                <span className="text-[10px] text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/60 px-2 py-0.5 rounded-full font-mono">Onlayn</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Yotoqxona uchun ijtimoiy toifa tekshiruvi orqali.</p>
            </div>
          </div>
        </div>

      </div>

      {/* Student's Document History */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 sm:space-y-5 transition">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">Mening Hujjatlarim va Arizalarim</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Barcha avtomatik berilgan ma’lumotnomalar va arizalar arxivi</p>
          </div>
          <span className="text-xs font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full self-start sm:self-auto">
            Jami: {studentDocs.length} ta
          </span>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {studentDocs.map((doc) => (
            <div key={doc.id} className="py-3.5 sm:py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
              <div className="flex items-start gap-3 min-w-0">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                    <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">{doc.title}</span>
                    <span className="text-[10px] sm:text-[11px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded">
                      {doc.generatedDoc?.docNumber || doc.id}
                    </span>
                  </div>
                  <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 mt-0.5 truncate">
                    Maqsad: {doc.formData.purpose || 'Umumiy'} • Sana: {doc.createdAt}
                  </p>
                  <div className="flex items-center gap-1.5 mt-1 text-[11px] text-emerald-700 dark:text-emerald-400 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                    <span className="truncate">Inson omilisiz avtomatik rasmiylashtirildi (QR-kod faol)</span>
                  </div>
                </div>
              </div>

              {doc.generatedDoc && (
                <div className="flex items-center gap-2 w-full sm:w-auto pt-1 sm:pt-0">
                  <button
                    onClick={() => setPreviewDoc(doc.generatedDoc)}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 sm:px-4 py-2 bg-slate-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-500 text-white rounded-xl text-xs font-semibold transition cursor-pointer shadow-md"
                  >
                    <QrCode className="w-4 h-4 text-emerald-400" />
                    <span>QR Hujjatni Ko‘rish</span>
                  </button>
                  <a
                    href={doc.generatedDoc.verifyUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl text-slate-600 dark:text-slate-300 transition flex-shrink-0"
                    title="Ommaviy tekshiruv sahifasi"
                  >
                    <Download className="w-4 h-4" />
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Modal viewer for generated QR official document */}
      {previewDoc && (
        <OfficialDocumentModal
          doc={previewDoc}
          onClose={() => setPreviewDoc(null)}
        />
      )}

    </div>
  );
}
