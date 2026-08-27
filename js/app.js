/**
 * ARTSYNTAX Website Client Logic
 * Core functionality: Mobile Drawer, Scroll Reveal Observer, Custom Form Validation
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileDrawer();
  initScrollReveal();
  initCustomFormValidation();
});

/* ==========================================================================
   1. MOBILE DRAWER NAVIGATION CONTROLLER
   ========================================================================== */
/**
 * Toggles the full-screen mobile menu drawer on hamburger click
 * and automatically closes when any menu link is clicked.
 */
function initMobileDrawer() {
  const toggleBtn = document.getElementById('mobileToggle');
  const drawer = document.getElementById('mobileDrawer');
  
  if (!toggleBtn || !drawer) return;

  toggleBtn.addEventListener('click', () => {
    const isOpen = drawer.classList.contains('open');
    if (isOpen) {
      drawer.classList.remove('open');
      toggleBtn.innerHTML = '☰';
      toggleBtn.setAttribute('aria-expanded', 'false');
    } else {
      drawer.classList.add('open');
      toggleBtn.innerHTML = '✕';
      toggleBtn.setAttribute('aria-expanded', 'true');
    }
  });

  // Close drawer when any navigation link is clicked
  const links = drawer.querySelectorAll('.mobile-nav-link, .btn');
  links.forEach(link => {
    link.addEventListener('click', () => {
      drawer.classList.remove('open');
      toggleBtn.innerHTML = '☰';
      toggleBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ==========================================================================
   2. SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER)
   ========================================================================== */
/**
 * Observes elements with class '.reveal' and activates smooth fade-in
 * and transform animations when they enter the viewport threshold.
 */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealOptions = {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  };

  const revealOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, revealOptions);

  revealElements.forEach(el => {
    revealOnScroll.observe(el);
  });
}

/* ==========================================================================
   3. CUSTOM GLASSMORPHIC FORM VALIDATION ERROR BUBBLES
   ========================================================================== */
/**
 * Intercepts form submission and renders dark glassmorphic error speech bubbles
 * instead of native browser popups for required inputs, email format, and minlength.
 */
function initCustomFormValidation() {
  const forms = document.querySelectorAll('form');

  forms.forEach(form => {
    // Intercept form submit event for custom validation check
    form.addEventListener('submit', (e) => {
      let isValid = true;
      const inputs = form.querySelectorAll('.form-control[required]');
      let firstInvalidInput = null;

      inputs.forEach(input => {
        removeErrorBubble(input);
        if (!validateInput(input)) {
          isValid = false;
          if (!firstInvalidInput) firstInvalidInput = input;
        }
      });

      if (!isValid) {
        e.preventDefault();
        if (firstInvalidInput) {
          firstInvalidInput.focus();
        }
      }
    });

    // Automatically remove error bubble when user types in the field
    const allInputs = form.querySelectorAll('.form-control');
    allInputs.forEach(input => {
      input.addEventListener('input', () => {
        removeErrorBubble(input);
      });
    });
  });
}

/**
 * Validates a single input field against required, email, and minlength rules.
 * @param {HTMLInputElement|HTMLTextAreaElement} input
 * @returns {boolean} True if valid, false if invalid
 */
function validateInput(input) {
  const val = input.value.trim();
  const minLength = input.getAttribute('minlength') ? parseInt(input.getAttribute('minlength'), 10) : 0;
  let message = '';

  if (!val) {
    message = `กรุณากรอก${getLabelText(input)}`;
  } else if (input.type === 'email' && !isValidEmail(val)) {
    message = 'กรุณากรอกอีเมลให้ถูกต้อง (เช่น example@company.com)';
  } else if (minLength && val.length < minLength) {
    message = `กรุณากรอกรายละเอียดอย่างน้อย ${minLength} ตัวอักษร (ปัจจุบัน ${val.length} ตัวอักษร)`;
  }

  if (message) {
    showCustomErrorBubble(input, message);
    return false;
  }
  return true;
}

/**
 * Regex check for valid email format
 * @param {string} email
 * @returns {boolean}
 */
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Renders custom dark glassmorphic error speech bubble under the input field
 * @param {HTMLElement} input
 * @param {string} message
 */
function showCustomErrorBubble(input, message) {
  input.classList.add('is-invalid');

  const bubble = document.createElement('div');
  bubble.className = 'custom-error-bubble';
  bubble.innerHTML = `
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
    <span>${message}</span>
  `;

  input.parentNode.appendChild(bubble);
}

/**
 * Removes custom error bubble and invalid class from an input field
 * @param {HTMLElement} input
 */
function removeErrorBubble(input) {
  input.classList.remove('is-invalid');
  const existingBubble = input.parentNode.querySelector('.custom-error-bubble');
  if (existingBubble) {
    existingBubble.remove();
  }
}

/**
 * Extracts friendly label text for form validation messages
 * @param {HTMLElement} input
 * @returns {string}
 */
function getLabelText(input) {
  const label = input.parentNode.querySelector('label');
  if (label) {
    return label.textContent.split('(')[0].trim();
  }
  return 'ข้อมูลในช่องนี้';
}
