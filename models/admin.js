const Sequelize = require('sequelize');
const sequelize = require('./../core/seqdb');

const Admin = sequelize.define('admin', {
    // 属性
    nickname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    pwd: {
        type: Sequelize.STRING,
        allowNull: false
        // allowNull 默认为 true
    }
}, {
    // 参数
    freezeTableName: true,
});
// Admin.sync({ force: true });
module.exports = Admin;
