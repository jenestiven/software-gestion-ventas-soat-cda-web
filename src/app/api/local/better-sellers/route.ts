import { NextResponse } from 'next/server';
import sells from './better-sellers.json';

export async function GET() {
  return NextResponse.json(sells);
}
