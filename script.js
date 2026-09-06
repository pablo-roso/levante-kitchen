// Levante Kitchen — Pitch-Website (Entwurf)
// Reines Vanilla-JS, keine Frameworks/Build-Tools.

(function () {
  "use strict";

  // Aktuelles Jahr im Footer
  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  // Mobile Navigation ein-/ausklappen
  var navToggle = document.getElementById("nav-toggle");
  var navList = document.getElementById("nav-list");

  if (navToggle && navList) {
    navToggle.addEventListener("click", function () {
      var isOpen = navList.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    // Menü nach Klick auf einen Link automatisch schließen (mobil)
    navList.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navList.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Kontaktformular: rein clientseitige Mock-UI, es wird nichts versendet.
  var contactForm = document.getElementById("contact-form");
  var formResponse = document.getElementById("form-response");

  if (contactForm && formResponse) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();
      formResponse.hidden = false;
      formResponse.textContent =
        "Danke fürs Ausprobieren! Dies ist nur ein Website-Entwurf – das Formular ist noch nicht aktiv und hat nichts versendet.";
    });
  }
})();
