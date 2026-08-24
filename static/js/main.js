/* ══════════════════════════════════════════════════════
   NINA — Main JavaScript
   Splash screen, scroll animations, particles, navbar
   ══════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
    initSplashScreen();
    initScrollAnimations();
    initNavbar();
    initParticles();
    initSmoothScroll();
});

/* ══════════════════════════════════════════════════════
   SPLASH SCREEN
   Shows the animated "N" logo, then fades out
   ══════════════════════════════════════════════════════ */
function initSplashScreen() {
    const splash = document.getElementById('splash-screen');
    if (!splash) return;

    // Minimum display time for the splash (ms)
    const MIN_DISPLAY = 1800;
    const startTime = Date.now();

    function hideSplash() {
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, MIN_DISPLAY - elapsed);

        setTimeout(() => {
            splash.classList.add('splash--hidden');
            document.body.style.overflow = '';

            // Remove from DOM after transition
            splash.addEventListener('transitionend', () => {
                splash.remove();
            }, { once: true });
        }, remaining);
    }

    // Prevent scrolling while splash is visible
    document.body.style.overflow = 'hidden';

    // Hide splash when page is fully loaded
    if (document.readyState === 'complete') {
        hideSplash();
    } else {
        window.addEventListener('load', hideSplash);
    }
}

/* ══════════════════════════════════════════════════════
   SCROLL ANIMATIONS
   Elements with .animate-on-scroll fade in when visible
   ══════════════════════════════════════════════════════ */
function initScrollAnimations() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    if (!elements.length) return;

    // Use Intersection Observer for performant scroll detection
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const delay = parseInt(el.dataset.delay) || 0;

                    setTimeout(() => {
                        el.classList.add('is-visible');
                    }, delay);

                    // Stop observing once animated
                    observer.unobserve(el);
                }
            });
        },
        {
            threshold: 0.1,
            rootMargin: '0px 0px -40px 0px',
        }
    );

    elements.forEach((el) => observer.observe(el));
}

/* ══════════════════════════════════════════════════════
   NAVBAR
   Adds scrolled state and hides/shows on scroll
   ══════════════════════════════════════════════════════ */
function initNavbar() {
    const nav = document.getElementById('navbar');
    if (!nav) return;

    let lastScrollY = 0;
    let ticking = false;

    function updateNavbar() {
        const scrollY = window.scrollY;

        // Add/remove scrolled class
        if (scrollY > 60) {
            nav.classList.add('nav--scrolled');
        } else {
            nav.classList.remove('nav--scrolled');
        }

        lastScrollY = scrollY;
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    });
}

/* ══════════════════════════════════════════════════════
   PARTICLES
   Floating golden particles in the hero section
   ══════════════════════════════════════════════════════ */
function initParticles() {
    const container = document.getElementById('particles');
    if (!container) return;

    const PARTICLE_COUNT = 30;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
        createParticle(container);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.classList.add('particle');

    // Random position
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = (60 + Math.random() * 40) + '%';

    // Random size (1-3px)
    const size = 1 + Math.random() * 2;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';

    // Random animation duration and delay
    const duration = 6 + Math.random() * 10;
    const delay = Math.random() * 10;
    particle.style.animationDuration = duration + 's';
    particle.style.animationDelay = delay + 's';

    container.appendChild(particle);
}

/* ══════════════════════════════════════════════════════
   SMOOTH SCROLL
   Smooth scroll for anchor links
   ══════════════════════════════════════════════════════ */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                });
            }
        });
    });

    // Scroll hint click
    const scrollHint = document.querySelector('.hero__scroll-hint');
    if (scrollHint) {
        scrollHint.addEventListener('click', () => {
            const filters = document.querySelector('.filters') ||
                            document.querySelector('.citations');
            if (filters) {
                filters.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
}

/* ══════════════════════════════════════════════════════
   IMAGE LAZY LOADING ENHANCEMENT
   Progressive image loading with fade effect
   ══════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img[loading="lazy"]');

    images.forEach((img) => {
        // Set initial state
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease';

        if (img.complete) {
            img.style.opacity = '1';
        } else {
            img.addEventListener('load', () => {
                img.style.opacity = '1';
            });
        }
    });
});
