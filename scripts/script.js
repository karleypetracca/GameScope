"use strict";

// set variables
const apiKey = "6b4ac05b6e77823f1510fcb200250f6e07e11241";

// 


function queryUrl() {
    let newObject = []
    let inputYear = document.querySelector("#inputYear");
    // Non-proxy URL = `https://www.giantbomb.com/api/games/?api_key=${apiKey}&format=json&filter=expected_release_year:${inputYear.value}`;
    get(`http://localhost:8010/proxy/api/games/?api_key=${apiKey}&format=json&filter=expected_release_year:${inputYear.value}`).then(function(result) {
        result.results.forEach(function (element) {
            newObject.push(element);
        })
    });
    // console.log(newObject);
    return newObject;
};

$("#buttonSearch").click(function() {
    event.preventDefault();
    console.log("Search button clicked");
    filter(queryUrl);
    initListOfTasks();
    console.log(tasks)

});


function filter(queryUrl) {

    
    const filterObject = queryUrl();
    console.log(filterObject);
}


let tasks = queryUrl();

let cardContainer;

let createTaskCard = (task) => {

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

let initListOfTasks = () => {
if (cardContainer) {
    document.getElementById('card-container').replaceWith(cardContainer);
    return;
}

cardContainer = document.getElementById('card-container');
tasks.forEach((task) => {
    createTaskCard(task);
});
};
