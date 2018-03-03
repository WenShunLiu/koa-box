module.exports = (sequelize, DataTypes) => {
  return sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    user_name: {
      type: DataTypes.CHAR(128),
      allowNull: false,
    },
    password: {
      type: DataTypes.CHAR(128),
      allowNull: false,
    }
  }, {
    tableName: 'users'
  })
}