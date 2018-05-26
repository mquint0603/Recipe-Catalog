var request =  require("request")
var userSearch = "mac and cheese"
var queryURL = 
  request("http://food2fork.com/api/search?key=c1cf6a39d70a947671340e3d99794558&q=" + userSearch + "&count=5", function(error, response, body) {

    if (!error && response.statusCode === 200) {

      var recipes = JSON.parse(body).recipes;

      for (let id of recipes) {
          request("http://food2fork.com/api/get?key=c1cf6a39d70a947671340e3d99794558&rId=" + id.recipe_id, function(error, response, body) {
              
              console.log(JSON.parse(body))
          })
      }
    }
});

module.exports = queryURL;