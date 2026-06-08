/* === Seller Exchange Demo — tour wrapper engine ===
 *
 * Pieces:
 *   1. Welcome modal — shown once (until email submitted). Button bypasses validation.
 *   2. Bottom-right controls: Return to website / Help / Demo Guide
 *   3. Demo Guide modal — TOC of all tours (T1-T13)
 *   4. Tour player — spotlight + tooltip + Next / Back / Close
 *   5. Tour-complete modal — Start again / Close / Return
 */
(function() {
  'use strict';

  // --- i18n -----------------------------------------------------------------
  // Locale derived from window.DEMO_VARIANT (e.g. "light-uk" → "uk").
  var LOCALE = (window.DEMO_VARIANT || '').indexOf('-uk') >= 0 ? 'uk' : 'en';
  // Resolve a value that may be a plain string or { en, uk } dict.
  function loc(v) {
    if (v == null) return '';
    if (typeof v === 'string') return v;
    return v[LOCALE] || v.en || '';
  }
  var I18N = {
    welcomeTitle:            { en: "Welcome to the Seller Exchange Demo", uk: "Ласкаво просимо до демо Seller Exchange" },
    welcomeBody:             { en: "Take a quick guided tour to learn the platform's core features.", uk: "Пройдіть короткий тур, щоб ознайомитися з ключовими можливостями платформи." },
    welcomeEmailLabel:       { en: "Your business email", uk: "Ваш робочий e-mail" },
    welcomeEmailPlaceholder: { en: "you@example.com", uk: "you@example.com" },
    welcomeStart:            { en: "Start tour", uk: "Почати тур" },

    ctrlReturn: { en: "Return to the website",       uk: "Повернутися на сайт" },
    ctrlHelp:   { en: "Help",                         uk: "Допомога" },
    ctrlGuide:  { en: "Seller Exchange Demo Guide",  uk: "Демо-гід Seller Exchange" },

    guideTitle:      { en: "Seller Exchange tours", uk: "Тури Seller Exchange" },
    guideSteps:      { en: "steps",                  uk: "кроків" },
    guideComingSoon: { en: "coming soon",            uk: "незабаром" },
    guidePlayDemo:   { en: "Play demo",              uk: "Запустити демо" },
    guideClose:      { en: "Close",                  uk: "Закрити" },

    feedbackTitle:       { en: "Feedback", uk: "Зворотний зв'язок" },
    feedbackBody: {
      en: "If you have any feedback, we'd love to hear it. If you'd like to sign up fill the form with 'Your name. Sign up' and wait for the following instructions on the submitted e-mail.",
      uk: "Якщо у вас є відгук — ми будемо раді його почути. Якщо хочете зареєструватися, заповніть форму у форматі «Ваше ім'я. Реєстрація» і чекайте наступних інструкцій на вказаний e-mail."
    },
    feedbackPlaceholder: { en: "Your message",                  uk: "Ваше повідомлення" },
    feedbackSubmit:      { en: "Submit",                         uk: "Надіслати" },
    feedbackClose:       { en: "Close",                          uk: "Закрити" },
    privacyPolicy:       { en: "Privacy Policy",                 uk: "Політика конфіденційності" },
    cookiePolicy:        { en: "Cookie Policy",                  uk: "Політика cookie" },

    completeTitle:      { en: "Tour completed!",                                                       uk: "Тур завершено!" },
    completeBody:       { en: "You've finished the tour. Explore other tours from the Demo Guide.",   uk: "Ви завершили тур. Інші тури можна знайти в Демо-гіді." },
    completeStartAgain: { en: "Start again",                                                            uk: "Пройти знову" },
    completeOpenGuide:  { en: "Open demo guide",                                                        uk: "Відкрити демо-гід" },
    completeClose:      { en: "Close",                                                                  uk: "Закрити" },

    back:        { en: "Back",       uk: "Назад" },
    next:        { en: "Next",       uk: "Далі" },
    finish:      { en: "Finish",     uk: "Завершити" },
    closeTour:   { en: "Close tour", uk: "Закрити тур" },
    stepXofY:    { en: "Step {n} of {total}", uk: "Крок {n} з {total}" }
  };
  function fmt(tmpl, params) {
    var s = loc(tmpl);
    for (var k in params) s = s.replace('{' + k + '}', params[k]);
    return s;
  }

  // --- Storage --------------------------------------------------------------
  var LS_WELCOME = 'demo-welcome-done';
  var LS_EMAIL = 'demo-email';
  var LS_TOUR_STATE = 'demo-tour-state';  // { tourId, step } — survives cross-page navigation

  function lsGet(k) { try { return localStorage.getItem(k); } catch(e) { return null; } }
  function lsSet(k, v) { try { localStorage.setItem(k, v); } catch(e) {} }
  function lsRemove(k) { try { localStorage.removeItem(k); } catch(e) {} }

  function getCurrentScreen() { return window.DEMO_SCREEN_ID || 'unknown'; }
  function getCurrentVariant() { return window.DEMO_VARIANT || 'light-en'; }

  function saveTourState() {
    if (!currentTour) return;
    lsSet(LS_TOUR_STATE, JSON.stringify({
      tourId: currentTour.id,
      step: currentStep
    }));
  }
  function clearTourState() { lsRemove(LS_TOUR_STATE); }
  function readTourState() {
    var raw = lsGet(LS_TOUR_STATE);
    if (!raw) return null;
    try { return JSON.parse(raw); } catch(e) { return null; }
  }

  // --- DOM helpers ----------------------------------------------------------
  function el(tag, attrs, children) {
    var e = document.createElement(tag);
    if (attrs) for (var k in attrs) {
      if (k === 'class') e.className = attrs[k];
      else if (k === 'html') e.innerHTML = attrs[k];
      else if (k.indexOf('on') === 0) e.addEventListener(k.slice(2), attrs[k]);
      else e.setAttribute(k, attrs[k]);
    }
    (children || []).forEach(function(c) {
      if (c == null) return;
      if (typeof c === 'string') e.appendChild(document.createTextNode(c));
      else e.appendChild(c);
    });
    return e;
  }

  // --- UI: Welcome modal ----------------------------------------------------
  function buildWelcomeModal() {
    return el('div', { id: 'demo-welcome', class: 'demo-modal' }, [
      el('div', { class: 'demo-modal-content' }, [
        el('h2', null, [loc(I18N.welcomeTitle)]),
        el('p', null, [loc(I18N.welcomeBody)]),
        el('label', { for: 'demo-email-input' }, [loc(I18N.welcomeEmailLabel)]),
        el('input', { type: 'email', id: 'demo-email-input', placeholder: loc(I18N.welcomeEmailPlaceholder) }),
        el('div', { style: 'margin-top:20px;display:flex;justify-content:center;gap:8px;' }, [
          el('button', {
            class: 'demo-btn',
            onclick: function() {
              var email = document.getElementById('demo-email-input').value || '';
              if (email) lsSet(LS_EMAIL, email);
              lsSet(LS_WELCOME, '1');
              document.getElementById('demo-welcome').setAttribute('hidden', '');
              startTour('T1');
            }
          }, [loc(I18N.welcomeStart)])
        ])
      ])
    ]);
  }

  // --- UI: Bottom controls --------------------------------------------------
  function buildBottomControls() {
    return el('div', { id: 'demo-controls' }, [
      el('button', {
        class: 'demo-ctrl-btn',
        onclick: function() { window.location.href = 'https://aseller.com'; }  // placeholder
      }, [loc(I18N.ctrlReturn)]),
      el('button', {
        class: 'demo-ctrl-btn',
        onclick: function() {
          var f = document.getElementById('demo-feedback');
          if (f) f.removeAttribute('hidden');
        }
      }, [loc(I18N.ctrlHelp)]),
      el('button', {
        class: 'demo-ctrl-btn primary',
        onclick: function() { openGuide(); }
      }, [loc(I18N.ctrlGuide)])
    ]);
  }

  // --- UI: Demo Guide (TOC of all tours, styled like reference) ------------
  function buildGuideModal() {
    var playSvg = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';

    var items = [];
    var index = 0;
    Object.keys(window.DEMO_TOURS).forEach(function(tourId) {
      var tour = window.DEMO_TOURS[tourId];
      index += 1;
      var available = !!tour.available;
      var steps = (tour.steps && tour.steps.length) || 0;
      var tourName = loc(tour.name);

      var row = el('li', { class: 'demo-guide-row ' + (available ? 'available' : 'coming-soon') }, [
        el('span', { class: 'demo-guide-num' }, [String(index)]),
        el('span', { class: 'demo-guide-name' }, [tourName]),
        el('span', { class: 'demo-guide-steps' }, [
          available ? (steps + ' ' + loc(I18N.guideSteps)) : loc(I18N.guideComingSoon)
        ]),
        available
          ? el('button', {
              class: 'demo-guide-play',
              html: playSvg,
              'aria-label': loc(I18N.guidePlayDemo) + ': ' + tourName,
              onclick: function(e) {
                e.stopPropagation();
                closeGuide();
                startTour(tourId);
              }
            })
          : el('span', { class: 'demo-guide-play-spacer' })
      ]);
      if (available) {
        row.addEventListener('click', function() {
          closeGuide();
          startTour(tourId);
        });
      }
      items.push(row);
    });

    return el('div', { id: 'demo-guide', class: 'demo-modal', hidden: 'hidden' }, [
      el('div', { class: 'demo-modal-content', style: 'max-width:640px;text-align:left;padding:24px 28px 20px;' }, [
        el('div', { class: 'demo-guide-header' }, [
          el('h2', null, [loc(I18N.guideTitle)]),
          el('button', {
            class: 'demo-guide-close-x',
            'aria-label': loc(I18N.guideClose),
            onclick: closeGuide
          }, ['×'])
        ]),
        el('ul', { class: 'demo-guide-list' }, items),
        el('div', { class: 'demo-guide-footer' }, [
          el('button', { class: 'demo-btn', onclick: closeGuide }, [loc(I18N.guidePlayDemo)])
        ])
      ])
    ]);
  }

  function openGuide() {
    var g = document.getElementById('demo-guide');
    if (g) g.removeAttribute('hidden');
  }
  function closeGuide() {
    var g = document.getElementById('demo-guide');
    if (g) g.setAttribute('hidden', '');
  }

  // --- UI: Complete modal ---------------------------------------------------
  // --- UI: Feedback modal (opened from Help button) ------------------------
  function buildFeedbackModal() {
    var iconSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>';
    var textarea = el('textarea', {
      id: 'demo-feedback-message',
      placeholder: loc(I18N.feedbackPlaceholder),
      oninput: function() {
        var submitBtn = document.getElementById('demo-feedback-submit');
        if (submitBtn) submitBtn.disabled = !textarea.value.trim();
      }
    });
    var submitBtn = el('button', {
      class: 'demo-btn',
      id: 'demo-feedback-submit',
      disabled: 'disabled',
      onclick: function() {
        // Demo: just close & clear (no real submit)
        textarea.value = '';
        submitBtn.disabled = true;
        document.getElementById('demo-feedback').setAttribute('hidden', '');
      }
    }, [loc(I18N.feedbackSubmit)]);
    var closeBtn = el('button', {
      class: 'demo-btn secondary',
      onclick: function() {
        document.getElementById('demo-feedback').setAttribute('hidden', '');
      }
    }, [loc(I18N.feedbackClose)]);
    return el('div', { id: 'demo-feedback', class: 'demo-modal', hidden: 'hidden' }, [
      el('div', { class: 'demo-modal-content' }, [
        el('div', { class: 'demo-feedback-icon', html: iconSvg }),
        el('h2', null, [loc(I18N.feedbackTitle)]),
        el('p', null, [loc(I18N.feedbackBody)]),
        textarea,
        el('div', { class: 'demo-feedback-links' }, [
          el('a', { href: '#', onclick: function(e){ e.preventDefault(); } }, [loc(I18N.privacyPolicy)]),
          ' · ',
          el('a', { href: '#', onclick: function(e){ e.preventDefault(); } }, [loc(I18N.cookiePolicy)])
        ]),
        el('div', { style: 'display:flex;justify-content:center;gap:8px;' }, [
          submitBtn,
          closeBtn
        ])
      ])
    ]);
  }

  function buildCompleteModal() {
    return el('div', { id: 'demo-complete', class: 'demo-modal', hidden: 'hidden' }, [
      el('div', { class: 'demo-modal-content' }, [
        el('h2', null, [loc(I18N.completeTitle)]),
        el('p', { id: 'demo-complete-body' }, [loc(I18N.completeBody)]),
        el('div', { style: 'margin-top:16px;display:flex;justify-content:center;gap:8px;flex-wrap:wrap;' }, [
          el('button', { class: 'demo-btn', onclick: function() {
            document.getElementById('demo-complete').setAttribute('hidden', '');
            if (currentTour) startTour(currentTour.id);
          }}, [loc(I18N.completeStartAgain)]),
          el('button', { class: 'demo-btn secondary', onclick: function() {
            document.getElementById('demo-complete').setAttribute('hidden', '');
            openGuide();
          }}, [loc(I18N.completeOpenGuide)]),
          el('button', { class: 'demo-btn secondary', onclick: function() {
            document.getElementById('demo-complete').setAttribute('hidden', '');
          }}, [loc(I18N.completeClose)])
        ])
      ])
    ]);
  }

  // --- UI: Tour player ------------------------------------------------------
  function buildTourPlayer() {
    return el('div', { id: 'demo-tour', hidden: 'hidden' }, [
      el('div', { id: 'demo-spotlight' }),
      el('div', { id: 'demo-target-ring' }),
      el('div', { id: 'demo-tooltip' }, [
        el('div', { id: 'demo-tooltip-header' }, [
          el('h3', { id: 'demo-tooltip-title' }, ['']),
          el('button', {
            id: 'demo-tooltip-close',
            'aria-label': loc(I18N.closeTour),
            title: loc(I18N.closeTour),
            onclick: skipTour
          }, ['×'])
        ]),
        el('div', { class: 'demo-tooltip-body', id: 'demo-tooltip-body' }, ['']),
        el('div', { class: 'demo-tooltip-actions' }, [
          el('div', { class: 'demo-tooltip-left' }, [
            el('span', { class: 'demo-step-counter', id: 'demo-step-counter' }, [''])
          ]),
          el('div', { class: 'demo-tooltip-right' }, [
            el('button', { class: 'demo-btn secondary', onclick: prevStep, id: 'demo-back-btn' }, [loc(I18N.back)]),
            el('button', { class: 'demo-btn', onclick: nextStep, id: 'demo-next-btn' }, [loc(I18N.next)])
          ])
        ])
      ])
    ]);
  }

  // --- Tour engine ----------------------------------------------------------
  var currentTour = null;
  var currentStep = 0;

  function startTour(tourId, fromStep) {
    var t = window.DEMO_TOURS[tourId];
    if (!t || !t.available) return;
    currentTour = t;
    currentStep = fromStep || 0;
    document.getElementById('demo-tour').removeAttribute('hidden');
    renderStep();
  }

  function endTour() {
    cleanupStepActions();
    clearTourState();
    document.getElementById('demo-tour').setAttribute('hidden', '');
    document.getElementById('demo-complete').removeAttribute('hidden');
  }

  function skipTour() {
    cleanupStepActions();
    clearTourState();
    document.getElementById('demo-tour').setAttribute('hidden', '');
  }

  function nextStep() {
    if (!currentTour) return;
    if (currentStep < currentTour.steps.length - 1) {
      currentStep++;
      renderStep();
    } else {
      endTour();
    }
  }
  function prevStep() {
    if (!currentTour) return;
    if (currentStep > 0) {
      currentStep--;
      renderStep();
    }
  }

  // --- User popover (reused for tour step AND for header user-card click) ---
  function getUserCardTrigger() {
    // Most specific selector first (per dev path):
    // #root > div > div.ant-layout > header > div > div.ant-dropdown-trigger.css-1pa1th5-flexContainer
    return document.querySelector('header .ant-dropdown-trigger.css-1pa1th5-flexContainer')
        || document.querySelector('header .css-1pa1th5-flexContainer');
  }

  // Expose for build-injected scripts (user-card click outside tour)
  window.demoShowUserPopover = function() { showUserPopover(); };
  window.demoHideUserPopover = function() { hideUserPopover(); };

  function showUserPopover() {
    var popover = document.getElementById('demo-user-popover-real');
    var trigger = getUserCardTrigger();
    if (!popover || !trigger) return;
    var rect = trigger.getBoundingClientRect();
    var dropdown = popover.querySelector('.ant-dropdown');
    if (dropdown) {
      // IMPORTANT: clear `inset` FIRST (its longhands top/right/bottom/left
      // override our subsequent individual sets if order is reversed)
      dropdown.style.setProperty('inset', 'auto', 'important');
      dropdown.style.setProperty('position', 'fixed', 'important');
      dropdown.style.setProperty('top', (rect.bottom + 6) + 'px', 'important');
      dropdown.style.setProperty('right', Math.max(8, window.innerWidth - rect.right) + 'px', 'important');
      dropdown.style.setProperty('left', 'auto', 'important');
      dropdown.style.setProperty('bottom', 'auto', 'important');
      dropdown.style.setProperty('transform', 'none', 'important');
    }
    // Make Profile menu item navigate to extracted Profile screen
    wireProfileMenuItem(popover);
    popover.removeAttribute('hidden');
  }

  function hideUserPopover() {
    var popover = document.getElementById('demo-user-popover-real');
    if (popover) popover.setAttribute('hidden', '');
  }

  function wireProfileMenuItem(popover) {
    // The first menu item is Profile (per mhtml snapshot)
    var profileItem = popover.querySelector('li.ant-dropdown-menu-item');
    if (profileItem && !profileItem.dataset.demoWired) {
      profileItem.dataset.demoWired = '1';
      profileItem.style.cursor = 'pointer';
      profileItem.addEventListener('click', function(e) {
        e.preventDefault(); e.stopPropagation();
        window.location.href = '/screens/profile/' + getCurrentVariant() + '/';
      });
    }
    // Exit (second item) — just close popover
    var items = popover.querySelectorAll('li.ant-dropdown-menu-item');
    if (items.length >= 2 && !items[1].dataset.demoWired) {
      items[1].dataset.demoWired = '1';
      items[1].style.cursor = 'pointer';
      items[1].addEventListener('click', function(e) {
        e.preventDefault(); e.stopPropagation();
        hideUserPopover();
      });
    }
  }

  // --- Step actions (effect on DOM before rendering tooltip) -------------
  function cleanupStepActions() {
    // Just remove the data-attr — CSS rule [data-demo-forced-expand]
    // (with !important) stops applying → original inline width:80px from
    // the snapshot wins → sidebar snaps back to 80px naturally.
    // (We do NOT touch inline style — original 80px lives there.)
    document.querySelectorAll('aside.ant-layout-sider[data-demo-forced-expand]').forEach(function(s) {
      delete s.dataset.demoForcedExpand;
    });
    // Hide real user popover (extracted from mhtml)
    hideUserPopover();
  }

  function applyStepAction(step) {
    cleanupStepActions();
    if (!step.action) return;
    if (step.action === 'expand-sidebar') {
      var sider = document.querySelector('aside.ant-layout-sider');
      if (sider) {
        // Only set the data-attr. CSS rule [data-demo-forced-expand] with
        // !important overrides snapshot's inline width:80px → sidebar 240px.
        // No need to touch inline style.
        sider.dataset.demoForcedExpand = '1';
      }
    } else if (step.action === 'show-user-popover') {
      showUserPopover();
    }
  }

  function renderStep() {
    if (!currentTour) return;
    var step = currentTour.steps[currentStep];

    // Cross-page navigation: if this step targets a different screen, save state
    // and navigate there. The new page will resume the tour at this step.
    if (step.screen && step.screen !== getCurrentScreen()) {
      saveTourState();
      window.location.href = '/screens/' + step.screen + '/' + getCurrentVariant() + '/';
      return;
    }

    // Apply step-specific DOM action (sidebar expand, popover inject, etc.)
    applyStepAction(step);

    var ring = document.getElementById('demo-target-ring');
    var tooltip = document.getElementById('demo-tooltip');
    var title = document.getElementById('demo-tooltip-title');
    var body = document.getElementById('demo-tooltip-body');
    var counter = document.getElementById('demo-step-counter');
    var backBtn = document.getElementById('demo-back-btn');
    var nextBtn = document.getElementById('demo-next-btn');

    title.textContent = loc(step.title);
    body.textContent = loc(step.body);
    counter.textContent = fmt(I18N.stepXofY, { n: currentStep + 1, total: currentTour.steps.length });
    backBtn.style.visibility = currentStep === 0 ? 'hidden' : 'visible';
    nextBtn.textContent = currentStep === currentTour.steps.length - 1 ? loc(I18N.finish) : loc(I18N.next);

    // Target highlight
    var target = step.target ? document.querySelector(step.target) : null;
    if (target) {
      var rect = target.getBoundingClientRect();
      ring.style.display = 'block';
      ring.style.top = (rect.top - 4) + 'px';
      ring.style.left = (rect.left - 4) + 'px';
      ring.style.width = (rect.width + 8) + 'px';
      ring.style.height = (rect.height + 8) + 'px';

      // Try to scroll target into view
      try { target.scrollIntoView({ behavior: 'smooth', block: 'center' }); } catch(e) {}

      // Position tooltip near target — prefer right, fall back to bottom
      positionTooltipNear(rect);
    } else {
      ring.style.display = 'none';
      // Center tooltip
      tooltip.style.top = '50%';
      tooltip.style.left = '50%';
      tooltip.style.transform = 'translate(-50%, -50%)';
    }
  }

  function positionTooltipNear(rect) {
    var tooltip = document.getElementById('demo-tooltip');
    tooltip.style.transform = '';
    var tt = tooltip.getBoundingClientRect();
    var vw = window.innerWidth, vh = window.innerHeight;
    var pad = 16;

    // Prefer right
    var top, left;
    if (rect.right + tt.width + pad < vw) {
      left = rect.right + pad;
      top = Math.max(pad, Math.min(rect.top + rect.height/2 - tt.height/2, vh - tt.height - pad));
    } else if (rect.bottom + tt.height + pad < vh) {
      // Below
      top = rect.bottom + pad;
      left = Math.max(pad, Math.min(rect.left + rect.width/2 - tt.width/2, vw - tt.width - pad));
    } else if (rect.top - tt.height - pad > 0) {
      // Above
      top = rect.top - tt.height - pad;
      left = Math.max(pad, Math.min(rect.left + rect.width/2 - tt.width/2, vw - tt.width - pad));
    } else {
      // Left
      left = Math.max(pad, rect.left - tt.width - pad);
      top = Math.max(pad, Math.min(rect.top + rect.height/2 - tt.height/2, vh - tt.height - pad));
    }
    tooltip.style.top = top + 'px';
    tooltip.style.left = left + 'px';
  }

  // --- Init ----------------------------------------------------------------
  function init() {
    var body = document.body;
    body.appendChild(buildBottomControls());
    body.appendChild(buildGuideModal());
    body.appendChild(buildFeedbackModal());
    body.appendChild(buildCompleteModal());
    body.appendChild(buildTourPlayer());

    // Build welcome (hidden by default; shown if not done OR on Help click)
    var welcome = buildWelcomeModal();
    body.appendChild(welcome);
    var saved = lsGet(LS_EMAIL);
    if (saved) {
      setTimeout(function() {
        var inp = document.getElementById('demo-email-input');
        if (inp) inp.value = saved;
      }, 0);
    }

    // CHECK: is a tour in progress (saved by another page)?
    var state = readTourState();
    if (state && state.tourId && window.DEMO_TOURS[state.tourId]) {
      // Resume tour at saved step
      welcome.setAttribute('hidden', '');
      startTour(state.tourId, state.step);
    } else if (!lsGet(LS_WELCOME)) {
      // First time — show welcome
      // (welcome already built and visible — no-op)
    } else {
      // Returning user, no active tour — hide welcome
      welcome.setAttribute('hidden', '');
    }

    // Reposition tooltip on window resize
    window.addEventListener('resize', function() {
      if (currentTour && !document.getElementById('demo-tour').hasAttribute('hidden')) {
        renderStep();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
