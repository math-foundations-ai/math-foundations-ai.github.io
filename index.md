---
layout: home
nav_key: home
description: Mathematical Foundations of AI is a research theme within the Chalmers Artificial Intelligence Research Centre (CHAIR).
---

{% assign past_workshops = site.workshops | where: "status", "past" %}
{% assign past_retreats = site.retreats | where: "status", "past" %}
{% assign recent_features = past_workshops | concat: past_retreats | sort: "start_date" | reverse %}

<section class="hero shell">
  <div class="hero-grid">
    <h1>Mathematical Foundations of AI</h1>
    <div class="hero-intro">
      <p>Mathematical Foundations of AI is a research theme within the Chalmers Artificial Intelligence Research Centre (CHAIR).</p>
      <a class="text-link" href="#programme">Upcoming activities <span aria-hidden="true">↓</span></a>
    </div>
  </div>
</section>

<section class="objective shell" aria-labelledby="objective-heading">
  <h2 id="objective-heading">Objective</h2>
  <div class="prose">
    <p>AI applications are advancing faster than their theoretical foundations. The theme develops mathematical accounts of learning dynamics and aims to establish theoretical guarantees for verifiable, trustworthy AI systems.</p>
    <p>Researchers at Chalmers and the University of Gothenburg work across computer science, electrical engineering, physics and mathematics. Methods include statistical physics and representation theory. The program consists of regular seminars, community retreats and an international workshop.</p>
  </div>
</section>

<section class="programme shell" id="programme" aria-labelledby="programme-heading">
  <div class="section-heading compact">
    <h2 id="programme-heading">Upcoming activities</h2>
  </div>

  <div class="programme-empty">
    <p class="programme-note">No upcoming activities are listed.</p>
    <a class="button-link" href="{{ '/seminars/' | relative_url }}">Seminar archive <span aria-hidden="true">→</span></a>
  </div>
</section>

<section class="recent shell" aria-labelledby="recent-heading">
  <div class="section-heading compact">
    <h2 id="recent-heading">Recent activities</h2>
  </div>
  <div class="recent-activity-grid">
    <div class="recent-features" aria-label="Recent workshops and retreats">
      {% for activity in recent_features limit: 2 %}
        <article class="feature-event">
          <p class="event-meta">
            <span>{{ activity.activity_type }}</span>
            <time datetime="{{ activity.start_date | date: '%Y-%m-%d' }}">{{ activity.date_display }}</time>
          </p>
          <h3><a href="{{ activity.url | relative_url }}">{{ activity.title }}</a></h3>
          {% if activity.lede %}<p>{{ activity.lede }}</p>{% endif %}
        </article>
      {% else %}
        <p>No workshops or retreats are archived.</p>
      {% endfor %}
    </div>

    <section class="recent-seminars" aria-labelledby="recent-seminars-heading">
      <header class="recent-seminars-header">
        <h3 class="event-meta" id="recent-seminars-heading">Seminar</h3>
      </header>

      <ol class="seminar-news-list" data-gap-seminar-preview aria-live="polite">
        <li class="seminar-feed-status">Loading seminar dates…</li>
      </ol>

      <a class="text-link all-seminars-link" href="https://gapindnns.github.io/_pages/seminar.html" target="_blank" rel="noopener noreferrer">All seminar dates <span aria-hidden="true">↗</span></a>
    </section>
  </div>
</section>
