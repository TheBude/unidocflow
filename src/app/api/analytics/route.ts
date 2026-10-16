import { NextResponse } from 'next/server';
import { UNIVERSITY_ANALYTICS } from '@/lib/mockData';

// GET /api/analytics - Universitet byurokratiyasi va tejalgan resurslar tahlili
export async function GET() {
  return NextResponse.json({
    success: true,
    university: 'Sharof Rashidov nomidagi Samarqand davlat universiteti (SamDU)',
    metrics: UNIVERSITY_ANALYTICS,
    systemStatus: 'ONLINE_ACTIVE',
    hemisIntegrationStatus: 'CONNECTED'
  });
}
