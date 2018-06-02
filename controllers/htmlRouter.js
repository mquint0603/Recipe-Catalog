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
            console.log(hbsObject.recipes)
            
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

    app.get("/recipes/chef/:chef", (req, res) => {
        console.log(req.params.chef)

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

            var hbsObject = {
                recipe: recipe[0].dataValues
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
