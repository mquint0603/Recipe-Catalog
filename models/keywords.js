module.exports = function(sequelize, DataTypes) {
    var Keyword = sequelize.define("Keywords", {
        name: DataTypes.STRING,
    });
  
    //Keyword.hasMany(Recipe, { through: 'RecipeKeyword' });
    return Keyword;
};
  