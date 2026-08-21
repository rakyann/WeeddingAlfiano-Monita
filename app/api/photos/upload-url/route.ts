import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';

export async function POST(req: NextRequest) {
  try {
    const { fileName, fileType } = await req.json();

    if (!fileName) {
      return NextResponse.json({ error: 'Filename is required' }, { status: 400 });
    }

    const supabase = createAdminClient();
    const cleanFileName = `${Date.now()}-${fileName.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    const filePath = `uploads/${cleanFileName}`;

    // Create signed upload URL for bucket 'guest-photos'
    const { data, error } = await supabase.storage
      .from('guest-photos')
      .createSignedUploadUrl(filePath);

    if (error) {
      // Fallback: If signed upload fails (e.g. bucket doesn't exist yet or local mock), construct direct URL
      const fallbackUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/guest-photos/${filePath}`;
      return NextResponse.json({
        signedUrl: fallbackUrl,
        publicUrl: fallbackUrl,
      });
    }

    const publicUrl = supabase.storage.from('guest-photos').getPublicUrl(filePath).data.publicUrl;

    return NextResponse.json({
      signedUrl: data.signedUrl,
      publicUrl: publicUrl,
      path: filePath,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}
