# Design Document: Social Media Profile Page

## Overview

Fitur ini adalah halaman web statis berbasis HTML, CSS, dan JavaScript murni (vanilla) yang berfungsi sebagai halaman profil terpusat (*link-in-bio page*). Halaman ini menampilkan identitas pemilik profil beserta daftar kartu media sosial yang dapat diklik untuk membuka profil di platform masing-masing di tab baru.

Tidak ada backend, database, atau framework JavaScript yang digunakan. Semua data profil dan media sosial dikonfigurasi secara langsung di dalam file JavaScript sebagai objek data statis, sehingga mudah dimodifikasi tanpa memerlukan pengetahuan teknis mendalam.

**Tujuan utama desain:**
- Sederhana dan ringan — hanya memerlukan browser untuk dijalankan
- Mudah dikustomisasi — data profil dan social links diubah di satu tempat
- Responsif — tampil baik di perangkat mobile maupun desktop
- Aksesibel — memenuhi praktik HTML semantik dasar

---

## Architecture

Aplikasi ini menggunakan arsitektur **Single Page Static** dengan pola **Data-Driven Rendering**:

```
┌─────────────────────────────────────────────────────┐
│                   index.html                        │
│  ┌──────────────────────────────────────────────┐   │
│  │  <head>  style.css + metadata               │   │
│  └──────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────┐   │
│  │  <body>                                      │   │
│  │    ┌────────────────┐  ┌──────────────────┐  │   │
│  │    │  Profile Card  │  │ Social Media     │  │   │
│  │    │  (static HTML) │  │ Cards Container  │  │   │
│  │    └────────────────┘  │ (rendered by JS) │  │   │
│  │                        └──────────────────┘  │   │
│  └──────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────┐   │
│  │  app.js                                      │   │
│  │  ├── profileData   (data config object)      │   │
│  │  ├── socialLinks   (array of link objects)   │   │
│  │  └── renderSocialCards()  (rendering logic)  │   │
│  └──────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────┘
```

**Alur rendering:**
1. Browser memuat `index.html`
2. `style.css` diterapkan untuk layout dan visual
3. `app.js` dieksekusi setelah DOM siap
4. `renderSocialCards()` membaca array `socialLinks`, memfilter entri dengan URL kosong/tidak ada, lalu menghasilkan elemen kartu dan menyuntikkannya ke dalam container di DOM

---

## Components and Interfaces

### 1. Profile Card

Komponen HTML statis yang menampilkan identitas pengguna.

```html
<section class="profile-card" aria-label="User profile">
  <img src="assets/avatar.jpg" alt="[Nama Pengguna]" class="avatar" />
  <h1 class="profile-name">[Nama Lengkap]</h1>
  <p class="profile-bio">[Bio Singkat]</p>
</section>
```

**Tanggung jawab:** Menampilkan foto, nama, dan bio. Data diubah langsung di HTML atau melalui objek `profileData` di `app.js`.

---

### 2. Social Media Card

Komponen yang di-render secara dinamis oleh JavaScript untuk setiap entri valid dalam `socialLinks`.

**Struktur HTML yang dihasilkan:**

```html
<a
  href="[Profile_URL]"
  target="_blank"
  rel="noopener noreferrer"
  class="social-card"
  aria-label="Kunjungi profil [Platform] saya"
>
  <img src="assets/icons/[platform].svg" alt="[Platform] icon" class="social-icon" />
  <div class="social-info">
    <span class="social-platform">[Nama Platform]</span>
    <span class="social-username">@[Username]</span>
  </div>
</a>
```

**Atribut keamanan:** `rel="noopener noreferrer"` wajib digunakan bersama `target="_blank"` untuk mencegah *tab-napping attack*.

---

### 3. Social Cards Container

Elemen HTML yang berfungsi sebagai target injeksi kartu oleh JavaScript.

```html
<main class="social-cards-container" id="social-cards" aria-label="Social media links">
  <!-- Kartu diinjeksi di sini oleh app.js -->
</main>
```

---

### 4. `app.js` — Fungsi Rendering

