var HttpClient = function() {
  this.get = function(aUrl, aCallback) {
  	anHttpRequest = new XMLHttpRequest();
  	anHttpRequest.onreadystatechange = function() { 
  		if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200) {
  			aCallback(anHttpRequest.responseText);
  		}
  	}

	anHttpRequest.open( "GET", aUrl, true );            
	anHttpRequest.send( null );
  }
}

// Called when the user clicks on the page action.
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  // No tabs or host permissions needed!
  if (tab.url.indexOf("bit.ly") != -1) {
    chrome.pageAction.show(tab.id);
    aClient = new HttpClient();
    console.log('Longer: ' + 'http://longer-url.herokuapp.com/parse?url=' + tab.url);
    aClient.get('http://longer-url.herokuapp.com/parse?url=' + tab.url, function(answer) {
      console.log(answer);
      chrome.tabs.update(tab.id, {url: answer});
    });
  } else {
    chrome.pageAction.hide(tab.id);
  }
});