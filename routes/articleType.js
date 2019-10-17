const ArticleType = require('./../models/articleType');
const {responseClient} = require('./../util/util');

exports.addType = (req, res) => {
    let {type} = req.body;
    if(!type){
        responseClient(res, 400, 2, "文章类型不能为空");
        return;
    }
    ArticleType.create({type:type}).then((response)=>{
        console.log(response);
        responseClient(res, 200, 0, '添加成功', )
    }).catch((err)=>{
        responseClient(res, 500, 0, '服务器错误',{err:err});
    })
};

exports.delType = (req, res) => {
    let {id} = req.body;
    ArticleType.destroy({where:{id:id}}).then((response)=>{
        responseClient(res, 200, 0, '删除成功', )
    }).catch((err)=>{
        responseClient(res, 500, 0, '服务器错误',{err:err});
    })
};

exports.getTypes = (req, res) => {
    ArticleType.findAll().then((response)=>{
        responseClient(res, 200, 0, '操作成功',{rows:response} );
    }).catch((err)=>{
        responseClient(res, 500, 0, '服务器错误',{err:err});
    })
};

