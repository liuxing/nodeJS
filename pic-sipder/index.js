const superAgent = require('superagent')
const cheerio = require('cheerio')
const fs = require('fs')

const URL = 'http://www.haha.mx/topic/1/new'
const urlController = []

/**
 * 获取图片链接
 * @param href
 * @param page
 */
function getImgUrl(href, page) {
    console.log('正在获取第'+page+'页的图片')
    superAgent
        .get(href+'/'+page)
        .end((err, data)=>{
            if(err) return console.error(err)
            $ = cheerio.load(data.text)
            let _img = $('.joke-list-item .joke-main-img')
            _img.each((i, item)=>{
                let src = item.attribs.src
                if(src.indexOf("http://image.haha.mx") > -1){
                    urlController.push(src.replace('small', 'big'))
                }
            })
            if(page < pages){
                getImgUrl(href, ++page)
            }else {
                console.log(`获取链接完毕，开始下载...(共${urlController.length}个)`)
                downImg(urlController.shift())
            }
        })
}

/**
 * 下载图片保存到本地
 * @param imgUrl
 */
function downImg(imgUrl) {
    let name = imgUrl.split('_').pop()
    fs.exists('images/'+name, function (exist) {
        if(exist){
            return console.log('images/'+name,'已存在')
        }
        superAgent
            .get(imgUrl)
            .end(function (err, data) {
                if(err){
                    console.log('images/'+name,'error')
                }
                fs.writeFile('images/'+name, data.body, function (err) {
                    console.log('images/'+name,'success')
                })
            })
    })

    if(urlController.length > 0){
        downImg(urlController.shift())
    }
}


let pages = 2,
    startPage = 1;

(function init() {
    console.log('开始爬取')
    getImgUrl(URL, startPage)
})()