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
            keywords: keywords,
            username: $("#chef").val().tri()
        }

        $.ajax("/api/recipes", {
        type: "POST",
        data: recipePost
        }).then(
        function() {
            console.log("new recipe posted");

        }
        );
    })

    $("#searchSubmitButton").on("click", function(event) {
        event.preventDefault()
        var searchQuery = {
            category: $("#search-category").val(),
            search: $("#search-box").val().trim()
        }

        console.log("the button was clicked")
        window.location.replace("/api/recipes/keyword/cheese");
    })
})