```javascript
/**
 * Data profil pengguna.
 * @type {{ name: string, bio: string, avatar: string }}
 */
const profileData = {
  name: "Nama Lengkap",
  bio: "Bio singkat di sini.",
  avatar: "assets/avatar.jpg",
};

/**
 * Daftar akun media sosial.
 * Entri dengan url kosong atau null akan disembunyikan secara otomatis.
 * @type {Array<{ platform: string, username: string, url: string, icon: string }>}
 */
const socialLinks = [
  { platform: "Instagram",  username: "@username", url: "https://instagram.com/username",  icon: "assets/icons/instagram.svg"  },
  { platform: "GitHub",     username: "@username", url: "https://github.com/username",     icon: "assets/icons/github.svg"     },
  { platform: "LinkedIn",   username: "@username", url: "https://linkedin.com/in/username",icon: "assets/icons/linkedin.svg"   },
  { platform: "Twitter/X",  username: "@username", url: "",                                icon: "assets/icons/twitter.svg"    },
];

/**
 * Memfilter entri tanpa URL lalu merender Social_Media_Card ke dalam container.
 * @param {Array<{ platform: string, username: string, url: string, icon: string }>} links
 * @param {HTMLElement} container
 */
function renderSocialCards(links, container) {
  const validLinks = links.filter(link => link.url && link.url.trim() !== "");
  container.innerHTML = validLinks
    .map(link => `
      <a href="${link.url}"
         target="_blank"
         rel="noopener noreferrer"
         class="social-card"
         aria-label="Kunjungi profil ${link.platform} saya">
        <img src="${link.icon}" alt="${link.platform} icon" class="social-icon" />
        <div class="social-info">
          <span class="social-platform">${link.platform}</span>
          <span class="social-username">${link.username}</span>
        </div>
      </a>
    `)
    .join("");
}

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("social-cards");
  if (container) {
    renderSocialCards(socialLinks, container);
  }
});
```

---

## Data Models

### `ProfileData`

| Field    | Tipe   | Deskripsi                              |
|----------|--------|----------------------------------------|
| `name`   | string | Nama lengkap pengguna                  |
| `bio`    | string | Bio singkat pengguna                   |
| `avatar` | string | Path relatif ke file foto profil       |

---

### `SocialLink`

| Field      | Tipe   | Deskripsi                                                  |
|------------|--------|------------------------------------------------------------|
| `platform` | string | Nama platform (contoh: "Instagram", "GitHub")              |
| `username` | string | Username pengguna di platform tersebut                     |
| `url`      | string | URL lengkap profil pengguna di platform (boleh kosong)     |
| `icon`     | string | Path relatif ke file ikon/logo platform (SVG disarankan)   |

**Aturan validitas:** Sebuah `SocialLink` dianggap valid dan akan ditampilkan hanya jika `url` bukan string kosong dan bukan `null`/`undefined`.

---

### Struktur File Proyek

```
project-root/
├── index.html
├── style.css
├── app.js
└── assets/
    ├── avatar.jpg
    └── icons/
        ├── instagram.svg
        ├── github.svg
        ├── linkedin.svg
        ├── twitter.svg
        └── ... (ikon platform lainnya)
```

---

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system — essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Hanya entri dengan URL valid yang dirender

*For any* array `socialLinks` yang berisi campuran entri dengan URL valid, URL kosong (`""`), dan URL `null`/`undefined`, fungsi `renderSocialCards` harus menghasilkan tepat sejumlah elemen `<a class="social-card">` yang sama dengan jumlah entri yang memiliki URL non-kosong — tidak lebih dan tidak kurang.

**Validates: Requirements 2.1, 3.3**

---

### Property 2: Setiap kartu memiliki atribut navigasi yang benar

*For any* `SocialLink` yang valid (URL non-kosong), elemen `<a>` yang dihasilkan harus memiliki: `href` yang sama persis dengan `url` pada data sumber, `target="_blank"`, dan atribut `rel` yang mengandung `"noopener"` — memastikan link membuka tab baru tanpa menutup halaman saat ini.

**Validates: Requirements 3.1, 3.2**

---

### Property 3: Setiap kartu menampilkan informasi lengkap platform

*For any* `SocialLink` yang valid, HTML kartu yang dihasilkan harus mengandung: nama `platform`, teks `username`, dan atribut `src` ikon yang sesuai dengan field `icon` pada data sumber — sehingga semua informasi identitas platform selalu ditampilkan lengkap.

**Validates: Requirements 2.2, 2.3, 2.4**

---

## Error Handling

| Kondisi                                     | Perilaku                                                                              |
|---------------------------------------------|---------------------------------------------------------------------------------------|
| `url` pada `SocialLink` kosong atau null    | Kartu tidak dirender sama sekali (disaring oleh `filter` sebelum rendering)           |
| File ikon platform tidak ditemukan          | Browser menampilkan alt text ikon; tampilan tetap fungsional                          |
| File foto profil tidak ditemukan            | Browser menampilkan alt text avatar; layout tidak rusak                               |
| Container `#social-cards` tidak ada di DOM  | Guard `if (container)` mencegah runtime error                                         |
| JavaScript dinonaktifkan di browser         | Kartu tidak tampil, namun Profile Card (HTML statis) tetap terlihat                   |

