function hideRussianVideos(selectors, title_selectors, shorts_selector, shorts_title_attribute, parent_selector) {
    const videoElements = document.querySelectorAll(selectors);
    videoElements.forEach(video => {
        const titleElement = video.querySelector(title_selectors);
        if (titleElement && /[\u0400-\u04FF]/.test(titleElement.textContent)) {
            video.style.display = 'none';
        }
    });

    const shortsElements = document.querySelectorAll(shorts_selector);
    shortsElements.forEach(short => {
        const title = short.getAttribute(shorts_title_attribute);
        const parentElement = short.closest(parent_selector);
        if (title && /[\u0400-\u04FF]/.test(title) && parentElement) {
            parentElement.style.display = 'none';
        }
    });
}

const selectors = 'ytd-rich-item-renderer';
const title_selectors = '#video-title';
const shorts_selector = 'a.shortsLockupViewModelHostEndpoint';
const shorts_title_attribute = 'title';
const parent_selector = 'ytd-rich-item-renderer';

hideRussianVideos(selectors, title_selectors, shorts_selector, shorts_title_attribute, parent_selector);

const observer = new MutationObserver(() => {
    hideRussianVideos(selectors, title_selectors, shorts_selector, shorts_title_attribute, parent_selector);
});
observer.observe(document.body, { childList: true, subtree: true });
