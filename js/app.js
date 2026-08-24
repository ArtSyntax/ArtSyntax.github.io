/**
 * ArtSyntax Client Application Engine
 * High-performance, zero-dependency ES6 module for GitHub Pages static site.
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileDrawer();
  initImpactFilter();
  initFAQAccordion();
  initScopeCalculator();
  initModals();
});

/* ==========================================================================
   1. Mobile Drawer Navigation Controller
   ========================================================================== */
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

  // Close drawer on link click
  const links = drawer.querySelectorAll('.mobile-nav-link');
  links.forEach(link => {
    link.addEventListener('click', () => {
      drawer.classList.remove('open');
      toggleBtn.innerHTML = '☰';
      toggleBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ==========================================================================
   2. Impact Case Studies Filtering
   ========================================================================== */
function initImpactFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const caseCards = document.querySelectorAll('.case-card');

  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      caseCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   3. Executive FAQ Accordion
   ========================================================================== */
function initFAQAccordion() {
  const items = document.querySelectorAll('.faq-item');

  items.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (!question) return;

    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      items.forEach(i => i.classList.remove('active'));
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   4. Interactive Scope & ROI Calculator
   ========================================================================== */
function initScopeCalculator() {
  const chips = document.querySelectorAll('.scope-chip');
  const estTimeline = document.getElementById('estTimeline');
  const estBudget = document.getElementById('estBudget');

  if (!chips.length) return;

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      const parent = chip.closest('.chip-options');
      if (parent) {
        parent.querySelectorAll('.scope-chip').forEach(c => c.classList.remove('selected'));
      }
      chip.classList.add('selected');

      recalculateScope();
    });
  });

  function recalculateScope() {
    let baseWeeks = 2;
    let baseMultiplier = 1;

    document.querySelectorAll('.scope-chip.selected').forEach(selectedChip => {
      const w = parseInt(selectedChip.dataset.weeks || '1', 10);
      const m = parseFloat(selectedChip.dataset.multiplier || '1.0');
      baseWeeks += w;
      baseMultiplier += (m - 1);
    });

    if (estTimeline) estTimeline.textContent = `${baseWeeks} - ${baseWeeks + 2} สัปดาห์`;
    if (estBudget) {
      if (baseMultiplier <= 1.2) estBudget.textContent = 'Starter Enterprise Tier';
      else if (baseMultiplier <= 1.8) estBudget.textContent = 'Growth Scale Tier';
      else estBudget.textContent = 'Full Enterprise Transformation Tier';
    }
  }
}

/* ==========================================================================
   5. Modal Controller (<dialog>)
   ========================================================================== */
function initModals() {
  const bookingModal = document.getElementById('bookingModal');
  const openBookingBtns = document.querySelectorAll('.open-booking-modal');
  const closeBookingBtn = document.getElementById('closeBookingModal');

  openBookingBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (bookingModal && typeof bookingModal.showModal === 'function') {
        bookingModal.showModal();
      } else {
        alert('นัดหมายเวลาคุยกับทีมงานได้ที่ thanyavuth@outlook.com');
      }
    });
  });

  if (closeBookingBtn && bookingModal) {
    closeBookingBtn.addEventListener('click', () => bookingModal.close());
  }

  const leadForm = document.getElementById('leadForm');
  if (leadForm) {
    leadForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const submitBtn = leadForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn ? submitBtn.innerHTML : '';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '⏳ กำลังส่งข้อมูลไปยัง thanyavuth@outlook.com...';
      }

      const nameVal = document.getElementById('leadName') ? document.getElementById('leadName').value : '';
      const companyVal = document.getElementById('leadCompany') ? document.getElementById('leadCompany').value : '';
      const emailVal = document.getElementById('leadEmail') ? document.getElementById('leadEmail').value : '';
      const phoneVal = document.getElementById('leadPhone') ? document.getElementById('leadPhone').value : '';
      const goalVal = document.getElementById('leadGoal') ? document.getElementById('leadGoal').value : '';

      const payload = {
        name: nameVal,
        company: companyVal,
        email: emailVal,
        phone: phoneVal,
        goal: goalVal,
        _subject: `🚀 [ArtSyntax Lead] นัดหมายยุทธศาสตร์ AI จาก ${nameVal} (${companyVal})`,
        _template: 'table'
      };

      try {
        const response = await fetch('https://formsubmit.co/ajax/thanyavuth@outlook.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        if (response.ok) {
          alert(`✅ ส่งข้อมูลนัดหมายเรียบร้อย!\n\nข้อมูลของคุณถูกส่งเรียบร้อยแล้ว ทีมงานจะติดต่อกลับอย่างรวดเร็วที่สุด`);
        } else {
          window.location.href = `mailto:thanyavuth@outlook.com?subject=🚀 นัดหมายยุทธศาสตร์ AI - ${encodeURIComponent(nameVal)} (${encodeURIComponent(companyVal)})&body=ชื่อ: ${encodeURIComponent(nameVal)}%0D%0Aบริษัท: ${encodeURIComponent(companyVal)}%0D%0Aอีเมล: ${encodeURIComponent(emailVal)}%0D%0Aโทร: ${encodeURIComponent(phoneVal)}%0D%0Aโจทย์ธุรกิจ: ${encodeURIComponent(goalVal)}`;
        }
      } catch (err) {
        window.location.href = `mailto:thanyavuth@outlook.com?subject=🚀 นัดหมายยุทธศาสตร์ AI - ${encodeURIComponent(nameVal)} (${encodeURIComponent(companyVal)})&body=ชื่อ: ${encodeURIComponent(nameVal)}%0D%0Aบริษัท: ${encodeURIComponent(companyVal)}%0D%0Aอีเมล: ${encodeURIComponent(emailVal)}%0D%0Aโทร: ${encodeURIComponent(phoneVal)}%0D%0Aโจทย์ธุรกิจ: ${encodeURIComponent(goalVal)}`;
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnText;
        }
        if (bookingModal) bookingModal.close();
        leadForm.reset();
      }
    });
  }
}
