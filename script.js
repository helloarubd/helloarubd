/* ==========================================================================
   ARU – অরু  |  script.js (Pleasant & Story-Driven)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- 1. Sticky Navigation ---------- */
  var nav = document.getElementById('siteNav');
  if (nav) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        nav.classList.add('is-scrolled');
      } else {
        nav.classList.remove('is-scrolled');
      }
    }, { passive: true });
  }

  /* ---------- 2. Gentle Parallax ---------- */
  var parallaxElements = document.querySelectorAll('[data-speed]');
  if (parallaxElements.length) {
    window.addEventListener('scroll', function() {
      var scrolled = window.pageYOffset;
      parallaxElements.forEach(function(el) {
        var speed = parseFloat(el.getAttribute('data-speed'));
        var yPos = -(scrolled * speed);
        el.style.transform = 'translateY(' + yPos + 'px)';
      });
    }, { passive: true });
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
