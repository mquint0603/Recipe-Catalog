module.exports = function(sequelize, DataTypes) {

    var Keyword = sequelize.define("Keyword", {
      keyword: DataTypes.STRING,
    }, {
      timestamps: false
    });

    Keyword.associate = function(models) {
      models.Keyword.belongsToMany(models.Recipe, {
          through: "recipe_keyword", 
          foreignKey: 'KeywordId'
      })
    };

    return Keyword;

};
  