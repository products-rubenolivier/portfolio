const languageButton = document.querySelector('[data-language]');
let language = 'es';
try { language = localStorage.getItem('portfolio-language') === 'en' ? 'en' : 'es'; } catch {}
function setLanguage(next) {
  language = next;
  document.documentElement.lang = next;
  document.querySelectorAll('[data-es][data-en]').forEach(element => {
    element.textContent = element.dataset[next];
  });
  if (languageButton) {
    languageButton.textContent = next === 'es' ? 'EN' : 'ES';
    languageButton.setAttribute('aria-label', next === 'es' ? 'Read in English' : 'Leer en español');
  }
  try { localStorage.setItem('portfolio-language', next); } catch {}
}
setLanguage(language);
languageButton?.addEventListener('click', () => setLanguage(language === 'es' ? 'en' : 'es'));
const menu = document.querySelector('.menu-dialog');
const menuButton = document.querySelector('.menu-toggle');
menuButton?.addEventListener('click', () => {
  menu.showModal();
  menuButton.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
});
document.querySelector('.menu-close')?.addEventListener('click', () => menu.close());
menu?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => menu.close()));
menu?.addEventListener('close', () => {
  menuButton.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
  menuButton.focus({ preventScroll: true });
});
const sections = [...document.querySelectorAll('.case-section')];
if ('IntersectionObserver' in window && sections.length) {
  const activeSections = new Set();
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => entry.isIntersecting ? activeSections.add(entry.target) : activeSections.delete(entry.target));
    const current = sections.find(section => activeSections.has(section));
    if (!current) return;
    document.querySelectorAll('.case-index a').forEach(link => {
      if (link.hash === '#' + current.id) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }, { rootMargin: '-115px 0px -45% 0px', threshold: 0 });
  sections.forEach(section => observer.observe(section));
}

const footer = document.querySelector('footer.footer');
if (footer && 'IntersectionObserver' in window) {
  const footerMotion = matchMedia('(prefers-reduced-motion: reduce)');
  if (!footerMotion.matches) {
    const footerObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio >= .2) revealFooter();
        else if (entry.boundingClientRect.top >= (entry.rootBounds?.bottom ?? innerHeight)) {
          // Re-arm only after scrolling back above the footer, without hiding it below.
          footer.classList.remove('is-revealed');
        }
      });
    }, { threshold: .2, rootMargin: '0px 0px -64px 0px' });
    function revealFooter() {
      footer.classList.add('is-revealed');
    }
    footer.classList.add('footer-reveal-ready');
    footerObserver.observe(footer.querySelector('.footer-lead'));
    footer.addEventListener('focusin', revealFooter);
    footerMotion.addEventListener('change', event => {
      if (event.matches) {
        revealFooter();
        footerObserver.disconnect();
      }
    });
  }
}

