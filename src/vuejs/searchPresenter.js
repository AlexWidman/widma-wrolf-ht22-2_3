import promiseNoData from "../views/promiseNoData.js";
import SearchFormView from "../views/searchFormView.js";
import SearchResultsView from "../views/searchResultsView.js";
import Details from "./detailsPresenter.js";

export default
function Search(props){
    if (!props.model.searchResultsPromiseState.promise) {props.model.doSearch({})};
    return(
        <div>
        {SearchForm(props)}
        {promiseNoData(props.model.searchResultsPromiseState)||SearchResults(props)}
        </div>
    )
}

function SearchForm(props){
    function onValueChangeACB(text){ props.model.setSearchQuery(text); }
    function onOptionChoiceACB(choice){ props.model.setSearchType(choice); }
    function onButtonPressACB(){ props.model.doSearch({}); }
    return  <SearchFormView dishTypeOptions={["starter", "main course", "dessert"]}
                        onValueChange={onValueChangeACB}
                        onOptionChoice={onOptionChoiceACB}
                        onButtonPress={onButtonPressACB}/>;

}

function SearchResults(props){
    function onSearchResultACB(result){ props.model.setCurrentDish(result.id);
    return Details(props);
    }
    return <SearchResultsView searchResults={props.model.searchResultsPromiseState.data}
                            onSearchResult={onSearchResultACB}/>;
}