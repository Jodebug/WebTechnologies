/* ==========================================================================
   Web Technologies: JavaScript
   Author: Josephine Ashdown
   Tabs, theme, searches and form examples
   ========================================================================== */

"use strict";

/* ==========================================================================
   1. API settings and saved summaries
   Citation: Fetch API pattern adapted from W3Schools JS Fetch API:
   https://www.w3schools.com/js/js_api_fetch.asp
   ========================================================================== */
const API_CONFIG = {
    wikipediaBase: "https://en.wikipedia.org/api/rest_v1/page/summary/",
    headers: {
        "Accept": "application/json"
    }
};

/**
 * Bundled summaries for selected topics when a live lookup is unavailable.
 */
const HISTORICAL_FALLBACK_DATABASE = {
    "worldwideweb": {
        title: "WorldWideWeb",
        description: "First web browser and WYSIWYG HTML editor",
        extract: "WorldWideWeb was the first web browser and WYSIWYG hypertext editor. Developed by Sir Tim Berners-Lee on a NeXT computer in late 1990 at CERN, it laid the foundation for the global World Wide Web.",
        thumbnail: { source: "Image1.png" },
        content_urls: { desktop: { page: "https://en.wikipedia.org/wiki/WorldWideWeb" } }
    },
    "mosaic": {
        title: "NCSA Mosaic",
        description: "First popular graphical web browser",
        extract: "NCSA Mosaic was a pioneering graphical web browser developed in 1993 by Marc Andreessen and Eric Bina at the National Center for Supercomputing Applications. It popularized the Web by rendering images alongside text.",
        thumbnail: { source: "Image1.png" },
        content_urls: { desktop: { page: "https://en.wikipedia.org/wiki/Mosaic_(web_browser)" } }
    },
    "netscape": {
        title: "Netscape Navigator",
        description: "Leading 1990s commercial web browser",
        extract: "Netscape Navigator was released in 1994 by Netscape Communications. It introduced cookies, progressive rendering, and JavaScript (created by Brendan Eich in 1995), dominating early web usage during the browser wars.",
        thumbnail: { source: "Image1.png" },
        content_urls: { desktop: { page: "https://en.wikipedia.org/wiki/Netscape_Navigator" } }
    },
    "internet explorer": {
        title: "Internet Explorer",
        description: "Microsoft's bundled web browser",
        extract: "Internet Explorer was first released in 1995 as part of the Microsoft Plus! add-on for Windows 95. It was bundled with Windows, becoming the dominant browser during the late 1990s and 2000s.",
        thumbnail: { source: "Image1.png" },
        content_urls: { desktop: { page: "https://en.wikipedia.org/wiki/Internet_Explorer" } }
    },
    "firefox": {
        title: "Mozilla Firefox",
        description: "Open-source standards-compliant web browser",
        extract: "Mozilla Firefox was created in 2004 by the Mozilla Foundation. Created as an open-source alternative to Internet Explorer, Firefox championed tabbed browsing, web extensions, and open W3C web standards.",
        thumbnail: { source: "Image1.png" },
        content_urls: { desktop: { page: "https://en.wikipedia.org/wiki/Firefox" } }
    },
    "chrome": {
        title: "Google Chrome",
        description: "Modern multiprocess web browser",
        extract: "Google Chrome was launched in 2008, introducing the high-performance V8 JavaScript engine and multiprocess tab sandboxing. It has since become the most widely used web browser globally.",
        thumbnail: { source: "Image1.png" },
        content_urls: { desktop: { page: "https://en.wikipedia.org/wiki/Google_Chrome" } }
    },
    "tim berners-lee": {
        title: "Tim Berners-Lee",
        description: "Inventor of the World Wide Web",
        extract: "Sir Tim Berners-Lee is an English computer scientist who invented the World Wide Web in 1989. He developed HTTP, HTML, the first web browser, and the first web server while working at CERN.",
        thumbnail: { source: "Image1.png" },
        content_urls: { desktop: { page: "https://en.wikipedia.org/wiki/Tim_Berners-Lee" } }
    },
    "brendan eich": {
        title: "Brendan Eich",
        description: "Creator of the JavaScript programming language",
        extract: "Brendan Eich is an American technologist who created JavaScript in 1995 while working at Netscape Communications. He later co-founded the Mozilla project and Brave Software.",
        thumbnail: { source: "Image1.png" },
        content_urls: { desktop: { page: "https://en.wikipedia.org/wiki/Brendan_Eich" } }
    },
    "javascript": {
        title: "JavaScript",
        description: "Core programming language of the Web",
        extract: "JavaScript is a high-level, dynamic programming language standardized by ECMA International. Alongside HTML and CSS, it is one of the core technologies of the World Wide Web, powering interactive web applications.",
        thumbnail: { source: "Image1.png" },
        content_urls: { desktop: { page: "https://en.wikipedia.org/wiki/JavaScript" } }
    },
    "css": {
        title: "Cascading Style Sheets",
        description: "Style sheet language for web presentation",
        extract: "Cascading Style Sheets (CSS) is a style sheet language used for describing the presentation of a document written in HTML. First proposed by Håkon Wium Lie in 1994, it enables responsive and mobile-first layouts.",
        thumbnail: { source: "Image1.png" },
        content_urls: { desktop: { page: "https://en.wikipedia.org/wiki/CSS" } }
    }
};

