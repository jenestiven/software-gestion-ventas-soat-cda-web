import { getSalesForMonths } from '@/services/sales/sales';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const year = searchParams.get('year');
  const month = searchParams.get('month');

  const yearNumber = year ? parseInt(year) : undefined;
  const monthNumber = month ? parseInt(month) : undefined;

  try {
    const data = await getSalesForMonths(yearNumber, monthNumber);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching sales for months data:', error);
    return NextResponse.json(
      { message: 'Error fetching sales for months data' },
      { status: 500 }
    );
  }
}
