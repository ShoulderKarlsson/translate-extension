(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict'

const TranslationInfo = require("../lib/TranslationInfo.js")

let text = null;

document.addEventListener('selectionchange', function(e) {
	text = window.getSelection();
	let request = 'updateContext';

	// Some sort of validation is neccessary
	// when generating the contextMenu.
	if (text.toString().length > 2 && text.toString().length < 20) {
		chrome.runtime.sendMessage({
			request: 'updateContext',
			text: text.toString()
		})
	}
})
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	let translations = request.translations
	let node = text.focusNode

	// Make oneline
	let translationInfo = translations.map((translationInfo) => {
		return new TranslationInfo(translationInfo['0'].translation, translationInfo['0'].word);
	})


	console.log(JSON.stringify(translationInfo, null, 2))
	let splitted = node.data.split(" ")

	for (let i = 0; i < splitted.length; i++) {
		for (let j = 0; j < translationInfo.length; j++) {
			if (splitted[i] === translationInfo[j].originalWord)
				splitted[i] = translationInfo[j].translation
		}
	}

	node.textContent = splitted.join(" ");
})

},{"../lib/TranslationInfo.js":2}],2:[function(require,module,exports){
'use strict'

const TranslationInfo = function(translation, originalWord) {
	this.translation = translation
	this.originalWord = originalWord
}

module.exports = TranslationInfo
},{}]},{},[1]);
