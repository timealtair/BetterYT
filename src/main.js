function hideRussianVideos(selectors, title_selectors, excuded_lang_range) {
    const videoElements = document.querySelectorAll(selectors);

    videoElements.forEach(video => {
        const titleElement = video.querySelector(title_selectors);
        
        if (titleElement) {
            if (/[\u0400-\u04FF]/.test(titleElement.textContent)) {
                video.style.display = 'none';
            }
        }
    });
}

selectors = 'ytd-rich-item-renderer'

title_selectors = '#video-title'
excuded_lang_range = undefined

hideRussianVideos(selectors, title_selectors, excuded_lang_range);

const observer = new MutationObserver(() => hideRussianVideos(selectors,
                                                              title_selectors,
                                                              excuded_lang_range));
observer.observe(document.body, { childList: true, subtree: true });
