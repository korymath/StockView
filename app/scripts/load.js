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
};
printMatches();

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