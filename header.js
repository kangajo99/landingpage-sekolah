class NavigasiSekolah extends HTMLElement {
  connectedCallback() {
    const basisPath = this.getAttribute("path") || "";

    this.innerHTML = `
        <header class="bg-white/95 backdrop-blur-md shadow-xs sticky top-0 z-50 border-b border-slate-100">
            <div class="container mx-auto px-4 lg:px-8 h-20 flex items-center justify-between">
                
                <!-- Logo Sekolah -->
                <a href="${basisPath}index.html" class="flex items-center gap-2">
                    <img src="${basisPath}images/logo.png" alt="Logo Sekolah" class="h-14 w-auto object-contain mix-blend-multiply" loading="lazy">
                    <span class="text-2xl font-black text-emerald-700 tracking-tight">SEKOLAHKU</span>
                </a>

                <!-- Tombol Menu Hamburger (Mobile) -->
                <button id="menu-btn" type="button" class="block lg:hidden text-slate-800 focus:outline-none p-2 rounded-lg hover:bg-slate-100 transition cursor-pointer relative z-50" aria-label="Toggle Menu">
                    <i data-lucide="menu" class="w-6 h-6"></i>
                </button>

                <!-- Menu Navigasi (Mulai awal kita set display block di layar lebar lewat lg:flex, tapi di HP dikontrol style inline) -->
                <nav id="menu" class="absolute lg:static top-20 left-0 w-full lg:w-auto bg-white lg:bg-transparent shadow-lg lg:shadow-none lg:flex items-center transition-all duration-300 z-40" style="display: none;">
                    <ul class="flex flex-col lg:flex-row lg:items-center lg:gap-x-7 p-6 lg:p-0 font-semibold text-slate-600 text-sm tracking-wide">
                        <li><a class="block py-2 lg:py-0 hover:text-emerald-600 transition" href="${basisPath}index.html#home">Beranda</a></li>
                        
                        <!-- Dropdown Profil Sekolah -->
                        <li class="relative dropdown-item">
                            <button type="button" class="dropdown-trigger flex items-center gap-1 w-full text-left py-2 lg:py-0 hover:text-emerald-600 transition cursor-pointer">
                                Profil Sekolah 
                                <i data-lucide="chevron-down" class="w-4 h-4 ic-panah transition duration-200"></i>
                            </button>
                            <div class="dropdown-menu static lg:absolute lg:top-full lg:left-0 w-full lg:w-48 bg-white lg:shadow-xl lg:rounded-xl p-2 transition z-50 border-0 lg:border border-slate-100" style="display: none;">
                                <a class="block px-4 py-2 text-xs hover:bg-emerald-50 hover:text-emerald-700 rounded-lg transition" href="${basisPath}profil.html">Tentang Kami</a>
                                <a class="block px-4 py-2 text-xs hover:bg-emerald-50 hover:text-emerald-700 rounded-lg transition" href="${basisPath}fasilitas.html">Fasilitas</a>
                                <a class="block px-4 py-2 text-xs hover:bg-emerald-50 hover:text-emerald-700 rounded-lg transition" href="${basisPath}guru.html">Guru &amp; Staff</a>
                                <a class="block px-4 py-2 text-xs hover:bg-emerald-50 hover:text-emerald-700 rounded-lg transition" href="${basisPath}galeri.html">Galeri Foto</a>
                            </div>
                        </li>

                        <!-- Dropdown Akademik -->
                        <li class="relative dropdown-item">
                            <button type="button" class="dropdown-trigger flex items-center gap-1 w-full text-left py-2 lg:py-0 hover:text-emerald-600 transition cursor-pointer">
                                Akademik
                                <i data-lucide="chevron-down" class="w-4 h-4 ic-panah transition duration-200"></i>
                            </button>
                            <div class="dropdown-menu static lg:absolute lg:top-full lg:left-0 w-full lg:w-48 bg-white lg:shadow-xl lg:rounded-xl p-2 transition z-50 border-0 lg:border border-slate-100" style="display: none;">
                                <a class="block px-4 py-2 text-xs hover:bg-emerald-50 hover:text-emerald-700 rounded-lg transition" href="${basisPath}program.html">Program Pendidikan</a>
                                <a class="block px-4 py-2 text-xs hover:bg-emerald-50 hover:text-emerald-700 rounded-lg transition" href="${basisPath}prestasi.html">Prestasi Siswa</a>
                            </div>
                        </li>

                        <li><a class="block py-2 lg:py-0 hover:text-emerald-600 transition" href="${basisPath}index.html#kontak-detail">Hubungi Kami</a></li>
                        
                        <li class="mt-4 lg:mt-0">
                            <a class="block text-center bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl transition shadow-xs font-bold animate-pulse" href="${basisPath}index.html#pendaftaran">
                                Daftar PPDB Online
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
        `;

    setTimeout(() => {
      this.inisialisasiLogikaMekanik();
    }, 0);
  }

  inisialisasiLogikaMekanik() {
    const menuBtn = this.querySelector("#menu-btn");
    const menuNav = this.querySelector("#menu");
    const dropdowns = this.querySelectorAll(".dropdown-item");

    // Fungsi bantu untuk mereset display berdasarkan ukuran layar laptop vs HP
    const sesuaikanTampilanMenu = () => {
      if (window.innerWidth >= 1024) {
        menuNav.style.display = "flex"; // Paksa jadi flex di desktop
      } else {
        menuNav.style.display = "none"; // Sembunyikan default di HP
      }
    };

    // Jalankan saat awal render halaman
    sesuaikanTampilanMenu();
    // Jalankan otomatis jika user mengubah ukuran browser dari laptop ke HP atau sebaliknya
    window.addEventListener("resize", sesuaikanTampilanMenu);

    // 1. Logika Klik Menu Hamburger HP (Menggunakan style.display murni JavaScript)
    if (menuBtn && menuNav) {
      menuBtn.onclick = function (e) {
        e.stopPropagation();
        if (menuNav.style.display === "none" || menuNav.style.display === "") {
          menuNav.style.display = "block";
        } else {
          menuNav.style.display = "none";
        }
      };
    }

    // 2. Logika Sistem Klik Dropdown Android & Laptop
    dropdowns.forEach((item) => {
      const trigger = item.querySelector(".dropdown-trigger");
      const targetMenu = item.querySelector(".dropdown-menu");
      const panah = item.querySelector(".ic-panah");

      if (trigger && targetMenu) {
        trigger.onclick = function (e) {
          e.stopPropagation();

          dropdowns.forEach((otherItem) => {
            if (otherItem !== item) {
              otherItem.querySelector(".dropdown-menu").style.display = "none";
              const otherPanah = otherItem.querySelector(".ic-panah");
              if (otherPanah) otherPanah.style.transform = "rotate(0deg)";
            }
          });

          if (
            targetMenu.style.display === "none" ||
            targetMenu.style.display === ""
          ) {
            targetMenu.style.display = "block";
            if (panah) panah.style.transform = "rotate(180deg)";
          } else {
            targetMenu.style.display = "none";
            if (panah) panah.style.transform = "rotate(0deg)";
          }
        };
      }
    });

    // 3. Klik di area luar untuk menutup semua menu otomatis
    document.addEventListener("click", () => {
      dropdowns.forEach((item) => {
        const m = item.querySelector(".dropdown-menu");
        if (m) m.style.display = "none";
        const panah = item.querySelector(".ic-panah");
        if (panah) panah.style.transform = "rotate(0deg)";
      });
      if (window.innerWidth < 1024 && menuNav) {
        menuNav.style.display = "none";
      }
    });

    // Gambar ulang ikon lucide khusus di dalam menu header
    if (typeof lucide !== "undefined") {
      lucide.createIcons();
    }
  }
}

customElements.define("menu-header", NavigasiSekolah);
