"use strict";

// GLOBAL VARIABLES //

const apiKey = "6b4ac05b6e77823f1510fcb200250f6e07e11241";


// FUNCTIONS //


async function queryGameSelect(gameSelectId) {
    let gameObject = [];
    let gameSelectQuery = `https://www.giantbomb.com/api/game/${gameSelectId}/?api_key=${apiKey}&format=json`;
    
    const response = await get(gameSelectQuery);
    gameObject = await response.results;
    return gameObject;  
}

async function queryUrl() {
    let newObject = [];
    let inputYear = document.querySelector("#inputYear");
  
    
    let apiUrl = await `https://www.giantbomb.com/api/games/?api_key=${apiKey}&format=json&filter=expected_release_year:${inputYear.value}`;

    const response = await get(apiUrl);
    await response.results.map(element => {
        newObject.push(element);
    })
    return await filterQuery(releaseDateFix(newObject));
};

// attempts to replace expected release null values with original release date
function releaseDateFix(query) {
    let fixedQuery = []
    query.map(element => {
        if (element.original_release_date) {
            // check year
            if (element.expected_release_year === null) {
                element.expected_release_year = Number(element.original_release_date.substring(0,4));
            }
            // check month
            if (element.expected_release_month === null) {
                element.expected_release_month = Number(element.original_release_date.substring(5,7));
            }
            // check day
            if (element.expected_release_day === null) {
                element.expected_release_day = Number(element.original_release_date.substring(8));
            }
        }
        fixedQuery.push(element);
    })
    return fixedQuery;
}

// overall filter query with callback functions for month and platform
async function filterQuery(gameQuery) {
    let inputMonth = document.querySelector("#inputMonth");
    let inputPlatform = document.querySelector("#inputPlatform");

    return await filterByPlatform(filterByMonth(gameQuery));

    // callback function for filtering month
    function filterByMonth(gameQuery) {
        

        let monthsFiltered = [],
            monthHasReleases = false;
        if (inputMonth.value === "all") {
            return gameQuery;
        } else {
            gameQuery.forEach(element => {
                if (element.expected_release_month == inputMonth.value) {
                    // monthHasReleases = true;
                    monthsFiltered.push(element);
                }
            })
            if (monthHasReleases == true) {
                return monthsFiltered;
            } else {
                return [{name:null}];
            };
        }
    }

    // callback function for filtering platform
    function filterByPlatform(gameQuery) {
        let platformsFiltered = [],
            platformHasReleases = false;
        if (inputPlatform.value === "all") {
            return gameQuery;
        } else {
                if (gameQuery === [{name:null}]) {
                return [{name:null}];
            } else {
                gameQuery.forEach(element => {
                    console.log(element);
                    if (element.platforms) {
                        element.platforms.forEach(platform => {
                            if (platform.name === inputPlatform.value) {
                                platformHasReleases = true;
                                platformsFiltered.push(element);
                            }
                        })
                    }
                })
                if (platformHasReleases = true) {
                    return platformsFiltered;
                } else {
                    return [{name:null}];
                };
            }
        };
    }
};

