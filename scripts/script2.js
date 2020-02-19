
// runs once window is ready to load
window.onload = async function() {
    let gameSelectId = await localStorage.getItem("gameSelectId") || "3030-57912";
    let gameObject = await queryGameSelect(gameSelectId);
    console.log(gameObject);

    $("body").css("background", `url("${gameObject.image.original_url}") no-repeat center center fixed`);
    $("#game_image").attr("src", gameObject.image.medium_url);
    $("#game_title").html(gameObject.name);
    $("#game_description").html(gameObject.deck);

    // build expected release field
    if (gameObject.original_release_date) {
        // check year
        if (gameObject.expected_release_year === null) {
            gameObject.expected_release_year = Number(gameObject.original_release_date.substring(0,4));
        }
        // check month
        if (gameObject.expected_release_month === null) {
            gameObject.expected_release_month = Number(gameObject.original_release_date.substring(5,7));
        }
        // check day
        if (gameObject.expected_release_day === null) {
            gameObject.expected_release_day = Number(gameObject.original_release_date.substring(8));
        }
    }

    let month = [ "none", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let releaseDate = "";

    let dateString = "";
    if (gameObject.expected_release_year < 2020) {
        dateString = "Released: "
    } else {
        dateString = "Expected Release: "
    }

    if (gameObject.expected_release_month && gameObject.expected_release_day){
        releaseDate = dateString + month[gameObject.expected_release_month] + " " + gameObject.expected_release_day + ", " + gameObject.expected_release_year;
    } else if(gameObject.expected_release_month){
        releaseDate = dateString + month[gameObject.expected_release_month] + " " + gameObject.expected_release_year;
    } else if (gameObject.expected_release_year){
        releaseDate = dateString + gameObject.expected_release_year;
    } else {
        releaseDate = dateString + (gameObject.expected_release_year);
    }

    // build platforms field
    let platformList = 'Platforms:'
    if (gameObject.platforms) {
        gameObject.platforms.map(platform => {
            platformList += ` ${platform.name},`;
        })
        platformList = platformList.substring(0,(platformList.length-1))
    } else {
        platformList += ' Unknown';
    }

    // run news population function for game
    await buildCards(gameObject);
   
    // populate game information
    document.getElementsByTagName("html")[0].style.visibility = "visible";
    $("#game_release_date").html(releaseDate);
    $("#game_platform").html(platformList);
    $("#game_long_description").html(gameObject.description);
    $("#game_long_description a").href("#");    
}

// populate news cards if news found
async function buildCards(gameObject) {
    let cardContainer = document.getElementById('card-container');
    let news = await newsLookup(gameObject.name);
    await initListOfTasks();

    async function initListOfTasks() {
        cardContainer.innerHTML = "";

        await news.map((paper) => {
            createTaskCard(paper);
        })

        function createTaskCard(paper) {
            let card = document.createElement('div');
            card.className = 'card';
            card.id = "card";
           
            let cardBody = document.createElement('div');
            cardBody.className = 'card-body';
            let title = document.createElement('h5');
            title.innerText = paper.title;
            title.className = 'card-header';

            let cardText = document.createElement('p');
            cardText.innerText = paper.description;
            cardText.className = 'card-text';
            let cardText2 = document.createElement('p')
            cardText2.innerText = "View Article";
            cardText2.className = 'card-text card-text2';

            cardText2.addEventListener("click", async function(event) {
                event.preventDefault();
                window.location.href=paper.url;
            });
    
            card.appendChild(title);
            cardBody.appendChild(cardText)
            cardBody.appendChild(cardText2)
            card.appendChild(cardBody);
            
            cardContainer.appendChild(card);
        }
    }
}

// lookup into news API based on game name
async function newsLookup(gameName) {
    let newObject = [];
    let apiUrl = await `https://cors-anywhere.herokuapp.com/http://newsapi.org/v2/everything?qInTitle=\"${gameName}\"&from=2020-01-30&sortBy=publishedAt&domains=gamespot.com,ign.com,androidcentral.com,comicbook.com,siliconera.com,playstationlifestyle.net,vgchartz.com,imore.com,windowscentral.com&apiKey=0ab09aaa807c43ef9016db62cfa6304d&language=en`;
    const response = await get(apiUrl);

    try {
        await response.articles.map(function(element, i) {
            if (i < 5) {
                newObject.push(element);
            } 
        });
        console.log(newObject[0].description);
        console.log(newObject[0].url);

        document.querySelector("#news_title").style.visibility = "visible";
        document.querySelector("#card-container").style.visibility = "visible";

        return await newObject;
    }

    catch (error) {
        return [];
    }
}
