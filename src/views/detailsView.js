function DetailsView(props){
    function changeFontSizeACB(){ 
        var det=document.getElementById("details");
        var slider=document.getElementById("slider");
        det.style.fontSize=slider.value
    }
    function addToMenuClickACB(){ props.onAddToMenu(props.dishData);
        window.location.hash = "#search"; }
    function cancelClickACB(){ window.location.hash = "#search"; }
    function renderIngredientsCB(ingredient){
        return (
            <span>
                {ingredient.name}: {(ingredient.amount).toFixed(2)} {ingredient.unit}
            </span>
        );
    }
    // console.log(props.dishData)
    // console.log(props.dishData.title+" In menu: "+props.isDishInMenu)
    return (
        <div>
            <div class="details"
            id="details">
                <p style="font-weight:bolder;">{props.dishData.title}</p>
                <span class="clearfix">
                    <img src={props.dishData.image}height="150"style="float:left">
                    </img>
                    <p class="detailsText">
                        <span>
                            Price: {props.dishData.pricePerServing}
                        </span>
                        <span>
                            For {props.guests} people: {(props.dishData.pricePerServing * props.guests).toFixed(2)}
                        </span>
                    </p>
                </span>
                <p class="detailsText">
                    {props.dishData.extendedIngredients.map(renderIngredientsCB)}
                </p>
                <p class="detailsText">
                    {props.dishData.instructions}
                </p>
                <p><a href={props.dishData.sourceUrl}>
                        More Information</a>
                </p>
            </div>
            <div>
                <input
                type="range"
                min="10"
                max="30"
                value="20"
                onChange={changeFontSizeACB}
                id="slider">
                </input>
            </div>
            <div>
                <button
                disabled={props.isDishInMenu}
                onClick={addToMenuClickACB}
                style="margin:10px">
                    Add to menu!
                </button>
                <button
                onClick={cancelClickACB}
                style="margin:10px">
                    Cancel
                </button>
            </div>
        </div>
    );
}

export default DetailsView;