function SearchFormView(props){
    function dishTypeOptionsCB(option){
        return (
            <option>
                {option}
            </option>
        );
    }
    return (
    <div>
        <input
        onChange={console.log}>
        </input>
        <select
        onChange={console.log}>
            <option>
                Choose:
            </option>
            {
                props.dishTypeOptions.map(dishTypeOptionsCB)
            }
        </select>
        <button
        onChange={console.log}>
            Search!
        </button>
    </div>
    );
}

export default SearchFormView;