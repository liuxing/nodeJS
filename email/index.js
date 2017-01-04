const nodemailer = require('nodemailer')
const config = require('./config')

let transporter = nodemailer.createTransport({
    //https://github.com/andris9/nodemailer-wellknown#supported-services 支持列表
    service: 'qq',
    port: 465, // SMTP 端口
    secureConnection: true, // 使用 SSL
    auth: {
        user: config.email,
        //这里密码不是qq密码，是你设置的smtp密码
        pass: config.password
    }
});

// setup e-mail data with unicode symbols
let mailOptions = {
    from: config.email, // 发件地址
    to: config.to, // 收件列表
    subject: 'Hello', // 标题
    //text和html两者只支持一种
    text: 'Hello world ?', // 标题
    html: '<b>Hello world ?</b>' // html 内容
};

// send mail with defined transport object
transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log(error)
    }
    console.log('Message sent: ' + info.response)

});