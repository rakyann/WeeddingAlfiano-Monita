# Arsitektur Teknis — Wedding Invitation Web App (Single Deployment Architecture)

## 1. Tech Stack Overview

* **Frontend Framework**: Next.js (App Router / React) + Tailwind CSS — mendukung client-side parameter parsing & Edge Rendering super cepat.
* **Hosting & Deployment**: Vercel (Single Deployment, Edge Infrastructure & Image Optimization).
* **3D Engine**: Three.js via React Three Fiber (`@react-three/fiber` + `@react-three/drei`) — untuk animasi amplop 3D & preview venue 3D (Lazy Loaded).
* **Backend & Database**: Supabase (PostgreSQL + Realtime Subscriptions + Storage) untuk Auth admin, data RSVP, dan foto album live.
* **Dynamic OG Image**: `@vercel/og` (Edge Runtime) untuk menggenerate *social share card* otomatis per nama tamu saat link disebar di WhatsApp/Social Media.
* **Storage Foto Tamu**: Supabase Storage (Direct-to-Bucket via Signed URLs) agar serverless API tidak menjadi bottleneck saat traffic tinggi.
* **PWA**: `next-pwa` / Workbox untuk Service Worker caching asset statis (font, ikon, 3D assets, gambar latar) agar tetap stabil di venue dengan sinyal lemah.
* **Notifikasi/Broadcast**: Integration-ready untuk WhatsApp Business API / Provider Lokal (Fonnte, Wablas, Starsender) via webhook/API endpoint.

---

## 2. Dynamic Routing & Personalization Engine

Seluruh request dari ratusan tamu dilayani oleh **1 Single Deployment Vercel** tanpa perlu melakukan *build* atau *deployment* ulang per tamu.

```
[Tamu Klik Link] 
    │
    ├──> https://undangan.domain.com/?to=Budi+Santoso&vip=true
    │
    ├──> Vercel Edge Server (Parse URL Parameters)
    │
    ├──> React Client App Component
            ├──> State Parser: namaTamu = "Budi Santoso", isVip = true
            ├──> Personalization Cover: "Kepada Yth. Budi Santoso"
            └──> Pre-filled RSVP Form & Dynamic OG Preview Card

```

### Social Share Preview (Dynamic OG Image)

* **Endpoint**: `/api/og?to=Budi+Santoso`
* Menggunakan `@vercel/og` yang berjalan di Edge Runtime untuk merender gambar preview WhatsApp secara kustom sesuai parameter `to` tanpa perlu rendering berat di client.

---

## 3. Struktur Folder Project

```
├── app/
│   ├── layout.tsx             # Root layout, font loader, & PWA provider
│   ├── page.tsx               # Main Single-Deployment Page (URL Query Reader)
│   ├── api/
│   │   ├── og/route.tsx       # Dynamic OG Image Generator (@vercel/og)
│   │   ├── rsvp/route.ts      # Endpoint simpan RSVP & Ucapan
│   │   └── upload/route.ts    # Signed URL generator untuk upload foto
│   ├── admin/                 # Dashboard Pengantin
│   │   ├── page.tsx           # Ringkasan RSVP & Angpao
│   │   ├── guests/page.tsx    # Manajemen Tamu & Bulk Link Exporter
│   │   └── moderation/page.tsx# Moderasi Live Photo Wall
│   └── scan/                  # QR Code Scanner untuk Usher/Panitia
├── components/
│   ├── sections/              # Cover, Program, Details, Venues, Gallery, RSVP, Story
│   ├── three/                 # 3D EnvelopeOpening & VenuePreview (Lazy-loaded)
│   └── ui/                    # Torn Paper Card, Buttons, Dialogs, Color Guide
├── lib/
│   ├── db/                    # Query layer Supabase (TANPA data hardcode)
│   ├── integrations/          # Helpers: wa-api, qris, link-encoder
│   └── utils.ts               # Formatter, URL parser, fallback handler
├── public/                    # Asset statis, audio, PWA manifest.json
└── .env.example               # Referensi environment variable (TANPA nilai asli)

```

---

## 4. Data Model (Supabase PostgreSQL)

Semua data diisi melalui migration/seed script atau Admin Panel — **tidak ada data hardcode** di kode aplikasi.

