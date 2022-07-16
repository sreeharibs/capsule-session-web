/// <reference types="ojarraydataprovider" />
import * as ko from "knockout";
import Composite = require("ojs/ojcomposite");
import "ojs/ojknockout";
import "ojs/ojtable";
import "ojs/ojselectsingle";
import ArrayDataProvider = require("ojs/ojarraydataprovider");
import { IntlNumberConverter } from "ojs/ojconverter-number";
import { ojCheckboxset } from "ojs/ojcheckboxset";
import "ojs/ojcheckboxset";
import { ojSelectSingle } from "ojs/ojselectsingle";
import "ojs/ojselectsingle";
import "ojs/ojdataprovider";
import "ojs/ojconverter-number";
import "ojs/ojknockout";
import "ojs/ojlistview";
import "ojs/ojgauge";
import "ojs/ojbutton";
import "ojs/ojlistitemlayout";
import 'ojs/ojpopup';
declare class VhseAdmissionViewModel {
    private page;
    componentType: ko.Observable<string>;
    private static readonly _AUTO_TIMEOUT;
    private static readonly _OPEN_DELAY;
    private static readonly _CONTEXT_NODE;
    private _helpDataAttr;
    private _rootElement;
    private _tooltipPopupId;
    private _timeoutId;
    private readonly districts;
    readonly districtsDP: ArrayDataProvider<unknown, unknown>;
    courseDP: ArrayDataProvider<unknown, unknown>;
    langDP: ArrayDataProvider<unknown, unknown>;
    private readonly sortCriteriaMap;
    private readonly genderFilterCriteriaMap;
    private readonly ratingFilterCriteriaMap;
    private readonly districtFilterCriteriaMap;
    private priceCriteria;
    private ratingCriteria;
    private authorCriteria;
    private codeCriteria;
    private nameCriteria;
    private courseCriteria;
    private langCriteria;
    private currentSortCriteria;
    private currentFilterCriterion;
    private readonly currencyOptions;
    readonly currencyConverter: IntlNumberConverter;
    baseDataProvider: any;
    dataProvider: ko.Observable<any>;
    courseDataProvider: ko.Observable<any>;
    langDataProvider: ko.Observable<any>;
    readonly currentSort: ko.Observable<string>;
    private readonly options;
    readonly optionsDataProvider: ArrayDataProvider<unknown, unknown>;
    getImage: (url: string) => {
        backgroundImage: string;
        backgroundRepeat: string;
        backgroundSize: string;
        backgroundPosition: string;
        height: string;
        width: string;
    };
    handleSortCriteriaChanged: (event: ojSelectSingle.valueChanged<OptionData["value"], OptionData>) => void;
    handleGenderFilterChanged: (event: ojCheckboxset.valueChanged<OptionData["value"], OptionData>) => void;
    handleRatingFilterChanged: (event: ojCheckboxset.valueChanged<OptionData["value"], OptionData>) => void;
    handleCodeFilterChanged: (event: any) => void;
    handleNameFilterChanged: (event: any) => void;
    handleDistrictFilterChanged: (event: ojSelectSingle.valueChanged<OptionData["value"], OptionData>) => void;
    handleCourseFilterChanged: (event: ojSelectSingle.valueChanged<OptionData["value"], OptionData>) => void;
    handleLangFilterChanged: (event: ojSelectSingle.valueChanged<OptionData["value"], OptionData>) => void;
    private _getCriteria;
    private _handleFilterChanged;
    constructor(context: Composite.ViewModelContext<Composite.PropertiesType>);
    data(el: HTMLElement, attr: string, val: HTMLElement | null): any;
    private _handleOpen;
    private _getContentNode;
    private _handleSetTimeout;
    private _handleClearTimeout;
    private _handleCleanup;
    private _handleClose;
    private _getTitleContext;
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
export = VhseAdmissionViewModel;
