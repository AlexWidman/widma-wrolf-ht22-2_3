import SidebarView from "../views/sidebarView.js";

export default
function Sidebar(props){
    function onNumberChangeACB(value){ props.model.setNumberOfGuests(value)}
    function onRemoveDishACB(dish){ props.model.removeFromMenu(dish)}
    function onShowDetailsACB(dish){ props.model.setCurrentDish(dish.id); 
    console.log(props.model.currentDish)}
    return <SidebarView number={props.model.numberOfGuests}
                        dishes={props.model.dishes}
                        onRemoveDish={onRemoveDishACB}
                        onShowDetails={onShowDetailsACB}
                        onNumberChange={onNumberChangeACB}/>;
}
