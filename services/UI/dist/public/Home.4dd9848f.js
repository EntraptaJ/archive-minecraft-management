// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../node_modules/@material/typography/dist/mdc.typography.css":[function(require,module,exports) {

},{}],"lib/styles.tsx":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormStyle = exports.MainStyle = exports.TallMainStyle = exports.ContainerStyle = void 0;
const ContainerStyle = {
  background: '#fafafa',
  flex: '1 1 auto',
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '325px',
  borderRadius: '1em',
  boxShadow: '0 5px 5px -3px rgba(0,0,0,.2), 0 8px 10px 1px rgba(0,0,0,.14), 0 3px 14px 2px rgba(0,0,0,.12)',
  marginBottom: '1.5rem'
};
exports.ContainerStyle = ContainerStyle;
const TallMainStyle = {
  justifyContent: 'center',
  flex: '1 1 auto',
  display: 'flex',
  willChange: 'margin-left',
  flexDirection: 'column',
  alignItems: 'center'
};
exports.TallMainStyle = TallMainStyle;
const MainStyle = {
  justifyContent: 'center',
  flex: '1 1 auto',
  display: 'flex',
  alignItems: 'center',
  willChange: 'margin-left',
  height: 'inherit'
};
exports.MainStyle = MainStyle;
const FormStyle = {
  background: '#fafafa',
  flex: '1 1 auto',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  maxWidth: '325px',
  borderRadius: '1em',
  padding: '1em',
  boxShadow: '0 5px 5px -3px rgba(0,0,0,.2), 0 8px 10px 1px rgba(0,0,0,.14), 0 3px 14px 2px rgba(0,0,0,.12)'
};
exports.FormStyle = FormStyle;
},{}],"routes/Home/MCStatus.graphql":[function(require,module,exports) {
module.exports = {
  "kind": "Document",
  "definitions": [{
    "kind": "OperationDefinition",
    "operation": "query",
    "variableDefinitions": [],
    "directives": [],
    "selectionSet": {
      "kind": "SelectionSet",
      "selections": [{
        "kind": "Field",
        "name": {
          "kind": "Name",
          "value": "getStatus"
        },
        "arguments": [],
        "directives": [],
        "selectionSet": {
          "kind": "SelectionSet",
          "selections": [{
            "kind": "Field",
            "name": {
              "kind": "Name",
              "value": "port"
            },
            "arguments": [],
            "directives": []
          }, {
            "kind": "Field",
            "name": {
              "kind": "Name",
              "value": "online_players"
            },
            "arguments": [],
            "directives": []
          }, {
            "kind": "Field",
            "name": {
              "kind": "Name",
              "value": "players"
            },
            "arguments": [],
            "directives": []
          }]
        }
      }]
    }
  }],
  "loc": {
    "start": 0,
    "end": 40
  }
};
},{}],"../node_modules/@material/list/constants.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.numbers = exports.cssClasses = exports.strings = void 0;

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var cssClasses = {
  LIST_ITEM_ACTIVATED_CLASS: 'mdc-list-item--activated',
  LIST_ITEM_CLASS: 'mdc-list-item',
  LIST_ITEM_DISABLED_CLASS: 'mdc-list-item--disabled',
  LIST_ITEM_SELECTED_CLASS: 'mdc-list-item--selected',
  ROOT: 'mdc-list'
};
exports.cssClasses = cssClasses;
var strings = {
  ACTION_EVENT: 'MDCList:action',
  ARIA_CHECKED: 'aria-checked',
  ARIA_CHECKED_CHECKBOX_SELECTOR: '[role="checkbox"][aria-checked="true"]',
  ARIA_CHECKED_RADIO_SELECTOR: '[role="radio"][aria-checked="true"]',
  ARIA_CURRENT: 'aria-current',
  ARIA_ORIENTATION: 'aria-orientation',
  ARIA_ORIENTATION_HORIZONTAL: 'horizontal',
  ARIA_ROLE_CHECKBOX_SELECTOR: '[role="checkbox"]',
  ARIA_SELECTED: 'aria-selected',
  CHECKBOX_RADIO_SELECTOR: 'input[type="checkbox"]:not(:disabled), input[type="radio"]:not(:disabled)',
  CHECKBOX_SELECTOR: 'input[type="checkbox"]:not(:disabled)',
  CHILD_ELEMENTS_TO_TOGGLE_TABINDEX: "\n    ." + cssClasses.LIST_ITEM_CLASS + " button:not(:disabled),\n    ." + cssClasses.LIST_ITEM_CLASS + " a\n  ",
  FOCUSABLE_CHILD_ELEMENTS: "\n    ." + cssClasses.LIST_ITEM_CLASS + " button:not(:disabled),\n    ." + cssClasses.LIST_ITEM_CLASS + " a,\n    ." + cssClasses.LIST_ITEM_CLASS + " input[type=\"radio\"]:not(:disabled),\n    ." + cssClasses.LIST_ITEM_CLASS + " input[type=\"checkbox\"]:not(:disabled)\n  ",
  RADIO_SELECTOR: 'input[type="radio"]:not(:disabled)'
};
exports.strings = strings;
var numbers = {
  UNSET_INDEX: -1
}; //# sourceMappingURL=constants.js.map

exports.numbers = numbers;
},{}],"../node_modules/@material/list/foundation.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.MDCListFoundation = void 0;

var tslib_1 = _interopRequireWildcard(require("tslib"));

var _foundation = require("@material/base/foundation");

var _constants = require("./constants");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var ELEMENTS_KEY_ALLOWED_IN = ['input', 'button', 'textarea', 'select'];

function isNumberArray(selectedIndex) {
  return selectedIndex instanceof Array;
}

