'use strict';

chrome.webNavigation.onHistoryStateUpdated.addListener(function(details) {
  chrome.tabs.executeScript({
    file: "scripts/load.js"
  });
});