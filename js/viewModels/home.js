define(["require", "exports", "../accUtils", "knockout", "ojs/ojarraydataprovider", "ojs/ojlistdataproviderview", "papaparse", "jquery", "ojs/ojknockout", "ojs/ojwaterfalllayout", "ojs/ojactioncard", "ojs/ojbutton", "ojs/ojavatar"], function (require, exports, AccUtils, ko, ArrayDataProvider, ListDataProviderView, PapaParse, $) {
    "use strict";
    class CustomersViewModel {
        constructor(context) {
            this.dataProvider = ko.observable();
            this.filters = "all";
            this.clickListener = (event, bindingContext) => {
                var href = $(event.currentTarget).data('link');
                if (href.includes("capsulesession.com")) {
                    href = href.split('ojr=')[1];
                    if (href.startsWith('videos')) {
                        var otherParams = href.split("$");
                        this.router.go({ path: otherParams[0], params: { 'class': otherParams[1], 'subject': otherParams[2] } });
                    }
                    else {
                        this.router.go({ path: href });
                    }
                }
                else {
                    window.open(href, '_blank');
                }
            };
            this.handleFilterChanged = (event) => {
                const value = event.detail.value;
                if (value === "all") {
                    this.dataProvider(this.baseDataProvider);
                }
                else {
                    const filter = {
                        op: "$co",
                        value: {
                            tags: value,
                        },
                    };
                    this.dataProvider(new ListDataProviderView(this.baseDataProvider, {
                        filterCriterion: filter,
                    }));
                }
            };
            this.router = context.parentRouter;
            this.dataProvider = ko.observable();
            this.baseDataProvider = ko.observable();
            this.baseDataProvider = new ArrayDataProvider(JSON.parse("[]"), {
                keyAttributes: "ID",
            });
            this.dataProvider = ko.observable(this.baseDataProvider);
            let self = this;
            //   Tabletop.init( {
            //   key: 'https://docs.google.com/spreadsheets/d/1H3MXhBiqV0V-4HCQGymJSKH4O5ODpJPLnjzLouCfqzw/pubhtml',
            //   simpleSheet: false,
            //   prettyColumnNames: false,
            //   singleton: true,
            //   wanted: ['Home'], }
            // ).then(function(data, tabletop) { 
            //   self.baseDataProvider = new ArrayDataProvider(data.Home.elements, {
            //       keyAttributes: "ID",
            //     });
            //     self.dataProvider(
            //       new ListDataProviderView(self.baseDataProvider)
            //     );
            // })
            PapaParse.parse('https://docs.google.com/spreadsheets/d/1H3MXhBiqV0V-4HCQGymJSKH4O5ODpJPLnjzLouCfqzw/gviz/tq?tqx=out:csv&sheet=Home', {
                download: true,
                header: true,
                complete: function (results) {
                    self.baseDataProvider = new ArrayDataProvider(results.data, {
                        keyAttributes: "ID",
                    });
                    self.dataProvider(new ListDataProviderView(self.baseDataProvider));
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
    return CustomersViewModel;
});
//# sourceMappingURL=home.js.map