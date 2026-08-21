# Product Requirement Document (PRD) — Wedding Invitation Web App

## 1. Ringkasan & Visi Produk

**Wedding Invitation Web App** adalah platform undangan pernikahan digital interaktif berarsitektur **Single Deployment (Vercel)** yang mengintegrasikan personalisasi dinamis per-tamu, fitur momen *real-time* di venue, serta kemudahan distribusi massal via WhatsApp.

Berbeda dari template undangan statis pasaran, platform ini menawarkan pengalaman *hyper-personalized* di mana **1 instance deployment** melayani seluruh tamu secara dinamis melalui parameter URL, dilengkapi animasi pembuka 3D, *Live Photo Wall*, *QR Code Check-in*, dan dashboard manajemen real-time untuk pengantin.

### Visi Arsitektur & SaaS Business Model

* **Single Deployment Efficiency**: Aplikasi hanya perlu di-deploy 1 kali di Vercel (`undangan.domain.com`). Semua link tamu mengakses URL yang sama dengan query parameter (`?to=Nama+Tamu&vip=true`).
* **Paket SaaS (Tiered Pricing)**:
* **Paket S1**: Kapasitas hingga **250 tamu**.
* **Paket S2**: Kapasitas hingga **350 tamu** (fitur tambahan: 3D Venue Preview & WhatsApp Auto-Reminder).


* **Target Skalabilitas**: Mampu menangani **50–100 pengguna aktif bersamaan (concurrent users)** pada hari-H resepsi (upload foto & submit RSVP) tanpa degradasi performa.

---

## 2. Target Pengguna & Use Cases

| User Role | Deskripsi & Tujuan | Key Needs |
| --- | --- | --- |
| **Pengantin / Admin** | Pemilik acara yang mengelola data, memantau RSVP, dan memoderasi konten | Bulk link generator, real-time dashboard RSVP & angpao, moderasi foto |
| **Tamu Undangan** | Penerima undangan yang mengakses web via HP | Loading cepat (<2 detik), pengalaman personal, RSVP mudah, upload foto, angpao digital |
| **Panitia / Usher** | Petugas penerima tamu di venue pernikahan | QR Code Scanner untuk verifikasi & check-in tamu di tempat |

---

## 3. Spesifikasi Fitur Detail

### 3.1 Dynamic Personalization Engine (Single Deployment Core)

* **URL Parameter Parsing**: Membaca parameter query URL (misal: `?to=Budi+Santoso&vip=true&table=A1`) di sisi client/edge runtime untuk merender:
* Teks sapaan pada Cover: *"Kepada Yth. Bapak/Ibu/Saudara/i: **Budi Santoso**"*.
* Status Badge VIP (opsional jika `vip=true`).
* Form RSVP auto-filled dengan nama "Budi Santoso".


* **Fallback System**: Jika parameter `to` tidak tersedia di URL, sistem menampilkan teks default: *"Tamu Undangan"*.
* **Dynamic Open Graph (OG) Image**: Menggunakan `@vercel/og` untuk menggenerate *social share preview card* di WhatsApp/Social Media secara dinamis yang menampilkan nama pengantin dan nama tamu yang diundang.

### 3.2 Dynamic Link Generator & WA Blast Exporter

* **Admin Guest Manager**: Form input nama tamu satu per satu atau import massal via CSV/Excel.
* **Auto Link Builder**: Sistem meng-generate URL siap kirim yang disesuaikan dengan format enkripsi URL (`ENCODEURL`).
* **Copy-Ready Text Template**: Menyediakan format pesan WhatsApp yang bisa di-copy atau dihubungkan ke WA Gateway (Fonnte/Wablas/Starsender) atau Google Apps Script.

### 3.3 Konten & Struktur Undangan (Mobile-First)

1. **Cover / Hero Section**:
* Monogram inisial pengantin & foto portrait dengan overlay navy semi-transparan.
* Kotak penerima undangan dinamis.
* Tombol *"Buka Undangan"* (mentrigger audio background & animasi pembuka).


2. **Wedding Program**:
* Detail susunan acara (Akad Nikah, Resepsi, & Dinner) dalam layout oval/lingkaran rapi.


3. **The Details (Panduan Tamu)**:
* **Dress Code & Color Guide**: Visual swatch dot warna pakaian.
* **Gift Guide / Digital Angpao**: Nomor rekening bank + QRIS + tombol *1-Click Copy* nomor rekening.
* **Snap & Share**: Hashtag pernikahan & sosial media pengantin.


4. **The Venues**:
* Foto & nama lokasi acara.
* Tombol *1-Click Navigation* langsung terhubung ke Google Maps dan Waze.


5. **Our Love Story & Entourage**:
* Timeline cerita perjalanan cinta & susunan panitia/keluarga besar.


6. **Pre-wedding Gallery**:
* Grid foto 3 kolom dengan fitur *lightbox/fullscreen preview*.



### 3.4 Fitur Interaktif & Real-time (Hari-H)