var MDCListFoundation =
/** @class */
function (_super) {
  tslib_1.__extends(MDCListFoundation, _super);

  function MDCListFoundation(adapter) {
    var _this = _super.call(this, tslib_1.__assign({}, MDCListFoundation.defaultAdapter, adapter)) || this;

    _this.wrapFocus_ = false;
    _this.isVertical_ = true;
    _this.isSingleSelectionList_ = false;
    _this.selectedIndex_ = _constants.numbers.UNSET_INDEX;
    _this.focusedItemIndex_ = _constants.numbers.UNSET_INDEX;
    _this.useActivatedClass_ = false;
    _this.ariaCurrentAttrValue_ = null;
    _this.isCheckboxList_ = false;
    _this.isRadioList_ = false;
    return _this;
  }

  Object.defineProperty(MDCListFoundation, "strings", {
    get: function () {
      return _constants.strings;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCListFoundation, "cssClasses", {
    get: function () {
      return _constants.cssClasses;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCListFoundation, "numbers", {
    get: function () {
      return _constants.numbers;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCListFoundation, "defaultAdapter", {
    get: function () {
      return {
        addClassForElementIndex: function () {
          return undefined;
        },
        focusItemAtIndex: function () {
          return undefined;
        },
        getAttributeForElementIndex: function () {
          return null;
        },
        getFocusedElementIndex: function () {
          return 0;
        },
        getListItemCount: function () {
          return 0;
        },
        hasCheckboxAtIndex: function () {
          return false;
        },
        hasRadioAtIndex: function () {
          return false;
        },
        isCheckboxCheckedAtIndex: function () {
          return false;
        },
        isFocusInsideList: function () {
          return false;
        },
        isRootFocused: function () {
          return false;
        },
        notifyAction: function () {
          return undefined;
        },
        removeClassForElementIndex: function () {
          return undefined;
        },
        setAttributeForElementIndex: function () {
          return undefined;
        },
        setCheckedCheckboxOrRadioAtIndex: function () {
          return undefined;
        },
        setTabIndexForListItemChildren: function () {
          return undefined;
        }
      };
    },
    enumerable: true,
    configurable: true
  });

  MDCListFoundation.prototype.layout = function () {
    if (this.adapter_.getListItemCount() === 0) {
      return;
    }

    if (this.adapter_.hasCheckboxAtIndex(0)) {
      this.isCheckboxList_ = true;
    } else if (this.adapter_.hasRadioAtIndex(0)) {
      this.isRadioList_ = true;
    }
  };
  /**
   * Sets the private wrapFocus_ variable.
   */


  MDCListFoundation.prototype.setWrapFocus = function (value) {
    this.wrapFocus_ = value;
  };
  /**
   * Sets the isVertical_ private variable.
   */


  MDCListFoundation.prototype.setVerticalOrientation = function (value) {
    this.isVertical_ = value;
  };
  /**
   * Sets the isSingleSelectionList_ private variable.
   */


  MDCListFoundation.prototype.setSingleSelection = function (value) {
    this.isSingleSelectionList_ = value;
  };
  /**
   * Sets the useActivatedClass_ private variable.
   */


  MDCListFoundation.prototype.setUseActivatedClass = function (useActivated) {
    this.useActivatedClass_ = useActivated;
  };

  MDCListFoundation.prototype.getSelectedIndex = function () {
    return this.selectedIndex_;
  };

  MDCListFoundation.prototype.setSelectedIndex = function (index) {
    if (!this.isIndexValid_(index)) {
      return;
    }

    if (this.isCheckboxList_) {
      this.setCheckboxAtIndex_(index);
    } else if (this.isRadioList_) {
      this.setRadioAtIndex_(index);
    } else {
      this.setSingleSelectionAtIndex_(index);
    }
  };
  /**
   * Focus in handler for the list items.
   */


  MDCListFoundation.prototype.handleFocusIn = function (_, listItemIndex) {
    if (listItemIndex >= 0) {
      this.adapter_.setTabIndexForListItemChildren(listItemIndex, '0');
    }
  };
  /**
   * Focus out handler for the list items.
   */


  MDCListFoundation.prototype.handleFocusOut = function (_, listItemIndex) {
    var _this = this;

    if (listItemIndex >= 0) {
      this.adapter_.setTabIndexForListItemChildren(listItemIndex, '-1');
    }
    /**
     * Between Focusout & Focusin some browsers do not have focus on any element. Setting a delay to wait till the focus
     * is moved to next element.
     */


    setTimeout(function () {
      if (!_this.adapter_.isFocusInsideList()) {
        _this.setTabindexToFirstSelectedItem_();
      }
    }, 0);
  };
  /**
   * Key handler for the list.
   */


  MDCListFoundation.prototype.handleKeydown = function (evt, isRootListItem, listItemIndex) {
    var isArrowLeft = evt.key === 'ArrowLeft' || evt.keyCode === 37;
    var isArrowUp = evt.key === 'ArrowUp' || evt.keyCode === 38;
    var isArrowRight = evt.key === 'ArrowRight' || evt.keyCode === 39;
    var isArrowDown = evt.key === 'ArrowDown' || evt.keyCode === 40;
    var isHome = evt.key === 'Home' || evt.keyCode === 36;
    var isEnd = evt.key === 'End' || evt.keyCode === 35;
    var isEnter = evt.key === 'Enter' || evt.keyCode === 13;
    var isSpace = evt.key === 'Space' || evt.keyCode === 32;

    if (this.adapter_.isRootFocused()) {
      if (isArrowUp || isEnd) {
        evt.preventDefault();
        this.focusLastElement();
      } else if (isArrowDown || isHome) {
        evt.preventDefault();
        this.focusFirstElement();
      }

      return;
    }

    var currentIndex = this.adapter_.getFocusedElementIndex();

    if (currentIndex === -1) {
      currentIndex = listItemIndex;

      if (currentIndex < 0) {
        // If this event doesn't have a mdc-list-item ancestor from the
        // current list (not from a sublist), return early.
        return;
      }
    }

    var nextIndex;

    if (this.isVertical_ && isArrowDown || !this.isVertical_ && isArrowRight) {
      this.preventDefaultEvent_(evt);
      nextIndex = this.focusNextElement(currentIndex);
    } else if (this.isVertical_ && isArrowUp || !this.isVertical_ && isArrowLeft) {
      this.preventDefaultEvent_(evt);
      nextIndex = this.focusPrevElement(currentIndex);
    } else if (isHome) {
      this.preventDefaultEvent_(evt);
      nextIndex = this.focusFirstElement();
    } else if (isEnd) {
      this.preventDefaultEvent_(evt);
      nextIndex = this.focusLastElement();
    } else if (isEnter || isSpace) {
      if (isRootListItem) {
        // Return early if enter key is pressed on anchor element which triggers synthetic MouseEvent event.
        var target = evt.target;

        if (target && target.tagName === 'A' && isEnter) {
          return;
        }

        this.preventDefaultEvent_(evt);

        if (this.isSelectableList_()) {
          this.setSelectedIndexOnAction_(currentIndex);
        }

        this.adapter_.notifyAction(currentIndex);
      }
    }

    this.focusedItemIndex_ = currentIndex;

    if (nextIndex !== undefined) {
      this.setTabindexAtIndex_(nextIndex);
      this.focusedItemIndex_ = nextIndex;
    }
  };
  /**
   * Click handler for the list.
   */


  MDCListFoundation.prototype.handleClick = function (index, toggleCheckbox) {
    if (index === _constants.numbers.UNSET_INDEX) {
      return;
    }

    if (this.isSelectableList_()) {
      this.setSelectedIndexOnAction_(index, toggleCheckbox);
    }

    this.adapter_.notifyAction(index);
    this.setTabindexAtIndex_(index);
    this.focusedItemIndex_ = index;
  };
  /**
   * Focuses the next element on the list.
   */


  MDCListFoundation.prototype.focusNextElement = function (index) {
    var count = this.adapter_.getListItemCount();
    var nextIndex = index + 1;

    if (nextIndex >= count) {
      if (this.wrapFocus_) {
        nextIndex = 0;
      } else {
        // Return early because last item is already focused.
        return index;
      }
    }

    this.adapter_.focusItemAtIndex(nextIndex);
    return nextIndex;
  };
  /**
   * Focuses the previous element on the list.
   */


  MDCListFoundation.prototype.focusPrevElement = function (index) {
    var prevIndex = index - 1;

    if (prevIndex < 0) {
      if (this.wrapFocus_) {
        prevIndex = this.adapter_.getListItemCount() - 1;
      } else {
        // Return early because first item is already focused.
        return index;
      }
    }

    this.adapter_.focusItemAtIndex(prevIndex);
    return prevIndex;
  };

  MDCListFoundation.prototype.focusFirstElement = function () {
    this.adapter_.focusItemAtIndex(0);
    return 0;
  };

  MDCListFoundation.prototype.focusLastElement = function () {
    var lastIndex = this.adapter_.getListItemCount() - 1;
    this.adapter_.focusItemAtIndex(lastIndex);
    return lastIndex;
  };
  /**
   * Ensures that preventDefault is only called if the containing element doesn't
   * consume the event, and it will cause an unintended scroll.
   */


  MDCListFoundation.prototype.preventDefaultEvent_ = function (evt) {
    var target = evt.target;
    var tagName = ("" + target.tagName).toLowerCase();

    if (ELEMENTS_KEY_ALLOWED_IN.indexOf(tagName) === -1) {
      evt.preventDefault();
    }
  };

  MDCListFoundation.prototype.setSingleSelectionAtIndex_ = function (index) {
    if (this.selectedIndex_ === index) {
      return;
    }

    var selectedClassName = _constants.cssClasses.LIST_ITEM_SELECTED_CLASS;

    if (this.useActivatedClass_) {
      selectedClassName = _constants.cssClasses.LIST_ITEM_ACTIVATED_CLASS;
    }

    if (this.selectedIndex_ !== _constants.numbers.UNSET_INDEX) {
      this.adapter_.removeClassForElementIndex(this.selectedIndex_, selectedClassName);
    }

    this.adapter_.addClassForElementIndex(index, selectedClassName);
    this.setAriaForSingleSelectionAtIndex_(index);
    this.selectedIndex_ = index;
  };
  /**
   * Sets aria attribute for single selection at given index.
   */


  MDCListFoundation.prototype.setAriaForSingleSelectionAtIndex_ = function (index) {
    // Detect the presence of aria-current and get the value only during list initialization when it is in unset state.
    if (this.selectedIndex_ === _constants.numbers.UNSET_INDEX) {
      this.ariaCurrentAttrValue_ = this.adapter_.getAttributeForElementIndex(index, _constants.strings.ARIA_CURRENT);
    }

    var isAriaCurrent = this.ariaCurrentAttrValue_ !== null;
    var ariaAttribute = isAriaCurrent ? _constants.strings.ARIA_CURRENT : _constants.strings.ARIA_SELECTED;

    if (this.selectedIndex_ !== _constants.numbers.UNSET_INDEX) {
      this.adapter_.setAttributeForElementIndex(this.selectedIndex_, ariaAttribute, 'false');
    }

    var ariaAttributeValue = isAriaCurrent ? this.ariaCurrentAttrValue_ : 'true';
    this.adapter_.setAttributeForElementIndex(index, ariaAttribute, ariaAttributeValue);
  };
  /**
   * Toggles radio at give index. Radio doesn't change the checked state if it is already checked.
   */


  MDCListFoundation.prototype.setRadioAtIndex_ = function (index) {
    this.adapter_.setCheckedCheckboxOrRadioAtIndex(index, true);

    if (this.selectedIndex_ !== _constants.numbers.UNSET_INDEX) {
      this.adapter_.setAttributeForElementIndex(this.selectedIndex_, _constants.strings.ARIA_CHECKED, 'false');
    }

    this.adapter_.setAttributeForElementIndex(index, _constants.strings.ARIA_CHECKED, 'true');
    this.selectedIndex_ = index;
  };

  MDCListFoundation.prototype.setCheckboxAtIndex_ = function (index) {
    for (var i = 0; i < this.adapter_.getListItemCount(); i++) {
      var isChecked = false;

      if (index.indexOf(i) >= 0) {
        isChecked = true;
      }

      this.adapter_.setCheckedCheckboxOrRadioAtIndex(i, isChecked);
      this.adapter_.setAttributeForElementIndex(i, _constants.strings.ARIA_CHECKED, isChecked ? 'true' : 'false');
    }

    this.selectedIndex_ = index;
  };

  MDCListFoundation.prototype.setTabindexAtIndex_ = function (index) {
    if (this.focusedItemIndex_ === _constants.numbers.UNSET_INDEX && index !== 0) {
      // If no list item was selected set first list item's tabindex to -1.
      // Generally, tabindex is set to 0 on first list item of list that has no preselected items.
      this.adapter_.setAttributeForElementIndex(0, 'tabindex', '-1');
    } else if (this.focusedItemIndex_ >= 0 && this.focusedItemIndex_ !== index) {
      this.adapter_.setAttributeForElementIndex(this.focusedItemIndex_, 'tabindex', '-1');
    }

    this.adapter_.setAttributeForElementIndex(index, 'tabindex', '0');
  };
  /**
   * @return Return true if it is single selectin list, checkbox list or radio list.
   */


  MDCListFoundation.prototype.isSelectableList_ = function () {
    return this.isSingleSelectionList_ || this.isCheckboxList_ || this.isRadioList_;
  };

  MDCListFoundation.prototype.setTabindexToFirstSelectedItem_ = function () {
    var targetIndex = 0;

    if (this.isSelectableList_()) {
      if (typeof this.selectedIndex_ === 'number' && this.selectedIndex_ !== _constants.numbers.UNSET_INDEX) {
        targetIndex = this.selectedIndex_;
      } else if (isNumberArray(this.selectedIndex_) && this.selectedIndex_.length > 0) {
        targetIndex = this.selectedIndex_.reduce(function (currentIndex, minIndex) {
          return Math.min(currentIndex, minIndex);
        });
      }
    }

    this.setTabindexAtIndex_(targetIndex);
  };

  MDCListFoundation.prototype.isIndexValid_ = function (index) {
    var _this = this;

    if (index instanceof Array) {
      if (!this.isCheckboxList_) {
        throw new Error('MDCListFoundation: Array of index is only supported for checkbox based list');
      }

      if (index.length === 0) {
        return true;
      } else {
        return index.some(function (i) {
          return _this.isIndexInRange_(i);
        });
      }
    } else if (typeof index === 'number') {
      if (this.isCheckboxList_) {
        throw new Error('MDCListFoundation: Expected array of index for checkbox based list but got number: ' + index);
      }

      return this.isIndexInRange_(index);
    } else {
      return false;
    }
  };

  MDCListFoundation.prototype.isIndexInRange_ = function (index) {
    var listSize = this.adapter_.getListItemCount();
    return index >= 0 && index < listSize;
  };

  MDCListFoundation.prototype.setSelectedIndexOnAction_ = function (index, toggleCheckbox) {
    if (toggleCheckbox === void 0) {
      toggleCheckbox = true;
    }

    if (this.isCheckboxList_) {
      this.toggleCheckboxAtIndex_(index, toggleCheckbox);
    } else {
      this.setSelectedIndex(index);
    }
  };

  MDCListFoundation.prototype.toggleCheckboxAtIndex_ = function (index, toggleCheckbox) {
    var isChecked = this.adapter_.isCheckboxCheckedAtIndex(index);

    if (toggleCheckbox) {
      isChecked = !isChecked;
      this.adapter_.setCheckedCheckboxOrRadioAtIndex(index, isChecked);
    }

    this.adapter_.setAttributeForElementIndex(index, _constants.strings.ARIA_CHECKED, isChecked ? 'true' : 'false'); // If none of the checkbox items are selected and selectedIndex is not initialized then provide a default value.

    var selectedIndexes = this.selectedIndex_ === _constants.numbers.UNSET_INDEX ? [] : this.selectedIndex_.slice();

    if (isChecked) {
      selectedIndexes.push(index);
    } else {
      selectedIndexes = selectedIndexes.filter(function (i) {
        return i !== index;
      });
    }

    this.selectedIndex_ = selectedIndexes;
  };

  return MDCListFoundation;
}(_foundation.MDCFoundation);

exports.MDCListFoundation = MDCListFoundation;
// tslint:disable-next-line:no-default-export Needed for backward compatibility with MDC Web v0.44.0 and earlier.
var _default = MDCListFoundation; //# sourceMappingURL=foundation.js.map

exports.default = _default;
},{"tslib":"../node_modules/tslib/tslib.es6.js","@material/base/foundation":"../node_modules/@material/base/foundation.js","./constants":"../node_modules/@material/list/constants.js"}],"../node_modules/@material/list/component.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MDCList = void 0;

var tslib_1 = _interopRequireWildcard(require("tslib"));

var _component = require("@material/base/component");

var _ponyfill = require("@material/dom/ponyfill");

var _constants = require("./constants");

var _foundation = require("./foundation");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var MDCList =
/** @class */
function (_super) {
  tslib_1.__extends(MDCList, _super);

  function MDCList() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  Object.defineProperty(MDCList.prototype, "vertical", {
    set: function (value) {
      this.foundation_.setVerticalOrientation(value);
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCList.prototype, "listElements", {
    get: function () {
      return [].slice.call(this.root_.querySelectorAll("." + _constants.cssClasses.LIST_ITEM_CLASS));
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCList.prototype, "wrapFocus", {
    set: function (value) {
      this.foundation_.setWrapFocus(value);
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCList.prototype, "singleSelection", {
    set: function (isSingleSelectionList) {
      this.foundation_.setSingleSelection(isSingleSelectionList);
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCList.prototype, "selectedIndex", {
    get: function () {
      return this.foundation_.getSelectedIndex();
    },
    set: function (index) {
      this.foundation_.setSelectedIndex(index);
    },
    enumerable: true,
    configurable: true
  });

  MDCList.attachTo = function (root) {
    return new MDCList(root);
  };

  MDCList.prototype.initialSyncWithDOM = function () {
    this.handleClick_ = this.handleClickEvent_.bind(this);
    this.handleKeydown_ = this.handleKeydownEvent_.bind(this);
    this.focusInEventListener_ = this.handleFocusInEvent_.bind(this);
    this.focusOutEventListener_ = this.handleFocusOutEvent_.bind(this);
    this.listen('keydown', this.handleKeydown_);
    this.listen('click', this.handleClick_);
    this.listen('focusin', this.focusInEventListener_);
    this.listen('focusout', this.focusOutEventListener_);
    this.layout();
    this.initializeListType();
  };

  MDCList.prototype.destroy = function () {
    this.unlisten('keydown', this.handleKeydown_);
    this.unlisten('click', this.handleClick_);
    this.unlisten('focusin', this.focusInEventListener_);
    this.unlisten('focusout', this.focusOutEventListener_);
  };

  MDCList.prototype.layout = function () {
    var direction = this.root_.getAttribute(_constants.strings.ARIA_ORIENTATION);
    this.vertical = direction !== _constants.strings.ARIA_ORIENTATION_HORIZONTAL; // List items need to have at least tabindex=-1 to be focusable.

    [].slice.call(this.root_.querySelectorAll('.mdc-list-item:not([tabindex])')).forEach(function (el) {
      el.setAttribute('tabindex', '-1');
    }); // Child button/a elements are not tabbable until the list item is focused.

    [].slice.call(this.root_.querySelectorAll(_constants.strings.FOCUSABLE_CHILD_ELEMENTS)).forEach(function (el) {
      return el.setAttribute('tabindex', '-1');
    });
    this.foundation_.layout();
  };
  /**
   * Initialize selectedIndex value based on pre-selected checkbox list items, single selection or radio.
   */


  MDCList.prototype.initializeListType = function () {
    var _this = this;

    var checkboxListItems = this.root_.querySelectorAll(_constants.strings.ARIA_ROLE_CHECKBOX_SELECTOR);
    var singleSelectedListItem = this.root_.querySelector("\n      ." + _constants.cssClasses.LIST_ITEM_ACTIVATED_CLASS + ",\n      ." + _constants.cssClasses.LIST_ITEM_SELECTED_CLASS + "\n    ");
    var radioSelectedListItem = this.root_.querySelector(_constants.strings.ARIA_CHECKED_RADIO_SELECTOR);

    if (checkboxListItems.length) {
      var preselectedItems = this.root_.querySelectorAll(_constants.strings.ARIA_CHECKED_CHECKBOX_SELECTOR);
      this.selectedIndex = [].map.call(preselectedItems, function (listItem) {
        return _this.listElements.indexOf(listItem);
      });
    } else if (singleSelectedListItem) {
      if (singleSelectedListItem.classList.contains(_constants.cssClasses.LIST_ITEM_ACTIVATED_CLASS)) {
        this.foundation_.setUseActivatedClass(true);
      }

      this.singleSelection = true;
      this.selectedIndex = this.listElements.indexOf(singleSelectedListItem);
    } else if (radioSelectedListItem) {
      this.selectedIndex = this.listElements.indexOf(radioSelectedListItem);
    }
  };

  MDCList.prototype.getDefaultFoundation = function () {
    var _this = this; // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<MDCFooAdapter>.
    // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.


    var adapter = {
      addClassForElementIndex: function (index, className) {
        var element = _this.listElements[index];

        if (element) {
          element.classList.add(className);
        }
      },
      focusItemAtIndex: function (index) {
        var element = _this.listElements[index];

        if (element) {
          element.focus();
        }
      },
      getAttributeForElementIndex: function (index, attr) {
        return _this.listElements[index].getAttribute(attr);
      },
      getFocusedElementIndex: function () {
        return _this.listElements.indexOf(document.activeElement);
      },
      getListItemCount: function () {
        return _this.listElements.length;
      },
      hasCheckboxAtIndex: function (index) {
        var listItem = _this.listElements[index];
        return !!listItem.querySelector(_constants.strings.CHECKBOX_SELECTOR);
      },
      hasRadioAtIndex: function (index) {
        var listItem = _this.listElements[index];
        return !!listItem.querySelector(_constants.strings.RADIO_SELECTOR);
      },
      isCheckboxCheckedAtIndex: function (index) {
        var listItem = _this.listElements[index];
        var toggleEl = listItem.querySelector(_constants.strings.CHECKBOX_SELECTOR);
        return toggleEl.checked;
      },
      isFocusInsideList: function () {
        return _this.root_.contains(document.activeElement);
      },
      isRootFocused: function () {
        return document.activeElement === _this.root_;
      },
      notifyAction: function (index) {
        _this.emit(_constants.strings.ACTION_EVENT, {
          index: index
        },
        /** shouldBubble */
        true);
      },
      removeClassForElementIndex: function (index, className) {
        var element = _this.listElements[index];

        if (element) {
          element.classList.remove(className);
        }
      },
      setAttributeForElementIndex: function (index, attr, value) {
        var element = _this.listElements[index];

        if (element) {
          element.setAttribute(attr, value);
        }
      },
      setCheckedCheckboxOrRadioAtIndex: function (index, isChecked) {
        var listItem = _this.listElements[index];
        var toggleEl = listItem.querySelector(_constants.strings.CHECKBOX_RADIO_SELECTOR);
        toggleEl.checked = isChecked;
        var event = document.createEvent('Event');
        event.initEvent('change', true, true);
        toggleEl.dispatchEvent(event);
      },
      setTabIndexForListItemChildren: function (listItemIndex, tabIndexValue) {
        var element = _this.listElements[listItemIndex];
        var listItemChildren = [].slice.call(element.querySelectorAll(_constants.strings.CHILD_ELEMENTS_TO_TOGGLE_TABINDEX));
        listItemChildren.forEach(function (el) {
          return el.setAttribute('tabindex', tabIndexValue);
        });
      }
    };
    return new _foundation.MDCListFoundation(adapter);
  };
  /**
   * Used to figure out which list item this event is targetting. Or returns -1 if
   * there is no list item
   */


  MDCList.prototype.getListItemIndex_ = function (evt) {
    var eventTarget = evt.target;
    var nearestParent = (0, _ponyfill.closest)(eventTarget, "." + _constants.cssClasses.LIST_ITEM_CLASS + ", ." + _constants.cssClasses.ROOT); // Get the index of the element if it is a list item.

    if (nearestParent && (0, _ponyfill.matches)(nearestParent, "." + _constants.cssClasses.LIST_ITEM_CLASS)) {
      return this.listElements.indexOf(nearestParent);
    }

    return -1;
  };
  /**
   * Used to figure out which element was clicked before sending the event to the foundation.
   */


  MDCList.prototype.handleFocusInEvent_ = function (evt) {
    var index = this.getListItemIndex_(evt);
    this.foundation_.handleFocusIn(evt, index);
  };
  /**
   * Used to figure out which element was clicked before sending the event to the foundation.
   */


  MDCList.prototype.handleFocusOutEvent_ = function (evt) {
    var index = this.getListItemIndex_(evt);
    this.foundation_.handleFocusOut(evt, index);
  };
  /**
   * Used to figure out which element was focused when keydown event occurred before sending the event to the
   * foundation.
   */


  MDCList.prototype.handleKeydownEvent_ = function (evt) {
    var index = this.getListItemIndex_(evt);
    var target = evt.target;
    this.foundation_.handleKeydown(evt, target.classList.contains(_constants.cssClasses.LIST_ITEM_CLASS), index);
  };
  /**
   * Used to figure out which element was clicked before sending the event to the foundation.
   */


  MDCList.prototype.handleClickEvent_ = function (evt) {
    var index = this.getListItemIndex_(evt);
    var target = evt.target; // Toggle the checkbox only if it's not the target of the event, or the checkbox will have 2 change events.

    var toggleCheckbox = !(0, _ponyfill.matches)(target, _constants.strings.CHECKBOX_RADIO_SELECTOR);
    this.foundation_.handleClick(index, toggleCheckbox);
  };

  return MDCList;
}(_component.MDCComponent); //# sourceMappingURL=component.js.map


exports.MDCList = MDCList;
},{"tslib":"../node_modules/tslib/tslib.es6.js","@material/base/component":"../node_modules/@material/base/component.js","@material/dom/ponyfill":"../node_modules/@material/dom/ponyfill.js","./constants":"../node_modules/@material/list/constants.js","./foundation":"../node_modules/@material/list/foundation.js"}],"../node_modules/@material/list/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _component = require("./component");

Object.keys(_component).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _component[key];
    }
  });
});

var _constants = require("./constants");

Object.keys(_constants).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _constants[key];
    }
  });
});

