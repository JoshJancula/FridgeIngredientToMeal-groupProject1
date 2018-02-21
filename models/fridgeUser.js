var Promise = require('bluebird')
var bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'))

module.exports = function(sequelize, DataTypes) {
  var fridgeUser = sequelize.define("fridgeUser", {
    email: { // email address
     id: { // we will use this as primary key
      type: DataTypes.INTEGER,
      primaryKey: true
    },
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: { // the users password
        type: DataTypes.STRING,
        allowNull: false,
        len: [1]
    },
    username: { // their username
        type: DataTypes.STRING,
         unique: true,
        allowNull: false,
        len: [1]
    }
   
     
    
  });
 fridgeUser.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };
  // Hooks are automatic methods that run during various phases of the User Model lifecycle
  // In this case, before a User is created, we will automatically hash their password
  fridgeUser.hook("beforeCreate", function(user) {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
  });
  return fridgeUser;
};