// builds cards to populate on screen based on filtered query
async function buildCards() {
    let cardContainer = document.getElementById('card-container');

    let tasks = await queryUrl();

    await initListOfTasks();

    // clears cardContainer and adds cards if games were found based on filter
    async function initListOfTasks() {
        cardContainer.innerHTML = "";

        // checks if no results from filter
        await tasks.map((task) => {
            console.log("Creating task card", task);
            if (task.name === null) {
                let card = document.createElement('div');
                card.className = 'card';

                let noneFound1 = document.createElement("h5");
                let noneFound2 = document.createElement("h5");
                let noneFound3 = document.createElement("h5");
                noneFound1.innerText = "No games found.";
                noneFound2.innerText = "Please broaden ";
                noneFound3.innerText = "your search."

                card.appendChild(noneFound1);
                card.appendChild(noneFound2);
                card.appendChild(noneFound3);
                cardContainer.appendChild(card);
            } else {
                createTaskCard(task);
            }
        });
    }

    // assigns game details to card and adds it to screen
    function createTaskCard(task) {

        let card = document.createElement('div');
        card.className = 'card';

        let cardImg = document.createElement('div');
        cardImg.innerHTML = `<img src="${task.image.small_url}" title="${task.guid}" class="card-img-top" id="card_img">`;
        
        // create event listener for image
        cardImg.addEventListener("click", async function(event) {
            event.preventDefault();
            localStorage.setItem("gameSelectId", task.guid);
            localStorage.setItem("platform", cardText3.innerText);
            localStorage.setItem("release_date", cardText2.innerText);
            window.location.href="link.html";
        });

        let cardBody = document.createElement('div');
        cardBody.className = 'card-body';

        let title = document.createElement('h5');
        title.id = "card_title"
        title.innerText = task.name;
        title.className = 'card-title';

        // create event listener for title
        title.addEventListener("click", async function(event) {
            event.preventDefault();
            localStorage.setItem("gameSelectId", task.guid);
            localStorage.setItem("platform", cardText3.innerText);
            localStorage.setItem("release_date", cardText2.innerText);
            window.location.href="link.html";
        });

        let cardText = document.createElement('p');
        if(task.deck){
            cardText.innerText += task.deck;
        } else {
            cardText.innerText = "";
        }
        cardText.className = 'card-text';

        let cardText2 = document.createElement('p');
        let month = [ "none", "January", "February", "March", "April", "May", "June", 
        "July", "August", "September", "October", "November", "December"];

        if(task.expected_release_month && task.expected_release_day){
            cardText2.innerText = "Expected Release: " + month[task.expected_release_month] + " " + task.expected_release_day + ", " + task.expected_release_year;
        } else if(task.expected_release_month){
            cardText2.innerText = "Expected Release: " + month[task.expected_release_month] + " " + task.expected_release_year;
        } else if (task.expected_release_year){
            cardText2.innerText = "Expected Release: " + task.expected_release_year;
        } else {
            cardText2.innerText = "Expected Release: " + (task.expected_release_year || inputYear.value);
        }
        
        cardText2.className = 'card-text';

        let cardText3 = document.createElement('p');
        cardText3.innerText = 'Platforms:'

        if (task.platforms) {
            task.platforms.map(platform => {
                cardText3.innerText += ` ${platform.name},`;
            })
            cardText3.innerText = cardText3.innerText.substring(0,(cardText3.innerText.length-1))
        } else {
            cardText3.innerText += ' Unknown';
        }
       
        cardText3.className = "card-text";

        cardBody.appendChild(title);
        cardBody.appendChild(cardText);
        cardBody.appendChild(cardText2);
        cardBody.appendChild(cardText3);
        card.appendChild(cardImg);
        card.appendChild(cardBody);
        cardContainer.appendChild(card);
    }
}



// EVENT LISTENERS //

// applies events to year buttons in filter
$("#filterYear").children().each(function() {
    let inputYear = document.querySelector("#inputYear");
    $(this).click(async function() {
        event.preventDefault();
        $("#filterYear").children().each(function() {
            $(this).attr("class", "dropdown-item");
        });
        console.log("Year button clicked " + $(this).text());
        inputYear.value = $(this).text();
        $("#mainYear").html("Year - " + $(this).text());
        $(this).addClass("active");
        await buildCards();
    })
});

// applies events to month buttons in filter
$("#filterMonth").children().each(function() {
    let inputMonth = document.querySelector("#inputMonth");
    $(this).click(async function() {
        event.preventDefault();
        $("#filterMonth").children().each(function() {
            $(this).attr("class", "dropdown-item");
        });
        console.log("Month button clicked " + $(this).text());
        inputMonth.value = $(this).attr("value");
        $("#mainMonth").html("Month - " + $(this).text());
        $(this).addClass("active");
        await buildCards();
    })
});

// applies events to platform buttons in filter
$("#filterPlatform").children().each(function() {
    let inputPlatform = document.querySelector("#inputPlatform");
    $(this).click(async function() {
        event.preventDefault();
        $("#filterPlatform").children().each(function() {
            $(this).attr("class", "dropdown-item");
        });
        console.log("Platform button clicked " + $(this).text());
        inputPlatform.value = $(this).attr("value");
        $("#mainPlatform").html("Platform - " + $(this).text());
        $(this).addClass("active");
        await buildCards();
    })
});

const searchingArray = []
const guidArray = []

async function searchArray (){
    let searchUrl = await `https://www.giantbomb.com/api/games/?api_key=0db701c3bf4b84594cb0b2282c255345428c9a87&format=json&filter=expected_release_year:2017,2018,2019,2020,2021,2022,2023`;
    const response = await get(searchUrl);
    response.results.map(element => {
        searchingArray.push(element.name);
        guidArray.push(element.guid);
    })
};

searchArray()
console.log(searchingArray, guidArray)


$("#search_input").autocomplete({
    source: searchingArray
});



search_btn.addEventListener("click", async function(event) {
    event.preventDefault();
    let search_input = document.querySelector('#search_input')
    let search_btn = document.querySelector("#search_btn")
    localStorage.setItem("gameSelectSearchId", search_input.value);
    console.log(localStorage.getItem("gameSelectSearchId"))
    console.log(search_input.value)
    let selectSearchGuid = guidArray[(searchingArray.indexOf(localStorage.getItem("gameSelectSearchId")))]
    console.log(selectSearchGuid)
    localStorage.setItem("gameSelectId", selectSearchGuid)
    window.location.href="link.html"
})



buildCards()










