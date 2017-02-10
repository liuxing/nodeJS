#!/usr/bin/env node
const fs = require('fs')
const program = require('commander')
const pkg = require('../package')
// 当前目录
const DIR = (process.cwd())

program
    .version(pkg.version)
    // .option('-l, --list', '', fileList)
    .option('-c, --create', '')
    .option('-r, --rename', '')
    .parse(process.argv)

if(program.create) createFile(program.args[0])
if(program.rename) rename(program.args[0], program.args[1])

// 新建文件
function createFile(name){
    if(fs.existsSync(name)) return console.log('文件已存在')
    fs.writeFile(name, '', (err)=>{
        if(err) throw err
        console.log('创建成功！')
    })
}

// 重命名
function rename(oldname, name){
    fs.rename(oldname, name, (err)=>{
        if(err) throw err
        console.log('重名名成功！')
    })
}
