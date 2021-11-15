'use strict';

window.addEventListener('yt-navigate-finish', async () => {
  try {
    for (let n = 0; n < 10; n += 1) {
      document.querySelector('.ytp-autonav-toggle-button-container [aria-checked="true"]').click();
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }
  catch (e) {}
});
