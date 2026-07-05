/* ==========================================================================
   ARU – অরু  |  script.js
   Small, dependency-free enhancements:
   1. Hide the CSS loader once the page has painted.
   2. Reveal [data-reveal] elements as they scroll into view.
   3. Visual-only "Notify Me" form feedback (no backend, no network call).
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- 1. Page loader ---------- */
  var loader = document.getElementById('loader');
  if (loader) {
    // Small delay so the draw-in animation is visible even on fast loads.
    window.setTimeout(function () {
      loader.classList.add('is-hidden');
    }, 700);
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
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    revealTargets.forEach(function (el) { observer.observe(el); });
  } else {
    // Fallback: just show everything if IntersectionObserver isn't available.
    revealTargets.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- 3. Notify Me form (visual only) ---------- */
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

      // No backend exists yet — this is a front-end-only confirmation.
      notifyNote.textContent = "Thank you! We'll let you know as soon as we launch.";
      notifyForm.reset();
    });
  }

});
