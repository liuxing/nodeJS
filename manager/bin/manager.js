#!/usr/bin/env node
const fs = require('fs')
const program = require('commander')
const pkg = require('../package')
// 当前目录
const DIR = (process.cwd())

program
    .version(pkg.version)
    // .option('-l, --list', '', fileList)
    .option('-c, --create', '创建文件/文件夹')
    .option('-d, --delete', '删除文件')     
    .option('-r, --rename', '文件重命名')
    .option('-m, --move', '移动文件')
    .option('-p, --copy', '复制文件') 
    .parse(process.argv)

if(program.create) createFile(program.args[0])
if(program.delete) delFile(program.args[0])
if(program.rename) rename(program.args[0], program.args[1])

// 新建
function createFile(name){
    if(fs.existsSync(name)) return console.log('文件已存在！')
    // 如果有/则是创建文件夹
    if(name.indexOf('/') !== -1){
        fs.mkdir(name, (err)=>{
            if(err) throw err
            console.log(`创建${name}文件夹成功！`)
        })
    }else{
        fs.writeFile(name, '', (err)=>{
            if(err) throw err
            console.log(`创建${name}成功！`)
        })
    }
}

// 删除
function delFile(name){
     if(!fs.existsSync(name)) return console.log('文件不存在！')
    // 如果有/则是文件夹
    if(name.indexOf('/') !== -1){
        fs.rmdir(name, (err)=>{
            if(err) throw err
            console.log(`删除${name}文件夹成功！`)
        })
    }else{
        fs.unlink(name, (err)=>{
            if(err) throw err
            console.log(`删除${name}成功！`)
        })
    }
}

// 重命名
function rename(oldname, name){
    if(!fs.existsSync(oldname)) return console.log('文件不存在！')    
    fs.rename(oldname, name, (err)=>{
        if(err) throw err
        console.log('重名名成功！')
    })
}

// 移动文件
function move(name, target){
    console.log('移动文件')
}

// 复制文件
function copy(name, newname){
    
}
