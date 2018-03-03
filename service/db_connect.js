const Sequelize = require('sequelize');
const TOKEN_DEMO = new Sequelize('mysql://root:qq649967242@localhost/TOKEN-DEMO', {
  define: {
    timestamps: false
  }
})
module.exports = TOKEN_DEMO
// 测试数据库连接
// TOKEN_DEMO
//   .authenticate()
//   .then(() => {
//     console.log('Connection has been established successfully.');
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err);
//   });