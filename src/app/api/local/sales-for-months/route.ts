import { NextResponse } from 'next/server'
import sales from './sales-for-months.json'

export async function GET () {
  return NextResponse.json(sales)
}