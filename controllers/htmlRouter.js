const db = require("../models")

module.exports = function(app) {

    // ===========================================================
    // HTML ROUTES
    // ===========================================================

    // Renders the list of all recipes on index.handlebars
    app.get("/recipes", (req, res) => {

        db.Recipe.findAll({}).then((data) => {

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
                }
            ]
        }).then(data => {

            var hbsObject = {
                recipes: data
            }

            res.render("index", hbsObject)
        })
    })

}
