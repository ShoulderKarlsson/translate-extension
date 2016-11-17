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
		console.log('TranslateRequest - doRequest error!', error);
	})
}

module.exports = TranslateRequest
