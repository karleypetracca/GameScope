// "get" library
"use strict";

function get(url) {
    return fetch("https://cors-anywhere.herokuapp.com/" + url)
    .then(response => response.json())
    .then(data => data)
    .catch(error => error);
}
