/**
 * Data profil pengguna.
 * @type {{ name: string, bio: string, avatar: string }}
 */
const profileData = {
  name: "Rhevan Pebrian",
  bio: "Bio singkat di sini.",
  avatar: "/home/rhevan_pebrian/Pictures/pp/eea993ee924ec698bdc0b7ac11a861cb.jpg",
};

/**
 * Daftar akun media sosial.
 * Entri dengan url kosong atau null akan disembunyikan secara otomatis.
 * Twitter/X sengaja dikosongkan untuk menguji requirement 3.3 (filter URL kosong).
 * @type {Array<{ platform: string, username: string, url: string, icon: string }>}
 */
const socialLinks = [
  { platform: "Instagram", username: "@hajii_rhevann_03", url: "https://www.instagram.com/hajii_rhevann_03?igsh=eDJnOWs2ZWd5bWNu", icon: "assets/icons/instagram.svg" },
  { platform: "GitHub",    username: "@ItsVanz", url: "https://github.com/ItsVanz",    icon: "assets/icons/github.svg"    },
  { platform: "LinkedIn",  username: "@username", url: "https://linkedin.com/in/username", icon: "assets/icons/linkedin.svg" },
  { platform: "Twitter/X", username: "@username", url: "",                               icon: "assets/icons/twitter.svg"   },
];

/**
 * Memfilter entri tanpa URL lalu merender Social_Media_Card ke dalam container.
 * @param {Array<{ platform: string, username: string, url: string, icon: string }>} links
 * @param {HTMLElement} container
 */
function renderSocialCards(links, container) {
  const validLinks = links.filter(link => link.url && link.url.trim() !== "");
  container.innerHTML = validLinks
    .map(link => `<a href="${link.url}" target="_blank" rel="noopener noreferrer" class="social-card" aria-label="Kunjungi profil ${link.platform} saya">
        <img src="${link.icon}" alt="${link.platform} icon" class="social-icon" />
        <div class="social-info">
          <span class="social-platform">${link.platform}</span>
          <span class="social-username">${link.username}</span>
        </div>
      </a>`)
    .join("");
}

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("social-cards");
  if (container) {
    renderSocialCards(socialLinks, container);
  }
});

// Conditional export: allows Jest/Node.js to import renderSocialCards for testing
// while the script still works as a plain browser script
if (typeof module !== "undefined" && module.exports) {
  module.exports = { renderSocialCards };
}
