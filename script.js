// Neo-brutalist interactions and animations
document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    initNavHighlight();
    initBookHoverEffects();
    initParallaxEffects();
});

// Intersection Observer for scroll animations
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');

                // Stagger children animations
                const children = entry.target.querySelectorAll('.stagger-child');
                children.forEach((child, index) => {
                    child.style.animationDelay = `${index * 0.1}s`;
                    child.classList.add('animate-in');
                });
            }
        });
    }, observerOptions);

    // Observe sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.add('animate-target');
        observer.observe(section);
    });

    // Add stagger-child class to timeline items
    document.querySelectorAll('.timeline-item').forEach(item => {
        item.classList.add('stagger-child');
    });

    document.querySelectorAll('.philosophy-card').forEach(card => {
        card.classList.add('stagger-child');
    });

    document.querySelectorAll('.interest-card').forEach(card => {
        card.classList.add('stagger-child');
    });
}

// Highlight active nav link based on scroll position
function initNavHighlight() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');

    const observerOptions = {
        root: null,
        rootMargin: '-50% 0px -50% 0px',
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

    // Add active styles
    const style = document.createElement('style');
    style.textContent = `
        .nav-link.active {
            background: var(--base02);
            color: var(--base3);
        }

        .animate-target {
            opacity: 0;
            transform: translateY(40px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }

        .animate-target.animate-in {
            opacity: 1;
            transform: translateY(0);
        }

        .stagger-child {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.5s ease, transform 0.5s ease;
        }

        .stagger-child.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
}

// Book hover effects with tilt
function initBookHoverEffects() {
    const books = document.querySelectorAll('.book');

    books.forEach(book => {
        book.addEventListener('mouseenter', (e) => {
            const randomRotation = (Math.random() - 0.5) * 10;
            e.target.style.transform = `translateY(-12px) rotate(${randomRotation}deg)`;
        });

        book.addEventListener('mouseleave', (e) => {
            e.target.style.transform = '';
        });
    });
}

// Subtle parallax effects
function initParallaxEffects() {
    const codeBlock = document.querySelector('.code-block');

    if (codeBlock) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.1;

            if (scrolled < window.innerHeight) {
                codeBlock.style.transform = `rotate(1deg) translateY(${rate}px)`;
            }
        }, { passive: true });
    }

    // Add mouse move effect on hero
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;

            const xPos = (clientX / innerWidth - 0.5) * 10;
            const yPos = (clientY / innerHeight - 0.5) * 10;

            if (codeBlock) {
                codeBlock.style.transform = `rotate(${1 + xPos * 0.2}deg) translate(${xPos}px, ${yPos}px)`;
            }
        });
    }
}

// Smooth scroll for nav links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            const navHeight = document.querySelector('.nav').offsetHeight;
            const targetPosition = targetElement.offsetTop - navHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Add brutalist hover sound effect (optional - commented out by default)
/*
function initHoverSounds() {
    const hoverElements = document.querySelectorAll('.stat-box, .link-box, .philosophy-card, .interest-card');

    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            const audio = new Audio('data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU...');
            audio.volume = 0.1;
            audio.play().catch(() => {});
        });
    });
}
*/

// Console easter egg
console.log(`
%c
  ____        _               _      ____                  _
 |  _ \\ ___  | |__   ___ _ __| |_   / ___| ___  _ __   ___| | __
 | |_) / _ \\ | '_ \\ / _ \\ '__| __| | |  _ / _ \\| '_ \\ / _ \\ |/ /
 |  _ < (_) || |_) |  __/ |  | |_  | |_| | (_) | | | |  __/   <
 |_| \\_\\___/ |_.__/ \\___|_|   \\__|  \\____|\\___/|_| |_|\\___|_|\\_\\

`, 'font-family: monospace; color: #cb4b16;');

console.log('%c Senior .NET Engineer | AI-Augmented Developer', 'color: #268bd2; font-size: 14px;');
console.log('%c Always leaving code better than I found it.', 'color: #859900; font-style: italic;');