/* ==========================================================================
   2. Set up the page when it has loaded
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
    initTabs();
    initThemeManager();
    initApiExplorer();
    initTableFilter();
    initNostalgiaForm();
    initDemoSandbox();
    initModalManager();
});

/* ==========================================================================
   3. Dark mode and saved theme preference
   Citation: Dark Mode with localStorage adapted from W3Schools How TO:
   https://www.w3schools.com/howto/howto_js_toggle_dark_mode.asp
   https://www.w3schools.com/js/js_api_web_storage.asp
   ========================================================================== */
function initThemeManager() {
    const themeBtn = document.getElementById("theme-button");
    if (!themeBtn) return;

    // Check saved user preference in localStorage
    let savedTheme;
    try { savedTheme = localStorage.getItem("webtech-theme"); } catch { /* Storage may be disabled. */ }
    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
        themeBtn.setAttribute("aria-pressed", "true");
        themeBtn.innerHTML = '<span class="theme-icon" aria-hidden="true">☀️</span> Light Mode';
    }

    themeBtn.addEventListener("click", () => {
        const isDark = document.body.classList.toggle("dark-mode");
        themeBtn.setAttribute("aria-pressed", String(isDark));
        try { localStorage.setItem("webtech-theme", isDark ? "dark" : "light"); } catch { /* Theme still works without storage. */ }

        themeBtn.innerHTML = isDark
            ? '<span class="theme-icon" aria-hidden="true">☀️</span> Light Mode'
            : '<span class="theme-icon" aria-hidden="true">🌙</span> Toggle Dark Mode';
    });
}

/* ==========================================================================
   4. Wikipedia search
   Citation: Async/Await Fetch API pattern adapted from W3Schools JS Async:
   https://www.w3schools.com/js/js_async.asp
   https://www.w3schools.com/js/js_api_fetch.asp
   ========================================================================== */
function initApiExplorer() {
    const searchForm = document.getElementById("api-search-form");
    const queryInput = document.getElementById("tech-search-input");
    const presetSelect = document.getElementById("preset-select");
    const statusBanner = document.getElementById("api-status");
    const resultsContainer = document.getElementById("api-results-container");

    if (!searchForm || !queryInput || !resultsContainer) return;

    // Handle Form Submit Event
    searchForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const query = queryInput.value.trim();
        if (query.length < 2) {
            showStatus(statusBanner, "Please enter at least two characters to search.", "error");
            return;
        }
        await fetchHistoricalData(query, statusBanner, resultsContainer);
    });

    // Handle Preset Dropdown Selection (Triggers API call directly)
    if (presetSelect) {
        presetSelect.addEventListener("change", async () => {
            const selectedSlug = presetSelect.value;
            if (!selectedSlug) return;
            queryInput.value = selectedSlug.replace(/_/g, " ");
            await fetchHistoricalData(selectedSlug, statusBanner, resultsContainer);
        });
    }
}

/**
 * Executes asynchronous REST API request using standard Fetch API
 * @param {string} query - The search term or Wikipedia title slug
 * @param {HTMLElement} statusEl - Banner element for accessible status updates
 * @param {HTMLElement} resultsEl - Container for rendering dynamic cards
 */
