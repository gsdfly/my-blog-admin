var express = require('express');
const article = require('./article');
const admin = require('./admin');
const articleType = require('./articleType');
const jwt = require('jsonwebtoken');
const redis = require('redis');
const {responseClient, timestampToTime, md5,getQnToken} = require('./../util/util');

var router = express.Router();

//添加中间件
router.use('/admin/*',function (req,res,next) {
  let reqPath = req.baseUrl;
  if (!(reqPath.indexOf('login') != -1 || reqPath.indexOf('register') != -1)) {
    let token = req.headers.token || (req.headers.authorization ? req.headers.authorization.split(' ')[1]:'');
    if(!token){
      responseClient(res,401,0,'请先登录');
      return;
    }
    try{
      //先判断redis中是否存在token，若没有，就是退出登录的用户。
      const client = redis.createClient(6379, '127.0.0.1');
      //这里直接插入token 因为存储的数据结构为set，由此可以判断token是否成功
      client.sadd('token',token,function (err,value) {
        if(value==1){
          responseClient(res,401,'token已过期，请重新登录');
        }else {
          let obj = jwt.verify(token, 'secret');
          if (new Date().getTime() > obj.exp * 1000) {
            responseClient(res,401,'token已过期，请重新登录');
          }else {
              req.body.admin_id = obj.id;
            next();
          }
        }
      });
    }catch (e) {
      responseClient(res,401,0,'token错误');
    }
  }else {
    next();
  }
});
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/getArticle', article.getArticles);
// 后台接口
router.post('/admin/login', admin.login);
router.get('/admin/logout',admin.logout)
//用户
router.post('/admin/addAdmin', admin.addAdmin);
router.get('/admin/getAdmins', admin.getAdmins);
router.post('/admin/delAdmin', admin.delAdmin);
//文章
router.get('/admin/getArticles',article.getArticles);
router.get('/admin/getArticle',article.getArticle);
router.post('/admin/delArticle',article.delArticle);
router.post('/admin/addArticle',article.addArticle);
router.post('/admin/updateArticle',article.updateArticle);
//文章类型
router.get('/admin/getTypes',articleType.getTypes);
router.post('/admin/addType',articleType.addType);
router.post('/admin/delType',articleType.delType);
//七牛文件上传
router.get('/admin/qiniuToken',function (req,res) {
  let token = getQnToken();
  responseClient(res,200,0,'操作成功',{token:token})
});

module.exports = router;
