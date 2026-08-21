-- ==========================================
-- SEED DATA FOR ALIFANO & MONITA WEDDING APP
-- ==========================================

-- Insert default wedding configuration with real bride & groom details
INSERT INTO public.wedding_config (
  id, bride_name, groom_name, wedding_date, akad_time, resepsi_time, dinner_time,
  venue_name, venue_address, google_maps_url, waze_url, bank_accounts, hashtag
) VALUES (
  1,
  'Monita',
  'Alifano',
  '2026-11-20T09:00:00+07:00',
  '08:00 - 10:00 WIB',
  '11:00 - 14:00 WIB',
  '18:30 - 21:00 WIB',
  'Grand Ballroom',
  'Jl. Asia Afrika No.1, Jakarta Pusat',
  'https://maps.google.com/?q=Jakarta',
  'https://waze.com/ul?navigate=yes',
  '[
    {"bank": "Bank BCA", "number": "4240380175", "name": "Alifano Dwi Cahyo"},
    {"bank": "Bank BNI", "number": "0778824047", "name": "Monita Ameliani Febriana"}
  ]'::jsonb,
  '#AlifanoMonita2026'
) ON CONFLICT (id) DO UPDATE SET
  bride_name = EXCLUDED.bride_name,
  groom_name = EXCLUDED.groom_name,
  bank_accounts = EXCLUDED.bank_accounts,
  hashtag = EXCLUDED.hashtag;

-- Insert sample guest records
INSERT INTO public.guests (name, token, is_vip, table_number, max_pax) VALUES
  ('Budi Santoso', 'budi-santoso-token-001', true, 'A1', 2),
  ('Siti Rahma', 'siti-rahma-token-002', false, 'B3', 2),
  ('Keluarga Besar Ahmad', 'keluarga-ahmad-token-003', true, 'VIP-1', 4)
ON CONFLICT (token) DO NOTHING;

-- Insert initial sample wishes
INSERT INTO public.rsvps (guest_name, attendance, pax, wishes) VALUES
  ('Budi Santoso', 'attending', 2, 'Selamat Alifano & Monita! Semoga menjadi keluarga yang sakinah, mawaddah, warahmah. Aamiin!'),
  ('Siti Rahma', 'attending', 1, 'Congratulations Alifano & Monita! So happy for your big day!'),
  ('Keluarga Besar Ahmad', 'attending', 4, 'Selamat melangkah ke jenjang pernikahan untuk Alifano & Monita!')
ON CONFLICT DO NOTHING;
