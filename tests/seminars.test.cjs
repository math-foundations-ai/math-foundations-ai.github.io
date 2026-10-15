const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

// Load the browser script without starting a feed request or requiring a DOM.
function browserContext(document = { querySelector: () => null, querySelectorAll: () => [], getElementById: () => null }) {
  const context = vm.createContext({
    document,
    window: { location: { hash: '' }, addEventListener() {} },
    URL,
  });
  vm.runInContext(fs.readFileSync(path.join(__dirname, '../assets/js/site.js'), 'utf8'), context);
  return context;
}

const context = browserContext();

const talk = (iso) => ({ date: { iso } });
const dates = (talks) => Array.from(talks, (item) => item.date.iso);
const partition = (talks, now) => context.partitionGapSeminars(talks, new Date(now));

test('the 14 October GAPinDNNs seminar is upcoming on 7 October', () => {
  const result = partition([talk('2026-10-14'), talk('2026-06-11')], '2026-10-07T12:00:00Z');
  assert.deepEqual(dates(result.upcoming), ['2026-10-14']);
  assert.deepEqual(dates(result.past), ['2026-06-11']);
});

test('sorts upcoming soonest first and past newest first without changing source order', () => {
  const sourceDates = ['2026-12-01', '2026-04-14', '2026-10-14', '2026-06-11'];
  const talks = sourceDates.map(talk);
  const result = partition(talks, '2026-10-07T12:00:00Z');
  assert.deepEqual(dates(result.upcoming), ['2026-10-14', '2026-12-01']);
  assert.deepEqual(dates(result.past), ['2026-06-11', '2026-04-14']);
  assert.deepEqual(dates(talks), sourceDates);
});

test('today stays upcoming until midnight in Stockholm, then becomes past', () => {
  const talks = [talk('2026-10-14')];
  assert.deepEqual(dates(partition(talks, '2026-10-14T21:59:59Z').upcoming), ['2026-10-14']);
  assert.deepEqual(dates(partition(talks, '2026-10-14T22:00:00Z').past), ['2026-10-14']);
});

test('uses Stockholm calendar dates at the winter year boundary', () => {
  const talks = [talk('2026-12-31'), talk('2027-01-01')];
  const result = partition(talks, '2026-12-31T23:00:00Z');
  assert.deepEqual(dates(result.upcoming), ['2027-01-01']);
  assert.deepEqual(dates(result.past), ['2026-12-31']);
});

test('handles empty feeds, feeds with no upcoming seminars, and unparsed dates', () => {
  const empty = partition([], '2026-10-07T12:00:00Z');
  assert.deepEqual(dates(empty.upcoming), []);
  assert.deepEqual(dates(empty.past), []);
  const result = partition([talk(''), talk('2026-06-11')], '2026-10-07T12:00:00Z');
  assert.deepEqual(dates(result.upcoming), []);
  assert.deepEqual(dates(result.past), ['2026-06-11']);
});

function minglingContext() {
  const sessions = ['2026-11-24', '2027-01-26'].map((date) => ({ dataset: { minglingDate: date }, hidden: true }));
  const preview = { hidden: true, querySelectorAll: () => sessions };
  const empty = { hidden: true };
  const seminars = { hidden: false };
  const nodes = {
    '[data-mingling-preview]': preview,
    '[data-gap-upcoming-empty]': empty,
    '[data-gap-upcoming-seminars]': seminars,
  };
  const context = browserContext({ querySelector: (selector) => nodes[selector] || null, querySelectorAll: () => [], getElementById: () => null });
  return { context, sessions, preview, empty, seminars };
}

test('mingling advances to January after the November session ends in Stockholm', () => {
  const { context, sessions, preview } = minglingContext();
  context.renderMinglingPreview(new Date('2026-11-24T22:59:59Z'));
  assert.deepEqual(sessions.map((session) => session.hidden), [false, true]);
  context.renderMinglingPreview(new Date('2026-11-24T23:00:00Z'));
  assert.deepEqual(sessions.map((session) => session.hidden), [true, false]);
  assert.equal(preview.hidden, false);
});

test('an empty seminar feed cannot hide an upcoming mingling session or show a false empty state', () => {
  const { context, preview, empty, seminars } = minglingContext();
  context.renderMinglingPreview(new Date('2026-10-15T12:00:00Z'));
  context.renderGapPreview([]);
  assert.equal(preview.hidden, false);
  assert.equal(seminars.hidden, true);
  assert.equal(empty.hidden, true);

  context.renderMinglingPreview(new Date('2027-01-27T12:00:00Z'));
  context.renderGapPreview([]);
  assert.equal(preview.hidden, true);
  assert.equal(empty.hidden, false);
});
