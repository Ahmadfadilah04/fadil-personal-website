document.addEventListener('DOMContentLoaded', function() {

    // ===================================================================
    // BAGIAN FUNGSI-FUNGSI
    // ===================================================================

    /**
     * Memuat komponen Navbar dan Footer dari file eksternal.
     */
    const loadComponents = () => {
        const load = (url, placeholderId) => {
            fetch(url)
                .then(response => response.ok ? response.text() : Promise.reject(`Error: ${response.status}`))
                .then(data => {
                    const placeholder = document.getElementById(placeholderId);
                    if (placeholder) {
                        placeholder.innerHTML = data;
                        if (placeholderId === 'navbar-placeholder') {
                            initHamburgerMenu(); // Jalankan script hamburger SETELAH navbar ada
                        }
                    }
                })
                .catch(error => console.error(`Failed to load ${url}:`, error));
        };
        load('navbar.html', 'navbar-placeholder');
        load('footer.html', 'footer-placeholder');
    };

    /**
     * Inisialisasi fungsionalitas menu hamburger.
     */
    const initHamburgerMenu = () => {
        const hamburger = document.querySelector('.hamburger-menu');
        const navLinks = document.querySelector('.nav-links');
        if (hamburger && navLinks) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navLinks.classList.toggle('active');
            });
        }
    };

    /**
     * Inisialisasi background partikel bergerak.
     */
    const initParticles = () => {
        if (document.getElementById('particles-js')) {
            particlesJS("particles-js", { "particles": { "number": { "value": 50, "density": { "enable": true, "value_area": 800 } }, "color": { "value": "#555555" }, "shape": { "type": "circle" }, "opacity": { "value": 0.5, "random": false }, "size": { "value": 3, "random": true }, "line_linked": { "enable": true, "distance": 150, "color": "#777777", "opacity": 0.4, "width": 1 }, "move": { "enable": true, "speed": 2, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false } }, "interactivity": { "detect_on": "canvas", "events": { "onhover": { "enable": true, "mode": "grab" }, "onclick": { "enable": true, "mode": "push" }, "resize": true }, "modes": { "grab": { "distance": 140, "line_linked": { "opacity": 1 } }, "push": { "particles_nb": 4 } } }, "retina_detect": true });
        }
    };

    /**
     * Inisialisasi efek elemen muncul saat di-scroll.
     */
    const initScrollReveal = () => {
        const revealElements = document.querySelectorAll('.reveal');
        if (revealElements.length === 0) return;
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        revealElements.forEach(element => observer.observe(element));
    };
    
    /**
     * Fungsi untuk efek auto-scroll (marquee).
     * Menggandakan konten di dalam slider agar animasinya seamless.
     */
    const initMarquee = (containerSelector) => {
        const marqueeContainer = document.querySelector(containerSelector);
        if (!marqueeContainer) return;

        const wrapper = marqueeContainer.querySelector('.slider-wrapper');
        const items = wrapper.querySelectorAll('.slide');
        
        // Gandakan semua item untuk loop yang mulus
        if (items.length > 0) {
            items.forEach(item => {
                const clone = item.cloneNode(true);
                wrapper.appendChild(clone);
            });
        }
    };


    // ===================================================================
    // BAGIAN EKSEKUSI UTAMA
    // ===================================================================
    
    loadComponents();
    initParticles();
    initScrollReveal();
    
    // Panggil fungsi marquee untuk SEMUA slider yang perlu bergerak otomatis
    initMarquee('.portfolio-slider');        // Untuk slider di Home
    initMarquee('#graphic-design-slider'); // Untuk slider skill 1 di About Me
    initMarquee('#web-dev-slider');        // Untuk slider skill 2 di About Me

});