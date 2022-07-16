define(["require", "exports", "../accUtils", "knockout", "ojs/ojarraydataprovider", "ojs/ojlistdataproviderview", "ojs/ojresponsiveutils", "ojs/ojresponsiveknockoututils", "papaparse", "jquery", "ojs/ojknockout", "ojs/ojwaterfalllayout", "ojs/ojactioncard", "ojs/ojbutton", "ojs/ojselectsingle", "ojs/ojavatar"], function (require, exports, AccUtils, ko, ArrayDataProvider, ListDataProviderView, responsiveUtils, responsiveKnockoutUtils, PapaParse, $) {
    "use strict";
    class SSLCPhysicsViewModel {
        constructor() {
            this.buttonValue = ko.observable("off");
            this.dataProvider = ko.observable();
            this.subject = ko.observable();
            this.filters = "all";
            this.chapters = [
                { value: "all", label: "Select Chapter" },
                { value: "chapter1", label: "Chapter 1" },
                { value: "chapter2", label: "Chapter 2" },
                { value: "chapter3", label: "Chapter 3" },
                { value: "chapter4", label: "Chapter 4" },
                { value: "chapter5", label: "Chapter 5" },
                { value: "chapter6", label: "Chapter 6" },
                { value: "chapter7", label: "Chapter 7" },
                { value: "specials", label: "Other" }
            ];
            this.chaptersDP = new ArrayDataProvider(this.chapters, {
                keyAttributes: "value",
            });
            this.clickListener = (event, bindingContext) => {
                var href = $(event.currentTarget).data('link');
                window.open(href, '_blank');
            };
            this.handleFilterChanged = (event) => {
                const value = event.detail.value;
                if (value === "all") {
                    if (!this.subject()) {
                        this.dataProvider(this.baseDataProvider);
                    }
                    else {
                        const filter = {
                            op: "$eq",
                            value: {
                                subject: this.subject(), standard: this.standard
                            },
                        };
                        this.dataProvider(new ListDataProviderView(this.baseDataProvider, {
                            filterCriterion: filter,
                        }));
                    }
                }
                else {
                    if (!this.subject()) {
                        this.dataProvider(this.baseDataProvider);
                    }
                    else {
                        const filter = {
                            op: "$eq",
                            value: {
                                tags: value, subject: this.subject(), standard: this.standard
                            },
                        };
                        this.dataProvider(new ListDataProviderView(this.baseDataProvider, {
                            filterCriterion: filter,
                        }));
                    }
                }
            };
            let smQuery = responsiveUtils.getFrameworkQuery(responsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY);
            this.isSmall = responsiveKnockoutUtils.createMediaQueryObservable(smQuery);
            this.dataProvider = ko.observable();
            this.baseDataProvider = ko.observable();
            this.baseDataProvider = new ArrayDataProvider(JSON.parse("[]"), {
                keyAttributes: "ID",
            });
            const search = document.location.search
                ? document.location.search.substring(1)
                : "";
            var decodedSearch = decodeURIComponent(search);
            var decodedParamsArray = decodedSearch.split(";");
            let self = this;
            decodedParamsArray.forEach(function (param) {
                if (param.startsWith("class")) {
                    self.standard = param.split("=")[1];
                }
                if (param.startsWith("subject")) {
                    self.subject = ko.observable(param.split("=")[1]);
                }
            });
            this.dataProvider = ko.observable(this.baseDataProvider);
            //     Tabletop.init( {
            //     key: 'https://docs.google.com/spreadsheets/d/1H3MXhBiqV0V-4HCQGymJSKH4O5ODpJPLnjzLouCfqzw/pubhtml',
            //     simpleSheet: false,
            //     prettyColumnNames: false,
            //     singleton: true,
            //     wanted: ['Videos'], }
            //   ).then(function(data, tabletop) { 
            //     self.baseDataProvider = new ArrayDataProvider(data.Videos.elements, {
            //         keyAttributes: "ID",
            //       });
            //       self.dataProvider(
            //         new ListDataProviderView(self.baseDataProvider)
            //       );
            //       if(!self.subject()) {
            //         self.dataProvider(self.baseDataProvider);
            //       }else{
            //         const filter = {
            //           op: "$eq",
            //           value: {
            //             subject: self.subject(), standard: self.standard 
            //           },
            //         };
            //         self.dataProvider(
            //           new ListDataProviderView(self.baseDataProvider, {
            //             filterCriterion: filter as DataFilter.Filter<Data>,
            //           })
            //         );
            //       }
            //   })
            // }
            PapaParse.parse('https://docs.google.com/spreadsheets/d/1H3MXhBiqV0V-4HCQGymJSKH4O5ODpJPLnjzLouCfqzw/gviz/tq?tqx=out:csv&sheet=Videos', {
                download: true,
                header: true,
                complete: function (results) {
                    self.baseDataProvider = new ArrayDataProvider(results.data, {
                        keyAttributes: "ID",
                    });
                    self.dataProvider(new ListDataProviderView(self.baseDataProvider));
                    if (!self.subject()) {
                        self.dataProvider(self.baseDataProvider);
                    }
                    else {
                        const filter = {
                            op: "$eq",
                            value: {
                                subject: self.subject(), standard: self.standard
                            },
                        };
                        self.dataProvider(new ListDataProviderView(self.baseDataProvider, {
                            filterCriterion: filter,
                        }));
                    }
                }
            });
        }
        /**
         * Optional ViewModel method invoked after the View is inserted into the
         * document DOM.  The application can put logic that requires the DOM being
         * attached here.
         * This method might be called multiple times - after the View is created
         * and inserted into the DOM and after the View is reconnected
         * after being disconnected.
         */
        connected() {
            AccUtils.announce("Customers page loaded.");
            document.title = "Capsule Session";
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
    return SSLCPhysicsViewModel;
});
//# sourceMappingURL=videos.js.map