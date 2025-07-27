// Web Studio Landing Page - JavaScript
// Modern dark-themed interactive functionality

// Global variables
let currentTestimonial = 0;
let isMenuOpen = false;
let particleContainer;
let particles = [];

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeLoader();
    initializeNavigation();
    initializeParticles();
    initializeScrollEffects();
    initializeTestimonials();
    initializeDemoTabs();
    initializeChatDemo();
    initializeFormHandling();
    initializeThemeToggle();
    initializeBackToTop();
    initializeAnimations();
});

// Loading Animation
function initializeLoader() {
    const loader = document.getElementById('loader');
    
    // Hide loader after page load
    window.addEventListener('load', function() {
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
function initializeNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
        isMenuOpen = !isMenuOpen;
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
    });

    // Close menu when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (isMenuOpen) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
                isMenuOpen = false;
            }
        });
    });

    // Active navigation link highlighting
    window.addEventListener('scroll', updateActiveNavLink);
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Particle Animation System
function initializeParticles() {
    particleContainer = document.getElementById('particles');
    if (!particleContainer) return;

    // Create particles
    for (let i = 0; i < 50; i++) {
        createParticle();
    }

    // Animate particles
    animateParticles();
}

function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random properties
    const size = Math.random() * 4 + 2;
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    const duration = Math.random() * 3 + 3;
    
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    particle.style.animationDuration = `${duration}s`;
    
    particleContainer.appendChild(particle);
    particles.push({
        element: particle,
        x: x,
        y: y,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2
    });
}

function animateParticles() {
    particles.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Wrap around screen
        if (particle.x > window.innerWidth) particle.x = 0;
        if (particle.x < 0) particle.x = window.innerWidth;
        if (particle.y > window.innerHeight) particle.y = 0;
        if (particle.y < 0) particle.y = window.innerHeight;
        
        particle.element.style.left = `${particle.x}px`;
        particle.element.style.top = `${particle.y}px`;
    });
    
    requestAnimationFrame(animateParticles);
}

// Scroll Effects
function initializeScrollEffects() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        }
    });

    // Fade in animations on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements with fade-in animation
    document.querySelectorAll('.service-card, .portfolio-item, .feature-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Testimonials Slider
function initializeTestimonials() {
    const testimonials = document.querySelectorAll('.testimonial-item');
    const dots = document.querySelectorAll('.dot');
    
    if (testimonials.length === 0) return;

    // Auto-play testimonials
    setInterval(() => {
        changeTestimonial(1);
    }, 5000);
}

function changeTestimonial(direction) {
    const testimonials = document.querySelectorAll('.testimonial-item');
    const dots = document.querySelectorAll('.dot');
    
    if (testimonials.length === 0) return;

    // Remove active class from current testimonial
    testimonials[currentTestimonial].classList.remove('active');
    dots[currentTestimonial].classList.remove('active');

    // Calculate next testimonial
    currentTestimonial += direction;
    if (currentTestimonial >= testimonials.length) currentTestimonial = 0;
    if (currentTestimonial < 0) currentTestimonial = testimonials.length - 1;

    // Add active class to new testimonial
    testimonials[currentTestimonial].classList.add('active');
    dots[currentTestimonial].classList.add('active');
}

function currentTestimonialIndex(index) {
    const testimonials = document.querySelectorAll('.testimonial-item');
    const dots = document.querySelectorAll('.dot');
    
    if (testimonials.length === 0) return;

    // Remove active class from current testimonial
    testimonials[currentTestimonial].classList.remove('active');
    dots[currentTestimonial].classList.remove('active');

    // Set new current testimonial
    currentTestimonial = index - 1;

    // Add active class to new testimonial
    testimonials[currentTestimonial].classList.add('active');
    dots[currentTestimonial].classList.add('active');
}

// Demo Tabs Functionality
function initializeDemoTabs() {
    const demoTabs = document.querySelectorAll('.demo-tab');
    const demoPanels = document.querySelectorAll('.demo-panel');

    demoTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetDemo = this.getAttribute('onclick').match(/'([^']+)'/)[1];
            showDemo(targetDemo);
        });
    });
}

