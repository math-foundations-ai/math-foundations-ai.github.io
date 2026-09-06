# Mathematical Foundations of AI

A small Jekyll site for the CHAIR Mathematical Foundations of AI research theme.

## Run locally

```sh
bundle install
bundle exec jekyll serve
```

The site is then available at `http://127.0.0.1:4000`.

## Add an activity

- Workshops live in `_workshops/` and use one Markdown file per edition.
- Retreats live in `_retreats/` and use the same edition format.
- Seminars live in `_seminars/`; the seminars page turns them into an expandable, year-grouped timeline.
- Set `status: upcoming` or `status: past` in front matter to control where an item appears.

Edition pages support ordinary Markdown figures. Use semantic markup so captions remain attached to their images:

```html
<figure class="content-figure content-figure--wide">
  <img src="/assets/images/example.png" alt="A concise description of the figure">
  <figcaption><span>Figure 1.</span> A useful caption.</figcaption>
</figure>
```

## Editorial boundary

Publish only confirmed information: purpose, speakers, topics, dates, locations, programs and outcomes. Do not publish budgets, grant-deliverable language, internal milestones, private planning notes, attendee lists or unconfirmed dates.
