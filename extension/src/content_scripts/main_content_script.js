'use strict'

const TranslationInfo = require("../lib/TranslationInfo.js")


const Main_Content = function() {
	this.text = null
	this.request = 'updateContext'
}

Main_Content.prototype.init = function() {
	this.addSelectionListener()
	this.messageEventListener()
}

Main_Content.prototype.addSelectionListener = function() {
	document.addEventListener('selectionchange', this.selectionChange.bind(this))
}

Main_Content.prototype.selectionChange = function() {
	this.text = window.getSelection()
	if (this.text.toString().length > 2 &&
		this.text.toString().length < 20) {
		chrome.runtime.sendMessage({
			request: this.updateContext,
			text: this.text.toString()
		})
	}
}

Main_Content.prototype.messageEventListener = function() {
	chrome.runtime.onMessage.addListener(this.messageListener.bind(this))
}

Main_Content.prototype.messageListener = function(request, sender, sendResponse)  {
	let translations = request.translations
	let node = this.text.focusNode

	let translationInfo = translations.map((info) => {
		return new TranslationInfo(info['0'].translation, info['0'].word)
	})

	let splitted = node.data.split(" ")

	for (let i = 0; i < splitted.length; i++) {
		for (let j = 0; j < translationInfo.length; j++) {
			if (splitted[i] === translationInfo[j].originalWord) {
				splitted[i] = translationInfo[j].translation
			}
		}
	}

	node.textContent = splitted.join(" ")

}

let m = new Main_Content();
m.init()
