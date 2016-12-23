let path = require('path');
let express = require('express');
let app = express();
let indexRouter = require('./routes/index'),
    userRouter = require('./routes/user');

app.set('views', path.join(__dirname, 'views'));// 设置存放模板文件的目录
app.set('view engine', 'ejs');// 设置模板引擎为 ejs

app.use('/', indexRouter)
app.use('/user', userRouter)

app.listen(3000);