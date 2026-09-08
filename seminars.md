---
layout: default
title: Seminars
nav_key: seminars
description: Mathematical Foundations of AI seminars within the GAPinDNNs seminar series.
activity_leads:
  - Jan Gerken
  - Daniel Persson
---

<header class="page-lead shell">
  <div class="page-lead-grid">
    <h1>Seminars</h1>
    <div class="page-intro">
      <p>Seminars organised by the theme take place within the GAPinDNNs seminar series at Mathematical Sciences, Chalmers and the University of Gothenburg.</p>
    </div>
  </div>
  {% include activity-organisation.html %}
</header>

<section class="seminar-source shell" aria-labelledby="gapindnns-heading">
  <div class="seminar-source-card">
    <div>
      <p class="event-meta">Seminar series</p>
      <h2 id="gapindnns-heading">GAPinDNNs seminar</h2>
    </div>
    <div class="seminar-source-copy">
      <p>The GAPinDNNs website is the authoritative source for dates, schedule changes and abstracts. Its calendar can be subscribed to for automatic updates.</p>
      <div class="seminar-source-actions">
        <a class="button-link" href="https://gapindnns.github.io/_pages/seminar.html" target="_blank" rel="noopener noreferrer">Current schedule <span aria-hidden="true">↗</span></a>
        <a class="text-link" href="https://gapindnns.github.io/downloads/calendar.ics" target="_blank" rel="noopener noreferrer">Subscribe to calendar <span aria-hidden="true">↗</span></a>
      </div>
    </div>
  </div>
</section>

<section class="seminar-archive shell" aria-labelledby="seminar-feed-heading">
  <div class="archive-title-row">
    <div class="series-label">
      <h2 id="seminar-feed-heading">Sourced seminar feed</h2>
    </div>
    <div class="year-controls" aria-label="Navigate seminar years" data-year-controls hidden>
      <button type="button" data-year-previous aria-label="Previous archive year">← <span>Previous</span></button>
      <label>
        <span class="visually-hidden">Choose a year</span>
        <select data-year-select>
          <option value="seminar-feed">All years</option>
        </select>
      </label>
      <button type="button" data-year-next aria-label="Next archive year"><span>Next</span> →</button>
    </div>
  </div>

  <div class="archive-layout">
    <nav class="year-index" aria-label="Seminar feed by year" data-gap-year-index hidden>
      <p class="eyebrow">Jump to</p>
    </nav>

    <div class="seminar-years" id="seminar-feed" data-gap-seminar-feed aria-live="polite">
      <p class="seminar-feed-status">Loading seminars from GAPinDNNs…</p>
    </div>
  </div>
</section>
