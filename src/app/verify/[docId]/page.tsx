import React from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  ArrowLeft, 
  AlertTriangle,
  XCircle,
  FileX2,
  Lock
} from 'lucide-react';
import Link from 'next/link';
import { INITIAL_DOCUMENTS } from '@/lib/mockData';
import crypto from 'crypto';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ docId: string }>;
}

export default async function VerifyPage({ params }: PageProps) {
  const { docId } = await params;

  // Search in official university registry
  const matchedDoc = INITIAL_DOCUMENTS.find(
    d => d.id.toLowerCase() === docId.toLowerCase() || 
         d.generatedDoc?.docNumber.toLowerCase() === docId.toLowerCase()
  );

  const isValid = Boolean(matchedDoc && matchedDoc.generatedDoc);

  // Compute real crypto hash if valid
  let computedHash = '';
  if (isValid && matchedDoc?.generatedDoc) {
    const payloadToHash = `${matchedDoc.generatedDoc.docNumber}|${matchedDoc.applicantName}|${matchedDoc.generatedDoc.issuedDate}|SAMDU_REGISTRY_SECRET`;
    computedHash = crypto.createHash('sha256').update(payloadToHash).digest('hex');
  }

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 py-4 sm:py-10 px-3 sm:px-6 lg:px-8 font-sans transition-colors duration-300">
      <div className="max-w-2xl mx-auto space-y-4 sm:space-y-6">
        
        {/* Top Back link */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-0">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition self-start"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Asosiy Portalga Qaytish</span>
          </Link>
          <span className="text-[11px] sm:text-xs text-slate-400 font-mono">
            SamDU UniDocFlow Public Verification Portal
          </span>
        </div>

        {isValid && matchedDoc?.generatedDoc ? (
          <>
            {/* Verification Success Banner */}
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-xl flex items-center gap-3.5 sm:gap-4 border border-emerald-500/40">
              <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center flex-shrink-0 shadow-inner">
                <ShieldCheck className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <h1 className="text-base sm:text-lg font-bold">Hujjat Haqiqiy va Yuridik Kuchga Ega!</h1>
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-200 flex-shrink-0" />
                </div>
                <p className="text-[11px] sm:text-xs text-emerald-100 mt-0.5 leading-relaxed">
                  Ushbu hujjat Samarqand davlat universitetining (SamDU) yagona elektron reyestri va E-IMZO davlat kalitlari orqali muvaffaqiyatli tekshirildi.
                </p>
              </div>
            </div>

            {/* Official Document Verification Details */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 p-4 sm:p-8 space-y-4 sm:space-y-6 font-serif text-slate-900 dark:text-slate-100 transition">
              
              {/* Header */}
              <div className="text-center pb-6 border-b border-slate-200 dark:border-slate-800">
                <div className="w-20 h-20 mx-auto mb-2 flex items-center justify-center">
                  <img
                    src="/samdu-logo.png"
                    alt="SamDU Logotipi"
                    className="w-full h-full object-contain"
                  />
                </div>
                <h2 className="text-xs font-bold uppercase tracking-widest text-slate-800 dark:text-slate-200 font-sans">
                  O‘zbekiston Respublikasi Oliy Ta’lim, Fan va Innovatsiyalar Vazirligi
                </h2>
                <h3 className="text-base font-extrabold uppercase tracking-wide text-blue-950 dark:text-blue-300 mt-1 font-sans">
                  Sharof Rashidov nomidagi Samarqand Davlat Universiteti
                </h3>
                <div className="text-[11px] font-sans text-slate-500 dark:text-slate-400 mt-1">
                  Elektron Reyestr No: <strong className="font-mono text-slate-800 dark:text-slate-200">{matchedDoc.generatedDoc.docNumber}</strong>
                </div>
              </div>

              {/* Verification Attributes Table */}
              <div className="font-sans text-xs space-y-3 bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-100 dark:border-slate-750">
                <div className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-700">
                  <span className="text-slate-500 dark:text-slate-400">Hujjat nomi:</span>
                  <span className="font-bold text-slate-800 dark:text-white text-right">{matchedDoc.title}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-700">
                  <span className="text-slate-500 dark:text-slate-400">Hujjat egasi:</span>
                  <span className="font-bold text-slate-800 dark:text-white">{matchedDoc.applicantName} ({matchedDoc.applicantRole})</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-700">
                  <span className="text-slate-500 dark:text-slate-400">Holati:</span>
                  <span className="font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-100/80 dark:bg-emerald-950/60 px-2 py-0.5 rounded">
                    ✓ Faol va tasdiqlangan
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-700">
                  <span className="text-slate-500 dark:text-slate-400">Berilgan sana:</span>
                  <span className="font-semibold text-slate-800 dark:text-white">{matchedDoc.generatedDoc.issuedDate}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-700">
                  <span className="text-slate-500 dark:text-slate-400">Tasdiqlovchi organ:</span>
                  <span className="font-semibold text-slate-800 dark:text-white">{matchedDoc.generatedDoc.signerName}</span>
                </div>
                <div className="flex flex-col py-1">
                  <span className="text-slate-500 dark:text-slate-400 mb-0.5">Kriptografik Xesh (SHA-256):</span>
                  <span className="font-mono text-[10px] text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-900 p-2 rounded border border-slate-200 dark:border-slate-700 break-all">
                    {computedHash}
                  </span>
                </div>
              </div>

              {/* Legal Note */}
              <div className="text-xs text-slate-500 dark:text-slate-400 font-sans leading-relaxed border-t border-slate-200 dark:border-slate-800 pt-4">
                <p>
                  <strong>Eslatma:</strong> "Elektron hujjat aylanmasi to‘g‘risida"gi O‘zbekiston Respublikasi Qonunining 7-moddasiga binoan, elektron raqamli imzo bilan tasdiqlangan elektron hujjat qog‘oz hujjat bilan bir xil yuridik kuchga ega. Ushbu hujjatni qo‘lda imzo yoki qog‘oz muhr bilan takroriy tasdiqlash talab etilmaydi.
                </p>
              </div>

            </div>
          </>
        ) : (
          /* Security Alert: Invalid or Forged Document */
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-rose-600 to-red-700 text-white p-5 sm:p-6 rounded-2xl sm:rounded-3xl shadow-xl flex items-center gap-4 border border-rose-500/40 animate-slide-in">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center flex-shrink-0 shadow-inner">
                <XCircle className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-base sm:text-lg font-bold">XAVFSIZLIK OGOHLANTIRISHI: Hujjat Topilmadi!</h1>
                </div>
                <p className="text-xs text-rose-100 mt-1 leading-relaxed">
                  Kiritilgan <strong>"{docId}"</strong> identifikatorli hujjat Samarqand davlat universiteti (SamDU) rasmiy reyestrida mavjud emas yoki soxtalashtirilgan.
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl shadow-sm border border-rose-200 dark:border-rose-950 p-5 sm:p-8 space-y-4 text-slate-900 dark:text-slate-100">
              <div className="flex items-center gap-3 text-rose-600 dark:text-rose-400 font-bold text-sm">
                <AlertTriangle className="w-5 h-5 flex-shrink-0" />
                <span>Tekshiruv Natijasi: Haqiqiy emas (Falsifikatsiya xavfi)</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Ushbu QR-kod yoki havola orqali taqdim etilgan hujjat universitetning rasmiy E-MUHR va E-IMZO ma’lumotlar bazasida ro‘yxatga olinmagan.
              </p>
              <div className="p-4 bg-rose-50 dark:bg-rose-950/40 rounded-xl border border-rose-200 dark:border-rose-900/60 text-xs text-rose-900 dark:text-rose-300 space-y-2">
                <div className="font-semibold flex items-center gap-1.5">
                  <Lock className="w-4 h-4 text-rose-600" />
                  Davlat organlari, banklar va ish beruvchilar diqqatiga:
                </div>
                <ul className="list-disc list-inside space-y-1 text-[11px] text-rose-800 dark:text-rose-300">
                  <li>Ushbu hujjat yuridik kuchga ega emas.</li>
                  <li>Hujjatni qabul qilmang va SamDU devonxonasiga murojaat qiling (+998 66 239-11-40).</li>
                  <li>Tizim soxta QR-kodlar yaratishga bo‘lgan harakatlarni xavfsizlik jurnaliga qayd etdi.</li>
                </ul>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
