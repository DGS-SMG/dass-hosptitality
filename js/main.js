/*
 * Dass Hospitality — main.js
 * Minimal vanilla JS: sticky header, mobile nav, scroll reveal,
 * animated counters, smooth scroll, footer year.
 */
(function () {
  'use strict';

  var header = document.getElementById('site-header');
  var navToggle = document.getElementById('nav-toggle');
  var primaryNav = document.getElementById('primary-nav');

  /* ---------- Sticky header background on scroll ---------- */
  function updateHeaderState() {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  updateHeaderState();
  window.addEventListener('scroll', updateHeaderState, { passive: true });

  /* ---------- Mobile navigation toggle ---------- */
  if (navToggle && primaryNav) {
    navToggle.addEventListener('click', function () {
      var isOpen = primaryNav.classList.toggle('is-open');
      navToggle.classList.toggle('is-open', isOpen);
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close mobile nav after selecting a link
    primaryNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        primaryNav.classList.remove('is-open');
        navToggle.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Scroll reveal (fade/slide elements into view) ---------- */
  var revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window && revealEls.length) {
    var revealObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );

    revealEls.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    // Fallback: show everything immediately
    revealEls.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  /* ---------- Animated statistic counters ---------- */
  var statNumbers = document.querySelectorAll('.stat-number');

  function animateCount(el) {
    var target = parseInt(el.getAttribute('data-target'), 10);
    var suffix = el.getAttribute('data-suffix') || '';
    var staticValue = el.getAttribute('data-static');

    if (staticValue) {
      el.textContent = staticValue;
      return;
    }

    var duration = 1600;
    var start = null;

    function step(timestamp) {
      if (!start) start = timestamp;
      var progress = Math.min((timestamp - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
      var current = Math.floor(eased * target);
      el.textContent = current + suffix;

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        el.textContent = target + suffix;
      }
    }

    window.requestAnimationFrame(step);
  }

  if ('IntersectionObserver' in window && statNumbers.length) {
    var statObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    statNumbers.forEach(function (el) {
      statObserver.observe(el);
    });
  } else {
    statNumbers.forEach(animateCount);
  }

  /* ---------- Trailer video custom play button ---------- */
  var trailerVideo = document.getElementById('trailer-video');
  var videoPlayBtn = document.getElementById('video-play-btn');

  if (trailerVideo && videoPlayBtn) {
    videoPlayBtn.addEventListener('click', function () {
      trailerVideo.play();
    });

    trailerVideo.addEventListener('play', function () {
      videoPlayBtn.classList.add('is-hidden');
    });

    trailerVideo.addEventListener('pause', function () {
      videoPlayBtn.classList.remove('is-hidden');
    });

    trailerVideo.addEventListener('ended', function () {
      videoPlayBtn.classList.remove('is-hidden');
    });
  }

  /* ---------- Footer current year ---------- */
  var yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
})();
