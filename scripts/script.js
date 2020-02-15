"use strict";

// set variables
const apiKey = "6b4ac05b6e77823f1510fcb200250f6e07e11241";

// function lists

async function queryUrl() {
    let newObject = [];
    let inputYear = document.querySelector("#inputYear");
    // Non-proxy URL = `https://www.giantbomb.com/api/games/?api_key=${apiKey}&format=json&filter=expected_release_year:${inputYear.value}`;
    const response = await get(`http://localhost:8010/proxy/api/games/?api_key=${apiKey}&format=json&filter=expected_release_year:${inputYear.value}`);

    await response.results.map(element => {
        newObject.push(element);
    })

    return await releaseDateFix(newObject);
};

function releaseDateFix(query) {
    let fixedQuery = query.map(element => {
        console.log(element);
        if (element.original_release_date) {
            console.log(element, element.original_release_date)
            // check year
            if (element.expected_release_year === null) {
                element.expected_release_year = Number(element.original_release_date.substring(0,4));
                console.log(element.expected_release_year, "success")
            }
            // check month
            if (element.expected_release_month === null) {
                element.expected_release_month = Number(element.original_release_date.substring(5,7));
                console.log(element.expected_release_month, "success")
            }
            // check day
            if (element.expected_release_day === null) {
                element.expected_release_day = Number(element.original_release_date.substring(8));
                console.log(element.expected_release_day, "success")
            }
        }
        return element;
    })
    return fixedQuery;
}

async function buildCards() {
    let cardContainer = document.getElementById('card-container');

    let tasks = await queryUrl();
    
    await tasks.map(task => {
        console.log("Creating task card", task);
        createTaskCard(task);
    })

    async function createTaskCard(task) {

        let card = document.createElement('div');
        card.className = 'card';

        let cardImg = document.createElement('div');
        cardImg.innerHTML = `<a href=link.html><img src="${task.image.small_url}" class="card-img-top"></img></a>`;

        let cardBody = document.createElement('div');
        cardBody.className = 'card-body';

        let title = document.createElement('h5');
        title.innerText = task.name;
        title.className = 'card-title';

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

        if(task.expected_release_month  && task.expected_release_day){
            cardText2.innerText = "Expected Release: " + month[task.expected_release_month] + " " + task.expected_release_day + ", " + task.expected_release_year
        } else if(task.expected_release_month){
            cardText2.innerText = "Expected Release: " + month[task.expected_release_month] + " " + task.expected_release_year
        } else if (task.expected_release_year){
            cardText2.innerText = "Expected Release: " + task.expected_release_year + "."
        }
        else {
            cardText2.innerText = "Expected Release: " + (task.expected_release_year || inputYear.value)
        }

        cardText2.className = 'card-text';

        let cardText3 = document.createElement('p');
        cardText3.innerText = `Platforms:`

       
        await task.platforms.map(platform => {
            cardText3.innerText += ` ${platform.name}`

        })

        cardText3.className = "card-text";

        cardBody.appendChild(title);
        cardBody.appendChild(cardText);
        cardBody.appendChild(cardText2);
        cardBody.appendChild(cardText3);
        card.appendChild(cardImg);
        card.appendChild(cardBody);
        cardContainer.appendChild(card);
    }
    
    async function initListOfTasks() {
        cardContainer.innerHTML = "";

        await tasks.map((task) => {
            createTaskCard(task);
        });
    }

    await initListOfTasks();
}


// event listeners

// $("#buttonSearch").click(function() {
//     event.preventDefault();
//     console.log("Search button clicked");
//     // filter(queryUrl);
//     buildCards();
// });

$("#filterYear").children().each(function() {
    let inputYear = document.querySelector("#inputYear");
    console.log($(this));
    $(this).click(async function() {
        event.preventDefault();
        console.log("Year button clicked " + $(this).text());
        inputYear.value = $(this).text();
        $("#mainYear").html($(this).text());
        await buildCards();
    })
});

$("#filterMonth").children().each(function() {
    let inputMonth = document.querySelector("#inputMonth");
    console.log($(this));
    $(this).click(async function() {
        event.preventDefault();
        console.log("Month button clicked " + $(this).text());
        inputMonth.value = $(this).text();
        $("#mainMonth").html($(this).text());
        await buildCards();
    })
});

$("#filterPlatform").children().each(function() {
    let inputPlatform = document.querySelector("#inputPlatform");
    console.log($(this));
    $(this).click(async function() {
        event.preventDefault();
        console.log("Platform button clicked " + $(this).text());
        inputPlatform.value = $(this).text();
        $("#mainPlatform").html($(this).text());
        // $("#mainPlatform").css($(this).text());
        await buildCards();
    })
});