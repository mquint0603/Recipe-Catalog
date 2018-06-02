$(document).ready(() =>{

    alert("Hello World")

    $.ajax("api/recipes/favorites", {
        type: "POST",
        data: [1, 2, 5]
    }).then(res => {
        console.log(res)
    })

})