var _foundation = require("./foundation");

Object.keys(_foundation).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _foundation[key];
    }
  });
});
},{"./component":"../node_modules/@material/list/component.js","./constants":"../node_modules/@material/list/constants.js","./foundation":"../node_modules/@material/list/foundation.js"}],"../node_modules/@rmwc/list/next/list.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.List = void 0;

var React = _interopRequireWildcard(require("react"));

var _list = require("@material/list");

var _base = require("@rmwc/base");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

var __extends = void 0 && (void 0).__extends || function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };

    return extendStatics(d, b);
  };

  return function (d, b) {
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __assign = void 0 && (void 0).__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};

  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0) t[p[i]] = s[p[i]];
  return t;
};

/** A List Component */
var ListRoot = (0, _base.componentFactory)({
  displayName: 'ListRoot',
  defaultProps: {
    dense: undefined,
    twoLine: undefined,
    avatarList: undefined,
    nonInteractive: undefined
  },
  classNames: function (props) {
    return ['mdc-list', {
      'mdc-list--dense': props.dense,
      'mdc-list--two-line': props.twoLine,
      'mdc-list--avatar-list': props.avatarList,
      'mdc-list--non-interactive': props.nonInteractive
    }];
  },
  consumeProps: ['dense', 'twoLine', 'avatarList', 'nonInteractive', 'onAction']
});
/** A List Component */

