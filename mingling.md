---
layout: default
title: Tuesday Mingling
nav_key: mingling
description: Monthly research discussions across groups and departments working on the mathematical foundations of AI at Chalmers and the University of Gothenburg.
---

<header class="page-lead shell">
  <div class="page-lead-grid">
    <h1>Tuesday Mingling</h1>
    <div class="page-intro">
      <p>Monthly sessions bringing together researchers across groups and departments working on the mathematical foundations of AI at Chalmers and the University of Gothenburg.</p>
    </div>
  </div>
  <div class="activity-organisation" aria-label="Mingling organisation">
    <dl>
      <div>
        <dt>Lead</dt>
        <dd>{{ site.data.mingling.organisers | join: ' · ' }}</dd>
      </div>
    </dl>
  </div>
</header>

<section class="seminar-source shell" aria-labelledby="mingling-signup-heading">
  <div class="seminar-source-card">
    <div>
      <p class="event-meta">Sign up once for the series</p>
      <h2 id="mingling-signup-heading">Join the sessions</h2>
    </div>
    <div class="seminar-source-copy">
      <p>The last Tuesday of each month, {{ site.data.mingling.time }} (Stockholm time), starting 24 November 2026. No session in December.</p>
      <p>{{ site.data.mingling.location }}.</p>
      <p>Sign up to join the mailing list for event announcements and schedule changes. You can unsubscribe at any time.</p>
      <div class="seminar-source-actions">
        <a class="button-link" href="{{ site.data.mingling.signup_url }}" target="_blank" rel="noopener noreferrer">Sign up for Tuesday Mingling <span aria-hidden="true">↗</span></a>
      </div>
    </div>
  </div>
</section>

<section class="series-section shell" aria-labelledby="mingling-format-heading">
  <div class="series-label">
    <h2 id="mingling-format-heading">Research and conversation</h2>
  </div>
  <div class="prose">
    <p>The sessions are a place to discuss ongoing and completed research in AI theory, exchange ideas and find connections between groups. Discussions include enough background for researchers from different fields to take part.</p>
  </div>
</section>

<section class="series-section shell" aria-labelledby="mingling-dates-heading">
  <div class="series-label">
    <h2 id="mingling-dates-heading">Session dates</h2>
  </div>
  <p class="mingling-schedule-note">The current series runs from November 2026 to June 2027, excluding December. All sessions are {{ site.data.mingling.time }} in Europe/Stockholm.</p>
  <ol class="mingling-dates">
    {% for session_date in site.data.mingling.dates %}
      <li id="session-{{ session_date }}">
        <time datetime="{{ session_date }}">{{ session_date | date: '%A %-d %B %Y' }}</time>
        <span>{{ site.data.mingling.time }}</span>
      </li>
    {% endfor %}
  </ol>
</section>
