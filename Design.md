# Design System — Wedding Invitation Web App (Single Deployment Architecture)

Referensi utama: Undangan bertema navy blue + cream dengan aksen floral line-art, monogram inisial, serta personalisasi nama tamu berbasis parameter URL.

---

## 1. Konsep Visual

* **Mood**: Elegan, klasik, romantis, tenang — memberikan pengalaman membaca kartu fisik premium yang interaktif.
* **Motif Utama**: Garis floral tipis (*daisy/bunga aster line-art*) sebagai dekorasi pojok/pembatas section, dibuat menggunakan SVG vektor agar tetap tajam (*crisp*) di semua layar.
* **Layout Style**: *Scroll* panjang satu halaman (*long-scroll single page*) dengan batasan lebar container (*mobile-first frame*). Menggunakan efek "kartu sobek" (*torn-paper edge*) sebagai pemisah transisi antar-section berwarna solid (*navy*) dan section cream.
* **Dynamic Elements Integration**: Menyediakan area dinamis khusus di halaman sampul (*Cover*) dan form RSVP untuk menampilkan nama tamu dari URL query parameter (`?to=...`).

---

## 2. Palet Warna

| Token CSS | Hex Value | Penggunaan / Context |
| --- | --- | --- |
| `--color-navy-deep` | `#17335C` | Background utama section *Hero/Cover*, *Story*, & *Footer* |
| `--color-navy-accent` | `#3E5C8A` | Aksen sekunder, border kartu, & warna tombol utama |
| `--color-blue-mid` | `#7C97C4` | Dot warna di *Color Guide*, ikon, & teks pendukung |
| `--color-blue-light` | `#B7C7E3` | Hover state tombol ringan & badge VIP/Reguler |
| `--color-cream` | `#F7F3EA` | Background section konten (*Details*, *RSVP*, *Venues*) |
| `--color-ink` | `#1C2B3D` | Warna teks utama di atas background *Cream* |
| `--color-white` | `#FFFFFF` | Warna teks & elemen di atas background *Navy* |
| `--color-gold-accent` | `#D4AF37` | Garis floral line-art, monogram, & aksen mewah |

> **Color Guide Tamu:** Palet di atas juga ditampilkan secara visual di section *"Details"* sebagai panduan busana (dress code) tamu undangan.

---

## 3. Tipografi

* **Heading Dekoratif / Script**: Font kaligrafi/script elegan (`Playfair Display` italic / `Great Vibes` / `Alex Brush`) untuk nama pengantin, monogram, dan judul section (*The Details*, *The Venues*).
* **Heading Struktural**: Font Serif kapital dengan *letter-spacing* lebar (`Cormorant Garamond` / `Playfair Display` ALL CAPS) untuk label kecil (*THE WEDDING OF*, *RECEPTION*, *Kepada Yth.*).
* **Body Text**: Sans-serif / Serif ringan (`Plus Jakarta Sans` / `Inter` / `Merriweather`) ukuran minimal 15–16px di layar mobile dengan *line-height* 1.6 agar nyaman dibaca saat narasi cerita panjang.
* **Hierarki Tipografi**:
1. Nama Tamu Undangan (Serif Medium / Highlighted Box)
2. Nama Pengantin (Largest Script Calligraphy)
3. Tanggal Acara (Serif Angka Besar & Bold)
4. Judul Section (Script Sedang)
5. Body Content (Regular Reader Text)



---

## 4. Komponen per Section & Dynamic Layout

### 1. Cover / Landing (Dynamic Personalization)

* **Background**: Foto portrait pengantin + overlay *navy* semi-transparan (`--color-navy-deep` dengan opasitas 80%).
* **Monogram**: Inisial besar terbingkai garis floral emas.
* **Personalized Guest Box**: Area khusus bertuliskan *"Kepada Yth. Bapak/Ibu/Saudara/i:"* dilanjutkan dengan **Nama Tamu** yang dirender otomatis dari parameter `?to=...` (dengan fallback default *"Tamu Undangan"* jika parameter kosong).
* **Tombol Buka Undangan**: Mentrigger audio *background*, membuka animasi *3D Envelope Opening* (jika aktif), dan melakukan *smooth scroll*.

### 2. Wedding Program

* Frame oval/lingkaran berisi monogram + jadwal susunan acara (Akad, Resepsi, Dinner) dalam format list rapi dengan ikon *line-art*.

### 3. The Details

* **Sub-sections**: Dress Code (ikon jas/gaun), Color Guide (swatch dot warna), Gift Guide / Digital Angpao, Snap & Share (hashtag & ikon sosmed).
* **Dynamic OG Share Card**: Pratinjau *card* WhatsApp saat link dibagikan, menampilkan nama tamu yang bersangkutan secara dinamis.

### 4. The Venues

* Foto venue *full-width* dengan *label overlay* (*"CEREMONY" / "RECEPTION"*).
* Efek *torn-paper edge* di transisi foto ke alamat venue.
* Tombol integrasi *1-Click Navigation* (Google Maps / Waze).

### 5. Gallery & Live Guest Photo Wall

* Grid foto 3 kolom pre-wedding dengan fitur *lightbox*.
* Feed *Live Photo Wall* (menampilkan foto-foto yang di-upload oleh tamu di venue setelah di-approve oleh admin).

### 6. Interactive RSVP & QR Check-In

* Form interaktif berlatar *Cream Sand* dengan border tipis.
* Input nama otomatis terisi (*pre-filled*) berdasarkan parameter nama tamu di URL.
* Generator **QR Code Check-in unik** berbasis token guest untuk di-scan oleh Usher/Panitia saat kedatangan.

### 7. Our Love Story & Entourage

* Background *Navy Deep* dengan teks putih, aksen *floral line-art* di sudut-sudut kartu.

---

## 5. Micro-interactions & Motion

* **Scroll Reveal**: Fade-in & Slide-up halus (menggunakan *Framer Motion*) saat elemen masuk ke *viewport*.
* **3D / Splash Envelope**: Transisi animasi amplop 3D yang terbuka sebelum masuk ke isi web utama (dengan *progressive enhancement fallback* ke 2D untuk perangkat *low-end*).
* **Feedback Event**: *Confetti / Kelopak Bunga* berjatuhan secara mikro saat form RSVP berhasil disubmit.
* **Parallax Torn-Paper**: Transisi kertas sobek bergerak sedikit (*subtle parallax*) saat pengguna melakukan *scrolling*.

---

## 6. Responsive Rules

* **Mobile-First Standard**: Semua layout dan breakpoint diprioritaskan untuk layar smartphone (~375px–430px).
* **Desktop Framing (Container Constraint)**: Pada layar desktop/tablet, konten web tidak direntangkan *full-screen*. Konten dibatasi (*max-width: 480px–500px*) dan diposisikan tepat di tengah (*center-aligned*) dengan latar belakang luar bernuansa *dark navy* bermotif blur. Hal ini menjaga proporsi tampilan agar tetap terasa seperti memegang **Kartu Undangan Digital Fisik**.