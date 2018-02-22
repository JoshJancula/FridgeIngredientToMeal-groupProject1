module.exports = function(sequelize, DataTypes) {
  var Recipe = sequelize.define("Recipe", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    ingredients: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    }
  });

  Recipe.associate = function(models) {
   
    Recipe.belongsTo(models.fridgeUser, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Recipe;
};
