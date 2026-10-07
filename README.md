# Web Technologies

A student web application exploring browser history, web standards and early internet memories. Built with HTML, mobile-first CSS and vanilla JavaScript.

## Open and edit

Extract the whole folder, then open `index.html` in a browser. Keep the files together so relative links and the image work. In VS Code, open the folder and use Live Server if you want automatic refresh. No build, package installation or API key is required. Wikipedia and YouTube need an internet connection; bundled summaries are available for selected topics when the API cannot be reached.

## Files

- `index.html`: six tabs with browser history, a Wikipedia search, a timeline, media, JavaScript examples and references.
- `nostalgia-tech.html`: demonstration form; choosing a browser starts a Wikipedia search. Personal details and memories are not transmitted or saved.
- `style.css`: main stylesheet. Edit this file for appearance changes.
- `script.js`: tab navigation, API requests, dialogs, theme, filtering and forms.
- `Image1.png`: existing illustration.
- `web-technologies.css` and `sytle.css`: compatibility stylesheets pointing to `style.css`.
- `citations.txt`: existing tutorial references.
- `REVIEW.md`: changes, review notes and checks still to do.

## Behaviour

Tabs support Left/Right arrows, Home/End, Enter and Space. Existing hashes such as `#explorer` select the correct panel, including browser Back/Forward. With JavaScript disabled, reading sections remain visible. Printing includes all main sections.

API results are displayed as text rather than HTML. Requests have a ten-second timeout and only the latest search result is shown. Saved summaries are labelled when the live search is unavailable. A native dialog supports Escape, keeping keyboard focus inside it and returning focus to the button when closed.

## GitHub Pages

Replace the corresponding files in the repository, keeping their filenames and relative paths. GitHub Pages must serve the branch containing the changes. A review branch or pull request does not update the live site until merged into the published branch.

## Coursework

Review and understand the code, explain your own changes, and follow your module's AI-use rules. Tutorial references identify learning resources; they do not establish an assessment grade or full accessibility compliance.
