'use strict';

var css = `
.autoplay-bar {
  opacity: opacity:value;
}
.checkbox-on-off {
  display: none;
}
`;

function addGlobalStyle (css) {
  try {
    let elmHead = document.getElementsByTagName('head')[0];
    let elmStyle = document.createElement('style');
    elmStyle.type = 'text/css';
    elmHead.appendChild(elmStyle);
    elmStyle.textContent = css;
  }
  catch (e) {
    if (!document.styleSheets.length) {
      document.createStyleSheet();
    }
    document.styleSheets[0].cssText += css;
  }
}

chrome.storage.local.get({
  'opacity': 30
}, (obj) => {
  addGlobalStyle(css.replace('opacity:value', obj.opacity / 100));
});
