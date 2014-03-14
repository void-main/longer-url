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
chrome.browserAction.onClicked.addListener(function(tab) {
  // No tabs or host permissions needed!
  aClient = new HttpClient();
  console.log('Longer: ' + 'http://longer-url.herokuapp.com/parse?url=' + tab.url);
  aClient.get('http://longer-url.herokuapp.com/parse?url=' + tab.url, function(answer) {
  	console.log(answer);
    chrome.tabs.update(tab.id, {url: answer});
  });
});