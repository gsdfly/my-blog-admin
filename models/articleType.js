const Sequelize = require('sequelize');
const sequelize = require('./../core/seqdb');

const ArticleType = sequelize.define('article_type', {
    // 属性
    type: {
        type: Sequelize.STRING,
        allowNull: false
    },
}, {
    // 参数
    freezeTableName: true,
});
// ArticleType.sync({ force: true });
module.exports = ArticleType;
