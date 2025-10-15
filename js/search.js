
(function () {
  var mq = window.matchMedia('(max-width: 991px)');
  var header = document.querySelector('.theme-menu-wrapper');
  var menu = document.querySelector('#mega-menu-holder > ul');
  var burger = document.querySelector('.navbar-toggle, .navbar-toggler, .menu-icon, .menu-trigger, .meanmenu-reveal');

  function isOpen(){ return document.documentElement.classList.contains('menu-open'); }
  function open(){ document.documentElement.classList.add('menu-open'); }
  function close(){ document.documentElement.classList.remove('menu-open'); }

  close();

  if (burger) {
    burger.addEventListener('click', function (e) {
      if (!mq.matches) return;
      e.preventDefault();
      isOpen() ? close() : open();
    });
  }

  document.querySelectorAll('#mega-menu-holder a').forEach(function (a) {
    a.addEventListener('click', function () {
      if (mq.matches) close();
    });
  });

  document.addEventListener('click', function (e) {
    if (!mq.matches) return;
    if (!header) return;
    if (!header.contains(e.target)) close();
  });

  window.addEventListener('resize', function () {
    if (!mq.matches) close();
  });

  window.addEventListener('load', function(){ close(); });
})();
