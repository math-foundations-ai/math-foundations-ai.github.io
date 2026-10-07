const menuButton = document.querySelector('.nav-toggle');
const navigation = document.querySelector('.site-nav');

function prepareExternalLink(link) {
  const destination = new URL(link.href, window.location.href);
  const isExternal = ['http:', 'https:'].includes(destination.protocol)
    && destination.origin !== window.location.origin;

  if (isExternal) {
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
  }
}

document.querySelectorAll('a[href]').forEach(prepareExternalLink);

if (menuButton && navigation) {
  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    navigation.classList.toggle('is-open', !isOpen);
  });
}

function openHashTarget() {
  const targetId = window.location.hash ? decodeURIComponent(window.location.hash.slice(1)) : '';
  const target = targetId ? document.getElementById(targetId) : null;
  if (target?.matches('[data-seminar]')) {
    document.querySelectorAll('[data-seminar]').forEach((item) => { item.open = item === target; });
    target.scrollIntoView({ block: 'center' });
  }
}

function setupSeminarItems(scope = document) {
  scope.querySelectorAll('[data-seminar]:not([data-seminar-ready])').forEach((item) => {
    item.dataset.seminarReady = 'true';
    item.addEventListener('toggle', () => {
      if (!item.open) return;
      document.querySelectorAll('[data-seminar]').forEach((other) => { if (other !== item) other.open = false; });
      history.replaceState(null, '', `#${item.id}`);
    });
  });
}

window.addEventListener('hashchange', openHashTarget);
setupSeminarItems();
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

