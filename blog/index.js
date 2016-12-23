let express = require('express');
let app = express();
let indexRouter = require('./routes/index'),
    userRouter = require('./routes/user');

app.use('/', indexRouter)
app.use('/user', userRouter)

app.listen(3000);