/**
 * @license
 * Copyright (c) 2014, 2022, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
define(['exports', 'ojs/ojcore-base'], function (exports, oj) { 'use strict';

    oj = oj && Object.prototype.hasOwnProperty.call(oj, 'default') ? oj['default'] : oj;

    class GenericEvent {
        constructor(type, options) {
            this.type = type;
            this.options = options;
            if (options != null) {
                this['detail'] = options['detail'];
            }
        }
    }
    oj._registerLegacyNamespaceProp('GenericEvent', GenericEvent);

    class EventTargetMixin {
        addEventListener(eventType, listener) {
            if (!this._eventListeners) {
                this._eventListeners = [];
            }
            this._eventListeners.push({
                type: eventType.toLowerCase(),
                listener: listener
            });
        }
        removeEventListener(eventType, listener) {
            if (this._eventListeners) {
                let i;
                for (i = this._eventListeners.length - 1; i >= 0; i--) {
                    if (this._eventListeners[i]['type'] == eventType &&
                        this._eventListeners[i]['listener'] == listener) {
                        this._eventListeners.splice(i, 1);
                    }
                }
            }
        }
        dispatchEvent(evt) {
            if (this._eventListeners) {
                var i, returnValue;
                var eventListeners = this._eventListeners.slice(0);
                for (i = 0; i < eventListeners.length; i++) {
                    var eventListener = eventListeners[i];
                    if (evt && evt.type && eventListener['type'] == evt.type.toLowerCase()) {
                        returnValue = eventListener['listener'].apply(this, [evt]);
                        if (returnValue === false) {
                            return false;
                        }
                    }
                }
            }
            return true;
        }
        static applyMixin(derivedCtor) {
            let baseCtors = [EventTargetMixin];
            baseCtors.forEach((baseCtor) => {
                Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
                    if (name !== 'constructor') {
                        derivedCtor.prototype[name] = baseCtor.prototype[name];
                    }
                });
            });
        }
    }
    oj._registerLegacyNamespaceProp('EventTargetMixin', EventTargetMixin);

    exports.EventTargetMixin = EventTargetMixin;
    exports.GenericEvent = GenericEvent;

    Object.defineProperty(exports, '__esModule', { value: true });

});
