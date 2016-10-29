'use strict'
console.log("index.js")
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

const TranslationInfo = function(translation, originalWord) {
	this.translation = translation
	this.originalWord = originalWord
}


/*
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
		console.log(JSON.stringify(request, null, 2))
		console.log(text)
		let translation = request.body[0] // Change this on server?
		let node = text.focusNode // Not sure if I should edit this?

		let splittedNodeData = node.data.split(" ")

		let translationString = splittedNodeData.map((word) => {
			if (word === translation.word) {
				return translation.translation
			}

			return word
		})

		let patchedTranslation = translationString.join(" ")
		node.textContent = patchedTranslation
})
*/