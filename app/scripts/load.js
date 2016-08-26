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
	console.log('i made it');
	return matches
};
printMatches();

function renderMatches() {
	if ($('#stockchart').length < 1) {
		var stockchart = document.createElement('div');
		stockchart.id = "stockchart"
	}
	$('#stockchart').append('<img id="chart" src="http://chart.finance.yahoo.com/z?s=TWTR&t=6m&q=l&l=on&z=s&p=m50,m200" />');
	var timeline = document.getElementById("timeline");
	var main_content = document.getElementById("content-main-heading")
	timeline.insertBefore(stockchart, main_content);
	console.log('made a nice image')
}

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