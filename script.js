// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initLoader();
    initNavigation();
    initParticles();
    initScrollAnimations();
    initTestimonials();
    initDemo();
    initContactForm();
    initBackToTop();
    initThemeToggle();
    initMobileMenu();
    
    // GSAP Animations
    initGSAPAnimations();
});

// Loading Animation
function initLoader() {
    const loader = document.getElementById('loader');
    
    // Hide loader after page load
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
            // Remove loader from DOM after animation
            setTimeout(() => {
                loader.remove();
            }, 500);
        }, 1000);
    });
}

// Navigation Functionality
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Smooth scroll to sections
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Active nav link highlighting
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

// Mobile Menu
function initMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close menu when clicking on links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Particle Animation
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random properties
    const size = Math.random() * 4 + 1;
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    const duration = Math.random() * 20 + 10;
    const delay = Math.random() * 5;
    
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    particle.style.animationDuration = `${duration}s`;
    particle.style.animationDelay = `${delay}s`;
    
    // Random color
    const colors = ['#00D4FF', '#00FF85', '#FF007A', '#8B5CF6'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    particle.style.background = randomColor;
    particle.style.boxShadow = `0 0 10px ${randomColor}`;
    
    container.appendChild(particle);
}

// GSAP Animations
function initGSAPAnimations() {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Hero animations
    const heroTl = gsap.timeline();
    heroTl.from('.hero-title', { duration: 1, y: 50, opacity: 0, ease: 'power3.out' })
          .from('.hero-subtitle', { duration: 1, y: 30, opacity: 0, ease: 'power3.out' }, '-=0.5')
          .from('.hero-buttons', { duration: 1, y: 30, opacity: 0, ease: 'power3.out' }, '-=0.5')
          .from('.hero-visual', { duration: 1, x: 50, opacity: 0, ease: 'power3.out' }, '-=0.8');
    
    // Service cards animation
    gsap.from('.service-card', {
        duration: 0.8,
        y: 50,
        opacity: 0,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.services-grid',
            start: 'top 80%'
        }
    });
    
    // Portfolio items animation
    gsap.from('.portfolio-item', {
        duration: 0.8,
        scale: 0.8,
        opacity: 0,
        stagger: 0.15,
        ease: 'back.out(1.7)',
        scrollTrigger: {
            trigger: '.portfolio-grid',
            start: 'top 80%'
        }
    });
    
    // Feature cards animation
    gsap.from('.feature-card', {
        duration: 0.8,
        y: 30,
        opacity: 0,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.features-grid',
            start: 'top 80%'
        }
    });
    
    // Section titles animation
    gsap.from('.section-title', {
        duration: 1,
        y: 30,
        opacity: 0,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.section-title',
            start: 'top 85%'
        }
    });
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeIn 0.8s ease forwards';
            }
        });
    }, observerOptions);
    
    // Observe elements
    const animatedElements = document.querySelectorAll('.service-card, .portfolio-item, .feature-card, .testimonial-card');
    animatedElements.forEach(el => observer.observe(el));
}

// Testimonials Slider
function initTestimonials() {
    const testimonials = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prev-testimonial');
    const nextBtn = document.getElementById('next-testimonial');
    let currentTestimonial = 0;
    
    function showTestimonial(index) {
        // Hide all testimonials
        testimonials.forEach(testimonial => {
            testimonial.classList.remove('active');
        });
        
        // Remove active class from all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show current testimonial
        testimonials[index].classList.add('active');
        dots[index].classList.add('active');
    }
    
    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }
    
    function prevTestimonial() {
        currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        showTestimonial(currentTestimonial);
    }
    
    // Event listeners
    nextBtn.addEventListener('click', nextTestimonial);
    prevBtn.addEventListener('click', prevTestimonial);
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentTestimonial = index;
            showTestimonial(currentTestimonial);
        });
    });
    
    // Auto-play testimonials
    setInterval(nextTestimonial, 5000);
}

// Interactive Demo
function initDemo() {
    const demoTabs = document.querySelectorAll('.demo-tab');
    const demoPanels = document.querySelectorAll('.demo-panel');
    
    // Tab switching
    demoTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetDemo = tab.getAttribute('data-demo');
            
            // Remove active class from all tabs and panels
            demoTabs.forEach(t => t.classList.remove('active'));
            demoPanels.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding panel
            tab.classList.add('active');
            document.getElementById(`${targetDemo}-demo`).classList.add('active');
        });
    });
    
    // Bot demo functionality
    initBotDemo();
}

