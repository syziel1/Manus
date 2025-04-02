// Animation and UI enhancements for zrozoomai.pl

document.addEventListener('DOMContentLoaded', function() {
  // Add smooth scrolling for all anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Add scroll animations for elements
  const animateOnScroll = function() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementPosition < windowHeight - 100) {
        element.classList.add('animated');
      }
    });
  };
  
  // Run animation check on scroll
  window.addEventListener('scroll', animateOnScroll);
  
  // Run once on page load
  animateOnScroll();
  
  // Mobile menu toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navMenu = document.querySelector('.nav-menu');
  
  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', function() {
      navMenu.classList.toggle('active');
      
      // Toggle icon between bars and X
      const icon = this.querySelector('i');
      if (icon.classList.contains('fa-bars')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
      } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });
  }
  
  // Add active class to current page in navigation
  const currentPage = window.location.pathname.split('/').pop();
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    const linkHref = link.getAttribute('href');
    if (linkHref === currentPage || (currentPage === '' && linkHref === 'index.html')) {
      link.classList.add('active');
    }
  });
  
  // Tooltip initialization
  const tooltips = document.querySelectorAll('.tooltip');
  
  tooltips.forEach(tooltip => {
    tooltip.addEventListener('mouseenter', function() {
      const tooltipText = this.querySelector('.tooltip-text');
      if (tooltipText) {
        tooltipText.style.visibility = 'visible';
        tooltipText.style.opacity = '1';
      }
    });
    
    tooltip.addEventListener('mouseleave', function() {
      const tooltipText = this.querySelector('.tooltip-text');
      if (tooltipText) {
        tooltipText.style.visibility = 'hidden';
        tooltipText.style.opacity = '0';
      }
    });
  });
  
  // Back to top button
  const createBackToTopButton = function() {
    const button = document.createElement('button');
    button.id = 'back-to-top';
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.style.display = 'none';
    document.body.appendChild(button);
    
    button.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
    
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        button.style.display = 'block';
      } else {
        button.style.display = 'none';
      }
    });
  };
  
  createBackToTopButton();
  
  // Add CSS for the back to top button
  const addBackToTopStyles = function() {
    const style = document.createElement('style');
    style.textContent = `
      #back-to-top {
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: var(--primary-color);
        color: white;
        border: none;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 999;
        transition: background-color 0.3s ease;
      }
      
      #back-to-top:hover {
        background-color: #152b6b;
      }
    `;
    document.head.appendChild(style);
  };
  
  addBackToTopStyles();
  
  // Add dark mode toggle
  const createDarkModeToggle = function() {
    // Check for user preference
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');
    
    // Create toggle button
    const toggle = document.createElement('button');
    toggle.id = 'dark-mode-toggle';
    toggle.innerHTML = '<i class="fas fa-moon"></i>';
    
    // Add to header
    const header = document.querySelector('.header-container');
    if (header) {
      header.appendChild(toggle);
    }
    
    // Set initial state
    if (savedTheme === 'dark' || (savedTheme === null && prefersDarkMode)) {
      document.body.classList.add('dark-mode');
      toggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    // Toggle functionality
    toggle.addEventListener('click', function() {
      document.body.classList.toggle('dark-mode');
      
      if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
        toggle.innerHTML = '<i class="fas fa-sun"></i>';
      } else {
        localStorage.setItem('theme', 'light');
        toggle.innerHTML = '<i class="fas fa-moon"></i>';
      }
    });
  };
  
  // Add CSS for dark mode
  const addDarkModeStyles = function() {
    const style = document.createElement('style');
    style.textContent = `
      #dark-mode-toggle {
        background: none;
        border: none;
        color: var(--text-color);
        font-size: 1.25rem;
        cursor: pointer;
        margin-left: 1rem;
      }
      
      body.dark-mode {
        --primary-color: #4a6bdf;
        --accent-color: #00b8d4;
        --text-color: #e0e0e0;
        --bg-color: #121212;
        --card-bg: #1e1e1e;
        --border-color: #333;
        --success-color: #00c853;
        --warning-color: #ff6d00;
        --error-color: #ff1744;
        
        background-color: var(--bg-color);
        color: var(--text-color);
      }
      
      body.dark-mode .header,
      body.dark-mode .footer {
        background-color: #0a0a0a;
      }
      
      body.dark-mode .card,
      body.dark-mode .dictionary-container,
      body.dark-mode .article-container,
      body.dark-mode .step-content {
        background-color: var(--card-bg);
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
      }
      
      body.dark-mode .form-input,
      body.dark-mode .form-textarea,
      body.dark-mode .form-select {
        background-color: #2a2a2a;
        border-color: var(--border-color);
        color: var(--text-color);
      }
      
      body.dark-mode .badge-light {
        background-color: #333;
        color: var(--text-color);
      }
      
      body.dark-mode code {
        background-color: #2d2d2d;
      }
      
      body.dark-mode .nav-link,
      body.dark-mode .footer a {
        color: var(--text-color);
      }
      
      body.dark-mode .nav-link.active,
      body.dark-mode .nav-link:hover {
        color: var(--accent-color);
      }
    `;
    document.head.appendChild(style);
  };
  
  createDarkModeToggle();
  addDarkModeStyles();
  
  // Add reading progress indicator
  const createReadingProgressIndicator = function() {
    // Only add to article pages
    const articleContainer = document.querySelector('.article-container');
    if (!articleContainer) return;
    
    const progressBar = document.createElement('div');
    progressBar.id = 'reading-progress';
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      const scrolled = (scrollTop / (documentHeight - windowHeight)) * 100;
      progressBar.style.width = scrolled + '%';
    });
  };
  
  // Add CSS for reading progress indicator
  const addReadingProgressStyles = function() {
    const style = document.createElement('style');
    style.textContent = `
      #reading-progress {
        position: fixed;
        top: 0;
        left: 0;
        height: 4px;
        background-color: var(--accent-color);
        z-index: 9999;
        width: 0%;
        transition: width 0.1s ease;
      }
    `;
    document.head.appendChild(style);
  };
  
  createReadingProgressIndicator();
  addReadingProgressStyles();
  
  // Add image lazy loading
  const lazyLoadImages = function() {
    const images = document.querySelectorAll('img[data-src]');
    
    const lazyLoadObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          observer.unobserve(img);
        }
      });
    });
    
    images.forEach(image => {
      lazyLoadObserver.observe(image);
    });
  };
  
  lazyLoadImages();
  
  // Add estimated reading time to articles
  const addReadingTime = function() {
    const articleContent = document.querySelector('.article-content');
    if (!articleContent) return;
    
    const text = articleContent.textContent;
    const wordCount = text.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200); // Assuming 200 words per minute
    
    const readingTimeElement = document.createElement('div');
    readingTimeElement.className = 'reading-time';
    readingTimeElement.innerHTML = `<i class="far fa-clock"></i> Czas czytania: ${readingTime} min`;
    
    const articleMeta = document.querySelector('.article-meta');
    if (articleMeta) {
      articleMeta.appendChild(readingTimeElement);
    } else {
      articleContent.insertBefore(readingTimeElement, articleContent.firstChild);
    }
  };
  
  addReadingTime();
});
