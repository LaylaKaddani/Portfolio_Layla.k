/* ============================================================
   main.js — Portfolio Layla KADDANI
   Auteur     : Layla KADDANI
   Description: Tous les comportements interactifs du portfolio
                (navigation, scroll reveal, barres de prog.,
                 filtres projets, modale, formulaire contact).
   ============================================================ */

/* ─────────────────────────────────────────────────────────
   DONNÉES DES PROJETS (utilisées par la modale)
───────────────────────────────────────────────────────── */
const PROJECT_DATA = {
  p7: {
    emoji : '📱', title : 'GeoEvent – Application Android',
    period: 'Mars – Mai 2026',
    desc  : "Application Android de partage d'événements géolocalisés : carte interactive, upload photos, filtrage par distance.",
    details: [
      'Authentification Firebase Auth (email / mot de passe)',
      'Carte Google Maps API avec marqueurs dynamiques pour chaque événement',
      "Ajout d'événement : géolocalisation auto ou manuelle, titre, description, photo",
      'Sauvegarde Firestore + images Firebase Storage',
      'Filtrage par distance via calcul Haversine',
      'Gestion des permissions Android (localisation, caméra, stockage)',
      "Règles Firestore : seul l'auteur peut modifier / supprimer son événement",
      'Chiffrement TLS en transit, AES-256 au repos (Firebase)'
    ],
    tech : ['Java','Android','Firebase Auth','Firestore','Firebase Storage','Google Maps API','Haversine'],
    cyber: 'Authentification, moindre privilège (règles Firestore), chiffrement TLS + AES-256, validation des entrées, sécurisation MIME des médias.'
  },
  p6: {
    emoji : '🏙️', title : 'Smart Berkane – Ville Intelligente IoT',
    period: 'Avril – Mai 2025 · Stage 2 mois · MAJAL Berkane',
    desc  : 'Maquette fonctionnelle de smart city : inondations, éclairage adaptatif, suivi bus RFID, tri des déchets YOLOv8, supervision Django.',
    details: [
      'Gestion des inondations : HC-SR04 → pompage automatique → recyclage eau',
      'Éclairage adaptatif LDR + PIR, économie énergie ~40%',
      'Suivi de bus RFID (ESP32 + RC522) affiché sur carte OpenStreetMap / Leaflet',
      'Architecture MQTT : ESP8266/ESP32 ↔ Broker Mosquitto ↔ Django',
      'Interface web Django RBAC : citoyen (visualisation) / admin (commande)',
      'Module tri déchets YOLOv8-classify sur Raspberry Pi 4 – précision 84–87%',
      'Communication MQTTS (TLS) pour sécuriser les échanges IoT'
    ],
    tech : ['Python','Django','MQTT','Mosquitto','ESP8266','ESP32','Raspberry Pi 4','YOLOv8','SQLite','Leaflet'],
    cyber: 'RBAC, journalisation horodatée SQLite, MQTTS (TLS), durcissement Raspberry Pi, authentification sessions Django.'
  },
  p5: {
    emoji : '🔐', title : "Contrôle d'accès par Reconnaissance Faciale",
    period: 'Janvier – Mars 2025 · 2 mois',
    desc  : "Système biométrique anti-spoofing : reconnaissance faciale temps réel + liveness detection + journalisation MongoDB + interface admin.",
    details: [
      'Encodage facial dlib / face_recognition sur Raspberry Pi 4',
      'Liveness detection : calcul EAR (Eye Aspect Ratio) → rejette photos & masques',
      'Distance euclidienne pour la comparaison (seuil 0.55)',
      'Servo-moteur ouvre la porte si authentification + liveness validées',
      'Journalisation MongoDB : chaque tentative horodatée + photo conservée',
      'Alertes e-mail SMTP avec photo en pièce jointe (intrusions)',
      'Interface admin PyQt5 : gestion utilisateurs, logs, export CSV',
      'Séparation des privilèges : utilisateur standard ≠ administrateur'
    ],
    tech : ['Python','OpenCV','dlib','face_recognition','PyQt5','MongoDB','Raspberry Pi 4','smtplib','PIR HC-SR501'],
    cyber: 'Authentification biométrique, anti-spoofing (liveness), traçabilité totale, séparation des privilèges, stockage local des images (RGPD).'
  },
  p4: {
    emoji : '📡', title : 'Supervision IoT – Node-RED + MQTT',
    period: '2024',
    desc  : 'Supervision temps réel : ESP8266 collecte température/humidité/luminosité, Raspberry Pi héberge broker + dashboard Node-RED.',
    details: [
      'ESP8266 : DHT11, LDR, commande LED et servo SG90',
      'Broker Mosquitto sur Raspberry Pi 4',
      'Dashboard Node-RED : jauges, graphiques, switch LED, slider servo',
      'Latence < 0.5 s, reconnexion WiFi automatique',
      'Alertes Node-RED si température > 35°C ou humidité < 20%'
    ],
    tech : ['C++','ESP8266','Raspberry Pi 4','MQTT','Mosquitto','Node-RED','DHT11','LDR'],
    cyber: "Surveillance anomalies thermiques, contrôle à distance, alertes de dépassement de seuil critique (serveurs, datacenter)."
  },
  p3: {
    emoji : '🌡️', title : 'Station de Surveillance Environnementale',
    period: '2024',
    desc  : 'Raspberry Pi Pico mesure T°, humidité, luminosité et eau toutes les 5 s. Dashboard Tkinter avec 6 modes de graphiques.',
    details: [
      'Raspberry Pi Pico H : DHT11, LDR via ADC 16 bits, capteur eau',
      'Acquisition toutes les 5 s, stockage CSV (MicroPython)',
      'Dashboard Tkinter : graphiques séparés, combinés, tableau CSV',
      'Chargement dynamique de tout fichier CSV',
      'Graphiques Matplotlib interactifs (zoom, déplacement)'
    ],
    tech : ['MicroPython','Raspberry Pi Pico','Python','Tkinter','Pandas','Matplotlib'],
    cyber: "Surveillance datacenter (T°/humidité anormale = risque incendie), détection de fuite d'eau."
  },
  p2: {
    emoji : '🚨', title : 'Alarme Intrusion PIR + Notification WhatsApp',
    period: '2024',
    desc  : "Alarme domestique : détection PIR → buzzer + LED rouge + message WhatsApp en < 5 secondes via API CallMeBot.",
    details: [
      'Arduino Uno : PIR HC-SR501, buzzer (1 kHz), LED rouge',
      'ESP8266 : WiFi + requête HTTP GET vers CallMeBot',
      'Communication série SoftwareSerial Arduino → ESP8266',
      'Réception WhatsApp < 5 s après détection',
      'Autonomie batterie 9V (~200 mA)'
    ],
    tech : ['C++','Arduino Uno','ESP8266','PIR HC-SR501','API CallMeBot','SoftwareSerial'],
    cyber: "Détection d'intrusion physique, notification temps réel, base d'un IDS physique autonome."
  },
  p1: {
    emoji : '💧', title : "Dashboard Qualité de l'Eau – Aquapark",
    period: 'Juillet 2024 · Stage 1 mois · Alpamare Saïdia',
    desc  : "Tableau de bord interactif pour analyser pH, chlore et métriques chimiques d'un parc aquatique. Livré en .exe autonome.",
    details: [
      'Nettoyage données Excel désordonnées avec Pandas (melt, renommage)',
      'Sous-graphiques 2×4 : consommation par produit chimique',
      'Suivi pH avec plage verte de conformité (7.0–7.4)',
      'Métriques : 5 855 clients, coût/client 7.74 DH, total 45 344 DH',
      'Exécutable Windows autonome via PyInstaller'
    ],
    tech : ['Python','Pandas','Seaborn','Matplotlib','PyInstaller','Excel'],
    cyber: "Surveillance données industrielles critiques, livraison sécurisée sans exposition du code source (exécutable compilé)."
  }
};

