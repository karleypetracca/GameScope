"use strict";
let apiUrl;
let offset = 0

const getReleaseDates = function() {


for (let count = 0; count < 5;count++)  {
    apiUrl = `http://localhost:8010/proxy/api/games/?api_key=6b4ac05b6e77823f1510fcb200250f6e07e11241&format=JSON&filter=expected_release_year:2020&offset=${offset}]`
    offset += 100;
    let returnObject = get(apiUrl)
    .then(function(response) {
        
        const releaseDates=  response ;
        return releaseDates;
    })

   
 console.log(returnObject);
 let combinedObject = {}
 for(let key in returnObject) {
          if (returnObject.hasOwnProperty(key)) {
              console.log(key);
           }
        }
  
    
    
} ;

}


getReleaseDates();



// function mix(source, target) {
//     for(let key in source) {
//       if (source.hasOwnProperty(key)) {
//          target[key] = source[key];
//       }
//     }
 
//  }
 
//    mix(options, products);

// lcp --proxyUrl https://www.giantbomb.com