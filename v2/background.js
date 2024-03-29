'use strict';

chrome.webRequest.onBeforeRequest.addListener(d => {
  const cancel = d.url.indexOf('watch_autoplayrenderer.js') !== -1 || d.url.endsWith('endscreen.js') ||
    d.url.indexOf('web-animations-next') !== -1;
  return {
    cancel
  };
}, {
  urls: [
    '*://*.ytimg.com/yts/jsbin/*',
    '*://www.youtube.com/yts/jsbin/*',
    '*://www.youtube.com/s/player/*',
    '*://www.youtube.com/s/desktop/*'
  ],
  types: ['script']
}, ['blocking']);

/* FAQs & Feedback */
{
  const {management, runtime: {onInstalled, setUninstallURL, getManifest}, storage, tabs} = chrome;
  if (navigator.webdriver !== true) {
    const page = getManifest().homepage_url;
    const {name, version} = getManifest();
    onInstalled.addListener(({reason, previousVersion}) => {
      management.getSelf(({installType}) => installType === 'normal' && storage.local.get({
        'faqs': true,
        'last-update': 0
      }, prefs => {
        if (reason === 'install' || (prefs.faqs && reason === 'update')) {
          const doUpdate = (Date.now() - prefs['last-update']) / 1000 / 60 / 60 / 24 > 45;
          if (doUpdate && previousVersion !== version) {
            tabs.query({active: true, currentWindow: true}, tbs => tabs.create({
              url: page + '?version=' + version + (previousVersion ? '&p=' + previousVersion : '') + '&type=' + reason,
              active: reason === 'install',
              ...(tbs && tbs.length && {index: tbs[0].index + 1})
            }));
            storage.local.set({'last-update': Date.now()});
          }
        }
      }));
    });
    setUninstallURL(page + '?rd=feedback&name=' + encodeURIComponent(name) + '&version=' + version);
  }
}
