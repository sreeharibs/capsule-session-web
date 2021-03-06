/**
 * @license
 * Copyright (c) 2014, 2022, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
define(['exports', 'ojs/ojcustomelement-utils'], function (exports, ojcustomelementUtils) { 'use strict';

    function getDescriptiveText(element) {
        var _a;
        const state = ojcustomelementUtils.CustomElementUtils.getElementState(element);
        return (_a = state === null || state === void 0 ? void 0 : state.getDescriptiveText()) !== null && _a !== void 0 ? _a : '';
    }

    exports.getDescriptiveText = getDescriptiveText;

    Object.defineProperty(exports, '__esModule', { value: true });

});
