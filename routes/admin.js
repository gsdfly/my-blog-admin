const Admin = require('./../models/admin');
const {responseClient, timestampToTime, md5} = require('./../util/util');
const jwt = require('jsonwebtoken');
const redis = require('redis');


//后台用户登出，登出的话需要用到redis
exports.logout = (req, res) => {
    const client = redis.createClient(6379, '127.0.0.1');
    let token = req.headers.token || (req.headers.authorization ? req.headers.authorization.split(' ')[1]:'');
    client.srem('token',token,function(err,value){
        responseClient(res, 200, 0, "退出成功");
    })
};
//后台用户登录
exports.login = (req, res) => {
    let {nickname, pwd} = req.body;
    if (!nickname) {
        responseClient(res, 400, 2, "用户名不能为空");
        return;
    }
    if (!pwd) {
        responseClient(res, 400, 2, "密码不能为空")
        return;
    }
    Admin.findOne({where: {nickname: nickname}}).then((response) => {
        if (response) {
            let mdPwd = md5(pwd);
            if (response.pwd === mdPwd) {
                let token = jwt.sign({
                    exp: Math.floor(Date.now() / 1000) + (60 * 60 * 6),
                    id: response.id,
                    nickname: response.nickname,
                }, 'secret');
                //登录成功将token存入redis
                const client = redis.createClient(6379, '127.0.0.1');
                client.sadd('token',token,function(err,value){
                    responseClient(res, 200, 0, '登录成功', {token: token})
                });
            } else {
                responseClient(res, 400, 1, '用户名或者密码错误');
            }
        } else {
            responseClient(res, 400, 2, '没有该用户，请先注册')
        }
    }).catch((err)=>{
        responseClient(res, 500, 0, '服务器错误',{err:err});
    })
};
//新增后台用户
exports.addAdmin = (req, res) => {
    let {nickname, pwd} = req.body;
    if (!nickname) {
        responseClient(res, 400, 2, "用户名不能为空")
        return;
    }
    if (!pwd) {
        responseClient(res, 400, 2, "密码不能为空")
        return;
    }
    Admin.findOne({where: {nickname: nickname}}).then((response) => {
        if (response) {
            responseClient(res, 400, 2, '该用户名已存在')
        } else {
            Admin.create({nickname: nickname, pwd: md5(pwd)}).then((response2) => {
                if (response2) {
                    responseClient(res, 200, 0, '操作成功');
                }
            }).catch((err)=>{
                responseClient(res, 500, 0, '服务器错误',{err:err});
            })
        }
    }).catch((err)=>{
        responseClient(res, 500, 0, '服务器错误',{err:err});
    })
};

//获取用户列表
exports.getAdmins = (req, res) =>{
  Admin.findAll().then(response=>{
      responseClient(res,200,0,'操作成功',{rows:response})
  }).catch((err)=>{
      responseClient(res, 500, 0, '服务器错误',{err:err});
  })
};
//将数据库报错提取出来了，暂时先不用吧
// function resultHandle(promise,options,cb,res){
//     promise(options).then(cb).catch((err)=>{
//         responseClient(res, 500, 0, '服务器错误',{err:err});
//     })
// }
//删除用户
exports.delAdmin = (req, res) => {
    let {id} = req.body;
  Admin.destroy({where:{id:id}}).then(()=>{
      responseClient(res,200,0,'操作成功',{});
  }).catch((err)=>{
      responseClient(res, 500, 0, '服务器错误',{err:err});
  })
};

