# mongoose

> Mongose就是一套操作MongoDB数据库的接口

- Schema
- Model
- Entity

## Schema 表结构
> 一种以文件形式存储的数据库模型骨架，不具备数据库的操作能力

```javascript
const mongoose = require("mongoose");

let kittySchema = kittySchema = mongoose.Schema({
    name: String
})
```

## Model
> 由Schema构造生成的模型，除了Schema定义的数据库骨架以外，还具有数据库操作的行为，类似于管理数据库属性、行为的类

```javascript
let Kitten = mongoose.model('Kitten', kittySchema)
```

## Entity
> 由Model创建的实体，他的操作也会影响数据库
```javascript
let silence = new Kitten({ name: 'Silence' })
console.log(silence.name) // 'Silence'
```

参见：
- [cnodejs.org](https://cnodejs.org/topic/548e54d157fd3ae46b233502)
- [cnodejs.org](https://cnodejs.org/topic/504b4924e2b84515770103dd)




