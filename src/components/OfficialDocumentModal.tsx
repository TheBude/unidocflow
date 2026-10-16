'use client';

import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { GeneratedDoc } from '@/lib/types';
import { X, Printer, ShieldCheck, ExternalLink, CheckCircle, Award } from 'lucide-react';

interface Props {
  doc: GeneratedDoc;
  onClose: () => void;
}

export function OfficialDocumentModal({ doc, onClose }: Props) {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');

  useEffect(() => {
    // Generate QR code data URL pointing to verify URL
    const fullVerifyUrl = typeof window !== 'undefined' 
      ? `${window.location.origin}${doc.verifyUrl}`
      : doc.verifyUrl;

    QRCode.toDataURL(fullVerifyUrl, {
      width: 140,
      margin: 1,
      color: {
        dark: '#0f172a',
        light: '#ffffff'
      }
    }).then(setQrDataUrl).catch(console.error);
  }, [doc]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/75 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white text-slate-900 rounded-2xl shadow-2xl overflow-hidden my-2 sm:my-8 border border-slate-200">
        
        {/* Top Action Bar (hidden when printing) */}
        <div className="flex items-center justify-between px-3 sm:px-6 py-2.5 sm:py-3.5 bg-slate-900 text-white print:hidden gap-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold min-w-0">
            <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span className="truncate text-[11px] sm:text-xs">Rasmiy Blank (E-MUHR)</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-medium transition cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Chop / PDF</span>
            </button>
            <a
              href={doc.verifyUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 px-2 sm:px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium transition"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Tekshirish</span>
            </a>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Official Document Body (Printable) */}
        <div className="p-4 sm:p-8 md:p-12 font-serif text-slate-800 leading-relaxed bg-white">
          
          {/* Header with SamDU Official Logo */}
          <div className="text-center pb-4 sm:pb-6 border-b-2 border-slate-900 mb-4 sm:mb-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-2 flex items-center justify-center">
              <img
                src="/samdu-logo.png"
                alt="SamDU Logotipi"
                className="w-full h-full object-contain"
              />
            </div>
            <h1 className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-700 font-sans">
              O‘zbekiston Respublikasi Oliy Ta’lim, Fan va Innovatsiyalar Vazirligi
            </h1>
            <h2 className="text-sm sm:text-base font-extrabold uppercase tracking-wider text-blue-950 mt-1 font-serif">
              Sharof Rashidov nomidagi Samarqand Davlat Universiteti
            </h2>
            <div className="text-[10px] sm:text-[11px] font-sans text-slate-500 mt-1">
              Samarqand shahri, Universitet xiyoboni, 15-uy • Tel: +998 66 239-11-40 • devonxona@samdu.uz • samdu.uz
            </div>
          </div>

          {/* Document Meta Row */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1.5 sm:gap-0 text-xs font-sans text-slate-600 mb-6 sm:mb-8 border-b border-slate-200 pb-3">
            <div>
              <span className="font-semibold text-slate-800">Hujjat raqami: </span>
              <span className="font-mono bg-slate-100 px-2 py-0.5 rounded text-blue-800 font-bold">{doc.docNumber}</span>
            </div>
            <div>
              <span className="font-semibold text-slate-800">Berilgan sana: </span>
              <span>{doc.issuedDate} yil</span>
            </div>
          </div>

          {/* Title */}
          <div className="text-center my-4 sm:my-6">
            <h3 className="text-base sm:text-lg font-bold uppercase tracking-wide text-slate-900 underline decoration-slate-300 underline-offset-8">
              {doc.title}
            </h3>
          </div>

          {/* Content */}
          <div className="my-6 sm:my-8 text-xs sm:text-sm leading-relaxed text-slate-800 text-justify indent-6 sm:indent-8">
            {doc.content}
          </div>

          {/* Security & Verification Box */}
          <div className="mt-8 sm:mt-12 pt-4 sm:pt-6 border-t border-slate-300 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 bg-slate-50 p-3.5 sm:p-4 rounded-xl border">
            
            {/* Signature Info */}
            <div className="flex-1 space-y-1.5 font-sans">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <span className="text-xs font-bold text-slate-900">Elektron Raqamli Imzo Bilan Tasdiqlangan</span>
              </div>
              <div className="text-xs text-slate-700">
                <span className="font-medium">Mas’ul: </span>{doc.signerName} ({doc.signerRole})
              </div>
              <div className="text-[10px] text-slate-500 font-mono break-all">
                <span className="font-semibold">SHA-256 Hash: </span>{doc.digitalSignatureHash}
              </div>
              <div className="text-[10px] text-slate-500">
                Ushbu hujjat "Elektron hujjat aylanmasi to‘g‘risida"gi O‘zbekiston Respublikasi Qonuniga muvofiq qog‘oz nusxa bilan teng yuridik kuchga ega hamda SamDU Yagona Reyestrida qayd etilgan.
              </div>
            </div>

            {/* QR Code Container */}
            <div className="text-center flex-shrink-0">
              {qrDataUrl ? (
                <img
                  src={qrDataUrl}
                  alt="QR Verifikatsiya"
                  className="w-24 h-24 mx-auto border border-slate-300 rounded-lg p-1 bg-white shadow-sm"
                />
              ) : (
                <div className="w-24 h-24 bg-slate-200 animate-pulse rounded-lg" />
              )}
              <div className="text-[10px] font-sans font-medium text-slate-600 mt-1">
                Skanerlab tekshiring
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
