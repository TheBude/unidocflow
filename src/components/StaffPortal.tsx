'use client';

import React, { useState } from 'react';
import { useDocumentContext } from '@/lib/DocumentContext';
import { 
  Briefcase, 
  Send, 
  Calendar, 
  FileText, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  ChevronRight,
  ShieldAlert,
  UserPlus,
  ShieldCheck,
  Award,
  Sparkles
} from 'lucide-react';
import { OfficialDocumentModal } from './OfficialDocumentModal';

export function StaffPortal() {
  const { currentUser, documents, createLeaveRequest, createJobApplication, searchQuery } = useDocumentContext();

  // Active Tab: LEAVE or JOB
  const [formTab, setFormTab] = useState<'LEAVE' | 'JOB'>('LEAVE');

  // Leave Form
  const [startDate, setStartDate] = useState('2026-11-01');
  const [endDate, setEndDate] = useState('2026-11-24');
  const [daysCount, setDaysCount] = useState(24);
  const [reason, setReason] = useState('2025/2026 o‘quv yili mehnat ta’tillari reja-jadvaliga asosan yillik asosiy mehnat ta’tili berishingizni so‘rayman.');

  // Job Onboarding Form
  const [jobPosition, setJobPosition] = useState('Dasturiy Injiniring Kafedrasi Assistenti');
  const [jobRate, setJobRate] = useState('1.0 (Asosiy shtat)');
  const [jobFaculty, setJobFaculty] = useState('Kompyuter Injiniringi Fakulteti');
  const [jobDepartment, setJobDepartment] = useState('Dasturiy Ta’minot Kafedrasi');
  const [jobEducation, setJobEducation] = useState('Magistr (SamDU, 2024-yil diplomi)');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewDoc, setPreviewDoc] = useState<any>(null);

  const staffDocs = documents
    .filter(doc => doc.applicantId === currentUser.id)
    .filter(doc => !searchQuery || doc.title.toLowerCase().includes(searchQuery.toLowerCase()) || doc.id.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleLeaveSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await createLeaveRequest(startDate, endDate, daysCount, reason);
    setIsSubmitting(false);
  };

  const handleJobSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await createJobApplication(jobPosition, jobFaculty, jobDepartment, jobRate, jobEducation);
    setIsSubmitting(false);
  };

  return (
    <div className="space-y-5 sm:space-y-8">
      
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-4 sm:p-8 text-white shadow-xl sm:shadow-2xl border border-indigo-900/40">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="relative flex-shrink-0">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-13 h-13 sm:w-16 sm:h-16 rounded-2xl object-cover border-2 border-indigo-400/50 shadow-md"
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
                <span className="bg-indigo-500/20 text-indigo-300 text-[10px] sm:text-xs px-2 py-0.5 rounded-full font-semibold border border-indigo-500/30">
                  {currentUser.roleTitle}
                </span>
              </div>
              <p className="text-[11px] sm:text-sm text-slate-300 mt-1 line-clamp-2 sm:line-clamp-none">
                SamDU • {currentUser.department} • {currentUser.faculty}
              </p>
            </div>
          </div>

          <div className="bg-white/10 dark:bg-slate-800/80 backdrop-blur-md px-3 sm:px-4 py-2.5 sm:py-3 rounded-2xl border border-white/10 dark:border-slate-700 text-xs space-y-1">
            <div className="text-indigo-300 font-semibold uppercase tracking-wider text-[11px] sm:text-xs">Avtomatlashtirilgan Marshrut:</div>
            <div className="text-slate-200 text-[11px] sm:text-xs">
              Ariza topshirilgach, avtomatik Dekanat ➔ Kadrlar (HR) ➔ Rektoratga parallel uzatiladi.
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8">
        
        {/* Left Form: Choice of Applications (5 cols) */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5 sm:space-y-6">
          
          {/* Tab Selector */}
          <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setFormTab('LEAVE')}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5 ${
                formTab === 'LEAVE'
                  ? 'bg-white dark:bg-indigo-600 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Ta’til Arizasi</span>
            </button>
            <button
              onClick={() => setFormTab('JOB')}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5 ${
                formTab === 'JOB'
                  ? 'bg-white dark:bg-indigo-600 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Ishga Qabul (Onboarding)</span>
            </button>
          </div>

          {/* Form 1: Leave Request */}
          {formTab === 'LEAVE' ? (
            <form onSubmit={handleLeaveSubmit} className="space-y-4">
              <div className="flex items-center gap-3 pb-2 border-b border-slate-100 dark:border-slate-800">
                <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                  <Briefcase className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm">Mehnat Ta’tili Uchun Ariza</h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Elektron kelishuv zanjiriga uzatiladi</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Boshlanish sanasi:
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-sm focus:ring-2 focus:ring-indigo-500 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Tugash sanasi:
                  </label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-sm focus:ring-2 focus:ring-indigo-500 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Ta’til muddati (kalendar kun):
                </label>
                <input
                  type="number"
                  value={daysCount}
                  onChange={(e) => setDaysCount(Number(e.target.value))}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-sm focus:ring-2 focus:ring-indigo-500 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  min={1}
                  max={48}
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Ariza sababi / Izoh:
                </label>
                <textarea
                  rows={3}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-sm focus:ring-2 focus:ring-indigo-500 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  required
                />
              </div>

              <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-200 dark:border-amber-800/60 text-[11px] text-amber-800 dark:text-amber-300 flex items-start gap-2">
                <ShieldAlert className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                <span>
                  Kafedra mudiri va Dekanatga 24 soatlik SLA muddati bilan yetkaziladi.
                </span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl text-sm shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Ta’til Arizasini Yuborish</span>
              </button>
            </form>
          ) : (
            /* Form 2: New Hire Job Application */
            <form onSubmit={handleJobSubmit} className="space-y-4">
              <div className="flex items-center gap-3 pb-2 border-b border-slate-100 dark:border-slate-800">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <UserPlus className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm">Ishga Qabul Qilish (Onboarding)</h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">OneID & Diplom avtomatik sinxronlashadi</p>
                </div>
              </div>

              {/* Pre-verified OneID badge */}
              <div className="p-3 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 space-y-1 text-xs">
                <div className="flex items-center justify-between text-emerald-900 dark:text-emerald-300 font-bold">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    OneID & Diplom Tekshirildi
                  </span>
                  <span className="text-[10px] bg-emerald-200 dark:bg-emerald-900/80 px-2 py-0.5 rounded font-mono">my.gov.uz</span>
                </div>
                <div className="text-[11px] text-emerald-800 dark:text-emerald-400">
                  Pasport va oliy ma’lumot diplomi davlat bazasidan tortib olindi. Qog‘oz nusxalar talab etilmaydi.
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Kafedra va Bo‘linma:
                </label>
                <input
                  type="text"
                  value={jobDepartment}
                  onChange={(e) => setJobDepartment(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-sm bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Lavozim:
                </label>
                <select
                  value={jobPosition}
                  onChange={(e) => setJobPosition(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-sm bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                >
                  <option value="Dasturiy Injiniring Kafedrasi Assistenti">Dasturiy Injiniring Kafedrasi Assistenti</option>
                  <option value="Katta O‘qituvchi (PhD)">Katta O‘qituvchi (PhD)</option>
                  <option value="Dotsent">Dotsent</option>
                  <option value="Kafedra Mudiri">Kafedra Mudiri</option>
                  <option value="O‘quv laboratoriyasi mudiri">O‘quv laboratoriyasi mudiri</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Stavka miqdori:
                  </label>
                  <select
                    value={jobRate}
                    onChange={(e) => setJobRate(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-sm bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    <option value="1.0 (Asosiy shtat)">1.0 (Asosiy shtat)</option>
                    <option value="0.5 (Ichki o‘rindoshlik)">0.5 (Ichki o‘rindoshlik)</option>
                    <option value="0.5 (Tashqi o‘rindoshlik)">0.5 (Tashqi o‘rindoshlik)</option>
                    <option value="0.25 (Soatbay)">0.25 (Soatbay)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Ma’lumoti:
                  </label>
                  <input
                    type="text"
                    value={jobEducation}
                    onChange={(e) => setJobEducation(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-sm bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                    required
                  />
                </div>
              </div>

              <div className="p-3 bg-blue-50 dark:bg-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-800/60 text-[11px] text-blue-800 dark:text-blue-300 flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <span>
                  Rektor E-IMZO bilan buyruq chiqargach, ma’lumotlar avtomatik <strong>my.mehnat.uz</strong> ga yuboriladi va elektron mehnat daftarchasi ochiladi.
                </span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl text-sm shadow-xl shadow-emerald-600/30 flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Ishga Qabul Qilish Arizasini Yuborish</span>
              </button>
            </form>
          )}

        </div>

        {/* Right: Active Applications and Workflow Tracking (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 dark:text-white text-base">Arizalar Harakati va Kelishuv Zanjiri</h3>
            <span className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-3 py-1 rounded-full font-medium">
              Jami: {staffDocs.length} ta ariza
            </span>
          </div>

          {staffDocs.length === 0 ? (
            <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 text-sm">
              Sizda hozircha arizalar mavjud emas. Chapdagi forma orqali ariza qoldiring.
            </div>
          ) : (
            <div className="space-y-4">
              {staffDocs.map((doc) => {
                const isApproved = doc.status === 'APPROVED';
                const isRejected = doc.status === 'REJECTED';

                return (
                  <div key={doc.id} className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 sm:space-y-5">
                    
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                      <div>
                        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                          <span className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">{doc.title}</span>
                          <span className="text-[10px] sm:text-xs font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded">
                            {doc.id}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                          Yuborilgan sana: {doc.createdAt} {doc.formData.rate ? `• Stavka: ${doc.formData.rate}` : ''}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        {isApproved && (
                          <span className="bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 border border-emerald-200 dark:border-emerald-800">
                            <CheckCircle className="w-3.5 h-3.5" />
                            To‘liq Tasdiqlangan
                          </span>
                        )}
                        {isRejected && (
                          <span className="bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 border border-rose-200 dark:border-rose-800">
                            <AlertCircle className="w-3.5 h-3.5" />
                            Rad etilgan
                          </span>
                        )}
                        {!isApproved && !isRejected && (
                          <span className="bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 border border-amber-200 dark:border-amber-800">
                            <Clock className="w-3.5 h-3.5 animate-spin" />
                            Kelishuv jarayonida
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Step-by-step Workflow Timeline */}
                    <div className="space-y-3">
                      <div className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                        Elektron Vizalar Zanjiri (Real-Vaqtda):
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {doc.workflow.map((step) => {
                          const isDone = step.status === 'APPROVED';
                          const isStepRejected = step.status === 'REJECTED';
                          const isPending = step.status === 'PENDING';

                          return (
                            <div
                              key={step.stepNumber}
                              className={`p-3.5 rounded-2xl border text-xs space-y-1.5 transition ${
                                isDone
                                  ? 'bg-emerald-50/70 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800/60 text-emerald-950 dark:text-emerald-200'
                                  : isStepRejected
                                  ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800/60 text-rose-950 dark:text-rose-200'
                                  : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-750 text-slate-700 dark:text-slate-300'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-bold text-[11px] text-slate-500 dark:text-slate-400">
                                  {step.stepNumber}-bosqich:
                                </span>
                                {isDone && <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />}
                                {isStepRejected && <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400" />}
                                {isPending && <Clock className="w-4 h-4 text-amber-500" />}
                              </div>

                              <div className="font-semibold text-xs leading-snug">
                                {step.roleName}
                              </div>

                              <div className="text-[11px] text-slate-600 dark:text-slate-400">
                                {isDone ? (
                                  <>
                                    <span className="text-emerald-700 dark:text-emerald-300 font-medium">✓ Imzoladi: </span>
                                    {step.approverName}
                                    <div className="text-[10px] text-slate-400 mt-0.5">{step.actionDate}</div>
                                  </>
                                ) : isPending ? (
                                  <span className="text-amber-600 dark:text-amber-400 font-medium">Kutilmoqda (SLA: 24h)</span>
                                ) : (
                                  <span className="text-rose-600 dark:text-rose-400 font-medium">Rad etildi</span>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Final Approved Document Card */}
                    {doc.generatedDoc && (
                      <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                        <span className="text-xs text-slate-600 dark:text-slate-400">
                          Rektorat buyrug‘i qabul qilindi va E-IMZO bilan ro‘yxatga olindi.
                        </span>
                        <button
                          onClick={() => setPreviewDoc(doc.generatedDoc)}
                          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold transition"
                        >
                          Buyruq / Tasdiq Blankini Ko‘rish
                        </button>
                      </div>
                    )}

                  </div>
                );
              })}
            </div>
          )}

        </div>

      </div>

      {previewDoc && (
        <OfficialDocumentModal
          doc={previewDoc}
          onClose={() => setPreviewDoc(null)}
        />
      )}

    </div>
  );
}
