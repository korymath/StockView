'use strict';

console.log("ASD");

chrome.webNavigation.onHistoryStateUpdated.addListener(function(details) {
	chrome.tabs.executeScript({
		file: "scripts/main.js"
	});
});