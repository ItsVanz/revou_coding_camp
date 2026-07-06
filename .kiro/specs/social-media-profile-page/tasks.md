# Implementation Plan: Social Media Profile Page

## Overview

Implementasi halaman web statis berbasis HTML, CSS, dan JavaScript vanilla yang berfungsi sebagai halaman profil terpusat (*link-in-bio page*). Semua data profil dikonfigurasi melalui objek JavaScript statis, kartu media sosial di-render secara dinamis, dan halaman bersifat responsif serta aksesibel.

## Tasks

- [-] 1. Set up struktur proyek dan file dasar
  - Buat direktori `assets/icons/` untuk menyimpan SVG ikon platform
  - Buat file `index.html`, `style.css`, dan `app.js` di root proyek
  - Tambahkan placeholder `assets/avatar.jpg` (bisa berupa gambar kosong atau contoh)
  - Tambahkan file ikon SVG untuk platform: Instagram, GitHub, LinkedIn, Twitter/X
  - Set up Jest dan jsdom sebagai dev dependencies (`npm init` + `npm install --save-dev jest jest-environment-jsdom`)
  - Konfigurasi Jest di `package.json` dengan `"testEnvironment": "jsdom"`
  - _Requirements: 1.1, 2.2_

- [ ] 2. Implementasi struktur HTML dan data konfigurasi
  - [-] 2.1 Buat struktur HTML dasar di `index.html`
    - Tambahkan `<section class="profile-card">` dengan `<img>`, `<h1>`, dan `<p>` untuk profil
    - Tambahkan `<main class="social-cards-container" id="social-cards">` sebagai container kartu
    - Hubungkan `style.css` di `<head>` dan `app.js` di akhir `<body>`
    - Pastikan semua elemen interaktif memiliki `aria-label` yang deskriptif
    - _Requirements: 1.1, 1.2, 1.3, 2.1_

  - [-] 2.2 Buat data konfigurasi di `app.js`
    - Definisikan objek `profileData` dengan field `name`, `bio`, dan `avatar`
    - Definisikan array `socialLinks` berisi minimal 4 entri platform (Instagram, GitHub, LinkedIn, Twitter/X) dengan salah satu `url` dikosongkan untuk testing req 3.3
    - Export fungsi `renderSocialCards` agar dapat diuji oleh Jest
    - _Requirements: 1.2, 1.3, 2.3, 2.4, 3.3_

- [ ] 3. Implementasi logika rendering kartu media sosial
  - [~] 3.1 Implementasi fungsi `renderSocialCards(links, container)`
    - Filter entri dengan `url` kosong, `null`, atau `undefined` sebelum rendering
    - Render elemen `<a class="social-card">` untuk setiap entri valid dengan: `href` = `url`, `target="_blank"`, `rel="noopener noreferrer"`, dan `aria-label`
    - Tampilkan `<img>` ikon, `<span class="social-platform">`, dan `<span class="social-username">` di dalam setiap kartu
    - Pasang event listener `DOMContentLoaded` untuk memanggil `renderSocialCards` dengan `socialLinks` dan container `#social-cards`
    - Tambahkan guard `if (container)` sebelum memanggil fungsi rendering
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 3.1, 3.2, 3.3_

  - [ ]* 3.2 Tulis property test untuk Property 1: Hanya entri dengan URL valid yang dirender
    - **Property 1: valid-url-filter**
    - **Validates: Requirements 2.1, 3.3**
    - Gunakan `fast-check` untuk men-generate array acak campuran URL valid, kosong, dan null
    - Assert bahwa jumlah elemen `.social-card` yang dirender sama persis dengan jumlah entri ber-URL valid

  - [ ]* 3.3 Tulis property test untuk Property 2: Setiap kartu memiliki atribut navigasi yang benar
    - **Property 2: card-navigation-attrs**
    - **Validates: Requirements 3.1, 3.2**
    - Gunakan `fast-check` untuk men-generate satu `SocialLink` acak dengan URL valid
    - Assert bahwa `href` === `link.url`, `target="_blank"` ada, dan `rel` mengandung `"noopener"`

  - [ ]* 3.4 Tulis property test untuk Property 3: Setiap kartu menampilkan informasi lengkap platform
    - **Property 3: card-content-complete**
    - **Validates: Requirements 2.2, 2.3, 2.4**
    - Gunakan `fast-check` untuk men-generate satu `SocialLink` acak dengan URL valid
    - Assert bahwa HTML kartu mengandung nama platform, username, dan atribut `src` ikon yang sesuai

  - [ ]* 3.5 Tulis unit tests untuk `renderSocialCards`
    - Test filter URL kosong dan null (sesuai testing strategy di design doc)
    - Test atribut kartu (`href`, `target`, `rel`)
    - Test konten teks kartu (platform name dan username)
    - Test edge case: array kosong dan semua URL kosong
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 3.1, 3.2, 3.3_

