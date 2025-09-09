// Professional Loading Screen
window.addEventListener('load', function() {
  const loadingScreen = document.getElementById('loading-screen');
  setTimeout(() => {
    loadingScreen.style.opacity = '0';
    setTimeout(() => {
      loadingScreen.style.display = 'none';
      // Initialize scroll animations after loading
      initScrollAnimations();
    }, 500);
  }, 1000);
});

// Professional Scroll Reveal Animations
function initScrollAnimations() {
  const revealElements = document.querySelectorAll('.scroll-reveal');
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });
}

// Professional Scroll Progress Indicator
window.addEventListener('scroll', function() {
  const navbar = document.querySelector('nav');
  const scrollProgress = document.querySelector('.scroll-progress');
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  
  if (scrollProgress) {
    scrollProgress.style.width = scrolled + '%';
  }
  
  // Enhanced navbar background on scroll
  if (window.scrollY > 100) {
    navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    navbar.style.backdropFilter = 'blur(10px)';
    navbar.style.borderBottom = '1px solid rgba(0,0,0,0.1)';
  } else {
    navbar.style.background = 'white';
    navbar.style.backdropFilter = 'none';
    navbar.style.borderBottom = 'none';
  }
});

// Professional Smooth Scrolling Enhancement
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      // Add smooth animation
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      
      // Close mobile menu if open
      const mobileMenu = document.getElementById('mobile-menu');
      if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
        document.getElementById('mobile-menu-btn').setAttribute('aria-expanded', 'false');
      }
    }
  });
});

// Professional Parallax Effect for Hero Section
window.addEventListener('scroll', function() {
  const scrolled = window.pageYOffset;
  const parallax = document.querySelector('.hero-animation');
  if (parallax) {
    const speed = scrolled * 0.5;
    parallax.style.transform = `translateY(${speed}px)`;
  }
});

// Enhanced Mobile menu with accessibility
document.getElementById('mobile-menu-btn').addEventListener('click', function() {
  const mobileMenu = document.getElementById('mobile-menu');
  const isHidden = mobileMenu.classList.contains('hidden');
  
  mobileMenu.classList.toggle('hidden');
  
  // Update aria-expanded for accessibility
  this.setAttribute('aria-expanded', isHidden ? 'true' : 'false');
  
  // Close menu when clicking outside
  if (isHidden) {
    document.addEventListener('click', function closeMenu(e) {
      if (!mobileMenu.contains(e.target) && !document.getElementById('mobile-menu-btn').contains(e.target)) {
        mobileMenu.classList.add('hidden');
        document.getElementById('mobile-menu-btn').setAttribute('aria-expanded', 'false');
        document.removeEventListener('click', closeMenu);
      }
    });
  }
});

// Smooth scrolling for navigation links
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

// Fade in animation on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
  observer.observe(el);
});

// Counter animation
function animateCounter(element, target) {
  let current = 0;
  const increment = target / 100;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    element.textContent = Math.floor(current);
  }, 20);
}

// Trigger counter animation when in view
const counterObserver = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counter = entry.target;
      const target = parseInt(counter.getAttribute('data-target'));
      animateCounter(counter, target);
      counterObserver.unobserve(counter);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.counter').forEach(counter => {
  counterObserver.observe(counter);
});

// Enhanced Chatbot functionality
const chatbotToggle = document.getElementById('chatbot-toggle');
const chatbotPopup = document.getElementById('chatbot-popup');
const chatbotClose = document.getElementById('chatbot-close');

