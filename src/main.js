function hideVideosByLanguage(selectors, titleSelectors, shortsSelector, shortsTitleAttribute, 
                            parentSelector, langRange, shortsPanelSelector) {
    const regex = new RegExp(langRange);

    function isAlreadyHidden(element, hiddenSelector) {
        return element.closest(hiddenSelector)?.style.display === 'none';
    }

    const videoElements = document.querySelectorAll('ytd-compact-video-renderer, ytd-rich-item-renderer');
    videoElements.forEach(video => {
        if (!isAlreadyHidden(video, 'ytd-compact-video-renderer, ytd-rich-item-renderer')) {
            const titleElement = video.querySelector('#video-title');
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
        const videos = section.querySelectorAll('ytd-compact-video-renderer, ytd-rich-item-renderer');
        const hiddenVideos = Array.from(videos).filter(video => video.style.display === 'none');
        if (videos.length === hiddenVideos.length && videos.length > 0) {
            section.style.display = 'none';
        }
    });
}

const CONFIG = {
    selectors: 'ytd-compact-video-renderer, ytd-rich-item-renderer',
    titleSelectors: '#video-title',
    shortsSelector: 'a.shortsLockupViewModelHostEndpoint',
    shortsTitleAttribute: 'title',
    parentSelector: 'ytd-rich-item-renderer',
    langRange: '[\\u0400-\\u04FF]',
    shortsPanelSelector: 'ytd-rich-section-renderer'
};

hideVideosByLanguage(
    CONFIG.selectors,
    CONFIG.titleSelectors,
    CONFIG.shortsSelector,
    CONFIG.shortsTitleAttribute,
    CONFIG.parentSelector,
    CONFIG.langRange,
    CONFIG.shortsPanelSelector
);

const observer = new MutationObserver(() => {
    hideVideosByLanguage(
        CONFIG.selectors,
        CONFIG.titleSelectors,
        CONFIG.shortsSelector,
        CONFIG.shortsTitleAttribute,
        CONFIG.parentSelector,
        CONFIG.langRange,
        CONFIG.shortsPanelSelector
    );
});

observer.observe(document.body, { childList: true, subtree: true });