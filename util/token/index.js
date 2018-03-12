const SECRET = 'asdakdshjk';
const JWT = require('jsonwebtoken')

const sign = (userinfo, ctx) => {
  try {
    return JWT.sign(userinfo, SECRET)
  } catch (error) {
    ctx.throw(403, 'token生成失败')
  }
  
}

const verify = (token, ctx) => {
  try {
    return JWT.verify(token, 'asdakdshjk')
  } catch (error) {
    ctx.throw(403, '无效token')
  }
}

module.exports = {
  sign,
  verify
}