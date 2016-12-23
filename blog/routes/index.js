let express = require('express');
let router = express.Router();

router.get('/', function (request, response) {
    response.send('hello,express')
})

module.exports = router;