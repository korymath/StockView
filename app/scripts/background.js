'use strict';

chrome.webNavigation.onHistoryStateUpdated.addListener(function(details) {
  chrome.tabs.executeScript({
    file: "scripts/load.js"
  });
});

/*
chrome.runtime.onInstalled.addListener(function (details) {
  console.log('previousVersion', details.previousVersion);
});
*/

chrome.tabs.onUpdated.addListener(function (tabId) {
  chrome.pageAction.show(tabId);
});
// chrome.runtime.onMessage.addListener(
//   function(request, sender, sendResponse) {
//     console.log(sender.tab ?
//                 "from a content script:" + sender.tab.url :
//                 "from the extension");
//     $.get('http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%3D%22' + request.symbol + '%22&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys', function(data) {
//       sendResponse({data : data});
//     });
//     return true;
//   });

function onRequest(request, sender, callback) {
  console.log(request)
  console.log(sender)
  console.log(callback)
  chrome.tabs.executeScript(null, {file: "/scripts/libs/jquery-1.4.2.js"}, function(){
    chrome.tabs.executeScript(null, {file: "/scripts/injectcontent.js"});
  });
}
chrome.extension.onRequest.addListener(onRequest);
// function requestFunc() {
//    jQuery.ajax({
//       type: 'GET',
//       url: "https://www.highcharts.com/samples/data/jsonp.php?filename=aapl-c.json&callback=?",
//       dataType: 'jsonp',
//       success: function(json_results) {
//           console.log(json_results)
//        }
//    });
// }

