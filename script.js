/* ================================================
   SWIFTHAUL LOGISTICS — JAVASCRIPT
   All interactive behaviours are here.
   Edit comments marked EDIT to customize easily.
   ================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ─── 1. INITIALIZE LUCIDE ICONS ─── */
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }


  /* ─── 2. NAVBAR SCROLL EFFECT ─── */
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });


  /* ─── 3. MOBILE HAMBURGER MENU ─── */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  // Close mobile menu when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
    });
  });


  /* ─── 4. ANIMATED STAT COUNTERS ─── */
  // Numbers in the hero section count up on load.
  // To change a target number, edit `data-target` in HTML.
  const statNumbers = document.querySelectorAll('.stat-number');

  const animateCounter = (el) => {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1800; // milliseconds
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        el.textContent = target;
        clearInterval(timer);
      } else {
        el.textContent = Math.floor(current);
      }
    }, 16);
  };

  // Trigger counters when hero section enters view
  const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        statNumbers.forEach(animateCounter);
        heroObserver.disconnect();
      }
    });
  }, { threshold: 0.3 });

  const heroSection = document.getElementById('home');
  if (heroSection) heroObserver.observe(heroSection);


  /* ─── 5. SCROLL-TRIGGERED CARD ANIMATIONS ─── */
  // Service cards fade-in when scrolled into view.
  const animatedCards = document.querySelectorAll('.service-card');

  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        entry.target.style.animationDelay = `${delay}ms`;
        entry.target.classList.add('visible');
        cardObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  animatedCards.forEach(card => cardObserver.observe(card));


  /* ─── 6. GENERAL FADE-IN ON SCROLL ─── */
  // Add class="fade-in-scroll" to any element you want to animate on scroll.
  const fadeElements = document.querySelectorAll(
    '.step, .coverage-item, .why-card, .testimonial-card, .pricing-card'
  );

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, index * 80);
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  fadeElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    fadeObserver.observe(el);
  });


  /* ─── 7. CONTACT FORM SUBMISSION ─── */
  // EDIT: Replace the console.log with your own form handler,
  // e.g. fetch() to a backend endpoint or a service like Formspree.
  const contactForm   = document.getElementById('contactForm');
  const formSuccess   = document.getElementById('formSuccess');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault(); // Prevent actual page reload

      // Collect form data
      const formData = {
        firstName: contactForm.fname.value.trim(),
        lastName:  contactForm.lname.value.trim(),
        email:     contactForm.email.value.trim(),
        service:   contactForm.service.value,
        message:   contactForm.message.value.trim(),
      };

      // --- EDIT THIS BLOCK TO SEND DATA TO YOUR SERVER ---
      // Example using Formspree:
      //
      // fetch('https://formspree.io/f/YOUR_FORM_ID', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData),
      // });
      //
      // For now, we just log to console and show success message:
      console.log('Form submitted:', formData);
      // --- END EDIT BLOCK ---

      // Show success message and reset form
      formSuccess.style.display = 'block';
      contactForm.reset();

      // Hide success message after 5 seconds
      setTimeout(() => {
        formSuccess.style.display = 'none';
      }, 5000);
    });
  }


  /* ─── 8. SMOOTH SCROLL FOR NAV LINKS ─── */
  // Handles offset for the fixed navbar height.
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();

      // EDIT: Adjust offset if your navbar height changes
      const navHeight = 80;
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;

      window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    });
  });


  /* ─── 9. ACTIVE NAV LINK HIGHLIGHT ─── */
  // Highlights the nav link matching the section currently in view.
  const sections  = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navAnchors.forEach(a => {
          a.style.color = a.getAttribute('href') === `#${id}`
            ? 'var(--color-text)'
            : '';
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => sectionObserver.observe(s));


  /* ─── 10. MAP DOT TOOLTIPS (already in CSS, bonus JS fallback) ─── */
  // Ensures map location labels show on touch devices.
  document.querySelectorAll('.map-dot').forEach(dot => {
    dot.addEventListener('click', () => {
      const label = dot.querySelector('span');
      if (label) {
        label.style.display = label.style.display === 'block' ? 'none' : 'block';
      }
    });
  });

}); // end DOMContentLoaded
