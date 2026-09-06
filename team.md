---
layout: default
title: Team
nav_key: team
description: Leadership of the Mathematical Foundations of AI CHAIR theme.
theme_leader:
  name: Stefano Sarao Mannelli
  affiliation: CSE, Chalmers/GU
  position: Assistant Professor, Data Science and AI
  profile_url: https://stefsmlab.github.io/people/stefanosaraomannelli/
  image: /assets/images/team/stefano-sarao-mannelli.jpg
leadership_team:
  - name: Giuseppe Durisi
    affiliation: E2, Chalmers
    position: Full Professor, Communication, Antennas and Optical Networks
    profile_url: https://gdurisi.github.io/
    image: /assets/images/team/giuseppe-durisi.jpg
  - name: Jan Gerken
    affiliation: Mathematical Sciences, Chalmers/GU
    position: Assistant Professor, Algebra and Geometry
    profile_url: https://gapindnns.github.io/members/Jan_Gerken
    image: /assets/images/team/jan-gerken.jpg
  - name: Rebecka Jörnsten
    affiliation: Mathematical Sciences, Chalmers/GU
    position: Full Professor, Applied Mathematics and Statistics
    profile_url: https://rjornsten.github.io/
    image: /assets/images/team/rebecka-jornsten.jpg
  - name: Bernhard Mehlig
    affiliation: Physics, GU
    position: Full Professor
    profile_url: https://gu-statphys.org/
    image: /assets/images/team/bernhard-mehlig.jpg
  - name: Flavio Nicoletti
    affiliation: CSE, Chalmers/GU
    position: Postdoc, Data Science and AI
    profile_url: https://stefsmlab.github.io/people/flavionicoletti/
    image: /assets/images/team/flavio-nicoletti.jpg
  - name: Ashkan Panahi
    affiliation: CSE, Chalmers/GU
    position: Associate Professor, Data Science and AI
    profile_url: https://www.chalmers.se/en/departments/cse/our-research/data-science-and-ai/machine-learning-and-decision-making-lab/
    link_label: Lab
    image: /assets/images/team/ashkan-panahi.jpg
  - name: Daniel Persson
    affiliation: Mathematical Sciences, Chalmers/GU
    position: Head of Division, Algebra and Geometry
    profile_url: https://gapindnns.github.io/members/Daniel_Persson
    image: /assets/images/team/daniel-persson.jpg
---

<header class="page-lead shell">
  <div class="page-lead-grid">
    <h1>Team</h1>
    <div class="page-intro">
      <p>Leadership of the Mathematical Foundations of AI theme within CHAIR.</p>
    </div>
  </div>
</header>

<section class="team-section team-section--leader shell" aria-labelledby="theme-leader-heading">
  <div class="series-label">
    <h2 id="theme-leader-heading">Theme leader</h2>
  </div>

  {% assign person = page.theme_leader %}
  <article class="team-card team-card--leader" id="{{ person.name | slugify }}">
    <img class="team-card-image" src="{{ person.image | relative_url }}" alt="" width="128" height="128" decoding="async" />
    <div class="team-card-copy">
      <h3>{{ person.name }}</h3>
      <p class="team-card-affiliation">{{ person.affiliation }}</p>
      <p class="team-card-position">{{ person.position }}</p>
      <a class="text-link" href="{{ person.profile_url }}" target="_blank" rel="noopener noreferrer">{{ person.link_label | default: 'Profile' }} <span aria-hidden="true">↗</span><span class="visually-hidden"> for {{ person.name }}</span></a>
    </div>
  </article>
</section>

<section class="team-section shell" aria-labelledby="leadership-team-heading">
  <div class="series-label">
    <h2 id="leadership-team-heading">Leadership team</h2>
  </div>

  <div class="team-grid">
    {% for person in page.leadership_team %}
      <article class="team-card" id="{{ person.name | slugify }}">
        <img class="team-card-image" src="{{ person.image | relative_url }}" alt="" width="128" height="128" loading="lazy" decoding="async" />
        <div class="team-card-copy">
          <h3>{{ person.name }}</h3>
          <p class="team-card-affiliation">{{ person.affiliation }}</p>
          <p class="team-card-position">{{ person.position }}</p>
          <a class="text-link" href="{{ person.profile_url }}" target="_blank" rel="noopener noreferrer">{{ person.link_label | default: 'Profile' }} <span aria-hidden="true">↗</span><span class="visually-hidden"> for {{ person.name }}</span></a>
        </div>
      </article>
    {% endfor %}
  </div>
</section>
