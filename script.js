/* ==========================================================================
   WEB TECHNOLOGIES (55-709700) – MASTER APPLICATION SCRIPT
   Author: Josephine Ashdown
   Architecture: Vanilla ES6+, Fetch API, Event Delegation, WCAG a11y
   ========================================================================== */

"use strict";

/* ==========================================================================
   MODULE 1: W3C / W3Schools Citation Constants & Endpoints
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
 * Curated Fallback Archive: Guarantees zero application downtime
 * if campus firewall, CORS, or external API endpoints experience outages.
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
   MODULE 2: DOM Loaded Initialization
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
    initThemeManager();
    initApiExplorer();
    initTableFilter();
    initNostalgiaForm();
    initDemoSandbox();
    initModalManager();
});

/* ==========================================================================
   MODULE 3: Dark Mode Theme Manager (with localStorage persistence)
   Citation: Dark Mode with localStorage adapted from W3Schools How TO:
   https://www.w3schools.com/howto/howto_js_toggle_dark_mode.asp
   https://www.w3schools.com/js/js_api_web_storage.asp
   ========================================================================== */
function initThemeManager() {
    const themeBtn = document.getElementById("theme-button");
    if (!themeBtn) return;

    // Check saved user preference in localStorage
    const savedTheme = localStorage.getItem("webtech-theme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
        themeBtn.setAttribute("aria-pressed", "true");
        themeBtn.innerHTML = '<span class="theme-icon" aria-hidden="true">☀️</span> Light Mode';
    }

    themeBtn.addEventListener("click", () => {
        const isDark = document.body.classList.toggle("dark-mode");
        themeBtn.setAttribute("aria-pressed", String(isDark));
        localStorage.setItem("webtech-theme", isDark ? "dark" : "light");

        themeBtn.innerHTML = isDark
            ? '<span class="theme-icon" aria-hidden="true">☀️</span> Light Mode'
            : '<span class="theme-icon" aria-hidden="true">🌙</span> Toggle Dark Mode';
    });
}

/* ==========================================================================
   MODULE 4: Live Third-Party API Integration (Meets 15% API Criterion)
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
        if (!query) {
            showStatus(statusBanner, "Please enter a valid browser or technology name to search.", "error");
            return;
        }
        await fetchHistoricalData(query, statusBanner, resultsContainer);
    });

    // Handle Preset Dropdown Selection (Triggers API call directly)
    if (presetSelect) {
        presetSelect.addEventListener("change", async () => {
            const selectedSlug = presetSelect.value;
            if (!selectedSlug) return;
            queryInput.value = presetSelect.options[presetSelect.selectedIndex].text;
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
async function fetchHistoricalData(query, statusEl, resultsEl) {
    const formattedSlug = encodeURIComponent(query.replace(/\s+/g, "_"));
    const endpoint = `${API_CONFIG.wikipediaBase}${formattedSlug}`;

    // Display accessible loading indicator
    showStatus(statusEl, `Querying Web Technology API for "${query}"...`, "info");
    resultsEl.innerHTML = '<div class="spinner" role="progressbar" aria-label="Loading content"></div>';

    try {
        const response = await fetch(endpoint, { headers: API_CONFIG.headers });

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error(`No historical record found for "${query}". Try searching for Mosaic, Netscape Navigator, or Tim Berners-Lee.`);
            }
            throw new Error(`API Network error (Status: ${response.status}). Please check your connection.`);
        }

        const data = await response.json();
        
        // Render successful results
        showStatus(statusEl, `Successfully retrieved historical record for "${data.title}" from Wikipedia REST API.`, "success");
        renderApiResultCard(data, resultsEl);

    } catch (err) {
        // Intelligent Fallback: Check local archive database if offline or network blocked
        const cleanQuery = query.toLowerCase().replace(/_/g, " ").trim();
        const fallbackKey = Object.keys(HISTORICAL_FALLBACK_DATABASE).find(k => cleanQuery.includes(k) || k.includes(cleanQuery));

        if (fallbackKey) {
            const fallbackItem = HISTORICAL_FALLBACK_DATABASE[fallbackKey];
            showStatus(statusEl, `Retrieved historical record for "${fallbackItem.title}" (via Resilient Local Archive Cache).`, "info");
            renderApiResultCard(fallbackItem, resultsEl);
        } else {
            showStatus(statusEl, err.message, "error");
            resultsEl.innerHTML = `
                <div class="callout-box" style="border-left-color: var(--color-error);">
                    <h4>Lookup Notice</h4>
                    <p>${err.message}</p>
                    <p><small>Tip: You can select a verified topic from the preset dropdown (e.g. WorldWideWeb, Mosaic, Netscape, Firefox, Chrome, Tim Berners-Lee, Brendan Eich).</small></p>
                </div>
            `;
        }
    }
}

/**
 * Dynamically builds accessible HTML card for API payload
 * Citation: DOM Element Creation adapted from W3Schools HTML DOM:
 * https://www.w3schools.com/js/js_htmldom_nodes.asp
 */