/* ─────────────────────────────────────────────────────────
   1. NAVIGATION — HAMBURGER MOBILE
───────────────────────────────────────────────────────── */

/**
 * Active le menu hamburger pour les petits écrans.
 * Un clic ouvre/ferme le panneau de navigation latéral.
 */
function initHamburger() {
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('nav-links');
  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));

  /* Fermeture automatique après clic sur un lien */
  navLinks.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => navLinks.classList.remove('open'))
  );
}

/* ─────────────────────────────────────────────────────────
   2. NAVIGATION — LIEN ACTIF AU SCROLL (page unique)
───────────────────────────────────────────────────────── */

/**
 * Surligne dans la nav le lien correspondant à la section
 * actuellement visible pendant le défilement.
 */
function initActiveNavOnScroll() {
  const sections = document.querySelectorAll('section[id]');
  const navAs    = document.querySelectorAll('.nav-links a');
  if (sections.length === 0) return;

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 140) current = sec.id;
    });
    navAs.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  });
}

/* ─────────────────────────────────────────────────────────
   3. SCROLL REVEAL — apparition au défilement
───────────────────────────────────────────────────────── */

/**
 * Déclenche l'animation CSS ".reveal → .reveal.visible"
 * quand l'élément entre dans le viewport (IntersectionObserver).
 */
function initScrollReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);  /* animation unique */
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/* ─────────────────────────────────────────────────────────
   4. BARRES DE PROGRESSION — animation au scroll
───────────────────────────────────────────────────────── */

/**
 * Anime les barres de compétences lorsqu'elles entrent
 * dans le viewport. La cible est stockée dans data-width.
 */
function initProgressBars() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
          bar.style.width = (bar.dataset.width || 0) + '%';
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  /* Observer chaque conteneur de barres de progression */
  document.querySelectorAll('.skill-category, .progress-section, #apropos').forEach(el =>
    observer.observe(el)
  );
}

/* ─────────────────────────────────────────────────────────
   5. BOUTON SCROLL-TO-TOP
───────────────────────────────────────────────────────── */

/**
 * Affiche le bouton "↑" quand l'utilisateur a défilé
 * de plus de 400px depuis le haut de la page.
 */
function initScrollTop() {
  const btn = document.getElementById('scroll-top');
  if (!btn) return;

  window.addEventListener('scroll', () =>
    btn.classList.toggle('visible', window.scrollY > 400)
  );

  btn.addEventListener('click', () =>
    window.scrollTo({ top: 0, behavior: 'smooth' })
  );
}

/* ─────────────────────────────────────────────────────────
   6. FILTRES PROJETS
───────────────────────────────────────────────────────── */

/**
 * Gère les boutons de filtre sur la section / page Projets.
 * Chaque .project-card doit avoir l'attribut data-categories.
 */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  if (filterBtns.length === 0) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      /* Mise à jour de l'état actif */
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      document.querySelectorAll('.project-card').forEach(card => {
        const cats = card.dataset.categories || '';
        if (filter === 'all' || cats.includes(filter)) {
          card.style.display = '';
          /* léger délai pour que l'animation CSS de disparition se termine */
          setTimeout(() => { card.style.opacity = '1'; }, 10);
        } else {
          card.style.opacity = '0';
          setTimeout(() => { card.style.display = 'none'; }, 300);
        }
      });
    });
  });
}

/* ─────────────────────────────────────────────────────────
   7. MODALE PROJETS
───────────────────────────────────────────────────────── */

/**
 * Ouvre la modale et l'hydrate avec les données du projet.
 * @param {string} id — identifiant du projet (ex : 'p5')
 */
