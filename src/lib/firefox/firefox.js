'use strict';

// Load Firefox based resources
var self = require('sdk/self'),
    sp = require('sdk/simple-prefs'),
    tabs = require('sdk/tabs'),
    timers = require('sdk/timers'),
    unload = require('sdk/system/unload'),
    pageMod = require('sdk/page-mod'),
    {Cu} = require('chrome');

var {WebRequest} = Cu.import('resource://gre/modules/WebRequest.jsm', {});
var {MatchPattern} = Cu.import('resource://gre/modules/MatchPattern.jsm');

pageMod.PageMod({
  include: [
    'https://www.youtube.com/*',
    'http://www.youtube.com/*',
    'https://youtube.com/*',
    'http://youtube.com/*'
  ],
  contentStyleFile: self.data.url('inject.css')
});

exports.storage = {
  local: {
    set: (obj, callback) => {
      Object.keys(obj).forEach(key => sp.prefs[key] = obj[key]);
      callback();
    },
    get: function (arr, callback) {
      if (typeof arr === 'string') {
        arr = [arr];
      }
      let tmp = {};
      arr.forEach(str => tmp[str] = sp.prefs[str]);
      callback(tmp);
    }
  }
};

exports.tabs = {
  create: function (props) {
    tabs.open({
      url: props.url,
      inBackground: !props.active
    });
  }
};

exports.runtime = {
  getManifest: () => ({
    version: self.version
  })
};

exports.window = {
  setTimeout: timers.setTimeout
};

exports.webRequest = {
  onBeforeRequest: {
    addListener: function (callback, filter, extraInfoSpec) {
      filter.urls = new MatchPattern(filter.urls);
      WebRequest.onBeforeRequest.addListener(callback, filter, extraInfoSpec);
      unload.when(() => WebRequest.onBeforeRequest.removeListener(callback));
    }
  }
};

//startup
exports.startup = function (callback) {
  if (self.loadReason === 'install' || self.loadReason === 'startup') {
    callback();
  }
};
