/* 
   This component uses Vue-specific and React-specific presenters: Sidebar, Summary, Search, Details, Show 
   Therefore it needs to import from alternative paths, depending on the framework. 
   To achieve that, we use require() with a prefix, instead of import.
*/
const PREFIX=window.location.toString().includes("react")?"reactjs":"vuejs";

const Sidebar=require("../"+PREFIX+"/sidebarPresenter.js").default;
const Search=require("../"+PREFIX+"/searchPresenter.js").default;
const Details=require("../"+PREFIX+"/detailsPresenter.js").default;
const Summary=require("../"+PREFIX+"/summaryPresenter.js").default;

export default
function App(props){
    return (<div class="flexParent">
                <Show hash="#sidebar"><Sidebar model={props.model} /></Show>
                <Show hash="#search"><Search model={props.model} /></Show>
                <Show hash="#details"><Details model={props.model} /></Show>
                <Show hash="#mainContent"><Summary model={props.model} /></Show>
            </div>
           );
}
