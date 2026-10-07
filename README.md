# Mathematical Foundations of AI

Website for the CHAIR Mathematical Foundations of AI research theme.

## Add an activity

- Workshops live in `_workshops/` and use one Markdown file per edition.
- Retreats live in `_retreats/` and use the same edition format.
- Seminar dates and details are sourced at runtime from the [GAPinDNNs seminar page](https://gapindnns.github.io/_pages/seminar.html), which remains the canonical source.
- The homepage separates seminars by the current date in Europe/Stockholm: today's and future seminars appear under Upcoming activities (soonest first), while earlier seminars appear under Recent activities (newest first).
- For workshops and retreats, set `status: upcoming` or `status: past` in front matter to control where an item appears.

Edition pages support ordinary Markdown figures. Use semantic markup so captions remain attached to their images:

```html
<figure class="content-figure content-figure--wide">
  <img src="/assets/images/example.png" alt="A concise description of the figure">
  <figcaption><span>Figure 1.</span> A useful caption.</figcaption>
</figure>
```

Run the seminar date regression tests with `node --test tests/seminars.test.cjs`.

