const Sequelize = require('sequelize');

//方法1:单独传递参数
const sequelize = new Sequelize('blog', 'root', '158269', {
    host: '47.75.84.250',
    dialect:  'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

module.exports = sequelize;
