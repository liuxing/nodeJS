const superagent = require('superagent')
const cliTable = require('cli-table2')

const fs =require('fs')
const ca = fs.readFileSync('./config/srca.cer.pem')

const API = 'https://kyfw.12306.cn/otn/leftTicket/queryA'
superagent
    .get(API)
    .query({
        'leftTicketDTO.train_date': '2017-01-17',
        'leftTicketDTO.from_station': 'BJP',
        'leftTicketDTO.to_station': 'KMM',
        'purpose_codes': 'ADULT'
    })
    .set('Accept', 'application/json')
    .ca([ca])
    .end(function (err, data) {
        if(err){
            console.log(err)
            return false
        }
        let table = new cliTable({
            head: '车次 始末 时间 厉时 一等座 二等座 软卧 硬卧 硬座'.split(' ')
        })
        let　line = []
        let _data = JSON.parse(data.text).data
        _data.forEach(function(item, i){
            console.log(item['queryLeftNewDTO'])
        })
        console.log(line)
        console.log(table.toString())
    })


