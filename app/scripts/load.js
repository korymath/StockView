// get the url
// !! This should run on every ajax, not just page reload !!
var url = window.location.toString()
if(/twitter.com\/search/.test(url)) {
	console.log("It werks!");
}