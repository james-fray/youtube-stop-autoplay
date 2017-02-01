'use strict';

function save_options() {
  let opacity = +document.getElementById('opacity').value;
  chrome.storage.local.set({opacity}, function() {
    let status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(() => status.textContent = '', 750);
  });
}

function restore_options() {
  chrome.storage.local.get({
    opacity: 30
  }, function(items) {
    document.getElementById('opacity').value = items.opacity;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
