/* ============================================
   NEO-BRUTALIST PERSONAL PAGE
   JavaScript Interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    initSmoothScroll();
    initNavHighlight();
});

/* ============================================
   SCROLL ANIMATIONS
   ============================================ */

function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Stagger children animations
                const children = entry.target.querySelectorAll('.stagger-child');
                children.forEach((child, index) => {
                    child.style.transitionDelay = `${index * 0.1}s`;
                    child.classList.add('visible');
                });
            }
        });
    }, observerOptions);

    // Add animation classes and observe
    const animatedElements = document.querySelectorAll(
        '.about-card, .philosophy-card, .timeline-item, .book-card, .hobby-card, .contact-link'
    );

    animatedElements.forEach((el, index) => {
        el.classList.add('fade-in');
        el.style.transitionDelay = `${(index % 4) * 0.1}s`;
        observer.observe(el);
    });

    // Section labels
    document.querySelectorAll('.section-label').forEach(label => {
        label.classList.add('slide-in-left');
        observer.observe(label);
    });

    // Philosophy statement
    const statement = document.querySelector('.philosophy-statement');
    if (statement) {
        statement.classList.add('fade-in');
        observer.observe(statement);
    }
}

/* ============================================
   SMOOTH SCROLL
   ============================================ */

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const navHeight = document.querySelector('.nav').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ============================================
   NAV HIGHLIGHT
   ============================================ */

function initNavHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -80% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));

    // Add active styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        .nav-link.active {
            background-color: var(--yellow);
            transform: translate(-2px, -2px);
            box-shadow: var(--shadow-sm);
        }
    `;
    document.head.appendChild(style);
}


/* ============================================
   EASTER EGG: Konami Code
   ============================================ */

const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            activateEasterEgg();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function activateEasterEgg() {
    document.body.style.transition = 'filter 0.5s ease';
    document.body.style.filter = 'hue-rotate(180deg)';

    setTimeout(() => {
        document.body.style.filter = 'hue-rotate(0deg)';
    }, 3000);

    // Show a fun message
    const message = document.createElement('div');
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: var(--yellow);
        border: 4px solid var(--black);
        padding: 2rem;
        font-family: var(--font-display);
        font-size: 1.5rem;
        z-index: 10000;
        box-shadow: 8px 8px 0 var(--black);
        animation: popIn 0.3s ease;
    `;
    message.textContent = 'YOU FOUND THE SECRET!';
    document.body.appendChild(message);

    const popStyle = document.createElement('style');
    popStyle.textContent = `
        @keyframes popIn {
            0% { transform: translate(-50%, -50%) scale(0); }
            80% { transform: translate(-50%, -50%) scale(1.1); }
            100% { transform: translate(-50%, -50%) scale(1); }
        }
    `;
    document.head.appendChild(popStyle);

    setTimeout(() => {
        message.remove();
    }, 2000);
}

/* ============================================
   CURSOR TRAIL (subtle)
   ============================================ */

let mouseX = 0;
let mouseY = 0;
let trailElements = [];
const trailCount = 5;

// Only enable on larger screens
if (window.innerWidth > 1024) {
    for (let i = 0; i < trailCount; i++) {
        const trail = document.createElement('div');
        trail.style.cssText = `
            position: fixed;
            width: ${10 - i * 1.5}px;
            height: ${10 - i * 1.5}px;
            background: var(--yellow);
            border: 2px solid var(--black);
            pointer-events: none;
            z-index: 9998;
            opacity: ${1 - i * 0.2};
            transition: transform ${0.1 + i * 0.05}s ease;
        `;
        document.body.appendChild(trail);
        trailElements.push(trail);
    }

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        trailElements.forEach((trail, index) => {
            setTimeout(() => {
                trail.style.transform = `translate(${mouseX - 5}px, ${mouseY - 5}px)`;
            }, index * 30);
        });
    });
}

/* ============================================
   TYPING EFFECT FOR HERO (optional enhancement)
   ============================================ */

// Could be enabled for a more dynamic feel
// Currently disabled to maintain the bold static design
