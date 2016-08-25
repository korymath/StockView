'use strict';

console.log('\'Allo \'Allo! Content script');

var div=document.createElement("div");
document.body.appendChild(div);
div.innerText="test123";

// insert at the top of the timeline it