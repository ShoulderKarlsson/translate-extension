const TranslateRequest = word => {
	this.word;
}

TranslateRequest.prototype.doRequest = async () => {
	return await('http://localhost:3000/translate/' + this.word)
	.then(response => {
		return response.json()
	})
	.then(translation => {
		return translation;
	})
	.catch(error => {
		console.log('TranslateRequest - doRequest error!', error);
	})
}

module.exports = TranslateRequest
