import { NextResponse } from 'next/server';
import sales from './sales-by-place.json';

export async function GET() {
  return NextResponse.json(sales);
}
