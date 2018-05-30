var db = require("../models");

module.exports = function(app) {

    // ===========================================================
    // API ROUTES
    // ===========================================================
    
    // Gets all Recipes and their Keywords
    app.get("/api/recipes", function (req, res) {

        db.Recipe.findAll({
            include: [
                db.Keyword
            ]
        }).then((data) => {
            res.json(data)
        })

    });

    app.get("/api/recipes/:id", function (req, res) {
        db.Recipe.findOne({
            where: {
                id: req.params.id
            },
            include: [
                db.Keyword
            ]
        }).then((data) => {
            res.json(data);
        });
    });

    app.get("/api/recipes/:category", function(req,res) {
        db.Recipe.findAll({
            where: {
                category: req.params.category
            },
            include: [
                db.Keyword
            ]
        }).then(function(dbRecipe) {
            res.json(dbRecipe);
        });
    });

    app.get("/api/recipes/keyword/:keyword", (req, res) => {

        db.Recipe.findAll({
            include: [
                {
                    model: db.Keyword, 
                    where: {
                        keyword: req.params.keyword
                    }
                }
            ]
        }).then(data => {
            res.json(data)
        })
    })

    app.post("/api/chef", function(req, res) {
        db.Chef.create(req.body).then(function(dbChef) {
            res.json(dbChef);
        });
    })

    // ===========================================================
    // HTML ROUTES
    // ===========================================================

    app.get("/recipes", (req, res) => {

        db.Recipe.findAll({}).then((data) => {

            var hbsObject = {
                recipes: data
            }

            console.log(hbsObject)
    
            res.render("index", hbsObject)

        })
    })
      
    app.get("/recipes/:id", (req, res) => {
        db.Recipe.findOne({
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