import {BASE_URL, API_KEY} from "../src/apiConfig.js";

function treatHTTPResponseACB(response){ 
    /*TODO throw when the HTTP response is not 200, otherwise return response.json()*/
    if (response === 200) {
        return response.json()};
 }

 function getDishDetails(){
    if (response === 200) {
    return fetch(BASE_URL+endpoint+params, {  // object literal
        "method": "GET",              // HTTP method
        "headers": {                  // HTTP headers, also object literal
     'X-Mashape-Key': API_KEY,
"x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
     } // end of headers object
}/* end of second fetch parameter, object */
)
  .then(treatHTTPResponseACB)   ;
    }
 }

 function searchDishes(){
    if (response === 200) {
    return fetch(BASE_URL+endpoint+params, {  // object literal
        "method": "GET",              // HTTP method
        "headers": {                  // HTTP headers, also object literal
     'X-Mashape-Key': API_KEY,
"x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
     } // end of headers object

}/* end of second fetch parameter, object */
)
  .then(treatHTTPResponseACB)   ;
    }
}
 

export {getDishDetails, searchDishes};