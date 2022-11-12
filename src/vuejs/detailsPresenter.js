import DetailsView from "../views/detailsView";
import promiseNoData from "../views/promiseNoData";

export default
function Details(props){
    function currentDishInMenuCB(dish){ return dish.id === props.model.currentDish }
    function onAddToMenuACB(dish){ props.model.addToMenu(dish); }
    console.log("Dishes: "+props.model.dishes)
    return promiseNoData(/* TODO PROMISE */) || 
            <DetailsView dishData={props.model.currentDishPromiseState}
                        isDishInMenu={props.model.dishes?props.model.dishes.filter(currentDishInMenuCB).length > 0?true:false:false}
                        guests={props.model.numberOfGuests}
                        onAddToMenu={onAddToMenuACB}/>
}