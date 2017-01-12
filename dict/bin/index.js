#!/usr/bin/env node

const superagent = require('superagent')
const shell = require('shelljs')
const yargs = require('yargs')
const Table = require('cli-table2')

const argv = yargs
    .option('q', {
        alias : 'query',
        describe: 'query word',
        default: 'hello',
        type: 'string'
    })
    .usage('Usage: dict [options]')
    .example('dict -q hello')
    .help('h')
    .alias('h', 'help')
    .argv

const API = 'http://fanyi.youdao.com/openapi.do?keyfrom=toaijf&key=868480929&type=data&doctype=json&version=1.1'


if(!argv.query){
    console.log('请输入你要查询的单词')
    return false
}

let word = argv.query

superagent
    .get(API)
    .query({ q: word})
    .end(function (err, res) {
        if(err){
            console.log('excuse me, try again')
            return false
        }
        let data = JSON.parse(res.text)
        let result = {}

        if(data.basic){
            result[word] = data['basic']['explains']
        }else if(data.translation){
            result[word] = data['translation']
        }else {
            console.error('error')
        }

        // 输出表格
        let table = new Table()
        table.push(result)
        console.log(table.toString())
    })