---

## Testing Strategy

Karena fitur ini merupakan halaman web statis berbasis HTML/CSS/JS vanilla, strategi pengujian difokuskan pada:

### Unit Tests (Jest + jsdom)

Menguji logika JavaScript secara terisolasi menggunakan Jest dengan lingkungan jsdom untuk mensimulasikan DOM.

**Cakupan yang diuji:**

1. **`renderSocialCards` — filter URL kosong** (Property 1 & 2)
   - Input: array dengan campuran URL valid dan URL kosong/null
   - Assertion: jumlah elemen yang dihasilkan sesuai jumlah URL valid

2. **`renderSocialCards` — atribut kartu** (Property 3)
   - Input: satu entri valid
   - Assertion: `href` sesuai `url`, `target="_blank"` ada, `rel` mengandung `"noopener"`

3. **`renderSocialCards` — konten teks kartu** (Property 4)
   - Input: satu entri valid dengan platform dan username tertentu
   - Assertion: teks platform dan username muncul di HTML yang dihasilkan

4. **Edge case: array kosong**
   - Input: array kosong `[]`
   - Assertion: container kosong, tidak ada error

5. **Edge case: semua URL kosong**
   - Input: array dimana semua `url` adalah `""`
   - Assertion: tidak ada kartu yang dirender

### Property-Based Tests (fast-check + Jest)

Digunakan untuk memvalidasi property yang bersifat universal di atas input yang digenerate secara acak. Setiap property test dijalankan minimal **100 iterasi**.

**Property tests yang diimplementasikan:**

| Tag                                                                       | Property yang diuji |
|---------------------------------------------------------------------------|---------------------|
| `Feature: social-media-profile-page, Property 1: valid-url-filter`       | Property 1          |
| `Feature: social-media-profile-page, Property 2: card-navigation-attrs`  | Property 2          |
| `Feature: social-media-profile-page, Property 3: card-content-complete`  | Property 3          |

**Contoh property test (fast-check):**

```javascript
import * as fc from "fast-check";
import { renderSocialCards } from "./app.js";

// Feature: social-media-profile-page, Property 1: valid-url-filter
test("hanya entri dengan URL valid yang dirender", () => {
  fc.assert(
    fc.property(
      fc.array(
        fc.record({
          platform: fc.string({ minLength: 1 }),
          username: fc.string({ minLength: 1 }),
          url: fc.oneof(fc.webUrl(), fc.constant(""), fc.constant(null)),
          icon: fc.string(),
        })
      ),
      (links) => {
        const container = document.createElement("div");
        renderSocialCards(links, container);
        const expectedCount = links.filter(l => l.url && l.url.trim() !== "").length;
        const actualCount = container.querySelectorAll(".social-card").length;
        return actualCount === expectedCount;
      }
    ),
    { numRuns: 100 }
  );
});

// Feature: social-media-profile-page, Property 2: card-navigation-attrs
test("setiap kartu memiliki atribut navigasi yang benar", () => {
  fc.assert(
    fc.property(
      fc.record({
        platform: fc.string({ minLength: 1 }),
        username: fc.string({ minLength: 1 }),
        url: fc.webUrl(),
        icon: fc.string(),
      }),
      (link) => {
        const container = document.createElement("div");
        renderSocialCards([link], container);
        const anchor = container.querySelector(".social-card");
        return (
          anchor !== null &&
          anchor.getAttribute("href") === link.url &&
          anchor.getAttribute("target") === "_blank" &&
          anchor.getAttribute("rel").includes("noopener")
        );
      }
    ),
    { numRuns: 100 }
  );
});
```

### Visual / Manual Tests

- **Responsif:** Tes manual di Chrome DevTools dengan breakpoint 375px (mobile), 768px (tablet), 1280px (desktop)
- **Hover effect:** Verifikasi visual bahwa perubahan warna/bayangan/scale muncul saat hover
- **Cursor pointer:** Verifikasi kursor berubah menjadi pointer di atas kartu
- **Link opening:** Verifikasi klik kartu membuka tab baru dan tidak menutup halaman saat ini

### Accessibility Check

- Pastikan semua elemen interaktif memiliki `aria-label` yang deskriptif
- Gunakan Lighthouse atau axe DevTools untuk audit aksesibilitas dasar
