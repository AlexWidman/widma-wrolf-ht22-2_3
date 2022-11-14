function SearchFormView(props){
    function dishTypeOptionsCB(option){
        return (
            <option>
                {option}
            </option>
        );
    }
    function onValueChangeACB(event){
        props.onValueChange(event.target.value);
    }
    function onOptionChoiceACB(choice){
        props.onOptionChoice(choice.target.value);
    }
    function onButtonPressACB(){
        props.onButtonPress();
      }
    return (
    <div>
        <input
        onChange={onValueChangeACB}>
        </input>
        <select
        onChange={onOptionChoiceACB}>
            <option value="">
                Choose:
            </option>
            {
                props.dishTypeOptions.map(dishTypeOptionsCB)
            }
        </select>
        <button
        onClick={onButtonPressACB}>
            Search!
        </button>
    </div>
    );
}

export default SearchFormView;