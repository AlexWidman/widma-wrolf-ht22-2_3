import promiseNoData from "../views/promiseNoData.js";
import SearchFormView from "../views/searchFormView.js";
import SearchResultsView from "../views/searchResultsView.js";

const Search={   // ordinary JS object literal, can have methods like render()
    props: ["model"],
    data(){ return { searchQuery: this.model.setSearchQuery() },
                { searchType: this.model.setSearchType() },
                { search: this.model.doSearch()},
                { searchResult: this.model.setCurrentDish()},
                { searchResultsPromiseState: {} } },
    created(){ if (!this.searchResultsPromiseState.promise) {this.model.doSearch({})}; },
    render(){
        function SearchForm(){
            function onValueChangeACB(text){ this.searchQuery = text; }
            function onOptionChoiceACB(choice){ this.searchType = choice; }
            function onButtonPressACB(){ this.search = this.model.searchParams; }
            return <SearchFormView dishTypeOptions={["starter", "main course", "dessert"]}
                                onValueChange={onValueChangeACB.bind(this)}
                                onOptionChoice={onOptionChoiceACB.bind(this)}
                                onButtonPress={onButtonPressACB.bind(this)}/>
        }
        function SearchResults(){
            function onSearchResultACB(result){ this.searchResult = result.id;}
            return <SearchResultsView searchResults={this.model.searchResultsPromiseState.data}
                                    onSearchResult={onSearchResultACB.bind(this)}/>
        }
        return (
            <div>
                {SearchForm.bind(this)}
                {promiseNoData(this.searchResultsPromiseState)||SearchResults.bind(this)}
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