function openModal(id) {
  const d       = PROJECT_DATA[id];
  const overlay = document.getElementById('modal-overlay');
  const content = document.getElementById('modal-content');
  if (!d || !overlay || !content) return;

  const listHtml = d.details.map(li => `<li>${li}</li>`).join('');
  const techHtml = d.tech.map(t  => `<span class="modal-tech-tag">${t}</span>`).join('');

  content.innerHTML = `
    <button class="modal-close" onclick="closeModal()">
      <i class="fa-solid fa-xmark"></i>
    </button>
    <span class="modal-emoji">${d.emoji}</span>
    <h2>${d.title}</h2>
    <p class="modal-period">
      <i class="fa-solid fa-calendar" style="margin-right:.4rem;"></i>${d.period}
    </p>

    <div class="modal-section">
      <h4>Description</h4>
      <p>${d.desc}</p>
    </div>

    <div class="modal-section">
      <h4>Réalisations clés</h4>
      <ul>${listHtml}</ul>
    </div>

    <div class="modal-section">
      <h4>Technologies utilisées</h4>
      <div class="modal-tech-tags">${techHtml}</div>
    </div>

    <div class="modal-section">
      <h4>
        <i class="fa-solid fa-shield-halved"
           style="color:var(--clr-accent2);margin-right:.4rem;"></i>
        Liens avec la cybersécurité
      </h4>
      <p style="color:var(--clr-accent2);font-size:.9rem;">${d.cyber}</p>
    </div>
  `;

  overlay.classList.add('open');
  document.body.style.overflow = 'hidden'; /* bloque le scroll du fond */
}

/**
 * Ferme la modale.
 * @param {Event} [e] — événement de clic (optionnel)
 *   Si fourni, ne ferme que si le clic est sur l'overlay,
 *   pas sur le contenu de la modale elle-même.
 */
function closeModal(e) {
  const overlay = document.getElementById('modal-overlay');
  if (!overlay) return;
  if (!e || e.target === overlay) {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }
}

/* Fermeture via touche Échap */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});

/* ─────────────────────────────────────────────────────────
   8. FORMULAIRE DE CONTACT
───────────────────────────────────────────────────────── */

/**
 * Valide et "envoie" (simulation) le formulaire de contact.
 * Affiche un message de succès ou d'erreur dans #form-feedback.
 */
function sendForm() {
  const nom   = document.getElementById('contact-nom')   ?.value.trim() ?? '';
  const email = document.getElementById('contact-email') ?.value.trim() ?? '';
  const msg   = document.getElementById('contact-msg')   ?.value.trim() ?? '';
  const fb    = document.getElementById('form-feedback');
  if (!fb) return;

  /* ── Validation des champs obligatoires ── */
  if (!nom || !email || !msg) {
    afficherFeedback(fb, '⚠ Veuillez remplir les champs obligatoires (nom, email, message).', 'error');
    return;
  }

  /* ── Validation du format email (RFC 5322 simplifié) ── */
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    afficherFeedback(fb, '⚠ Adresse email invalide.', 'error');
    return;
  }

  /* ── Succès ── */
  afficherFeedback(fb, '✅ Message envoyé ! Je vous répondrai très rapidement.', 'success');

  /* Réinitialisation des champs */
  ['contact-nom','contact-email','contact-sujet','contact-msg'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
}

/**
 * Affiche un message de retour dans un élément.
 * @param {HTMLElement} el   — conteneur du message
 * @param {string}      text — texte à afficher
 * @param {string}      type — 'success' | 'error'
 */
function afficherFeedback(el, text, type) {
  el.textContent   = text;
  el.style.display = 'block';
  el.style.color   = type === 'success' ? 'var(--clr-accent2)' : '#ff6b6b';
}

/* ─────────────────────────────────────────────────────────
   9. COMPTEUR ANIMÉ (stats hero)
───────────────────────────────────────────────────────── */

/**
 * Anime les chiffres des statistiques du hero
 * de 0 jusqu'à leur valeur cible en 1.5 secondes.
 */
function initCounters() {
  const counters = document.querySelectorAll('.stat-num[data-target]');
  if (counters.length === 0) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el     = entry.target;
      const target = parseInt(el.dataset.target, 10);
      const suffix = el.dataset.suffix || '';
      let current  = 0;
      const step   = Math.ceil(target / 60);   /* 60 frames ≈ 1 s */

      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        el.textContent = current + suffix;
      }, 25);

      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}

/* ─────────────────────────────────────────────────────────
   10. INITIALISATION GLOBALE
───────────────────────────────────────────────────────── */

/**
 * Point d'entrée : toutes les initialisations une fois
 * le DOM complètement chargé.
 */
document.addEventListener('DOMContentLoaded', () => {
  initHamburger();
  initActiveNavOnScroll();
  initScrollReveal();
  initProgressBars();
  initScrollTop();
  initProjectFilters();
  initCounters();
});
