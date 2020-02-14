"use strict";

// set variables
const apiKey = "6b4ac05b6e77823f1510fcb200250f6e07e11241";

// function lists

async function queryUrl() {
    let newObject = []
    let inputYear = document.querySelector("#inputYear");
    // Non-proxy URL = `https://www.giantbomb.com/api/games/?api_key=${apiKey}&format=json&filter=expected_release_year:${inputYear.value}`;
    const response = await get(`http://localhost:8010/proxy/api/games/?api_key=${apiKey}&format=json&filter=expected_release_year:${inputYear.value}`);
    
    await response.results.map(element => {
        newObject.push(element);
    })
    return newObject;
};

async function buildCards() {
    let cardContainer = document.getElementById('card-container');

    let tasks = await queryUrl();
    
    await tasks.map(task => {
        console.log("Creating task card", task);
        createTaskCard(task);
    })

    function createTaskCard(task) {

        let card = document.createElement('div');
        card.className = 'card';

        let cardImg = document.createElement('div');
        cardImg.innerHTML = `<img src="${task.image.small_url}" class="card-img-top"></img>`

        let cardBody = document.createElement('div');
        cardBody.className = 'card-body';

        let title = document.createElement('h5');
        title.innerText = task.name;
        title.className = 'card-title';

        let cardText = document.createElement('p');
        cardText.innerText = task.deck;
        cardText.className = 'card-text';

        cardBody.appendChild(title);
        cardBody.appendChild(cardText);
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

$("#buttonSearch").click(function() {
    event.preventDefault();
    console.log("Search button clicked");
    // filter(queryUrl);
    buildCards();
});