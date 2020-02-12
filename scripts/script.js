"use strict";

const getReleaseDates = function() {
    const apiUrl = `https://www.giantbomb.com/api/games/?api_key=6b4ac05b6e77823f1510fcb200250f6e07e11241&format=JSON&filter=expected_release_year:2020`
    
    
    
    get(apiUrl)
    .then(function(response) {
        console.log(response.value);
    })
    
};

getReleaseDates();