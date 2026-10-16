import { NextResponse } from 'next/server';
import { INITIAL_DOCUMENTS } from '@/lib/mockData';
import crypto from 'crypto';

interface Params {
  params: Promise<{ docId: string }>;
}

// GET /api/verify/[docId] - Davlat, tashkilot va banklar uchun rasmiy API tekshiruvi (Anti-Spoofing himoyasi)
export async function GET(request: Request, { params }: Params) {
  const { docId } = await params;

  // Search in official documents registry
  const matchedDoc = INITIAL_DOCUMENTS.find(
    d => d.id.toLowerCase() === docId.toLowerCase() || 
         d.generatedDoc?.docNumber.toLowerCase() === docId.toLowerCase()
  );

  // If document does not exist in registry -> return 404 with security alert
  if (!matchedDoc || !matchedDoc.generatedDoc) {
    return NextResponse.json({
      valid: false,
      error: 'DIQQAT: Ushbu hujjat Samarqand davlat universiteti (SamDU) elektron reyestridan topilmadi yoki soxtalashtirilgan!',
      documentId: docId,
      status: 'INVALID_OR_NOT_FOUND',
      checkedAt: new Date().toISOString(),
      securityNotice: 'Hujjat elektron imzo va maxsus QR-kod bilan tasdiqlanmagan.'
    }, { 
      status: 404,
      headers: {
        'X-Verification-Result': 'INVALID_SPOOFED'
      }
    });
  }

  // Calculate real cryptographic SHA-256 integrity hash
  const payloadToHash = `${matchedDoc.generatedDoc.docNumber}|${matchedDoc.applicantName}|${matchedDoc.generatedDoc.issuedDate}|SAMDU_REGISTRY_SECRET`;
  const computedHash = crypto.createHash('sha256').update(payloadToHash).digest('hex');

  return NextResponse.json({
    valid: true,
    documentId: matchedDoc.generatedDoc.docNumber,
    systemId: matchedDoc.id,
    title: matchedDoc.title,
    applicantName: matchedDoc.applicantName,
    applicantRole: matchedDoc.applicantRole,
    institution: 'Sharof Rashidov nomidagi Samarqand davlat universiteti (SamDU)',
    type: 'Official University Electronic Document',
    issuedDate: matchedDoc.generatedDoc.issuedDate,
    status: 'ACTIVE_AND_VERIFIED',
    digitalSeal: {
      provider: 'SamDU UniDocFlow E-MUHR Registry',
      signerName: matchedDoc.generatedDoc.signerName,
      signerRole: matchedDoc.generatedDoc.signerRole,
      sha256Hash: computedHash,
      legalBasis: 'O‘zbekiston Respublikasi "Elektron hujjat aylanmasi to‘g‘risida"gi Qonuni 7-moddasi'
    },
    checkedAt: new Date().toISOString()
  });
}
