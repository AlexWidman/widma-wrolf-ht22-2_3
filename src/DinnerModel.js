import {searchDishes, getDishDetails} from "../src/dishSource.js";
import resolvePromise from "../src/resolvePromise.js";

/* This is an example of a JavaScript class.
   The Model keeps only abstract data and has no notions of graohics or interaction
*/
class DinnerModel{
    constructor(nrGuests=2, dishArray=[]){
        this.observers = [];
        this.setNumberOfGuests(nrGuests);
        this.dishes= dishArray;
        this.currentDish= null;
        this.searchResultsPromiseState= {};
        this.searchParams= {};
        this.currentDishPromiseState= {};
    }
    setNumberOfGuests(nr){
        // if() and throw exercise
        
        // TODO throw an error if the argument is smaller than 1 or not an integer
        // the error message must be exactly "number of guests not a positive integer"
        // to check for integer: test at the console Number.isInteger(3.14)

        // TODO if the argument is a valid number of guests, store it in this.numberOfGuests
        
        // when this is done the TW1.1 DinnerModel "can set the number of guests" should pass
        // also "number of guests is a positive integer"

        const prevNumber = this.numberOfGuests; //to store previous number for observer before numberOfGuests is changed
        
        if (nr < 1 || !Number.isInteger(nr)){
            throw new Error("number of guests not a positive integer");
        }
        this.numberOfGuests = nr;

        if (prevNumber !== nr){
            this.notifyObservers({setGuests: nr})
        }
    }
    addToMenu(dishToAdd){
        // array spread syntax example. Make sure you understand the code below.
        // It sets this.dishes to a new array [   ] where we spread (...) the previous value
        if (!this.dishes.some(dish => dish.id === dishToAdd.id)){
            this.dishes= [...this.dishes, dishToAdd];
            this.notifyObservers({addDish: dishToAdd});
        }
    }
    
    removeFromMenu(dishToRemove){
        // callback exercise! Also return keyword exercise
        function hasSameIdCB(dish){
            // TODO return true if the id property of dish is _different_ from the dishToRemove's id property
            // This will keep the dish when we filter below.
            // That is, we will not keep the dish that has the same id as dishToRemove (if any)
            return dish.id !== dishToRemove.id;
        }
        function findDishCB(dish){
            return dish.id === dishToRemove.id;
        }
        if (this.dishes.find(findDishCB)){
            this.dishes= this.dishes.filter(hasSameIdCB);
            this.notifyObservers({removeDish: dishToRemove});
        }
        // the test "can remove dishes" should pass
    }
    /* 
       ID of dish currently checked by the user.
       A strict MVC/MVP Model would not keep such data, 
       but we take a more relaxed, "Application state" approach. 
       So we store also abstract data that will influence the application status.
     */
    setCurrentDish(id){
        function notifyACB(){ this.notifyObservers(); }
        if (id === undefined){ return; }
        if (this.currentDish === id){ return; }
        this.currentDish= id
        this.notifyObservers({dishID: id});
        resolvePromise(getDishDetails(id), this.currentDishPromiseState, notifyACB.bind(this));
    }

    setSearchQuery(q){
        this.searchParams.query= q;
    }

    setSearchType(t){
        this.searchParams.type= t;
    }

    doSearch(queryAndType){
        function notifyACB(){ this.notifyObservers(); }
        resolvePromise(searchDishes(queryAndType), this.searchResultsPromiseState, notifyACB.bind(this));
    }

    addObserver(callback){
        this.observers = [...this.observers, callback];
    }

    removeObserver(callback){
        function isSameCallbackCB(cb){ return cb !== callback; }
        this.observers = this.observers.filter(isSameCallbackCB);
    }

    notifyObservers(payload){
        function invokeObserverCB(obs){ obs(payload); }
        try{ this.observers.forEach(invokeObserverCB); }
        catch(err){ console.error(err); }
    }
}

export default DinnerModel;
