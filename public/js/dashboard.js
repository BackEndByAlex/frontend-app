document.addEventListener('DOMContentLoaded', function() {
  let isVerified = false; 

  const navItems = document.querySelectorAll('.nav-item[data-section]');
  const sections = document.querySelectorAll('.dashboard-section');
  const menuToggle = document.getElementById('menuToggle');
  const sidebar = document.getElementById('sidebar');
  const toggleButton = document.getElementById('toggleButton');
  const verifyModal = document.getElementById('verifyModal');
  const modalOverlay = document.getElementById('modalOverlay');

  // Funktion för att uppdatera breadcrumb-texten
  function updateBreadcrumb(section) {
    const breadcrumb = document.querySelector('.breadcrumb-current');
    const sectionNames = {
      'dashboard': 'Dashboard',
      'password': 'Password',
      'note': 'Note',
      'settings': 'Settings'
    };
    if (breadcrumb) {
      breadcrumb.textContent = sectionNames[section] || section;
    }
  }

  // Hantera navigationens klick-event
  navItems.forEach(item => {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      const targetSection = this.getAttribute('data-section');
      
      // Aktivera markerad nav-item
      navItems.forEach(nav => nav.classList.remove('active'));
      this.classList.add('active');

      // Visa rätt sektion
      sections.forEach(section => section.classList.remove('active'));
      const target = document.getElementById(targetSection + '-section');
      if (target) target.classList.add('active');

      // Uppdatera breadcrumb
      updateBreadcrumb(targetSection);

      // Stäng sidebar på mobiler
      if (window.innerWidth < 1024 && sidebar) {
        sidebar.classList.remove('active');
      }
    });
  });

  // Mobilmeny toggle
  if (menuToggle && sidebar) {
    menuToggle.addEventListener('click', function() {
      sidebar.classList.toggle('active');
    });
  }

  // Toggle-knapp för verifieringsmodal
  if (toggleButton && verifyModal && modalOverlay) {
    toggleButton.addEventListener('click', function() {
      this.classList.toggle('active');
      if (this.classList.contains('active')) {
        this.textContent = '+';
        if (!isVerified) {
          verifyModal.classList.add('active');
          modalOverlay.classList.add('active');
        }
      } else {
        this.textContent = '×';
        verifyModal.classList.remove('active');
        modalOverlay.classList.remove('active');
      }
    });

    // Klick utanför modal stänger den
    modalOverlay.addEventListener('click', function() {
      toggleButton.classList.remove('active');
      toggleButton.textContent = '×';
      verifyModal.classList.remove('active');
      modalOverlay.classList.remove('active');
    });
  }

  // Klick utanför sidebar stänger den på mobil
  document.addEventListener('click', function(e) {
    if (window.innerWidth < 1024 && sidebar && menuToggle) {
      if (
        sidebar.classList.contains('active') &&
        !sidebar.contains(e.target) &&
        !menuToggle.contains(e.target)
      ) {
        sidebar.classList.remove('active');
      }
    }
  });
});
