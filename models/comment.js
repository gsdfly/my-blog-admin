const Sequelize = require('sequelize');
const sequelize = require('./../core/seqdb');
const User = require('./user');
const Article = require('./article');
//  `content` text COLLATE utf8mb4_unicode_ci,
//     `create_time` varchar(32) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
//     `user_id` int(11) DEFAULT NULL,
//     `article_id` int(11) DEFAULT NULL,
//     `parent_id` int(11) DEFAULT NULL,
const Comment = sequelize.define('comment', {
    // 属性
    content: {
        type: Sequelize.STRING,
        allowNull: false
    },
    user_id: {
        type: Sequelize.INTEGER,
        references: {
            // 这是引用另一个模型
            model: User,
            // 这是引用模型的列名称
            key: 'id',
            // 这声明什么时候检查外键约束. 仅限PostgreSQL.
            deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        }
    },
    article_id: {
        type: Sequelize.INTEGER,
        references: {
            // 这是引用另一个模型
            model: Article,
            // 这是引用模型的列名称
            key: 'id',
            // 这声明什么时候检查外键约束. 仅限PostgreSQL.
            deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        }
    },
    parent_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, {
    // 参数
    freezeTableName: true,
});
Comment.sync({ force: true });
module.exports = Comment;
