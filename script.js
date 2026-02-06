/**
 * Portfolio Website - JavaScript
 * Handles navigation, scroll animations, form (mailto), and interactivity
 */

// ========== DOM ELEMENTS ==========
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navbar = document.getElementById('navbar');
const contactForm = document.getElementById('contactForm');

// ========== MOBILE MENU TOGGLE ==========
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
}

document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// ========== NAVBAR SCROLL EFFECT ==========
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Active nav link based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-menu a[href="#${sectionId}"]`);
        
        if (navLink && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-menu a').forEach(a => a.classList.remove('active'));
            navLink.classList.add('active');
        }
    });
});

// ========== SCROLL ANIMATIONS (Intersection Observer) ==========
const observerOptions = {
    root: null,
    rootMargin: '0px 0px -80px 0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

// ========== TYPING EFFECT FOR HERO NAME ==========
const typingEl = document.querySelector('.typing-text');
if (typingEl) {
    const text = typingEl.textContent;
    typingEl.textContent = '';
    typingEl.style.opacity = '1';
    
    let i = 0;
    const typeSpeed = 80;
    const startDelay = 500;
    
    function type() {
        if (i < text.length) {
            typingEl.textContent += text.charAt(i);
            i++;
            setTimeout(type, typeSpeed);
        } else {
            // Blink cursor stays via CSS animation
            setTimeout(() => {
                i = 0;
                typingEl.textContent = '';
                setTimeout(type, 1500); // Pause before retyping
            }, 2000);
        }
    }
    
    setTimeout(type, startDelay);
}

// ========== DYNAMIC YEAR IN FOOTER ==========
const yearSpan = document.getElementById('year');
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

// ========== TOAST NOTIFICATION ==========
function showToast(message) {
    let toast = document.querySelector('.toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.className = 'toast';
        document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}

// ========== CONTACT FORM - WORKING WITH MAILTO ==========
// Opens user's email client with pre-filled message. Replace data-email in HTML with your email.
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = contactForm.getAttribute('data-email') || 'your.email@example.com';
        const name = contactForm.querySelector('[name="name"]').value;
        const userEmail = contactForm.querySelector('[name="email"]').value;
        const message = contactForm.querySelector('[name="message"]').value;
        
        if (email.includes('example.com')) {
            showToast(`Replace data-email in HTML with your real email!`);
        }
        
        const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
        const body = encodeURIComponent(`${message}\n\n---\nFrom: ${name}\nEmail: ${userEmail}`);
        const mailtoLink = `mailto:${email}?subject=${subject}&body=${body}`;
        
        window.location.href = mailtoLink;
        showToast(`Opening email... Thanks, ${name}!`);
        contactForm.reset();
    });
}

// ========== CV DOWNLOAD ==========
// Add cv.pdf to project folder for the link to work. When deployed, the file will be served.

// Helpful toast when clicking placeholder links
document.querySelector('.cv-github')?.addEventListener('click', (e) => {
    if (e.currentTarget.getAttribute('href').includes('YOUR_USERNAME')) {
        e.preventDefault();
        showToast('Replace YOUR_USERNAME in HTML with your GitHub username!');
    }
});

document.querySelectorAll('.project-link').forEach(link => {
    link.addEventListener('click', (e) => {
        if (e.currentTarget.getAttribute('href').includes('YOUR_USERNAME') || 
            e.currentTarget.getAttribute('href').includes('your-demo')) {
            e.preventDefault();
            showToast('Update project links in HTML with your actual URLs!');
        }
    });
});

// ========== SMOOTH SCROLL FOR ANCHOR LINKS ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});
