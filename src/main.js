function hideVideosByLanguage(selectors, titleSelectors, shortsSelector,
    shortsTitleAttribute, parentSelector, langRange, shortsPanelSelector) {
    const regex = new RegExp(langRange);

    function isAlreadyHidden(element, hiddenSelector) {
        return element.closest(hiddenSelector)?.style.display === 'none';
    }

    const videoElements = document.querySelectorAll(selectors);
    videoElements.forEach(video => {
        if (!isAlreadyHidden(video, parentSelector)) {
            const titleElement = video.querySelector(titleSelectors);
            if (titleElement && regex.test(titleElement.textContent)) {
                video.style.display = 'none';
            }
        }
    });

    const shortsElements = document.querySelectorAll(shortsSelector);
    shortsElements.forEach(short => {
        if (!isAlreadyHidden(short.closest(parentSelector), shortsPanelSelector)) {
            const title = short.getAttribute(shortsTitleAttribute);
            const parentElement = short.closest(parentSelector);
            if (title && regex.test(title) && parentElement) {
                parentElement.style.display = 'none';
            }
        }
    });

    const shortsPanels = document.querySelectorAll(shortsPanelSelector);
    shortsPanels.forEach(section => {
        const videos = section.querySelectorAll(selectors);
        const hiddenVideos = section.querySelectorAll(`${selectors}[style*="display: none"]`);
        if (videos.length === hiddenVideos.length) {
            section.style.display = 'none';
        }
    });
}

const selectors = 'ytd-rich-item-renderer';
const titleSelectors = '#video-title';
const shortsSelector = 'a.shortsLockupViewModelHostEndpoint';
const shortsTitleAttribute = 'title';
const parentSelector = 'ytd-rich-item-renderer';
const langRange = '[\\u0400-\\u04FF]';
const shortsPanelSelector = 'ytd-rich-section-renderer';

hideVideosByLanguage(selectors, titleSelectors, shortsSelector,
                     shortsTitleAttribute, parentSelector, langRange, shortsPanelSelector);

const observer = new MutationObserver(() => {
    hideVideosByLanguage(selectors, titleSelectors, shortsSelector,
                         shortsTitleAttribute, parentSelector, langRange, shortsPanelSelector);
});
observer.observe(document.body, { childList: true, subtree: true });
