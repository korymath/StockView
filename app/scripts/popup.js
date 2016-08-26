'use strict';

chrome.runtime.onMessage.addListener(function(request, sender) {
  if (request.action == "getSource") {
  	try {
   	message.innerText = request.source;
   	stockchart.src="http://chart.finance.yahoo.com/z?s=" + request.source.replace('$','') + "&t=6m&q=l&l=on&z=s&p=m50,m200";
	}
	catch(err) {
		console.log(err.message);
	}
  }
});

function onWindowLoad() {
  var message = document.querySelector('#message');
  var stockchart = document.querySelector('#stockchart');

	chrome.tabs.executeScript(null, {file: "/scripts/libs/jquery-3.1.0.slim.min.js"}, function(){
		chrome.tabs.executeScript(null, {file: "/scripts/injectcontent.js"});
	});

  chrome.tabs.executeScript(null, {
    file: "/scripts/getPagesSource.js"
  }, function() {
    // If you try and inject into an extensions page or the webstore/NTP you'll get an error
    if (chrome.runtime.lastError) {
      try {
      	console.log('There was an error injecting script : \n' + chrome.runtime.lastError.message);
		}
		catch(err) {
			console.log(err.message);
		}
    }
  });
}
window.onload = onWindowLoad;