var List =
/** @class */
function (_super) {
  __extends(List, _super);

  function List(props) {
    var _this = _super.call(this, props) || this;

    _this.root = _this.createElement('root');
    _this.handleClick = _this.handleClick.bind(_this);
    _this.handleKeydown = _this.handleKeydown.bind(_this);
    _this.handleFocusIn = _this.handleFocusIn.bind(_this);
    _this.handleFocusOut = _this.handleFocusOut.bind(_this);
    return _this;
  }

  Object.defineProperty(List, "cssClasses", {
    get: function () {
      return _list.MDCListFoundation.cssClasses;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(List.prototype, "listElements", {
    get: function () {
      if (this.root.ref) {
        return [].slice.call(this.root.ref.querySelectorAll("." + _list.MDCListFoundation.cssClasses.LIST_ITEM_CLASS));
      }

      return [];
    },
    enumerable: true,
    configurable: true
  });

  List.prototype.componentDidMount = function () {
    _super.prototype.componentDidMount.call(this);

    this.foundation.layout();
  };

  List.prototype.focusItemAtIndex = function (index) {
    this.foundation.adapter_.focusItemAtIndex(index);
  };

  List.prototype.getDefaultFoundation = function () {
    var _this = this;

    return new _list.MDCListFoundation(
    /** @type {!MDCListAdapter} */
    Object.assign({
      getListItemCount: function () {
        return _this.listElements.length;
      },
      getFocusedElementIndex: function () {
        return _this.listElements.indexOf(document.activeElement);
      },
      setAttributeForElementIndex: function (index, attr, value) {
        // This value is getting set and never getting set back
        // This is causing list items to be un-tabbable
        if (attr === 'tabindex' && value === -1) {
          return;
        }

        var element = _this.listElements[index];

        if (element) {
          element.setAttribute(attr, String(value));
        }
      },
      removeAttributeForElementIndex: function (index, attr) {
        var element = _this.listElements[index];

        if (element) {
          element.removeAttribute(attr);
        }
      },
      addClassForElementIndex: function (index, className) {
        var element = _this.listElements[index];

        if (element) {
          element.classList.add(className);
        }
      },
      removeClassForElementIndex: function (index, className) {
        var element = _this.listElements[index];

        if (element) {
          element.classList.remove(className);
        }
      },
      focusItemAtIndex: function (index) {
        var element = _this.listElements[index];

        if (element) {
          element.focus();
        }
      },
      setTabIndexForListItemChildren: function (listItemIndex, tabIndexValue) {
        var element = _this.listElements[listItemIndex];
        var listItemChildren = [].slice.call(element.querySelectorAll(_list.MDCListFoundation.strings.CHILD_ELEMENTS_TO_TOGGLE_TABINDEX));
        listItemChildren.forEach(function (ele) {
          return ele.setAttribute('tabindex', String(tabIndexValue));
        });
      },
      hasCheckboxAtIndex: function (index) {
        var listItem = _this.listElements[index];
        return !!listItem.querySelector(_list.MDCListFoundation.strings.CHECKBOX_SELECTOR);
      },
      hasRadioAtIndex: function (index) {
        var listItem = _this.listElements[index];
        return !!listItem.querySelector(_list.MDCListFoundation.strings.RADIO_SELECTOR);
      },
      isCheckboxCheckedAtIndex: function (index) {
        var listItem = _this.listElements[index];
        var toggleEl = listItem.querySelector(_list.MDCListFoundation.strings.CHECKBOX_SELECTOR);
        return toggleEl ? toggleEl.checked : false;
      },
      setCheckedCheckboxOrRadioAtIndex: function (index, isChecked) {
        var listItem = _this.listElements[index];
        var toggleEl = listItem.querySelector(_list.MDCListFoundation.strings.CHECKBOX_RADIO_SELECTOR);

        if (toggleEl) {
          toggleEl.checked = isChecked;
          var event_1 = document.createEvent('Event');
          event_1.initEvent('change', true, true);
          toggleEl.dispatchEvent(event_1);
        }
      },
      notifyAction: function (index) {
        _this.emit('onAction', index);
      },
      isFocusInsideList: function () {
        return _this.root.ref && _this.root.ref.contains(document.activeElement);
      }
    }));
  };
  /**
   * Used to figure out which list item this event is targetting. Or returns -1 if
   * there is no list item
   */


  List.prototype.getListItemIndex = function (evt) {
    var eventTarget = evt.target;
    var index = -1; // Find the first ancestor that is a list item or the list.

    while (eventTarget && !eventTarget.classList.contains(_list.MDCListFoundation.cssClasses.LIST_ITEM_CLASS) && !eventTarget.classList.contains(_list.MDCListFoundation.cssClasses.ROOT)) {
      eventTarget = eventTarget.parentElement;
    } // Get the index of the element if it is a list item.


    if (eventTarget && eventTarget.classList.contains(_list.MDCListFoundation.cssClasses.LIST_ITEM_CLASS)) {
      index = this.listElements.indexOf(eventTarget);
    }

    return index;
  };

  List.prototype.handleClick = function (evt) {
    this.props.onClick && this.props.onClick(evt);
    var index = this.getListItemIndex(evt); // Toggle the checkbox only if it's not the target of the event, or the checkbox will have 2 change events.

    var toggleCheckbox = !(0, _base.matches)(evt.target, _list.MDCListFoundation.strings.CHECKBOX_RADIO_SELECTOR);
    this.foundation.handleClick(index, toggleCheckbox);
  };

  List.prototype.handleKeydown = function (evt) {
    this.props.onKeyDown && this.props.onKeyDown(evt);
    var index = this.getListItemIndex(evt);

    if (index >= 0) {
      this.foundation.handleKeydown(evt, evt.target instanceof Element && evt.target.classList.contains(_list.MDCListFoundation.cssClasses.LIST_ITEM_CLASS), index);
    }
  };

  List.prototype.handleFocusIn = function (evt) {
    this.props.onFocus && this.props.onFocus(evt);
    this.foundation.handleFocusIn(evt, this.getListItemIndex(evt));
  };

  List.prototype.handleFocusOut = function (evt) {
    this.props.onBlur && this.props.onBlur(evt);
    this.foundation.handleFocusOut(evt, this.getListItemIndex(evt));
  };

  List.prototype.render = function () {
    var rest = __rest(this.props, []);

    return React.createElement(ListRoot, __assign({}, rest, {
      ref: this.root.setRef,
      onClick: this.handleClick,
      onKeyDown: this.handleKeydown,
      onFocus: this.handleFocusIn,
      onBlur: this.handleFocusOut
    }));
  };

  return List;
}(_base.FoundationComponent);

exports.List = List;
},{"react":"../node_modules/react/index.js","@material/list":"../node_modules/@material/list/index.js","@rmwc/base":"../node_modules/@rmwc/base/next/index.js"}],"../node_modules/@rmwc/list/next/list-item.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SimpleListItem = exports.ListDivider = exports.ListGroupSubheader = exports.ListGroup = exports.ListItemMeta = exports.ListItemGraphic = exports.ListItemSecondaryText = exports.ListItemPrimaryText = exports.ListItemText = exports.ListItem = void 0;

var React = _interopRequireWildcard(require("react"));

var _base = require("@rmwc/base");

var _ripple = require("@rmwc/ripple");

var _icon = require("@rmwc/icon");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

var __assign = void 0 && (void 0).__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};

  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0) t[p[i]] = s[p[i]];
  return t;
};

