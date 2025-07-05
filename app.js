// app.js
document.addEventListener('DOMContentLoaded', function() {
    initThemeToggle();
    initMobileMenu();
    initSmoothScrolling();
    initAnimatedCounters();
    initScrollAnimations();
    initChatbot();
    initContactForm();
    initNavbarScroll();
    initInteractiveEffects();
});

// Theme Toggle
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('.theme-icon');
    
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('theme') || 
                      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.setAttribute('data-color-scheme', savedTheme);
    updateThemeIcon(savedTheme);
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-color-scheme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-color-scheme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
        
        themeToggle.style.transform = 'scale(0.9)';
        setTimeout(() => {
            themeToggle.style.transform = 'scale(1)';
        }, 150);
    });
    
    function updateThemeIcon(theme) {
        themeIcon.textContent = theme === 'light' ? '🌙' : '☀️';
    }
}

// Mobile Menu
function initMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navbarNav = document.querySelector('.navbar-nav');
    
    mobileMenuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navbarNav.classList.toggle('active');
    });
    
    // Close menu when clicking on links
    document.querySelectorAll('.navbar-nav a').forEach(link => {
        link.addEventListener('click', function() {
            mobileMenuToggle.classList.remove('active');
            navbarNav.classList.remove('active');
        });
    });
}

// Smooth Scrolling
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Animated Counters
function initAnimatedCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 50;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.floor(current) + (target === 99 ? '%' : target >= 50 ? '+' : '');
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + (target === 99 ? '%' : target >= 50 ? '+' : '');
            }
        };
        
        updateCounter();
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// Scroll Animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.service-card, .team-card, .stat-card, .section-header');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Chatbot
function initChatbot() {
    const chatToggle = document.getElementById('chatToggle');
    const chatContainer = document.getElementById('chatContainer');
    const chatClose = document.getElementById('chatClose');
    const chatInput = document.getElementById('chatInput');
    const sendButton = document.getElementById('sendMessage');
    const chatMessages = document.getElementById('chatMessages');
    
    const responses = {
        'hello': 'Hi there! Welcome to Digital Excellence Agency. How can I help you today?',
        'hi': 'Hello! Welcome to Digital Excellence Agency. How can I help you today?',
        'services': 'We offer web development, digital marketing, graphic design, Shopify development, and social media advertising. Which service interests you?',
        'pricing': 'Our pricing varies based on project scope. Would you like to schedule a free consultation to discuss your specific needs?',
        'contact': 'You can reach us at hello@digitalexcellence.com or call us at +92 344 0116303. We typically respond within 24 hours!',
        'web development': 'Our web development services include custom websites, web applications, and responsive design. We work with modern technologies like React, Node.js, and more.',
        'digital marketing': 'Our digital marketing services include SEO, content strategy, PPC campaigns, and analytics. We help boost your online presence and drive growth.',
        'design': 'Our graphic design services include branding, UI/UX design, and visual identity creation. We make your brand stand out with creative solutions.',
        'shopify': 'We specialize in Shopify development, creating high-converting e-commerce stores with custom themes and functionality.',
        'social media': 'We manage Facebook and TikTok advertising campaigns, focusing on audience targeting and campaign optimization for maximum ROI.',
        'team': 'Our team consists of 5 specialists: a web developer, digital marketer, graphic designer, Shopify expert, and social media ads expert.',
        'portfolio': 'We have completed 150+ projects for 50+ happy clients. You can view our work in the portfolio section or contact us for specific examples.',
        'thanks': 'You\'re welcome! Is there anything else I can help you with?',
        'thank you': 'You\'re welcome! Is there anything else I can help you with?',
        'bye': 'Thank you for visiting Digital Excellence Agency! Feel free to reach out anytime. Have a great day!',
        'goodbye': 'Thank you for visiting Digital Excellence Agency! Feel free to reach out anytime. Have a great day!'
    };
    
    // Toggle chat
    chatToggle.addEventListener('click', function() {
        chatContainer.classList.toggle('active');
        if (chatContainer.classList.contains('active')) {
            chatInput.focus();
        }
    });
    
    // Close chat
    chatClose.addEventListener('click', function() {
        chatContainer.classList.remove('active');
    });
    
    // Send message
    function sendMessage() {
        const message = chatInput.value.trim();
        if (message) {
            addMessage(message, 'user');
            chatInput.value = '';
            
            setTimeout(() => {
                const response = getResponse(message);
                addMessage(response, 'bot');
            }, 500);
        }
    }
    
    sendButton.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Add message to chat
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        messageDiv.innerHTML = `<p>${text}</p>`;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Get bot response
    function getResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        for (const [key, response] of Object.entries(responses)) {
            if (lowerMessage.includes(key)) {
                return response;
            }
        }
        
        return "I understand you're interested in our services. For specific questions, please contact us at hello@digitalexcellence.com or call us at +92 344 0116303. We'll get back to you within 24 hours!";
    }
}

// Contact Form
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const service = contactForm.querySelector('select').value;
        const message = contactForm.querySelector('textarea').value;
        
        if (!name || !email || !message) {
            showAlert('Please fill in all required fields.', 'error');
            return;
        }
        
        // Send to WhatsApp
        const whatsappMessage = `New Contact Form Submission:\n\nName: ${name}\nEmail: ${email}\nService: ${service}\nMessage: ${message}`;
        const whatsappUrl = `https://wa.me/923440116303?text=${encodeURIComponent(whatsappMessage)}`;
        
        // Open WhatsApp in new tab
        window.open(whatsappUrl, '_blank');
        
        // Show success message
        showAlert('Thank you for your message! We\'ll get back to you soon.', 'success');
        contactForm.reset();
    });
    
    function showAlert(message, type) {
        const alert = document.createElement('div');
        alert.className = `alert alert-${type}`;
        alert.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            color: white;
            z-index: 10000;
            animation: slideIn 0.3s ease;
            max-width: 400px;
        `;
        
        alert.style.background = type === 'success' ? 'var(--color-success)' : 'var(--color-error)';
        alert.textContent = message;
        document.body.appendChild(alert);
        
        setTimeout(() => {
            alert.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(alert);
            }, 300);
        }, 5000);
    }
}

// Navbar Scroll Effect
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Interactive Effects
function initInteractiveEffects() {
    // Button hover effects
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Service card hover effects
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) rotateX(5deg) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateX(0) scale(1)';
        });
    });
    
    // Team card 3D effect
    const teamCards = document.querySelectorAll('.team-card');
    teamCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);