function initBotDemo() {
    const botInput = document.getElementById('bot-input');
    const botSend = document.getElementById('bot-send');
    const botMessages = document.getElementById('bot-messages');
    
    const botResponses = {
        'help': '🤖 I can help you with:\n• Type "services" to see our offerings\n• Type "contact" for contact info\n• Type "portfolio" to see our work',
        'services': '🚀 Our services include:\n• Landing Pages\n• Web Applications\n• Python Development\n• Telegram Bots',
        'contact': '📧 Contact us:\n• Email: hello@webstudiopro.com\n• Phone: +1 (555) 123-4567',
        'portfolio': '💼 Check out our amazing projects in the portfolio section above!',
        'hello': '👋 Hello! Welcome to WebStudio Pro. How can I help you today?',
        'hi': '👋 Hi there! I\'m here to help. Try typing "help" to see what I can do.',
        'default': '🤔 I didn\'t understand that. Try typing "help" to see available commands.'
    };
    
    function addMessage(text, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'bot-message';
        
        const messageContent = document.createElement('div');
        messageContent.className = `message ${isUser ? 'user' : 'bot'}`;
        messageContent.innerHTML = `<span>${text}</span>`;
        
        messageDiv.appendChild(messageContent);
        botMessages.appendChild(messageDiv);
        
        // Scroll to bottom
        botMessages.scrollTop = botMessages.scrollHeight;
    }
    
    function sendMessage() {
        const message = botInput.value.trim().toLowerCase();
        if (!message) return;
        
        // Add user message
        addMessage(botInput.value, true);
        
        // Clear input
        botInput.value = '';
        
        // Bot response with delay
        setTimeout(() => {
            const response = botResponses[message] || botResponses['default'];
            addMessage(response);
        }, 500);
    }
    
    // Event listeners
    botSend.addEventListener('click', sendMessage);
    botInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
}

// Contact Form
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Simulate form submission
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            submitBtn.innerHTML = '<span>Message Sent!</span><i class="fas fa-check"></i>';
            submitBtn.style.background = 'linear-gradient(135deg, #00FF85, #00D4FF)';
            
            // Reset form
            setTimeout(() => {
                contactForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
                
                // Show success message
                showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
            }, 2000);
        }, 1500);
    });
    
    // Form validation
    const inputs = contactForm.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearErrors);
    });
}

function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    
    // Remove existing errors
    clearFieldError(field);
    
    // Validation rules
    if (field.hasAttribute('required') && !value) {
        showFieldError(field, 'This field is required');
        return false;
    }
    
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showFieldError(field, 'Please enter a valid email address');
            return false;
        }
    }
    
    return true;
}

function showFieldError(field, message) {
    field.style.borderColor = '#FF007A';
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.style.color = '#FF007A';
    errorDiv.style.fontSize = '0.875rem';
    errorDiv.style.marginTop = '0.25rem';
    errorDiv.textContent = message;
    
    field.parentNode.appendChild(errorDiv);
}

function clearFieldError(field) {
    const errorDiv = field.parentNode.querySelector('.field-error');
    if (errorDiv) {
        errorDiv.remove();
    }
    field.style.borderColor = '';
}

function clearErrors(e) {
    clearFieldError(e.target);
}

// Back to Top Button
function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Theme Toggle
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Check for saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
    }
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
}

function updateThemeIcon(theme) {
    const themeToggle = document.getElementById('theme-toggle');
    const icon = themeToggle.querySelector('i');
    
    if (theme === 'light') {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
}

// Utility Functions
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 70;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#00FF85' : '#00D4FF'};
        color: #000;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        font-weight: 600;
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        max-width: 300px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remove notification after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Service card interactions
document.addEventListener('DOMContentLoaded', () => {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Portfolio item interactions
document.addEventListener('DOMContentLoaded', () => {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    portfolioItems.forEach(item => {
        const btn = item.querySelector('.portfolio-btn');
        
        btn.addEventListener('click', () => {
            showNotification('Portfolio item opened! (This would typically open a detailed view)', 'info');
        });
    });
});

// Service button interactions
document.addEventListener('DOMContentLoaded', () => {
    const serviceButtons = document.querySelectorAll('.service-btn');
    
    serviceButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const serviceCard = e.target.closest('.service-card');
            const serviceName = serviceCard.querySelector('h3').textContent;
            
            showNotification(`Learn more about ${serviceName} - Contact us for details!`, 'info');
            
            // Scroll to contact section
            setTimeout(() => {
                scrollToSection('contact');
            }, 1000);
        });
    });
});

// Consultation button
document.addEventListener('DOMContentLoaded', () => {
    const consultationBtn = document.querySelector('.consultation-btn');
    
    if (consultationBtn) {
        consultationBtn.addEventListener('click', () => {
            showNotification('Booking system would open here! Contact us directly for now.', 'info');
        });
    }
});

// Smooth scrolling for all internal links
document.addEventListener('DOMContentLoaded', () => {
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    
    internalLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    // ESC key to close mobile menu
    if (e.key === 'Escape') {
        const navMenu = document.getElementById('nav-menu');
        const navToggle = document.getElementById('nav-toggle');
        
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    }
});

// Performance optimization - Lazy loading for images
document.addEventListener('DOMContentLoaded', () => {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .lazy {
        opacity: 0;
        transition: opacity 0.3s;
    }
    
    .lazy.loaded {
        opacity: 1;
    }
`;
document.head.appendChild(style);