// Error handling and null checks
if (chatbotToggle && chatbotPopup && chatbotClose) {
  
  // Toggle chatbot popup
  chatbotToggle.addEventListener('click', function() {
    chatbotPopup.classList.toggle('hidden');
    
    // Add bounce animation to toggle button
    this.style.transform = 'scale(0.95)';
    setTimeout(() => {
      this.style.transform = 'scale(1)';
    }, 150);
    
    // Focus management for accessibility
    if (!chatbotPopup.classList.contains('hidden')) {
      chatbotPopup.focus();
    }
  });

  // Close chatbot popup
  chatbotClose.addEventListener('click', function() {
    chatbotPopup.classList.add('hidden');
  });

  // Close chatbot when clicking outside
  document.addEventListener('click', function(e) {
    if (!chatbotToggle.contains(e.target) && !chatbotPopup.contains(e.target)) {
      chatbotPopup.classList.add('hidden');
    }
  });

  // Escape key to close chatbot
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && !chatbotPopup.classList.contains('hidden')) {
      chatbotPopup.classList.add('hidden');
    }
  });
  
} else {
  console.warn('Chatbot elements not found. Please check HTML structure.');
}

// Professional Form submissions with validation
document.querySelectorAll('form').forEach(form => {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Add loading state
    const submitBtn = this.querySelector('button[type="submit"]') || this.querySelector('button');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission with professional feedback
    setTimeout(() => {
      // Success animation
      submitBtn.textContent = '✓ Sent Successfully!';
      submitBtn.style.background = '#10b981';
      
      // Show professional success message
      showNotification('Thank you! We will get back to you within 24 hours.', 'success');
      
      // Reset form and button
      setTimeout(() => {
        form.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        submitBtn.style.background = '';
      }, 2000);
    }, 1500);
  });
});

// Professional Notification System
function showNotification(message, type = 'success') {
  const notification = document.createElement('div');
  notification.className = `fixed top-4 right-4 z-[9999] p-4 rounded-lg shadow-lg transform translate-x-full transition-transform duration-300 ${
    type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
  }`;
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  // Auto remove
  setTimeout(() => {
    notification.style.transform = 'translateX(full)';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 4000);
}

// Enhanced Chatbot quick actions
const chatbotButtons = document.querySelectorAll('#chatbot-popup button');
if (chatbotButtons.length > 0) {
  chatbotButtons.forEach(button => {
    if (button.id !== 'chatbot-close') {
      button.addEventListener('click', function() {
        const buttonText = this.textContent.toLowerCase();
        
        // Add click feedback
        this.style.transform = 'scale(0.98)';
        setTimeout(() => {
          this.style.transform = 'scale(1)';
        }, 100);
        
        // Navigate based on button content
        if (buttonText.includes('training programs')) {
          const candidatesSection = document.querySelector('#candidates');
          if (candidatesSection) {
            candidatesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        } else if (buttonText.includes('hire talent')) {
          const companiesSection = document.querySelector('#companies');
          if (companiesSection) {
            companiesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        } else if (buttonText.includes('speak with someone')) {
          const contactSection = document.querySelector('#contact');
          if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
        
        // Close chatbot with slight delay for better UX
        setTimeout(() => {
          if (chatbotPopup) {
            chatbotPopup.classList.add('hidden');
          }
        }, 300);
      });
    }
  });
} else {
  console.warn('Chatbot buttons not found.');
}

// Initialize animations
setTimeout(() => {
  document.querySelectorAll('.fade-in').forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight) {
      el.classList.add('visible');
    }
  });
}, 100);

// Additional script for iframe functionality
(function () {
  function c() {
    var b = a.contentDocument || a.contentWindow.document;
    if (b) {
      var d = b.createElement("script");
      d.innerHTML =
        "window.__CF$cv$params={r:'97757b71c0880bbe',t:'MTc1NjU2OTQyOS4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";
      b.getElementsByTagName("head")[0].appendChild(d);
    }
  }
  if (document.body) {
    var a = document.createElement("iframe");
    a.height = 1;
    a.width = 1;
    a.style.position = "absolute";
    a.style.top = 0;
    a.style.left = 0;
    a.style.border = "none";
    a.style.visibility = "hidden";
    document.body.appendChild(a);
    if ("loading" !== document.readyState) c();
    else if (window.addEventListener)
      document.addEventListener("DOMContentLoaded", c);
    else {
      var e = document.onreadystatechange || function () {};
      document.onreadystatechange = function (b) {
        e(b);
        "loading" !== document.readyState &&
          ((document.onreadystatechange = e), c());
      };
    }
  }
})();
