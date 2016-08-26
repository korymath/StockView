function DOMtoString(document_root) {
    try {
        var node = document.getElementsByClassName('AdaptiveSearchTitle-title')
        console.log(node[0].innerHTML)
        return node[0].innerHTML
    }
    catch(err) {
        console.log('no cashtag found')
        console.log(err.message)
    }
}

chrome.runtime.sendMessage({
    action: "getSource",
    source: DOMtoString(document)
});