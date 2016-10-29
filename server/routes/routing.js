'use strict'

const router = require('express').Router()
const Request = require('../lib/Request.js')
const Builder = require('../lib/Builder.js')

router.route('/translate/:word')
.get((req, res) => {

    /**
     * TODO: Make sure empty words cant pass through
     */

    let word = req.params.word



    let b = new Builder(word);
    b.buildRequest()
    .then((translations) => {
        console.log(JSON.stringify(translations, null, 2))
        res.send(translations)
    })
    .catch((error) => {
        console.log(error)
    })

})

module.exports = router;
