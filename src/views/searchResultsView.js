function SearchResultsView(props){
    function showSearchResultsCB(result){
        // const imageURL = "https://spoonacular.com/recipeImages/"+result.id+"-240x150.jpg" //this is another way that showed the image properly, 
        // doesn't work to use this base URL ^^^^ together with result.id, which seems to be what the test file wanted.
        return (
            <span class="searchResult"
            onClick={console.log}>
                <img src={result.image}height="100">
                </img>
                <div>
                    {result.title}
                </div>
            </span>
        );
    }
    return (
    <div>
        {
            props.searchResults.map(showSearchResultsCB)
        }
    </div>
    );
}

export default SearchResultsView;