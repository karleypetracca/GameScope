<<<<<<< HEAD
console.log(a)
=======

window.onload = async function() {
    let gameSelectId = await localStorage.getItem("gameSelectId");
    let gameObject = await queryGameSelect(gameSelectId);
    $("#game_title").html(gameObject.name);
    $("#game_image").attr("src", gameObject.image.medium_url);
    console.log(gameObject);
    document.getElementsByTagName("html")[0].style.visibility = "visible";
}
>>>>>>> 79fe6b48efa366f5b64e74225c872927198caec0
