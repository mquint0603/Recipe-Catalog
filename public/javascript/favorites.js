$(document).ready(() =>{

    let localStorage = window.localStorage

    let favs;

    if (localStorage.favs) {
        favs = JSON.parse(localStorage.favs)
    } else {
        alert("Sorry you don't have any favorites currently")
    }

    $.ajax("/api/recipes/favorites", {
        type: "POST",
        data: {
            favorites: favs
        }
    }).then(res => {
        console.log(res)

        var app1 = new Vue({
            el: "#app-1",
            data: {
                recipes: res
            }
        })
    })
})