- [~] 4. Checkpoint — Pastikan semua tests lulus
  - Pastikan semua tests lulus, tanyakan kepada user jika ada pertanyaan.

- [ ] 5. Implementasi styling CSS
  - [~] 5.1 Buat layout dasar dan styling Profile Card di `style.css`
    - Reset box-sizing dan margin dasar
    - Styling `.profile-card`: centering konten, tampilan foto profil bulat, spacing nama dan bio
    - Pastikan elemen tidak melebihi lebar viewport
    - _Requirements: 1.1, 1.2, 1.3, 4.3_

  - [~] 5.2 Buat styling Social Media Card dan layout responsif
    - Styling `.social-cards-container`: default layout satu kolom (mobile-first)
    - Styling `.social-card`: padding, border-radius, display flex untuk ikon dan info
    - Tambahkan media query `@media (min-width: 768px)` untuk mengubah container menjadi dua kolom atau lebih menggunakan CSS Grid atau Flexbox wrap
    - _Requirements: 4.1, 4.2, 4.3_

  - [~] 5.3 Implementasi efek hover dan visual interaktif
    - Tambahkan CSS untuk `.social-card:hover`: perubahan warna latar, bayangan (box-shadow), atau efek scale menggunakan `transform: scale()`
    - Tambahkan `cursor: pointer` pada `.social-card`
    - Tambahkan `transition` untuk animasi hover yang halus
    - _Requirements: 5.1, 5.2_

- [ ] 6. Wiring dan integrasi akhir
  - [~] 6.1 Hubungkan semua komponen di `index.html` dan `app.js`
    - Pastikan `profileData` digunakan untuk mengisi konten Profile Card secara dinamis (atau konten HTML statis sudah sesuai dengan data)
    - Verifikasi bahwa semua path aset (avatar, ikon SVG) sudah benar secara relatif
    - Pastikan script diload dengan benar di akhir `<body>` atau dengan atribut `defer`
    - Verifikasi bahwa guard `if (container)` berfungsi dengan benar
    - _Requirements: 1.1, 1.2, 1.3, 2.1, 3.1, 3.2, 3.3_

  - [ ]* 6.2 Tulis integration tests untuk alur rendering end-to-end
    - Simulasikan loading DOM lengkap dan eksekusi `DOMContentLoaded`
    - Assert bahwa kartu dengan URL valid muncul dan kartu dengan URL kosong tidak muncul
    - _Requirements: 2.1, 3.1, 3.2, 3.3_

- [~] 7. Final Checkpoint — Pastikan semua tests lulus
  - Pastikan semua tests lulus, tanyakan kepada user jika ada pertanyaan.

## Notes

- Task yang diakhiri `*` bersifat opsional dan dapat dilewati untuk MVP yang lebih cepat
- Setiap task mereferensikan requirement spesifik untuk keterlacakan
- Checkpoint memastikan validasi inkremental di setiap fase
- Property tests memvalidasi property korektnes universal (Property 1, 2, 3) menggunakan `fast-check`
- Unit tests memvalidasi contoh dan edge case spesifik
- Seluruh implementasi menggunakan HTML, CSS, dan JavaScript vanilla tanpa framework
- `renderSocialCards` harus di-export agar dapat diuji secara terisolasi oleh Jest

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["2.1", "2.2"] },
    { "id": 1, "tasks": ["3.1", "5.1"] },
    { "id": 2, "tasks": ["3.2", "3.3", "3.4", "3.5", "5.2"] },
    { "id": 3, "tasks": ["5.3", "6.1"] },
    { "id": 4, "tasks": ["6.2"] }
  ]
}
```
