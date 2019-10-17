const Sequelize = require('sequelize');
const sequelize = require('./../core/seqdb');
// `name` varchar(32) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
//     `nickname` varchar(32) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
//     `phone` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
//     `pwd` varchar(32) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
const User = sequelize.define('user', {
    // 属性
    nickname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    pwd: {
        type: Sequelize.STRING,
        allowNull: false
    },
    phone: {
        type: Sequelize.STRING,
        allowNull: false
    },
    actualname: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    // 参数
    freezeTableName: true,
});
User.sync({ force: true });
module.exports = User;
