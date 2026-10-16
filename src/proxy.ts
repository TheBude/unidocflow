import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// In-memory sliding window rate limiter
const ipRequestCounts = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 60; // 60 requests / minute

// Suspicious URL patterns that attackers and automated scanners look for
const SUSPICIOUS_PATTERNS = [
  /\.\./,             // Directory traversal (..)
  /%2e%2e/i,         // Encoded directory traversal
  /\.env/i,           // Environment files
  /\.git/i,           // Git repository disclosure
  /wp-admin|wp-login/i, // WordPress bots
  /<script/i,         // Basic reflected XSS probe in URL
  /union.*select/i,   // SQL injection probe in URL
];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Block malicious and suspicious request patterns (WAF probe filter)
  for (const pattern of SUSPICIOUS_PATTERNS) {
    if (pattern.test(pathname) || pattern.test(request.nextUrl.search)) {
      return new NextResponse(
        JSON.stringify({
          error: 'Security Alert: Xavfli yoki ruxsat etilmagan so‘rov bloklandi.',
          reason: 'WAF Rule Triggered',
          timestamp: new Date().toISOString(),
        }),
        {
          status: 403,
          headers: {
            'Content-Type': 'application/json',
            'X-Security-Action': 'BLOCKED_BY_WAF',
          },
        }
      );
    }
  }

  // 2. Rate Limiting for API routes
  if (pathname.startsWith('/api/')) {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() || '127.0.0.1';
    const now = Date.now();
    const clientLimit = ipRequestCounts.get(ip);

    if (!clientLimit || now > clientLimit.resetTime) {
      ipRequestCounts.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    } else {
      clientLimit.count += 1;
      if (clientLimit.count > MAX_REQUESTS_PER_WINDOW) {
        return new NextResponse(
          JSON.stringify({
            error: 'Ko‘p miqdorda so‘rov yuborildi (Rate Limit Exceeded). Iltimos, 1 daqiqadan so‘ng qayta urinib ko‘ring.',
            status: 429,
            retryAfterSeconds: Math.ceil((clientLimit.resetTime - now) / 1000),
          }),
          {
            status: 429,
            headers: {
              'Content-Type': 'application/json',
              'Retry-After': '60',
              'X-RateLimit-Limit': String(MAX_REQUESTS_PER_WINDOW),
              'X-RateLimit-Remaining': '0',
            },
          }
        );
      }
    }
  }

  // 3. Attach security context headers
  const response = NextResponse.next();
  response.headers.set('X-Security-Policy', 'SamDU-UniDocFlow-Shield-Active');
  response.headers.set('X-Content-Type-Options', 'nosniff');

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, samdu-logo.png
     */
    '/((?!_next/static|_next/image|favicon.ico|samdu-logo.png).*)',
  ],
};
