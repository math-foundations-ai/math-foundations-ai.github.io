---
layout: default
title: Seminars
nav_key: seminars
description: Seminar dates, abstracts and archive from the Mathematical Foundations of AI research theme.
activity_leads:
  - Jan Gerken
  - Daniel Persson
---

{% assign seminars = site.seminars | sort: "date" | reverse %}
{% assign upcoming = seminars | where: "status", "upcoming" %}
{% assign archive = seminars | where: "status", "past" %}
{% assign years = archive | group_by_exp: "seminar", "seminar.date | date: '%Y'" %}

<header class="page-lead shell">
  <div class="page-lead-grid">
    <h1>Seminars</h1>
    <div class="page-intro">
      <p>Talks on theoretical and mathematical questions in AI. Open an entry to read its abstract, time and location, or use the year controls to browse the archive.</p>
    </div>
  </div>
  {% include activity-organisation.html %}
</header>

<section class="seminar-upcoming shell" aria-labelledby="seminar-upcoming-heading">
  <div class="series-label">
    <h2 id="seminar-upcoming-heading">Upcoming</h2>
  </div>
  {% if upcoming.size > 0 %}
    <div class="seminar-list seminar-list--upcoming">
      {% for seminar in upcoming %}{% include seminar-item.html seminar=seminar %}{% endfor %}
    </div>
  {% else %}
    <div class="quiet-state">
      <p>No upcoming seminar is listed.</p>
    </div>
  {% endif %}
</section>

<section class="seminar-archive shell" aria-labelledby="seminar-archive-heading">
  <div class="archive-title-row">
    <div class="series-label">
      <h2 id="seminar-archive-heading">Archive</h2>
    </div>
    <div class="year-controls" aria-label="Navigate seminar years">
      <button type="button" data-year-previous aria-label="Previous archive year">← <span>Previous</span></button>
      <label>
        <span class="visually-hidden">Choose a year</span>
        <select data-year-select>
          <option value="archive">All years</option>
          {% for year in years %}<option value="year-{{ year.name }}">{{ year.name }}</option>{% endfor %}
        </select>
      </label>
      <button type="button" data-year-next aria-label="Next archive year"><span>Next</span> →</button>
    </div>
  </div>

  <div class="archive-layout">
    <nav class="year-index" aria-label="Seminar archive by year">
      <p class="eyebrow">Jump to</p>
      {% for year in years %}<a href="#year-{{ year.name }}">{{ year.name }}</a>{% endfor %}
    </nav>

    <div class="seminar-years" id="archive">
      {% for year in years %}
        <section class="seminar-year" id="year-{{ year.name }}" data-seminar-year="{{ year.name }}">
          <h3 class="year-heading">{{ year.name }}</h3>
          <div class="seminar-list">
            {% for seminar in year.items %}{% include seminar-item.html seminar=seminar %}{% endfor %}
          </div>
        </section>
      {% endfor %}
    </div>
  </div>
</section>
