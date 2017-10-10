const TranslateRequest = word => {
	this.word;
}

TranslateRequest.prototype.doRequest = () => {
	return ('http://localhost:3000/translate/' + this.word)
	.then(response => response.json())
	.then(translation => translation)
	.catch(error => {
		console.log('TranslateRequest - doRequest error!', error);
	})
}

module.exports = TranslateRequest