/** A ListItem component. */
var ListItem = (0, _ripple.withRipple)({
  surface: false
})((0, _base.componentFactory)({
  displayName: 'ListItem',
  defaultProps: {
    tabIndex: 0
  },
  classNames: function (props) {
    return ['mdc-list-item', {
      'mdc-list-item--selected': props.selected,
      'mdc-list-item--activated': props.activated,
      'mdc-list-item--disabled': props.disabled
    }];
  },
  consumeProps: ['selected', 'activated', 'disabled', 'options'] //options is from the select element

}));
/** Text Wrapper for the ListItem */

exports.ListItem = ListItem;
var ListItemText = (0, _base.componentFactory)({
  displayName: 'ListItemText',
  tag: 'span',
  classNames: ['mdc-list-item__text']
});
/** Primary Text for the ListItem */

exports.ListItemText = ListItemText;
var ListItemPrimaryText = (0, _base.componentFactory)({
  displayName: 'ListItemPrimaryText',
  tag: 'span',
  classNames: ['mdc-list-item__primary-text']
});
/** Secondary text for the ListItem */

exports.ListItemPrimaryText = ListItemPrimaryText;
var ListItemSecondaryText = (0, _base.componentFactory)({
  displayName: 'ListItemSecondaryText',
  tag: 'span',
  classNames: ['mdc-list-item__secondary-text']
});
/** A graphic / icon for the ListItem */

