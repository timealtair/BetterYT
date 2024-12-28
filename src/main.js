function hideVideosByLanguage(selectors, titleSelectors, shortsSelector,
                              shortsSelector, parentSelector, langRange) {
    const regex = new RegExp(langRange);

    const videoElements = document.querySelectorAll(selectors);
    videoElements.forEach(video => {
        const titleElement = video.querySelector(titleSelectors);
        if (titleElement && regex.test(titleElement.textContent)) {
            video.style.display = 'none';
        }
    });

    const shortsElements = document.querySelectorAll(shortsSelector);
    shortsElements.forEach(short => {
        const title = short.getAttribute(shortsSelector);
        const parentElement = short.closest(parentSelector);
        if (title && regex.test(title) && parentElement) {
            parentElement.style.display = 'none';
        }
    });
}

const selectors = 'ytd-rich-item-renderer';
const titleSelectors = '#video-title';
const shortsSelector = 'a.shortsLockupViewModelHostEndpoint';
const shortsTitleAttribute = 'title';
const parentSelector = 'ytd-rich-item-renderer';
const langRange = '[\u0400-\u04FF]'

hideVideosByLanguage(selectors, titleSelectors, shortsSelector,
                     shortsTitleAttribute, parentSelector, langRange);

const observer = new MutationObserver(() => {
    hideVideosByLanguage(selectors, titleSelectors, shortsSelector,
                         shortsTitleAttribute, parentSelector);
});
observer.observe(document.body, { childList: true, subtree: true });
