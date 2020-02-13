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
});


function filter(queryUrl) {

    const filterObject = queryUrl();
    console.log(filterObject);
}


