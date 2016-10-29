'use strict'
const config = require('../config/config.js')
const request = require('request-promise')
const Translation = require('./Translation.js')

const Request = function(word, targetLanguage) {
    this.word = word
    this.targetLanguage = targetLanguage || 'sv' // Swedish
    this.API_KEY = config.API_KEY
}

Request.prototype.getTranslation = function () {
    const url = 'https://www.googleapis.com/language/translate/v2?q=' + this.word + '&target=' + this.targetLanguage + '&key=' + this.API_KEY;
    return request.get(url)
    .then((response) => JSON.parse(response))
    .then((parsed) => parsed.data)
    .then((data) => {
        console.log(data)
        let translationInfo = data.translations.map((info) => {
            return new Translation(this.word, info.translatedText, info.detectedSourceLanguage)
        })

        return translationInfo
    })
    .catch((error) => console.log('request error', error))
};
module.exports = Request
