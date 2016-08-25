chrome.runtime.sendMessage({symbol: "TWRR"}, function(response) {
  console.log(response);
});
