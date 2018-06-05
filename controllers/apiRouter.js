var db = require("../models");

module.exports = function(app) {

    // ==============================================
    // Get Requests
    // ==============================================
    
    // Gets all Recipes and their Keywords
    app.get("/api/recipes", function (req, res) {

        db.Recipe.findAll({
            attributes: {
                exclude: ["ChefId"]
            },
            include: [
                {
                    model: db.Keyword
                },
                {
                    model: db.Chef
                }
            ]
        }).then((data) => {
            res.json(data)
        })

    });

    // Gets a specific recipe by its ID
    app.get("/api/recipes/id/:id", function (req, res) {
        db.Recipe.findOne({
            // attributes: {
            //     exclude: ["ChefId"]
            // },
            where: {
                id: req.params.id
            },
            include: [
                {
                    model: db.Keyword
                },
                {
                    model: db.Chef
                }
            ]
        }).then((data) => {
            res.json(data);
        });
    });

    // Gets a list of recipes by category
    app.get("/api/recipes/category/:category", function(req,res) {
        db.Recipe.findAll({
            attributes: {
                exclude: ["ChefId"]
            },
            where: {
                category: req.params.category
            },
            include: [
                {
                    model: db.Keyword
                },
                {
                    model: db.Chef
                }
            ]
        }).then(function(dbRecipe) {
            res.json(dbRecipe);
        });
    });

    // Gets a list of recipes that share the specified keyword
    app.get("/api/recipes/keyword/:keyword", (req, res) => {

        db.Recipe.findAll({
            attributes: {
                exclude: ["ChefId"]
            },
            include: [
                {
                    model: db.Keyword, 
                    where: {
                        keyword: req.params.keyword
                    }
                },
                {
                    model: db.Chef
                }
            ]
        }).then(data => {
            res.json(data)
        })

    })

    // ==============================================
    // Post Requests
    // ==============================================

    // Posts the new recipe to the database
    app.post("/api/recipes", (req, res) => {

        let keywords = req.body.keywords

        // Checks the database of Chef Username
        // If not in database it creates it
        db.Chef.findOrCreate({

            where:  {
                username: req.body.username
            }

        }).then(chef => {

            //Creates the new recipe
            db.Recipe.create({
    
                title: req.body.title,
                ingredients: req.body.ingredients,
                directions: req.body.directions,
                description: req.body.description,
                category: req.body.category,
                ChefId: chef[0].id
        
            }).then((recipe) => {
                
                // Loops over the keyword array
                // Creates new keyword entries if none exist
                for (let i = 0; i < keywords.length; i++ ) {
        
                    db.Keyword.findOrCreate({
                        where: {
                            keyword: keywords[i]
                        }
                    }).then((keyword) => {

                        // Associates the keyword created with 
                        // The recipe previously added to the d
                        recipe.addKeyword(keyword[0])
                        
                    })
        
                }
        
                res.json(recipe.dataValues)

        
            })
        })

    })

    app.post("/api/recipes/favorites", (req, res) => {
        let favorites = req.body.favorites


        db.Recipe.findAll({
            where: {
                id: favorites
            },
            include: [
                {
                    model: db.Chef
                }
            ]
        }).then(recipes => {
            res.json(recipes)
        })
    })
}