```sql
-- Table: guests (Data Tamu & Limit Paket)
CREATE TABLE guests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR UNIQUE NOT NULL, -- e.g., budi-santoso
  name VARCHAR NOT NULL,
  phone_number VARCHAR,
  is_vip BOOLEAN DEFAULT FALSE,
  table_number VARCHAR,
  max_plus_one INT DEFAULT 1,
  qr_code_token VARCHAR UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIMEZONE DEFAULT NOW()
);

-- Table: rsvps (Status Kehadiran & Doa)
CREATE TABLE rsvps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  guest_id UUID REFERENCES guests(id) ON DELETE SET NULL,
  guest_name VARCHAR NOT NULL,
  attendance_status VARCHAR CHECK (attendance_status IN ('ATTENDING', 'DECLINED', 'MAYBE')) NOT NULL,
  total_attending INT DEFAULT 1,
  wishes TEXT,
  created_at TIMESTAMP WITH TIMEZONE DEFAULT NOW()
);

-- Table: live_photos (Digital Guest Camera)
CREATE TABLE live_photos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  uploader_name VARCHAR NOT NULL,
  image_url TEXT NOT NULL,
  caption TEXT,
  status VARCHAR CHECK (status IN ('PENDING', 'APPROVED', 'REJECTED')) DEFAULT 'PENDING',
  created_at TIMESTAMP WITH TIMEZONE DEFAULT NOW()
);

```

---

## 5. Fitur 3D — Detail Teknis

### 5.1 3D Envelope/Invitation Opening

* Dijalankan sebagai komponen intro/splash screen (`/components/three/EnvelopeOpening`).
* Model menggunakan geometry ringan (plane + hinge animation) untuk efisiensi di perangkat seluler.
* **Progressive Enhancement**: Jika perangkat low-end atau WebGL gagal dimuat, sistem otomatis memicu fallback langsung ke tampilan cover 2D standar.

### 5.2 3D Venue Preview (Opsional Paket S2)

* Model 3D sederhana (bentuk dasar ruangan + marker denah meja/pintu).
* **Lazy Loading**: Hanya di-import dan dimuat saat pengguna mengklik tombol "Lihat Denah 3D" untuk menjaga performa skor Lighthouse.

---

## 6. PWA, Performa & Keamanan

* **Kapasitas Target**: Mampu menangani **50–100 pengguna aktif bersamaan** di hari-H saat prosesi upload foto/RSVP.
* **Direct-to-Storage Upload**: Menggunakan *Signed URL* dari Supabase Storage. File foto diunggah langsung dari browser tamu ke storage bucket tanpa membebani Vercel API Route.
* **Client Fallback**: Jika query parameter `?to=` tidak ditemukan di URL, sistem secara otomatis menampilkan teks fallback universal (misal: "Tamu Undangan").
* **Keamanan Environment Variable**:
* Semua kredensial (DB connection, API Keys, Tokens) diakses strictly via `process.env`.
* **Aturan Agent/Developer**: File `.env` asli tidak boleh dibaca/ditulis langsung oleh AI coding agent. Pengembang hanya memperbarui `.env.example`.



---

## 7. Aturan Git & Workflow

### Conventions & Commits

* Commit wajib dilakukan **setiap kali selesai 1 unit perubahan yang stabil** (fitur kecil, bugfix, update dokumentasi).
* Format commit (Conventional Commits):
* `feat: tambah dynamic URL parameter parser untuk nama tamu`
* `fix: perbaiki overflow pada layout torn paper di mobile`
* `docs: update arsitektur.md`
* `chore: update .env.example`



### Branching Strategy

* `main` → Branch produksi terhubung langsung ke Auto-deployment Vercel.
* `dev` → Branch integrasi harian.
* `feature/<nama-fitur>` → Branch terpisah untuk fitur besar (misal `feature/3d-envelope`), di-merge ke `dev` setelah lolos build & linting.

### File Guardrails (Diabaikan dari Git)

* `.env` & `.env.local`
* `/node_modules` & `/.next`
* Media upload hasil uji coba lokal.

---

## 8. Testing Strategy

* Automated testing **tidak diwajibkan** pada tahap awal pengembangan.
* Jika ditambahkan sebagai nilai tambah, prioritaskan unit testing pada logika kritikal (seperti kalkulasi kuota tamu paket S1/S2, enkripsi/decoding parameter URL, dan parsing RSVP) menggunakan **Vitest**.