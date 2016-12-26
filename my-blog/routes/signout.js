let express = require('express');
let router = express.Router();

let checkLogin = require('../middlewares/check').checkLogin;

// GET /signout 登出
router.get('/', checkLogin, function(req, res, next) {
    res.send(req.flash());
});

module.exports = router;