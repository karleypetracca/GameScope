
window.onload = async function() {
    let gameSelectId = await localStorage.getItem("gameSelectId");
    let gameObject = await queryGameSelect(gameSelectId);
    $("#game_title").html(gameObject.name);
    $("#game_image").attr("src", gameObject.image.medium_url);
    console.log(gameObject);
    let releaseDate = await this.localStorage.getItem("release date");
    let Platform = await this.localStorage.getItem("Platform");
   
    document.getElementsByTagName("html")[0].style.visibility = "visible";
    console.log(releaseDate);
    $("#game_release_date").html(releaseDate);
    $("#platform").html(Platform);

    
}

// release date  - will need a local storage 
// platforms 

// build cards method to format 
