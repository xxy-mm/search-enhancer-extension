"use strict";
const mockSiteList = [
    { domain: "a.com", state: "exclude" },
    { domain: "b.com", state: "include" },
    { domain: "c.com", state: "none" },
];
function newSiteListItem(item) {
    const siteListItem = document.createElement("div");
    siteListItem.classList.add("site-list-item");
    siteListItem.innerText = item.domain;
    siteListItem.classList.add(item.state);
    siteListItem.onclick = function () {
        window.location.reload();
    };
    return siteListItem;
}
function createSiteList(sitelist) {
    const fragment = document.createDocumentFragment();
    sitelist.forEach((siteListItem) => {
        fragment.appendChild(newSiteListItem(siteListItem));
    });
    return fragment;
}
function injectCustomElement() {
    // Find the search dialog container
    const searchContainer = document.querySelector(".RNNXgb"); // Update selector as needed
    if (searchContainer) {
        // Create a new sibling element
        const customElement = document.createElement("div");
        customElement.style.cssText = `
        display: flex;
        flex-wrap: wrap;
        gap: 4px;
        justify-content: flex-start;
        align-content: start;
        font-size: 14px;
        padding: 8px;
        text-align: center;
      `;
        customElement.appendChild(createSiteList(mockSiteList));
        // Insert the new element as a sibling
        searchContainer.parentNode?.insertBefore(customElement, searchContainer.nextSibling);
    }
}
// Check if DOM is already loaded
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", injectCustomElement);
}
else {
    injectCustomElement();
}