const immersiveHero = document.querySelector('.hero-immersive');
if (immersiveHero) {
  const motionButton = immersiveHero.querySelector('.hero-motion');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
  let manuallyPaused = false;
  let inView = true;
  const header = document.querySelector('.site-nav');
  const scene = immersiveHero.closest('.hero-scene');
  let headerFrame = null;
  function updateHeader() {
    headerFrame = null;
    if (!header) return;
    // Only switch surfaces when the following section reaches the header.
    const anchorOffset = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
    const threshold = Math.max(header.offsetHeight, anchorOffset);
    header.classList.toggle('is-solid', immersiveHero.getBoundingClientRect().bottom <= threshold + 1);
  }
  function scheduleHeader() {
    if (headerFrame === null) headerFrame = requestAnimationFrame(updateHeader);
  }
  addEventListener('scroll', scheduleHeader, { passive: true });
  addEventListener('resize', scheduleHeader, { passive: true });
  updateHeader();
  let motionFrame = null;
  let pointerInside = false;
  let pointerClientX = 0;
  let pointerClientY = 0;

  function syncHeroState() {
    const paused = manuallyPaused || reducedMotion.matches;
    immersiveHero.classList.toggle('motion-paused', paused || !inView || document.hidden);
    motionButton.setAttribute('aria-pressed', String(paused));
    const english = document.documentElement.lang === 'en';
    motionButton.setAttribute('aria-label', paused
      ? (english ? 'Resume animation' : 'Reanudar animación')
      : (english ? 'Pause animation' : 'Pausar animación'));
    motionButton.firstElementChild.textContent = paused ? '▶' : 'Ⅱ';
    if (reducedMotion.matches) {
      ['--pointer-x', '--pointer-y', '--scroll-x', '--scroll-y', '--scroll-turn', '--scroll-scale']
        .forEach(property => immersiveHero.style.removeProperty(property));
    }
    if (!paused && inView && !document.hidden) scheduleMotion();
    else if (motionFrame !== null) {
      cancelAnimationFrame(motionFrame);
      motionFrame = null;
    }
  }

  motionButton.addEventListener('click', () => {
    manuallyPaused = !manuallyPaused;
    syncHeroState();
  });
  languageButton?.addEventListener('click', syncHeroState);
  reducedMotion.addEventListener('change', syncHeroState);
  document.addEventListener('visibilitychange', syncHeroState);

  function renderMotion() {
    motionFrame = null;
    if (manuallyPaused || reducedMotion.matches || !inView || document.hidden) return;
    const bounds = immersiveHero.getBoundingClientRect();
    const headerHeight = header?.getBoundingClientRect().height ?? 0;
    const sceneBounds = scene?.getBoundingClientRect();
    const travel = sceneBounds ? Math.max(1, sceneBounds.height - bounds.height) : bounds.height;
    const distance = sceneBounds ? -sceneBounds.top : headerHeight - bounds.top;
    const progress = Math.max(0, Math.min(1, distance / travel));
    const mobile = !finePointer.matches;
    // A separate layer gives scroll depth without cancelling the drifting gradients.
    immersiveHero.style.setProperty('--scroll-x', `${Math.sin(progress * Math.PI) * (mobile ? -45 : -100)}px`);
    immersiveHero.style.setProperty('--scroll-y', `${progress * (mobile ? 95 : 180)}px`);
    immersiveHero.style.setProperty('--scroll-turn', `${progress * -10}deg`);
    immersiveHero.style.setProperty('--scroll-scale', String(1 + progress * .2));
    const x = pointerInside ? Math.max(-.5, Math.min(.5, (pointerClientX - bounds.left) / bounds.width - .5)) : 0;
    const y = pointerInside ? Math.max(-.5, Math.min(.5, (pointerClientY - bounds.top) / bounds.height - .5)) : 0;
    immersiveHero.style.setProperty('--pointer-x', `${x * 110}px`);
    immersiveHero.style.setProperty('--pointer-y', `${y * 80}px`);
  }
  function scheduleMotion() {
    if (motionFrame === null && !manuallyPaused && !reducedMotion.matches && inView && !document.hidden) {
      motionFrame = requestAnimationFrame(renderMotion);
    }
  }
  immersiveHero.addEventListener('pointermove', event => {
    if (manuallyPaused || reducedMotion.matches || !finePointer.matches) return;
    pointerInside = true;
    pointerClientX = event.clientX;
    pointerClientY = event.clientY;
    scheduleMotion();
  }, { passive: true });
  immersiveHero.addEventListener('pointerleave', () => {
    pointerInside = false;
    scheduleMotion();
  });
  addEventListener('scroll', scheduleMotion, { passive: true });
  addEventListener('resize', scheduleMotion, { passive: true });

  function measureScene() {
    if (!scene) return;
    scene.style.setProperty('--hero-height', `${immersiveHero.getBoundingClientRect().height}px`);
    scheduleHeader();
    scheduleMotion();
  }
  measureScene();
  if (scene && 'ResizeObserver' in window) {
    const sceneObserver = new ResizeObserver(measureScene);
    sceneObserver.observe(immersiveHero);
  } else {
    addEventListener('resize', measureScene, { passive: true });
  }

  if ('IntersectionObserver' in window) {
    const heroObserver = new IntersectionObserver(entries => {
      inView = entries[0].isIntersecting;
      syncHeroState();
    });
    heroObserver.observe(immersiveHero);
  }
  syncHeroState();
}
