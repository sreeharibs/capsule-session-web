(function() {
/**
 * @license
 * Copyright (c) 2014, 2022, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
define(['ojs/ojkoshared', 'knockout', 'ojs/ojcore-base'], function (BindingProviderImpl, ko, oj) {
  'use strict';

  BindingProviderImpl = BindingProviderImpl && Object.prototype.hasOwnProperty.call(BindingProviderImpl, 'default') ? BindingProviderImpl['default'] : BindingProviderImpl;
  oj = oj && Object.prototype.hasOwnProperty.call(oj, 'default') ? oj['default'] : oj;
  /**
   * @license
   * Copyright (c) 2014, 2022, Oracle and/or its affiliates.
   * The Universal Permissive License (UPL), Version 1.0
   * as shown at https://oss.oracle.com/licenses/upl/
   * @ignore
   */

  (function () {
    BindingProviderImpl.addPostprocessor({
      nodeHasBindings: function nodeHasBindings(node, _wrappedReturn) {
        var wrappedReturn = _wrappedReturn;
        return wrappedReturn || node.nodeType === 1 &&
        /* istanbul ignore next: nodeHasBindings only called for non-elements */
        node.nodeName.toLowerCase() === 'oj-defer';
      },
      getBindingAccessors: function getBindingAccessors(node, bindingContext, _wrappedReturn) {
        var wrappedReturn = _wrappedReturn;

        if (node.nodeType === 1 && node.nodeName.toLowerCase() === 'oj-defer') {
          wrappedReturn = wrappedReturn || {};

          wrappedReturn._ojDefer_ =
          /* istanbul ignore next: binding handler doesn't call valueAccessor */
          function () {};
        }

        return wrappedReturn;
      }
    });
  })();
  /**
   * @license
   * Copyright (c) 2014, 2022, Oracle and/or its affiliates.
   * The Universal Permissive License (UPL), Version 1.0
   * as shown at https://oss.oracle.com/licenses/upl/
   * @ignore
   */


  ko.bindingHandlers._ojDefer_ = {
    init: function init(_element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
      var element = _element; // _shown is set if subtreeShown was called before bound. Therefore, if _shown was set
      // we can directly call ko.applyBindingsToDescendants() without waiting for subtreeShown
      // because it was already called.

      if (!element._shown) {
        // stash away the children
        if (!element._savedChildNodes) {
          var fragment = document.createDocumentFragment();
          var childNodes = element.childNodes;

          while (childNodes.length > 0) {
            fragment.appendChild(childNodes[0]);
          }

          element._savedChildNodes = fragment;
        } // this _activateDescedantBindings function will be called from the element's
        // _activate API.


        Object.defineProperty(element, '_activateDescedantBindings', {
          value: function value() {
            ko.applyBindingsToDescendants(bindingContext, element);
            delete element._activateDescedantBindings;
          },
          configurable: true
        });
      } else {
        ko.applyBindingsToDescendants(bindingContext, element);
      }

      return {
        controlsDescendantBindings: true
      };
    }
  };
  /**
   * @license
   * Copyright (c) 2014, 2022, Oracle and/or its affiliates.
   * The Universal Permissive License (UPL), Version 1.0
   * as shown at https://oss.oracle.com/licenses/upl/
   * @ignore
   */

  var DeferElement = {};

  oj._registerLegacyNamespaceProp('DeferElement', DeferElement);

  (function () {
    /**
     *
     * @since 4.0.0
     * @ojcomponent oj.ojDefer
     * @ojshortdesc Defer is used to delay applying bindings to its children until it is activated. Child elements are disconnected from the DOM tree until the parent component activates its subtree.
     * @ojsignature {target: "Type", value:"class ojDefer extends JetElement<ojDeferSettableProperties>"}
     * @classdesc
     * The oj-defer custom element delays applying bindings to its children until it is activated.
     * It works by disconnecting child elements from the DOM tree until the parent component activates its subtree. In addition, the tag will
     * defer binding execution and disconnect children within hidden subtrees of the components which support it.
     * There are several components which support oj-defer:<br>
     * <ul>
     * <li>Collapsible</li>
     * <li>Dialog</li>
     * <li>Film Strip</li>
     * <li>Off Canvas</li>
     * <li>Popup</li>
     * <li>MasonryLayout</li>
     * <li>Menu</li>
     * <li>Composite Component Slots</li>
     * </ul>
     * Note: For composite component slots, the oj-defer element could have a slot attribute specified directly on it,
     * i.e. &lt;oj-defer slot="something">, or &lt;oj-defer> could appear within a child subtree of the element with a slot attribute. Also,
     * the current implementation may allow bindings to be applied
     * to the content within &lt;oj-defer> prematurely if the tag is used in one of the
     * 'hiding' components that is nested within another 'hiding' component. That
     * limitation will be removed in the future.
     */
    DeferElement.register = function () {
      var deferElementProto = Object.create(HTMLElement.prototype); // define a non-public _activate API which will only be called
      // by subtreeAttach

      Object.defineProperty(deferElementProto, '_activate', {
        value: function value() {
          if (!this._activateDescedantBindings) {
            // if the _activateDescedantBindings function is not there then
            // that means we have not been bound yet. Set a flag to activate when bound
            Object.defineProperty(this, '_shown', {
              configurable: false,
              value: true
            });
          } else {
            // if we have stashed away children, put them back

            /* istanbul ignore else: Can only have saved nodes iff there is a deferred binding */
            if (this._savedChildNodes) {
              this.appendChild(this._savedChildNodes);
              delete this._savedChildNodes;
            } // if the _activateDescedantBindings function is there then just call it


            this._activateDescedantBindings();
          }
        },
        writable: false
      });

      var constructorFunc = function constructorFunc() {
        var reflect = window.Reflect;
        var ret;
        /* istanbul ignore else: window.Reflect available everywhere except on IE11 */

        if (typeof reflect !== 'undefined') {
          ret = reflect.construct(HTMLElement, [], this.constructor);
        } else {
          ret = HTMLElement.call(this);
        }

        return ret;
      };

      Object.defineProperty(deferElementProto, 'constructor', {
        value: constructorFunc,
        writable: true,
        configurable: true
      });
      constructorFunc.prototype = deferElementProto;
      Object.setPrototypeOf(constructorFunc, HTMLElement);
      customElements.define('oj-defer', constructorFunc);
    };

    DeferElement.register();
  })();
});

}())