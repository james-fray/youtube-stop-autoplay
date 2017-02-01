'use strict';

chrome.webRequest.onBeforeRequest.addListener(function (details) {
    let tmp = {
      cancel: details.url.indexOf('watch_autoplayrenderer.js') !== -1
    };
    return tmp;
  },
  {urls: [
    '*://*.ytimg.com/yts/jsbin/*',
    '*://*.youtube.com/yts/jsbin/*'
  ]},
  ['blocking']
);

(function () {
  let url = 'http://add0n.com/stop-autoplay.html';
  let version = chrome.runtime.getManifest().version;
  chrome.storage.local.get('version', (obj) => {
    if (obj.version !== version) {
      chrome.storage.local.set({version: version}, () => chrome.tabs.create({
        url: url + `?version=${version}&type=${obj.version ? 'update' : 'install'}`,
        active: true
      }));
    }
  });
})();
