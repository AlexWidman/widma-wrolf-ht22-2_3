import promiseNoData from "../views/promiseNoData.js";
import SearchFormView from "../views/searchFormView.js";
import SearchResultsView from "../views/searchResultsView.js";
import { searchDishes } from "../dishSource.js"
import resolvePromise from "../resolvePromise.js"

const Search={
    props: ["model"],
    data(){ return { searchQuery: "" ,
                searchType: "" ,
                searchResultsPromiseState: {promise: "", data: "", error: ""} } },
    created(){ if (!this.searchResultsPromiseState.promise) {resolvePromise(searchDishes({}), this.searchResultsPromiseState)}; },
    render(){
        function onValueChangeACB(text){ this.searchQuery = text; }
        function onOptionChoiceACB(choice){ this.searchType = choice; }
        function onSearchACB(){ resolvePromise(searchDishes({query: this.searchQuery, type: this.searchType}), this.searchResultsPromiseState) }
        function onSearchResultACB(result){ this.model.setCurrentDish(result.id); }
        return (
            <div>
                <SearchFormView dishTypeOptions={["starter", "main course", "dessert"]}
                                onValueChange={onValueChangeACB.bind(this)}
                                onOptionChoice={onOptionChoiceACB.bind(this)}
                                onButtonPress={onSearchACB.bind(this)}/>
                {promiseNoData(this.searchResultsPromiseState)||
                <SearchResultsView searchResults={this.searchResultsPromiseState.data}
                                    onSearchResult={onSearchResultACB.bind(this)}/>}
                
            </div>
        )
    }
};
export default Search;
    
/*
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
    function onButtonPressACB(){ props.model.doSearch(props.model.searchParams); }
    return  <SearchFormView dishTypeOptions={["starter", "main course", "dessert"]}
                        onValueChange={onValueChangeACB}
                        onOptionChoice={onOptionChoiceACB}
                        onButtonPress={onButtonPressACB}/>;
}

function SearchResults(props){
    function onSearchResultACB(result){ props.model.setCurrentDish(result.id);}
    return <SearchResultsView searchResults={props.model.searchResultsPromiseState.data}
                            onSearchResult={onSearchResultACB}/>;
}*/