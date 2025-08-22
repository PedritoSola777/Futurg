
/* ===== GF HERO ===== */
(function () {
  // 1) Altura estable desde el primer frame
  function setVH() {
    var h = (window.visualViewport && visualViewport.height) || window.innerHeight;
    document.documentElement.style.setProperty('--gf-hero-vh', (h * 0.01) + 'px');
  }
  setVH();
  window.addEventListener('resize', setVH, { passive: true });
  window.addEventListener('orientationchange', setVH, { passive: true });

  // 2) Slider
  function initGFHero(root) {
    var slides = [].slice.call(root.querySelectorAll('.gf-hero__slide'));
    var dotsBox = root.querySelector('.gf-hero__dots');
    var prevBtn = root.querySelector('.gf-hero__arrow--prev');
    var nextBtn = root.querySelector('.gf-hero__arrow--next');

    var idx = 0;
    var autoplay = root.dataset.autoplay === 'true';
    var interval = parseInt(root.dataset.interval || '6000', 10);
    var timer = null;

    // Dots
    dotsBox.innerHTML = '';
    slides.forEach(function(_, i){
      var b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('role', 'tab');
      b.setAttribute('aria-label', 'Ir al slide ' + (i+1));
      b.addEventListener('click', function(){ go(i); stop(); });
      dotsBox.appendChild(b);
    });

    function mark() {
      slides.forEach(function(s, i){
        s.classList.toggle('is-active', i === idx);
      });
      [].forEach.call(dotsBox.children, function(b, i){
        b.setAttribute('aria-selected', i === idx ? 'true' : 'false');
      });
    }
    function go(n) {
      idx = (n + slides.length) % slides.length;
      mark();
    }
    function next(){ go(idx + 1); }
    function prev(){ go(idx - 1); }

    function start(){
      if (!autoplay) return;
      stop();
      timer = setInterval(next, interval);
    }
    function stop(){
      if (timer) { clearInterval(timer); timer = null; }
    }

    // Swipe
    var startX = null;
    root.addEventListener('touchstart', function (e) { startX = e.touches[0].clientX; }, { passive: true });
    root.addEventListener('touchend', function (e) {
      if (startX == null) return;
      var dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 40) { (dx < 0 ? next() : prev()); stop(); }
      startX = null;
    });

    // Flechas
    prevBtn.addEventListener('click', function(){ prev(); stop(); });
    nextBtn.addEventListener('click', function(){ next(); stop(); });

    // Iniciar
    go(0);
    start();

    // pausa si la pestaña no está visible
    document.addEventListener('visibilitychange', function(){
      if (document.hidden) stop(); else start();
    });
  }

  document.addEventListener('DOMContentLoaded', function(){
    var viewport = document.querySelector('.gf-hero .gf-hero__viewport');
    if (viewport) initGFHero(viewport);
  });
})();
