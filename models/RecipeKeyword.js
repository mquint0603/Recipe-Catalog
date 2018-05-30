module.exports = function(sequelize, DataTypes) {

    var RecipeKeyword = sequelize.define("recipe_keyword", {}, { timestamps: false });
    
    return RecipeKeyword;

};