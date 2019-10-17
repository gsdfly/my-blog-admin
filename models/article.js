const Sequelize = require('sequelize');
const sequelize = require('./../core/seqdb');
const Admin = require('./admin');
const ArticleType = require('./articleType');
// `title` varchar(32) COLLATE utf8mb4_turkish_ci DEFAULT NULL,
//     `summary` varchar(100) COLLATE utf8mb4_turkish_ci DEFAULT NULL,
//     `img` varchar(100) COLLATE utf8mb4_turkish_ci DEFAULT NULL,
//     `content` text COLLATE utf8mb4_turkish_ci,
//     `create_time` varchar(32) COLLATE utf8mb4_turkish_ci DEFAULT NULL,
//     `user_id` int(11) DEFAULT NULL,
//     `acticle_type_id` int(11) DEFAULT NULL,
const Article = sequelize.define('article', {
    // 属性
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    img: {
        type: Sequelize.STRING,
        allowNull: false
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    admin_id: {
        type: Sequelize.INTEGER,
        references: {
            // 这是引用另一个模型
            model: Admin,
            // 这是引用模型的列名称
            key: 'id',
            // 这声明什么时候检查外键约束. 仅限PostgreSQL.
            deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        }
    },
    article_type_id: {
        type: Sequelize.INTEGER,
        references: {
            // 这是引用另一个模型
            model: ArticleType,
            // 这是引用模型的列名称
            key: 'id',
            // 这声明什么时候检查外键约束. 仅限PostgreSQL.
            deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        }
    },

}, {
    // 参数
    freezeTableName: true,
});

// Article.sync({ force: true });
module.exports = Article;
