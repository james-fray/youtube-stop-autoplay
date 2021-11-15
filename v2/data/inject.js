'use strict';

const css = `
  ytd-compact-autoplay-renderer.ytd-watch-next-secondary-results-renderer,
  .autoplay-bar {
    opacity: opacity-value;
  }
  ytd-compact-autoplay-renderer.ytd-watch-next-secondary-results-renderer paper-toggle-button,
  .checkbox-on-off {
    display: none;
  }
`;

function addGlobalStyle(css) {
  const style = document.createElement('style');
  style.textContent = css;
  document.documentElement.appendChild(style);
}

chrome.storage.local.get({
  'opacity': 30
}, prefs => {
  if (prefs.opacity) {
    addGlobalStyle(css.replace('opacity-value', prefs.opacity / 100));
  }
  else {
    addGlobalStyle(css.replace('opacity-value', prefs.opacity / 100 + '; display: none;'));
  }
});


const script = document.createElement('script');
script.textContent = `
  window.addEventListener('yt-navigate-finish', () => {
    try {
      document.querySelector('.ytp-autonav-toggle-button-container [aria-checked="true"]').click()
    }
    catch(e) {}
  });
`;
document.documentElement.appendChild(script);
script.remove();
