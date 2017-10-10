const TranslateRequest = require("../lib/TranslationRequest.js");

const Menu = text => {
	this.text = text
}

Menu.prototype.updateMenu = () => {
	chrome.contextMenus.removeAll(() => {
		chrome.contextMenus.create(this.GetNewMenu())
	})
}

Menu.prototype.GetNewMenu = () => {
	let title = 'Translate: ' + this.text
	return {
		'title': title,
		'type': 'normal',
		'contexts': ['selection'],
		onclick: this.onClick.bind(this)
	}
}

Menu.prototype.onClick = async () => {
	let TR = new TranslateRequest(this.text)
	await TR.doRequest()
	.then((translation) => {
		chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
			chrome.tabs.sendMessage(tabs[0].id, {translations: translation}, () => {})
		})
	})
	.catch((error) => console.log('Menu.prototype.onClick error - ', error))
}

module.exports = Menu