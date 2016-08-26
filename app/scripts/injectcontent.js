// // injectcontent.js
// console.log('i made it');
// if ($('#stockchart').length < 1) {
// 	var stockchart = document.createElement('div');
// 	stockchart.id = "stockchart"
// }
// $('#stockchart').append('<img id="chart" src="http://chart.finance.yahoo.com/z?s=TWTR&t=6m&q=l&l=on&z=s&p=m50,m200" />');
// var timeline = document.getElementById("timeline");
// var main_content = document.getElementById("content-main-heading")
// timeline.insertBefore(stockchart, main_content);
// // $.get(chrome.extension.getURL('/popup.html'), function(data) {
// // });
// // document.getElementById("myList").appendChild(node);
// // $.get(chrome.extension.getURL('/popup.html'), function(data) {
// //     $(data).appendTo('body');
// //     console.log('nice dog');
// //     // Or if you're using jQuery 1.8+:
// //     $($.parseHTML(data)).appendTo('body');
// // });

console.log('help im trapped deep in the functions')

$(function () {
    $.getJSON('https://www.highcharts.com/samples/data/jsonp.php?filename=aapl-c.json&callback=?', function (data) {
        // Create the chart
        $('#stockchart').highcharts('StockChart', {
            rangeSelector : {
                selected : 1
            },
            title : {
                text : 'AAPL Stock Price'
            },
            series : [{
                name : 'AAPL',
                data : data,
                tooltip: {
                    valueDecimals: 2
                }
            }]
        });
    });
});