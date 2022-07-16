define(["require", "exports", "../accUtils", "ojs/ojpopup"], function (require, exports, AccUtils) {
    "use strict";
    class AboutViewModel {
        constructor() {
            this._handleOpen = (event) => {
                let target = event.target;
                let titleContext = this._getTitleContext(target);
                let tooltipPopupId = this._tooltipPopupId;
                let popup = document.getElementById(tooltipPopupId);
                if (titleContext) {
                    let oldNode = this.data(popup, AboutViewModel._CONTEXT_NODE, null);
                    let titleContextCopy = titleContext;
                    if (oldNode && oldNode === titleContext.node) {
                        return;
                    }
                    setTimeout(() => {
                        this.data(popup, AboutViewModel._CONTEXT_NODE, titleContextCopy.node);
                        let content = this._getContentNode(popup);
                        content.innerHTML = titleContextCopy.title;
                        popup.open(target);
                    }, AboutViewModel._OPEN_DELAY);
                }
            };
            this._handleClose = () => {
                let tooltipPopupId = this._tooltipPopupId;
                let popup = document.getElementById(tooltipPopupId);
                let isOpen = !popup.isOpen();
                if (!isOpen) {
                    popup.close();
                }
            };
            this._helpDataAttr = 'data-title';
            this._rootElement = document.getElementById('pageContent');
            let uniqueId = 'id' + (new Date()).getTime();
            uniqueId = 'idPopupId';
            let tooltipPopup = document.createElement('oj-popup');
            tooltipPopup.setAttribute('id', uniqueId);
            tooltipPopup.style.maxWidth = '340px';
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
            this._rootElement.addEventListener('focus', this._handleClose, true);
        }
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
            this._timeoutId = window.setTimeout(this._handleClose, AboutViewModel._AUTO_TIMEOUT);
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
            this.data(popup, AboutViewModel._CONTEXT_NODE, null);
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
        /**
         * Optional ViewModel method invoked after the View is inserted into the
         * document DOM.  The application can put logic that requires the DOM being
         * attached here.
         * This method might be called multiple times - after the View is created
         * and inserted into the DOM and after the View is reconnected
         * after being disconnected.
         */
        connected() {
            AccUtils.announce("About page loaded.");
            document.title = "About";
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
    AboutViewModel._AUTO_TIMEOUT = 300;
    AboutViewModel._OPEN_DELAY = 500;
    AboutViewModel._CONTEXT_NODE = 'tooltip-context-node';
    return AboutViewModel;
});
//# sourceMappingURL=about.js.map