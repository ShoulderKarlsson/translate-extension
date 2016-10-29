'use strict'

const Request = require('./Request.js')

const Builder = function(word) {
	this.word = word
	this.requests = []
}

Builder.prototype.buildRequest = function() {
	let splitted = this.word.split(" ");

	this.requests = splitted.map((word) => {
		return new Request(word).getTranslation()
	})

	return Promise.all(this.requests)
	.then((translatiions) => {
		// console.log(JSON.stringify(translatiions, null, 2));
		return translatiions;

	})
	.catch((error) => console.log('promise.all error', error))
}


module.exports = Builder