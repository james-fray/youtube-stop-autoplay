'use strict';

const toast = document.getElementById('toast');

chrome.storage.local.get({
  opacity: 30,
  faqs: true
}, prefs => {
  document.getElementById('opacity').value = prefs.opacity;
  document.getElementById('faqs').checked = prefs.faqs;
});

document.getElementById('save').addEventListener('click', () => {
  const opacity = Number(document.getElementById('opacity').value);
  const faqs = document.getElementById('faqs').checked;

  chrome.storage.local.set({
    opacity,
    faqs
  }, () => {
    toast.textContent = 'Options saved.';
    setTimeout(() => toast.textContent = '', 750);
  });
});
// reset
document.getElementById('reset').addEventListener('click', e => {
  if (e.detail === 1) {
    toast.textContent = 'Double-click to reset!';
    window.setTimeout(() => toast.textContent = '', 750);
  }
  else {
    localStorage.clear();
    chrome.storage.local.clear(() => {
      chrome.runtime.reload();
      window.close();
    });
  }
});
// support
document.getElementById('support').addEventListener('click', () => chrome.tabs.create({
  url: chrome.runtime.getManifest().homepage_url + '?rd=donate'
}));
