$(document).ready(() =>{

    var favs = {
        favorites: [1, 2, 3]
    }

    $.ajax("/api/recipes/favorites", {
        type: "POST",
        data: {
            favorites: favs
        }
    }).then(res => {
        console.log(res)
    })

})