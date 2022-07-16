/// <reference types="ojarraydataprovider" />
import * as ko from "knockout";
import ArrayDataProvider = require("ojs/ojarraydataprovider");
import "ojs/ojknockout";
import "ojs/ojwaterfalllayout";
import "ojs/ojactioncard";
import "ojs/ojbutton";
import "ojs/ojselectsingle";
import { ojButtonsetOne } from "ojs/ojbutton";
import "ojs/ojavatar";
declare class SSLCPhysicsViewModel {
    buttonValue: ko.Observable<string>;
    baseDataProvider: any;
    dataProvider: ko.Observable<any>;
    private standard;
    subject: ko.Observable<any>;
    isSmall: ko.Observable<boolean>;
    readonly filters = "all";
    private readonly chapters;
    readonly chaptersDP: ArrayDataProvider<unknown, unknown>;
    clickListener: (event: Event, bindingContext: ko.BindingContext) => void;
    handleFilterChanged: (event: ojButtonsetOne.valueChanged) => void;
    constructor();
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
export = SSLCPhysicsViewModel;
