const path = require('path')
const crypto = require('crypto')
const pbkdf2Async = require('bluebird').promisify(crypto.pbkdf2)
const TOKEN_DEMO = require('../../service/db_connect')
const logger = require('../../util/logger/logger')
const resourceFoundError = require('../../errors/resource_found_error')
const UserModel = path.join(__dirname, '../../models/user')
const tokenOpt = require('../../util/token/index')
const User = TOKEN_DEMO.import(UserModel)

const getUserById = async (id) => {
  try {
    const userInfo = await User.findOne({
      where: {
        id
      }
    })
    return userInfo
  } catch (err) {
    throw err
  }
  
}

const login = async (ctx) => {
  try {
    const userinfo = ctx.request.body
    const {username, password} = userinfo
    const curUser = await getUserByName(username)
    if (!curUser) {
      throw new resourceFoundError('user_name',username , '用户不存在，请进行注册')
    }
    const cipher = await pbkdf2Async(password, 'sdksdjkajksjdk', 1000, 64, 'sha512')
    if (curUser.password === cipher.toString('hex')) {
      // 使用json web token生成token
      const token = tokenOpt.sign({username}, ctx)
      return token
    } else {
      throw new Error('用户名或密码错误')
    }
   
  } catch (error) {
    throw error
  }
}

const register = async (ctx) => {
  try {
    const {username, password} = ctx.request.body
    const user = await getUserByName(username)
    if(user !== null) {
      throw new Error(`${username}用户已存在`)
    }
    const cipher = await pbkdf2Async(password, 'sdksdjkajksjdk', 1000, 64, 'sha512')
    console.log(cipher.toString('hex'))
    const result = await User.create({user_name: username, password: cipher.toString('hex')})
    logger.info(`------用户${username}注册成功--------`)
    return true
  } catch (error) {
    throw error
  }
}

const getUserByName = async (user_name) => {
  const userInfo = await User.findOne({
    where: {
      user_name
    }
  })
  return userInfo
}
module.exports = {
  getUserById,
  register,
  login,
  getUserByName
}
