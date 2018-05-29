var db = require("../models");

module.exports = function(app) {

    app.get("/api/recipes", function (req, res) {
       var query = {};
       if(req.query.chef_id) {
           query.ChefID = req.query.chef_id;
       }

       db.Recipe.findAll({
           where: query,
           include: [db.Chef]
       }).then(function(dbRecipe) {
           res.json(dbRecipe);
       });
    });

    app.get("/api/recipes/:id", function (req, res) {
        db.Recipe.findOne({
            where: {
                id: req.params.id
            },
            include: [db.Chef]
        }).then(function(dbRecipe) {
            res.json(dbRecipe);
        });
    });

    app.get("/api/recipes/:category", function(req,res) {
        db.Recipe.findAll({
            where: {
                category: req.params.category
            },
            include: [db.Chef]
        }).then(function(dbRecipe) {
            res.json(dbRecipe);
        });
    });

    app.post("/api/recipes", function(req,res) {
        db.Recipe.create(req.body).then(function(dbRecipe) {
            res.json(dbRecipe);
        });
    });

    app.post("/api/chef", function(req, res) {
        db.Chef.create(req.body).then(function(dbChef) {
            res.json(dbChef);
        });
    })


    app.get("/recipes", (req, res) => {

        db.Recipe.findAll({}).then((data) => {

            var hbsObject = {
                recipes: data
            }
    
            res.render("index", hbsObject)

        })
    })
      
    app.get("/recipes/:id", (req, res) => {
        db.chef.findOne({
            where: {
                id: req.params.id
            }
            .then(function (dbRecipe) {
                res.json(dbRecipe)
            })
        })
    })

    app.get("/recipes/:category", (req, res) => {
        db.Recipe.findAll({
            where: {
                category: req.params.category
            }
        }).then(function(dbRecipe) {
            res.json(dbRecipe);
        })
    })
}

