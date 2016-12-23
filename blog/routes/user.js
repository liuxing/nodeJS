let express = require('express');
let router = express.Router();

router.get('/:name', function (request, response) {
    response.send('hello, ' + request.params.name)
})

module.exports = router;