function setupYearNavigation() {
  const yearSelect = document.querySelector('[data-year-select]');
  const previousYear = document.querySelector('[data-year-previous]');
  const nextYear = document.querySelector('[data-year-next]');
  const controls = document.querySelector('[data-year-controls]');
  const yearSections = [...document.querySelectorAll('[data-seminar-year]')];

  if (!yearSelect || !previousYear || !nextYear || !yearSections.length || yearSelect.dataset.ready) return;
  yearSelect.dataset.ready = 'true';
  const yearIds = yearSections.map((section) => section.id);

  yearSections.forEach((section) => {
    const option = document.createElement('option');
    option.value = section.id;
    option.textContent = section.dataset.seminarYear;
    yearSelect.append(option);
  });

  const updateButtons = (id) => {
    const index = yearIds.indexOf(id);
    previousYear.disabled = index < 0 || index >= yearIds.length - 1;
    nextYear.disabled = index <= 0;
  };

  const moveToYear = (id) => {
    const target = document.getElementById(id);
    if (!target) return;
    yearSelect.value = id;
    target.scrollIntoView({ block: 'start' });
    history.replaceState(null, '', `#${id}`);
    updateButtons(id);
  };

  yearSelect.addEventListener('change', () => {
    if (yearSelect.value === 'seminar-feed') {
      document.getElementById('seminar-feed')?.scrollIntoView({ block: 'start' });
      history.replaceState(null, '', '#seminar-feed');
      updateButtons('seminar-feed');
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

  window.addEventListener('hashchange', () => {
    const targetId = decodeURIComponent(window.location.hash.slice(1));
    if (yearIds.includes(targetId)) {
      yearSelect.value = targetId;
      updateButtons(targetId);
    }
  });

  controls?.removeAttribute('hidden');
  updateButtons('seminar-feed');

  const initialTarget = decodeURIComponent(window.location.hash.slice(1));
  if (yearIds.includes(initialTarget)) moveToYear(initialTarget);
}

const gapSeminarUrl = 'https://gapindnns.github.io/_pages/seminar.html';

function normalizeText(value = '') {
  return value.replace(/\s+/g, ' ').trim();
}

function parseGapDate(label) {
  const match = label.match(/^(\d{1,2})\s+([A-Za-z]{3})\s+(\d{4})$/);
  if (!match) return { day: '', month: '', year: '', iso: '', long: label };

  const monthIndex = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].indexOf(match[2]);
  if (monthIndex < 0) return { day: match[1], month: match[2], year: match[3], iso: '', long: label };

  const date = new Date(Date.UTC(Number(match[3]), monthIndex, Number(match[1])));
  return {
    day: match[1],
    month: match[2],
    year: match[3],
    iso: date.toISOString().slice(0, 10),
    long: new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(date),
  };
}

function parseGapSeminars(html) {
  const source = new DOMParser().parseFromString(html, 'text/html');

  return [...source.querySelectorAll('.talk-entry')].map((entry) => {
    const titleNode = entry.querySelector('.card-title')?.cloneNode(true);
    titleNode?.querySelectorAll('a').forEach((link) => link.remove());

    const dateLabel = normalizeText(entry.querySelector('.talk-date')?.textContent);
    const date = parseGapDate(dateLabel);
    const metadata = entry.querySelector('.text-end.text-body-secondary')?.cloneNode(true);
    metadata?.querySelectorAll('.talk-date, .talk-time, i').forEach((node) => node.remove());
    const sourceId = entry.id;
    const localId = `seminar-${sourceId.replace(/^talk_/, '').replace(/[^A-Za-z0-9_-]+/g, '-')}`;
    const affiliation = normalizeText(entry.querySelector('.card-subtitle span')?.textContent).replace(/^\(|\)$/g, '');
    const abstract = [...entry.querySelectorAll('.collapse p, .collapse li')]
      .map((node) => normalizeText(node.textContent))
      .filter(Boolean);

    return {
      id: localId,
      sourceUrl: `${gapSeminarUrl}#${encodeURIComponent(sourceId)}`,
      title: normalizeText(titleNode?.textContent),
      speaker: normalizeText(entry.querySelector('.card-subtitle a')?.textContent),
      affiliation,
      date,
      time: normalizeText(entry.querySelector('.talk-time')?.textContent),
      location: normalizeText(metadata?.textContent) || 'See GAPinDNNs',
      abstract,
    };
  }).filter((talk) => talk.title && talk.speaker && talk.date.year);
}

function externalLink(label, href, className = '') {
  const link = document.createElement('a');
  link.href = href;
  link.textContent = label;
  link.className = className;
  prepareExternalLink(link);
  return link;
}

function partitionGapSeminars(talks, now = new Date()) {
  // The source supplies dates without an end time. Keep today's seminars
  // upcoming until the calendar day ends in the seminar's Stockholm timezone.
  const today = new Intl.DateTimeFormat('sv-SE', {
    timeZone: 'Europe/Stockholm', year: 'numeric', month: '2-digit', day: '2-digit',
  }).format(now);
  const datedTalks = talks.filter((talk) => talk.date.iso);

  return {
    upcoming: datedTalks.filter((talk) => talk.date.iso >= today)
      .sort((a, b) => a.date.iso.localeCompare(b.date.iso)),
    past: datedTalks.filter((talk) => talk.date.iso < today)
      .sort((a, b) => b.date.iso.localeCompare(a.date.iso)),
  };
}

function renderGapPreviewList(preview, talks) {
  preview.replaceChildren();
  if (!talks.length) {
    const item = document.createElement('li');
    item.className = 'seminar-feed-status';
    item.textContent = 'No recent seminars are listed.';
    preview.append(item);
    return;
  }

  talks.slice(0, 2).forEach((talk) => {
    const item = document.createElement('li');
    item.className = 'seminar-news-item';
    const link = document.createElement('a');
    link.href = `/seminars/#${encodeURIComponent(talk.id)}`;
    link.setAttribute('aria-label', `${talk.speaker}: ${talk.title}, ${talk.date.long}`);

    const time = document.createElement('time');
    time.dateTime = talk.date.iso;
    time.textContent = talk.date.long;
    const speaker = document.createElement('span');
    speaker.className = 'seminar-news-speaker';
    speaker.textContent = talk.speaker;
    const title = document.createElement('strong');
    title.className = 'seminar-news-title';
    title.textContent = talk.title;

    link.append(time, speaker, title);
    item.append(link);
    preview.append(item);
  });
}

function renderGapPreview(talks) {
  const { upcoming, past } = partitionGapSeminars(talks);
  document.querySelectorAll('[data-gap-seminar-preview]').forEach((preview) => {
    renderGapPreviewList(preview, preview.dataset.gapSeminarPreview === 'upcoming' ? upcoming : past);
  });

  const upcomingSection = document.querySelector('[data-gap-upcoming-seminars]');
  const upcomingEmpty = document.querySelector('[data-gap-upcoming-empty]');
  if (upcomingSection) upcomingSection.hidden = !upcoming.length;
  if (upcomingEmpty) upcomingEmpty.hidden = Boolean(upcoming.length);
}

function createSeminarItem(talk) {
  const item = document.createElement('details');
  item.className = 'seminar-item';
  item.id = talk.id;
  item.dataset.seminar = '';

  const summary = document.createElement('summary');
  const date = document.createElement('time');
  date.dateTime = talk.time ? `${talk.date.iso}T${talk.time}:00` : talk.date.iso;
  const day = document.createElement('span');
  day.className = 'seminar-day';
  day.textContent = talk.date.day.padStart(2, '0');
  const month = document.createElement('span');
  month.className = 'seminar-month';
  month.textContent = talk.date.month;
  date.append(day, month);

  const mark = document.createElement('span');
  mark.className = 'timeline-mark';
  mark.setAttribute('aria-hidden', 'true');

  const overview = document.createElement('span');
  overview.className = 'seminar-summary';
  const speaker = document.createElement('span');
  speaker.className = 'seminar-speaker';
  speaker.textContent = talk.affiliation ? `${talk.speaker} · ${talk.affiliation}` : talk.speaker;
  const title = document.createElement('strong');
  title.textContent = talk.title;
  const instruction = document.createElement('span');
  instruction.className = 'seminar-instruction';
  const whenClosed = document.createElement('span');
  whenClosed.className = 'when-closed';
  whenClosed.textContent = 'Read details';
  const whenOpen = document.createElement('span');
  whenOpen.className = 'when-open';
  whenOpen.textContent = 'Close details';
  const plus = document.createElement('span');
  plus.setAttribute('aria-hidden', 'true');
  plus.textContent = '＋';
  instruction.append(whenClosed, whenOpen, plus);
  overview.append(speaker, title, instruction);
  summary.append(date, mark, overview);

  const details = document.createElement('div');
  details.className = 'seminar-details';
  const facts = document.createElement('div');
  facts.className = 'seminar-facts';
  const factValues = [
    ['Date & time', `${talk.date.long}${talk.time ? ` · ${talk.time}` : ''}`],
    ['Location', talk.location],
  ];
  factValues.forEach(([label, value]) => {
    const fact = document.createElement('p');
    const name = document.createElement('span');
    name.textContent = label;
    fact.append(name, document.createTextNode(value));
    facts.append(fact);
  });
  const sourceFact = document.createElement('p');
  const sourceLabel = document.createElement('span');
  sourceLabel.textContent = 'Source';
  sourceFact.append(sourceLabel, externalLink('GAPinDNNs', talk.sourceUrl));
  facts.append(sourceFact);

  const abstract = document.createElement('div');
  abstract.className = 'seminar-abstract prose';
  const abstractLabel = document.createElement('p');
  abstractLabel.className = 'eyebrow';
  abstractLabel.textContent = 'Abstract';
  abstract.append(abstractLabel);
  if (talk.abstract.length) {
    talk.abstract.forEach((paragraph) => {
      const copy = document.createElement('p');
      copy.textContent = paragraph;
      abstract.append(copy);
    });
  } else {
    const copy = document.createElement('p');
    copy.textContent = 'See the GAPinDNNs listing for details.';
    abstract.append(copy);
  }
  const sourceLink = externalLink('Source listing ↗', talk.sourceUrl, 'text-link');
  abstract.append(sourceLink);

  details.append(facts, abstract);
  item.append(summary, details);
  return item;
}

function renderGapFeed(talks) {
  const feed = document.querySelector('[data-gap-seminar-feed]');
  const yearIndex = document.querySelector('[data-gap-year-index]');
  if (!feed || !yearIndex) return;

  const talksByYear = new Map();
  talks.forEach((talk) => {
    if (!talksByYear.has(talk.date.year)) talksByYear.set(talk.date.year, []);
    talksByYear.get(talk.date.year).push(talk);
  });

  feed.replaceChildren();
  yearIndex.replaceChildren();
  const jumpLabel = document.createElement('p');
  jumpLabel.className = 'eyebrow';
  jumpLabel.textContent = 'Jump to';
  yearIndex.append(jumpLabel);

  talksByYear.forEach((yearTalks, year) => {
    const section = document.createElement('section');
    section.className = 'seminar-year';
    section.id = `year-${year}`;
    section.dataset.seminarYear = year;
    const heading = document.createElement('h3');
    heading.className = 'year-heading';
    heading.textContent = year;
    const list = document.createElement('div');
    list.className = 'seminar-list';
    yearTalks.forEach((talk) => list.append(createSeminarItem(talk)));
    section.append(heading, list);
    feed.append(section);

    const yearLink = document.createElement('a');
    yearLink.href = `#year-${year}`;
    yearLink.textContent = year;
    yearIndex.append(yearLink);
  });

  yearIndex.removeAttribute('hidden');
  setupSeminarItems(feed);
  setupYearNavigation();
  openHashTarget();
}

function showGapFeedError() {
  document.querySelectorAll('[data-gap-seminar-preview]').forEach((preview) => {
    const item = document.createElement('li');
    item.className = 'seminar-feed-status';
    item.append(externalLink('View seminar dates ↗', gapSeminarUrl));
    preview.replaceChildren(item);
  });

  const feed = document.querySelector('[data-gap-seminar-feed]');
  if (feed) {
    const message = document.createElement('p');
    message.className = 'seminar-feed-status';
    message.append(document.createTextNode('The feed is temporarily unavailable. '), externalLink('View the current schedule on GAPinDNNs ↗', gapSeminarUrl));
    feed.replaceChildren(message);
  }
}

async function loadGapSeminars() {
  const hasFeed = document.querySelector('[data-gap-seminar-preview], [data-gap-seminar-feed]');
  if (!hasFeed) return;

  try {
    const response = await fetch(gapSeminarUrl);
    if (!response.ok) throw new Error(`GAPinDNNs returned ${response.status}`);
    const talks = parseGapSeminars(await response.text());
    if (!talks.length) throw new Error('No seminar records found');
    renderGapPreview(talks);
    renderGapFeed(talks);
  } catch (error) {
    showGapFeedError();
  }
}

loadGapSeminars();
