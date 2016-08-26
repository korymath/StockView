function getTickerInfo(ticker, callback) {
	chrome.runtime.sendMessage({symbol: ticker}, function(response) {
		response = response.replace('finance_charts_json_callback', '');
		response = response.substring(1).substring(1, response.length - 2).trim();
		try { 
			var data = JSON.parse(response);
			callback(data);
		} catch (e) {
			callback(null);
		}
	});
};

//getTickerInfo("TWTR", function (data) {
//	console.log(data.series.map(function(a) {return new Date(a.Timestamp * 1000)}));
//});

(function () {
	var template = '<div id="company-popup"><div class="profile-card ProfileCard component profile-header hovercard gravity-south weight-left"><div class="hover-offset"><div class="arrow" style="background-color: #1B95E0"></div></div><div class="ProfileCard-bg CompanyCard" style="background-color: #1B95E0;position: relative;"><div class="company-name">{NAME}</div><div class="company-ticker">{TICKER}</div><div class="company-current-price">{PRICE}</div><div class="company-delta dela-{DETA_TYPE}">{DELTA}</div><div class="company-last-sync-time">{LAST_SYNC}</div></div><div class="ProfileCard-content" ><div class="bio-container">CHARD GOEZ HEAR</div></div></div></div>';
	var css = '.CompanyCard{color:#fff;padding:1em}.company-ticker{font-size:2em;position:absolute;bottom:40px}.company-current-price{position:absolute;right:70px;bottom:40px;font-size:2em}.company-delta{position:absolute;bottom:35px;right:20px}.dela-positive{color:#8ECF61}.dela-negative{color:#ED3B3B}.company-last-sync-time{position:absolute;bottom:5px;color:#eee;right:10px;font-size:.7em;text-transform:uppercase}';

	var popup = null;
	$(document).ready(function() {
		$('body').append(template).append('<style>' + css + '</style>');
		popup = $('#company-popup');
		popup.css({'position' : 'absolute', top : -1000, left: -1000, zIndex: 1002}).hide();
	});

	$(document).on('mouseover', 'a.twitter-cashtag', function(e) {
		var target = $(e.currentTarget);
		var pos = target.offset();
		var top = pos.top - popup.height() - 10;

		var ticker = target.text().trim().substring(1);
		$('.company-ticker', popup).html(ticker);

		if (top < window.scrollY) {
			top = pos.top + target.height() + 10;
		}

		getTickerInfo(ticker, function (data) {
			if (!data) return;
			var current = data.series[data.series.length - 1];
			var start_price = data.series[0].open;
			var current_price = current.open;
			$('.company-name', popup).html(data.meta['Company-Name']);
			$('.company-current-price', popup).html(current_price);
			delta = current_price - start_price;
			var positive = delta > 0;
			$('.company-delta', popup).html((positive ? '▲' : '▼') + Math.abs(delta).toFixed(2));
			$('.company-delta', popup).removeClass('dela-positive dela-negative').addClass(positive ? 'dela-positive' : 'dela-negative');
			$('.company-last-sync-time', popup).html("Last Updated on " + new Date(current.Timestamp * 1000)).hide();
			popup.css({top: top, left: pos.left}).stop().fadeIn();
		})
	}).on('mouseout', 'a.twitter-cashtag', function() {
		popup.stop().fadeOut();
	})
})();
