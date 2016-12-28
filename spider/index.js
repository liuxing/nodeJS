let express = require('express'),
    cheerio = require('cheerio'),
    superagent = require('superagent');

let app = express()
app.get('/', function (req, res, next) {
    superagent.get('https://cnodejs.org/')
        .end(function (err, data) {
            if (err) {
                return next(err);
            }
            console.log(data)
            let $ = cheerio.load(data.text);
            let items = [];
            $('#topic_list .topic_title').each(function (idx, element) {
                let $element = $(element);
                items.push({
                    title: $element.attr('title'),
                    href: $element.attr('href')
                });
            });
            res.send(JSON.stringify(items, null, '\t'));
        });
});


app.listen(3000, function () {
    console.log('app is listening at port 3000');
});