exports.ListItemSecondaryText = ListItemSecondaryText;
var ListItemGraphic = (0, _base.componentFactory)({
  displayName: 'ListItemGraphic',
  classNames: ['mdc-list-item__graphic'],
  tag: _icon.Icon
});
/** Meta content for the ListItem. This can either by an icon by setting the `icon` prop, or any other kind of content. */

exports.ListItemGraphic = ListItemGraphic;
var ListItemMeta = (0, _base.componentFactory)({
  displayName: 'ListItemMeta',
  classNames: ['mdc-list-item__meta'],
  tag: 'div',
  render: function (props, ref, Tag) {
    if (!!props.icon) {
      return React.createElement(_icon.Icon, __assign({
        ref: ref
      }, props));
    }

    if (React.isValidElement(props.children)) {
      var children = props.children,
          rest = __rest(props, ["children"]);

      return React.cloneElement(props.children, __assign({}, rest, props.children.props, {
        className: (0, _base.classNames)(props.className, props.children.props.className)
      }));
    }

    return React.createElement(Tag, __assign({
      ref: ref
    }, props));
  }
});
/** A container to group ListItems */

exports.ListItemMeta = ListItemMeta;
var ListGroup = (0, _base.componentFactory)({
  displayName: 'ListGroup',
  classNames: ['mdc-list-group']
});
/** A subheader for the ListGroup */

