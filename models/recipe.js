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
      },

      directions: {
        type: DataTypes.TEXT,
        allowNull: false,
        len: [1]
      },
      
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        len: [1]
      },

      category: {
        type: DataTypes.STRING,
        allowNull: false,
        len: [1]
      }

    }, {
      timestamps: false
    });
  

    Recipe.associate = function(models) {
      models.Recipe.belongsToMany(models.Keyword, {
          through: "recipe_keyword", 
          foreignKey: 'RecipeId'
      })

      models.Recipe.belongsTo(models.Chef, {
        foreignKey: {
            allowNull: false
        }
      })

    };

    return Recipe;

  };
  