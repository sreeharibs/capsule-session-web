define(["require", "exports", "knockout", "ojs/ojcontext", "papaparse", "ojs/ojarraydataprovider", "ojs/ojlistdataproviderview", "ojs/ojconverter-number", "../accUtils", "ojs/ojknockout", "ojs/ojtable", "ojs/ojselectsingle", "ojs/ojcheckboxset", "ojs/ojselectsingle", "ojs/ojdataprovider", "ojs/ojconverter-number", "ojs/ojknockout", "ojs/ojlistview", "ojs/ojgauge", "ojs/ojbutton", "ojs/ojlistitemlayout", "ojs/ojpopup"], function (require, exports, ko, Context, PapaParse, ArrayDataProvider, ListDataProviderView, ojconverter_number_1, AccUtils) {
    "use strict";
    //tooltip import end
    class VhseAdmissionViewModel {
        constructor(context) {
            //tooltip var end
            this.districts = [
                { value: "", label: "All" },
                { value: "Thiruvananthapuram", label: "Thiruvananthapuram" },
                { value: "Kollam", label: "Kollam" },
                { value: "Alappuzha", label: "Alappuzha" },
                { value: "Pathanamthitta", label: "Pathanmathitta" },
                { value: "Kottayam", label: "Kottayam" },
                { value: "Idukki", label: "Idukki" },
                { value: "Ernakulam", label: "Ernakulam" },
                { value: "Thrissur", label: "Thrissur" },
                { value: "Palakkad", label: "Palakkad" },
                { value: "Malappuram", label: "Malappuram" },
                { value: "Kozhikkode", label: "Kozhikkode" },
                { value: "Wayanadu", label: "Wayanadu" },
                { value: "Kannur", label: "Kannur" },
                { value: "Kasargode", label: "Kasargode" }
            ];
            this.districtsDP = new ArrayDataProvider(this.districts, {
                keyAttributes: "value",
            });
            this.courseDP = new ArrayDataProvider([], {
                keyAttributes: "value",
            });
            this.langDP = new ArrayDataProvider([], {
                keyAttributes: "value",
            });
            this.sortCriteriaMap = {};
            this.genderFilterCriteriaMap = {};
            this.ratingFilterCriteriaMap = {};
            this.districtFilterCriteriaMap = {};
            this.priceCriteria = [];
            this.ratingCriteria = [];
            this.authorCriteria = [];
            this.codeCriteria = [];
            this.nameCriteria = [];
            this.courseCriteria = [];
            this.langCriteria = [];
            this.currencyOptions = {
                style: "currency",
                currency: "USD",
                currencyDisplay: "symbol",
            };
            this.currencyConverter = new ojconverter_number_1.IntlNumberConverter(this.currencyOptions);
            this.dataProvider = ko.observable();
            this.courseDataProvider = ko.observable();
            this.langDataProvider = ko.observable();
            this.currentSort = ko.observable("default");
            this.options = [
                {
                    value: "default",
                    label: "New and Popular",
                },
                {
                    value: "lh",
                    label: "Price: Low to High",
                },
                {
                    value: "hl",
                    label: "Price: High to Low",
                },
                {
                    value: "reviews",
                    label: "Most Reviews",
                },
                {
                    value: "date",
                    label: "Publication Date",
                },
            ];
            this.optionsDataProvider = new ArrayDataProvider(this.options, {
                keyAttributes: "value",
            });
            this.getImage = (url) => {
                return {
                    backgroundImage: "url(" + url + ")",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "100%",
                    backgroundPosition: "center",
                    height: "172px",
                    width: "140px",
                };
            };
            this.handleSortCriteriaChanged = (
            // @ts-ignore
            event) => {
                let sortCriteria = this.sortCriteriaMap[event.detail.value];
                if (sortCriteria != null) {
                    sortCriteria = [sortCriteria];
                }
                this.currentSortCriteria = sortCriteria;
                this.dataProvider(new ListDataProviderView(this.baseDataProvider, {
                    filterCriterion: this.currentFilterCriterion,
                    sortCriteria: sortCriteria,
                }));
            };
            this.handleGenderFilterChanged = (
            // @ts-ignore
            event) => {
                this.priceCriteria = this._getCriteria(event, this.genderFilterCriteriaMap);
                this._handleFilterChanged();
            };
            this.handleRatingFilterChanged = (
            //@ts-ignore
            event) => {
                this.ratingCriteria = this._getCriteria(event, this.ratingFilterCriteriaMap);
                this._handleFilterChanged();
            };
            this.handleCodeFilterChanged = (
            //@ts-ignore
            event) => {
                // const criteria = new Array();
                // if(event.detail.value ) {
                //   criteria.push({ op: "$eq", value: { schoolcode: event.detail.value } });
                // }
                // this.codeCriteria = criteria;
                const schoolNameCriteria = new Array();
                if (event.detail.value) {
                    if (event.detail.value.match(/^-?\d+$/)) {
                        schoolNameCriteria.push({ op: "$eq", value: { schoolcode: event.detail.value } });
                    }
                    else {
                        schoolNameCriteria.push({ op: "$co", value: { namecode: event.detail.value.toLowerCase() } });
                    }
                }
                this.nameCriteria = schoolNameCriteria;
                this._handleFilterChanged();
            };
            this.handleNameFilterChanged = (
            //@ts-ignore
            event) => {
                const criteria = new Array();
                if (event.detail.value) {
                    criteria.push({ op: "$co", value: { name: event.detail.value.toUpperCase() } });
                }
                this.nameCriteria = criteria;
                this._handleFilterChanged();
            };
            this.handleDistrictFilterChanged = (
            //@ts-ignore
            event) => {
                const criteria = new Array();
                if (event.detail.value) {
                    criteria.push({ op: "$eq", value: { district: event.detail.value } });
                }
                this.authorCriteria = criteria;
                this._handleFilterChanged();
            };
            this.handleCourseFilterChanged = (
            //@ts-ignore
            event) => {
                const criteria = new Array();
                if (event.detail.value && event.detail.value != "All") {
                    criteria.push({ op: "$co", value: { courses: event.detail.value } });
                }
                this.courseCriteria = criteria;
                this._handleFilterChanged();
            };
            this.handleLangFilterChanged = (
            //@ts-ignore
            event) => {
                const criteria = new Array();
                if (event.detail.value && event.detail.value != "All") {
                    criteria.push({ op: "$co", value: { secondlanguagestooltip: event.detail.value } });
                }
                this.langCriteria = criteria;
                this._handleFilterChanged();
            };
            this._getCriteria = (
            //@ts-ignore
            event, criteriaMap) => {
                const criteria = new Array();
                const values = event.detail.value;
                values.forEach(function (value) {
                    const filter = criteriaMap[value];
                    if (filter) {
                        criteria.push(filter);
                    }
                });
                return criteria;
            };
            this._handleFilterChanged = () => {
                const criteria = new Array();
                if (this.priceCriteria.length > 0) {
                    criteria.push({ op: "$or", criteria: this.priceCriteria });
                }
                if (this.ratingCriteria.length > 0) {
                    criteria.push({ op: "$or", criteria: this.ratingCriteria });
                }
                if (this.authorCriteria.length > 0) {
                    criteria.push({ op: "$or", criteria: this.authorCriteria });
                }
                if (this.codeCriteria.length > 0) {
                    criteria.push({ op: "$or", criteria: this.codeCriteria });
                }
                if (this.nameCriteria.length > 0) {
                    criteria.push({ op: "$or", criteria: this.nameCriteria });
                }
                if (this.courseCriteria.length > 0) {
                    criteria.push({ op: "$or", criteria: this.courseCriteria });
                }
                if (this.langCriteria.length > 0) {
                    criteria.push({ op: "$or", criteria: this.langCriteria });
                }
                const filterCriterion = criteria.length === 0 ? null : { op: "$and", criteria: criteria };
                this.currentFilterCriterion = filterCriterion;
                this.dataProvider(new ListDataProviderView(this.baseDataProvider, {
                    filterCriterion: filterCriterion,
                    sortCriteria: this.currentSortCriteria,
                }));
            };
            this._handleOpen = (event) => {
                let target = event.target;
                let titleContext = this._getTitleContext(target);
                let tooltipPopupId = this._tooltipPopupId;
                let popup = document.getElementById(tooltipPopupId);
                if (titleContext) {
                    let oldNode = this.data(popup, VhseAdmissionViewModel._CONTEXT_NODE, null);
                    let titleContextCopy = titleContext;
                    if (oldNode && oldNode === titleContext.node) {
                        return;
                    }
                    setTimeout(() => {
                        this.data(popup, VhseAdmissionViewModel._CONTEXT_NODE, titleContextCopy.node);
                        let content = this._getContentNode(popup);
                        content.innerHTML = titleContextCopy.title;
                        popup.open(target);
                    }, VhseAdmissionViewModel._OPEN_DELAY);
                }
            };
            this._handleClose = () => {
                let tooltipPopupId = this._tooltipPopupId;
                let popup = document.getElementById(tooltipPopupId);
                let isOpen = false;
                if (popup) {
                    isOpen = !popup.isOpen();
                }
                if (!isOpen) {
                    popup.close();
                }
            };
            //tooltip constructor start
            this._helpDataAttr = 'data-title';
            this._rootElement = document.getElementById('pageContent');
            let uniqueId = 'id' + (new Date()).getTime();
            uniqueId = 'idPopupId';
            let tooltipPopup = document.createElement('oj-popup');
            tooltipPopup.setAttribute('id', uniqueId);
            tooltipPopup.style.maxWidth = '530px';
            this._rootElement.appendChild(tooltipPopup);
            this._tooltipPopupId = tooltipPopup.getAttribute('id');
            let callbackClearTimeout = this._handleClearTimeout;
            let callbackSetTimeout = this._handleSetTimeout;
            let callbackCleanup = this._handleCleanup;
            tooltipPopup.position = {
                my: { horizontal: 'start', vertical: 'top' },
                offset: { x: 0, y: 10 },
                at: { horizontal: 'start', vertical: 'bottom' }
            };
            tooltipPopup.initialFocus = 'none';
            tooltipPopup.autoDismiss = 'focusLoss';
            tooltipPopup.modality = 'modeless';
            tooltipPopup.addEventListener('ojOpen', callbackSetTimeout);
            tooltipPopup.addEventListener('ojClose', callbackCleanup);
            tooltipPopup.addEventListener('ojBeforeClose', callbackClearTimeout);
            tooltipPopup.addEventListener('ojFocus', callbackClearTimeout);
            tooltipPopup.addEventListener('mouseenter', callbackClearTimeout);
            this._rootElement.addEventListener('mouseenter', this._handleOpen, true);
            //this._rootElement.addEventListener('focus', this._handleClose, true);
            //tooltip constructor end
            //At the start of your viewModel constructor
            const elementContext = Context.getContext(context.element);
            const busyContext = elementContext.getBusyContext();
            const options = { "description": "Web Component Startup - Waiting for data" };
            //Example observable
            // Example for parsing context properties
            // if (context.properties.name) {
            //     parse the context properties here
            // }
            this.sortCriteriaMap["lh"] = { attribute: "PRICE", direction: "ascending" };
            this.sortCriteriaMap["hl"] = {
                attribute: "PRICE",
                direction: "descending",
            };
            this.sortCriteriaMap["reviews"] = {
                attribute: "REVIEWS",
                direction: "descending",
            };
            this.sortCriteriaMap["date"] = {
                attribute: "PUBLISH_DATE",
                direction: "ascending",
            };
            this.genderFilterCriteriaMap["boys"] = { op: "$eq", value: { gender: 'Boys' } };
            this.genderFilterCriteriaMap["girls"] = { op: "$eq", value: { gender: 'Girls' } };
            this.genderFilterCriteriaMap["mixed"] = { op: "$eq", value: { gender: 'Mixed' } };
            this.ratingFilterCriteriaMap["two"] = { op: "$lt", value: { RATING: 3 } };
            this.ratingFilterCriteriaMap["three"] = { op: "$ge", value: { RATING: 3 } };
            this.ratingFilterCriteriaMap["four"] = { op: "$ge", value: { RATING: 4 } };
            this.ratingFilterCriteriaMap["five"] = { op: "$eq", value: { RATING: 5 } };
            this.districtFilterCriteriaMap["All"] = { op: "$eq", value: { district: 'Thiruvananthapuram' } };
            this.districtFilterCriteriaMap["Thiruvananthapuram"] = { op: "$eq", value: { district: 'Thiruvananthapuram' } };
            this.districtFilterCriteriaMap["Kollam"] = { op: "$eq", value: { district: 'Kollam' } };
            this.districtFilterCriteriaMap["alp"] = { op: "$eq", value: { district: 'alp' } };
            this.districtFilterCriteriaMap["pta"] = { op: "$eq", value: { district: 'pta' } };
            this.districtFilterCriteriaMap["ktm"] = { op: "$eq", value: { district: 'ktm' } };
            this.districtFilterCriteriaMap["idk"] = { op: "$eq", value: { district: 'idk' } };
            this.districtFilterCriteriaMap["ekm"] = { op: "$eq", value: { district: 'ekm' } };
            this.districtFilterCriteriaMap["tsr"] = { op: "$eq", value: { district: 'tsr' } };
            this.districtFilterCriteriaMap["pkd"] = { op: "$eq", value: { district: 'pkd' } };
            this.districtFilterCriteriaMap["mlp"] = { op: "$eq", value: { district: 'mlp' } };
            this.districtFilterCriteriaMap["kkd"] = { op: "$eq", value: { district: 'kkd' } };
            this.districtFilterCriteriaMap["wnd"] = { op: "$eq", value: { district: 'wnd' } };
            this.districtFilterCriteriaMap["knr"] = { op: "$eq", value: { district: 'knr' } };
            this.districtFilterCriteriaMap["kgd"] = { op: "$eq", value: { district: 'kgd' } };
            this.dataProvider = ko.observable();
            this.baseDataProvider = ko.observable();
            this.baseDataProvider = new ArrayDataProvider(JSON.parse("[]"), {
                keyAttributes: "ID",
            });
            this.dataProvider = ko.observable(this.baseDataProvider);
            this.courseDataProvider = ko.observable(this.courseDP);
            this.langDataProvider = ko.observable(this.langDP);
            let self = this;
            //   Tabletop.init( {
            //   key: 'https://docs.google.com/spreadsheets/d/1H3MXhBiqV0V-4HCQGymJSKH4O5ODpJPLnjzLouCfqzw/pubhtml',
            //   simpleSheet: false,
            //   prettyColumnNames: false,
            //   wanted: ['SchoolsVhse', 'CoursesVhse', 'SecondLanguageVhse'],
            //  }
            // ).then(function(data, tabletop) { 
            //   self.baseDataProvider = new ArrayDataProvider(data.SchoolsVhse.elements, {
            //       keyAttributes: "ID",
            //     });
            //     self.courseDP = new ArrayDataProvider(data.CoursesVhse.elements, {
            //       keyAttributes: "value",
            //     });
            //     self.courseDataProvider(
            //       new ListDataProviderView(self.courseDP)
            //     );
            //     self.langDataProvider(
            //       new ListDataProviderView(self.langDP)
            //     );
            //     self.dataProvider(
            //       new ListDataProviderView(self.baseDataProvider)
            //     );
            // })
            PapaParse.parse('https://docs.google.com/spreadsheets/d/1H3MXhBiqV0V-4HCQGymJSKH4O5ODpJPLnjzLouCfqzw/gviz/tq?tqx=out:csv&sheet=SchoolsVhse', {
                download: true,
                header: true,
                complete: function (results) {
                    self.baseDataProvider = new ArrayDataProvider(results.data, {
                        keyAttributes: "ID",
                    });
                    self.dataProvider(new ListDataProviderView(self.baseDataProvider));
                }
            });
            PapaParse.parse('https://docs.google.com/spreadsheets/d/1H3MXhBiqV0V-4HCQGymJSKH4O5ODpJPLnjzLouCfqzw/gviz/tq?tqx=out:csv&sheet=CoursesVhse', {
                download: true,
                header: true,
                complete: function (results) {
                    self.courseDP = new ArrayDataProvider(results.data, {
                        keyAttributes: "value",
                    });
                    self.courseDataProvider(new ListDataProviderView(self.courseDP));
                }
            });
            // PapaParse.parse('https://docs.google.com/spreadsheets/d/1H3MXhBiqV0V-4HCQGymJSKH4O5ODpJPLnjzLouCfqzw/gviz/tq?tqx=out:csv&sheet=SecondLanguageVhse', {
            //   download: true,
            //   header: true,
            //   complete: function(results) {
            //     self.langDP = new ArrayDataProvider(results.data, {
            //     keyAttributes: "label",
            //   });
            //   self.langDataProvider(
            //     new ListDataProviderView(self.langDP)
            //   );
            //   }
            // });
            //   this.baseDataProvider = new ArrayDataProvider(JSON.parse(jsonDataStr), {
            //     keyAttributes: "ID",
            //   });
            //   this.dataProvider = ko.observable(this.baseDataProvider);
            //Once all startup and async activities have finished, relocate if there are any async activities
        }
        //tooltip helper method start
        data(el, attr, val) {
            let attributes = new WeakMap();
            let elAttrs = attributes.get(el);
            let isSetOperation = arguments.length > 2;
            if (isSetOperation) {
                if (!elAttrs)
                    attributes.set(el, elAttrs = {});
                elAttrs[attr] = val;
            }
            else {
                return datasetOrCachedAttrsValue();
            }
            function datasetOrCachedAttrsValue() {
                let attrVal = el.dataset[attr];
                return typeof attrVal !== 'undefined' ?
                    attrVal :
                    elAttrs && elAttrs[attr];
            }
        }
        ;
        _getContentNode(popup) {
            let content = popup.querySelector('.oj-popup-content');
            return content;
        }
        ;
        _handleSetTimeout() {
            this._timeoutId = window.setTimeout(this._handleClose, VhseAdmissionViewModel._AUTO_TIMEOUT);
        }
        ;
        _handleClearTimeout() {
            let timeoutId = this._timeoutId;
            delete this._timeoutId;
            window.clearTimeout(timeoutId);
        }
        ;
        _handleCleanup(event) {
            let popup = event.target;
            this.data(popup, VhseAdmissionViewModel._CONTEXT_NODE, null);
        }
        ;
        _getTitleContext(node) {
            let helpDataAttr = this._helpDataAttr;
            let i = 0;
            let MAX_PARENTS = 5;
            // eslint-disable-next-line no-plusplus
            while ((node !== null) && (i++ < MAX_PARENTS)) {
                if (node.nodeType === 1) {
                    let title = node.getAttribute(helpDataAttr);
                    if (title && title.length > 0) {
                        return { title: title, node: node };
                    }
                }
                // eslint-disable-next-line no-param-reassign
                node = node.parentNode;
            }
            return null;
        }
        ;
        //tooltip helper method end
        /**
         * Optional ViewModel method invoked after the View is inserted into the
         * document DOM.  The application can put logic that requires the DOM being
         * attached here.
         * This method might be called multiple times - after the View is created
         * and inserted into the DOM and after the View is reconnected
         * after being disconnected.
         */
        connected() {
            AccUtils.announce("Dashboard page loaded.");
            document.title = "VHSE School Finder";
            // implement further logic if needed
        }
        /**
         * Optional ViewModel method invoked after the View is disconnected from the DOM.
         */
        disconnected() {
            // implement if needed
        }
        /**
         * Optional ViewModel method invoked after transition to the new View is complete.
         * That includes any possible animation between the old and the new View.
         */
        transitionCompleted() {
            // implement if needed
        }
    }
    //tooltip var start
    VhseAdmissionViewModel._AUTO_TIMEOUT = 300;
    VhseAdmissionViewModel._OPEN_DELAY = 500;
    VhseAdmissionViewModel._CONTEXT_NODE = 'tooltip-context-node';
    return VhseAdmissionViewModel;
});
//# sourceMappingURL=admission_vhse.js.map