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

//     <div class="card">
//     <img class="card-img-top" src=".../100px160/" alt="Card image cap">
//     <div class="card-body">
//       <h5 class="card-title">Card title that wraps to a new line</h5>
//       <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
//     </div>
//   </div><div class="card">


let card = document.createElement('div');
card.className = 'card';

let cardImg = document.createElement('div');
cardImg.classname = "card-img-top"
// let imgTrimmed = substring(0,task.image.medium_url.length-1)
cardImg.innerHTML = `<img src="${task.image.small_url}"></img>`
// cardImg.src = task.image.medium_url.splice(0,task.image.medium_url.length-)

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
card.appendChild(cardBody);
card.appendChild(cardImg);
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
