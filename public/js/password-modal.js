// password-modal.js - Password Modal functionality

document.addEventListener('DOMContentLoaded', function() {
  const passwordNavItem = document.querySelector('.nav-item[data-section="password"]');
  const passwordModal = document.getElementById('passwordModal');
  const passwordModalOverlay = document.getElementById('passwordModalOverlay');
  const closePasswordModal = document.getElementById('closePasswordModal');
  
  // Action buttons
  const actionButtons = document.querySelectorAll('.password-action-btn');
  const sections = {
    generate: document.getElementById('generatorSection'),
    passwords: document.getElementById('passwordsSection'),
    create: document.getElementById('createSection')
  };

  // Show modal when password nav item is clicked
  if (passwordNavItem) {
    passwordNavItem.addEventListener('click', function(e) {
      e.preventDefault();
      showPasswordModal();
    });
  }

  // Close modal functions
  function closeModal() {
    passwordModal.classList.remove('active');
    passwordModalOverlay.classList.remove('active');
  }

  function showPasswordModal() {
    passwordModal.classList.add('active');
    passwordModalOverlay.classList.add('active');
  }

  // Close modal events
  if (closePasswordModal) {
    closePasswordModal.addEventListener('click', closeModal);
  }

  if (passwordModalOverlay) {
    passwordModalOverlay.addEventListener('click', closeModal);
  }

  // Handle action button switching
  actionButtons.forEach(button => {
    button.addEventListener('click', function() {
      const action = this.getAttribute('data-action');
      
      // Remove active class from all buttons and sections
      actionButtons.forEach(btn => btn.classList.remove('active'));
      Object.values(sections).forEach(section => section.classList.remove('active'));
      
      // Add active class to clicked button and corresponding section
      this.classList.add('active');
      if (sections[action]) {
        sections[action].classList.add('active');
      }
    });
  });

  // Password generator functionality
  const generateBtn = document.getElementById('generate-password');
  const generatedPasswordInput = document.getElementById('generated-password');
  const copyPasswordBtn = document.getElementById('copy-password');
  const toggleVisibilityBtn = document.getElementById('toggle-password-visibility');
  const passwordField = document.getElementById('password-field');
  const generateForFieldBtn = document.querySelector('.generate-for-field-btn');

  // Generate password function
  function generatePassword() {
    const length = 16;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    let password = "";
    for (let i = 0; i < length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return password;
  }

  // Generate password for main generator
  if (generateBtn && generatedPasswordInput) {
    generateBtn.addEventListener('click', function() {
      const newPassword = generatePassword();
      generatedPasswordInput.value = newPassword;
    });
  }

  // Generate password for create form
  if (generateForFieldBtn && passwordField) {
    generateForFieldBtn.addEventListener('click', function() {
      const newPassword = generatePassword();
      passwordField.value = newPassword;
    });
  }

  // Copy password functionality
  if (copyPasswordBtn && generatedPasswordInput) {
    copyPasswordBtn.addEventListener('click', function() {
      if (generatedPasswordInput.value) {
        navigator.clipboard.writeText(generatedPasswordInput.value).then(() => {
          // Show feedback (you can add a toast notification here)
          console.log('Password copied to clipboard');
        });
      }
    });
  }

  // Toggle password visibility
  if (toggleVisibilityBtn && generatedPasswordInput) {
    toggleVisibilityBtn.addEventListener('click', function() {
      if (generatedPasswordInput.type === 'password') {
        generatedPasswordInput.type = 'text';
      } else {
        generatedPasswordInput.type = 'password';
      }
    });
  }

  // Show/hide individual passwords in grid
  const showPasswordBtns = document.querySelectorAll('.show-password-btn');
  showPasswordBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const passwordSpan = this.parentElement.querySelector('.password-hidden');
      const actualPassword = this.getAttribute('data-password');
      
      if (passwordSpan.textContent === '••••••••') {
        passwordSpan.textContent = actualPassword;
        passwordSpan.style.fontFamily = "'Courier New', monospace";
      } else {
        passwordSpan.textContent = '••••••••';
        passwordSpan.style.fontFamily = "inherit";
      }
    });
  });

  // Search functionality
  const searchInput = document.getElementById('passwordSearch');
  const passwordCards = document.querySelectorAll('.password-card');

  if (searchInput) {
    searchInput.addEventListener('input', function() {
      const searchTerm = this.value.toLowerCase();
      
      passwordCards.forEach(card => {
        const serviceName = card.querySelector('.service-name').textContent.toLowerCase();
        if (serviceName.includes(searchTerm)) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  }

  // Filter buttons functionality
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      
      // Add filter logic here based on button text/data attribute
      console.log('Filter applied:', this.textContent.trim());
    });
  });

  // Form submission
  const savePasswordForm = document.getElementById('save-password-form');
  if (savePasswordForm) {
    savePasswordForm.addEventListener('submit', function(e) {
      // Form will submit normally, but you can add validation here
      console.log('Saving password...');
    });
  }

  // Cancel button
  const cancelBtn = document.querySelector('.btn-cancel');
  if (cancelBtn) {
    cancelBtn.addEventListener('click', function() {
      // Reset form
      savePasswordForm.reset();
      // Switch back to passwords view
      actionButtons.forEach(btn => btn.classList.remove('active'));
      Object.values(sections).forEach(section => section.classList.remove('active'));
      
      document.querySelector('.password-action-btn[data-action="passwords"]').classList.add('active');
      sections.passwords.classList.add('active');
    });
  }

  // ESC key to close modal
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && passwordModal.classList.contains('active')) {
      closeModal();
    }
  });
});