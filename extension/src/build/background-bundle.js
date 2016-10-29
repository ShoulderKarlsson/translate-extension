(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict'

console.log('background.js')

const TranslateRequest = require("../lib/TranslationRequest.js");

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


// const TranslateRequest = function(word) {
// 	this.word = word;
// }

// TranslateRequest.prototype.doRequest = function() {
// 	return fetch('http://localhost:3000/translate/' + this.word)
// 	.then(function(response) {
// 		return response.json()
// 	})
// 	.then(function(translation) {
// 		// console.log(translation)
// 		return translation;
// 	})
// 	.catch(function(error) {
// 		console.log(error);
// 	})
// }
},{"../lib/TranslationRequest.js":2}],2:[function(require,module,exports){
'use strict'

const TranslateRequest = function(word) {
	this.word = word;
}

TranslateRequest.prototype.doRequest = function() {
	return fetch('http://localhost:3000/translate/' + this.word)
	.then(function(response) {
		return response.json()
	})
	.then(function(translation) {
		return translation;
	})
	.catch(function(error) {
		console.log(error);
	})
}

module.exports = TranslateRequest
},{}]},{},[1]);
