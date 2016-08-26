window.onpushstate = function (event) {
    //Track for event changes here and 
    //send an intimation to background page to inject code again
    chrome.extension.sendMessage("Rerun script");
    console.log("rerunning...");
    alert("rerunning");
};

// get the url
// !! This should run on every url change, not just browser reload !!

var url = window.location.toString()
if(/twitter.com\/search/.test(url)) {
	console.log("It werks!");
}

// We assume we're on the search page
function printMatches() {
	var searchQuery = $(".AdaptiveSearchTitle-title")[0].innerText;
	var cashtagRegex = /\$[A-Za-z]{1,5}/g;
	var matches = searchQuery.match(cashtagRegex);
	console.log(matches);
	return matches
};

function buildOutput(symbol) {
	var stockchartStr = '<div id="stockchart" class="AdaptiveStreamUserGallery AdaptiveSearchTimeline-separationModule js-stream-item"><div class="app tweet js-actionable-user js-actionable-tweet js-original-tweet has-cards with-social-proof logged-in js-initial-focus focus ProfileCard"><img id="single_chart_image" src="https://chart.finance.yahoo.com/z?s=' + symbol + '&t=6m&q=l&l=on&z=s&p=m50,m200" /></div></div>'
	stockchartHTML = $.parseHTML(stockchartStr)
	return stockchartHTML
}

function renderMatches(matches) {
	if ($('#stockchart').length < 1) {
		var timeline = document.getElementById("timeline");
		symbol = matches[0].replace('$','')
		imNode = buildOutput(symbol)
		$('#timeline').prepend(imNode)
	}
}

function chrome_getJSON (url, callback) {
  console.log("sending chrome_getJSON");
  chrome.extension.sendRequest({action:'getJSON',url:url}, callback);
}

matches = printMatches();
renderMatches(matches);
chrome_getJSON()

// $(function () {
//     chrome_getJSON('https://www.highcharts.com/samples/data/jsonp.php?filename=aapl-c.json&callback=?', function (data) {
//         // Create the chart
//         $('#stockchart').highcharts('StockChart', {
//             rangeSelector : {
//                 selected : 1
//             },
//             title : {
//                 text : 'AAPL Stock Price'
//             },
//             series : [{
//                 name : 'AAPL',
//                 data : data,
//                 tooltip: {
//                     valueDecimals: 2
//                 }
//             }]
//         });
//     });
// });

// niceData = getniceDataChart()
// console.log(niceData)
/*
$(".AdaptiveSearchTitle-title").on({
	change: function() {
		printMatches();
	},
	click: function() {
		printMatches();
	}
});

$(".AdaptiveSearchTitle-title").on({
	change: function() {
		console.log("HAHA");
		alert("WATWAT");
	},
	click: function() {
		printMatches();
		console.log("HEHEHEHEHE");
		alert("HEHEHEHEHE");
	}
});
*/