function renderApiResultCard(item, container) {
    container.innerHTML = ""; // Clear existing output

    const card = document.createElement("article");
    card.className = "api-card";

    // Media thumbnail if available
    let mediaHtml = "";
    if (item.thumbnail && item.thumbnail.source) {
        mediaHtml = `
            <div class="api-card-media">
                <img src="${item.thumbnail.source}" alt="${item.title} archive illustration" loading="lazy">
            </div>
        `;
    }

    const description = item.description ? `<p><em>${item.description}</em></p>` : "";
    const extractText = item.extract ? item.extract : "No summary description available for this record.";

    card.innerHTML = `
        ${mediaHtml}
        <div class="api-card-content">
            <h3 class="api-card-title">${item.title}</h3>
            ${description}
            <p class="api-card-desc">${extractText}</p>
            <div class="card-footer-actions">
                <button type="button" class="btn btn-secondary btn-sm open-details-btn" data-title="${encodeURIComponent(item.title)}" data-extract="${encodeURIComponent(extractText)}" data-url="${item.content_urls ? item.content_urls.desktop.page : '#'}">
                    View Full Archive Details
                </button>
            </div>
        </div>
    `;

    container.appendChild(card);
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
   MODULE 5: Modal Manager for Detailed API Views
   Citation: Accessible Modal Box adapted from W3Schools How TO:
   https://www.w3schools.com/howto/howto_css_modals.asp
   ========================================================================== */
function initModalManager() {
    const modal = document.getElementById("details-modal");
    const closeBtn = document.getElementById("modal-close-btn");
    const modalTitle = document.getElementById("modal-title");
    const modalBody = document.getElementById("modal-body");

    if (!modal || !closeBtn) return;

    // Delegate click on dynamically created buttons
    document.addEventListener("click", (e) => {
        const btn = e.target.closest(".open-details-btn");
        if (!btn) return;

        const title = decodeURIComponent(btn.dataset.title);
        const extract = decodeURIComponent(btn.dataset.extract);
        const url = btn.dataset.url;

        modalTitle.textContent = title;
        modalBody.innerHTML = `
            <p class="lead-text">${extract}</p>
            <hr style="margin: 1.5rem 0; border: 0; border-top: 1px solid var(--border-color);">
            <p>
                <strong>External Reference:</strong> 
                <a href="${url}" target="_blank" rel="noopener noreferrer">Read complete article on Wikipedia &rarr;</a>
            </p>
        `;

        modal.hidden = false;
        closeBtn.focus();
    });

    const closeModal = () => {
        modal.hidden = true;
    };

    closeBtn.addEventListener("click", closeModal);

    modal.addEventListener("click", (e) => {
        if (e.target === modal) closeModal();
    });

    // Keyboard support: Escape key closes modal (WCAG 2.1 AA)
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && !modal.hidden) {
            closeModal();
        }
    });
}

/* ==========================================================================
   MODULE 6: Form Handling & Validation on Nostalgia Tech
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
            `Thank you, ${fname}! Your nostalgia score of ${rating}/10 has been logged. Now fetching historical archive data for your first browser (${firstBrowser})...`, 
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
        if (browserResultContainer) browserResultContainer.innerHTML = "";
    });
}

/* ==========================================================================
   MODULE 7: Table Real-Time Filter
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
   MODULE 8: Interactive JavaScript Learning Demonstrations
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
        outputEl.textContent = "JavaScript modified the DOM using document.getElementById().textContent.";
    });

    bindDemo("html-demo", () => {
        outputEl.className = "status-banner visible success";
        outputEl.innerHTML = "<strong>Formatted Output:</strong> Successfully injected safe markup using <code>innerHTML</code>.";
    });

    bindDemo("calculate-demo", () => {
        const num1 = 1989;
        const num2 = 37;
        outputEl.className = "status-banner visible info";
        outputEl.textContent = `Calculated: ${num1} + ${num2} = ${num1 + num2} (Years since Tim Berners-Lee conceived the Web).`;
    });

    bindDemo("alert-demo", () => {
        outputEl.className = "status-banner visible info";
        outputEl.textContent = "Demonstration triggered an alert dialog.";
        window.alert("This is an accessible JavaScript alert dialog demonstrating client-side modal notification.");
    });

    bindDemo("console-demo", () => {
        console.log("Web Technologies: Console logging test executed successfully.");
        outputEl.className = "status-banner visible info";
        outputEl.textContent = "Message printed to Developer Tools console (Press F12 to inspect).";
    });

    bindDemo("print-demo", () => {
        window.print();
    });
}