exports.ListGroup = ListGroup;
var ListGroupSubheader = (0, _base.componentFactory)({
  displayName: 'ListGroupSubheader',
  classNames: ['mdc-list-group__subheader']
});
/** A divider for the List */

exports.ListGroupSubheader = ListGroupSubheader;
var ListDivider = (0, _base.componentFactory)({
  displayName: 'ListDivider',
  classNames: ['mdc-list-divider']
});
/** A simple list item template. */

exports.ListDivider = ListDivider;

var SimpleListItem = function (_a) {
  var text = _a.text,
      secondaryText = _a.secondaryText,
      graphic = _a.graphic,
      metaIcon = _a.metaIcon,
      meta = _a.meta,
      children = _a.children,
      rest = __rest(_a, ["text", "secondaryText", "graphic", "metaIcon", "meta", "children"]);

  var primaryTextToRender = text && secondaryText !== undefined ? React.createElement(ListItemPrimaryText, null, text) : text;
  var secondaryTextToRender = secondaryText !== undefined ? React.createElement(ListItemSecondaryText, null, secondaryText) : null;
  return React.createElement(ListItem, __assign({}, rest), graphic !== undefined && React.createElement(ListItemGraphic, {
    icon: graphic
  }), secondaryTextToRender !== null ? React.createElement(ListItemText, null, primaryTextToRender, secondaryTextToRender) : primaryTextToRender, (!!meta || !!metaIcon) && React.createElement(ListItemMeta, {
    icon: metaIcon
  }, meta), children);
};

exports.SimpleListItem = SimpleListItem;
SimpleListItem.displayName = 'SimpleListItem';
},{"react":"../node_modules/react/index.js","@rmwc/base":"../node_modules/@rmwc/base/next/index.js","@rmwc/ripple":"../node_modules/@rmwc/ripple/next/index.js","@rmwc/icon":"../node_modules/@rmwc/icon/next/index.js"}],"../node_modules/@rmwc/list/next/collapsible-list.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CollapsibleList = void 0;

var React = _interopRequireWildcard(require("react"));

var _base = require("@rmwc/base");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

var __extends = void 0 && (void 0).__extends || function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };

    return extendStatics(d, b);
  };

  return function (d, b) {
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __assign = void 0 && (void 0).__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};

  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0) t[p[i]] = s[p[i]];
  return t;
};

var CollapsibleRoot = (0, _base.componentFactory)({
  displayName: 'CollapsibleRoot',
  classNames: ['rmwc-collapsible-list']
});

var possiblyFocusElement = function (el) {
  if (!el) return false;
  var tabIndex = el.getAttribute('tabindex');

  if (tabIndex && Number(tabIndex) >= 0) {
    el.focus();
    return true;
  }

  return false;
};

var getNextSibling = function (el, isBack) {
  if (!el) return null;
  var next = isBack ? el.previousElementSibling : el.nextElementSibling;

  if (next === null) {
    return getNextSibling(el.parentElement, isBack);
  }

  return next;
};
/** A collapsible list component. */


