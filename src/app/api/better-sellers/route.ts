import { getBetterSellers } from '@/services/sales/sales';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const startYear = searchParams.get('year');
  const startMonth = searchParams.get('month');
  const endYear = searchParams.get('endYear');
  const endMonth = searchParams.get('endMonth');

  const startYearNumber = startYear ? parseInt(startYear) : undefined;
  const startMonthNumber = startMonth ? parseInt(startMonth) : undefined;
  const endYearNumber = endYear ? parseInt(endYear) : undefined;
  const endMonthNumber = endMonth ? parseInt(endMonth) : undefined;

  try {
    const data = await getBetterSellers(
      startYearNumber,
      startMonthNumber,
      endYearNumber,
      endMonthNumber
    );
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching better sellers data:', error);
    return NextResponse.json(
      { message: 'Error fetching better sellers data' },
      { status: 500 }
    );
  }
}
