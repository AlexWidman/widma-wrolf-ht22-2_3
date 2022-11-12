function promiseNoData(promiseState){
    return promiseState.promise?
        promiseState.error?
            <div>{promiseState.error.toString()}</div>:
            promiseState.data?
                false:
                <img src="https://raw.githubusercontent.com/Codelessly/FlutterLoadingGIFs/master/packages/cupertino_activity_indicator.gif"style="width:100px"></img>:
        <div>No data</div>

    /* If-statements if they are desired instead
    if (!promiseState.promise){
        return <div>No data</div>
    }
    if (promiseState.error){
        return <div>{promiseState.error.toString()}</div>
    }
    if (promiseState.data){
        return false;
    }
    return <img src="https://raw.githubusercontent.com/Codelessly/FlutterLoadingGIFs/master/packages/cupertino_activity_indicator.gif"style="width:100px"></img>;*/
}

export default promiseNoData;