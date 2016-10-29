'use strict'

console.log('background.js')

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	console.log("from index.js - ", request);
	let title = request.text

	if (title !== "") {
		chrome.contextMenus.removeAll(function() {
			chrome.contextMenus.create({
				'title': title,
				'type': 'normal',
				'contexts': ['selection'],
				'onclick': function(text) {
					console.log(title)
						let TR = new TranslateRequest(title)
						TR.doRequest().then((translation) => {
							// console.log(translation)
							chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
								chrome.tabs.sendMessage(tabs[0].id, {translations: translation}, () => {})
							})
						}).catch((error) => {
							console.log('doRequest error!', error)
						})
				} 
			})	
		})
	}
})


const TranslateRequest = function(word) {
	this.word = word;
}

TranslateRequest.prototype.doRequest = function() {
	return fetch('http://localhost:3000/translate/' + this.word)
	.then(function(response) {
		return response.json()
	})
	.then(function(translation) {
		// console.log(translation)
		return translation;
	})
	.catch(function(error) {
		console.log(error);
	})
}