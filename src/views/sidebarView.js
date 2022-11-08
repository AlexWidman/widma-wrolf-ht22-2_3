import { menuPrice, dishType, sortDishes } from "../utilities";

function SidebarView(props){
    function minusButtonClickACB(){ props.onNumberChange(props.number-1)}
    function plusButtonClickACB(){ props.onNumberChange(props.number+1)}
    return (
    <div class="debug">
        <button
            disabled={props.number===1}
            onClick={minusButtonClickACB}
        >-</button>
        <span>{props.number}</span>
        <button
            enabled={props.number}
            onClick={plusButtonClickACB}
        >+</button>
        {
            renderDishes(props.dishes, props.number, props.onRemoveDish, props.onShowDetails)
        }
    </div>
    );
}

function renderDishes(dishArray, guests, removeDish, showDetails){
    function dishTableRowCB(dish){
        function xButtonClickACB(){ removeDish(dish)}
        function dishNameClickACB(){ showDetails(dish)}
        return <tr key={dish.id}>
            <td><button
                onClick={xButtonClickACB}>
                x</button></td>
            <td><a href="#"
                onClick={dishNameClickACB}>
                {dish.title}</a></td>
            <td class="center">{dishType(dish)}</td>
            <td class="right">{(dish.pricePerServing * guests).toFixed(2)}</td></tr>;
    }

    return <table>
        <tbody>
        {
            sortDishes(dishArray).map(dishTableRowCB)
        }
        <tr>
            <td></td>
            <td>Total:</td>
            <td></td>
            <td>
                {
                    (menuPrice(dishArray) * guests).toFixed(2)
                }
            </td>
        </tr>
        </tbody>
        </table>;
}

export default SidebarView;