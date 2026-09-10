/* ============================================================
   Levante Kitchen — Seitenlogik
   Mobilmenü, laufender Tag und der Öffnungsstatus. Sonntags geht
   es eine halbe Stunde später los — der einzige Unterschied in
   der Woche, und genau der, den man übersieht.
   ============================================================ */
(function () {
  'use strict';

  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('mainNav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName !== 'A') return;
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  }

  var HOURS = {
    1: [11.5, 22], 2: [11.5, 22], 3: [11.5, 22], 4: [11.5, 22],
    5: [11.5, 22], 6: [11.5, 22], 0: [12, 22]
  };

  function fmt(v) {
    var h = Math.floor(v), m = Math.round((v - h) * 60);
    return h + ':' + (m < 10 ? '0' + m : m);
  }

  var now = new Date();
  var day = now.getDay();
  var dec = now.getHours() + now.getMinutes() / 60;
  var today = HOURS[day];
  var open = dec >= today[0] && dec < today[1];

  var label;
  if (open) {
    label = 'Jetzt geöffnet — bis ' + fmt(today[1]) + ' Uhr';
  } else if (dec < today[0]) {
    label = 'Noch geschlossen — heute ab ' + fmt(today[0]) + ' Uhr';
  } else {
    var next = HOURS[(day + 1) % 7];
    label = 'Feierabend — morgen wieder ab ' + fmt(next[0]) + ' Uhr';
  }

  var badge = document.getElementById('statusBadge');
  var text = document.getElementById('statusText');
  if (badge && text) {
    badge.hidden = false;
    badge.classList.add(open ? 'is-open' : 'is-closed');
    text.textContent = label;
  }

  var headerStatus = document.getElementById('headerStatus');
  if (headerStatus) {
    headerStatus.hidden = false;
    headerStatus.textContent = open ? 'offen bis ' + fmt(today[1]) : 'gerade zu';
    if (open) headerStatus.classList.add('is-open');
  }

  var list = document.getElementById('hoursList');
  if (list) {
    var row = list.querySelector('[data-day="' + day + '"]');
    if (row) row.classList.add('is-today');
  }

  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
