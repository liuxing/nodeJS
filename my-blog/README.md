# blog build with express

## 目录结构
- models: 存放操作数据库的文件
- public: 存放静态文件，如样式、图片等
- routes: 存放路由文件
- views: 存放模板文件
- index.js: 程序主文件
- package.json: 存储项目名、描述、作者、依赖等等信息

## 依赖
1. express: web 框架
2. express-session: session 中间件
3. connect-mongo: 将 session 存储于 mongodb，结合 express-session 使用
4. connect-flash: 页面通知提示的中间件，基于 session 实现
5. ejs: 模板
6. express-formidable: 接收表单及文件的上传中间件
7. config-lite: 读取配置文件
8. marked: markdown 解析
9. moment: 时间格式化
10. mongolass: mongodb 驱动
11. objectid-to-timestamp: 根据 ObjectId 生成时间戳
12. sha1: sha1 加密，用于密码加密
13. winston: 日志
14. express-winston: 基于 winston 的用于 express 的日志中间件

## 部署
- pm2  `npm install pm2 -g`
 
修改 package.json，添加 start 的命令：
```javascript
"scripts": {
  "start": "NODE_ENV=production pm2 start index.js --node-args='--harmony' --name 'myblog'"
}
```

pm2 常用命令:

1. pm2 start/stop: 启动/停止程序
2. pm2 reload/restart [id|name]: 重启程序
3. pm2 logs [id|name]: 查看日志
4. pm2 l/list: 列出程序列表
5. 更多命令请使用 pm2 -h 查看。
*supervisor --harmony index 启动*