'use strict';

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    
    $.get('http://chartapi.finance.yahoo.com/instrument/1.0/' + request.symbol + '/chartdata;type=quote;range=1d/json', function(data) {
      sendResponse(data);
    });
    return true;
});

chrome.webNavigation.onHistoryStateUpdated.addListener(function(details) {
  chrome.tabs.executeScript({
    file: "scripts/load.js"
  });
});
