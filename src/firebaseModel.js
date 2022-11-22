// Add relevant imports here 
import DinnerModel from "./DinnerModel.js";
import { getDishDetails } from "./dishSource.js";
import firebaseConfig from "./firebaseConfig.js";

// Initialise firebase
firebase.initializeApp(firebaseConfig);
const REF="dinnerModel123";

function observerRecap(model) {
    function checkPayload(payload) {
        console.log(payload)
    }
    model.addObserver(checkPayload)
}

function firebaseModelPromise() {
    function makeBigPromiseACB(firebaseData) {
        if (!firebaseData.val() || Object.keys(firebaseData.val()).length === 0) { return new DinnerModel(); }
        const dishPromiseArray= Object.keys(firebaseData.val().dishes || []).map(makeDishPromiseCB);
        function createModelACB(dishArray){
            return new DinnerModel(firebaseData.val().numberOfGuests, dishArray);
        }
        return Promise.all(dishPromiseArray).then(createModelACB);
    }
    function makeDishPromiseCB(dishId){
        return getDishDetails(dishId);
    }
    return firebase.database().ref(REF /* <-- note! Whole object! */).once("value").then(makeBigPromiseACB);
}

function updateFirebaseFromModel(model) {
    function observePayloadACB(payload) {
        if (!payload || payload<0 ) { return; }
        
        else if (payload.setGuests) {
            firebase.database().ref(REF+"/numberOfGuests").set(model.numberOfGuests)
        }
        else if(payload.dishID){
            firebase.database().ref(REF+"/currentDish").set(model.currentDish)    
        }
        else if (payload.addDish) {
            firebase.database().ref(REF+"/dishes/"+ payload.addDish.id).set(payload.addDish.title)
        }
        else if (payload.removeDish) {
            firebase.database().ref(REF+"/dishes/"+ payload.removeDish.id).set(null)
        }    
    }
    model.addObserver(observePayloadACB)
    return;
}
console.log(updateFirebaseFromModel)

function updateModelFromFirebase(model) {
    function guestsChangedInFirebaseACB(firebaseData){ model.setNumberOfGuests(firebaseData.val());}
    firebase.database().ref(REF+"/numberOfGuests").on("value", guestsChangedInFirebaseACB);
    
    function dishChangedInFirebaseACB(firebaseData){ model.setCurrentDish(firebaseData.val());}
    firebase.database().ref(REF+"/currentDish").on("value", dishChangedInFirebaseACB);

    function dishAddedInFirebaseACB(firebaseData){
        function responseDishDataACB(dish) {
            model.addToMenu(dish);
        }
        function fetchDishDataBasedOnID(dishId) {
            function checkDishDuplicateCB(dish) {
                return dish.id === dishId;
            }
            return model.dishes.find(checkDishDuplicateCB);    
        }
        if (!fetchDishDataBasedOnID(+firebaseData.key)) {
            getDishDetails(+firebaseData.key).then(responseDishDataACB);
        }
    }
    firebase.database().ref(REF+"/dishes").on("child_added", dishAddedInFirebaseACB);

    function dishRemovedInFirebaseACB(firebaseData){ model.removeFromMenu({ id: +firebaseData.key });}
    firebase.database().ref(REF+"/dishes").on("child_removed",  dishRemovedInFirebaseACB);
}

// Remember to uncomment the following line:
export {observerRecap, firebaseModelPromise, updateFirebaseFromModel, updateModelFromFirebase};