* **Interactive RSVP & Guestbook**:
* Form konfirmasi kehadiran (Hadir / Tidak / Ragu-ragu), jumlah pendamping, serta kolom ucapan & doa.
* *Micro-interaction*: Efek *confetti / kelopak bunga* berjatuhan saat RSVP disubmit.


* **Digital Guest Camera & Live Cloud Album**:
* Tamu bisa mengunggah foto keceriaan dari HP masing-masing di venue.
* Foto masuk ke antrean *Pending* di Admin Dashboard sebelum disetujui (*Approved*) untuk tayang di *Live Photo Wall*.


* **QR Code Check-in System**:
* Setiap tamu mendapatkan QR Code unik berdasarkan token ID di halaman undangan mereka.
* Usher di lokasi melakukan scan QR Code menggunakan kamera HP via halaman `/scan` untuk mencatat kehadiran fisik.



### 3.5 Fitur 3D (Interactive Visuals)

* **3D Envelope Opening (Intro Screen)**:
* Animasi amplop 3D yang terbuka halus menggunakan React Three Fiber (R3F) saat tombol "Buka Undangan" diklik.
* **Progressive Enhancement**: Jika perangkat *low-end* tidak mendukung WebGL, sistem otomatis melewati animasi 3D dan langsung masuk ke halaman utama (2D fallback).


* **3D Venue Preview (Paket S2 - Opsional)**:
* Model 3D denah ruangan venue interaktif yang bisa diputar/zoom untuk melihat letak meja & pintu masuk.
* Menggunakan *Lazy Loading* agar tidak membebani skor kecepatan awal website.



### 3.6 Admin Dashboard (Pengantin / Manager)

* **Statistik Real-time**: Grafik konfirmasi kehadiran (Total Hadir, Tidak Hadir, Jumlah Pendamping).
* **Rekap Angpao Digital**: Log klaim/konfirmasi pengiriman angpao.
* **Tabel Manajemen Tamu**: Filter berdasarkan nama, kategori (VIP/Reguler), dan status kirim WA.
* **Halaman Moderasi Foto**: Interface *Approve/Reject* satu klik untuk foto yang diunggah tamu.

---

## 4. Technical Guardrails & Constraints

### 4.1 Functional Requirements & Rules

* **Single Instance Limit**: Dilarang menggunakan static site generation (SSG) terpisah per nama tamu. Seluruh personalisasi nama wajib diproses secara runtime di client/edge.
* **Direct-to-Storage Upload**: Pengunggahan foto tamu wajib menggunakan *Signed URL* (Supabase Storage) langsung dari browser tamu ke bucket storage tanpa melewati server Vercel sebagai perantara (menghindari bottleneck memory).
* **Performance Benchmark**:
* First Contentful Paint (FCP) < 1.5 detik.
* Time to Interactive (TTI) < 2.5 detik pada jaringan 4G/Mobile.



### 4.2 Security & Code Guidelines (Untuk AI Agent / Developer)

1. **Dilarang mengakses file `.env` asli secara langsung**: Kredensial rahasia (DB Keys, Storage Secrets) hanya didokumentasikan di `.env.example`.
2. **Dilarang hardcode data**: Semua data acara, tamu, dan pengaturan wajib masuk melalui migration, seed script, atau Admin Panel.
3. **Optimasi Komentar Kode**: Komentar hanya ditulis pada fungsi yang kompleks/tidak intuitif.
4. **Environment Variables**: Semua API Key dan token wajib dipanggil melalui `process.env`.

---

## 5. Strategi Pengujian (Testing Strategy)

* **Automated Testing (Non-Wajib di Awal)**: Tidak diwajibkan membuat End-to-End (E2E) browser test penuh saat tahap MVP.
* **Unit Testing Prioritas (Optional Value-Add)**:
* Logika validasi batas kuota tamu sesuai paket (Paket S1: max 250, Paket S2: max 350).
* Function URL Encoder & Decoder untuk parameter `?to=`.
* Parser data RSVP dan kalkulasi statistik.



---

## 6. Aturan Git & Workflow

* **Commit Policy**: Commit Wajib dilakukan **setiap kali selesai 1 unit perubahan yang stabil**.
* **Conventional Commits Format**:
* `feat: tambah dynamic URL parser untuk nama tamu`
* `fix: perbaiki alignment torn paper pada resolusi mobile`
* `docs: update prd.md`
* `chore: konfigurasi .env.example`


* **Branching Strategy**:
* `main` → Branch produksi terhubung ke Vercel Auto-Deployment.
* `dev` → Branch integrasi fitur harian.
* `feat/<nama-fitur>` → Branch terisolasi untuk pengembangan fitur spesifik.



---

## 7. Dokumen Terkait

* `arsitektur.md` — Tech stack, schema Supabase PostgreSQL, struktur folder, & integrasi 3D R3F.
* `design.md` — Design system, palet warna Navy & Cream, tipografi, serta aturan layout *torn-paper*.