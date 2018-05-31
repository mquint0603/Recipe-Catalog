module.exports = function(sequelize, DataTypes) {
    var Chef = sequelize.define("Chef", {

        username: DataTypes.STRING,
        first_name: DataTypes.STRING, 
        last_name: DataTypes.STRING

    }, {
      timestamps: false
    });
  

    Chef.associate = function(models) {
      models.Chef.hasMany(models.Recipe, { 
          onDelete: "cascade"
      })
    };

    return Chef;

  };
  