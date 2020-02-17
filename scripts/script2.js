
window.onload = async function() {
    let gameSelectId = await localStorage.getItem("gameSelectId") || "3030-57912";
    let gameObject = await queryGameSelect(gameSelectId);
    console.log(gameObject);

    $("body").css("background", `url("${gameObject.image.original_url}") no-repeat center center fixed`);
    $("#game_image").attr("src", gameObject.image.medium_url);
    $("#game_title").html(gameObject.name);
    $("#game_description").html(gameObject.deck);

    let releaseDate = await localStorage.getItem("release_date");
    let Platform = await localStorage.getItem("platform");
   
    document.getElementsByTagName("html")[0].style.visibility = "visible";
    $("#game_release_date").html(releaseDate);
    $("#game_platform").html(Platform);
    $("#game_long_description").html(gameObject.description);    
}

// release date  - will need a local storage 
// platforms 

// build cards method to format 