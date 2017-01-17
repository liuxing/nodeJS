const superagent = require('superagent')
const URL = 'https://kyfw.12306.cn/otn/resources/js/framework/station_name.js?station_version=1.8994'

const fs =require('fs')
const ca = fs.readFileSync('./config/srca.cer.pem')
superagent
    .get(URL)
    .ca([ca])
    .set('Accept', 'application/json')
    .end(function (err, data) {
        if(err){
            return console.error(err)
        }

        let _station = data.text.match(/([A-Z]+)\|([a-z]+)/g)
        let stations = {}
        _station.map(function (item, i) {
            stations[item.slice(4)] = item.slice(0, 3)
        })

        fs.writeFile('./config/station.js', JSON.stringify(stations), function (err) {
            if (err) {
                return console.error(err)
            }
            console.log("数据写入成功！")
        })
    })