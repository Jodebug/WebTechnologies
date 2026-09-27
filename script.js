/*
 * Shared JavaScript for both Web Technologies pages.
 * Loaded with defer so the HTML exists before this script runs.
 * Each feature checks its elements: not every page has every feature.
 * Form data stays in the page. No information is submitted or stored.
 */
"use strict";

// 1. Theme: a stable label plus aria-pressed describes a toggle button.
const themeButton = document.getElementById("theme-button");
if (themeButton) {
    themeButton.addEventListener("click", function () {
        const darkModeOn = document.body.classList.toggle("dark-mode");
        themeButton.setAttribute("aria-pressed", String(darkModeOn));
    });
}

// 2. Filter existing table rows without changing the original data.
const browserFilter = document.getElementById("browser-filter");
if (browserFilter) {
    const browserRows = document.querySelectorAll("#timeline tbody tr");
    const filterStatus = document.getElementById("filter-status");
    browserFilter.addEventListener("input", function () {
        const searchTerm = browserFilter.value.trim().toLowerCase();
        let visibleCount = 0;
        browserRows.forEach(function (row) {
            const matches = row.textContent.toLowerCase().includes(searchTerm);
            row.hidden = !matches;
            if (matches) visibleCount += 1;
        });
        filterStatus.textContent = visibleCount + " of " + browserRows.length + " browsers shown.";
    });
}

// 3. Small output demonstrations. User input never goes into innerHTML.
const demoOutput = document.getElementById("demo-output");
if (demoOutput) {
    document.getElementById("text-demo").addEventListener("click", function () {
        demoOutput.textContent = "JavaScript found this paragraph and changed its content!";
    });
    document.getElementById("html-demo").addEventListener("click", function () {
        // This is fixed, trusted markup written by the developer.
        demoOutput.innerHTML = "<strong>This text is bold.</strong> innerHTML parses HTML markup.";
    });
    document.getElementById("calculate-demo").addEventListener("click", function () {
        let x, y, z;
        x = 5;
        y = 6;
        z = x + y;
        demoOutput.textContent = "5 + 6 = " + z;
    });
    document.getElementById("alert-demo").addEventListener("click", function () {
        window.alert("This is a JavaScript alert. Select OK to return to the page.");
    });
    document.getElementById("console-demo").addEventListener("click", function () {
        console.log("Hello from the Web Technologies learning page!");
        demoOutput.textContent = "Message sent. Open developer tools and select Console to read it.";
    });
    document.getElementById("print-demo").addEventListener("click", function () {
        window.print();
    });
}

// Expand learning notes for printing, then restore the reader's choices.
let closedNotes = [];
window.addEventListener("beforeprint", function () {
    closedNotes = Array.from(document.querySelectorAll("details:not([open])"));
    closedNotes.forEach(function (note) { note.open = true; });
});
window.addEventListener("afterprint", function () {
    closedNotes.forEach(function (note) { note.open = false; });
    closedNotes = [];
});

// 4. Newsletter demonstration: use native required/email validation.
const nostalgiaForm = document.getElementById("nostalgia-form");
if (nostalgiaForm) {
    const memoryInput = document.getElementById("memory");
    const memoryCount = document.getElementById("memory-count");
    const memoryHint = document.getElementById("memory-hint");
    const formStatus = document.getElementById("form-status");
    const memoryPrompts = [
        "What is the first website you remember visiting?",
        "What did dial-up internet sound like?",
        "Which browser did you first use at school or work?"
    ];
    let promptIndex = 0;

    memoryInput.addEventListener("input", function () {
        memoryCount.textContent = memoryInput.value.length + " / 500 characters";
    });
    document.getElementById("memory-prompt").addEventListener("click", function () {
        // Show inspiration alongside the field without overwriting a memory.
        memoryHint.textContent = memoryPrompts[promptIndex];
        promptIndex = (promptIndex + 1) % memoryPrompts.length;
        memoryInput.focus();
    });
    nostalgiaForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Demonstration only: never send a request.
        const firstName = document.getElementById("fname").value.trim();
        formStatus.textContent = "Thank you, " + firstName + ". This was a demonstration. Your information has not been sent or saved, and you have not subscribed.";
    });
    nostalgiaForm.addEventListener("reset", function () {
        memoryCount.textContent = "0 / 500 characters";
        memoryHint.textContent = "";
        formStatus.textContent = "";
        promptIndex = 0;
    });
    // Enable only after the submit prevention is installed.
    document.getElementById("form-fields").disabled = false;
}

// Reveal controls only after their handlers have been attached.
document.querySelectorAll("[data-js-controls]").forEach(function (control) {
    control.hidden = false;
});
