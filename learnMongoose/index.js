const User = require('./models/user')

// 储存
function insert() {
    let user = new User({
        username : 'Tracy McGrady',
        userpwd: 'abcd',
        userage: 37,
        logindate : new Date()
    })

    user.save(function (err, res) {
        if (err) {
            console.log("Error:" + err);
        }
        else {
            console.log("Res:" + res);
        }

    })
}


// insert()

// 更新

function update(){
    let wherestr = {'username' : 'Tracy McGrady'};
    let updatestr = {'userpwd': 'zzzz'};

    User.update(wherestr, updatestr, function(err, res){
        if (err) {
            console.log("Error:" + err);
        }
        else {
            console.log("Res:" + res);
        }
    })
}

// update();

// /找到一条记录并更新
function findByIdAndUpdate(){
    let id = '586c8697b33c922bac40a230';
    let updatestr = {'userpwd': '123456'};

    User.findByIdAndUpdate(id, updatestr, function(err, res){
        if (err) {
            console.log("Error:" + err);
        }
        else {
            console.log("Res:" + res);
        }
    })
}

// findByIdAndUpdate();

// 删除
function del(){
    let wherestr = {'username' : 'Tracy McGrady'};

    User.remove(wherestr, function(err, res){
        if (err) {
            console.log("Error:" + err);
        }
        else {
            console.log("Res:" + res);
        }
    })
}

del();