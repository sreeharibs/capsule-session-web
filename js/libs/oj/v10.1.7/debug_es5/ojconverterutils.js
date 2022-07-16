(function() {
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @license
 * Copyright (c) 2014, 2022, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
define(['ojs/ojcore-base', 'ojs/ojlogger'], function (oj, Logger) {
  'use strict';

  oj = oj && Object.prototype.hasOwnProperty.call(oj, 'default') ? oj['default'] : oj;

  var ConverterUtils = /*#__PURE__*/_createClass(function ConverterUtils() {
    _classCallCheck(this, ConverterUtils);
  });

  ConverterUtils.getConverterInstance = function (converterOption) {
    var cTypeStr = '';
    var cOptions = {};
    var converterInstance = null;

    if (converterOption) {
      if (_typeof(converterOption) === 'object') {
        if (converterOption.parse && typeof converterOption.parse === 'function' || converterOption.format && typeof converterOption.format === 'function') {
          converterInstance = converterOption;
        } else {
          cTypeStr = converterOption.type;
          cOptions = converterOption.options || {};
        }
      }

      if (!converterInstance) {
        cTypeStr = cTypeStr || converterOption;

        if (cTypeStr && typeof cTypeStr === 'string') {
          if (oj.Validation && oj.Validation.converterFactory) {
            var cf = oj.Validation.converterFactory(cTypeStr);
            return cf.createConverter(cOptions);
          } else {
            Logger.error('oj.Validation.converterFactory is not available and it is needed to support the deprecated json format for the converters property. Please include the backward compatibility "ojvalidation-base" module.');
          }
        }
      }
    }

    return converterInstance;
  };

  return ConverterUtils;
});

}())