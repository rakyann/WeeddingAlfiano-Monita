-- ==========================================
-- WEDDING INVITATION WEB APP DATABASE SCHEMA
-- ==========================================

-- 1. WEDDING CONFIGURATION TABLE
CREATE TABLE IF NOT EXISTS public.wedding_config (
  id INT PRIMARY KEY DEFAULT 1,
  bride_name TEXT NOT NULL DEFAULT 'Monita',
  groom_name TEXT NOT NULL DEFAULT 'Alifano',
  wedding_date TIMESTAMPTZ NOT NULL DEFAULT '2026-11-20T09:00:00+07:00',
  akad_time TEXT DEFAULT '08:00 - 10:00 WIB',
  resepsi_time TEXT DEFAULT '11:00 - 14:00 WIB',
  dinner_time TEXT DEFAULT '18:30 - 21:00 WIB',
  venue_name TEXT DEFAULT 'Grand Ballroom',
  venue_address TEXT DEFAULT 'Jl. Asia Afrika No.1, Jakarta Pusat',
  google_maps_url TEXT DEFAULT 'https://maps.google.com/?q=Jakarta',
  waze_url TEXT DEFAULT 'https://waze.com/ul?navigate=yes',
  bank_accounts JSONB DEFAULT '[
    {"bank": "Bank BCA", "number": "4240380175", "name": "Alifano Dwi Cahyo"},
    {"bank": "Bank BNI", "number": "0778824047", "name": "Monita Ameliani Febriana"}
  ]'::jsonb,
  qris_image_url TEXT DEFAULT 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=600&auto=format&fit=crop&q=80',
  dress_code_colors JSONB DEFAULT '[
    {"name": "Deep Navy", "hex": "#17335C"},
    {"name": "Navy Accent", "hex": "#3E5C8A"},
    {"name": "Cream Sand", "hex": "#F7F3EA"},
    {"name": "Gold Accent", "hex": "#D4AF37"}
  ]'::jsonb,
  hashtag TEXT DEFAULT '#AlifanoMonita2026',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT single_config CHECK (id = 1)
);

-- 2. GUESTS TABLE
CREATE TABLE IF NOT EXISTS public.guests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  token TEXT UNIQUE NOT NULL,
  is_vip BOOLEAN DEFAULT FALSE,
  table_number TEXT,
  max_pax INT DEFAULT 2,
  checked_in_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. RSVPS & GUESTBOOK TABLE
CREATE TABLE IF NOT EXISTS public.rsvps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  guest_id UUID REFERENCES public.guests(id) ON DELETE SET NULL,
  guest_name TEXT NOT NULL,
  attendance TEXT NOT NULL CHECK (attendance IN ('attending', 'declined', 'tentative')),
  pax INT DEFAULT 1,
  wishes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. LIVE PHOTO WALL TABLE
CREATE TABLE IF NOT EXISTS public.live_photos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  uploader_name TEXT NOT NULL DEFAULT 'Tamu',
  photo_url TEXT NOT NULL,
  caption TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS POLICIES & PERMISSIONS
ALTER TABLE public.wedding_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.guests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rsvps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.live_photos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read config" ON public.wedding_config FOR SELECT USING (true);
CREATE POLICY "Public read guests" ON public.guests FOR SELECT USING (true);
CREATE POLICY "Public read rsvps" ON public.rsvps FOR SELECT USING (true);
CREATE POLICY "Public insert rsvps" ON public.rsvps FOR INSERT WITH CHECK (true);
CREATE POLICY "Public read approved photos" ON public.live_photos FOR SELECT USING (status = 'approved');
CREATE POLICY "Public insert photo metadata" ON public.live_photos FOR INSERT WITH CHECK (true);

CREATE POLICY "Service role full access config" ON public.wedding_config FOR ALL USING (true);
CREATE POLICY "Service role full access guests" ON public.guests FOR ALL USING (true);
CREATE POLICY "Service role full access rsvps" ON public.rsvps FOR ALL USING (true);
CREATE POLICY "Service role full access live_photos" ON public.live_photos FOR ALL USING (true);
