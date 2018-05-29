var request =  require("request") 
var query = require("./controllers/router.js")
module.exports= 
    request("http://food2fork.com/api/search?key=c1cf6a39d70a947671340e3d99794558&q=" + query + "&count=5", function(error, response, body) {

        if (!error && response.statusCode === 200) {

        var recipes = JSON.parse(body).recipes;

        for (let id of recipes) {
            request("http://food2fork.com/api/get?key=c1cf6a39d70a947671340e3d99794558&rId=" + id.recipe_id, function(error, response, body) {
                
                var apiRecipe = {
                    title: JSON.parse(body).recipe.title,
                    ingredents: JSON.parse(body).recipe.ingredients,
                    image_url: JSON.parse(body).recipe.image_url,
                    source_url: JSON.parse(body).recipe.source_url
                }

                console.log(apiRecipe)
            })
        }
        }
    });  