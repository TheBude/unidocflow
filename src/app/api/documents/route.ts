import { NextResponse } from 'next/server';
import { INITIAL_DOCUMENTS } from '@/lib/mockData';

// Sanitization function against XSS and injection
function sanitizeString(input: unknown, maxLength = 300): string {
  if (typeof input !== 'string') return '';
  return input
    .replace(/[<>'"&]/g, (char) => {
      switch (char) {
        case '<': return '&lt;';
        case '>': return '&gt;';
        case '"': return '&quot;';
        case "'": return '&#39;';
        case '&': return '&amp;';
        default: return char;
      }
    })
    .trim()
    .slice(0, maxLength);
}

// Whitelist of valid document types
const ALLOWED_DOC_TYPES = ['STUDENT_REFERENCE', 'LEAVE_REQUEST', 'JOB_APPLICATION'];

// GET /api/documents - Barcha arizalar va buyruqlar ro'yxati (Sanitized and Read-Only)
export async function GET() {
  return NextResponse.json({
    success: true,
    count: INITIAL_DOCUMENTS.length,
    data: INITIAL_DOCUMENTS,
    timestamp: new Date().toISOString()
  });
}

// POST /api/documents - Yangi elektron ariza topshirish (Validatsiyalangan va himoyalangan)
export async function POST(request: Request) {
  try {
    const rawBody = await request.json();

    // 1. Check for Prototype Pollution attempts
    const hasPollution = typeof rawBody === 'object' && rawBody !== null && (
      Object.prototype.hasOwnProperty.call(rawBody, '__proto__') ||
      Object.prototype.hasOwnProperty.call(rawBody, 'constructor') ||
      Object.prototype.hasOwnProperty.call(rawBody, 'prototype')
    );
    if (hasPollution) {
      return NextResponse.json({
        success: false,
        error: 'Xavfsizlik qoidasi buzildi: Noto‘g‘ri obyekt strukturasi (Prototype Pollution attempt blocked).'
      }, { status: 400 });
    }

    // 2. Validate Document Type against whitelist
    const docType = typeof rawBody.type === 'string' ? rawBody.type.toUpperCase() : '';
    if (!ALLOWED_DOC_TYPES.includes(docType)) {
      return NextResponse.json({
        success: false,
        error: `Ruxsat etilmagan hujjat turi. Faqat: ${ALLOWED_DOC_TYPES.join(', ')} qabul qilinadi.`
      }, { status: 422 });
    }

    // 3. Sanitize input strings to neutralize any XSS payloads
    const title = sanitizeString(rawBody.title, 150) || 'Rasmiy Elektron Ariza';
    const applicantName = sanitizeString(rawBody.applicantName, 100);
    const applicantRole = sanitizeString(rawBody.applicantRole, 50);
    const department = sanitizeString(rawBody.department, 150);
    const faculty = sanitizeString(rawBody.faculty, 150);

    if (!applicantName || applicantName.length < 3) {
      return NextResponse.json({
        success: false,
        error: 'Ariza beruvchi ismi to‘liq kiritilishi shart (kamida 3 belgi).'
      }, { status: 422 });
    }

    const newDocId = `DOC-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const sanitizedDocument = {
      id: newDocId,
      type: docType,
      title,
      applicantName,
      applicantRole: applicantRole || 'STUDENT',
      department: department || 'SamDU',
      faculty: faculty || 'SamDU',
      status: 'IN_REVIEW',
      formData: typeof rawBody.formData === 'object' && rawBody.formData !== null 
        ? Object.fromEntries(
            Object.entries(rawBody.formData).map(([k, v]) => [
              sanitizeString(k, 50),
              typeof v === 'string' ? sanitizeString(v, 300) : v
            ])
          )
        : {},
      createdAt: new Date().toISOString()
    };

    return NextResponse.json({
      success: true,
      message: 'Ariza xavfsizlik tekshiruvidan muvaffaqiyatli o‘tdi va elektron kelishuvga yuborildi',
      documentId: newDocId,
      data: sanitizedDocument
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Noto‘g‘ri JSON formati yoki so‘rov parametri.'
    }, { status: 400 });
  }
}
