-- ==========================================
-- SEED DATA FOR WEDDING INVITATION APP
-- ==========================================

-- Insert default wedding configuration
INSERT INTO public.wedding_config (
  id, bride_name, groom_name, wedding_date, akad_time, resepsi_time, dinner_time,
  venue_name, venue_address, google_maps_url, waze_url, hashtag
) VALUES (
  1,
  'Juliet',
  'Romeo',
  '2026-11-20T09:00:00+07:00',
  '08:00 - 10:00 WIB',
  '11:00 - 14:00 WIB',
  '18:30 - 21:00 WIB',
  'The Glass House - Hotel Mulia Jakarta',
  'Jl. Asia Afrika No.1, Senayan, Jakarta Pusat',
  'https://maps.google.com/?q=Hotel+Mulia+Jakarta',
  'https://waze.com/ul?ll=-6.2163,106.7975&navigate=yes',
  '#RomeoJuliet2026'
) ON CONFLICT (id) DO NOTHING;

-- Insert sample guest records
INSERT INTO public.guests (name, token, is_vip, table_number, max_pax) VALUES
  ('Budi Santoso', 'budi-santoso-token-001', true, 'A1', 2),
  ('Siti Rahma', 'siti-rahma-token-002', false, 'B3', 2),
  ('Keluarga Besar Ahmad', 'keluarga-ahmad-token-003', true, 'VIP-1', 4)
ON CONFLICT (token) DO NOTHING;

-- Insert initial sample wishes
INSERT INTO public.rsvps (guest_name, attendance, pax, wishes) VALUES
  ('Budi Santoso', 'attending', 2, 'Selamat Romeo & Juliet! Semoga menjadi keluarga yang sakinah, mawaddah, warahmah. Aamiin!'),
  ('Siti Rahma', 'attending', 1, 'Congratulations to both of you! So happy for your big day!'),
  ('Keluarga Besar Ahmad', 'attending', 4, 'Barakallahu lakuma wa baraka alaikuma wa jamaa bainakuma fii khair. Selamat melangkah ke jenjang pernikahan!')
ON CONFLICT DO NOTHING;

-- Insert sample approved photos for Live Photo Wall
INSERT INTO public.live_photos (uploader_name, photo_url, caption, status) VALUES
  ('Budi Santoso', 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&auto=format&fit=crop&q=80', 'Bahagia selalu Romeo & Juliet!', 'approved'),
  ('Siti Rahma', 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&auto=format&fit=crop&q=80', 'Resepsi luar biasa indah!', 'approved')
ON CONFLICT DO NOTHING;
