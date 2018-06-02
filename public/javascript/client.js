$(document).ready(function() {

    'use strict'
    
    let localStorage = window.localStorage



    $("#postSubmitButton").on("click", function(event) {

        event.preventDefault();
        
        let keywordString = $("#keyword").val().trim();
        let keywords = keywordString.split(",")

        var recipePost = {
            title: $("#title").val().trim(),
            ingredients: $("#ingredients").val().trim(),
            directions: $("#directions").val().trim(),
            description: $("#description").val().trim(),
            category: $("#category").val().trim(),
            keywords: keywords,
            username: $("#chef").val().trim()
        }

        $.ajax("/api/recipes", {
        type: "POST",
        data: recipePost
        }).then(
        function(data) {
            console.log(data);

            window.location.replace("/recipes/id/" + data.id)
        }
        );
    })

    $("#searchSubmitButton").on("click", function(event) {
        event.preventDefault()

        var searchQuery = {
            category: $("#search-category").val(),
            search: $("#search-box").val().trim()
        }
       
        window.location.replace("recipes/" + searchQuery.category + "/" + searchQuery.search);
    })

    $(".favorite").on("click", function(event) {

        let favs;

        if (localStorage.favs) {
            favs = JSON.parse(localStorage.getItem("favs"))
        } else {
            favs = []
        }

        let fav = event.target.dataset.id

        favs.push(fav)

        localStorage.setItem("favs", JSON.stringify(favs))


    })
    
})