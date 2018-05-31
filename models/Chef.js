module.exports = function(sequelize, DataTypes) {

    var Chef = sequelize.define("Chef", {
        username: DataTypes.STRING,
    }, {
        timestamps: false
    });
    
    //Sets up the has many association for chefs to recipes
    Chef.associate = function(models) {
        models.Chef.hasMany(models.Recipe, { 
            onDelete: "cascade"
        })
    };
    
    return Chef;

};