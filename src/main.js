function hideVideosByLanguage(selectors, titleSelectors, shortsSelector, shortsTitleAttribute, 
                              parentSelector, langRange, shortsPanelSelector) {
    try {
        const regex = new RegExp(langRange, 'u');
        
        function isAlreadyHidden(element, selector) {
            if (!element || !selector) return false;
            const parent = element.closest(selector);
            return parent ? (parent.style.display === 'none') : false;
        }

        const style = document.createElement('style');
        style.textContent = `
            ${selectors}[data-hidden="true"],
            ${parentSelector}[data-hidden="true"],
            ${shortsPanelSelector}[data-hidden="true"] {
                display: none !important;
            }
        `;
        document.head.appendChild(style);

        document.querySelectorAll(selectors).forEach(video => {
            try {
                if (!video || isAlreadyHidden(video, parentSelector)) return;
                
                const titleElement = video.querySelector(titleSelectors);
                if (titleElement?.textContent && regex.test(titleElement.textContent)) {
                    video.setAttribute('data-hidden', 'true');
                }
            } catch (err) {
                console.warn('Error processing video element:', err);
            }
        });

        document.querySelectorAll(shortsSelector).forEach(short => {
            try {
                const parentElement = short?.closest(parentSelector);
                if (!short || !parentElement || isAlreadyHidden(parentElement, shortsPanelSelector)) return;

                const title = short.getAttribute(shortsTitleAttribute);
                if (title && regex.test(title)) {
                    parentElement.setAttribute('data-hidden', 'true');
                }
            } catch (err) {
                console.warn('Error processing shorts element:', err);
            }
        });

        document.querySelectorAll(shortsPanelSelector).forEach(section => {
            try {
                if (!section) return;
                
                const videos = section.querySelectorAll(selectors);
                const hiddenVideos = Array.from(videos).filter(
                    video => video.hasAttribute('data-hidden')
                );
                
                if (videos.length > 0 && videos.length === hiddenVideos.length) {
                    section.setAttribute('data-hidden', 'true');
                }
            } catch (err) {
                console.warn('Error processing shorts panel:', err);
            }
        });
    } catch (err) {
        console.error('Error in hideVideosByLanguage:', err);
    }
}

const CONFIG = {
    selectors: 'ytd-rich-item-renderer',
    titleSelectors: '#video-title',
    shortsSelector: 'a.shortsLockupViewModelHostEndpoint',
    shortsTitleAttribute: 'title',
    parentSelector: 'ytd-rich-item-renderer',
    langRange: '[\\u0400-\\u04FF]',
    shortsPanelSelector: 'ytd-rich-section-renderer'
};

const initialStyle = document.createElement('style');
initialStyle.textContent = `
    ${CONFIG.selectors}[data-hidden="true"],
    ${CONFIG.parentSelector}[data-hidden="true"],
    ${CONFIG.shortsPanelSelector}[data-hidden="true"] {
        display: none !important;
    }
`;
document.head.appendChild(initialStyle);

hideVideosByLanguage(
    CONFIG.selectors,
    CONFIG.titleSelectors,
    CONFIG.shortsSelector,
    CONFIG.shortsTitleAttribute,
    CONFIG.parentSelector,
    CONFIG.langRange,
    CONFIG.shortsPanelSelector
);

try {
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

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
} catch (err) {
    console.error('Error setting up observer:', err);
}