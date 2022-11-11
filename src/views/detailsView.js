function DetailsView(props){
    function renderIngredientsCB(ingredient){
        return (
            <span>
                {ingredient.name}: {(ingredient.amount).toFixed(2)} {ingredient.unit}
            </span>
        );
    }
    //console.log(props.dishData)
    console.log(props.dishData.title+" In menu: "+props.isDishInMenu)
    return (
        <div>
            <div class="details">
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
                <button
                disabled={props.isDishInMenu}
                onClick={console.log}
                style="margin:10px">
                    Add to menu!
                </button>
                <button
                onClick={console.log}
                style="margin:10px">
                    Cancel
                </button>
            </div>
        </div>
    );
}

export default DetailsView;