// Each result area owns its request so an older response cannot replace a newer one.
const activeRequests = new WeakMap();
const TOPIC_ALIASES = {
    "ncsa mosaic": "Mosaic_(web_browser)", "mosaic": "Mosaic_(web_browser)",
    "mozilla firefox": "Firefox", "firefox": "Firefox", "css": "CSS",
    "cascading style sheets": "CSS", "safari": "Safari_(web_browser)",
    "opera": "Opera_(web_browser)"
};
async function fetchHistoricalData(query, statusEl, resultsEl) {
    if (!resultsEl) return;
    activeRequests.get(resultsEl)?.abort();
    const controller = new AbortController();
    activeRequests.set(resultsEl, controller);
    const timeout = setTimeout(() => controller.abort(), 10000);
    const cleanQuery = query.toLowerCase().replace(/_/g, " ").trim();
    const title = TOPIC_ALIASES[cleanQuery] || query.replace(/\s+/g, "_");
    showStatus(statusEl, `Looking up “${query}”…`, "info");
    resultsEl.replaceChildren();
    resultsEl.setAttribute("aria-busy", "true");
    try {
        const response = await fetch(API_CONFIG.wikipediaBase + encodeURIComponent(title), {
            headers: API_CONFIG.headers, signal: controller.signal
        });
        if (!response.ok) throw new Error(response.status === 404 ? "Topic not found. Try a featured topic or the full article name." : "Wikipedia is unavailable. Please try again.");
        const data = await response.json();
        if (!data.title || data.type === "disambiguation") throw new Error("Please use a more specific topic name.");
        if (activeRequests.get(resultsEl) !== controller) return;
        showStatus(statusEl, `Live Wikipedia result: ${data.title}.`, "success");
        renderApiResultCard(data, resultsEl);
    } catch (error) {
        if (activeRequests.get(resultsEl) !== controller) return;
        const fallback = Object.entries(HISTORICAL_FALLBACK_DATABASE).find(([key, item]) =>
            cleanQuery === key || cleanQuery === item.title.toLowerCase() ||
            title === item.content_urls.desktop.page.split("/wiki/")[1]);
        if (fallback) {
            showStatus(statusEl, "Live lookup unavailable. Showing a bundled summary; this is not a live API result.", "info");
            renderApiResultCard(fallback[1], resultsEl);
        } else {
            showStatus(statusEl, error.name === "AbortError" ? "The lookup timed out. Please try again." : error.message, "error");
        }
    } finally {
        clearTimeout(timeout);
        if (activeRequests.get(resultsEl) === controller) resultsEl.setAttribute("aria-busy", "false");
    }
}

// External content is inserted as text, never interpreted as HTML.
function safeWikipediaUrl(value) {
    try {
        const url = new URL(value);
        if (url.protocol === "https:" && url.hostname === "en.wikipedia.org") return url.href;
    } catch { /* Ignore malformed external URLs. */ }
    return null;
}
function renderApiResultCard(item, container) {
    const card = document.createElement("article");
    card.className = "api-card";
    const content = document.createElement("div");
    content.className = "api-card-content";
    const heading = document.createElement("h3");
    heading.className = "api-card-title";
    heading.textContent = item.title;
    const description = document.createElement("p");
    description.textContent = item.description || "Historical overview";
    const extract = document.createElement("p");
    extract.textContent = item.extract || "No summary is available.";
    const url = safeWikipediaUrl(item.content_urls?.desktop?.page);
    content.append(heading, description, extract);
    if (url) {
        const link = document.createElement("a");
        link.href = url;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.textContent = "Read the article on Wikipedia (new tab)";
        content.append(link);
    }
    const button = document.createElement("button");
    button.type = "button";
    button.className = "btn btn-secondary open-details-btn";
    button.textContent = "View details";
    button.dataset.title = item.title;
    button.dataset.extract = extract.textContent;
    button.dataset.url = url || "";
    content.append(button);
    card.append(content);
    container.replaceChildren(card);
}

/**
 * Displays status message with appropriate styling and ARIA notification
 */
function showStatus(element, message, type) {
    if (!element) return;
    element.className = `status-banner visible ${type}`;
    element.textContent = message;
}

/* ==========================================================================
   5. Open and close the details dialog
   Citation: Accessible Modal Box adapted from W3Schools How TO:
   https://www.w3schools.com/howto/howto_css_modals.asp
   ========================================================================== */
