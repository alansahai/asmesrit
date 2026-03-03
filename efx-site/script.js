// ASME EFx SRIT 2026 - JavaScript Functionality

// Hide loading screen when page is fully loaded
window.addEventListener('load', function() {
    const loadingScreen = document.querySelector('.loading-screen');
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
    }, 500);
});

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // COUNTDOWN TIMER
    // ========================================
    function initCountdown() {
        const eventDate = new Date('February 14, 2026 08:00:00 GMT+05:30').getTime();
        
        function updateCountdown() {
            const now = new Date().getTime();
            const distance = eventDate - now;
            
            if (distance < 0) {
                document.getElementById('countdown').innerHTML = '<p class="countdown-ended">Event is Live!</p>';
                return;
            }
            
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            document.getElementById('days').textContent = String(days).padStart(2, '0');
            document.getElementById('hours').textContent = String(hours).padStart(2, '0');
            document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
            document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
        }
        
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }
    
    // ========================================
    // MOBILE NAVIGATION
    // ========================================
    function initMobileNav() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');
        
        if (hamburger) {
            hamburger.addEventListener('click', function() {
                navMenu.classList.toggle('active');
                hamburger.classList.toggle('active');
            });
            
            // Close menu when clicking on a link
            navLinks.forEach(link => {
                link.addEventListener('click', function() {
                    navMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                });
            });
        }
    }
    
    // ========================================
    // SMOOTH SCROLLING
    // ========================================
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                
                if (target) {
                    const navbarHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = target.offsetTop - navbarHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // ========================================
    // NAVBAR SCROLL EFFECT
    // ========================================
    function initNavbarScroll() {
        const navbar = document.querySelector('.navbar');
        let lastScroll = 0;
        
        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 100) {
                navbar.style.background = 'rgba(10, 10, 15, 0.98)';
                navbar.style.boxShadow = '0 5px 20px rgba(0, 240, 255, 0.1)';
            } else {
                navbar.style.background = 'rgba(10, 10, 15, 0.95)';
                navbar.style.boxShadow = 'none';
            }
            
            lastScroll = currentScroll;
        });
    }
    
    // ========================================
    // ACTIVE LINK HIGHLIGHTING
    // ========================================
    function initActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        window.addEventListener('scroll', function() {
            let current = '';
            const scrollPosition = window.pageYOffset;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (scrollPosition >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }
    
    // ========================================
    // CONTACT FORM HANDLING
    // ========================================
    function initContactForm() {
        const form = document.getElementById('contactForm');
        
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Get form data
                const formData = new FormData(form);
                const data = Object.fromEntries(formData);
                
                // Here you would typically send the data to a server
                // For now, we'll just show a success message
                alert('Thank you for your message! We will get back to you soon.');
                
                // Reset form
                form.reset();
            });
        }
    }
    
    // ========================================
    // SCROLL ANIMATIONS
    // ========================================
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        // Observe elements
        const animateElements = document.querySelectorAll('.feature-card, .event-card, .gallery-item, .contact-item');
        
        animateElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }
    
    // ========================================
    // GALLERY MODAL (Optional Enhancement)
    // ========================================
    function initGalleryModal() {
        const galleryItems = document.querySelectorAll('.gallery-item');
        
        galleryItems.forEach(item => {
            item.addEventListener('click', function() {
                const img = this.querySelector('img');
                const title = this.querySelector('h3').textContent || '';
                const description = this.querySelector('p').textContent || '';
                
                // Create modal
                const modal = document.createElement('div');
                modal.className = 'gallery-modal';
                modal.innerHTML = `
                    <div class="modal-overlay"></div>
                    <div class="modal-content">
                        <button class="modal-close">&times;</button>
                        <img src="${img.src}" alt="${title}">
                        <div class="modal-info">
                            <h3>${title}</h3>
                            <p>${description}</p>
                        </div>
                    </div>
                `;
                
                document.body.appendChild(modal);
                
                // Add styles
                modal.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 9999;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                `;
                
                // Close modal
                const closeModal = () => {
                    modal.remove();
                    document.body.style.overflow = 'auto'
                };
                
                modal.querySelector('.modal-close').addEventListener('click', closeModal);
                modal.querySelector('.modal-overlay').addEventListener('click', closeModal);
                
                // Prevent body scroll
                document.body.style.overflow = 'hidden';
                modal.addEventListener('click', () => {
                    document.body.style.overflow = 'auto';
                });
            });
        });
    }
    
    // ========================================
    // PARALLAX EFFECT (Optional Enhancement)
    // ========================================
    function initParallax() {
        const heroGrid = document.querySelector('.hero-grid');
        
        if (heroGrid) {
            window.addEventListener('scroll', function() {
                const scrolled = window.pageYOffset;
                const parallax = scrolled * 0.5;
                heroGrid.style.transform = `translateY(${parallax}px)`;
            });
        }
    }
    
    // ========================================
    // COPY TO CLIPBOARD (For contact info)
    // ========================================
    function initCopyToClipboard() {
        const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
        const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
        
        [...emailLinks, ...phoneLinks].forEach(link => {
            link.addEventListener('contextmenu', function(e) {
                e.preventDefault();
                const text = this.textContent;
                navigator.clipboard.writeText(text).then(() => {
                    // Show tooltip
                    const tooltip = document.createElement('span');
                    tooltip.textContent = 'Copied!';
                    tooltip.style.cssText = `
                        position: absolute;
                        background: var(--neon-cyan);
                        color: var(--bg-primary);
                        padding: 5px 10px;
                        border-radius: 5px;
                        font-size: 12px;
                        margin-left: 10px;
                    `;
                    this.parentElement.appendChild(tooltip);
                    setTimeout(() => tooltip.remove(), 2000);
                });
            });
        });
    }
    
    // ========================================
    // BACK TO TOP BUTTON
    // ========================================
    function initBackToTop() {
        // Create button
        const backToTopBtn = document.createElement('button');
        backToTopBtn.innerHTML = '↑';
        backToTopBtn.className = 'back-to-top';
        backToTopBtn.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: var(--gradient-primary);
            border: none;
            border-radius: 50%;
            color: white;
            font-size: 24px;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 999;
            box-shadow: 0 0 20px rgba(0, 240, 255, 0.3);
        `;
        
        document.body.appendChild(backToTopBtn);
        
        // Show/hide on scroll
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 500) {
                backToTopBtn.style.opacity = '1';
                backToTopBtn.style.visibility = 'visible';
            } else {
                backToTopBtn.style.opacity = '0';
                backToTopBtn.style.visibility = 'hidden';
            }
        });
        
        // Scroll to top on click
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Hover effect
        backToTopBtn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 0 30px rgba(0, 240, 255, 0.5)';
        });
        
        backToTopBtn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 0 20px rgba(0, 240, 255, 0.3)';
        });
    }
    
    // ========================================
    // INITIALIZE ALL FUNCTIONS
    // ========================================
    initCountdown();
    initMobileNav();
    initSmoothScroll();
    initNavbarScroll();
    initActiveLink();
    initContactForm();
    initScrollAnimations();
    initGalleryModal();
    initParallax();
    initCopyToClipboard();
    initBackToTop();
    
    // ========================================
    // PERFORMANCE OPTIMIZATION
    // ========================================
    
    // Lazy load images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[loading="lazy"]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Console Easter Egg
    console.log('%c🚀 ASME EFx SRIT 2026', 'color: #00f0ff; font-size: 24px; font-weight: bold;');
    console.log('%cWelcome to the future of engineering!', 'color: #ff00aa; font-size: 16px;');
    console.log('%cInterested in web development? Contact us at asme@sritcbe.ac.in', 'color: #00ff88; font-size: 14px;');
});

// ========================================
// EXTERNAL LINK HANDLER
// ========================================
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'A' && e.target.hostname !== window.location.hostname) {
        e.target.setAttribute('rel', 'noopener noreferrer');
    }
});

// ========================================
// PREVENT CONTEXT MENU ON IMAGES (Optional)
// ========================================
document.addEventListener('contextmenu', function(e) {
    if (e.target.tagName === 'IMG') {
        // Uncomment to prevent right-click on images
        // e.preventDefault();
    }
});