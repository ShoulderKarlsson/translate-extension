'use strict'

const Translation = function(word, translation, detectedLanguage) {
    this.word = word
    this.translation = translation
    this.detectedLanguage = detectedLanguage
}

module.exports = Translation
