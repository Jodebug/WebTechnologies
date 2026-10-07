# Website review notes

Reviewed against commit `1ee1788c86282554aef729832687e87648d4b66a` (7 October 2026).

The supplied gap table describes an earlier version: the current files already contain `fetch()`, mobile-first `min-width` media queries, semantic articles/asides/times, and in-code tutorial links. The full assessment brief is needed to judge how well the project meets each requirement.

| Criterion | Evidence in revised application |
| --- | --- |
| API (15%) | Explorer search and nostalgia browser selection request the Wikipedia summary endpoint. Loading, HTTP errors, timeout and clearly labelled bundled fallback are handled. |
| CSS (20%) | Base mobile layout, `min-width` tablet/desktop rules, CSS variables, `[aria-selected="true"]`, `:focus-visible`, `::backdrop`, reduced-motion and print rules. |
| Forms (15%) | Labelled inputs, select, radio/checkbox/range/textarea controls, native constraint validation, character counter and browser-driven API lookup. Demo data is not stored. |
| HTML (20%) | Semantic header/nav/main/footer, article, aside, time, mark, table caption/scope and native dialog. |
| JavaScript (15%) | Async fetch, DOM element creation, textContent, AbortController, request precedence, validation, tab/hash state and event listeners. |
| Citations | Existing tutorial citations retained in code and citations.txt; tab pattern source added alongside implementation. Review citations against the university's required style. |

## Fixes and improvements

- Six accessible main tabs reduce scrolling and retain direct hash links; the nostalgia form remains a separate page.
- Compact header, visible selected tab, mobile wrapping, readable cards, dark mode and print layout.
- Replaced unsafe interpolation of query/API text into HTML with DOM creation and textContent.
- Replaced custom modal with native dialog, including the previously missing dialog on the nostalgia page.
- Fixed featured-topic input values and common Wikipedia title aliases.
- Added request cancellation and timeout; reset cancels the form's pending lookup.
- Guarded theme storage so disabled storage cannot prevent remaining initialisation.
- Removed misleading claims that form entries are logged or saved.
- Consolidated compatibility CSS files onto the main stylesheet.

## Remaining limits

Wikipedia availability, exact article-name matching and YouTube embedding depend on external services. A bundled fallback is not evidence of a successful live API request. This application does not provide registration, email subscription or a server-side archive. The existing illustration and historical text have been retained; historical statements and references need a separate check of the sources. Accessibility features have been checked but do not constitute a full WCAG audit.

## Validation completed

JavaScript syntax check and jsdom functional checks passed for tab/hash selection, arrow-key navigation, single visible panel, timeline filtering, mocked API success, displaying results as text, fallback labelling, preventing old search results from replacing newer ones, dialog open/close and return focus, nostalgia controls/reset, duplicate IDs, local asset paths and no-JavaScript reading content. API calls were mocked in these automated checks: they do not verify Wikipedia availability. The dialog’s keyboard behaviour, mobile appearance and print layout still need checking in a browser.

## Wording review

Page text, button messages and code comments have been shortened and made easier to read. Tutorial links are still included. Claims of full accessibility compliance have been removed because a full audit has not been completed.
