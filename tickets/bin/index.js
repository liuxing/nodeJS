#!/usr/bin/env node

const superagent = require('superagent')
const cliTable = require('cli-table2')
const program = require('commander')
const fs =require('fs')

const ca = fs.readFileSync('./config/srca.cer.pem')
const station = require('./../config/station')
const API = 'https://kyfw.12306.cn/otn/leftTicket/queryA'

program
    .parse(process.argv)

let [form, to, data] = program.args

superagent
    .get(API)
    .query({
        'leftTicketDTO.train_date': data,
        'leftTicketDTO.from_station': station[form],
        'leftTicketDTO.to_station': station[to],
        'purpose_codes': 'ADULT'
    })
    .set('Accept', 'application/json')
    .ca([ca])
    .end(function (err, data) {
        if(err){
            return console.error(err)
        }
        let table = new cliTable({
            head: '车次 始末 时间 历时 软座 硬座 软卧 硬卧 无座'.split(' ')
        })
        let _data = JSON.parse(data.text).data
        _data.forEach(function(item, i){
            let _item = item['queryLeftNewDTO']
            let line = [
                _item['station_train_code'],
                `${_item['from_station_name']}-${_item['to_station_name']}`,
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