function showDemo(demoType) {
    const demoTabs = document.querySelectorAll('.demo-tab');
    const demoPanels = document.querySelectorAll('.demo-panel');

    // Remove active class from all tabs and panels
    demoTabs.forEach(tab => tab.classList.remove('active'));
    demoPanels.forEach(panel => panel.classList.remove('active'));

    // Add active class to selected tab and panel
    document.querySelector(`[onclick*="${demoType}"]`).classList.add('active');
    document.getElementById(`${demoType}-demo`).classList.add('active');
}

// Chat Demo Functionality
function initializeChatDemo() {
    const chatInput = document.getElementById('demo-input');
    if (chatInput) {
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendDemoMessage();
            }
        });
    }
}

function handleDemoInput(event) {
    if (event.key === 'Enter') {
        sendDemoMessage();
    }
}

function sendDemoMessage() {
    const input = document.getElementById('demo-input');
    const messagesContainer = document.getElementById('chat-messages');
    
    if (!input || !messagesContainer) return;
    
    const message = input.value.trim();
    if (!message) return;

    // Add user message
    addChatMessage(message, 'user');
    input.value = '';

    // Simulate bot response
    setTimeout(() => {
        const botResponse = generateBotResponse(message.toLowerCase());
        addChatMessage(botResponse, 'bot');
    }, 1000);
}

function addChatMessage(message, sender) {
    const messagesContainer = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    const now = new Date();
    const timeString = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    
    messageDiv.innerHTML = `
        <div class="message-content">${message}</div>
        <div class="message-time">${timeString}</div>
    `;
    
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function generateBotResponse(message) {
    const responses = {
        'services': 'We offer Landing Pages, Web Applications, Python Development, and Telegram Bots. Which service interests you most?',
        'portfolio': 'Check out our recent projects including e-commerce platforms, data analytics dashboards, and AI-powered bots. Would you like to see examples?',
        'contact': 'You can reach us at hello@webstudio.com or use our contact form below. We typically respond within 24 hours!',
        'price': 'Our pricing varies by project complexity. Landing pages start at $1,000, web apps from $5,000. Contact us for a custom quote!',
        'telegram': 'Our Telegram bots can handle customer support, payments, automation, and more. They integrate seamlessly with your existing systems.',
        'python': 'We build custom Python applications for data processing, automation, web scraping, and machine learning. What\'s your use case?',
        'hello': 'Hello! Welcome to WebStudio. How can I help you today? Ask about our services, portfolio, or pricing!',
        'hi': 'Hi there! I\'m here to help you learn about our web development services. What would you like to know?'
    };

    // Find matching response
    for (let key in responses) {
        if (message.includes(key)) {
            return responses[key];
        }
    }

    // Default response
    return 'That\'s interesting! For detailed information about our services, feel free to contact our team. We\'d love to discuss your project!';
}

// Form Handling
function initializeFormHandling() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }

    // Add form validation styling
    const formInputs = document.querySelectorAll('.contact-form input, .contact-form select, .contact-form textarea');
    formInputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearFieldError);
    });
}

function handleFormSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const submitButton = form.querySelector('button[type="submit"]');
    
    // Validate form
    if (!validateForm(form)) {
        return;
    }

    // Show loading state
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
    submitButton.disabled = true;

    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        // Show success message
        showNotification('Message sent successfully! We\'ll get back to you within 24 hours.', 'success');
        
        // Reset form
        form.reset();
        
        // Reset button
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
        
        // Log form data (for development)
        console.log('Form submitted:', Object.fromEntries(formData));
    }, 2000);
}

function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;

    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            showFieldError(field, 'This field is required');
            isValid = false;
        } else if (field.type === 'email' && !isValidEmail(field.value)) {
            showFieldError(field, 'Please enter a valid email address');
            isValid = false;
        }
    });

    return isValid;
}

function validateField(event) {
    const field = event.target;
    clearFieldError(field);

    if (field.required && !field.value.trim()) {
        showFieldError(field, 'This field is required');
    } else if (field.type === 'email' && field.value && !isValidEmail(field.value)) {
        showFieldError(field, 'Please enter a valid email address');
    }
}

