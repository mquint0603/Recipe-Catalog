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
            var postRoute = "/recipes/id/" + data.id;

            window.location.href = postRoute;

            $("#post-form").trigger("reset");
        }
        );
    })

    $("#searchSubmitButton").on("click", function(event) {
        event.preventDefault()

        var searchQuery = {
            category: $("#search-category").val(),
            search: ""
        }

        if($("#search-category").val() == "category") {
            searchQuery.search = $("#search-options").val();
        }else {
            searchQuery.search = $("#search-box").val().trim();
        }

        var queryRoute = "/recipes/" + searchQuery.category + "/" + searchQuery.search;

        console.log(queryRoute)
       
        window.location.href = queryRoute

        $("#search-form").trigger("reset");

    })

    $(".favorite").on("click", function(event) {
        event.preventDefault()

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
    
    $(".search-button").on("click", function() {
        $("#search-box").hide()
        $("#search-options").hide()
    })
    
    $("#search-category").on("click", function(){

        if($("#search-category").val() == "category") {
            $("#search-box").hide()
            $("#search-options").show()
        } else {
            $("#search-box").show()
            $("#search-options").hide()
        }
    })

})