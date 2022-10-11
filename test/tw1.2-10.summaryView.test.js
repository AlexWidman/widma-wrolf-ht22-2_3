import dishesConst from './dishesConst.js';
import { assert, expect, should } from 'chai';
import createUI from "./createUI.js";
import installOwnCreateElement from "./jsxCreateElement.js";
import {findTag,onlyAllowNativeEventNames} from "./jsxUtilities.js";

const {render, h}= require("vue");

let SummaryView;
try {
SummaryView= require('../src/views/'+TEST_PREFIX+'summaryView.js').default;
}
catch (e) {console.log(e);}

describe("TW1.2 SummaryView", function tw1_2_10() {
    this.timeout(200000);  // increase to allow debugging during the test run
    

    it("SummaryView shows its people prop", function tw1_2_10_1(){
        const div= createUI();
        window.React={createElement:h};
        render(<SummaryView people={4} ingredients={[]} />, div);
        assert.equal(div.firstElementChild.firstElementChild.firstChild.textContent, "4");
    });

    it("SummaryView uses correct native event names", function tw1_2_10_2(){
        installOwnCreateElement();
        const rendering= SummaryView({people:2, ingredients:[]});
        const buttons=findTag("button", rendering);
        buttons.forEach(button => {
            onlyAllowNativeEventNames(button);
        });
    });
});
