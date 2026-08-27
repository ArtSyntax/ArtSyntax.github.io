/**
 * ARTSYNTAX Website Client Logic
 * Core functionality: Mobile Drawer, Scroll Reveal Observer, Custom Form Validation
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileDrawer();
  initScrollReveal();
  initCustomFormValidation();
  initCookieConsent();
  initChatWidget();
  initNavbarCtaToggle();
});

/* ==========================================================================
   6. NAVBAR CTA BUTTON SCROLL OBSERVER
   ========================================================================== */
/**
 * Shows Navbar CTA button only when Hero CTA button scrolls off-screen
 */
function initNavbarCtaToggle() {
  const heroCtaBtn = document.getElementById('heroCtaBtn');
  const navCtaBtn = document.getElementById('navCtaBtn');

  if (!heroCtaBtn || !navCtaBtn) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navCtaBtn.classList.remove('visible');
      } else {
        navCtaBtn.classList.add('visible');
      }
    });
  }, {
    threshold: 0
  });

  observer.observe(heroCtaBtn);
}

/* ==========================================================================
   5. INTERACTIVE FLOATING CHAT WIDGET CONTROLLER
   ========================================================================== */
/**
 * Toggles the Glassmorphic Interactive Floating Chat Box Widget
 */
function initChatWidget() {
  const btnToggle = document.getElementById('btnToggleChatWidget');
  const btnClose = document.getElementById('btnCloseChatWidget');
  const chatCard = document.getElementById('chatWidgetCard');
  const btnGoToForm = document.getElementById('btnGoToForm');

  if (!btnToggle || !chatCard) return;

  btnToggle.addEventListener('click', () => {
    const isHidden = chatCard.style.display === 'none' || !chatCard.style.display;
    chatCard.style.display = isHidden ? 'block' : 'none';
  });

  if (btnClose) {
    btnClose.addEventListener('click', () => {
      chatCard.style.display = 'none';
    });
  }

  if (btnGoToForm) {
    btnGoToForm.addEventListener('click', () => {
      chatCard.style.display = 'none';
    });
  }
}

/* ==========================================================================
   4. PDPA & GDPR COOKIE CONSENT CONTROLLER
   ========================================================================== */
/**
 * Manages Cookie Consent Banner display, user preference persistence in localStorage,
 * and enables/disables Google Analytics & Meta Pixel tracking accordingly.
 */
function initCookieConsent() {
  const cookieBanner = document.getElementById('cookieBanner');
  const btnAccept = document.getElementById('btnAcceptCookies');
  const btnDecline = document.getElementById('btnDeclineCookies');

  if (!cookieBanner || !btnAccept || !btnDecline) return;

  const consentStatus = localStorage.getItem('artsyntax_cookie_consent');

  // Only keep banner hidden if user permanently accepted cookies ('accepted')
  if (consentStatus === 'accepted') {
    cookieBanner.style.display = 'none';
    enableTracking();
  } else {
    // First visit OR if user previously declined: show banner again after 800ms delay
    setTimeout(() => {
      cookieBanner.style.display = 'block';
    }, 800);
    disableTracking();
  }

  btnAccept.addEventListener('click', () => {
    localStorage.setItem('artsyntax_cookie_consent', 'accepted');
    cookieBanner.style.display = 'none';
    enableTracking();
  });

  btnDecline.addEventListener('click', () => {
    // Clear persistent consent state so banner re-appears asking again on next visit/refresh
    localStorage.removeItem('artsyntax_cookie_consent');
    cookieBanner.style.display = 'none';
    disableTracking();
  });
}

function disableTracking() {
  window['ga-disable-G-315091WYYC'] = true;
  if (typeof window.fbq === 'function') {
    window.fbq('consent', 'revoke');
  }
}

function enableTracking() {
  window['ga-disable-G-315091WYYC'] = false;
  if (typeof window.fbq === 'function') {
    window.fbq('consent', 'grant');
  }
}

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
      e.preventDefault();
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
        if (firstInvalidInput) {
          firstInvalidInput.focus();
        }
        return;
      }

      // Valid form -> submit via AJAX to FormSubmit
      handleFormSubmit(form);
    });

    // Automatically remove error bubble when user types in the field
    const allInputs = form.querySelectorAll('.form-control');
    allInputs.forEach(input => {
      input.addEventListener('input', (e) => {
        if (input.id === 'phone') {
          e.target.value = e.target.value.replace(/\D/g, '');
        }
        removeErrorBubble(input);
      });
    });
  });

  // Setup reset button to allow sending another message
  const btnReset = document.getElementById('btnResetForm');
  if (btnReset) {
    btnReset.addEventListener('click', () => {
      const form = document.getElementById('contactForm');
      const successCard = document.getElementById('formSuccessCard');
      if (form && successCard) {
        form.reset();
        form.style.display = 'block';
        successCard.style.display = 'none';
      }
    });
  }
}

/**
 * Handles AJAX form submission to FormSubmit API endpoint and displays success card
 * @param {HTMLFormElement} form 
 */
function handleFormSubmit(form) {
  const btnSubmit = form.querySelector('button[type="submit"]');
  const originalBtnText = btnSubmit ? btnSubmit.innerHTML : '';
  const successCard = document.getElementById('formSuccessCard');

  if (btnSubmit) {
    btnSubmit.disabled = true;
    btnSubmit.style.opacity = '0.7';
    btnSubmit.style.cursor = 'wait';
    btnSubmit.querySelector('span').textContent = 'กำลังส่งข้อมูล...';
  }

  const formData = new FormData(form);

  fetch('https://formsubmit.co/ajax/artsyntax.app@gmail.com', {
    method: 'POST',
    body: formData,
    headers: {
      'Accept': 'application/json'
    }
  })
  .then(response => {
    if (response.ok) {
      // Trigger GA4 & Meta Pixel Lead Conversion Event
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'generate_lead', {
          event_category: 'Contact',
          event_label: 'Lead Form Submission'
        });
      }
      if (typeof window.fbq === 'function') {
        window.fbq('track', 'Lead');
      }

      // Hide form and show success card
      form.style.display = 'none';
      if (successCard) {
        successCard.style.display = 'block';
      }
    } else {
      // Fallback submit if AJAX endpoint returned error
      form.submit();
    }
  })
  .catch(() => {
    // Network fallback submit
    form.submit();
  })
  .finally(() => {
    if (btnSubmit) {
      btnSubmit.disabled = false;
      btnSubmit.style.opacity = '1';
      btnSubmit.style.cursor = 'pointer';
      btnSubmit.innerHTML = originalBtnText;
    }
  });
}

/**
 * Validates a single input field against required, email, phone, and minlength rules.
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
  } else if ((input.type === 'tel' || input.id === 'phone') && !isValidPhone(val)) {
    message = 'กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง (เช่น 0812345678 หรือ 021234567)';
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
 * Regex check for valid Thai Mobile or Landline/Office Phone Number
 * Supports mobile (06, 08, 09 + 8 digits) and landline (02, 03, 04, 05, 07 + 7-8 digits)
 * Handles hyphens, spaces, and +66 country code prefix.
 * @param {string} phone
 * @returns {boolean}
 */
function isValidPhone(phone) {
  let clean = phone.replace(/^\+66/, '0').replace(/[-()\s]/g, '');
  return /^(0[689]\d{8}|0[23457]\d{7,8})$/.test(clean);
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
