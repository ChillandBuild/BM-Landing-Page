/**
 * Bloom Matrix - Core JavaScript
 * Handles Smooth Scrolling, Animations, Custom Cursor, and Canvas effects
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Init Lenis (Smooth Scroll) ---
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // --- 2. Custom Cursor & Magnetic Elements ---
    const cursor = document.querySelector('.custom-cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    const magnetics = document.querySelectorAll('.magnetic');

    // Hide default cursor globally
    document.body.style.cursor = 'none';

    document.addEventListener('mousemove', (e) => {
        // Direct cursor
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0,
            ease: "none"
        });
        
        // Follower (delayed)
        gsap.to(cursorFollower, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.6,
            ease: "power3.out"
        });
    });

    // Magnetic button effect
    magnetics.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const h = rect.width / 2;
            
            const x = e.clientX - rect.left - h;
            const y = e.clientY - rect.top - h;

            gsap.to(btn, {
                x: x * 0.3,
                y: y * 0.3,
                duration: 0.4,
                ease: "power2.out"
            });
            cursorFollower.classList.add('hover-active');
        });

        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, {
                x: 0,
                y: 0,
                duration: 0.7,
                ease: "elastic.out(1, 0.3)"
            });
            cursorFollower.classList.remove('hover-active');
        });
    });

    // --- 3. Theme Toggle ---
    const themeBtn = document.getElementById('theme-toggle');
    const body = document.body;

    themeBtn.addEventListener('click', () => {
        if(body.classList.contains('theme-dark')) {
            body.classList.replace('theme-dark', 'theme-light');
        } else {
            body.classList.replace('theme-light', 'theme-dark');
        }
    });

    // --- 4. Navigation Scroll Effect & Mobile Menu ---
    const nav = document.querySelector('.main-nav');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    lenis.on('scroll', (e) => {
        if(e.animatedScroll > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    if(menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
            
            // GSAP animation for mobile menu items
            if(navLinks.classList.contains('active')) {
                gsap.fromTo(navLinks.children, 
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, stagger: 0.1, duration: 0.4, ease: "power2.out" }
                );
            }
        });
    }

    // SPA Navigation links setup for Lenis
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            // Close mobile menu if open
            if(navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
            }

            lenis.scrollTo(targetId, { offset: -80 });
        });
    });

    // --- 5. Canvas Animation (AI Network) ---
    const canvas = document.getElementById('hero-canvas');
    if(canvas) {
        const ctx = canvas.getContext('2d');
        let width, height;
        let particles = [];

        function resize() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        }
        window.addEventListener('resize', resize);
        resize();

        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.radius = Math.random() * 2;
            }
            update() {
                this.x += this.vx;
                this.y += this.vy;
                if(this.x < 0 || this.x > width) this.vx *= -1;
                if(this.y < 0 || this.y > height) this.vy *= -1;
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = document.body.classList.contains('theme-light') ? 'rgba(2, 132, 199, 0.5)' : 'rgba(0, 240, 255, 0.5)';
                ctx.fill();
            }
        }

        for(let i = 0; i < 80; i++) particles.push(new Particle());

        function animateCanvas() {
            ctx.clearRect(0, 0, width, height);
            
            for(let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
                
                for(let j = i; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    
                    if(dist < 150) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = document.body.classList.contains('theme-light') ? `rgba(2, 132, 199, ${1 - dist/150})` : `rgba(0, 240, 255, ${0.1 * (1 - dist/150)})`;
                        ctx.stroke();
                    }
                }
            }
            requestAnimationFrame(animateCanvas);
        }
        animateCanvas();
    }

    // --- 6. GSAP ScrollTrigger Animations ---
    gsap.registerPlugin(ScrollTrigger);

    // Hero Animation Setup
    const heroTl = gsap.timeline();
    
    heroTl.from(".hero-title .word", {
        y: "120%",
        duration: 1.2,
        stagger: 0.1,
        ease: "power4.out",
        delay: 0.2
    })
    .to(".hero-subtitle", {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out"
    }, "-=0.8")
    .to(".hero-actions", {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out"
    }, "-=0.6")
    .to(".scroll-indicator", {
        opacity: 1,
        duration: 1
    }, "-=0.5");

    // Section Headers Reveal
    gsap.utils.toArray('.section-header').forEach(header => {
        gsap.from(header, {
            scrollTrigger: {
                trigger: header,
                start: "top 80%",
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        });
    });

    // About Section Parallax & Reveal
    gsap.from('.about-text p', {
        scrollTrigger: {
            trigger: '.about-grid',
            start: "top 75%",
        },
        y: 30,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out"
    });

    gsap.from('.about-visual', {
        scrollTrigger: {
            trigger: '.about-grid',
            start: "top 75%",
        },
        x: 50,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out"
    });

    // Services Cards Stagger
    gsap.from('.service-card', {
        scrollTrigger: {
            trigger: '.services-grid',
            start: "top 80%",
        },
        y: 50,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "back.out(1.7)"
    });

    // Product Dashboard Animation
    const prodTl = gsap.timeline({
        scrollTrigger: {
            trigger: '.product-showcase',
            start: "top 70%",
        }
    });

    prodTl.from('.product-info > *', {
        x: -50,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out"
    })
    .from('.dashboard-mockup', {
        scale: 0.9,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    }, "-=0.5");

    // Solutions Cards Reveal
    gsap.from('.solution-card', {
        scrollTrigger: {
            trigger: '.solutions-grid',
            start: "top 80%",
        },
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out"
    });

    // Process Timeline Reveal
    gsap.from('.process-step', {
        scrollTrigger: {
            trigger: '.process-timeline',
            start: "top 75%",
        },
        x: -40,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "power3.out"
    });

    // Case Studies Reveal
    gsap.from('.case-card', {
        scrollTrigger: {
            trigger: '.case-study-grid',
            start: "top 75%",
        },
        y: 50,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "power3.out"
    });

    // Tech Ecosystem Orbit Entrance
    gsap.from('.tech-ecosystem', {
        scrollTrigger: {
            trigger: '.tech-ecosystem',
            start: "top 80%",
        },
        scale: 0.8,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out"
    });

});
