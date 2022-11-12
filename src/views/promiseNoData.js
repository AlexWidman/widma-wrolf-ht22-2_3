function promiseNoData(){
    return <div>No data</div>
}


//function AsyncPresenter(props){ 
//   function doSearchACB(params){ resolvePromise(myAPICall(params), props.model.myPromiseState); }
//    return <SomeView onSearch={doSearchACB} searchResults={props.model.myPromiseState.data} />
//    }
    
//function SomeView(props){
//    function handleInputACB(event){ props.onSearch(event.target.value); }
//    return <div><input onChange={handleInputACB} /> { props.searchResults }</div>;
//    }

export {promiseNoData};