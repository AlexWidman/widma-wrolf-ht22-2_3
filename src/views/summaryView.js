import { sortIngredients } from "../utilities";

/* Functional JSX component. Name starts with capital letter */
function SummaryView(props){
    return (
            <div class="debug">
                Summary for <span title="nr guests">{props.people}</span> persons:
            
                {  //  <---- we are in JSX; with this curly brace, we go back to JavaScript, and can write JS code and comments.
                   // Then we can come back to JSX <tags>
                    renderIngredients(props.ingredients, props.people)
                }
            </div>
    );
}

/* For TW1.5. If you are at TW1.2, wait :) */
/* This is an ordinary JS function, not a component. It will be invoked from the component above */
function renderIngredients(ingredientArray, people){
    function ingredientTableRowCB(ingr){
        /* what's a key? a key helps the react framework rendering as it is a sort of identifier, which is why something unique is passed, 
        in our case an ingredient id which we know is unique for every ingredient*/
        return <tr key={ingr.id}>
            <td>{ingr.name}</td>
            <td class="center">{ingr.aisle}</td>
            <td class="right">{(ingr.amount * people).toFixed(2)}</td>
            <td> {ingr.unit} </td></tr>;
    }
    
    return <table>
        <thead>
        <tr><th>Name</th><th>Aisle</th><th>Quantity</th><th>unit</th></tr>
        </thead>
        <tbody>
           {  //  <---- we are in JSX, with this curly brace, we go back to JavaScript
             sortIngredients(ingredientArray).map(ingredientTableRowCB)
          }
        </tbody>
        </table>;
}

export default SummaryView;
export {renderIngredients};   // we export so that tests can analyze the source code
