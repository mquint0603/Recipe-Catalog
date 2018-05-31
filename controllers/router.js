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

    // Posts the new recipe to the database
    app.post("/api/recipes", (req, res) => {

        let keywords = req.body.keywords

        db.Recipe.create({
    
            title: req.body.title,
            ingredients: req.body.ingredients,
            directions: req.body.directions,
            description: req.body.description,
            category: req.body.category
    
        }).then((recipe) => {
    
            for (let i = 0; i < keywords.length; i++ ) {
    
                db.Keyword.findOrCreate({
                    where: {
                        keyword: keywords[i]
                    }
                }).then((keyword) => {
                    recipe.addKeyword(keyword[0])
                })
    
            }
    
            res.send("you have added a song to the database")
    
        })
    })
    // Gets a specific recipe by its ID
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

    // Gets a list of recipes by category
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

    // Gets a list of recipes that share the specified keyword
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

    // ===========================================================
    // HTML ROUTES
    // ===========================================================

    // Renders the list of all recipes on index.handlebars
    app.get("/recipes", (req, res) => {

        db.Recipe.findAll({}).then((data) => {

            var hbsObject = {
                recipes: data
            }

            console.log(hbsObject)
    
            res.render("index", hbsObject)

        })
    })

}