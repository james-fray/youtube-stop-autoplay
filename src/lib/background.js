'use strict';

var app = app || require('./firefox/firefox');

app.webRequest.onBeforeRequest.addListener(function (details) {
    let tmp = {
      cancel: details.url.indexOf('watch_autoplayrenderer.js') !== -1
    };
    return tmp;
  },
  {urls: ['https://*.ytimg.com/yts/jsbin/*', 'http://*.ytimg.com/yts/jsbin/*']},
  ['blocking']
);

app.startup(function () {
  let url = 'http://add0n.com/stop-autoplay.html';
  let version = app.runtime.getManifest().version;
  app.storage.local.get('version', function (obj) {
    if (obj.version !== version) {
      app.storage.local.set({version: version}, () => app.tabs.create({
        url: url + `?version=${version}&type=${obj.version ? 'update' : 'install'}`,
        active: true
      }));
    }
  });
});
