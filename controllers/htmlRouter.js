const db = require("../models")

module.exports = function(app) {

    // ===========================================================
    // HTML ROUTES
    // ===========================================================

    // Renders the list of all recipes on index.handlebars
    app.get("/recipes", (req, res) => {

        db.Recipe.findAll({
            include: [
                {
                    model: db.Chef
                }
            ]
        }).then((data) => {

            var hbsObject = {
                recipes: data
            }
 
            res.render("index", hbsObject)
            
        })
    })

    // Gets and renders list of recipes based on keyword searched
    app.get("/recipes/keyword/:keyword", (req, res) => {
        db.Recipe.findAll({
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

            var hbsObject = {
                recipes: data
            }

            res.render("index", hbsObject)
        })
    })

    // Gets and renders all recipes by a specific chef
    app.get("/recipes/chef/:chef", (req, res) => {

        db.Chef.findOne({
            where: {
                username: req.params.chef
            }
        }).then(chef => {
            db.Recipe.findAll({
                where: {
                    ChefId: chef.dataValues.id
                },
                include: [
                    { model: db.Chef }
                ]
            }).then((recipes) => {

                var hbsObject = {
                    recipes: recipes
                }

                res.render("index", hbsObject)

            })

        })

    })

    // Gets and renders the page for a specific recipe
    app.get("/recipes/id/:id", (req, res) => {
        db.Recipe.findAll({
            where: {
                id: req.params.id
            },
            include: [
                {
                    model: db.Chef
                }
            ]
        }).then(recipe => {

            easierRec = recipe[0].dataValues

            var recipeObj = {
                id: easierRec.id,
                title: easierRec.title,
                ingredients: [],
                description: easierRec.description,
                directions: easierRec.directions,
                category: easierRec.category,
                ChefId: easierRec.ChefId,
                Chef: {
                    username: easierRec.Chef.dataValues.username
                }
            }

            recipeObj.ingredients = easierRec.ingredients.split(",")

            var hbsObject = {
                recipe: recipeObj
            }

            res.render("recipe", hbsObject)
        })
    })

    app.get("/recipes/category/:category", (req, res) => {

        db.Recipe.findAll({
            where: {
                category: req.params.category
            },
            include: [
                {
                    model: db.Chef
                }
            ]
        }).then(recipes => {
            
            var hbsObject = {
                recipes: recipes
            }

            res.render("index", hbsObject)

        })
    })

}
