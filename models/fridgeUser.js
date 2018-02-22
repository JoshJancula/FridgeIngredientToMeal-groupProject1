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
    
  }); // check to make sure password is correct
 fridgeUser.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };
 // before we create the user encrypt the password
  fridgeUser.hook("beforeCreate", function(user) {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
  });
  
   fridgeUser.associate = function(models) {
    // Associating the user with their saved recipes
    fridgeUser.hasMany(models.Recipe, {
      onDelete: "cascade"
    });
  };
  return fridgeUser;
};