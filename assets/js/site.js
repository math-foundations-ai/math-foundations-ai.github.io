const menuButton = document.querySelector('.nav-toggle');
const navigation = document.querySelector('.site-nav');

document.querySelectorAll('a[href]').forEach((link) => {
  const destination = new URL(link.href, window.location.href);
  const isExternal = ['http:', 'https:'].includes(destination.protocol)
    && destination.origin !== window.location.origin;

  if (isExternal) {
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
  }
});

if (menuButton && navigation) {
  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    navigation.classList.toggle('is-open', !isOpen);
  });
}

const seminarItems = [...document.querySelectorAll('[data-seminar]')];

function openHashTarget() {
  const targetId = window.location.hash ? decodeURIComponent(window.location.hash.slice(1)) : '';
  const target = targetId ? document.getElementById(targetId) : null;
  if (target?.matches('[data-seminar]')) {
    seminarItems.forEach((item) => { item.open = item === target; });
    target.scrollIntoView({ block: 'center' });
  }
}

seminarItems.forEach((item) => {
  item.addEventListener('toggle', () => {
    if (!item.open) return;
    seminarItems.forEach((other) => { if (other !== item) other.open = false; });
    history.replaceState(null, '', `#${item.id}`);
  });
});

window.addEventListener('hashchange', openHashTarget);
openHashTarget();

const programDayTriggers = [...document.querySelectorAll('[data-program-day-trigger]')];
const programDayPanels = [...document.querySelectorAll('[data-program-day-panel]')];

function closeProgramDays() {
  programDayTriggers.forEach((trigger) => { trigger.setAttribute('aria-expanded', 'false'); });
  programDayPanels.forEach((panel) => {
    panel.hidden = true;
    panel.querySelectorAll('[data-program-talk][open]').forEach((talk) => { talk.open = false; });
  });
}

function openProgramDay(panelId) {
  const trigger = programDayTriggers.find((item) => item.dataset.programDayTrigger === panelId);
  const panel = document.getElementById(panelId);
  if (!trigger || !panel?.matches('[data-program-day-panel]')) return null;

  closeProgramDays();
  trigger.setAttribute('aria-expanded', 'true');
  panel.hidden = false;
  return panel;
}

function openProgramDayHash() {
  const targetId = window.location.hash ? decodeURIComponent(window.location.hash.slice(1)) : '';
  const target = targetId ? document.getElementById(targetId) : null;
  const panel = target?.matches('[data-program-day-panel]')
    ? target
    : target?.closest('[data-program-day-panel]');

  if (panel) {
    openProgramDay(panel.id);
    requestAnimationFrame(() => target.scrollIntoView({ block: 'start' }));
  }
}

programDayTriggers.forEach((trigger) => {
  trigger.addEventListener('click', () => {
    const panelId = trigger.dataset.programDayTrigger;
    const wasOpen = trigger.getAttribute('aria-expanded') === 'true';

    if (wasOpen) {
      closeProgramDays();
      history.replaceState(null, '', '#program');
    } else {
      openProgramDay(panelId);
      history.replaceState(null, '', `#${panelId}`);
    }
  });
});

window.addEventListener('hashchange', openProgramDayHash);
openProgramDayHash();

const programTalks = [...document.querySelectorAll('[data-program-talk]')];

function openProgramTalkHash() {
  const targetId = window.location.hash ? decodeURIComponent(window.location.hash.slice(1)) : '';
  const target = targetId ? document.getElementById(targetId) : null;
  if (target?.matches('[data-program-talk]')) {
    programTalks.forEach((item) => { item.open = item === target; });
    target.scrollIntoView({ block: 'start' });
  }
}

programTalks.forEach((item) => {
  item.addEventListener('toggle', () => {
    if (!item.open) return;
    programTalks.forEach((other) => { if (other !== item) other.open = false; });
    history.replaceState(null, '', `#${item.id}`);
  });
});

window.addEventListener('hashchange', openProgramTalkHash);
openProgramTalkHash();

const yearSelect = document.querySelector('[data-year-select]');
const previousYear = document.querySelector('[data-year-previous]');
const nextYear = document.querySelector('[data-year-next]');
const yearSections = [...document.querySelectorAll('[data-seminar-year]')];

if (yearSelect && previousYear && nextYear && yearSections.length) {
  const yearIds = yearSections.map((section) => section.id);

  const moveToYear = (id) => {
    const target = document.getElementById(id);
    if (!target) return;
    yearSelect.value = id;
    target.scrollIntoView({ block: 'start' });
    history.replaceState(null, '', `#${id}`);
    const index = yearIds.indexOf(id);
    previousYear.disabled = index >= yearIds.length - 1;
    nextYear.disabled = index <= 0;
  };

  yearSelect.addEventListener('change', () => {
    if (yearSelect.value === 'archive') {
      document.getElementById('archive')?.scrollIntoView({ block: 'start' });
      history.replaceState(null, '', '#archive');
      previousYear.disabled = true;
      nextYear.disabled = true;
    } else {
      moveToYear(yearSelect.value);
    }
  });

  previousYear.addEventListener('click', () => {
    const index = yearIds.indexOf(yearSelect.value);
    if (index >= 0 && index < yearIds.length - 1) moveToYear(yearIds[index + 1]);
  });

  nextYear.addEventListener('click', () => {
    const index = yearIds.indexOf(yearSelect.value);
    if (index > 0) moveToYear(yearIds[index - 1]);
  });

  previousYear.disabled = true;
  nextYear.disabled = true;
}