function showFieldError(field, message) {
    clearFieldError(field);
    
    field.style.borderColor = '#FF007A';
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.style.color = '#FF007A';
    errorDiv.style.fontSize = '0.9rem';
    errorDiv.style.marginTop = '5px';
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

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Theme Toggle
function initializeThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.classList.toggle('light-theme', savedTheme === 'light');
        updateThemeIcon(savedTheme === 'light');
    }

    themeToggle.addEventListener('click', function() {
        const isLight = body.classList.toggle('light-theme');
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
        updateThemeIcon(isLight);
    });
}

function updateThemeIcon(isLight) {
    const themeToggle = document.getElementById('theme-toggle');
    const icon = themeToggle.querySelector('i');
    icon.className = isLight ? 'fas fa-moon' : 'fas fa-sun';
}

// Back to Top Button
function initializeBackToTop() {
    const backToTopButton = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Utility Functions
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

function openCalendar() {
    // Simulate opening calendar booking system
    showNotification('Calendar booking system would open here. Contact us directly for now!', 'info');
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'var(--neon-green)' : type === 'error' ? 'var(--neon-pink)' : 'var(--neon-blue)'};
        color: var(--bg-primary);
        padding: 15px 20px;
        border-radius: 10px;
        font-weight: var(--font-weight-medium);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Remove after delay
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 4000);
}

// Initialize Animations
function initializeAnimations() {
    // Typing animation for hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        animateTyping(heroTitle);
    }

    // Number counter animation
    const counters = document.querySelectorAll('[data-count]');
    counters.forEach(counter => {
        animateCounter(counter);
    });

    // Stagger animation for service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
}

function animateTyping(element) {
    const text = element.textContent;
    element.textContent = '';
    element.style.borderRight = '2px solid var(--neon-blue)';
    
    let i = 0;
    const typeInterval = setInterval(() => {
        element.textContent += text.charAt(i);
        i++;
        
        if (i >= text.length) {
            clearInterval(typeInterval);
            setTimeout(() => {
                element.style.borderRight = 'none';
            }, 1000);
        }
    }, 50);
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const timer = setInterval(() => {
                    current += increment;
                    element.textContent = Math.floor(current);
                    
                    if (current >= target) {
                        element.textContent = target;
                        clearInterval(timer);
                    }
                }, 16);
                observer.unobserve(element);
            }
        });
    });

    observer.observe(element);
}

// Performance Optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimized scroll handler
const optimizedScrollHandler = debounce(function() {
    updateActiveNavLink();
}, 10);

window.addEventListener('scroll', optimizedScrollHandler);

// Resize handler for responsive adjustments
window.addEventListener('resize', debounce(function() {
    // Recalculate particle positions
    if (particles.length > 0) {
        particles.forEach(particle => {
            if (particle.x > window.innerWidth) particle.x = window.innerWidth;
            if (particle.y > window.innerHeight) particle.y = window.innerHeight;
        });
    }
}, 250));

// Accessibility improvements
document.addEventListener('keydown', function(e) {
    // ESC key closes mobile menu
    if (e.key === 'Escape' && isMenuOpen) {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
        isMenuOpen = false;
    }
});

// Focus management for better accessibility
document.addEventListener('focusin', function(e) {
    if (e.target.matches('.nav-link, .cta-button, .service-link')) {
        e.target.style.outline = '2px solid var(--neon-blue)';
        e.target.style.outlineOffset = '2px';
    }
});

document.addEventListener('focusout', function(e) {
    if (e.target.matches('.nav-link, .cta-button, .service-link')) {
        e.target.style.outline = '';
        e.target.style.outlineOffset = '';
    }
});

// Global functions for HTML onclick handlers
window.scrollToSection = scrollToSection;
window.changeTestimonial = changeTestimonial;
window.currentTestimonial = currentTestimonialIndex;
window.showDemo = showDemo;
window.handleDemoInput = handleDemoInput;
window.sendDemoMessage = sendDemoMessage;
window.handleFormSubmit = handleFormSubmit;
window.openCalendar = openCalendar;
window.scrollToTop = scrollToTop;

// Console welcome message
console.log('%cWelcome to WebStudio! 🚀', 'color: #00D4FF; font-size: 20px; font-weight: bold;');
console.log('%cBuilding amazing digital experiences with modern technology.', 'color: #00FF85; font-size: 14px;');