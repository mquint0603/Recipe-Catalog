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
    var app1 = new Vue({
        el: "#app-1",
        data: {
            recipes: res
        },
        methods: {
            deleteFav: function(event) {
                let recipeId = event.target.dataset.id
                let favs = JSON.parse(localStorage.favs)
                let index = favs.indexOf(recipeId)
                favs.splice(index, 1);
                localStorage.setItem('favs', JSON.stringify(favs))
                window.location.reload()
            }
        }
    })
})