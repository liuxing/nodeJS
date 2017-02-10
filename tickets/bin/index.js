#!/usr/bin/env node

const superagent = require('superagent')
const cliTable = require('cli-table2')
const program = require('commander')
const fs =require('fs')
const moment = require('moment')
moment.locale('zh-cn')
// 读取12306的证书
const ca = fs.readFileSync('./config/srca.cer.pem')
const station = require('./../config/station')
const API = 'https://kyfw.12306.cn/otn/leftTicket/queryA'

program
    .parse(process.argv)

// 预售期 day
const DAY = 30

let [form, to, date] = program.args
let [_form, _to] = [station[form], station[to]]
let _date = moment(date).isBetween(moment().format('L'), moment().add(DAY, 'days'))

// 判断起始站是否正确
if(!(_form && _to)){
    return console.warn('你输入的地点有问题~~~')
}

// 判断时间
if(!_date){
    return console.warn('你选择的时间不在预售范围')
}


superagent
    .get(API)
    .query({
        'leftTicketDTO.train_date': date,
        'leftTicketDTO.from_station': _form,
        'leftTicketDTO.to_station': _to,
        'purpose_codes': 'ADULT'
    })
    .set('Accept', 'application/json')
    .ca([ca])
    .end(function (err, data) {
        if(err){
            return console.error(err)
        }
        // 终端表格
        let table = new cliTable({
            head: '车次 始末 时间 历时 软座 硬座 软卧 硬卧 无座'.split(' ')
        })
        let _data = JSON.parse(data.text).data
        _data.forEach(function(item, i){
            let _item = item['queryLeftNewDTO']
            let line = [
                _item['station_train_code'],
                `${_item['from_station_name']}->${_item['to_station_name']}`,
                `${_item['start_time']}-${_item['arrive_time']}`,
                _item['lishi'],
                _item['rz_num'],
                _item['yz_num'],
                _item['rw_num'],
                _item['yw_num'],
                _item['wz_num']
            ]
            table.push(line)
        })
        console.log(table.toString())
    })