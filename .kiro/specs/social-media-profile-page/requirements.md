# Requirements Document

## Introduction

Fitur ini adalah sebuah halaman web sederhana yang berfungsi sebagai halaman profil terpusat (social media link-in-bio page). Halaman ini menampilkan profil pengguna beserta daftar akun media sosial yang dimilikinya. Setiap kartu media sosial yang ditampilkan dapat diklik dan akan membuka halaman profil pengguna di platform media sosial yang bersangkutan di tab baru.

## Glossary

- **Profile_Page**: Halaman web utama yang menampilkan informasi profil pengguna dan daftar media sosial.
- **Profile_Card**: Komponen UI yang menampilkan informasi identitas pengguna (foto, nama, bio).
- **Social_Media_Card**: Komponen UI yang merepresentasikan satu akun media sosial, berisi ikon platform, nama platform, username, dan URL profil.
- **User**: Pemilik halaman profil yang menggunakan fitur ini.
- **Visitor**: Orang yang mengunjungi Profile_Page.
- **Platform**: Layanan media sosial (contoh: Instagram, Twitter/X, LinkedIn, GitHub, YouTube, TikTok).
- **Profile_URL**: URL lengkap menuju halaman profil pengguna di suatu Platform.

---

## Requirements

### Requirement 1: Menampilkan Informasi Profil Pengguna

**User Story:** Sebagai Visitor, saya ingin melihat informasi profil pemilik halaman, agar saya mengetahui identitas orang tersebut.

#### Acceptance Criteria

1. THE Profile_Page SHALL menampilkan foto profil pengguna.
2. THE Profile_Page SHALL menampilkan nama lengkap pengguna.
3. THE Profile_Page SHALL menampilkan bio singkat pengguna.

---

### Requirement 2: Menampilkan Daftar Akun Media Sosial

**User Story:** Sebagai Visitor, saya ingin melihat daftar semua akun media sosial pengguna dalam satu halaman, agar saya dapat menemukan platform yang ingin saya kunjungi dengan mudah.

#### Acceptance Criteria

1. THE Profile_Page SHALL menampilkan daftar Social_Media_Card untuk setiap Platform yang terdaftar.
2. THE Social_Media_Card SHALL menampilkan ikon atau logo Platform yang bersangkutan.
3. THE Social_Media_Card SHALL menampilkan nama Platform (contoh: "Instagram", "GitHub").
4. THE Social_Media_Card SHALL menampilkan username pengguna di Platform tersebut.

---

### Requirement 3: Navigasi ke Profil Media Sosial

**User Story:** Sebagai Visitor, saya ingin mengklik kartu media sosial dan langsung diarahkan ke profil pengguna di platform tersebut, agar saya dapat melihat konten pengguna tanpa perlu mencari secara manual.

#### Acceptance Criteria

1. WHEN Visitor mengklik sebuah Social_Media_Card, THE Profile_Page SHALL membuka Profile_URL yang sesuai di tab browser baru.
2. WHEN Visitor mengklik sebuah Social_Media_Card, THE Profile_Page SHALL tidak menutup atau meninggalkan halaman Profile_Page saat ini.
3. IF Profile_URL untuk suatu Platform tidak dikonfigurasi atau kosong, THEN THE Profile_Page SHALL menyembunyikan Social_Media_Card tersebut dari tampilan.

---

### Requirement 4: Tampilan Responsif

**User Story:** Sebagai Visitor, saya ingin halaman profil tampil dengan baik di berbagai ukuran layar, agar saya dapat mengaksesnya dengan nyaman dari perangkat apapun.

#### Acceptance Criteria

1. WHILE Visitor mengakses Profile_Page dari perangkat dengan lebar layar kurang dari 768px, THE Profile_Page SHALL menampilkan layout satu kolom.
2. WHILE Visitor mengakses Profile_Page dari perangkat dengan lebar layar 768px atau lebih, THE Profile_Page SHALL menampilkan layout dua kolom atau lebih untuk Social_Media_Card.
3. THE Profile_Page SHALL menyesuaikan ukuran elemen agar tidak melebihi lebar viewport.

---

### Requirement 5: Umpan Balik Visual Interaktif

**User Story:** Sebagai Visitor, saya ingin mendapatkan umpan balik visual ketika berinteraksi dengan kartu media sosial, agar saya tahu bahwa elemen tersebut dapat diklik.

#### Acceptance Criteria

1. WHEN Visitor mengarahkan kursor (hover) ke atas sebuah Social_Media_Card, THE Social_Media_Card SHALL menampilkan perubahan visual (contoh: perubahan warna latar, bayangan, atau efek scale).
2. THE Social_Media_Card SHALL menampilkan kursor pointer saat Visitor mengarahkan kursor ke atasnya.
