import 'ojs/ojpopup';
declare class AboutViewModel {
    private static readonly _AUTO_TIMEOUT;
    private static readonly _OPEN_DELAY;
    private static readonly _CONTEXT_NODE;
    private _helpDataAttr;
    private _rootElement;
    private _tooltipPopupId;
    private _timeoutId;
    constructor();
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
export = AboutViewModel;
