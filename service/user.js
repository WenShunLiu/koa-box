const path = require('path')
const TOKEN_DEMO = require('../service/db_connect')
const UserModel = path.join(__dirname, '../models/user')

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

module.exports = {
  getUserById
}
