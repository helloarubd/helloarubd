/* ==========================================================================
   ARU – অরু  |  script.js
   Enhanced interactivity:
   1. Page loader with graceful hide
   2. Scroll reveal with stagger support
   3. Sticky glassmorphism navigation
   4. Live countdown timer
   5. Scroll progress indicator
   6. Notify Me form with visual feedback
   7. Mouse parallax on hero decorative elements
   8. Mobile navigation toggle
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- 1. Page loader ---------- */
  var loader = document.getElementById('loader');
  if (loader) {
    window.setTimeout(function () {
      loader.classList.add('is-hidden');
    }, 800);
  }

  /* ---------- 2. Scroll reveal ---------- */
  var revealTargets = document.querySelectorAll('[data-reveal]');

  if ('IntersectionObserver' in window && revealTargets.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

    revealTargets.forEach(function (el) { observer.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- 3. Sticky navigation ---------- */
  var nav = document.querySelector('.site-nav');
  var hero = document.getElementById('hero');

  if (nav && hero) {
    var lastScrollY = 0;
    var heroBottom = 0;

    function updateNav() {
      var scrollY = window.pageYOffset || document.documentElement.scrollTop;
      heroBottom = hero.offsetTop + hero.offsetHeight * 0.4;

      if (scrollY > heroBottom) {
        nav.classList.add('is-visible');
        nav.classList.add('is-scrolled');
      } else {
        nav.classList.remove('is-visible');
        nav.classList.remove('is-scrolled');
      }

      lastScrollY = scrollY;
    }

    window.addEventListener('scroll', updateNav, { passive: true });
    updateNav();
  }

  /* ---------- 4. Live countdown ---------- */
  var launchDate = new Date();
  launchDate.setDate(launchDate.getDate() + 30);
  launchDate.setHours(0, 0, 0, 0);

  var countdownEls = {
    days: document.getElementById('countDays'),
    hours: document.getElementById('countHours'),
    minutes: document.getElementById('countMinutes'),
    seconds: document.getElementById('countSeconds')
  };

  function updateCountdown() {
    var now = new Date().getTime();
    var distance = launchDate.getTime() - now;

    if (distance <= 0) {
      Object.keys(countdownEls).forEach(function (key) {
        if (countdownEls[key]) countdownEls[key].textContent = '00';
      });
      return;
    }

    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    function pad(n) { return n < 10 ? '0' + n : '' + n; }

    function updateUnit(el, value) {
      if (!el) return;
      var padded = pad(value);
      if (el.textContent !== padded) {
        el.textContent = padded;
        el.classList.remove('tick');
        void el.offsetWidth;
        el.classList.add('tick');
      }
    }

    updateUnit(countdownEls.days, days);
    updateUnit(countdownEls.hours, hours);
    updateUnit(countdownEls.minutes, minutes);
    updateUnit(countdownEls.seconds, seconds);
  }

  if (countdownEls.days) {
    updateCountdown();
    setInterval(updateCountdown, 1000);
  }

  /* ---------- 5. Scroll progress ---------- */
  var progressBar = document.querySelector('.scroll-progress');

  if (progressBar) {
    window.addEventListener('scroll', function () {
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      var docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      var scrollPercent = (scrollTop / docHeight) * 100;
      progressBar.style.width = scrollPercent + '%';
    }, { passive: true });
  }

  /* ---------- 6. Notify Me form ---------- */
  var notifyForm = document.getElementById('notifyForm');
  var notifyNote = document.getElementById('notifyNote');

  if (notifyForm && notifyNote) {
    notifyForm.addEventListener('submit', function (event) {
      event.preventDefault();
      var emailInput = document.getElementById('notifyEmail');
      var email = emailInput ? emailInput.value.trim() : '';

      if (!email) {
        notifyNote.textContent = 'Please enter a valid email address.';
        notifyNote.classList.remove('success');
        return;
      }

      notifyNote.textContent = "\u2713 Thank you! We'll let you know as soon as we launch.";
      notifyNote.classList.add('success');
      notifyForm.reset();
    });
  }

  /* ---------- 7. Mouse parallax on hero ---------- */
  var heroContent = document.querySelector('.hero__content');
  var heroDecor = document.querySelector('.hero__decor');

  if (heroContent && heroDecor && window.matchMedia('(min-width: 768px)').matches) {
    document.addEventListener('mousemove', function (e) {
      var x = (e.clientX / window.innerWidth - 0.5) * 2;
      var y = (e.clientY / window.innerHeight - 0.5) * 2;

      requestAnimationFrame(function () {
        heroDecor.style.transform = 'translate(' + (x * 8) + 'px, ' + (y * 6) + 'px)';
      });
    });
  }

  /* ---------- 8. Mobile navigation ---------- */
  var navToggle = document.querySelector('.site-nav__toggle');
  var navLinks = document.querySelector('.site-nav__links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      navToggle.classList.toggle('is-active');
      navLinks.classList.toggle('is-open');
      document.body.style.overflow = navLinks.classList.contains('is-open') ? 'hidden' : '';
    });

    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navToggle.classList.remove('is-active');
        navLinks.classList.remove('is-open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---------- 9. Smooth scroll for anchor links ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        var navHeight = nav ? nav.offsetHeight : 0;
        var targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
    });
  });

});
