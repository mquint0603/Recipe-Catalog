$(document).ready(function() {


    $("#postSubmitButton").on("click", function(event) {
        
        let keywordString = $("#keyword").val().trim();
        let keywords = keywordString.split(",")

        var recipePost = {
            title: $("#title").val().trim(),
            ingredients: $("#ingredients").val().trim(),
            directions: $("#directions").val().trim(),
            description: $("#description").val().trim(),
            category: $("#category").val().trim(),
            keywords: keywords
        }

        $.ajax("/api/recipes", {
        type: "POST",
        data: recipePost
        }).then(
        function() {
            console.log("new recipe posted");

            location.reload();
        }
        );
    })

    $("#searchSubmitButton").on("click", function(event) {
        var searchQuery = {
            category: $("#search-category").val(),
            search: $("#search-box").val().trim()
        }
        // var ajaxSearches = ["/api/recipes/keyword/", "/api/recipes/chef/", "/api/recipes/category/"]

        // console.log(searchQuery.category)
        // $.ajax("/api/recipes/" + searchQuery.category + "/" + searchQuery.search, {
        //     type: "GET",
        //     data: searchQuery
        //     }).then(
        //     function() {
        //         console.log("new search query");
               
        //         location.reload();
        //     }
        // );
        $(location).attr("href", api/recipe/keyword/cheese)
    })
})