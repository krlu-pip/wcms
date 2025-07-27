/**
 * WebStudio Landing Page Configuration
 * Customize your landing page settings here
 */

const WEBSTUDIO_CONFIG = {
    // Company Information
    company: {
        name: "WebStudio",
        tagline: "Building Your Digital Future",
        description: "We craft modern landing pages, Python-powered web apps, and Telegram bots tailored to your vision.",
        email: "hello@webstudio.com",
        phone: "+1 (555) 123-4567",
        location: "Remote Worldwide"
    },

    // Hero Section
    hero: {
        title: {
            line1: "Build Your",
            line2: "Digital Future", // This will have neon effect
            line3: "with Stunning Landing Pages & Apps"
        },
        subtitle: "We craft modern landing pages, Python-powered web apps, and Telegram bots tailored to your vision.",
        primaryCTA: "Get Started Now",
        secondaryCTA: "View Our Work"
    },

    // Services Configuration
    services: [
        {
            icon: "fas fa-desktop",
            title: "Landing Pages",
            description: "Pixel-perfect, conversion-driven designs that captivate your audience and drive results.",
            features: ["Responsive Design", "SEO Optimized", "Fast Loading", "Analytics Integration"]
        },
        {
            icon: "fas fa-globe",
            title: "Web Applications",
            description: "Scalable, user-friendly applications built with modern frameworks and cutting-edge technology.",
            features: ["Modern Frameworks", "Database Integration", "API Development", "Cloud Deployment"]
        },
        {
            icon: "fab fa-python",
            title: "Python Applications",
            description: "Custom solutions leveraging Python's versatility for automation, data processing, and web development.",
            features: ["Data Analytics", "Automation Scripts", "API Integration", "Machine Learning"]
        },
        {
            icon: "fab fa-telegram",
            title: "Telegram Bots",
            description: "Automated, interactive bots for business engagement, customer support, and process automation.",
            features: ["Custom Commands", "Payment Integration", "Database Connectivity", "24/7 Automation"]
        }
    ],

    // Portfolio Projects
    portfolio: [
        {
            title: "E-Commerce Landing Page",
            description: "Modern, conversion-optimized landing page with integrated payment system",
            icon: "fas fa-laptop-code",
            techStack: ["HTML5", "CSS3", "JavaScript", "Stripe API"]
        },
        {
            title: "Data Analytics Dashboard",
            description: "Python-powered web application for real-time data visualization",
            icon: "fab fa-python",
            techStack: ["Python", "Django", "Chart.js", "PostgreSQL"]
        },
        {
            title: "Customer Support Bot",
            description: "Intelligent Telegram bot with AI-powered responses and ticket system",
            icon: "fab fa-telegram",
            techStack: ["Python", "Telegram API", "OpenAI", "MongoDB"]
        },
        {
            title: "SaaS Web Application",
            description: "Full-stack web application with user management and subscription system",
            icon: "fas fa-mobile-alt",
            techStack: ["React", "Node.js", "MongoDB", "Stripe"]
        },
        {
            title: "Crypto Trading Bot",
            description: "Automated trading bot with real-time market analysis and risk management",
            icon: "fas fa-chart-line",
            techStack: ["Python", "FastAPI", "WebSocket", "Redis"]
        }
    ],

    // Why Choose Us Features
    features: [
        {
            icon: "fas fa-rocket",
            title: "Cutting-Edge Technology",
            description: "Tailored solutions with the latest frameworks and technologies to keep you ahead of the competition."
        },
        {
            icon: "fas fa-bolt",
            title: "Rapid Delivery",
            description: "Fast turnaround times without compromising on quality or attention to detail."
        },
        {
            icon: "fas fa-headset",
            title: "24/7 Support",
            description: "Round-the-clock support for all your digital needs and ongoing maintenance."
        },
        {
            icon: "fas fa-shield-alt",
            title: "Secure & Scalable",
            description: "Built with security best practices and designed to scale with your business growth."
        },
        {
            icon: "fas fa-users",
            title: "Client-Focused",
            description: "Your success is our priority. We work closely with you to achieve your goals."
        },
        {
            icon: "fas fa-chart-line",
            title: "Results-Driven",
            description: "Every solution is optimized for performance, conversion, and measurable results."
        }
    ],

    // Testimonials
    testimonials: [
        {
            text: "WebStudio transformed our online presence with a stunning landing page that increased our conversions by 300%. Their attention to detail and modern design approach is exceptional.",
            author: "Sarah Johnson",
            title: "CEO, TechStart Inc.",
            avatar: "fas fa-user"
        },
        {
            text: "The Python application they built for us streamlined our entire workflow. The team's expertise in automation and data processing is outstanding. Highly recommended!",
            author: "Michael Chen",
            title: "CTO, DataFlow Solutions",
            avatar: "fas fa-user"
        },
        {
            text: "Our Telegram bot handles customer inquiries 24/7 and has significantly improved our customer satisfaction. The bot is intelligent, responsive, and perfectly integrated with our systems.",
            author: "Emily Rodriguez",
            title: "Marketing Director, ChatBot Pro",
            avatar: "fas fa-user"
        }
    ],

    // Social Media Links
    social: {
        twitter: "#",
        linkedin: "#",
        github: "#",
        dribbble: "#"
    },

    // Contact Form Settings
    contactForm: {
        submitUrl: "contact-handler.php", // Change this if using external service
        successMessage: "Thank you for your message! We'll get back to you within 24 hours.",
        errorMessage: "Sorry, there was an error sending your message. Please try again.",
        fields: {
            name: { required: true, label: "Full Name" },
            email: { required: true, label: "Email Address" },
            projectType: { 
                required: true, 
                label: "Project Type",
                options: [
                    { value: "", text: "Select a service" },
                    { value: "landing-page", text: "Landing Page" },
                    { value: "web-app", text: "Web Application" },
                    { value: "python-app", text: "Python Application" },
                    { value: "telegram-bot", text: "Telegram Bot" },
                    { value: "other", text: "Other" }
                ]
            },
            budget: {
                required: false,
                label: "Budget Range",
                options: [
                    { value: "", text: "Select budget range" },
                    { value: "1k-5k", text: "$1,000 - $5,000" },
                    { value: "5k-10k", text: "$5,000 - $10,000" },
                    { value: "10k-25k", text: "$10,000 - $25,000" },
                    { value: "25k+", text: "$25,000+" }
                ]
            },
            message: { 
                required: true, 
                label: "Project Details",
                placeholder: "Tell us about your project, goals, and any specific requirements..."
            }
        }
    },

    // Chat Bot Demo Responses
    chatBot: {
        responses: {
            'services': 'We offer Landing Pages, Web Applications, Python Development, and Telegram Bots. Which service interests you most?',
            'portfolio': 'Check out our recent projects including e-commerce platforms, data analytics dashboards, and AI-powered bots. Would you like to see examples?',
            'contact': 'You can reach us at hello@webstudio.com or use our contact form below. We typically respond within 24 hours!',
            'price': 'Our pricing varies by project complexity. Landing pages start at $1,000, web apps from $5,000. Contact us for a custom quote!',
            'telegram': 'Our Telegram bots can handle customer support, payments, automation, and more. They integrate seamlessly with your existing systems.',
            'python': 'We build custom Python applications for data processing, automation, web scraping, and machine learning. What\'s your use case?',
            'hello': 'Hello! Welcome to WebStudio. How can I help you today? Ask about our services, portfolio, or pricing!',
            'hi': 'Hi there! I\'m here to help you learn about our web development services. What would you like to know?'
        },
        defaultResponse: 'That\'s interesting! For detailed information about our services, feel free to contact our team. We\'d love to discuss your project!'
    },

    // Animation Settings
    animations: {
        particleCount: 50,
        testimonialAutoPlay: true,
        testimonialInterval: 5000, // 5 seconds
        scrollAnimationOffset: 50,
        loadingDuration: 1000
    },

    // Theme Settings
    theme: {
        defaultTheme: 'dark', // 'dark' or 'light'
        allowToggle: true,
        colors: {
            neonBlue: '#00D4FF',
            neonGreen: '#00FF85',
            neonPurple: '#8B5CF6',
            neonPink: '#FF007A'
        }
    },

    // SEO Settings
    seo: {
        title: "Web Studio - Build Your Digital Future | Landing Pages, Web Apps & Telegram Bots",
        description: "Professional web studio crafting modern landing pages, Python-powered web applications, and Telegram bots. Transform your digital vision into reality.",
        keywords: "landing pages, web development, python apps, telegram bots, web studio, modern design",
        ogImage: "", // Add your Open Graph image URL
        twitterCard: "summary_large_image"
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = WEBSTUDIO_CONFIG;
}