
window.onload = async function() {
    let gameSelectId = await localStorage.getItem("gameSelectId") || "3030-57912";
    let gameObject = await queryGameSelect(gameSelectId);
    $("#game_image").attr("src", gameObject.image.medium_url);
    $("#game_title").html(gameObject.name);
    $("#game_description").html(gameObject.deck);

    console.log(gameObject);
    document.getElementsByTagName("html")[0].style.visibility = "visible";
}