var CollapsibleList =
/** @class */
function (_super) {
  __extends(CollapsibleList, _super);

  function CollapsibleList(props) {
    var _this = _super.call(this, props) || this;

    _this.childContainer = null;
    _this.root = null;
    _this.state = {
      open: !!_this.props.startOpen || !!_this.props.open,
      childrenStyle: {}
    };
    _this.handleClick = _this.handleClick.bind(_this);
    _this.handleKeydown = _this.handleKeydown.bind(_this);
    _this.handleFocus = _this.handleFocus.bind(_this);
    return _this;
  }

  CollapsibleList.getDerivedStateFromProps = function (props, state) {
    if (props.open !== undefined && props.open !== state.open) {
      return __assign({}, state, {
        open: props.open
      });
    }

    return state;
  };

  CollapsibleList.prototype.componentDidMount = function () {
    this.syncOpenState();
  };

  CollapsibleList.prototype.componentDidUpdate = function (prevProps, prevState) {
    if (prevState.open !== this.state.open) {
      this.syncOpenState();
    }
  };

  CollapsibleList.prototype.syncOpenState = function () {
    var _this = this;

    var _a = this.props,
        onOpen = _a.onOpen,
        onClose = _a.onClose;
    var childrenStyle = {
      maxHeight: this.childContainer ? this.childContainer.offsetHeight + "px" : '0px'
    };
    this.setState({
      childrenStyle: childrenStyle
    }, function () {
      if (_this.state.open) {
        onOpen && onOpen();
        setTimeout(function () {
          if (_this.state.open) {
            _this.setState({
              childrenStyle: {
                maxHeight: 'none'
              }
            });
          }
        }, 300);
      } else {
        onClose && onClose();
        window.requestAnimationFrame(function () {
          _this.setState({
            childrenStyle: {}
          });
        });
      }
    });
  };

  CollapsibleList.prototype.correctFocus = function (back) {
    var _this = this;

    window.requestAnimationFrame(function () {
      if (!_this.state.open && _this.root && _this.root.contains(document.activeElement)) {
        var sibling = getNextSibling(_this.root, back);

        if (possiblyFocusElement(sibling)) {
          return;
        }

        if (sibling) {
          var els = sibling.querySelectorAll('[tabindex]');

          for (var i = 0; i < els.length; i++) {
            if (possiblyFocusElement(els[i])) {
              break;
            }
          }
        }
      }
    });
  };

  CollapsibleList.prototype.toggleOpen = function (isOpen) {
    this.setState({
      open: isOpen
    });
  };

  CollapsibleList.prototype.handleClick = function (evt) {
    // call events that might have been on the handle
    var handle = this.props.handle;
    handle.props.onClick && handle.props.onClick(evt);
    this.toggleOpen(!this.state.open);
  };

  CollapsibleList.prototype.handleKeydown = function (evt) {
    // call events that might have been on the handle
    var handle = this.props.handle;
    handle.props.onKeyDown && handle.props.onKeyDown(evt);

    switch (evt.which) {
      case 13:
        this.toggleOpen(!this.state.open);
        return;

      case 39:
        this.toggleOpen(true);
        return;

      case 38:
      case 40:
      case 9:
        var isBack = evt.shiftKey || evt.which === 38;
        this.correctFocus(isBack);
        return;

      case 37:
        this.toggleOpen(false);
        return;

      default:
        break;
    }
  };

  CollapsibleList.prototype.handleFocus = function (evt) {
    if (!this.state.open && this.root && this.childContainer && this.childContainer.contains(document.activeElement)) {
      var el = this.root.querySelector('.rmwc-collapsible-list__handle .mdc-list-item');
      el && el.focus();
    }
  };

  CollapsibleList.prototype.render = function () {
    var _this = this;

    var _a;

    var _b = this.props,
        children = _b.children,
        handle = _b.handle,
        onOpen = _b.onOpen,
        onClose = _b.onClose,
        openProp = _b.open,
        startOpen = _b.startOpen,
        rest = __rest(_b, ["children", "handle", "onOpen", "onClose", "open", "startOpen"]);

    var _c = this.state,
        open = _c.open,
        childrenStyle = _c.childrenStyle;
    return React.createElement(CollapsibleRoot, __assign({}, rest, {
      onFocus: this.handleFocus,
      ref: function (el) {
        return _this.root = el;
      },
      className: (0, _base.classNames)('rmwc-collapsible-list', (_a = {}, _a['rmwc-collapsible-list--open'] = open, _a))
    }), React.createElement("div", {
      className: "rmwc-collapsible-list__handle"
    }, React.cloneElement(handle, __assign({}, handle.props, {
      onClick: this.handleClick,
      onKeyDown: this.handleKeydown
    }))), React.createElement("div", {
      className: "rmwc-collapsible-list__children",
      style: childrenStyle
    }, React.createElement("div", {
      className: "rmwc-collapsible-list__children-inner",
      ref: function (el) {
        return _this.childContainer = el;
      }
    }, children)));
  };

  CollapsibleList.displayName = 'CollapsibleList';
  return CollapsibleList;
}(React.Component);

exports.CollapsibleList = CollapsibleList;
},{"react":"../node_modules/react/index.js","@rmwc/base":"../node_modules/@rmwc/base/next/index.js"}],"../node_modules/@rmwc/list/next/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _list = require("./list");

Object.keys(_list).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _list[key];
    }
  });
});

var _listItem = require("./list-item");

Object.keys(_listItem).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _listItem[key];
    }
  });
});

var _collapsibleList = require("./collapsible-list");

Object.keys(_collapsibleList).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _collapsibleList[key];
    }
  });
});
},{"./list":"../node_modules/@rmwc/list/next/list.js","./list-item":"../node_modules/@rmwc/list/next/list-item.js","./collapsible-list":"../node_modules/@rmwc/list/next/collapsible-list.js"}],"routes/Home/index.tsx":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _typography = require("@rmwc/typography");

require("@material/typography/dist/mdc.typography.css");

require("@material/list/dist/mdc.list.min.css");

var _styles = require("~lib/styles");

var _MCStatus = _interopRequireDefault(require("./MCStatus.graphql"));

var _list = require("@rmwc/list");

var _reactHooks = require("@apollo/react-hooks");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// UI/ui/routes/Home/index.tsx
const HomeRoute = () => {
  const {
    data,
    loading
  } = (0, _reactHooks.useQuery)(_MCStatus.default);
  if (loading) return _react.default.createElement("div", null, "Loading");
  if (data && data.getStatus) return _react.default.createElement("div", {
    style: _styles.MainStyle
  }, _react.default.createElement("div", {
    style: _styles.FormStyle
  }, _react.default.createElement(_typography.Typography, {
    use: 'headline4'
  }, "Minecraft Server"), _react.default.createElement(_list.List, null, data.getStatus.players.map(user => _react.default.createElement(_list.ListItem, null, user)))));else return _react.default.createElement("div", null, "Error");
};

var _default = HomeRoute;
exports.default = _default;
},{"react":"../node_modules/react/index.js","@rmwc/typography":"../node_modules/@rmwc/typography/next/index.js","@material/typography/dist/mdc.typography.css":"../node_modules/@material/typography/dist/mdc.typography.css","@material/list/dist/mdc.list.min.css":"../node_modules/@material/typography/dist/mdc.typography.css","~lib/styles":"lib/styles.tsx","./MCStatus.graphql":"routes/Home/MCStatus.graphql","@rmwc/list":"../node_modules/@rmwc/list/next/index.js","@apollo/react-hooks":"../node_modules/@apollo/react-hooks/lib/react-hooks.esm.js"}]},{},[], null)