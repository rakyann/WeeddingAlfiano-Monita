import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';

// Global in-memory cache for serverless instance lifetime
let inMemoryRsvps: any[] = [];

export async function GET() {
  try {
    // Try fetching from Supabase if configured
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://placeholder.supabase.co') {
      const { data, error } = await supabase.from('rsvps').select('*').order('created_at', { ascending: false });
      if (!error && data) {
        return NextResponse.json({ success: true, data });
      }
    }
  } catch (e) {}

  return NextResponse.json({ success: true, data: inMemoryRsvps });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, address, attendance, guests, pax } = body;

    if (!name) {
      return NextResponse.json({ success: false, error: 'Name is required' }, { status: 400 });
    }

    const newRecord = {
      id: Date.now().toString(),
      name,
      address: address || '-',
      attendance: attendance || 'Hadir',
      pax: Number(pax) || Number(guests) || 1,
      created_at: new Date().toISOString(),
    };

    // Store in memory
    inMemoryRsvps = [newRecord, ...inMemoryRsvps.filter((r) => r.name.toLowerCase() !== name.toLowerCase())];

    // Try storing to Supabase if configured
    try {
      if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://placeholder.supabase.co') {
        await supabase.from('rsvps').insert([
          {
            guest_name: name,
            name: name,
            address: address || '-',
            attendance: attendance === 'Hadir' ? 'attending' : attendance === 'Tidak Hadir' ? 'declined' : 'tentative',
            pax: Number(pax) || Number(guests) || 1,
          },
        ]);
      }
    } catch (e) {}

    return NextResponse.json({ success: true, data: newRecord });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
