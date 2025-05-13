document.addEventListener('DOMContentLoaded', function() {
  // Mobile Menu Toggle
  const mobileMenuOpen = document.getElementById('mobile-menu-open');
  const mobileMenuClose = document.getElementById('mobile-menu-close');
  const mobileMenu = document.getElementById('mobile-menu');
  
  mobileMenuOpen.addEventListener('click', function() {
    mobileMenu.classList.add('active');
  });
  
  mobileMenuClose.addEventListener('click', function() {
    mobileMenu.classList.remove('active');
  });
  
  // Close mobile menu when clicking on a link
  const mobileMenuLinks = mobileMenu.querySelectorAll('a');
  mobileMenuLinks.forEach(link => {
    link.addEventListener('click', function() {
      mobileMenu.classList.remove('active');
    });
  });
  
  // Back to Top Button
  const backToTopButton = document.getElementById('backToTop');
  
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      backToTopButton.classList.add('active');
    } else {
      backToTopButton.classList.remove('active');
    }
  });
  
  backToTopButton.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // Project Carousel
  const projectCarousel = document.getElementById('project-carousel');
  const prevButton = document.getElementById('prevProject');
  const nextButton = document.getElementById('nextProject');
  const dots = document.querySelectorAll('.carousel-dots .dot');
  
  let currentIndex = 0;
  const projectCards = document.querySelectorAll('.project-card');
  const maxIndex = projectCards.length - 1;
  
  // Update dots function
  function updateDots(index) {
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
  }
  
  // Scroll to specific project card
  function scrollToCard(index) {
    if (index < 0) index = 0;
    if (index > maxIndex) index = maxIndex;
    
    currentIndex = index;
    projectCards[index].scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'start'
    });
    
    updateDots(index);
  }
  
  // Event listeners for prev/next buttons
  prevButton.addEventListener('click', function() {
    scrollToCard(currentIndex - 1);
  });
  
  nextButton.addEventListener('click', function() {
    scrollToCard(currentIndex + 1);
  });
  
  // Event listeners for dots
  dots.forEach((dot, index) => {
    dot.addEventListener('click', function() {
      scrollToCard(index);
    });
  });
  
  // Auto-scroll the carousel every 5 seconds
  let autoScrollInterval;
  
  function startAutoScroll() {
    autoScrollInterval = setInterval(() => {
      const nextIndex = currentIndex < maxIndex ? currentIndex + 1 : 0;
      scrollToCard(nextIndex);
    }, 5000);
  }
  
  function stopAutoScroll() {
    clearInterval(autoScrollInterval);
  }
  
  // Start auto-scroll by default
  startAutoScroll();
  
  // Pause auto-scroll when user interacts with carousel
  projectCarousel.addEventListener('mouseenter', stopAutoScroll);
  prevButton.addEventListener('mouseenter', stopAutoScroll);
  nextButton.addEventListener('mouseenter', stopAutoScroll);
  dots.forEach(dot => dot.addEventListener('mouseenter', stopAutoScroll));
  
  // Resume auto-scroll when user stops interacting
  // projectCarousel.addEventListener('mouseleave', startAutoScroll);
  // prevButton.addEventListener('mouseleave', startAutoScroll);
  // nextButton.addEventListener('mouseleave', startAutoScroll);
  // dots.forEach(dot => dot.addEventListener('mouseleave', startAutoScroll));
  
  // Detect which card is most visible and update dots
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
        const index = Array.from(projectCards).indexOf(entry.target);
        if (index !== -1 && index !== currentIndex) {
          currentIndex = index;
          updateDots(index);
        }
      }
    });
  }, {
    root: projectCarousel,
    threshold: 0.5
  });
  
  projectCards.forEach(card => {
    observer.observe(card);
  });
  
  // Create floating berries
  const berriesContainer = document.getElementById('berries-container');
  const berryEmojis = ['🍓', '🍒', '🫐', '🍇', '🧁', '🍰', '🍩', '🥧', '🍪'];
  const numberOfBerries = 20;
  
  for (let i = 0; i < numberOfBerries; i++) {
    createFloatingBerry();
  }
  
  function createFloatingBerry() {
    const berry = document.createElement('div');
    berry.classList.add('floating-berry');
    berry.innerText = berryEmojis[Math.floor(Math.random() * berryEmojis.length)];
    
    // Random positioning and animation properties
    const leftPos = Math.floor(Math.random() * 100);
    const delay = Math.random() * 5;
    const duration = 15 + Math.random() * 15;
    const size = 0.8 + Math.random() * 1.2;
    const rotation = Math.random() * 360;
    
    berry.style.left = `${leftPos}%`;
    berry.style.animationDelay = `${delay}s`;
    berry.style.animationDuration = `${duration}s`;
    berry.style.fontSize = `${size}rem`;
    berry.style.transform = `rotate(${rotation}deg)`;
    
    berriesContainer.appendChild(berry);
    
    // Remove and recreate berry after animation ends
    setTimeout(() => {
      berry.remove();
      createFloatingBerry();
    }, duration * 1000);
  }
  
  // Create cream drips with animated heights
  const creamDrips = document.querySelectorAll('.cream-drip');
  const chocolateDrips = document.querySelectorAll('.chocolate-drip');
  const strawberryDrips = document.querySelectorAll('.strawberry-cream-drip');
  const blueberryDrips = document.querySelectorAll('.blueberry-drip');
  const vanillaDrips = document.querySelectorAll('.vanilla-drip');
  
  // Initialize drip heights
  function initDrips(drips) {
    drips.forEach((drip, index) => {
      drip.style.setProperty('--drip-delay', index);
      // Random initial height
      const initialHeight = 80 + Math.random() * 40;
      drip.style.height = `${initialHeight}%`;
    });
  }
  
  initDrips(creamDrips);
  initDrips(chocolateDrips);
  initDrips(strawberryDrips);
  initDrips(blueberryDrips);
  initDrips(vanillaDrips);
  
  // Add sprinkles to sections
  const aboutSection = document.querySelector('.about');
  const skillsSection = document.querySelector('.skills');
  const projectsSection = document.querySelector('.projects');
  const journeySection = document.querySelector('.journey');
  
  function createSprinkle(parent, count) {
    for (let i = 0; i < count; i++) {
      const sprinkle = document.createElement('span');
      sprinkle.classList.add('sprinkle');
      
      // Random properties
      const topPos = Math.random() * 100;
      const leftPos = Math.random() * 100;
      const width = 0.5 + Math.random() * 2;
      const delay = Math.random() * 5;
      const colors = ['var(--strawberry)', 'var(--pink-primary)', 'var(--blueberry)', 'var(--vanilla)', 'var(--chocolate)'];
      const color = colors[Math.floor(Math.random() * colors.length)];
      const rotation = Math.random() * 360;
      
      sprinkle.style.top = `${topPos}%`;
      sprinkle.style.left = `${leftPos}%`;
      sprinkle.style.width = `${width}rem`;
      sprinkle.style.background = color;
      sprinkle.style.transform = `rotate(${rotation}deg)`;
      sprinkle.style.animationDelay = `${delay}s`;
      
      parent.appendChild(sprinkle);
    }
  }
  
  if (aboutSection) createSprinkle(aboutSection, 15);
  if (skillsSection) createSprinkle(skillsSection, 15);
  if (projectsSection) createSprinkle(projectsSection, 15);
  if (journeySection) createSprinkle(journeySection, 15);
  
  // Form submission (prevent default for demo)
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Show success message with confetti effect
      const button = contactForm.querySelector('button[type="submit"]');
      const originalText = button.innerHTML;
      
      button.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
      button.disabled = true;
      
      // Create confetti effect
      createConfetti();
      
      setTimeout(() => {
        button.innerHTML = originalText;
        button.disabled = false;
        contactForm.reset();
      }, 3000);
    });
  }
  
  // Confetti effect
  function createConfetti() {
    const container = document.createElement('div');
    container.className = 'confetti-container';
    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.pointerEvents = 'none';
    container.style.zIndex = '9999';
    document.body.appendChild(container);
    
    const colors = ['var(--pink-primary)', 'var(--pink-light)', 'var(--cream)', 'var(--strawberry)', 'var(--blueberry)'];
    
    for (let i = 0; i < 100; i++) {
      const confetti = document.createElement('div');
      const size = Math.random() * 10 + 5;
      
      confetti.style.position = 'absolute';
      confetti.style.width = `${size}px`;
      confetti.style.height = `${size}px`;
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.borderRadius = '50%';
      confetti.style.top = '-20px';
      confetti.style.left = `${Math.random() * 100}vw`;
      confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
      
      // Animation properties
      confetti.style.animation = `confetti-fall ${Math.random() * 3 + 2}s ease-in-out forwards`;
      
      container.appendChild(confetti);
    }
    
    // Create and add the keyframes to the document
    if (!document.getElementById('confetti-keyframes')) {
      const style = document.createElement('style');
      style.id = 'confetti-keyframes';
      style.innerHTML = `
        @keyframes confetti-fall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }
    
    // Remove the container after animations complete
    setTimeout(() => {
      container.remove();
    }, 5000);
  }
  
  // Add animation delay to tech-logo-items
  const techLogoItems = document.querySelectorAll('.tech-logo-item');
  techLogoItems.forEach(item => {
    const delay = item.getAttribute('data-delay') || 0;
    item.style.setProperty('--delay', delay);
  });
  
  // Smooth scroll for anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = 80; // Adjust based on fixed header height if needed
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Add parallax effect to berry icons
  const berryIcons = document.querySelectorAll('.berry-icon');
  
  window.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    berryIcons.forEach(icon => {
      const speed = 20;
      const xMove = (x - 0.5) * speed;
      const yMove = (y - 0.5) * speed;
      
      icon.style.transform = `translate(${xMove}px, ${yMove}px) rotate(${xMove * 2}deg)`;
    });
  });
  
  // Intersection Observer for revealing elements on scroll
  const revealElements = document.querySelectorAll('.skill-category, .role-card, .project-card, .menu-item, .contact-form, .contact-info');
  
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
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    revealObserver.observe(element);
  });
  
  // Add the CSS for the reveal animation
  const style = document.createElement('style');
  style.innerHTML = `
    .revealed {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;
  document.head.appendChild(style);
});document.addEventListener('DOMContentLoaded', function() {
  // Mobile Menu Toggle
  const mobileMenuOpen = document.getElementById('mobile-menu-open');
  const mobileMenuClose = document.getElementById('mobile-menu-close');
  const mobileMenu = document.getElementById('mobile-menu');
  
  mobileMenuOpen.addEventListener('click', function() {
    mobileMenu.classList.add('active');
  });
  
  mobileMenuClose.addEventListener('click', function() {
    mobileMenu.classList.remove('active');
  });
  
  // Close mobile menu when clicking on a link
  const mobileMenuLinks = mobileMenu.querySelectorAll('a');
  mobileMenuLinks.forEach(link => {
    link.addEventListener('click', function() {
      mobileMenu.classList.remove('active');
    });
  });
  
  // Back to Top Button
  const backToTopButton = document.getElementById('backToTop');
  
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      backToTopButton.classList.add('active');
    } else {
      backToTopButton.classList.remove('active');
    }
  });
  
  backToTopButton.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // Project Carousel
  const projectCarousel = document.getElementById('project-carousel');
  const prevButton = document.getElementById('prevProject');
  const nextButton = document.getElementById('nextProject');
  const dots = document.querySelectorAll('.carousel-dots .dot');
  
  let currentIndex = 0;
  const projectCards = document.querySelectorAll('.project-card');
  const maxIndex = projectCards.length - 1;
  
  // Update dots function
  function updateDots(index) {
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
  }
  
  // Scroll to specific project card
  function scrollToCard(index) {
    if (index < 0) index = 0;
    if (index > maxIndex) index = maxIndex;
    
    currentIndex = index;
    projectCards[index].scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'start'
    });
    
    updateDots(index);
  }
  
  // Event listeners for prev/next buttons
  prevButton.addEventListener('click', function() {
    scrollToCard(currentIndex - 1);
  });
  
  nextButton.addEventListener('click', function() {
    scrollToCard(currentIndex + 1);
  });
  
  // Event listeners for dots
  dots.forEach((dot, index) => {
    dot.addEventListener('click', function() {
      scrollToCard(index);
    });
  });
  
  // Detect which card is most visible and update dots
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
        const index = Array.from(projectCards).indexOf(entry.target);
        if (index !== -1 && index !== currentIndex) {
          currentIndex = index;
          updateDots(index);
        }
      }
    });
  }, {
    root: projectCarousel,
    threshold: 0.5
  });
  
  projectCards.forEach(card => {
    observer.observe(card);
  });
  
  // Create floating berries
  const berriesContainer = document.getElementById('berries-container');
  const berryEmojis = ['🍓', '🍒', '🫐', '🍇'];
  const numberOfBerries = 15;
  
  for (let i = 0; i < numberOfBerries; i++) {
    createFloatingBerry();
  }
  
  function createFloatingBerry() {
    const berry = document.createElement('div');
    berry.classList.add('floating-berry');
    berry.innerText = berryEmojis[Math.floor(Math.random() * berryEmojis.length)];
    
    // Random positioning
    const leftPos = Math.floor(Math.random() * 100);
    const delay = Math.random() * 5;
    const duration = 15 + Math.random() * 10;
    
    berry.style.left = `${leftPos}%`;
    berry.style.animationDelay = `${delay}s`;
    berry.style.animationDuration = `${duration}s`;
    
    berriesContainer.appendChild(berry);
    
    // Remove and recreate berry after animation ends
    setTimeout(() => {
      berry.remove();
      createFloatingBerry();
    }, duration * 1000);
  }
  
  // Form submission (prevent default for demo)
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Show success message (in real implementation, you'd handle form submission)
      const button = contactForm.querySelector('button[type="submit"]');
      const originalText = button.innerHTML;
      
      button.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
      button.disabled = true;
      
      setTimeout(() => {
        button.innerHTML = originalText;
        button.disabled = false;
        contactForm.reset();
      }, 3000);
    });
  }
  
  // Add animation delay to tech-logo-items
  const techLogoItems = document.querySelectorAll('.tech-logo-item');
  techLogoItems.forEach(item => {
    const delay = item.getAttribute('data-delay') || 0;
    item.style.setProperty('--delay', delay);
  });
  
  // Smooth scroll for anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = 80; // Adjust based on fixed header height if needed
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
});