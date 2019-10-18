const Article = require('./../models/article');
const {responseClient} = require('./../util/util');

//查询全部文章
exports.getArticles = (req, res) => {
  let {pageNo=1,pageSize=10,type} = req.query;
  let options = {offset:(pageNo-1)*pageSize,limit:pageSize};
  if(type)options.where={article_type_id:type};
  Article.findAndCountAll(options).then((response)=>{
    responseClient(res,200,0,'操作成功',Object.assign({},response,{per_page:pageSize,current_page:pageNo}))
  }).catch((err)=>{
    responseClient(res, 500, 0, '服务器错误',{err:err});
  })
};
//新增文章
exports.addArticle = (req, res) => {
  let {title,img,content,summary,article_type_id,admin_id} = req.body;
  let arr = [[title,'标题'],[img,'文章封面'],[content,'文章内容'],[summary,'文章摘要'],[article_type_id,'文章类型'],[admin_id,'管理员ID']];
  for(let i=0;i<arr.length;i++){
    if(!arr[i][0]){
      responseClient(res, 400, 2, arr[i][1]+'不能为空',);
      return;
    }
  }
  Article.create({title:title,img:img,content:content,summary:summary,article_type_id:article_type_id,admin_id:admin_id}).then(()=>{
    responseClient(res, 200, 0, '操作成功' );
  }).catch((err)=>{
    responseClient(res, 500, 0, '服务器错误',{err:err});
  })
};

//修改文章
exports.updateArticle = (req, res) => {
  let {id,title,img,content,summary,article_type_id,admin_id} = req.body;
  let arr = [[id,'ID'],[title,'标题'],[img,'文章封面'],[content,'文章内容'],[summary,'文章摘要'],[article_type_id,'文章类型'],[admin_id,'管理员ID']];
  for(let i=0;i<arr.length;i++){
    if(!arr[i][0]){
      responseClient(res, 400, 2, arr[i][1]+'不能为空',);
      return;
    }
  }
  Article.update({title:title,img:img,content:content,summary:summary,article_type_id:article_type_id,admin_id:admin_id},{where:{id:id}}).then(()=>{
    responseClient(res, 200, 0, '操作成功' );
  }).catch((err)=>{
    responseClient(res, 500, 0, '服务器错误',{err:err});
  })

};
//删除文章
exports.delArticle = (req, res) => {
  let {id} = req.body;
  if(!id){
    responseClient(res, 400, 2, '文章ID不能为空',);
  }
  Article.destroy({where:{id:id}}).then((response)=>{
    responseClient(res, 200, 0, '操作成功',);
  }).catch((err)=>{
    responseClient(res, 500, 0, '服务器错误',{err:err});
  })
};
//查看单个文章
exports.getArticle = (req, res) => {
  let {id} = req.query;
  if(!id){
    responseClient(res, 400, 2, '文章ID不能为空',);
  }
  Article.findOne({where:{id:id}}).then((response)=>{
    responseClient(res, 200, 0, '操作成功',response );
  }).catch((err)=>{
    responseClient(res, 500, 0, '服务器错误',{err:err});
  })
};
