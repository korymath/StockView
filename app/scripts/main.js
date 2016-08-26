// Check if we're on the right page
var url = window.location.toString()
var onRightPage = /twitter\.com\/search/.test(url);

if (onRightPage) {
	function buildChartDiv() {
		var stockchartStr = '<div id="stockchart" class="AdaptiveStreamUserGallery AdaptiveSearchTimeline-separationModule js-stream-item"><div class="app tweet js-actionable-user js-actionable-tweet js-original-tweet has-cards with-social-proof logged-in js-initial-focus focus ProfileCard">loading...</div></div>';
		stockchartHTML = $.parseHTML(stockchartStr);
		return stockchartHTML;
	};

	function injectChartDiv() {
		if ($('#stockchart').length < 1) {
			var timeline = document.getElementById("timeline");
			imNode = buildChartDiv()
			$('#timeline').prepend(imNode)

			return true;
		}
		return false;
	};

	// Chart
	function setup_chart(id) {
	  // Create the chart
	  chart = $(id).highcharts('StockChart', {
	    rangeSelector: {
	        selected: 2,
	        buttons: [
	            {type: 'week', count: 1,  text: '1w'},
	            {type: 'month', count: 1,  text: '1m'},
	            {type: 'month', count: 3,  text: '3m'},
	            {type: 'month', count: 6,  text: '6m'},
	            {type: 'ytd', text: 'YTD'},
	            {type: 'all', text: 'All'}
	        ]
	    }
	  });
	};

	function add_series(ticker) {
		if(ticker[0] == '$') {
        	ticker = ticker.substring(1);
		}
		console.log(ticker + "TICKER");
		var date = new Date();
		var endDate = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
		var startDate = new Date(endDate - 24 * 60 * 60 * 1 * 365 * 1000);

		var url = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.historicaldata%20where%20symbol%20%3D%20%22' + ticker + '%22%20and%20startDate%20%3D%20%22' + startDate.toISOString().substr(0, 10) + '%22%20and%20endDate%20%3D%20%22' + endDate.toISOString().substr(0, 10) + '%22&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback='

	    $.get(url, function(json) {
	    	console.log("JSON" + ticker)
	        var hiJson = json.query.results.quote.map(function(d) {
	            return [new Date(d["Date"]).getTime(), parseFloat(d["Close"])];
	        }).reverse();
	        var chart = $('#stockchart').highcharts();
	        chart.addSeries({
	            name: ticker,
	            data: hiJson,
	            tooltip: {valueDecimals: 2}
	        })
	    });
	};

	function getCashtags() {
		var searchQuery = $(".AdaptiveSearchTitle-title")[0].innerText;
		var cashtagRegex = /\$[A-Za-z]{1,5}/g;
		return searchQuery.match(cashtagRegex);
	};

	var cashtags = getCashtags();

	if (cashtags.length > 0) {
		var inserted = injectChartDiv();
		if(inserted) {
			setup_chart("#stockchart");
			for(var i = 0; i < cashtags.length; i++) {
				console.log(cashtags[i]);
				add_series(cashtags[i]);
			}
		}
	}

}