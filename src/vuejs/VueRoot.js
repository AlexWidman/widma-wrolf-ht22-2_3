// Add relevant imports here 
import { firebaseModelPromise, updateFirebaseFromModel, updateModelFromFirebase } from "../firebaseModel";
import resolvePromise from "../resolvePromise";
import App from "../views/app";
import promiseNoData from "../views/promiseNoData";

// Define the VueRoot component
const VueRoot = { 
                data() { return {promiseState: {}}; 
                }, 
                created() {
                    function connectToFirebaseACB() { 
                        if (!this.promiseState.data) return;
                        updateFirebaseFromModel(this.promiseState.data);
                        updateModelFromFirebase(this.promiseState.data);
                    }
                    if (!this.promiseState.promise) {
                        resolvePromise(firebaseModelPromise(), this.promiseState, connectToFirebaseACB)
                    }
                },
                render() {
                    return promiseNoData(this.promiseState) || <App model={this.promiseState.data} />;
                },
                };
// Export the VueRoot component
export default VueRoot;