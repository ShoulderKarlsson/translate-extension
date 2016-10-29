'use strict'
const Menu = require('../lib/Menu.js')

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	let M = new Menu(request.text);
	M.updateMenu();
})