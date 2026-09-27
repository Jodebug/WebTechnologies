# Web Technologies — clean HTML, CSS and JavaScript

## Open the website
1. Extract this ZIP into a folder before opening any files.
2. Open that folder in VS Code.
3. Open index.html in your browser, or use VS Code Live Server.
No build step or JavaScript download is required. The embedded YouTube video needs an internet connection.

## Which file do I edit?
- index.html: your existing history, timeline, video, image and references, plus JavaScript learning notes.
- nostalgia-tech.html: your existing newsletter demonstration and form controls.
- style.css: all styling for both pages, including mobile, dark mode and printing.
- script.js: shared behaviour, organised into numbered, commented sections.
- web-technologies.css: compatibility import for older links. All actual styles are in style.css.
- Image1.png: your original image, unchanged.

Both HTML pages now explicitly load style.css and script.js. Previously both loaded web-technologies.css, so editing style.css had no effect on them.

## What changed?
Preserved the original history text, timeline rows, references, video and image. Kept the beige background, dark header and white content cards. Five section links occupy one line; the two page/learning links are separate. If enlarged text cannot fit, the navigation scrolls horizontally rather than forcing the page wider.

Added a browser/year/developer filter; a dark-mode toggle; expandable learning notes; demonstrations of textContent, trusted innerHTML, calculation, alert, console output and printing. JavaScript notes cover all supplied topics, with corrections to terminology. Dark mode resets on navigation or refresh; this simple example does not persist preferences.

Replaced inline form handlers with addEventListener in script.js. The form remains a demo: no server, storage or actual subscription. Native validation checks required fields and email format. Memory prompts rotate through an array and never overwrite the user's writing. The counter and messages reset with the form. Without JavaScript the form is disabled to prevent accidental submission.

## Documentation conventions
HTML comments explain page structure. CSS sections explain groups of styles. JavaScript comments describe intent, safety choices and event timing. Variables use camelCase; const is the default, with let for reassignment. User input is displayed with textContent. Only a developer-written literal is passed to innerHTML.

## Try it yourself
- Use Tab and Enter to operate links and buttons; check the skip link.
- Resize the page to a phone width and confirm the five links stay together.
- Search for Mosaic, 1995, an unknown value, then clear the filter.
- Try all output buttons; console messages appear in developer tools.
- Print: all learning topics should expand for printing and return to their previous state afterwards.
- Submit an empty form, then an invalid email, then complete the required fields.
- Type a memory, show a prompt, then clear the form.

## Publish manually
Back up the old files, then upload these files to the root of your existing GitHub repository, keeping filenames and capitalisation unchanged. This package has not changed your repository or live GitHub Pages site.

## Verification performed
JavaScript passed node --check. Both HTML pages passed checks for unique IDs, local asset paths, section links and removal of inline event handlers. Automated browser rendering could not run because a browser executable was unavailable and its download failed. Mobile appearance and interactive behaviour therefore still need the manual checks above.
