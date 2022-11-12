function resolvePromise(promiseToResolve, promiseState){
    if (promiseToResolve === null){ return; }
    promiseState.promise=promiseToResolve;
    promiseState.data= null;         
    promiseState.error= null;
    //if(notifyACB) notifyACB(); for use in week 3
    function saveDataACB(result){ 
	    if(promiseState.promise !== promiseToResolve){ return; }
        promiseState.data= result;
    /* TODO save result in promiseState, as before */
        } 
    function saveErrorACB(err){ 
        if(promiseState.promise !== promiseToResolve){ return; } 
        promiseState.error= err;
	/* TODO same check as above */
    /* TODO save err in promiseState, as before */
        }
    promiseToResolve.then(saveDataACB).catch(saveErrorACB);
}

export default resolvePromise;