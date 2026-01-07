import { getAllSales } from '@/services/sales/sales';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const sales = await getAllSales();
    return NextResponse.json(sales);
  } catch (error) {
    console.error('Error fetching all sales:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
