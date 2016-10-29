(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict'

console.log('background.js')

const TranslateRequest = require("../lib/TranslationRequest.js");
const Menu = require('../lib/Menu.js')

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	// console.log("from index.js - ", request);
	
	// let title = request.text
	
	let M = new Menu(request.text);
	M.updateMenu();

	/*
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
	*/

})

// const Menu = function(text) {
// 	this.text = text
// }

// Menu.prototype.updateMenu = function() {
// 	chrome.contextMenus.removeAll(() => {
// 		chrome.contextMenus.create(this.GetNewMenu())
// 	})
// }

// Menu.prototype.GetNewMenu = function() {
// 	let title = 'Translate: ' + this.text
// 	return {
// 		'title': title,
// 		'type': 'normal',
// 		'contexts': ['selection'],
// 		onclick: this.onClick.bind(this)
// 	}
// }

// Menu.prototype.onClick = function() {
// 	let TR = new TranslateRequest(this.text)
// 	TR.doRequest()
// 	.then((translation) => {
// 		chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
// 			chrome.tabs.sendMessage(tabs[0].id, {translations: translation}, () => {})
// 		})
// 	})
// 	.catch((error) => console.log('Menu.prototype.onClick error - ', error))
// }
},{"../lib/Menu.js":2,"../lib/TranslationRequest.js":3}],2:[function(require,module,exports){
'use strict'
const TranslateRequest = require("../lib/TranslationRequest.js");

const Menu = function(text) {
	this.text = text
}

Menu.prototype.updateMenu = function() {
	chrome.contextMenus.removeAll(() => {
		chrome.contextMenus.create(this.GetNewMenu())
	})
}

Menu.prototype.GetNewMenu = function() {
	let title = 'Translate: ' + this.text
	return {
		'title': title,
		'type': 'normal',
		'contexts': ['selection'],
		onclick: this.onClick.bind(this)
	}
}

Menu.prototype.onClick = function() {
	let TR = new TranslateRequest(this.text)
	TR.doRequest()
	.then((translation) => {
		chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
			chrome.tabs.sendMessage(tabs[0].id, {translations: translation}, () => {})
		})
	})
	.catch((error) => console.log('Menu.prototype.onClick error - ', error))
}

module.exports = Menu
},{"../lib/TranslationRequest.js":3}],3:[function(require,module,exports){
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