function initModalManager() {
    const modal = document.getElementById("details-modal");
    if (!modal) return;
    let opener;
    document.addEventListener("click", (event) => {
        const button = event.target.closest(".open-details-btn");
        if (!button) return;
        opener = button;
        document.getElementById("modal-title").textContent = button.dataset.title;
        const body = document.getElementById("modal-body");
        const text = document.createElement("p");
        text.textContent = button.dataset.extract;
        body.replaceChildren(text);
        const url = safeWikipediaUrl(button.dataset.url);
        if (url) {
            const link = document.createElement("a");
            link.href = url;
            link.target = "_blank";
            link.rel = "noopener noreferrer";
            link.textContent = "Read on Wikipedia (new tab)";
            body.append(link);
        }
        modal.showModal();
    });
    document.getElementById("modal-close-btn").addEventListener("click", () => modal.close());
    modal.addEventListener("close", () => opener?.focus());
    modal.addEventListener("click", (event) => {
        if (event.target === modal) modal.close();
    });
}

/* ==========================================================================
   6. Nostalgia form
   Citation: Form Validation adapted from W3Schools HTML Form Validation:
   https://www.w3schools.com/js/js_validation.asp
   ========================================================================== */
function initNostalgiaForm() {
    const form = document.getElementById("nostalgia-form");
    if (!form) return;

    const ratingSlider = document.getElementById("nostalgia-rating");
    const ratingOutput = document.getElementById("rating-output");
    const memoryText = document.getElementById("memory-text");
    const charCount = document.getElementById("char-count");
    const promptBtn = document.getElementById("memory-prompt-btn");
    const memoryHint = document.getElementById("memory-hint");
    const feedbackBanner = document.getElementById("form-feedback");
    const browserResultContainer = document.getElementById("browser-historical-card");

    // Real-time Slider Value Output
    if (ratingSlider && ratingOutput) {
        ratingSlider.addEventListener("input", () => {
            ratingOutput.textContent = `${ratingSlider.value} / 10`;
        });
    }

    // Real-time Textarea Character Counter
    if (memoryText && charCount) {
        memoryText.addEventListener("input", () => {
            const current = memoryText.value.length;
            charCount.textContent = `${current} / 500 characters`;
            charCount.style.color = current > 450 ? "var(--color-warning)" : "var(--text-muted)";
        });
    }

    // Interactive Memory Prompts
    const prompts = [
        "What was the very first website you remember exploring?",
        "How would you describe the sound of dial-up connecting in your household?",
        "Which computer operating system did you first browse on (Windows 95, Mac OS 8)?",
        "Did you ever create your own personal homepage using GeoCities or Angelfire?"
    ];
    let promptIndex = 0;

    if (promptBtn && memoryHint) {
        promptBtn.addEventListener("click", () => {
            memoryHint.textContent = `💡 Prompt: ${prompts[promptIndex]}`;
            promptIndex = (promptIndex + 1) % prompts.length;
            memoryText.focus();
        });
    }

    // Form Submit Event Handling
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        // Native HTML5 Constraint Validation Check
        if (!form.checkValidity()) {
            form.reportValidity();
            showStatus(feedbackBanner, "Please complete all required fields indicated with an asterisk (*).", "error");
            return;
        }

        const fname = document.getElementById("fname").value.trim();
        const firstBrowser = document.getElementById("browser-select").value;
        const rating = ratingSlider ? ratingSlider.value : "N/A";

        showStatus(
            feedbackBanner, 
            `Thank you, ${fname}! Your score is ${rating}/10. Your form details have not been saved or sent. Looking up your first browser (${firstBrowser})…`, 
            "success"
        );

        // Connect user's form selection to live API query
        if (firstBrowser && firstBrowser !== "other") {
            await fetchHistoricalData(firstBrowser, feedbackBanner, browserResultContainer);
        }
    });

    // Form Reset Event
    form.addEventListener("reset", () => {
        if (ratingOutput) ratingOutput.textContent = "7 / 10";
        if (charCount) charCount.textContent = "0 / 500 characters";
        if (memoryHint) memoryHint.textContent = "";
        if (feedbackBanner) feedbackBanner.className = "status-banner";
        if (browserResultContainer) {
            activeRequests.get(browserResultContainer)?.abort();
            activeRequests.delete(browserResultContainer);
            browserResultContainer.replaceChildren();
            browserResultContainer.setAttribute("aria-busy", "false");
        }
    });
}

/* ==========================================================================
   7. Filter the browser table
   Citation: Table Search Filter adapted from W3Schools How TO - Filter Table:
   https://www.w3schools.com/howto/howto_js_filter_table.asp
   ========================================================================== */
