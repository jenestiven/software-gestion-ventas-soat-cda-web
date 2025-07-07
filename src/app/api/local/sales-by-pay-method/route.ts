import { NextResponse } from 'next/server';
import sales from './sales-by-pay-method.json';

export async function GET() {
  return NextResponse.json(sales);
}
