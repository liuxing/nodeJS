let express = require('express');
let router = express.Router();

router.get('/:name', function (request, response) {
    // response.send('hello, ' + request.params.name)
    response.render('user',{
        name: request.params.name,
        supplies: ['mop', 'broom', 'duster']
    })
})

module.exports = router;