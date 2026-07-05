/* ==========================================================================
   ARU – অরু  |  script.js (Premium Luxury)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- 1. Custom Cursor ---------- */
  var cursor = document.getElementById('customCursor');
  var follower = document.getElementById('customCursorFollower');
  var isHovering = false;

  if (cursor && follower) {
    document.addEventListener('mousemove', function(e) {
      // Follower follows with slight delay
      follower.style.transform = 'translate(' + e.clientX + 'px, ' + e.clientY + 'px)';
      // Cursor follows instantly
      cursor.style.transform = 'translate(' + e.clientX + 'px, ' + e.clientY + 'px)';
    });

    var interactables = document.querySelectorAll('a, button, input');
    interactables.forEach(function(el) {
      el.addEventListener('mouseenter', function() {
        cursor.classList.add('hover');
        follower.classList.add('hover');
      });
      el.addEventListener('mouseleave', function() {
        cursor.classList.remove('hover');
        follower.classList.remove('hover');
      });
    });
  }

  /* ---------- 2. Cinematic Scroll Reveal ---------- */
  var revealTargets = document.querySelectorAll('[data-reveal]');

  if ('IntersectionObserver' in window && revealTargets.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          // Don't unobserve if you want it to fade in every time it scrolls into view,
          // but for a luxury feel, usually fading in once is better.
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });

    revealTargets.forEach(function (el) { observer.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- 3. Fullscreen Menu Toggle ---------- */
  var menuToggle = document.getElementById('menuToggle');
  var luxuryNav = document.getElementById('luxuryNav');
  var navLinks = document.querySelectorAll('.luxury-nav__links a');

  if (menuToggle && luxuryNav) {
    menuToggle.addEventListener('click', function () {
      var isOpen = luxuryNav.classList.contains('is-open');
      if (isOpen) {
        luxuryNav.classList.remove('is-open');
        menuToggle.querySelector('.menu-text').textContent = 'Menu';
        document.body.style.overflow = '';
      } else {
        luxuryNav.classList.add('is-open');
        menuToggle.querySelector('.menu-text').textContent = 'Close';
        document.body.style.overflow = 'hidden';
      }
    });

    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        luxuryNav.classList.remove('is-open');
        menuToggle.querySelector('.menu-text').textContent = 'Menu';
        document.body.style.overflow = '';
      });
    });
  }

  /* ---------- 4. Live Countdown ---------- */
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

    if (countdownEls.days) countdownEls.days.textContent = pad(days);
    if (countdownEls.hours) countdownEls.hours.textContent = pad(hours);
    if (countdownEls.minutes) countdownEls.minutes.textContent = pad(minutes);
    if (countdownEls.seconds) countdownEls.seconds.textContent = pad(seconds);
  }

  if (countdownEls.days) {
    updateCountdown();
    setInterval(updateCountdown, 1000);
  }

  /* ---------- 5. Waitlist Form ---------- */
  var notifyForm = document.getElementById('notifyForm');
  var notifyNote = document.getElementById('notifyNote');

  if (notifyForm && notifyNote) {
    notifyForm.addEventListener('submit', function (event) {
      event.preventDefault();
      var emailInput = document.getElementById('notifyEmail');
      var email = emailInput ? emailInput.value.trim() : '';

      if (!email) {
        notifyNote.textContent = 'Please provide a valid email.';
        return;
      }

      notifyNote.textContent = 'Welcome to the waitlist.';
      notifyForm.reset();
    });
  }
});
