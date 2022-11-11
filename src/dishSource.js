import {BASE_URL, API_KEY} from "../src/apiConfig.js";

const options = {
	method: 'GET',
	headers: {
		'X-Mashape-Key': API_KEY,
		'X-rapidapi-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
	}
};

function treatHTTPResponseACB(response){ 
    /*TODO throw when the HTTP response is not 200, otherwise return response.json()*/
    if (!response.ok) throw new Error("API problem "+response.status); {
        return response.json()};
}

// måste fixas till att return rätt
function transformSearchResultACB(data){
  console.log(data.results[2])
  return data.results;
}

function getDishDetails(id){
  return fetch(BASE_URL+'recipes/'+id+'/information', options)
    .then(treatHTTPResponseACB);
}

function searchDishes(params){
  console.log(params);
  return fetch(BASE_URL+'recipes/complexSearch?'+new URLSearchParams(params), options)
    .then(treatHTTPResponseACB).then(transformSearchResultACB);
}

export {getDishDetails, searchDishes};