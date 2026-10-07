# Web Technologies (55-709700) – Web Application Project

* **Student Name:** Josephine Ashdown
* **Module Code:** 55-709700-BF-20267
* **Module Leader:** Dr Junghun Yoo
* **Academic Level:** Level 7 (MSc / Postgraduate)
* **Submission Date:** 20 October 2026

---

## 1. Project Overview & Domain

This application is an accessible, responsive, and interactive digital archive exploring the **History of Web Browsers, Open Web Standards, and Nostalgia Tech**. 

It demonstrates the core front-end web development principles taught across Weeks 1 to 7:
* **HTML5 Semantic Architecture:** Rich document hierarchy using modern tags (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<time>`, `<figure>`, `<footer>`).
* **Mobile-First CSS:** Custom external stylesheet with progressive enhancement using `min-width` media queries, CSS custom properties (variables), modern Flexbox & Grid layouts, and advanced attribute/pseudo-class selectors.
* **HTML Forms & Validation:** Diverse form controls (`search`, `select`, `range`, `number`, `datalist`, `radio`, `checkbox`, `textarea`) with native HTML5 constraint validation.
* **Third-Party REST API Integration:** Asynchronous communication (`fetch` with `async/await`) consuming the live Wikipedia REST API across multiple query patterns to dynamically render tech summaries, images, and modal views without page reload.
* **Accessibility (WCAG 2.1 AA):** High contrast ratios, accessible skip link, ARIA live status regions, keyboard focus management, and screen-reader considerations.

---

## 2. File & Directory Structure

```
WebTechnologies/
├── index.html            # Main application interface: History, API Explorer & Timeline
├── nostalgia-tech.html   # Community archive & advanced HTML form interface
├── style.css             # Master mobile-first external stylesheet
├── script.js             # Modular vanilla JavaScript (API layer, DOM, validation)
├── Image1.png            # Web technologies architectural illustration
├── README.md             # Project documentation & grading rubric alignment
└── citations.txt         # Complete academic reference citations
```

---

## 3. Rubric Alignment (Distinction Standards: 70% – 100%)

| Criterion | Weight | How This Project Meets Distinction |
| :--- | :---: | :--- |
| **HTML Quality** | **20%** | Built with zero deprecated tags, fully valid HTML5 semantic layout (`<article>`, `<aside>`, `<time>`, `<figure>`, `<mark>`), accessible headings, and valid metadata. |
| **CSS Quality** | **20%** | Strict **Mobile-First** approach using `min-width: 768px` and `min-width: 1024px`, CSS variables, advanced attribute selectors (`[type="search"]`, `[aria-current]`), and pseudo-classes (`:focus-visible`, `:hover`, `:nth-child`). |
| **Use of HTML Forms** | **15%** | Extensive variety of controls (`text`, `email`, `search`, `range`, `number`, `select`, `datalist`, `radio`, `checkbox`, `textarea`) with native validation constraints. Form inputs directly drive API queries. |
| **JavaScript Quality** | **15%** | 100% external modular JS (`script.js`), error-free execution, `async/await` Fetch API, accessible modal dialog, dark mode persistence (`localStorage`), and dynamic DOM creation. |
| **Use of API** | **15%** | Connects to the Wikipedia REST API (`https://en.wikipedia.org/api/rest_v1/page/summary/`). Uses both form search inputs and preset dropdown selection to dynamically fetch and display card data and extended modal information. |
| **UI / UX & Accessibility** | **15%** | Professional color scheme (Navy Blue `#1d1a45`, Accent Red `#f33535`), contrast ratio $\ge 4.5:1$, visible focus rings, ARIA live status feedback, and responsive layout across mobile, tablet, and desktop. |

---

## 4. Live Deployment Instructions (GitHub Pages)

To publish this project live as required for submission:
1. Push all updated files to your GitHub repository: `https://github.com/Jodebug/WebTechnologies`
2. In your GitHub repository, navigate to **Settings > Pages**.
3. Under **Build and deployment > Branch**, select `main` and `/ (root)`, then click **Save**.
4. GitHub Pages will generate your public live URL:  
   `https://jodebug.github.io/WebTechnologies/`

---

## 5. Academic Integrity & W3Schools Tutorial Citations

Every major design pattern, algorithm, and layout structure in this project has been adapted from official educational resources and documented with in-code citations:

1. **HTML5 Semantic Elements:**  
   Adapted from *W3Schools HTML5 Semantic Elements*  
   https://www.w3schools.com/html/html5_semantic_elements.asp
2. **Mobile-First CSS & Media Queries:**  
   Adapted from *W3Schools CSS Responsive Web Design*  
   https://www.w3schools.com/css/css_rwd_mediaqueries.asp
3. **HTML Forms & Constraint Validation:**  
   Adapted from *W3Schools HTML Forms & Input Types*  
   https://www.w3schools.com/html/html_forms.asp
4. **Fetch API & Asynchronous JavaScript:**  
   Adapted from *W3Schools JavaScript Fetch API*  
   https://www.w3schools.com/js/js_api_fetch.asp
5. **DOM Manipulation & Nodes:**  
   Adapted from *W3Schools JavaScript HTML DOM Nodes*  
   https://www.w3schools.com/js/js_htmldom_nodes.asp
6. **Web Accessibility Guidelines (WCAG):**  
   Adapted from *W3Schools Web Accessibility Reference*  
   https://www.w3schools.com/accessibility/
