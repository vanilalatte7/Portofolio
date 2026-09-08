/* ============================================= */
/* PORTFOLIO JAVASCRIPT                           */
/* ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  // =============================================
  // Custom Cursor
  // =============================================
  const cursor = document.getElementById('cursor');
  const cursorFollower = document.getElementById('cursor-follower');
  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  });

  function animateFollower() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    cursorFollower.style.left = followerX + 'px';
    cursorFollower.style.top = followerY + 'px';
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  document.querySelectorAll('a, button, .skill-tag, .filter-btn, .dot').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.width = '20px';
      cursor.style.height = '20px';
      cursorFollower.style.width = '52px';
      cursorFollower.style.height = '52px';
      cursorFollower.style.borderColor = 'rgba(139, 92, 246, 0.6)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.width = '12px';
      cursor.style.height = '12px';
      cursorFollower.style.width = '36px';
      cursorFollower.style.height = '36px';
      cursorFollower.style.borderColor = 'rgba(59, 130, 246, 0.5)';
    });
  });

  // =============================================
  // Navbar Scroll
  // =============================================
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // =============================================
  // Active Nav Link on Scroll
  // =============================================
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observerOptions = { rootMargin: '-40% 0px -50% 0px' };
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.classList.remove('active'));
        const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, observerOptions);
  sections.forEach(sec => sectionObserver.observe(sec));

  // =============================================
  // Hamburger Menu
  // =============================================
  const hamburger = document.getElementById('hamburger');
  const navLinksEl = document.getElementById('nav-links');

  hamburger.addEventListener('click', () => {
    navLinksEl.classList.toggle('open');
    const spans = hamburger.querySelectorAll('span');
    navLinksEl.classList.contains('open')
      ? (spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)',
         spans[1].style.opacity = '0',
         spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)')
      : (spans[0].style.transform = '', spans[1].style.opacity = '', spans[2].style.transform = '');
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinksEl.classList.remove('open');
      const spans = hamburger.querySelectorAll('span');
      spans[0].style.transform = ''; spans[1].style.opacity = ''; spans[2].style.transform = '';
    });
  });

  // =============================================
  // Typed Subtitle Effect
  // =============================================
  const subtitleEl = document.getElementById('typed-subtitle');
  const roles = [
    'AI & Computer Vision Developer',
    'IoT & Embedded Systems Engineer',
    'Digital Telecommunication Engineer',
    'Network & Security Enthusiast',
  ];
  let roleIndex = 0, charIndex = 0, isDeleting = false;

  function typeRole() {
    const currentRole = roles[roleIndex];
    if (isDeleting) {
      subtitleEl.textContent = currentRole.substring(0, charIndex--);
    } else {
      subtitleEl.textContent = currentRole.substring(0, charIndex++);
    }

    let delay = isDeleting ? 50 : 100;
    if (!isDeleting && charIndex > currentRole.length) {
      isDeleting = true;
      delay = 2000;
    } else if (isDeleting && charIndex < 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      delay = 400;
    }
    setTimeout(typeRole, delay);
  }
  setTimeout(typeRole, 800);

  // =============================================
  // Counter Animation
  // =============================================
  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'));
    const duration = 1500;
    const start = Date.now();
    function update() {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target);
      if (progress < 1) requestAnimationFrame(update);
    }
    update();
  }

  const statNumbers = document.querySelectorAll('.stat-number');
  let countersTriggered = false;
  const heroObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !countersTriggered) {
      countersTriggered = true;
      statNumbers.forEach(el => animateCounter(el));
    }
  }, { threshold: 0.5 });
  const heroSection = document.getElementById('home');
  if (heroSection) heroObserver.observe(heroSection);

  // =============================================
  // Scroll Reveal
  // =============================================
  const revealElements = document.querySelectorAll(
    '.skill-category, .timeline-card, .project-card, .blog-card, .highlight-item, .about-text, .testimonial-card'
  );

  revealElements.forEach(el => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, 100);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  revealElements.forEach(el => revealObserver.observe(el));

  // =============================================
  // Project Filter
  // =============================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.classList.remove('hidden');
          card.style.animation = 'fadeInUp 0.4s ease forwards';
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // =============================================
  // Testimonials Slider
  // =============================================
  const track = document.getElementById('testimonials-track');
  const dots = document.querySelectorAll('.dot');
  let currentSlide = 0;
  let autoSlideInterval;

  function goToSlide(index) {
    currentSlide = index;
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === index));
  }

  function nextSlide() {
    goToSlide((currentSlide + 1) % dots.length);
  }
  function prevSlide() {
    goToSlide((currentSlide - 1 + dots.length) % dots.length);
  }

  document.getElementById('next-testimonial').addEventListener('click', () => {
    nextSlide();
    resetAutoSlide();
  });
  document.getElementById('prev-testimonial').addEventListener('click', () => {
    prevSlide();
    resetAutoSlide();
  });

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      goToSlide(i);
      resetAutoSlide();
    });
  });

  function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 4000);
  }
  function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
  }
  startAutoSlide();

  // Pause on hover
  const sliderEl = document.getElementById('testimonials-slider');
  sliderEl.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
  sliderEl.addEventListener('mouseleave', startAutoSlide);

  // =============================================
  // Contact Form
  // =============================================
  const form = document.getElementById('contact-form');
  const successEl = document.getElementById('form-success');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = document.getElementById('submit-btn');
    btn.disabled = true;
    btn.querySelector('span').textContent = 'Sending...';

    setTimeout(() => {
      form.reset();
      btn.disabled = false;
      btn.querySelector('span').textContent = 'Send Message';
      successEl.classList.add('show');
      setTimeout(() => successEl.classList.remove('show'), 5000);
    }, 1500);
  });

  // =============================================
  // Smooth Anchor Scroll with offset
  // =============================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // =============================================
  // Particle Floating Effect on Hero Grid
  // =============================================
  function createParticle() {
    const heroBg = document.querySelector('.hero-bg');
    if (!heroBg) return;
    const particle = document.createElement('div');
    particle.style.cssText = `
      position: absolute;
      width: ${Math.random() * 3 + 1}px;
      height: ${Math.random() * 3 + 1}px;
      background: rgba(59, 130, 246, ${Math.random() * 0.5 + 0.2});
      border-radius: 50%;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      pointer-events: none;
      animation: particleFloat ${Math.random() * 6 + 4}s ease-in-out infinite;
      animation-delay: ${Math.random() * 4}s;
    `;
    heroBg.appendChild(particle);
    setTimeout(() => particle.remove(), 12000);
  }

  const style = document.createElement('style');
  style.textContent = `
    @keyframes particleFloat {
      0%, 100% { transform: translateY(0) translateX(0); opacity: 0; }
      20% { opacity: 1; }
      80% { opacity: 0.5; }
      100% { transform: translateY(-${Math.random() * 200 + 100}px) translateX(${(Math.random() - 0.5) * 100}px); opacity: 0; }
    }
  `;
  document.head.appendChild(style);
  setInterval(createParticle, 600);

  // =============================================
  // Project Image Gallery & Lightbox (Multi-Card)
  // =============================================
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxBackdrop = document.getElementById('lightbox-backdrop');

  // Wire up each gallery strip independently
  document.querySelectorAll('.project-gallery-strip').forEach(strip => {
    const card = strip.closest('.project-card');
    if (!card) return;

    const cardFeaturedImg = card.querySelector('.featured-img');
    const cardLightboxBtn = card.querySelector('.lightbox-trigger');
    const thumbs = strip.querySelectorAll('.gallery-thumb');

    thumbs.forEach(thumb => {
      thumb.addEventListener('click', () => {
        thumbs.forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');

        const newSrc = thumb.getAttribute('data-src');
        const newCaption = thumb.getAttribute('data-caption');

        if (cardFeaturedImg) {
          cardFeaturedImg.style.opacity = '0';
          setTimeout(() => {
            cardFeaturedImg.src = newSrc;
            cardFeaturedImg.style.opacity = '1';
          }, 150);
        }

        if (cardLightboxBtn) {
          cardLightboxBtn.setAttribute('data-img', newSrc);
          cardLightboxBtn.setAttribute('data-caption', newCaption);
        }
      });
    });

    // Click on featured image opens lightbox
    if (cardFeaturedImg) {
      cardFeaturedImg.style.cursor = 'pointer';
      cardFeaturedImg.addEventListener('click', () => {
        const activeThumb = strip.querySelector('.gallery-thumb.active');
        const caption = activeThumb ? activeThumb.getAttribute('data-caption') : '';
        openLightbox(cardFeaturedImg.src, caption);
      });
    }
  });

  function openLightbox(src, caption) {
    if (!lightboxModal || !lightboxImg) return;
    lightboxImg.src = src;
    if (lightboxCaption) lightboxCaption.textContent = caption || '';
    lightboxModal.classList.add('active');
    lightboxModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightboxModal) return;
    lightboxModal.classList.remove('active');
    lightboxModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.lightbox-trigger').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const src = btn.getAttribute('data-img');
      const caption = btn.getAttribute('data-caption');
      openLightbox(src, caption);
    });
  });

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightboxModal && lightboxModal.classList.contains('active')) {
      closeLightbox();
    }
  });

});
