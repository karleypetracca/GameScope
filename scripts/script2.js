"use strict";

const apiKey = "6b4ac05b6e77823f1510fcb200250f6e07e11241";

async function queryUrl() {
    let newObject = [];
    let inputYear = document.querySelector("#inputYear");
    // Non-proxy URL = `https://www.giantbomb.com/api/games/?api_key=${apiKey}&format=json&filter=expected_release_year:${inputYear.value}`;
    const response = await get(`http://localhost:8010/proxy/api/games/?api_key=${apiKey}&format=json&filter=expected_release_year:${inputYear.value}`);

    await response.results.map(element => {
        newObject.push(element);
    })
    // filterFunct(newObject)

    return newObject;
};

function createTitle () {
    let title = document.querySelector(".game_title")
    title.innerText = tasks.
}