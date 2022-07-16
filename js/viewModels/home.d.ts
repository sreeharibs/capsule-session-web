import * as ko from "knockout";
import "ojs/ojknockout";
import "ojs/ojwaterfalllayout";
import "ojs/ojactioncard";
import "ojs/ojbutton";
import { ojButtonsetOne } from "ojs/ojbutton";
import "ojs/ojavatar";
declare class CustomersViewModel {
    baseDataProvider: any;
    dataProvider: ko.Observable<any>;
    private router;
    readonly filters = "all";
    clickListener: (event: Event, bindingContext: ko.BindingContext) => void;
    handleFilterChanged: (event: ojButtonsetOne.valueChanged) => void;
    constructor(context: any);
    /**
     * Optional ViewModel method invoked after the View is inserted into the
     * document DOM.  The application can put logic that requires the DOM being
     * attached here.
     * This method might be called multiple times - after the View is created
     * and inserted into the DOM and after the View is reconnected
     * after being disconnected.
     */
    connected(): void;
    /**
     * Optional ViewModel method invoked after the View is disconnected from the DOM.
     */
    disconnected(): void;
    /**
     * Optional ViewModel method invoked after transition to the new View is complete.
     * That includes any possible animation between the old and the new View.
     */
    transitionCompleted(): void;
}
export = CustomersViewModel;