function initTableFilter() {
    const filterInput = document.getElementById("browser-filter");
    const statusMsg = document.getElementById("filter-status");
    const tableRows = document.querySelectorAll(".styled-table tbody tr");

    if (!filterInput || tableRows.length === 0) return;

    filterInput.addEventListener("input", () => {
        const query = filterInput.value.trim().toLowerCase();
        let matches = 0;

        tableRows.forEach((row) => {
            const text = row.textContent.toLowerCase();
            const isMatch = text.includes(query);
            row.style.display = isMatch ? "" : "none";
            if (isMatch) matches++;
        });

        if (statusMsg) {
            statusMsg.textContent = `${matches} of ${tableRows.length} milestone records displayed.`;
        }
    });
}

/* ==========================================================================
   8. JavaScript examples
   Citation: JS DOM Demonstrations adapted from W3Schools JS Output:
   https://www.w3schools.com/js/js_output.asp
   ========================================================================== */
function initDemoSandbox() {
    const outputEl = document.getElementById("demo-output");
    if (!outputEl) return;

    const bindDemo = (id, callback) => {
        const el = document.getElementById(id);
        if (el) el.addEventListener("click", callback);
    };

    bindDemo("text-demo", () => {
        outputEl.className = "status-banner visible info";
        outputEl.textContent = "This text was changed using JavaScript and textContent.";
    });

    bindDemo("html-demo", () => {
        outputEl.className = "status-banner visible success";
        outputEl.innerHTML = "<strong>This text is bold.</strong> The example uses <code>innerHTML</code> to add HTML written in the script.";
    });

    bindDemo("calculate-demo", () => {
        const num1 = 1989;
        const num2 = 37;
        outputEl.className = "status-banner visible info";
        outputEl.textContent = `Calculated: ${num1} + ${num2} = ${num1 + num2} (Years since Tim Berners-Lee conceived the Web).`;
    });

    bindDemo("alert-demo", () => {
        outputEl.className = "status-banner visible info";
        outputEl.textContent = "An alert has been opened.";
        window.alert("Hello! This message was opened using window.alert().");
    });

    bindDemo("console-demo", () => {
        console.log("Hello from the Web Technologies page!");
        outputEl.className = "status-banner visible info";
        outputEl.textContent = "Open your browser’s developer tools and select Console to see the message.";
    });

    bindDemo("print-demo", () => {
        window.print();
    });
}

/* Tab navigation enhances ordinary links; all sections stay readable without JS.
   Pattern reference: https://www.w3.org/WAI/ARIA/apg/patterns/tabs/ */
function initTabs() {
    const list = document.querySelector("[data-tabs]");
    if (!list) return;
    const tabs = [...list.querySelectorAll('a[href^="#"]')];
    const panels = tabs.map(tab => document.querySelector(tab.getAttribute("href")));
    list.setAttribute("role", "tablist");
    list.setAttribute("aria-label", "Explore web technologies");
    tabs.forEach((tab, index) => {
        tab.id = "tab-" + panels[index].id;
        tab.setAttribute("role", "tab");
        tab.setAttribute("aria-controls", panels[index].id);
        panels[index].setAttribute("role", "tabpanel");
        panels[index].setAttribute("aria-labelledby", tab.id);
        panels[index].tabIndex = 0;
        tab.addEventListener("click", event => {
            event.preventDefault();
            if (location.hash !== tab.hash) location.hash = tab.hash;
            activate(index);
        });
        tab.addEventListener("keydown", event => {
            let next;
            if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
            if (event.key === "ArrowLeft") next = (index + tabs.length - 1) % tabs.length;
            if (event.key === "Home") next = 0;
            if (event.key === "End") next = tabs.length - 1;
            if (event.key === " ") { event.preventDefault(); tab.click(); return; }
            if (next !== undefined) {
                event.preventDefault();
                tabs[next].focus();
                tabs[next].click();
            }
        });
    });
    function activate(index) {
        tabs.forEach((tab, i) => {
            tab.setAttribute("aria-selected", String(i === index));
            tab.tabIndex = i === index ? 0 : -1;
            panels[i].hidden = i !== index;
        });
    }
    function followHash() {
        const index = panels.findIndex(panel => "#" + panel.id === location.hash);
        if (index >= 0) activate(index);
        else if (!location.hash) activate(0);
    }
    activate(0);
    followHash();
    window.addEventListener("hashchange", followHash);
}
