/* ==========================================================================
   ARU – অরু  |  script.js (Pleasant & Story-Driven)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- -1. Preloader ---------- */
  var preloader = document.getElementById('preloader');
  if (preloader) {
    var hidePreloader = function () {
      preloader.classList.add('is-hidden');
    };
    // Hide once everything (fonts/images) has loaded, with a small minimum
    // dwell time so the mark doesn't just flash on fast connections.
    var minTimer = setTimeout(function () {
      if (document.readyState === 'complete') hidePreloader();
    }, 900);
    window.addEventListener('load', function () {
      clearTimeout(minTimer);
      setTimeout(hidePreloader, 500);
    });
  }

  /* ---------- -0.5. Scroll Progress Bar ---------- */
  var scrollProgress = document.getElementById('scrollProgress');
  function updateScrollProgress() {
    if (!scrollProgress) return;
    var scrollTop = window.scrollY || document.documentElement.scrollTop;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    var pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollProgress.style.width = pct + '%';
  }
  updateScrollProgress();

  /* ---------- 0. Theme Toggle ---------- */
  var themeToggle = document.getElementById('themeToggle');

  // Check for saved theme or system preference
  var savedTheme = localStorage.getItem('aru-theme');
  var systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else if (savedTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      var currentTheme = document.documentElement.getAttribute('data-theme');

      // If currently dark, or if no attribute but system is dark
      if (currentTheme === 'dark' || (!currentTheme && systemPrefersDark)) {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('aru-theme', 'light');
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('aru-theme', 'dark');
      }
    });
  }

  /* ---------- 1. Fallback Nav Listener ---------- */
  var navFallback = document.getElementById('siteNav');
  if (navFallback && typeof Lenis === 'undefined') {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        navFallback.classList.add('is-scrolled');
      } else {
        navFallback.classList.remove('is-scrolled');
      }
      updateScrollProgress();
    }, { passive: true });
  }

  /* ---------- 2. Smooth Scroll (Lenis) & Parallax ---------- */
  if (typeof Lenis !== 'undefined') {
    const lenis = new Lenis({
      duration: 1.2,
      easing: function(t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
      smooth: true
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    var parallaxElements = document.querySelectorAll('[data-speed]');
    var nav = document.getElementById('siteNav');

    lenis.on('scroll', function(e) {
      var scrolled = e.scroll;

      /* Sync Parallax */
      parallaxElements.forEach(function(el) {
        var speed = parseFloat(el.getAttribute('data-speed'));
        var yPos = -(scrolled * speed);
        el.style.transform = 'translateY(' + yPos + 'px)';
      });

      /* Sync Sticky Nav */
      if (nav) {
        if (scrolled > 50) {
          nav.classList.add('is-scrolled');
        } else {
          nav.classList.remove('is-scrolled');
        }
      }

      updateScrollProgress();
    });
  } else {
    /* Fallback Parallax */
    var parallaxElements = document.querySelectorAll('[data-speed]');
    if (parallaxElements.length) {
      window.addEventListener('scroll', function() {
        var scrolled = window.pageYOffset;
        parallaxElements.forEach(function(el) {
          var speed = parseFloat(el.getAttribute('data-speed'));
          var yPos = -(scrolled * speed);
          el.style.transform = 'translateY(' + yPos + 'px)';
        });
        updateScrollProgress();
      }, { passive: true });
    }
  }

  /* ---------- 3. Soft Scroll Reveal ---------- */
  var revealTargets = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && revealTargets.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    revealTargets.forEach(function (el) { observer.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- 3b. Image Unveil (curtain-wipe) ---------- */
  var imageRevealTargets = document.querySelectorAll('.image-frame, .card-image, .style-image');
  if ('IntersectionObserver' in window && imageRevealTargets.length) {
    var imgObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          imgObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    imageRevealTargets.forEach(function (el) { imgObserver.observe(el); });
  } else {
    imageRevealTargets.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- 3c. Mobile Menu ---------- */
  var navToggle = document.getElementById('navToggle');
  var mobileMenu = document.getElementById('mobileMenu');
  if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', function () {
      var isOpen = mobileMenu.classList.toggle('is-open');
      navToggle.classList.toggle('is-open', isOpen);
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileMenu.classList.remove('is-open');
        navToggle.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- 4. FAQ Accordion ---------- */
  var accordions = document.querySelectorAll('.accordion-item');
  accordions.forEach(function(acc) {
    var header = acc.querySelector('.accordion-header');
    header.addEventListener('click', function() {
      var isActive = acc.classList.contains('is-active');

      // Close all others
      accordions.forEach(function(other) {
        other.classList.remove('is-active');
      });

      // Toggle current
      if (!isActive) {
        acc.classList.add('is-active');
      }
    });
  });

  /* ---------- 5. Waitlist Form ---------- */
  var notifyForm = document.getElementById('notifyForm');
  var notifyNote = document.getElementById('notifyNote');

  if (notifyForm && notifyNote) {
    notifyForm.addEventListener('submit', function (event) {
      event.preventDefault();
      var emailInput = document.getElementById('notifyEmail');
      var email = emailInput ? emailInput.value.trim() : '';

      if (!email) {
        notifyNote.textContent = 'Please enter a valid email address.';
        return;
      }

      notifyNote.textContent = 'Thank you! You have been added to our waitlist.';
      notifyForm.reset();
    });
  }
});