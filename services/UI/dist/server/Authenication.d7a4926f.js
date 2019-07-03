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
})({"../node_modules/@material/button/dist/mdc.button.min.css":[function(require,module,exports) {

},{}],"../node_modules/@rmwc/button/next/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ButtonIcon = exports.Button = void 0;

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

/**
 * The Button component.
 */
var Button = (0, _ripple.withRipple)({
  surface: false
})((0, _base.componentFactory)({
  displayName: 'Button',
  tag: 'button',
  classNames: function (props) {
    return ['mdc-button', {
      'mdc-button--dense': props.dense,
      'mdc-button--raised': props.raised,
      'mdc-button--unelevated': props.unelevated,
      'mdc-button--outlined': props.outlined
    }];
  },
  consumeProps: ['dense', 'unelevated', 'outlined', 'primary', 'accent', 'unbounded'],
  render: function (_a, ref, Tag) {
    var icon = _a.icon,
        trailingIcon = _a.trailingIcon,
        label = _a.label,
        children = _a.children,
        raised = _a.raised,
        danger = _a.danger,
        rest = __rest(_a, ["icon", "trailingIcon", "label", "children", "raised", "danger"]);

    if (danger) {
      var existingStyle = rest.style || {};
      var dangerStyle = {
        '--mdc-theme-primary': 'var(--mdc-theme-error)',
        '--mdc-theme-on-primary': 'var(--mdc-theme-on-error)'
      };
      rest.style = __assign({}, dangerStyle, existingStyle);
    }

    return React.createElement(Tag, __assign({}, rest, {
      ref: ref
    }), !!icon && React.createElement(ButtonIcon, {
      icon: icon
    }), React.createElement("span", {
      className: "mdc-button__label"
    }, label, children), !!trailingIcon && React.createElement(ButtonIcon, {
      icon: trailingIcon
    }));
  }
}));
/** An icon that goes inside of buttons. This is an instance of the Icon component. */

exports.Button = Button;
var ButtonIcon = (0, _base.componentFactory)({
  displayName: 'ButtonIcon',
  tag: _icon.Icon,
  classNames: ['mdc-button__icon']
});
exports.ButtonIcon = ButtonIcon;
},{"react":"../node_modules/react/index.js","@rmwc/base":"../node_modules/@rmwc/base/next/index.js","@rmwc/ripple":"../node_modules/@rmwc/ripple/next/index.js","@rmwc/icon":"../node_modules/@rmwc/icon/next/index.js"}],"../node_modules/@material/floating-label/constants.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cssClasses = void 0;

/**
 * @license
 * Copyright 2016 Google Inc.
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
  LABEL_FLOAT_ABOVE: 'mdc-floating-label--float-above',
  LABEL_SHAKE: 'mdc-floating-label--shake',
  ROOT: 'mdc-floating-label'
}; //# sourceMappingURL=constants.js.map

exports.cssClasses = cssClasses;
},{}],"../node_modules/@material/floating-label/foundation.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.MDCFloatingLabelFoundation = void 0;

var tslib_1 = _interopRequireWildcard(require("tslib"));

var _foundation = require("@material/base/foundation");

var _constants = require("./constants");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/**
 * @license
 * Copyright 2016 Google Inc.
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
var MDCFloatingLabelFoundation =
/** @class */
function (_super) {
  tslib_1.__extends(MDCFloatingLabelFoundation, _super);

  function MDCFloatingLabelFoundation(adapter) {
    var _this = _super.call(this, tslib_1.__assign({}, MDCFloatingLabelFoundation.defaultAdapter, adapter)) || this;

    _this.shakeAnimationEndHandler_ = function () {
      return _this.handleShakeAnimationEnd_();
    };

    return _this;
  }

  Object.defineProperty(MDCFloatingLabelFoundation, "cssClasses", {
    get: function () {
      return _constants.cssClasses;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCFloatingLabelFoundation, "defaultAdapter", {
    /**
     * See {@link MDCFloatingLabelAdapter} for typing information on parameters and return types.
     */
    get: function () {
      // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
      return {
        addClass: function () {
          return undefined;
        },
        removeClass: function () {
          return undefined;
        },
        getWidth: function () {
          return 0;
        },
        registerInteractionHandler: function () {
          return undefined;
        },
        deregisterInteractionHandler: function () {
          return undefined;
        }
      }; // tslint:enable:object-literal-sort-keys
    },
    enumerable: true,
    configurable: true
  });

  MDCFloatingLabelFoundation.prototype.init = function () {
    this.adapter_.registerInteractionHandler('animationend', this.shakeAnimationEndHandler_);
  };

  MDCFloatingLabelFoundation.prototype.destroy = function () {
    this.adapter_.deregisterInteractionHandler('animationend', this.shakeAnimationEndHandler_);
  };
  /**
   * Returns the width of the label element.
   */


  MDCFloatingLabelFoundation.prototype.getWidth = function () {
    return this.adapter_.getWidth();
  };
  /**
   * Styles the label to produce a shake animation to indicate an error.
   * @param shouldShake If true, adds the shake CSS class; otherwise, removes shake class.
   */


  MDCFloatingLabelFoundation.prototype.shake = function (shouldShake) {
    var LABEL_SHAKE = MDCFloatingLabelFoundation.cssClasses.LABEL_SHAKE;

    if (shouldShake) {
      this.adapter_.addClass(LABEL_SHAKE);
    } else {
      this.adapter_.removeClass(LABEL_SHAKE);
    }
  };
  /**
   * Styles the label to float or dock.
   * @param shouldFloat If true, adds the float CSS class; otherwise, removes float and shake classes to dock the label.
   */


  MDCFloatingLabelFoundation.prototype.float = function (shouldFloat) {
    var _a = MDCFloatingLabelFoundation.cssClasses,
        LABEL_FLOAT_ABOVE = _a.LABEL_FLOAT_ABOVE,
        LABEL_SHAKE = _a.LABEL_SHAKE;

    if (shouldFloat) {
      this.adapter_.addClass(LABEL_FLOAT_ABOVE);
    } else {
      this.adapter_.removeClass(LABEL_FLOAT_ABOVE);
      this.adapter_.removeClass(LABEL_SHAKE);
    }
  };

  MDCFloatingLabelFoundation.prototype.handleShakeAnimationEnd_ = function () {
    var LABEL_SHAKE = MDCFloatingLabelFoundation.cssClasses.LABEL_SHAKE;
    this.adapter_.removeClass(LABEL_SHAKE);
  };

  return MDCFloatingLabelFoundation;
}(_foundation.MDCFoundation);

exports.MDCFloatingLabelFoundation = MDCFloatingLabelFoundation;
// tslint:disable-next-line:no-default-export Needed for backward compatibility with MDC Web v0.44.0 and earlier.
var _default = MDCFloatingLabelFoundation; //# sourceMappingURL=foundation.js.map

exports.default = _default;
},{"tslib":"../node_modules/tslib/tslib.es6.js","@material/base/foundation":"../node_modules/@material/base/foundation.js","./constants":"../node_modules/@material/floating-label/constants.js"}],"../node_modules/@material/floating-label/component.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MDCFloatingLabel = void 0;

var tslib_1 = _interopRequireWildcard(require("tslib"));

var _component = require("@material/base/component");

var _foundation = require("./foundation");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/**
 * @license
 * Copyright 2016 Google Inc.
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
var MDCFloatingLabel =
/** @class */
function (_super) {
  tslib_1.__extends(MDCFloatingLabel, _super);

  function MDCFloatingLabel() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  MDCFloatingLabel.attachTo = function (root) {
    return new MDCFloatingLabel(root);
  };
  /**
   * Styles the label to produce the label shake for errors.
   * @param shouldShake If true, shakes the label by adding a CSS class; otherwise, stops shaking by removing the class.
   */


  MDCFloatingLabel.prototype.shake = function (shouldShake) {
    this.foundation_.shake(shouldShake);
  };
  /**
   * Styles the label to float/dock.
   * @param shouldFloat If true, floats the label by adding a CSS class; otherwise, docks it by removing the class.
   */


  MDCFloatingLabel.prototype.float = function (shouldFloat) {
    this.foundation_.float(shouldFloat);
  };

  MDCFloatingLabel.prototype.getWidth = function () {
    return this.foundation_.getWidth();
  };

  MDCFloatingLabel.prototype.getDefaultFoundation = function () {
    var _this = this; // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<MDCFooAdapter>.
    // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.
    // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.


    var adapter = {
      addClass: function (className) {
        return _this.root_.classList.add(className);
      },
      removeClass: function (className) {
        return _this.root_.classList.remove(className);
      },
      getWidth: function () {
        return _this.root_.scrollWidth;
      },
      registerInteractionHandler: function (evtType, handler) {
        return _this.listen(evtType, handler);
      },
      deregisterInteractionHandler: function (evtType, handler) {
        return _this.unlisten(evtType, handler);
      }
    }; // tslint:enable:object-literal-sort-keys

    return new _foundation.MDCFloatingLabelFoundation(adapter);
  };

  return MDCFloatingLabel;
}(_component.MDCComponent); //# sourceMappingURL=component.js.map


exports.MDCFloatingLabel = MDCFloatingLabel;
},{"tslib":"../node_modules/tslib/tslib.es6.js","@material/base/component":"../node_modules/@material/base/component.js","./foundation":"../node_modules/@material/floating-label/foundation.js"}],"../node_modules/@material/line-ripple/constants.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cssClasses = void 0;

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
  LINE_RIPPLE_ACTIVE: 'mdc-line-ripple--active',
  LINE_RIPPLE_DEACTIVATING: 'mdc-line-ripple--deactivating'
}; //# sourceMappingURL=constants.js.map

exports.cssClasses = cssClasses;
},{}],"../node_modules/@material/line-ripple/foundation.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.MDCLineRippleFoundation = void 0;

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
var MDCLineRippleFoundation =
/** @class */
function (_super) {
  tslib_1.__extends(MDCLineRippleFoundation, _super);

  function MDCLineRippleFoundation(adapter) {
    var _this = _super.call(this, tslib_1.__assign({}, MDCLineRippleFoundation.defaultAdapter, adapter)) || this;

    _this.transitionEndHandler_ = function (evt) {
      return _this.handleTransitionEnd(evt);
    };

    return _this;
  }

  Object.defineProperty(MDCLineRippleFoundation, "cssClasses", {
    get: function () {
      return _constants.cssClasses;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCLineRippleFoundation, "defaultAdapter", {
    /**
     * See {@link MDCLineRippleAdapter} for typing information on parameters and return types.
     */
    get: function () {
      // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
      return {
        addClass: function () {
          return undefined;
        },
        removeClass: function () {
          return undefined;
        },
        hasClass: function () {
          return false;
        },
        setStyle: function () {
          return undefined;
        },
        registerEventHandler: function () {
          return undefined;
        },
        deregisterEventHandler: function () {
          return undefined;
        }
      }; // tslint:enable:object-literal-sort-keys
    },
    enumerable: true,
    configurable: true
  });

  MDCLineRippleFoundation.prototype.init = function () {
    this.adapter_.registerEventHandler('transitionend', this.transitionEndHandler_);
  };

  MDCLineRippleFoundation.prototype.destroy = function () {
    this.adapter_.deregisterEventHandler('transitionend', this.transitionEndHandler_);
  };

  MDCLineRippleFoundation.prototype.activate = function () {
    this.adapter_.removeClass(_constants.cssClasses.LINE_RIPPLE_DEACTIVATING);
    this.adapter_.addClass(_constants.cssClasses.LINE_RIPPLE_ACTIVE);
  };

  MDCLineRippleFoundation.prototype.setRippleCenter = function (xCoordinate) {
    this.adapter_.setStyle('transform-origin', xCoordinate + "px center");
  };

  MDCLineRippleFoundation.prototype.deactivate = function () {
    this.adapter_.addClass(_constants.cssClasses.LINE_RIPPLE_DEACTIVATING);
  };

  MDCLineRippleFoundation.prototype.handleTransitionEnd = function (evt) {
    // Wait for the line ripple to be either transparent or opaque
    // before emitting the animation end event
    var isDeactivating = this.adapter_.hasClass(_constants.cssClasses.LINE_RIPPLE_DEACTIVATING);

    if (evt.propertyName === 'opacity') {
      if (isDeactivating) {
        this.adapter_.removeClass(_constants.cssClasses.LINE_RIPPLE_ACTIVE);
        this.adapter_.removeClass(_constants.cssClasses.LINE_RIPPLE_DEACTIVATING);
      }
    }
  };

  return MDCLineRippleFoundation;
}(_foundation.MDCFoundation);

exports.MDCLineRippleFoundation = MDCLineRippleFoundation;
// tslint:disable-next-line:no-default-export Needed for backward compatibility with MDC Web v0.44.0 and earlier.
var _default = MDCLineRippleFoundation; //# sourceMappingURL=foundation.js.map

exports.default = _default;
},{"tslib":"../node_modules/tslib/tslib.es6.js","@material/base/foundation":"../node_modules/@material/base/foundation.js","./constants":"../node_modules/@material/line-ripple/constants.js"}],"../node_modules/@material/line-ripple/component.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MDCLineRipple = void 0;

var tslib_1 = _interopRequireWildcard(require("tslib"));

var _component = require("@material/base/component");

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
var MDCLineRipple =
/** @class */
function (_super) {
  tslib_1.__extends(MDCLineRipple, _super);

  function MDCLineRipple() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  MDCLineRipple.attachTo = function (root) {
    return new MDCLineRipple(root);
  };
  /**
   * Activates the line ripple
   */


  MDCLineRipple.prototype.activate = function () {
    this.foundation_.activate();
  };
  /**
   * Deactivates the line ripple
   */


  MDCLineRipple.prototype.deactivate = function () {
    this.foundation_.deactivate();
  };
  /**
   * Sets the transform origin given a user's click location.
   * The `rippleCenter` is the x-coordinate of the middle of the ripple.
   */


  MDCLineRipple.prototype.setRippleCenter = function (xCoordinate) {
    this.foundation_.setRippleCenter(xCoordinate);
  };

  MDCLineRipple.prototype.getDefaultFoundation = function () {
    var _this = this; // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<MDCFooAdapter>.
    // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.
    // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.


    var adapter = {
      addClass: function (className) {
        return _this.root_.classList.add(className);
      },
      removeClass: function (className) {
        return _this.root_.classList.remove(className);
      },
      hasClass: function (className) {
        return _this.root_.classList.contains(className);
      },
      setStyle: function (propertyName, value) {
        return _this.root_.style.setProperty(propertyName, value);
      },
      registerEventHandler: function (evtType, handler) {
        return _this.listen(evtType, handler);
      },
      deregisterEventHandler: function (evtType, handler) {
        return _this.unlisten(evtType, handler);
      }
    }; // tslint:enable:object-literal-sort-keys

    return new _foundation.MDCLineRippleFoundation(adapter);
  };

  return MDCLineRipple;
}(_component.MDCComponent); //# sourceMappingURL=component.js.map


exports.MDCLineRipple = MDCLineRipple;
},{"tslib":"../node_modules/tslib/tslib.es6.js","@material/base/component":"../node_modules/@material/base/component.js","./foundation":"../node_modules/@material/line-ripple/foundation.js"}],"../node_modules/@material/notched-outline/constants.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.strings = exports.numbers = exports.cssClasses = void 0;

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
var strings = {
  NOTCH_ELEMENT_SELECTOR: '.mdc-notched-outline__notch'
};
exports.strings = strings;
var numbers = {
  // This should stay in sync with $mdc-notched-outline-padding * 2.
  NOTCH_ELEMENT_PADDING: 8
};
exports.numbers = numbers;
var cssClasses = {
  NO_LABEL: 'mdc-notched-outline--no-label',
  OUTLINE_NOTCHED: 'mdc-notched-outline--notched',
  OUTLINE_UPGRADED: 'mdc-notched-outline--upgraded'
}; //# sourceMappingURL=constants.js.map

exports.cssClasses = cssClasses;
},{}],"../node_modules/@material/notched-outline/foundation.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.MDCNotchedOutlineFoundation = void 0;

var tslib_1 = _interopRequireWildcard(require("tslib"));

var _foundation = require("@material/base/foundation");

var _constants = require("./constants");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/**
 * @license
 * Copyright 2017 Google Inc.
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
var MDCNotchedOutlineFoundation =
/** @class */
function (_super) {
  tslib_1.__extends(MDCNotchedOutlineFoundation, _super);

  function MDCNotchedOutlineFoundation(adapter) {
    return _super.call(this, tslib_1.__assign({}, MDCNotchedOutlineFoundation.defaultAdapter, adapter)) || this;
  }

  Object.defineProperty(MDCNotchedOutlineFoundation, "strings", {
    get: function () {
      return _constants.strings;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCNotchedOutlineFoundation, "cssClasses", {
    get: function () {
      return _constants.cssClasses;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCNotchedOutlineFoundation, "numbers", {
    get: function () {
      return _constants.numbers;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCNotchedOutlineFoundation, "defaultAdapter", {
    /**
     * See {@link MDCNotchedOutlineAdapter} for typing information on parameters and return types.
     */
    get: function () {
      // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
      return {
        addClass: function () {
          return undefined;
        },
        removeClass: function () {
          return undefined;
        },
        setNotchWidthProperty: function () {
          return undefined;
        },
        removeNotchWidthProperty: function () {
          return undefined;
        }
      }; // tslint:enable:object-literal-sort-keys
    },
    enumerable: true,
    configurable: true
  });
  /**
   * Adds the outline notched selector and updates the notch width calculated based off of notchWidth.
   */

  MDCNotchedOutlineFoundation.prototype.notch = function (notchWidth) {
    var OUTLINE_NOTCHED = MDCNotchedOutlineFoundation.cssClasses.OUTLINE_NOTCHED;

    if (notchWidth > 0) {
      notchWidth += _constants.numbers.NOTCH_ELEMENT_PADDING; // Add padding from left/right.
    }

    this.adapter_.setNotchWidthProperty(notchWidth);
    this.adapter_.addClass(OUTLINE_NOTCHED);
  };
  /**
   * Removes notched outline selector to close the notch in the outline.
   */


  MDCNotchedOutlineFoundation.prototype.closeNotch = function () {
    var OUTLINE_NOTCHED = MDCNotchedOutlineFoundation.cssClasses.OUTLINE_NOTCHED;
    this.adapter_.removeClass(OUTLINE_NOTCHED);
    this.adapter_.removeNotchWidthProperty();
  };

  return MDCNotchedOutlineFoundation;
}(_foundation.MDCFoundation);

exports.MDCNotchedOutlineFoundation = MDCNotchedOutlineFoundation;
// tslint:disable-next-line:no-default-export Needed for backward compatibility with MDC Web v0.44.0 and earlier.
var _default = MDCNotchedOutlineFoundation; //# sourceMappingURL=foundation.js.map

exports.default = _default;
},{"tslib":"../node_modules/tslib/tslib.es6.js","@material/base/foundation":"../node_modules/@material/base/foundation.js","./constants":"../node_modules/@material/notched-outline/constants.js"}],"../node_modules/@material/notched-outline/component.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MDCNotchedOutline = void 0;

var tslib_1 = _interopRequireWildcard(require("tslib"));

var _component = require("@material/base/component");

var _foundation = require("@material/floating-label/foundation");

var _constants = require("./constants");

var _foundation2 = require("./foundation");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/**
 * @license
 * Copyright 2017 Google Inc.
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
var MDCNotchedOutline =
/** @class */
function (_super) {
  tslib_1.__extends(MDCNotchedOutline, _super);

  function MDCNotchedOutline() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  MDCNotchedOutline.attachTo = function (root) {
    return new MDCNotchedOutline(root);
  };

  MDCNotchedOutline.prototype.initialSyncWithDOM = function () {
    this.notchElement_ = this.root_.querySelector(_constants.strings.NOTCH_ELEMENT_SELECTOR);
    var label = this.root_.querySelector('.' + _foundation.MDCFloatingLabelFoundation.cssClasses.ROOT);

    if (label) {
      label.style.transitionDuration = '0s';
      this.root_.classList.add(_constants.cssClasses.OUTLINE_UPGRADED);
      requestAnimationFrame(function () {
        label.style.transitionDuration = '';
      });
    } else {
      this.root_.classList.add(_constants.cssClasses.NO_LABEL);
    }
  };
  /**
   * Updates classes and styles to open the notch to the specified width.
   * @param notchWidth The notch width in the outline.
   */


  MDCNotchedOutline.prototype.notch = function (notchWidth) {
    this.foundation_.notch(notchWidth);
  };
  /**
   * Updates classes and styles to close the notch.
   */


  MDCNotchedOutline.prototype.closeNotch = function () {
    this.foundation_.closeNotch();
  };

  MDCNotchedOutline.prototype.getDefaultFoundation = function () {
    var _this = this; // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<MDCFooAdapter>.
    // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.
    // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.


    var adapter = {
      addClass: function (className) {
        return _this.root_.classList.add(className);
      },
      removeClass: function (className) {
        return _this.root_.classList.remove(className);
      },
      setNotchWidthProperty: function (width) {
        return _this.notchElement_.style.setProperty('width', width + 'px');
      },
      removeNotchWidthProperty: function () {
        return _this.notchElement_.style.removeProperty('width');
      }
    }; // tslint:enable:object-literal-sort-keys

    return new _foundation2.MDCNotchedOutlineFoundation(adapter);
  };

  return MDCNotchedOutline;
}(_component.MDCComponent); //# sourceMappingURL=component.js.map


exports.MDCNotchedOutline = MDCNotchedOutline;
},{"tslib":"../node_modules/tslib/tslib.es6.js","@material/base/component":"../node_modules/@material/base/component.js","@material/floating-label/foundation":"../node_modules/@material/floating-label/foundation.js","./constants":"../node_modules/@material/notched-outline/constants.js","./foundation":"../node_modules/@material/notched-outline/foundation.js"}],"../node_modules/@material/textfield/character-counter/constants.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cssClasses = exports.strings = void 0;

/**
 * @license
 * Copyright 2019 Google Inc.
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
  ROOT: 'mdc-text-field-character-counter'
};
exports.cssClasses = cssClasses;
var strings = {
  ROOT_SELECTOR: "." + cssClasses.ROOT
}; //# sourceMappingURL=constants.js.map

exports.strings = strings;
},{}],"../node_modules/@material/textfield/character-counter/foundation.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.MDCTextFieldCharacterCounterFoundation = void 0;

var tslib_1 = _interopRequireWildcard(require("tslib"));

var _foundation = require("@material/base/foundation");

var _constants = require("./constants");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/**
 * @license
 * Copyright 2019 Google Inc.
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
var MDCTextFieldCharacterCounterFoundation =
/** @class */
function (_super) {
  tslib_1.__extends(MDCTextFieldCharacterCounterFoundation, _super);

  function MDCTextFieldCharacterCounterFoundation(adapter) {
    return _super.call(this, tslib_1.__assign({}, MDCTextFieldCharacterCounterFoundation.defaultAdapter, adapter)) || this;
  }

  Object.defineProperty(MDCTextFieldCharacterCounterFoundation, "cssClasses", {
    get: function () {
      return _constants.cssClasses;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCTextFieldCharacterCounterFoundation, "strings", {
    get: function () {
      return _constants.strings;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCTextFieldCharacterCounterFoundation, "defaultAdapter", {
    /**
     * See {@link MDCTextFieldCharacterCounterAdapter} for typing information on parameters and return types.
     */
    get: function () {
      return {
        setContent: function () {
          return undefined;
        }
      };
    },
    enumerable: true,
    configurable: true
  });

  MDCTextFieldCharacterCounterFoundation.prototype.setCounterValue = function (currentLength, maxLength) {
    currentLength = Math.min(currentLength, maxLength);
    this.adapter_.setContent(currentLength + " / " + maxLength);
  };

  return MDCTextFieldCharacterCounterFoundation;
}(_foundation.MDCFoundation);

exports.MDCTextFieldCharacterCounterFoundation = MDCTextFieldCharacterCounterFoundation;
// tslint:disable-next-line:no-default-export Needed for backward compatibility with MDC Web v0.44.0 and earlier.
var _default = MDCTextFieldCharacterCounterFoundation; //# sourceMappingURL=foundation.js.map

exports.default = _default;
},{"tslib":"../node_modules/tslib/tslib.es6.js","@material/base/foundation":"../node_modules/@material/base/foundation.js","./constants":"../node_modules/@material/textfield/character-counter/constants.js"}],"../node_modules/@material/textfield/character-counter/component.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MDCTextFieldCharacterCounter = void 0;

var tslib_1 = _interopRequireWildcard(require("tslib"));

var _component = require("@material/base/component");

var _foundation = require("./foundation");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/**
 * @license
 * Copyright 2019 Google Inc.
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
var MDCTextFieldCharacterCounter =
/** @class */
function (_super) {
  tslib_1.__extends(MDCTextFieldCharacterCounter, _super);

  function MDCTextFieldCharacterCounter() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  MDCTextFieldCharacterCounter.attachTo = function (root) {
    return new MDCTextFieldCharacterCounter(root);
  };

  Object.defineProperty(MDCTextFieldCharacterCounter.prototype, "foundation", {
    get: function () {
      return this.foundation_;
    },
    enumerable: true,
    configurable: true
  });

  MDCTextFieldCharacterCounter.prototype.getDefaultFoundation = function () {
    var _this = this; // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<MDCFooAdapter>.
    // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.


    var adapter = {
      setContent: function (content) {
        _this.root_.textContent = content;
      }
    };
    return new _foundation.MDCTextFieldCharacterCounterFoundation(adapter);
  };

  return MDCTextFieldCharacterCounter;
}(_component.MDCComponent); //# sourceMappingURL=component.js.map


exports.MDCTextFieldCharacterCounter = MDCTextFieldCharacterCounter;
},{"tslib":"../node_modules/tslib/tslib.es6.js","@material/base/component":"../node_modules/@material/base/component.js","./foundation":"../node_modules/@material/textfield/character-counter/foundation.js"}],"../node_modules/@material/textfield/constants.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ALWAYS_FLOAT_TYPES = exports.VALIDATION_ATTR_WHITELIST = exports.numbers = exports.strings = exports.cssClasses = void 0;

/**
 * @license
 * Copyright 2016 Google Inc.
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
var strings = {
  ARIA_CONTROLS: 'aria-controls',
  ICON_SELECTOR: '.mdc-text-field__icon',
  INPUT_SELECTOR: '.mdc-text-field__input',
  LABEL_SELECTOR: '.mdc-floating-label',
  LINE_RIPPLE_SELECTOR: '.mdc-line-ripple',
  OUTLINE_SELECTOR: '.mdc-notched-outline'
};
exports.strings = strings;
var cssClasses = {
  DENSE: 'mdc-text-field--dense',
  DISABLED: 'mdc-text-field--disabled',
  FOCUSED: 'mdc-text-field--focused',
  FULLWIDTH: 'mdc-text-field--fullwidth',
  HELPER_LINE: 'mdc-text-field-helper-line',
  INVALID: 'mdc-text-field--invalid',
  NO_LABEL: 'mdc-text-field--no-label',
  OUTLINED: 'mdc-text-field--outlined',
  ROOT: 'mdc-text-field',
  TEXTAREA: 'mdc-text-field--textarea',
  WITH_LEADING_ICON: 'mdc-text-field--with-leading-icon',
  WITH_TRAILING_ICON: 'mdc-text-field--with-trailing-icon'
};
exports.cssClasses = cssClasses;
var numbers = {
  DENSE_LABEL_SCALE: 0.923,
  LABEL_SCALE: 0.75
};
/**
 * Whitelist based off of https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/Constraint_validation
 * under the "Validation-related attributes" section.
 */

exports.numbers = numbers;
var VALIDATION_ATTR_WHITELIST = ['pattern', 'min', 'max', 'required', 'step', 'minlength', 'maxlength'];
/**
 * Label should always float for these types as they show some UI even if value is empty.
 */

exports.VALIDATION_ATTR_WHITELIST = VALIDATION_ATTR_WHITELIST;
var ALWAYS_FLOAT_TYPES = ['color', 'date', 'datetime-local', 'month', 'range', 'time', 'week']; //# sourceMappingURL=constants.js.map

exports.ALWAYS_FLOAT_TYPES = ALWAYS_FLOAT_TYPES;
},{}],"../node_modules/@material/textfield/foundation.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.MDCTextFieldFoundation = void 0;

var tslib_1 = _interopRequireWildcard(require("tslib"));

var _foundation = require("@material/base/foundation");

var _constants = require("./constants");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/**
 * @license
 * Copyright 2016 Google Inc.
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
var POINTERDOWN_EVENTS = ['mousedown', 'touchstart'];
var INTERACTION_EVENTS = ['click', 'keydown'];

var MDCTextFieldFoundation =
/** @class */
function (_super) {
  tslib_1.__extends(MDCTextFieldFoundation, _super);
  /**
   * @param adapter
   * @param foundationMap Map from subcomponent names to their subfoundations.
   */


  function MDCTextFieldFoundation(adapter, foundationMap) {
    if (foundationMap === void 0) {
      foundationMap = {};
    }

    var _this = _super.call(this, tslib_1.__assign({}, MDCTextFieldFoundation.defaultAdapter, adapter)) || this;

    _this.isFocused_ = false;
    _this.receivedUserInput_ = false;
    _this.isValid_ = true;
    _this.useNativeValidation_ = true;
    _this.helperText_ = foundationMap.helperText;
    _this.characterCounter_ = foundationMap.characterCounter;
    _this.leadingIcon_ = foundationMap.leadingIcon;
    _this.trailingIcon_ = foundationMap.trailingIcon;

    _this.inputFocusHandler_ = function () {
      return _this.activateFocus();
    };

    _this.inputBlurHandler_ = function () {
      return _this.deactivateFocus();
    };

    _this.inputInputHandler_ = function () {
      return _this.handleInput();
    };

    _this.setPointerXOffset_ = function (evt) {
      return _this.setTransformOrigin(evt);
    };

    _this.textFieldInteractionHandler_ = function () {
      return _this.handleTextFieldInteraction();
    };

    _this.validationAttributeChangeHandler_ = function (attributesList) {
      return _this.handleValidationAttributeChange(attributesList);
    };

    return _this;
  }

  Object.defineProperty(MDCTextFieldFoundation, "cssClasses", {
    get: function () {
      return _constants.cssClasses;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCTextFieldFoundation, "strings", {
    get: function () {
      return _constants.strings;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCTextFieldFoundation, "numbers", {
    get: function () {
      return _constants.numbers;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCTextFieldFoundation.prototype, "shouldAlwaysFloat_", {
    get: function () {
      var type = this.getNativeInput_().type;
      return _constants.ALWAYS_FLOAT_TYPES.indexOf(type) >= 0;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCTextFieldFoundation.prototype, "shouldFloat", {
    get: function () {
      return this.shouldAlwaysFloat_ || this.isFocused_ || Boolean(this.getValue()) || this.isBadInput_();
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCTextFieldFoundation.prototype, "shouldShake", {
    get: function () {
      return !this.isFocused_ && !this.isValid() && Boolean(this.getValue());
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCTextFieldFoundation, "defaultAdapter", {
    /**
     * See {@link MDCTextFieldAdapter} for typing information on parameters and return types.
     */
    get: function () {
      // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
      return {
        addClass: function () {
          return undefined;
        },
        removeClass: function () {
          return undefined;
        },
        hasClass: function () {
          return true;
        },
        registerTextFieldInteractionHandler: function () {
          return undefined;
        },
        deregisterTextFieldInteractionHandler: function () {
          return undefined;
        },
        registerInputInteractionHandler: function () {
          return undefined;
        },
        deregisterInputInteractionHandler: function () {
          return undefined;
        },
        registerValidationAttributeChangeHandler: function () {
          return new MutationObserver(function () {
            return undefined;
          });
        },
        deregisterValidationAttributeChangeHandler: function () {
          return undefined;
        },
        getNativeInput: function () {
          return null;
        },
        isFocused: function () {
          return false;
        },
        activateLineRipple: function () {
          return undefined;
        },
        deactivateLineRipple: function () {
          return undefined;
        },
        setLineRippleTransformOrigin: function () {
          return undefined;
        },
        shakeLabel: function () {
          return undefined;
        },
        floatLabel: function () {
          return undefined;
        },
        hasLabel: function () {
          return false;
        },
        getLabelWidth: function () {
          return 0;
        },
        hasOutline: function () {
          return false;
        },
        notchOutline: function () {
          return undefined;
        },
        closeOutline: function () {
          return undefined;
        }
      }; // tslint:enable:object-literal-sort-keys
    },
    enumerable: true,
    configurable: true
  });

  MDCTextFieldFoundation.prototype.init = function () {
    var _this = this;

    if (this.adapter_.isFocused()) {
      this.inputFocusHandler_();
    } else if (this.adapter_.hasLabel() && this.shouldFloat) {
      this.notchOutline(true);
      this.adapter_.floatLabel(true);
    }

    this.adapter_.registerInputInteractionHandler('focus', this.inputFocusHandler_);
    this.adapter_.registerInputInteractionHandler('blur', this.inputBlurHandler_);
    this.adapter_.registerInputInteractionHandler('input', this.inputInputHandler_);
    POINTERDOWN_EVENTS.forEach(function (evtType) {
      _this.adapter_.registerInputInteractionHandler(evtType, _this.setPointerXOffset_);
    });
    INTERACTION_EVENTS.forEach(function (evtType) {
      _this.adapter_.registerTextFieldInteractionHandler(evtType, _this.textFieldInteractionHandler_);
    });
    this.validationObserver_ = this.adapter_.registerValidationAttributeChangeHandler(this.validationAttributeChangeHandler_);
    this.setCharacterCounter_(this.getValue().length);
  };

  MDCTextFieldFoundation.prototype.destroy = function () {
    var _this = this;

    this.adapter_.deregisterInputInteractionHandler('focus', this.inputFocusHandler_);
    this.adapter_.deregisterInputInteractionHandler('blur', this.inputBlurHandler_);
    this.adapter_.deregisterInputInteractionHandler('input', this.inputInputHandler_);
    POINTERDOWN_EVENTS.forEach(function (evtType) {
      _this.adapter_.deregisterInputInteractionHandler(evtType, _this.setPointerXOffset_);
    });
    INTERACTION_EVENTS.forEach(function (evtType) {
      _this.adapter_.deregisterTextFieldInteractionHandler(evtType, _this.textFieldInteractionHandler_);
    });
    this.adapter_.deregisterValidationAttributeChangeHandler(this.validationObserver_);
  };
  /**
   * Handles user interactions with the Text Field.
   */


  MDCTextFieldFoundation.prototype.handleTextFieldInteraction = function () {
    var nativeInput = this.adapter_.getNativeInput();

    if (nativeInput && nativeInput.disabled) {
      return;
    }

    this.receivedUserInput_ = true;
  };
  /**
   * Handles validation attribute changes
   */


  MDCTextFieldFoundation.prototype.handleValidationAttributeChange = function (attributesList) {
    var _this = this;

    attributesList.some(function (attributeName) {
      if (_constants.VALIDATION_ATTR_WHITELIST.indexOf(attributeName) > -1) {
        _this.styleValidity_(true);

        return true;
      }

      return false;
    });

    if (attributesList.indexOf('maxlength') > -1) {
      this.setCharacterCounter_(this.getValue().length);
    }
  };
  /**
   * Opens/closes the notched outline.
   */


  MDCTextFieldFoundation.prototype.notchOutline = function (openNotch) {
    if (!this.adapter_.hasOutline()) {
      return;
    }

    if (openNotch) {
      var isDense = this.adapter_.hasClass(_constants.cssClasses.DENSE);
      var labelScale = isDense ? _constants.numbers.DENSE_LABEL_SCALE : _constants.numbers.LABEL_SCALE;
      var labelWidth = this.adapter_.getLabelWidth() * labelScale;
      this.adapter_.notchOutline(labelWidth);
    } else {
      this.adapter_.closeOutline();
    }
  };
  /**
   * Activates the text field focus state.
   */


  MDCTextFieldFoundation.prototype.activateFocus = function () {
    this.isFocused_ = true;
    this.styleFocused_(this.isFocused_);
    this.adapter_.activateLineRipple();

    if (this.adapter_.hasLabel()) {
      this.notchOutline(this.shouldFloat);
      this.adapter_.floatLabel(this.shouldFloat);
      this.adapter_.shakeLabel(this.shouldShake);
    }

    if (this.helperText_) {
      this.helperText_.showToScreenReader();
    }
  };
  /**
   * Sets the line ripple's transform origin, so that the line ripple activate
   * animation will animate out from the user's click location.
   */


  MDCTextFieldFoundation.prototype.setTransformOrigin = function (evt) {
    var touches = evt.touches;
    var targetEvent = touches ? touches[0] : evt;
    var targetClientRect = targetEvent.target.getBoundingClientRect();
    var normalizedX = targetEvent.clientX - targetClientRect.left;
    this.adapter_.setLineRippleTransformOrigin(normalizedX);
  };
  /**
   * Handles input change of text input and text area.
   */


  MDCTextFieldFoundation.prototype.handleInput = function () {
    this.autoCompleteFocus();
    this.setCharacterCounter_(this.getValue().length);
  };
  /**
   * Activates the Text Field's focus state in cases when the input value
   * changes without user input (e.g. programmatically).
   */


  MDCTextFieldFoundation.prototype.autoCompleteFocus = function () {
    if (!this.receivedUserInput_) {
      this.activateFocus();
    }
  };
  /**
   * Deactivates the Text Field's focus state.
   */


  MDCTextFieldFoundation.prototype.deactivateFocus = function () {
    this.isFocused_ = false;
    this.adapter_.deactivateLineRipple();
    var isValid = this.isValid();
    this.styleValidity_(isValid);
    this.styleFocused_(this.isFocused_);

    if (this.adapter_.hasLabel()) {
      this.notchOutline(this.shouldFloat);
      this.adapter_.floatLabel(this.shouldFloat);
      this.adapter_.shakeLabel(this.shouldShake);
    }

    if (!this.shouldFloat) {
      this.receivedUserInput_ = false;
    }
  };

  MDCTextFieldFoundation.prototype.getValue = function () {
    return this.getNativeInput_().value;
  };
  /**
   * @param value The value to set on the input Element.
   */


  MDCTextFieldFoundation.prototype.setValue = function (value) {
    // Prevent Safari from moving the caret to the end of the input when the value has not changed.
    if (this.getValue() !== value) {
      this.getNativeInput_().value = value;
    }

    this.setCharacterCounter_(value.length);
    var isValid = this.isValid();
    this.styleValidity_(isValid);

    if (this.adapter_.hasLabel()) {
      this.notchOutline(this.shouldFloat);
      this.adapter_.floatLabel(this.shouldFloat);
      this.adapter_.shakeLabel(this.shouldShake);
    }
  };
  /**
   * @return The custom validity state, if set; otherwise, the result of a native validity check.
   */


  MDCTextFieldFoundation.prototype.isValid = function () {
    return this.useNativeValidation_ ? this.isNativeInputValid_() : this.isValid_;
  };
  /**
   * @param isValid Sets the custom validity state of the Text Field.
   */


  MDCTextFieldFoundation.prototype.setValid = function (isValid) {
    this.isValid_ = isValid;
    this.styleValidity_(isValid);
    var shouldShake = !isValid && !this.isFocused_;

    if (this.adapter_.hasLabel()) {
      this.adapter_.shakeLabel(shouldShake);
    }
  };
  /**
   * Enables or disables the use of native validation. Use this for custom validation.
   * @param useNativeValidation Set this to false to ignore native input validation.
   */


  MDCTextFieldFoundation.prototype.setUseNativeValidation = function (useNativeValidation) {
    this.useNativeValidation_ = useNativeValidation;
  };

  MDCTextFieldFoundation.prototype.isDisabled = function () {
    return this.getNativeInput_().disabled;
  };
  /**
   * @param disabled Sets the text-field disabled or enabled.
   */


  MDCTextFieldFoundation.prototype.setDisabled = function (disabled) {
    this.getNativeInput_().disabled = disabled;
    this.styleDisabled_(disabled);
  };
  /**
   * @param content Sets the content of the helper text.
   */


  MDCTextFieldFoundation.prototype.setHelperTextContent = function (content) {
    if (this.helperText_) {
      this.helperText_.setContent(content);
    }
  };
  /**
   * Sets the aria label of the leading icon.
   */


  MDCTextFieldFoundation.prototype.setLeadingIconAriaLabel = function (label) {
    if (this.leadingIcon_) {
      this.leadingIcon_.setAriaLabel(label);
    }
  };
  /**
   * Sets the text content of the leading icon.
   */


  MDCTextFieldFoundation.prototype.setLeadingIconContent = function (content) {
    if (this.leadingIcon_) {
      this.leadingIcon_.setContent(content);
    }
  };
  /**
   * Sets the aria label of the trailing icon.
   */


  MDCTextFieldFoundation.prototype.setTrailingIconAriaLabel = function (label) {
    if (this.trailingIcon_) {
      this.trailingIcon_.setAriaLabel(label);
    }
  };
  /**
   * Sets the text content of the trailing icon.
   */


  MDCTextFieldFoundation.prototype.setTrailingIconContent = function (content) {
    if (this.trailingIcon_) {
      this.trailingIcon_.setContent(content);
    }
  };
  /**
   * Sets character counter values that shows characters used and the total character limit.
   */


  MDCTextFieldFoundation.prototype.setCharacterCounter_ = function (currentLength) {
    if (!this.characterCounter_) {
      return;
    }

    var maxLength = this.getNativeInput_().maxLength;

    if (maxLength === -1) {
      throw new Error('MDCTextFieldFoundation: Expected maxlength html property on text input or textarea.');
    }

    this.characterCounter_.setCounterValue(currentLength, maxLength);
  };
  /**
   * @return True if the Text Field input fails in converting the user-supplied value.
   */


  MDCTextFieldFoundation.prototype.isBadInput_ = function () {
    // The badInput property is not supported in IE 11 💩.
    return this.getNativeInput_().validity.badInput || false;
  };
  /**
   * @return The result of native validity checking (ValidityState.valid).
   */


  MDCTextFieldFoundation.prototype.isNativeInputValid_ = function () {
    return this.getNativeInput_().validity.valid;
  };
  /**
   * Styles the component based on the validity state.
   */


  MDCTextFieldFoundation.prototype.styleValidity_ = function (isValid) {
    var INVALID = MDCTextFieldFoundation.cssClasses.INVALID;

    if (isValid) {
      this.adapter_.removeClass(INVALID);
    } else {
      this.adapter_.addClass(INVALID);
    }

    if (this.helperText_) {
      this.helperText_.setValidity(isValid);
    }
  };
  /**
   * Styles the component based on the focused state.
   */


  MDCTextFieldFoundation.prototype.styleFocused_ = function (isFocused) {
    var FOCUSED = MDCTextFieldFoundation.cssClasses.FOCUSED;

    if (isFocused) {
      this.adapter_.addClass(FOCUSED);
    } else {
      this.adapter_.removeClass(FOCUSED);
    }
  };
  /**
   * Styles the component based on the disabled state.
   */


  MDCTextFieldFoundation.prototype.styleDisabled_ = function (isDisabled) {
    var _a = MDCTextFieldFoundation.cssClasses,
        DISABLED = _a.DISABLED,
        INVALID = _a.INVALID;

    if (isDisabled) {
      this.adapter_.addClass(DISABLED);
      this.adapter_.removeClass(INVALID);
    } else {
      this.adapter_.removeClass(DISABLED);
    }

    if (this.leadingIcon_) {
      this.leadingIcon_.setDisabled(isDisabled);
    }

    if (this.trailingIcon_) {
      this.trailingIcon_.setDisabled(isDisabled);
    }
  };
  /**
   * @return The native text input element from the host environment, or an object with the same shape for unit tests.
   */


  MDCTextFieldFoundation.prototype.getNativeInput_ = function () {
    // this.adapter_ may be undefined in foundation unit tests. This happens when testdouble is creating a mock object
    // and invokes the shouldShake/shouldFloat getters (which in turn call getValue(), which calls this method) before
    // init() has been called from the MDCTextField constructor. To work around that issue, we return a dummy object.
    var nativeInput = this.adapter_ ? this.adapter_.getNativeInput() : null;
    return nativeInput || {
      disabled: false,
      maxLength: -1,
      type: 'input',
      validity: {
        badInput: false,
        valid: true
      },
      value: ''
    };
  };

  return MDCTextFieldFoundation;
}(_foundation.MDCFoundation);

exports.MDCTextFieldFoundation = MDCTextFieldFoundation;
// tslint:disable-next-line:no-default-export Needed for backward compatibility with MDC Web v0.44.0 and earlier.
var _default = MDCTextFieldFoundation; //# sourceMappingURL=foundation.js.map

exports.default = _default;
},{"tslib":"../node_modules/tslib/tslib.es6.js","@material/base/foundation":"../node_modules/@material/base/foundation.js","./constants":"../node_modules/@material/textfield/constants.js"}],"../node_modules/@material/textfield/helper-text/constants.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cssClasses = exports.strings = void 0;

/**
 * @license
 * Copyright 2016 Google Inc.
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
  HELPER_TEXT_PERSISTENT: 'mdc-text-field-helper-text--persistent',
  HELPER_TEXT_VALIDATION_MSG: 'mdc-text-field-helper-text--validation-msg',
  ROOT: 'mdc-text-field-helper-text'
};
exports.cssClasses = cssClasses;
var strings = {
  ARIA_HIDDEN: 'aria-hidden',
  ROLE: 'role',
  ROOT_SELECTOR: "." + cssClasses.ROOT
}; //# sourceMappingURL=constants.js.map

exports.strings = strings;
},{}],"../node_modules/@material/textfield/helper-text/foundation.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.MDCTextFieldHelperTextFoundation = void 0;

var tslib_1 = _interopRequireWildcard(require("tslib"));

var _foundation = require("@material/base/foundation");

var _constants = require("./constants");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/**
 * @license
 * Copyright 2017 Google Inc.
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
var MDCTextFieldHelperTextFoundation =
/** @class */
function (_super) {
  tslib_1.__extends(MDCTextFieldHelperTextFoundation, _super);

  function MDCTextFieldHelperTextFoundation(adapter) {
    return _super.call(this, tslib_1.__assign({}, MDCTextFieldHelperTextFoundation.defaultAdapter, adapter)) || this;
  }

  Object.defineProperty(MDCTextFieldHelperTextFoundation, "cssClasses", {
    get: function () {
      return _constants.cssClasses;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCTextFieldHelperTextFoundation, "strings", {
    get: function () {
      return _constants.strings;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCTextFieldHelperTextFoundation, "defaultAdapter", {
    /**
     * See {@link MDCTextFieldHelperTextAdapter} for typing information on parameters and return types.
     */
    get: function () {
      // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
      return {
        addClass: function () {
          return undefined;
        },
        removeClass: function () {
          return undefined;
        },
        hasClass: function () {
          return false;
        },
        setAttr: function () {
          return undefined;
        },
        removeAttr: function () {
          return undefined;
        },
        setContent: function () {
          return undefined;
        }
      }; // tslint:enable:object-literal-sort-keys
    },
    enumerable: true,
    configurable: true
  });
  /**
   * Sets the content of the helper text field.
   */

  MDCTextFieldHelperTextFoundation.prototype.setContent = function (content) {
    this.adapter_.setContent(content);
  };
  /**
   * @param isPersistent Sets the persistency of the helper text.
   */


  MDCTextFieldHelperTextFoundation.prototype.setPersistent = function (isPersistent) {
    if (isPersistent) {
      this.adapter_.addClass(_constants.cssClasses.HELPER_TEXT_PERSISTENT);
    } else {
      this.adapter_.removeClass(_constants.cssClasses.HELPER_TEXT_PERSISTENT);
    }
  };
  /**
   * @param isValidation True to make the helper text act as an error validation message.
   */


  MDCTextFieldHelperTextFoundation.prototype.setValidation = function (isValidation) {
    if (isValidation) {
      this.adapter_.addClass(_constants.cssClasses.HELPER_TEXT_VALIDATION_MSG);
    } else {
      this.adapter_.removeClass(_constants.cssClasses.HELPER_TEXT_VALIDATION_MSG);
    }
  };
  /**
   * Makes the helper text visible to the screen reader.
   */


  MDCTextFieldHelperTextFoundation.prototype.showToScreenReader = function () {
    this.adapter_.removeAttr(_constants.strings.ARIA_HIDDEN);
  };
  /**
   * Sets the validity of the helper text based on the input validity.
   */


  MDCTextFieldHelperTextFoundation.prototype.setValidity = function (inputIsValid) {
    var helperTextIsPersistent = this.adapter_.hasClass(_constants.cssClasses.HELPER_TEXT_PERSISTENT);
    var helperTextIsValidationMsg = this.adapter_.hasClass(_constants.cssClasses.HELPER_TEXT_VALIDATION_MSG);
    var validationMsgNeedsDisplay = helperTextIsValidationMsg && !inputIsValid;

    if (validationMsgNeedsDisplay) {
      this.adapter_.setAttr(_constants.strings.ROLE, 'alert');
    } else {
      this.adapter_.removeAttr(_constants.strings.ROLE);
    }

    if (!helperTextIsPersistent && !validationMsgNeedsDisplay) {
      this.hide_();
    }
  };
  /**
   * Hides the help text from screen readers.
   */


  MDCTextFieldHelperTextFoundation.prototype.hide_ = function () {
    this.adapter_.setAttr(_constants.strings.ARIA_HIDDEN, 'true');
  };

  return MDCTextFieldHelperTextFoundation;
}(_foundation.MDCFoundation);

exports.MDCTextFieldHelperTextFoundation = MDCTextFieldHelperTextFoundation;
// tslint:disable-next-line:no-default-export Needed for backward compatibility with MDC Web v0.44.0 and earlier.
var _default = MDCTextFieldHelperTextFoundation; //# sourceMappingURL=foundation.js.map

exports.default = _default;
},{"tslib":"../node_modules/tslib/tslib.es6.js","@material/base/foundation":"../node_modules/@material/base/foundation.js","./constants":"../node_modules/@material/textfield/helper-text/constants.js"}],"../node_modules/@material/textfield/helper-text/component.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MDCTextFieldHelperText = void 0;

var tslib_1 = _interopRequireWildcard(require("tslib"));

var _component = require("@material/base/component");

var _foundation = require("./foundation");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/**
 * @license
 * Copyright 2017 Google Inc.
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
var MDCTextFieldHelperText =
/** @class */
function (_super) {
  tslib_1.__extends(MDCTextFieldHelperText, _super);

  function MDCTextFieldHelperText() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  MDCTextFieldHelperText.attachTo = function (root) {
    return new MDCTextFieldHelperText(root);
  };

  Object.defineProperty(MDCTextFieldHelperText.prototype, "foundation", {
    get: function () {
      return this.foundation_;
    },
    enumerable: true,
    configurable: true
  });

  MDCTextFieldHelperText.prototype.getDefaultFoundation = function () {
    var _this = this; // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<MDCFooAdapter>.
    // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.
    // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.


    var adapter = {
      addClass: function (className) {
        return _this.root_.classList.add(className);
      },
      removeClass: function (className) {
        return _this.root_.classList.remove(className);
      },
      hasClass: function (className) {
        return _this.root_.classList.contains(className);
      },
      setAttr: function (attr, value) {
        return _this.root_.setAttribute(attr, value);
      },
      removeAttr: function (attr) {
        return _this.root_.removeAttribute(attr);
      },
      setContent: function (content) {
        _this.root_.textContent = content;
      }
    }; // tslint:enable:object-literal-sort-keys

    return new _foundation.MDCTextFieldHelperTextFoundation(adapter);
  };

  return MDCTextFieldHelperText;
}(_component.MDCComponent); //# sourceMappingURL=component.js.map


exports.MDCTextFieldHelperText = MDCTextFieldHelperText;
},{"tslib":"../node_modules/tslib/tslib.es6.js","@material/base/component":"../node_modules/@material/base/component.js","./foundation":"../node_modules/@material/textfield/helper-text/foundation.js"}],"../node_modules/@material/textfield/icon/constants.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cssClasses = exports.strings = void 0;

/**
 * @license
 * Copyright 2016 Google Inc.
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
var strings = {
  ICON_EVENT: 'MDCTextField:icon',
  ICON_ROLE: 'button'
};
exports.strings = strings;
var cssClasses = {
  ROOT: 'mdc-text-field__icon'
}; //# sourceMappingURL=constants.js.map

exports.cssClasses = cssClasses;
},{}],"../node_modules/@material/textfield/icon/foundation.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.MDCTextFieldIconFoundation = void 0;

var tslib_1 = _interopRequireWildcard(require("tslib"));

var _foundation = require("@material/base/foundation");

var _constants = require("./constants");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/**
 * @license
 * Copyright 2017 Google Inc.
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
var INTERACTION_EVENTS = ['click', 'keydown'];

var MDCTextFieldIconFoundation =
/** @class */
function (_super) {
  tslib_1.__extends(MDCTextFieldIconFoundation, _super);

  function MDCTextFieldIconFoundation(adapter) {
    var _this = _super.call(this, tslib_1.__assign({}, MDCTextFieldIconFoundation.defaultAdapter, adapter)) || this;

    _this.savedTabIndex_ = null;

    _this.interactionHandler_ = function (evt) {
      return _this.handleInteraction(evt);
    };

    return _this;
  }

  Object.defineProperty(MDCTextFieldIconFoundation, "strings", {
    get: function () {
      return _constants.strings;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCTextFieldIconFoundation, "cssClasses", {
    get: function () {
      return _constants.cssClasses;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCTextFieldIconFoundation, "defaultAdapter", {
    /**
     * See {@link MDCTextFieldIconAdapter} for typing information on parameters and return types.
     */
    get: function () {
      // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
      return {
        getAttr: function () {
          return null;
        },
        setAttr: function () {
          return undefined;
        },
        removeAttr: function () {
          return undefined;
        },
        setContent: function () {
          return undefined;
        },
        registerInteractionHandler: function () {
          return undefined;
        },
        deregisterInteractionHandler: function () {
          return undefined;
        },
        notifyIconAction: function () {
          return undefined;
        }
      }; // tslint:enable:object-literal-sort-keys
    },
    enumerable: true,
    configurable: true
  });

  MDCTextFieldIconFoundation.prototype.init = function () {
    var _this = this;

    this.savedTabIndex_ = this.adapter_.getAttr('tabindex');
    INTERACTION_EVENTS.forEach(function (evtType) {
      _this.adapter_.registerInteractionHandler(evtType, _this.interactionHandler_);
    });
  };

  MDCTextFieldIconFoundation.prototype.destroy = function () {
    var _this = this;

    INTERACTION_EVENTS.forEach(function (evtType) {
      _this.adapter_.deregisterInteractionHandler(evtType, _this.interactionHandler_);
    });
  };

  MDCTextFieldIconFoundation.prototype.setDisabled = function (disabled) {
    if (!this.savedTabIndex_) {
      return;
    }

    if (disabled) {
      this.adapter_.setAttr('tabindex', '-1');
      this.adapter_.removeAttr('role');
    } else {
      this.adapter_.setAttr('tabindex', this.savedTabIndex_);
      this.adapter_.setAttr('role', _constants.strings.ICON_ROLE);
    }
  };

  MDCTextFieldIconFoundation.prototype.setAriaLabel = function (label) {
    this.adapter_.setAttr('aria-label', label);
  };

  MDCTextFieldIconFoundation.prototype.setContent = function (content) {
    this.adapter_.setContent(content);
  };

  MDCTextFieldIconFoundation.prototype.handleInteraction = function (evt) {
    var isEnterKey = evt.key === 'Enter' || evt.keyCode === 13;

    if (evt.type === 'click' || isEnterKey) {
      this.adapter_.notifyIconAction();
    }
  };

  return MDCTextFieldIconFoundation;
}(_foundation.MDCFoundation);

exports.MDCTextFieldIconFoundation = MDCTextFieldIconFoundation;
// tslint:disable-next-line:no-default-export Needed for backward compatibility with MDC Web v0.44.0 and earlier.
var _default = MDCTextFieldIconFoundation; //# sourceMappingURL=foundation.js.map

exports.default = _default;
},{"tslib":"../node_modules/tslib/tslib.es6.js","@material/base/foundation":"../node_modules/@material/base/foundation.js","./constants":"../node_modules/@material/textfield/icon/constants.js"}],"../node_modules/@material/textfield/icon/component.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MDCTextFieldIcon = void 0;

var tslib_1 = _interopRequireWildcard(require("tslib"));

var _component = require("@material/base/component");

var _foundation = require("./foundation");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/**
 * @license
 * Copyright 2017 Google Inc.
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
var MDCTextFieldIcon =
/** @class */
function (_super) {
  tslib_1.__extends(MDCTextFieldIcon, _super);

  function MDCTextFieldIcon() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  MDCTextFieldIcon.attachTo = function (root) {
    return new MDCTextFieldIcon(root);
  };

  Object.defineProperty(MDCTextFieldIcon.prototype, "foundation", {
    get: function () {
      return this.foundation_;
    },
    enumerable: true,
    configurable: true
  });

  MDCTextFieldIcon.prototype.getDefaultFoundation = function () {
    var _this = this; // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<MDCFooAdapter>.
    // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.
    // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.


    var adapter = {
      getAttr: function (attr) {
        return _this.root_.getAttribute(attr);
      },
      setAttr: function (attr, value) {
        return _this.root_.setAttribute(attr, value);
      },
      removeAttr: function (attr) {
        return _this.root_.removeAttribute(attr);
      },
      setContent: function (content) {
        _this.root_.textContent = content;
      },
      registerInteractionHandler: function (evtType, handler) {
        return _this.listen(evtType, handler);
      },
      deregisterInteractionHandler: function (evtType, handler) {
        return _this.unlisten(evtType, handler);
      },
      notifyIconAction: function () {
        return _this.emit(_foundation.MDCTextFieldIconFoundation.strings.ICON_EVENT, {}
        /* evtData */
        , true
        /* shouldBubble */
        );
      }
    }; // tslint:enable:object-literal-sort-keys

    return new _foundation.MDCTextFieldIconFoundation(adapter);
  };

  return MDCTextFieldIcon;
}(_component.MDCComponent); //# sourceMappingURL=component.js.map


exports.MDCTextFieldIcon = MDCTextFieldIcon;
},{"tslib":"../node_modules/tslib/tslib.es6.js","@material/base/component":"../node_modules/@material/base/component.js","./foundation":"../node_modules/@material/textfield/icon/foundation.js"}],"../node_modules/@material/textfield/component.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MDCTextField = void 0;

var tslib_1 = _interopRequireWildcard(require("tslib"));

var _component = require("@material/base/component");

var ponyfill = _interopRequireWildcard(require("@material/dom/ponyfill"));

var _component2 = require("@material/floating-label/component");

var _component3 = require("@material/line-ripple/component");

var _component4 = require("@material/notched-outline/component");

var _component5 = require("@material/ripple/component");

var _foundation = require("@material/ripple/foundation");

var _component6 = require("./character-counter/component");

var _foundation2 = require("./character-counter/foundation");

var _constants = require("./constants");

var _foundation3 = require("./foundation");

var _component7 = require("./helper-text/component");

var _foundation4 = require("./helper-text/foundation");

var _component8 = require("./icon/component");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/**
 * @license
 * Copyright 2016 Google Inc.
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
var MDCTextField =
/** @class */
function (_super) {
  tslib_1.__extends(MDCTextField, _super);

  function MDCTextField() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  MDCTextField.attachTo = function (root) {
    return new MDCTextField(root);
  };

  MDCTextField.prototype.initialize = function (rippleFactory, lineRippleFactory, helperTextFactory, characterCounterFactory, iconFactory, labelFactory, outlineFactory) {
    if (rippleFactory === void 0) {
      rippleFactory = function (el, foundation) {
        return new _component5.MDCRipple(el, foundation);
      };
    }

    if (lineRippleFactory === void 0) {
      lineRippleFactory = function (el) {
        return new _component3.MDCLineRipple(el);
      };
    }

    if (helperTextFactory === void 0) {
      helperTextFactory = function (el) {
        return new _component7.MDCTextFieldHelperText(el);
      };
    }

    if (characterCounterFactory === void 0) {
      characterCounterFactory = function (el) {
        return new _component6.MDCTextFieldCharacterCounter(el);
      };
    }

    if (iconFactory === void 0) {
      iconFactory = function (el) {
        return new _component8.MDCTextFieldIcon(el);
      };
    }

    if (labelFactory === void 0) {
      labelFactory = function (el) {
        return new _component2.MDCFloatingLabel(el);
      };
    }

    if (outlineFactory === void 0) {
      outlineFactory = function (el) {
        return new _component4.MDCNotchedOutline(el);
      };
    }

    this.input_ = this.root_.querySelector(_constants.strings.INPUT_SELECTOR);
    var labelElement = this.root_.querySelector(_constants.strings.LABEL_SELECTOR);
    this.label_ = labelElement ? labelFactory(labelElement) : null;
    var lineRippleElement = this.root_.querySelector(_constants.strings.LINE_RIPPLE_SELECTOR);
    this.lineRipple_ = lineRippleElement ? lineRippleFactory(lineRippleElement) : null;
    var outlineElement = this.root_.querySelector(_constants.strings.OUTLINE_SELECTOR);
    this.outline_ = outlineElement ? outlineFactory(outlineElement) : null; // Helper text

    var helperTextStrings = _foundation4.MDCTextFieldHelperTextFoundation.strings;
    var nextElementSibling = this.root_.nextElementSibling;
    var hasHelperLine = nextElementSibling && nextElementSibling.classList.contains(_constants.cssClasses.HELPER_LINE);
    var helperTextEl = hasHelperLine && nextElementSibling && nextElementSibling.querySelector(helperTextStrings.ROOT_SELECTOR);
    this.helperText_ = helperTextEl ? helperTextFactory(helperTextEl) : null; // Character counter

    var characterCounterStrings = _foundation2.MDCTextFieldCharacterCounterFoundation.strings;
    var characterCounterEl = this.root_.querySelector(characterCounterStrings.ROOT_SELECTOR); // If character counter is not found in root element search in sibling element.

    if (!characterCounterEl && hasHelperLine && nextElementSibling) {
      characterCounterEl = nextElementSibling.querySelector(characterCounterStrings.ROOT_SELECTOR);
    }

    this.characterCounter_ = characterCounterEl ? characterCounterFactory(characterCounterEl) : null;
    this.leadingIcon_ = null;
    this.trailingIcon_ = null;
    var iconElements = this.root_.querySelectorAll(_constants.strings.ICON_SELECTOR);

    if (iconElements.length > 0) {
      if (iconElements.length > 1) {
        // Has both icons.
        this.leadingIcon_ = iconFactory(iconElements[0]);
        this.trailingIcon_ = iconFactory(iconElements[1]);
      } else {
        if (this.root_.classList.contains(_constants.cssClasses.WITH_LEADING_ICON)) {
          this.leadingIcon_ = iconFactory(iconElements[0]);
        } else {
          this.trailingIcon_ = iconFactory(iconElements[0]);
        }
      }
    }

    this.ripple = this.createRipple_(rippleFactory);
  };

  MDCTextField.prototype.destroy = function () {
    if (this.ripple) {
      this.ripple.destroy();
    }

    if (this.lineRipple_) {
      this.lineRipple_.destroy();
    }

    if (this.helperText_) {
      this.helperText_.destroy();
    }

    if (this.characterCounter_) {
      this.characterCounter_.destroy();
    }

    if (this.leadingIcon_) {
      this.leadingIcon_.destroy();
    }

    if (this.trailingIcon_) {
      this.trailingIcon_.destroy();
    }

    if (this.label_) {
      this.label_.destroy();
    }

    if (this.outline_) {
      this.outline_.destroy();
    }

    _super.prototype.destroy.call(this);
  };
  /**
   * Initializes the Text Field's internal state based on the environment's
   * state.
   */


  MDCTextField.prototype.initialSyncWithDOM = function () {
    this.disabled = this.input_.disabled;
  };

  Object.defineProperty(MDCTextField.prototype, "value", {
    get: function () {
      return this.foundation_.getValue();
    },

    /**
     * @param value The value to set on the input.
     */
    set: function (value) {
      this.foundation_.setValue(value);
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCTextField.prototype, "disabled", {
    get: function () {
      return this.foundation_.isDisabled();
    },

    /**
     * @param disabled Sets the Text Field disabled or enabled.
     */
    set: function (disabled) {
      this.foundation_.setDisabled(disabled);
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCTextField.prototype, "valid", {
    get: function () {
      return this.foundation_.isValid();
    },

    /**
     * @param valid Sets the Text Field valid or invalid.
     */
    set: function (valid) {
      this.foundation_.setValid(valid);
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCTextField.prototype, "required", {
    get: function () {
      return this.input_.required;
    },

    /**
     * @param required Sets the Text Field to required.
     */
    set: function (required) {
      this.input_.required = required;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCTextField.prototype, "pattern", {
    get: function () {
      return this.input_.pattern;
    },

    /**
     * @param pattern Sets the input element's validation pattern.
     */
    set: function (pattern) {
      this.input_.pattern = pattern;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCTextField.prototype, "minLength", {
    get: function () {
      return this.input_.minLength;
    },

    /**
     * @param minLength Sets the input element's minLength.
     */
    set: function (minLength) {
      this.input_.minLength = minLength;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCTextField.prototype, "maxLength", {
    get: function () {
      return this.input_.maxLength;
    },

    /**
     * @param maxLength Sets the input element's maxLength.
     */
    set: function (maxLength) {
      // Chrome throws exception if maxLength is set to a value less than zero
      if (maxLength < 0) {
        this.input_.removeAttribute('maxLength');
      } else {
        this.input_.maxLength = maxLength;
      }
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCTextField.prototype, "min", {
    get: function () {
      return this.input_.min;
    },

    /**
     * @param min Sets the input element's min.
     */
    set: function (min) {
      this.input_.min = min;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCTextField.prototype, "max", {
    get: function () {
      return this.input_.max;
    },

    /**
     * @param max Sets the input element's max.
     */
    set: function (max) {
      this.input_.max = max;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCTextField.prototype, "step", {
    get: function () {
      return this.input_.step;
    },

    /**
     * @param step Sets the input element's step.
     */
    set: function (step) {
      this.input_.step = step;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCTextField.prototype, "helperTextContent", {
    /**
     * Sets the helper text element content.
     */
    set: function (content) {
      this.foundation_.setHelperTextContent(content);
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCTextField.prototype, "leadingIconAriaLabel", {
    /**
     * Sets the aria label of the leading icon.
     */
    set: function (label) {
      this.foundation_.setLeadingIconAriaLabel(label);
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCTextField.prototype, "leadingIconContent", {
    /**
     * Sets the text content of the leading icon.
     */
    set: function (content) {
      this.foundation_.setLeadingIconContent(content);
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCTextField.prototype, "trailingIconAriaLabel", {
    /**
     * Sets the aria label of the trailing icon.
     */
    set: function (label) {
      this.foundation_.setTrailingIconAriaLabel(label);
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCTextField.prototype, "trailingIconContent", {
    /**
     * Sets the text content of the trailing icon.
     */
    set: function (content) {
      this.foundation_.setTrailingIconContent(content);
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCTextField.prototype, "useNativeValidation", {
    /**
     * Enables or disables the use of native validation. Use this for custom validation.
     * @param useNativeValidation Set this to false to ignore native input validation.
     */
    set: function (useNativeValidation) {
      this.foundation_.setUseNativeValidation(useNativeValidation);
    },
    enumerable: true,
    configurable: true
  });
  /**
   * Focuses the input element.
   */

  MDCTextField.prototype.focus = function () {
    this.input_.focus();
  };
  /**
   * Recomputes the outline SVG path for the outline element.
   */


  MDCTextField.prototype.layout = function () {
    var openNotch = this.foundation_.shouldFloat;
    this.foundation_.notchOutline(openNotch);
  };

  MDCTextField.prototype.getDefaultFoundation = function () {
    // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<MDCFooAdapter>.
    // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.
    // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
    var adapter = tslib_1.__assign({}, this.getRootAdapterMethods_(), this.getInputAdapterMethods_(), this.getLabelAdapterMethods_(), this.getLineRippleAdapterMethods_(), this.getOutlineAdapterMethods_()); // tslint:enable:object-literal-sort-keys


    return new _foundation3.MDCTextFieldFoundation(adapter, this.getFoundationMap_());
  };

  MDCTextField.prototype.getRootAdapterMethods_ = function () {
    var _this = this; // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.


    return {
      addClass: function (className) {
        return _this.root_.classList.add(className);
      },
      removeClass: function (className) {
        return _this.root_.classList.remove(className);
      },
      hasClass: function (className) {
        return _this.root_.classList.contains(className);
      },
      registerTextFieldInteractionHandler: function (evtType, handler) {
        return _this.listen(evtType, handler);
      },
      deregisterTextFieldInteractionHandler: function (evtType, handler) {
        return _this.unlisten(evtType, handler);
      },
      registerValidationAttributeChangeHandler: function (handler) {
        var getAttributesList = function (mutationsList) {
          return mutationsList.map(function (mutation) {
            return mutation.attributeName;
          }).filter(function (attributeName) {
            return attributeName;
          });
        };

        var observer = new MutationObserver(function (mutationsList) {
          return handler(getAttributesList(mutationsList));
        });
        var config = {
          attributes: true
        };
        observer.observe(_this.input_, config);
        return observer;
      },
      deregisterValidationAttributeChangeHandler: function (observer) {
        return observer.disconnect();
      }
    }; // tslint:enable:object-literal-sort-keys
  };

  MDCTextField.prototype.getInputAdapterMethods_ = function () {
    var _this = this; // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.


    return {
      getNativeInput: function () {
        return _this.input_;
      },
      isFocused: function () {
        return document.activeElement === _this.input_;
      },
      registerInputInteractionHandler: function (evtType, handler) {
        return _this.input_.addEventListener(evtType, handler);
      },
      deregisterInputInteractionHandler: function (evtType, handler) {
        return _this.input_.removeEventListener(evtType, handler);
      }
    }; // tslint:enable:object-literal-sort-keys
  };

  MDCTextField.prototype.getLabelAdapterMethods_ = function () {
    var _this = this;

    return {
      floatLabel: function (shouldFloat) {
        return _this.label_ && _this.label_.float(shouldFloat);
      },
      getLabelWidth: function () {
        return _this.label_ ? _this.label_.getWidth() : 0;
      },
      hasLabel: function () {
        return Boolean(_this.label_);
      },
      shakeLabel: function (shouldShake) {
        return _this.label_ && _this.label_.shake(shouldShake);
      }
    };
  };

  MDCTextField.prototype.getLineRippleAdapterMethods_ = function () {
    var _this = this;

    return {
      activateLineRipple: function () {
        if (_this.lineRipple_) {
          _this.lineRipple_.activate();
        }
      },
      deactivateLineRipple: function () {
        if (_this.lineRipple_) {
          _this.lineRipple_.deactivate();
        }
      },
      setLineRippleTransformOrigin: function (normalizedX) {
        if (_this.lineRipple_) {
          _this.lineRipple_.setRippleCenter(normalizedX);
        }
      }
    };
  };

  MDCTextField.prototype.getOutlineAdapterMethods_ = function () {
    var _this = this;

    return {
      closeOutline: function () {
        return _this.outline_ && _this.outline_.closeNotch();
      },
      hasOutline: function () {
        return Boolean(_this.outline_);
      },
      notchOutline: function (labelWidth) {
        return _this.outline_ && _this.outline_.notch(labelWidth);
      }
    };
  };
  /**
   * @return A map of all subcomponents to subfoundations.
   */


  MDCTextField.prototype.getFoundationMap_ = function () {
    return {
      characterCounter: this.characterCounter_ ? this.characterCounter_.foundation : undefined,
      helperText: this.helperText_ ? this.helperText_.foundation : undefined,
      leadingIcon: this.leadingIcon_ ? this.leadingIcon_.foundation : undefined,
      trailingIcon: this.trailingIcon_ ? this.trailingIcon_.foundation : undefined
    };
  };

  MDCTextField.prototype.createRipple_ = function (rippleFactory) {
    var _this = this;

    var isTextArea = this.root_.classList.contains(_constants.cssClasses.TEXTAREA);
    var isOutlined = this.root_.classList.contains(_constants.cssClasses.OUTLINED);

    if (isTextArea || isOutlined) {
      return null;
    } // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<MDCFooAdapter>.
    // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.
    // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.


    var adapter = tslib_1.__assign({}, _component5.MDCRipple.createAdapter(this), {
      isSurfaceActive: function () {
        return ponyfill.matches(_this.input_, ':active');
      },
      registerInteractionHandler: function (evtType, handler) {
        return _this.input_.addEventListener(evtType, handler);
      },
      deregisterInteractionHandler: function (evtType, handler) {
        return _this.input_.removeEventListener(evtType, handler);
      }
    }); // tslint:enable:object-literal-sort-keys


    return rippleFactory(this.root_, new _foundation.MDCRippleFoundation(adapter));
  };

  return MDCTextField;
}(_component.MDCComponent); //# sourceMappingURL=component.js.map


exports.MDCTextField = MDCTextField;
},{"tslib":"../node_modules/tslib/tslib.es6.js","@material/base/component":"../node_modules/@material/base/component.js","@material/dom/ponyfill":"../node_modules/@material/dom/ponyfill.js","@material/floating-label/component":"../node_modules/@material/floating-label/component.js","@material/line-ripple/component":"../node_modules/@material/line-ripple/component.js","@material/notched-outline/component":"../node_modules/@material/notched-outline/component.js","@material/ripple/component":"../node_modules/@material/ripple/component.js","@material/ripple/foundation":"../node_modules/@material/ripple/foundation.js","./character-counter/component":"../node_modules/@material/textfield/character-counter/component.js","./character-counter/foundation":"../node_modules/@material/textfield/character-counter/foundation.js","./constants":"../node_modules/@material/textfield/constants.js","./foundation":"../node_modules/@material/textfield/foundation.js","./helper-text/component":"../node_modules/@material/textfield/helper-text/component.js","./helper-text/foundation":"../node_modules/@material/textfield/helper-text/foundation.js","./icon/component":"../node_modules/@material/textfield/icon/component.js"}],"../node_modules/@material/textfield/character-counter/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  characterCountCssClasses: true,
  characterCountStrings: true
};
Object.defineProperty(exports, "characterCountCssClasses", {
  enumerable: true,
  get: function () {
    return _constants.cssClasses;
  }
});
Object.defineProperty(exports, "characterCountStrings", {
  enumerable: true,
  get: function () {
    return _constants.strings;
  }
});

var _component = require("./component");

Object.keys(_component).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _component[key];
    }
  });
});

var _foundation = require("./foundation");

Object.keys(_foundation).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _foundation[key];
    }
  });
});

var _constants = require("./constants");
},{"./component":"../node_modules/@material/textfield/character-counter/component.js","./foundation":"../node_modules/@material/textfield/character-counter/foundation.js","./constants":"../node_modules/@material/textfield/character-counter/constants.js"}],"../node_modules/@material/textfield/helper-text/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  helperTextCssClasses: true,
  helperTextStrings: true
};
Object.defineProperty(exports, "helperTextCssClasses", {
  enumerable: true,
  get: function () {
    return _constants.cssClasses;
  }
});
Object.defineProperty(exports, "helperTextStrings", {
  enumerable: true,
  get: function () {
    return _constants.strings;
  }
});

var _component = require("./component");

Object.keys(_component).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _component[key];
    }
  });
});

var _foundation = require("./foundation");

Object.keys(_foundation).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _foundation[key];
    }
  });
});

var _constants = require("./constants");
},{"./component":"../node_modules/@material/textfield/helper-text/component.js","./foundation":"../node_modules/@material/textfield/helper-text/foundation.js","./constants":"../node_modules/@material/textfield/helper-text/constants.js"}],"../node_modules/@material/textfield/icon/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  iconCssClasses: true,
  iconStrings: true
};
Object.defineProperty(exports, "iconCssClasses", {
  enumerable: true,
  get: function () {
    return _constants.cssClasses;
  }
});
Object.defineProperty(exports, "iconStrings", {
  enumerable: true,
  get: function () {
    return _constants.strings;
  }
});

var _component = require("./component");

Object.keys(_component).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _component[key];
    }
  });
});

var _foundation = require("./foundation");

Object.keys(_foundation).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _foundation[key];
    }
  });
});

var _constants = require("./constants");
},{"./component":"../node_modules/@material/textfield/icon/component.js","./foundation":"../node_modules/@material/textfield/icon/foundation.js","./constants":"../node_modules/@material/textfield/icon/constants.js"}],"../node_modules/@material/textfield/index.js":[function(require,module,exports) {
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

var _index = require("./character-counter/index");

Object.keys(_index).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index[key];
    }
  });
});

var _index2 = require("./helper-text/index");

Object.keys(_index2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index2[key];
    }
  });
});

var _index3 = require("./icon/index");

Object.keys(_index3).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index3[key];
    }
  });
});
},{"./component":"../node_modules/@material/textfield/component.js","./constants":"../node_modules/@material/textfield/constants.js","./foundation":"../node_modules/@material/textfield/foundation.js","./character-counter/index":"../node_modules/@material/textfield/character-counter/index.js","./helper-text/index":"../node_modules/@material/textfield/helper-text/index.js","./icon/index":"../node_modules/@material/textfield/icon/index.js"}],"../node_modules/@rmwc/line-ripple/node_modules/@material/line-ripple/foundation.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.MDCLineRippleFoundation = void 0;

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
var MDCLineRippleFoundation =
/** @class */
function (_super) {
  tslib_1.__extends(MDCLineRippleFoundation, _super);

  function MDCLineRippleFoundation(adapter) {
    var _this = _super.call(this, tslib_1.__assign({}, MDCLineRippleFoundation.defaultAdapter, adapter)) || this;

    _this.transitionEndHandler_ = function (evt) {
      return _this.handleTransitionEnd(evt);
    };

    return _this;
  }

  Object.defineProperty(MDCLineRippleFoundation, "cssClasses", {
    get: function () {
      return _constants.cssClasses;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCLineRippleFoundation, "defaultAdapter", {
    /**
     * See {@link MDCLineRippleAdapter} for typing information on parameters and return types.
     */
    get: function () {
      // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
      return {
        addClass: function () {
          return undefined;
        },
        removeClass: function () {
          return undefined;
        },
        hasClass: function () {
          return false;
        },
        setStyle: function () {
          return undefined;
        },
        registerEventHandler: function () {
          return undefined;
        },
        deregisterEventHandler: function () {
          return undefined;
        }
      }; // tslint:enable:object-literal-sort-keys
    },
    enumerable: true,
    configurable: true
  });

  MDCLineRippleFoundation.prototype.init = function () {
    this.adapter_.registerEventHandler('transitionend', this.transitionEndHandler_);
  };

  MDCLineRippleFoundation.prototype.destroy = function () {
    this.adapter_.deregisterEventHandler('transitionend', this.transitionEndHandler_);
  };

  MDCLineRippleFoundation.prototype.activate = function () {
    this.adapter_.removeClass(_constants.cssClasses.LINE_RIPPLE_DEACTIVATING);
    this.adapter_.addClass(_constants.cssClasses.LINE_RIPPLE_ACTIVE);
  };

  MDCLineRippleFoundation.prototype.setRippleCenter = function (xCoordinate) {
    this.adapter_.setStyle('transform-origin', xCoordinate + "px center");
  };

  MDCLineRippleFoundation.prototype.deactivate = function () {
    this.adapter_.addClass(_constants.cssClasses.LINE_RIPPLE_DEACTIVATING);
  };

  MDCLineRippleFoundation.prototype.handleTransitionEnd = function (evt) {
    // Wait for the line ripple to be either transparent or opaque
    // before emitting the animation end event
    var isDeactivating = this.adapter_.hasClass(_constants.cssClasses.LINE_RIPPLE_DEACTIVATING);

    if (evt.propertyName === 'opacity') {
      if (isDeactivating) {
        this.adapter_.removeClass(_constants.cssClasses.LINE_RIPPLE_ACTIVE);
        this.adapter_.removeClass(_constants.cssClasses.LINE_RIPPLE_DEACTIVATING);
      }
    }
  };

  return MDCLineRippleFoundation;
}(_foundation.MDCFoundation);

exports.MDCLineRippleFoundation = MDCLineRippleFoundation;
// tslint:disable-next-line:no-default-export Needed for backward compatibility with MDC Web v0.44.0 and earlier.
var _default = MDCLineRippleFoundation; //# sourceMappingURL=foundation.js.map

exports.default = _default;
},{"tslib":"../node_modules/tslib/tslib.es6.js","@material/base/foundation":"../node_modules/@material/base/foundation.js","./constants":"../node_modules/@material/line-ripple/constants.js"}],"../node_modules/@rmwc/line-ripple/node_modules/@material/line-ripple/component.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MDCLineRipple = void 0;

var tslib_1 = _interopRequireWildcard(require("tslib"));

var _component = require("@material/base/component");

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
var MDCLineRipple =
/** @class */
function (_super) {
  tslib_1.__extends(MDCLineRipple, _super);

  function MDCLineRipple() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  MDCLineRipple.attachTo = function (root) {
    return new MDCLineRipple(root);
  };
  /**
   * Activates the line ripple
   */


  MDCLineRipple.prototype.activate = function () {
    this.foundation_.activate();
  };
  /**
   * Deactivates the line ripple
   */


  MDCLineRipple.prototype.deactivate = function () {
    this.foundation_.deactivate();
  };
  /**
   * Sets the transform origin given a user's click location.
   * The `rippleCenter` is the x-coordinate of the middle of the ripple.
   */


  MDCLineRipple.prototype.setRippleCenter = function (xCoordinate) {
    this.foundation_.setRippleCenter(xCoordinate);
  };

  MDCLineRipple.prototype.getDefaultFoundation = function () {
    var _this = this; // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<MDCFooAdapter>.
    // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.
    // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.


    var adapter = {
      addClass: function (className) {
        return _this.root_.classList.add(className);
      },
      removeClass: function (className) {
        return _this.root_.classList.remove(className);
      },
      hasClass: function (className) {
        return _this.root_.classList.contains(className);
      },
      setStyle: function (propertyName, value) {
        return _this.root_.style.setProperty(propertyName, value);
      },
      registerEventHandler: function (evtType, handler) {
        return _this.listen(evtType, handler);
      },
      deregisterEventHandler: function (evtType, handler) {
        return _this.unlisten(evtType, handler);
      }
    }; // tslint:enable:object-literal-sort-keys

    return new _foundation.MDCLineRippleFoundation(adapter);
  };

  return MDCLineRipple;
}(_component.MDCComponent); //# sourceMappingURL=component.js.map


exports.MDCLineRipple = MDCLineRipple;
},{"tslib":"../node_modules/tslib/tslib.es6.js","@material/base/component":"../node_modules/@material/base/component.js","./foundation":"../node_modules/@rmwc/line-ripple/node_modules/@material/line-ripple/foundation.js"}],"../node_modules/@rmwc/line-ripple/node_modules/@material/line-ripple/index.js":[function(require,module,exports) {
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
},{"./component":"../node_modules/@rmwc/line-ripple/node_modules/@material/line-ripple/component.js","./foundation":"../node_modules/@rmwc/line-ripple/node_modules/@material/line-ripple/foundation.js"}],"../node_modules/@rmwc/line-ripple/next/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LineRipple = void 0;

var React = _interopRequireWildcard(require("react"));

var _lineRipple = require("@material/line-ripple");

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

var LineRipple =
/** @class */
function (_super) {
  __extends(LineRipple, _super);

  function LineRipple() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.root = _this.createElement('root');
    return _this;
  }

  LineRipple.prototype.getDefaultFoundation = function () {
    var _this = this;

    return new _lineRipple.MDCLineRippleFoundation({
      addClass: function (className) {
        return _this.root.addClass(className);
      },
      removeClass: function (className) {
        return _this.root.removeClass(className);
      },
      hasClass: function (className) {
        return _this.root.hasClass(className);
      },
      setStyle: function (propertyName, value) {
        return _this.root.setStyle(propertyName, value);
      },
      registerEventHandler: function (evtType, handler) {
        return _this.root.addEventListener(evtType, handler);
      },
      deregisterEventHandler: function (evtType, handler) {
        return _this.root.removeEventListener(evtType, handler);
      }
    });
  };

  LineRipple.prototype.sync = function (props, prevProps) {
    var _this = this; // active


    this.syncProp(props.active, prevProps.active, function () {
      props.active ? _this.foundation.activate() : _this.foundation.deactivate();
    }); // center

    this.syncProp(props.center, prevProps.center, function () {
      typeof props.center === 'number' && _this.foundation.setRippleCenter(props.center);
    });
  };

  LineRipple.prototype.render = function () {
    var _a = this.props,
        active = _a.active,
        center = _a.center,
        rest = __rest(_a, ["active", "center"]);

    return React.createElement("div", __assign({}, this.root.props(__assign({}, rest, {
      className: "mdc-line-ripple " + (this.props.className || '')
    })), {
      ref: this.root.setRef
    }));
  };

  LineRipple.displayName = 'LineRipple';
  return LineRipple;
}(_base.FoundationComponent);

exports.LineRipple = LineRipple;
},{"react":"../node_modules/react/index.js","@material/line-ripple":"../node_modules/@rmwc/line-ripple/node_modules/@material/line-ripple/index.js","@rmwc/base":"../node_modules/@rmwc/base/next/index.js"}],"../node_modules/@rmwc/floating-label/node_modules/@material/floating-label/foundation.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.MDCFloatingLabelFoundation = void 0;

var tslib_1 = _interopRequireWildcard(require("tslib"));

var _foundation = require("@material/base/foundation");

var _constants = require("./constants");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/**
 * @license
 * Copyright 2016 Google Inc.
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
var MDCFloatingLabelFoundation =
/** @class */
function (_super) {
  tslib_1.__extends(MDCFloatingLabelFoundation, _super);

  function MDCFloatingLabelFoundation(adapter) {
    var _this = _super.call(this, tslib_1.__assign({}, MDCFloatingLabelFoundation.defaultAdapter, adapter)) || this;

    _this.shakeAnimationEndHandler_ = function () {
      return _this.handleShakeAnimationEnd_();
    };

    return _this;
  }

  Object.defineProperty(MDCFloatingLabelFoundation, "cssClasses", {
    get: function () {
      return _constants.cssClasses;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCFloatingLabelFoundation, "defaultAdapter", {
    /**
     * See {@link MDCFloatingLabelAdapter} for typing information on parameters and return types.
     */
    get: function () {
      // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
      return {
        addClass: function () {
          return undefined;
        },
        removeClass: function () {
          return undefined;
        },
        getWidth: function () {
          return 0;
        },
        registerInteractionHandler: function () {
          return undefined;
        },
        deregisterInteractionHandler: function () {
          return undefined;
        }
      }; // tslint:enable:object-literal-sort-keys
    },
    enumerable: true,
    configurable: true
  });

  MDCFloatingLabelFoundation.prototype.init = function () {
    this.adapter_.registerInteractionHandler('animationend', this.shakeAnimationEndHandler_);
  };

  MDCFloatingLabelFoundation.prototype.destroy = function () {
    this.adapter_.deregisterInteractionHandler('animationend', this.shakeAnimationEndHandler_);
  };
  /**
   * Returns the width of the label element.
   */


  MDCFloatingLabelFoundation.prototype.getWidth = function () {
    return this.adapter_.getWidth();
  };
  /**
   * Styles the label to produce a shake animation to indicate an error.
   * @param shouldShake If true, adds the shake CSS class; otherwise, removes shake class.
   */


  MDCFloatingLabelFoundation.prototype.shake = function (shouldShake) {
    var LABEL_SHAKE = MDCFloatingLabelFoundation.cssClasses.LABEL_SHAKE;

    if (shouldShake) {
      this.adapter_.addClass(LABEL_SHAKE);
    } else {
      this.adapter_.removeClass(LABEL_SHAKE);
    }
  };
  /**
   * Styles the label to float or dock.
   * @param shouldFloat If true, adds the float CSS class; otherwise, removes float and shake classes to dock the label.
   */


  MDCFloatingLabelFoundation.prototype.float = function (shouldFloat) {
    var _a = MDCFloatingLabelFoundation.cssClasses,
        LABEL_FLOAT_ABOVE = _a.LABEL_FLOAT_ABOVE,
        LABEL_SHAKE = _a.LABEL_SHAKE;

    if (shouldFloat) {
      this.adapter_.addClass(LABEL_FLOAT_ABOVE);
    } else {
      this.adapter_.removeClass(LABEL_FLOAT_ABOVE);
      this.adapter_.removeClass(LABEL_SHAKE);
    }
  };

  MDCFloatingLabelFoundation.prototype.handleShakeAnimationEnd_ = function () {
    var LABEL_SHAKE = MDCFloatingLabelFoundation.cssClasses.LABEL_SHAKE;
    this.adapter_.removeClass(LABEL_SHAKE);
  };

  return MDCFloatingLabelFoundation;
}(_foundation.MDCFoundation);

exports.MDCFloatingLabelFoundation = MDCFloatingLabelFoundation;
// tslint:disable-next-line:no-default-export Needed for backward compatibility with MDC Web v0.44.0 and earlier.
var _default = MDCFloatingLabelFoundation; //# sourceMappingURL=foundation.js.map

exports.default = _default;
},{"tslib":"../node_modules/tslib/tslib.es6.js","@material/base/foundation":"../node_modules/@material/base/foundation.js","./constants":"../node_modules/@material/floating-label/constants.js"}],"../node_modules/@rmwc/floating-label/node_modules/@material/floating-label/component.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MDCFloatingLabel = void 0;

var tslib_1 = _interopRequireWildcard(require("tslib"));

var _component = require("@material/base/component");

var _foundation = require("./foundation");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/**
 * @license
 * Copyright 2016 Google Inc.
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
var MDCFloatingLabel =
/** @class */
function (_super) {
  tslib_1.__extends(MDCFloatingLabel, _super);

  function MDCFloatingLabel() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  MDCFloatingLabel.attachTo = function (root) {
    return new MDCFloatingLabel(root);
  };
  /**
   * Styles the label to produce the label shake for errors.
   * @param shouldShake If true, shakes the label by adding a CSS class; otherwise, stops shaking by removing the class.
   */


  MDCFloatingLabel.prototype.shake = function (shouldShake) {
    this.foundation_.shake(shouldShake);
  };
  /**
   * Styles the label to float/dock.
   * @param shouldFloat If true, floats the label by adding a CSS class; otherwise, docks it by removing the class.
   */


  MDCFloatingLabel.prototype.float = function (shouldFloat) {
    this.foundation_.float(shouldFloat);
  };

  MDCFloatingLabel.prototype.getWidth = function () {
    return this.foundation_.getWidth();
  };

  MDCFloatingLabel.prototype.getDefaultFoundation = function () {
    var _this = this; // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<MDCFooAdapter>.
    // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.
    // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.


    var adapter = {
      addClass: function (className) {
        return _this.root_.classList.add(className);
      },
      removeClass: function (className) {
        return _this.root_.classList.remove(className);
      },
      getWidth: function () {
        return _this.root_.scrollWidth;
      },
      registerInteractionHandler: function (evtType, handler) {
        return _this.listen(evtType, handler);
      },
      deregisterInteractionHandler: function (evtType, handler) {
        return _this.unlisten(evtType, handler);
      }
    }; // tslint:enable:object-literal-sort-keys

    return new _foundation.MDCFloatingLabelFoundation(adapter);
  };

  return MDCFloatingLabel;
}(_component.MDCComponent); //# sourceMappingURL=component.js.map


exports.MDCFloatingLabel = MDCFloatingLabel;
},{"tslib":"../node_modules/tslib/tslib.es6.js","@material/base/component":"../node_modules/@material/base/component.js","./foundation":"../node_modules/@rmwc/floating-label/node_modules/@material/floating-label/foundation.js"}],"../node_modules/@rmwc/floating-label/node_modules/@material/floating-label/index.js":[function(require,module,exports) {
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
},{"./component":"../node_modules/@rmwc/floating-label/node_modules/@material/floating-label/component.js","./foundation":"../node_modules/@rmwc/floating-label/node_modules/@material/floating-label/foundation.js"}],"../node_modules/@rmwc/floating-label/next/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloatingLabel = void 0;

var React = _interopRequireWildcard(require("react"));

var _floatingLabel = require("@material/floating-label");

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

var FloatingLabel =
/** @class */
function (_super) {
  __extends(FloatingLabel, _super);

  function FloatingLabel() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.root = _this.createElement('root');
    return _this;
  }

  FloatingLabel.prototype.getDefaultFoundation = function () {
    var _this = this;

    return new _floatingLabel.MDCFloatingLabelFoundation({
      addClass: function (className) {
        return _this.root.addClass(className);
      },
      removeClass: function (className) {
        return _this.root.removeClass(className);
      },
      getWidth: function () {
        return _this.root.ref ? _this.root.ref.scrollWidth : 0;
      },
      registerInteractionHandler: function (evtType, handler) {
        return _this.root.addEventListener(evtType, handler);
      },
      deregisterInteractionHandler: function (evtType, handler) {
        return _this.root.removeEventListener(evtType, handler);
      }
    });
  };

  FloatingLabel.prototype.sync = function (props, prevProps) {
    var _this = this; // shake


    this.syncProp(props.shake, prevProps.shake, function () {
      _this.foundation.shake(!!props.shake);
    }); // float

    this.syncProp(props.float, prevProps.float, function () {
      _this.foundation.float(!!props.float);
    });
  };

  FloatingLabel.prototype.getWidth = function () {
    return this.foundation.getWidth();
  };

  FloatingLabel.prototype.render = function () {
    var _a = this.props,
        shake = _a.shake,
        float = _a.float,
        rest = __rest(_a, ["shake", "float"]);

    return React.createElement("label", __assign({}, this.root.props(__assign({}, rest, {
      className: 'mdc-floating-label'
    })), {
      ref: this.root.setRef
    }));
  };

  FloatingLabel.displayName = 'FloatingLabel';
  return FloatingLabel;
}(_base.FoundationComponent);

exports.FloatingLabel = FloatingLabel;
},{"react":"../node_modules/react/index.js","@material/floating-label":"../node_modules/@rmwc/floating-label/node_modules/@material/floating-label/index.js","@rmwc/base":"../node_modules/@rmwc/base/next/index.js"}],"../node_modules/@rmwc/notched-outline/node_modules/@material/floating-label/foundation.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.MDCFloatingLabelFoundation = void 0;

var tslib_1 = _interopRequireWildcard(require("tslib"));

var _foundation = require("@material/base/foundation");

var _constants = require("./constants");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/**
 * @license
 * Copyright 2016 Google Inc.
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
var MDCFloatingLabelFoundation =
/** @class */
function (_super) {
  tslib_1.__extends(MDCFloatingLabelFoundation, _super);

  function MDCFloatingLabelFoundation(adapter) {
    var _this = _super.call(this, tslib_1.__assign({}, MDCFloatingLabelFoundation.defaultAdapter, adapter)) || this;

    _this.shakeAnimationEndHandler_ = function () {
      return _this.handleShakeAnimationEnd_();
    };

    return _this;
  }

  Object.defineProperty(MDCFloatingLabelFoundation, "cssClasses", {
    get: function () {
      return _constants.cssClasses;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCFloatingLabelFoundation, "defaultAdapter", {
    /**
     * See {@link MDCFloatingLabelAdapter} for typing information on parameters and return types.
     */
    get: function () {
      // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
      return {
        addClass: function () {
          return undefined;
        },
        removeClass: function () {
          return undefined;
        },
        getWidth: function () {
          return 0;
        },
        registerInteractionHandler: function () {
          return undefined;
        },
        deregisterInteractionHandler: function () {
          return undefined;
        }
      }; // tslint:enable:object-literal-sort-keys
    },
    enumerable: true,
    configurable: true
  });

  MDCFloatingLabelFoundation.prototype.init = function () {
    this.adapter_.registerInteractionHandler('animationend', this.shakeAnimationEndHandler_);
  };

  MDCFloatingLabelFoundation.prototype.destroy = function () {
    this.adapter_.deregisterInteractionHandler('animationend', this.shakeAnimationEndHandler_);
  };
  /**
   * Returns the width of the label element.
   */


  MDCFloatingLabelFoundation.prototype.getWidth = function () {
    return this.adapter_.getWidth();
  };
  /**
   * Styles the label to produce a shake animation to indicate an error.
   * @param shouldShake If true, adds the shake CSS class; otherwise, removes shake class.
   */


  MDCFloatingLabelFoundation.prototype.shake = function (shouldShake) {
    var LABEL_SHAKE = MDCFloatingLabelFoundation.cssClasses.LABEL_SHAKE;

    if (shouldShake) {
      this.adapter_.addClass(LABEL_SHAKE);
    } else {
      this.adapter_.removeClass(LABEL_SHAKE);
    }
  };
  /**
   * Styles the label to float or dock.
   * @param shouldFloat If true, adds the float CSS class; otherwise, removes float and shake classes to dock the label.
   */


  MDCFloatingLabelFoundation.prototype.float = function (shouldFloat) {
    var _a = MDCFloatingLabelFoundation.cssClasses,
        LABEL_FLOAT_ABOVE = _a.LABEL_FLOAT_ABOVE,
        LABEL_SHAKE = _a.LABEL_SHAKE;

    if (shouldFloat) {
      this.adapter_.addClass(LABEL_FLOAT_ABOVE);
    } else {
      this.adapter_.removeClass(LABEL_FLOAT_ABOVE);
      this.adapter_.removeClass(LABEL_SHAKE);
    }
  };

  MDCFloatingLabelFoundation.prototype.handleShakeAnimationEnd_ = function () {
    var LABEL_SHAKE = MDCFloatingLabelFoundation.cssClasses.LABEL_SHAKE;
    this.adapter_.removeClass(LABEL_SHAKE);
  };

  return MDCFloatingLabelFoundation;
}(_foundation.MDCFoundation);

exports.MDCFloatingLabelFoundation = MDCFloatingLabelFoundation;
// tslint:disable-next-line:no-default-export Needed for backward compatibility with MDC Web v0.44.0 and earlier.
var _default = MDCFloatingLabelFoundation; //# sourceMappingURL=foundation.js.map

exports.default = _default;
},{"tslib":"../node_modules/tslib/tslib.es6.js","@material/base/foundation":"../node_modules/@material/base/foundation.js","./constants":"../node_modules/@material/floating-label/constants.js"}],"../node_modules/@rmwc/notched-outline/node_modules/@material/notched-outline/foundation.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.MDCNotchedOutlineFoundation = void 0;

var tslib_1 = _interopRequireWildcard(require("tslib"));

var _foundation = require("@material/base/foundation");

var _constants = require("./constants");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/**
 * @license
 * Copyright 2017 Google Inc.
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
var MDCNotchedOutlineFoundation =
/** @class */
function (_super) {
  tslib_1.__extends(MDCNotchedOutlineFoundation, _super);

  function MDCNotchedOutlineFoundation(adapter) {
    return _super.call(this, tslib_1.__assign({}, MDCNotchedOutlineFoundation.defaultAdapter, adapter)) || this;
  }

  Object.defineProperty(MDCNotchedOutlineFoundation, "strings", {
    get: function () {
      return _constants.strings;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCNotchedOutlineFoundation, "cssClasses", {
    get: function () {
      return _constants.cssClasses;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCNotchedOutlineFoundation, "numbers", {
    get: function () {
      return _constants.numbers;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCNotchedOutlineFoundation, "defaultAdapter", {
    /**
     * See {@link MDCNotchedOutlineAdapter} for typing information on parameters and return types.
     */
    get: function () {
      // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
      return {
        addClass: function () {
          return undefined;
        },
        removeClass: function () {
          return undefined;
        },
        setNotchWidthProperty: function () {
          return undefined;
        },
        removeNotchWidthProperty: function () {
          return undefined;
        }
      }; // tslint:enable:object-literal-sort-keys
    },
    enumerable: true,
    configurable: true
  });
  /**
   * Adds the outline notched selector and updates the notch width calculated based off of notchWidth.
   */

  MDCNotchedOutlineFoundation.prototype.notch = function (notchWidth) {
    var OUTLINE_NOTCHED = MDCNotchedOutlineFoundation.cssClasses.OUTLINE_NOTCHED;

    if (notchWidth > 0) {
      notchWidth += _constants.numbers.NOTCH_ELEMENT_PADDING; // Add padding from left/right.
    }

    this.adapter_.setNotchWidthProperty(notchWidth);
    this.adapter_.addClass(OUTLINE_NOTCHED);
  };
  /**
   * Removes notched outline selector to close the notch in the outline.
   */


  MDCNotchedOutlineFoundation.prototype.closeNotch = function () {
    var OUTLINE_NOTCHED = MDCNotchedOutlineFoundation.cssClasses.OUTLINE_NOTCHED;
    this.adapter_.removeClass(OUTLINE_NOTCHED);
    this.adapter_.removeNotchWidthProperty();
  };

  return MDCNotchedOutlineFoundation;
}(_foundation.MDCFoundation);

exports.MDCNotchedOutlineFoundation = MDCNotchedOutlineFoundation;
// tslint:disable-next-line:no-default-export Needed for backward compatibility with MDC Web v0.44.0 and earlier.
var _default = MDCNotchedOutlineFoundation; //# sourceMappingURL=foundation.js.map

exports.default = _default;
},{"tslib":"../node_modules/tslib/tslib.es6.js","@material/base/foundation":"../node_modules/@material/base/foundation.js","./constants":"../node_modules/@material/notched-outline/constants.js"}],"../node_modules/@rmwc/notched-outline/node_modules/@material/notched-outline/component.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MDCNotchedOutline = void 0;

var tslib_1 = _interopRequireWildcard(require("tslib"));

var _component = require("@material/base/component");

var _foundation = require("@material/floating-label/foundation");

var _constants = require("./constants");

var _foundation2 = require("./foundation");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/**
 * @license
 * Copyright 2017 Google Inc.
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
var MDCNotchedOutline =
/** @class */
function (_super) {
  tslib_1.__extends(MDCNotchedOutline, _super);

  function MDCNotchedOutline() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  MDCNotchedOutline.attachTo = function (root) {
    return new MDCNotchedOutline(root);
  };

  MDCNotchedOutline.prototype.initialSyncWithDOM = function () {
    this.notchElement_ = this.root_.querySelector(_constants.strings.NOTCH_ELEMENT_SELECTOR);
    var label = this.root_.querySelector('.' + _foundation.MDCFloatingLabelFoundation.cssClasses.ROOT);

    if (label) {
      label.style.transitionDuration = '0s';
      this.root_.classList.add(_constants.cssClasses.OUTLINE_UPGRADED);
      requestAnimationFrame(function () {
        label.style.transitionDuration = '';
      });
    } else {
      this.root_.classList.add(_constants.cssClasses.NO_LABEL);
    }
  };
  /**
   * Updates classes and styles to open the notch to the specified width.
   * @param notchWidth The notch width in the outline.
   */


  MDCNotchedOutline.prototype.notch = function (notchWidth) {
    this.foundation_.notch(notchWidth);
  };
  /**
   * Updates classes and styles to close the notch.
   */


  MDCNotchedOutline.prototype.closeNotch = function () {
    this.foundation_.closeNotch();
  };

  MDCNotchedOutline.prototype.getDefaultFoundation = function () {
    var _this = this; // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<MDCFooAdapter>.
    // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.
    // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.


    var adapter = {
      addClass: function (className) {
        return _this.root_.classList.add(className);
      },
      removeClass: function (className) {
        return _this.root_.classList.remove(className);
      },
      setNotchWidthProperty: function (width) {
        return _this.notchElement_.style.setProperty('width', width + 'px');
      },
      removeNotchWidthProperty: function () {
        return _this.notchElement_.style.removeProperty('width');
      }
    }; // tslint:enable:object-literal-sort-keys

    return new _foundation2.MDCNotchedOutlineFoundation(adapter);
  };

  return MDCNotchedOutline;
}(_component.MDCComponent); //# sourceMappingURL=component.js.map


exports.MDCNotchedOutline = MDCNotchedOutline;
},{"tslib":"../node_modules/tslib/tslib.es6.js","@material/base/component":"../node_modules/@material/base/component.js","@material/floating-label/foundation":"../node_modules/@rmwc/notched-outline/node_modules/@material/floating-label/foundation.js","./constants":"../node_modules/@material/notched-outline/constants.js","./foundation":"../node_modules/@rmwc/notched-outline/node_modules/@material/notched-outline/foundation.js"}],"../node_modules/@rmwc/notched-outline/node_modules/@material/notched-outline/index.js":[function(require,module,exports) {
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
},{"./component":"../node_modules/@rmwc/notched-outline/node_modules/@material/notched-outline/component.js","./foundation":"../node_modules/@rmwc/notched-outline/node_modules/@material/notched-outline/foundation.js"}],"../node_modules/@rmwc/notched-outline/next/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NotchedOutline = void 0;

var React = _interopRequireWildcard(require("react"));

var _base = require("@rmwc/base");

var _notchedOutline = require("@material/notched-outline");

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

var NotchedOutlineLeading =
/** @class */
function (_super) {
  __extends(NotchedOutlineLeading, _super);

  function NotchedOutlineLeading() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  NotchedOutlineLeading.prototype.shouldComponentUpdate = function () {
    return false;
  };

  NotchedOutlineLeading.prototype.render = function () {
    return React.createElement("div", {
      className: "mdc-notched-outline__leading"
    });
  };

  return NotchedOutlineLeading;
}(React.Component);

var NotchedOutlineTrailing =
/** @class */
function (_super) {
  __extends(NotchedOutlineTrailing, _super);

  function NotchedOutlineTrailing() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  NotchedOutlineTrailing.prototype.shouldComponentUpdate = function () {
    return false;
  };

  NotchedOutlineTrailing.prototype.render = function () {
    return React.createElement("div", {
      className: "mdc-notched-outline__trailing"
    });
  };

  return NotchedOutlineTrailing;
}(React.Component);

var NotchedOutline =
/** @class */
function (_super) {
  __extends(NotchedOutline, _super);

  function NotchedOutline() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.root = _this.createElement('root');
    _this.notchElement = _this.createElement('root');
    _this.label = null;
    return _this;
  }

  NotchedOutline.prototype.componentDidMount = function () {
    var _this = this;

    _super.prototype.componentDidMount.call(this);

    this.label = this.root.ref && this.root.ref.querySelector('label');

    if (this.label) {
      this.label.style.transitionDuration = '0s';
      this.root.addClass(_notchedOutline.MDCNotchedOutlineFoundation.cssClasses.OUTLINE_UPGRADED);
      requestAnimationFrame(function () {
        _this.label && (_this.label.style.transitionDuration = '');
      });
    } else {
      this.root.addClass(_notchedOutline.MDCNotchedOutlineFoundation.cssClasses.NO_LABEL);
    }
  };

  NotchedOutline.prototype.getDefaultFoundation = function () {
    var _this = this;

    return new _notchedOutline.MDCNotchedOutlineFoundation({
      addClass: function (className) {
        return _this.root.addClass(className);
      },
      removeClass: function (className) {
        return _this.root.removeClass(className);
      },
      setNotchWidthProperty: function (width) {
        return _this.notchElement.setStyle('width', width + 'px');
      },
      removeNotchWidthProperty: function () {
        return _this.notchElement.setStyle('width', '');
      }
    });
  };

  NotchedOutline.prototype.sync = function (props, prevProps) {
    var _this = this;

    this.syncProp(props.notch, prevProps.notch, function () {
      !!props.notch ? _this.foundation.notch(props.notch) : _this.foundation.closeNotch();
    });
  };

  NotchedOutline.prototype.render = function () {
    var _a = this.props,
        children = _a.children,
        rest = __rest(_a, ["children"]);

    return React.createElement("div", __assign({}, this.root.props(__assign({}, rest, {
      className: 'mdc-notched-outline'
    })), {
      ref: this.root.setRef
    }), React.createElement(NotchedOutlineLeading, null), React.createElement("div", __assign({}, this.notchElement.props({}), {
      className: "mdc-notched-outline__notch",
      ref: this.notchElement.setRef
    }), children), React.createElement(NotchedOutlineTrailing, null));
  };

  NotchedOutline.displayName = 'NotchedOutline';
  return NotchedOutline;
}(_base.FoundationComponent);

exports.NotchedOutline = NotchedOutline;
},{"react":"../node_modules/react/index.js","@rmwc/base":"../node_modules/@rmwc/base/next/index.js","@material/notched-outline":"../node_modules/@rmwc/notched-outline/node_modules/@material/notched-outline/index.js"}],"../node_modules/@rmwc/textfield/next/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TextFieldIcon = exports.TextFieldHelperText = exports.TextField = void 0;

var React = _interopRequireWildcard(require("react"));

var _textfield = require("@material/textfield");

var _base = require("@rmwc/base");

var _icon2 = require("@rmwc/icon");

var _lineRipple = require("@rmwc/line-ripple");

var _floatingLabel = require("@rmwc/floating-label");

var _notchedOutline = require("@rmwc/notched-outline");

var _ripple = require("@rmwc/ripple");

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

var TextFieldRoot = (0, _ripple.withRipple)()((0, _base.componentFactory)({
  displayName: 'TextFieldRoot',
  deprecate: {
    box: ''
  },
  classNames: function (props) {
    return ['mdc-text-field', 'mdc-text-field--upgraded', {
      'mdc-text-field--textarea': props.textarea,
      'mdc-text-field--fullwidth': props.fullwidth,
      'mdc-text-field--outlined': props.outlined,
      'mdc-text-field--dense': props.dense,
      'mdc-text-field--invalid': props.invalid,
      'mdc-text-field--disabled': props.disabled,
      'mdc-text-field--with-leading-icon': !!props.icon,
      'mdc-text-field--with-trailing-icon': !!props.trailingIcon,
      'mdc-text-field--no-label': !props.label
    }];
  },
  consumeProps: ['textarea', 'fullwidth', 'outlined', 'dense', 'invalid', 'disabled', 'icon', 'trailingIcon', 'label']
}));
var TextFieldInput = (0, _base.componentFactory)({
  displayName: 'TextFieldInput',
  defaultProps: {
    type: 'text'
  },
  tag: 'input',
  classNames: ['mdc-text-field__input']
});
var TextFieldTextarea = (0, _base.componentFactory)({
  displayName: 'TextFieldTextarea',
  tag: 'textarea',
  classNames: ['mdc-text-field__input']
});
/** A TextField component for accepting text input from a user. */

var TextField =
/** @class */
function (_super) {
  __extends(TextField, _super);

  function TextField(props) {
    var _this = _super.call(this, props) || this;

    _this.generatedId = (0, _base.randomId)('textfield');
    _this.root = _this.createElement('root');
    _this.input = _this.createElement('input');
    _this.label = _this.createElement('label');
    _this.lineRipple = _this.createElement('lineRipple');
    _this.characterCounter = null;
    _this.leadingIcon = null;
    _this.trailingIcon = null;
    _this.valueNeedsUpdate = false;
    _this.handleOnChange = _this.handleOnChange.bind(_this);
    return _this;
  }

  TextField.prototype.getDefaultFoundation = function () {
    var _this = this;

    return new _textfield.MDCTextFieldFoundation(__assign({
      addClass: function (className) {
        return _this.root.addClass(className);
      },
      removeClass: function (className) {
        return _this.root.removeClass(className);
      },
      hasClass: function (className) {
        return _this.root.hasClass(className);
      },
      registerTextFieldInteractionHandler: function (evtType, handler) {
        return _this.root.addEventListener(evtType, handler);
      },
      deregisterTextFieldInteractionHandler: function (evtType, handler) {
        return _this.root.removeEventListener(evtType, handler);
      },
      registerValidationAttributeChangeHandler: function (handler) {
        var getAttributesList = function (mutationsList) {
          return mutationsList.map(function (mutation) {
            return mutation.attributeName;
          });
        };

        if (_this.input.ref) {
          var observer = new MutationObserver(function (mutationsList) {
            return handler(getAttributesList(mutationsList));
          });
          var targetNode = _this.input.ref;
          var config = {
            attributes: true
          };
          targetNode && observer.observe(targetNode, config);
          return observer;
        }

        return {};
      },
      deregisterValidationAttributeChangeHandler: function (observer) {
        observer && observer.disconnect();
      },
      isFocused: function () {
        return document.activeElement === _this.input.ref;
      }
    }, this.getInputAdapterMethods(), this.getLabelAdapterMethods(), this.getLineRippleAdapterMethods(), this.getOutlineAdapterMethods()), this.getFoundationMap());
  };

  TextField.prototype.getLabelAdapterMethods = function () {
    var _this = this;

    return {
      shakeLabel: function (shouldShake) {
        return _this.label.setProp('shake', shouldShake);
      },
      floatLabel: function (shouldFloat) {
        return _this.label.setProp('float', shouldFloat);
      },
      hasLabel: function () {
        return !!_this.props.label;
      },
      getLabelWidth: function () {
        return _this.label.ref ? _this.label.ref.getWidth() : 0;
      }
    };
  };

  TextField.prototype.getLineRippleAdapterMethods = function () {
    var _this = this;

    return {
      activateLineRipple: function () {
        if (_this.lineRipple) {
          _this.lineRipple.setProp('active', true);
        }
      },
      deactivateLineRipple: function () {
        if (_this.lineRipple) {
          _this.lineRipple.setProp('active', false);
        }
      },
      setLineRippleTransformOrigin: function (normalizedX) {
        if (_this.lineRipple) {
          _this.lineRipple.setProp('center', normalizedX);
        }
      }
    };
  };

  TextField.prototype.getOutlineAdapterMethods = function () {
    var _this = this;

    return {
      notchOutline: function (labelWidth) {
        !!_this.outline && _this.outline.notch(labelWidth);
      },
      closeOutline: function () {
        return _this.outline && _this.outline.closeNotch();
      },
      hasOutline: function () {
        return !!_this.outline;
      }
    };
  };

  TextField.prototype.getInputAdapterMethods = function () {
    var _this = this;

    return {
      registerInputInteractionHandler: function (evtType, handler) {
        return _this.input.addEventListener(evtType, handler);
      },
      deregisterInputInteractionHandler: function (evtType, handler) {
        return _this.input.removeEventListener(evtType, handler);
      },
      getNativeInput: function () {
        return _this.input.ref;
      }
    };
  };

  TextField.prototype.getFoundationMap = function () {
    return {
      characterCounter: this.characterCounter ? this.characterCounter.foundation : undefined,
      helperText: undefined,
      leadingIcon: this.leadingIcon ? this.leadingIcon.foundation : undefined,
      trailingIcon: this.trailingIcon ? this.trailingIcon.foundation : undefined
    };
  }; // handle leading and trailing icons


  TextField.prototype.renderIcon = function (icon, leadOrTrail) {
    var _this = this;

    return React.createElement(TextFieldIcon, {
      ref: function (ref) {
        if (leadOrTrail === 'leadingIcon') {
          _this.leadingIcon = ref;
        } else {
          _this.trailingIcon = ref;
        }
      },
      tabIndex: leadOrTrail === 'trailingIcon' ? 0 : undefined,
      icon: icon
    });
  };

  TextField.prototype.sync = function (props) {
    // Bug #362
    // see comments below in render function
    if (this.valueNeedsUpdate) {
      this.foundation.setValue(String(props.value));
      this.valueNeedsUpdate = false;
    }
  };

  TextField.prototype.handleOnChange = function (evt) {// this.props.onChange && this.props.onChange(evt);
    // this.setState({});
  };

  TextField.prototype.renderHelpText = function (renderedCharacterCounter) {
    var _a = this.props,
        helpText = _a.helpText,
        characterCount = _a.characterCount,
        textarea = _a.textarea;
    var shouldRender = !!helpText || characterCount && !textarea;

    if (!shouldRender) {
      return null;
    }

    var shouldSpread = typeof helpText === 'object' && !React.isValidElement(helpText);
    return React.createElement("div", {
      className: "mdc-text-field-helper-line"
    }, helpText && shouldSpread ? React.createElement(TextFieldHelperText, __assign({}, helpText)) : React.createElement(TextFieldHelperText, null, helpText), !textarea && renderedCharacterCounter);
  };

  TextField.prototype.render = function () {
    var _this = this;

    var _a = this.props,
        label = _a.label,
        className = _a.className,
        style = _a.style,
        outlined = _a.outlined,
        fullwidth = _a.fullwidth,
        dense = _a.dense,
        invalid = _a.invalid,
        disabled = _a.disabled,
        helpText = _a.helpText,
        children = _a.children,
        textarea = _a.textarea,
        inputRef = _a.inputRef,
        characterCount = _a.characterCount,
        _icon = _a.icon,
        _trailingIcon = _a.trailingIcon,
        _withLeadingIcon = _a.withLeadingIcon,
        _withTrailingIcon = _a.withTrailingIcon,
        _b = _a.rootProps,
        rootProps = _b === void 0 ? {} : _b,
        rest = __rest(_a, ["label", "className", "style", "outlined", "fullwidth", "dense", "invalid", "disabled", "helpText", "children", "textarea", "inputRef", "characterCount", "icon", "trailingIcon", "withLeadingIcon", "withTrailingIcon", "rootProps"]);

    var _c = this.props,
        icon = _c.icon,
        trailingIcon = _c.trailingIcon,
        withLeadingIcon = _c.withLeadingIcon,
        withTrailingIcon = _c.withTrailingIcon;

    if (dense !== undefined) {
      (0, _base.deprecationWarning)("Textfield prop 'dense' is being removed in a future release by material-components-web.");
    }

    if (withLeadingIcon !== undefined) {
      (0, _base.deprecationWarning)("Textfield prop 'withLeadingIcon' is now 'icon'.");
      icon = withLeadingIcon;
    }

    if (withTrailingIcon !== undefined) {
      (0, _base.deprecationWarning)("Textfield prop 'withTrailingIcon' is now 'trailingIcon'.");
      trailingIcon = withTrailingIcon;
    } // Fixes bug #362
    // MDC breaks Reacts unidirectional data flow...
    // we cant set the value on render, but we need to
    // to create the side effects for the UI when we dynamically update the field
    // Flag that it needs to be set so that we can call the foundation
    // on componentDidUpdate


    if (this.props.value !== undefined && this.foundation && this.props.value !== this.foundation.getValue()) {
      this.valueNeedsUpdate = true;
    }

    var tagProps = __assign({}, this.input.props(rest), {
      disabled: disabled,
      ref: function (ref) {
        _this.input.setRef(ref);

        inputRef && inputRef(ref);
      },
      id: rest.id || this.generatedId
    });

    var renderedTag = textarea ? React.createElement(TextFieldTextarea, __assign({}, tagProps)) : React.createElement(TextFieldInput, __assign({}, tagProps));
    var renderedLabel = label ? React.createElement(_floatingLabel.FloatingLabel, __assign({}, this.label.props({}), {
      ref: this.label.setRef,
      htmlFor: tagProps.id
    }), label) : null;
    var renderedCharacterCounter = characterCount ? React.createElement(TextFieldCharacterCount, {
      ref: function (el) {
        _this.characterCounter = el;
      }
    }, "F") : null;
    return React.createElement(React.Fragment, null, React.createElement(TextFieldRoot, __assign({}, this.root.props(__assign({}, rootProps, {
      className: className,
      style: style
    })), {
      label: label,
      invalid: invalid,
      icon: !!icon,
      trailingIcon: !!trailingIcon,
      textarea: textarea,
      dense: dense,
      disabled: disabled,
      outlined: outlined,
      fullwidth: fullwidth,
      ref: this.root.setRef
    }), !!icon && this.renderIcon(icon, 'leadingIcon'), children, !!textarea && renderedCharacterCounter, renderedTag, !!outlined ? React.createElement(React.Fragment, null, React.createElement(_notchedOutline.NotchedOutline, {
      ref: function (ref) {
        return _this.outline = ref && ref.foundation;
      }
    }, renderedLabel), !!trailingIcon && this.renderIcon(trailingIcon, 'trailingIcon')) : React.createElement(React.Fragment, null, renderedLabel, !!trailingIcon && this.renderIcon(trailingIcon, 'trailingIcon'), React.createElement(_lineRipple.LineRipple, __assign({}, this.lineRipple.props({}))))), this.renderHelpText(renderedCharacterCounter));
  };

  TextField.displayName = 'TextField';
  return TextField;
}(_base.FoundationComponent);

exports.TextField = TextField;

var TextFieldCharacterCount =
/** @class */
function (_super) {
  __extends(TextFieldCharacterCount, _super);

  function TextFieldCharacterCount() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.state = {
      content: ''
    };
    return _this;
  }

  TextFieldCharacterCount.prototype.getDefaultFoundation = function () {
    var _this = this;

    return new _textfield.MDCTextFieldCharacterCounterFoundation({
      setContent: function (content) {
        _this.setState({
          content: content
        });
      }
    });
  };

  TextFieldCharacterCount.prototype.render = function () {
    return React.createElement("div", {
      className: "mdc-text-field-character-counter"
    }, this.state.content);
  };

  TextFieldCharacterCount.displayName = 'TextFieldCharacterCount';
  return TextFieldCharacterCount;
}(_base.FoundationComponent);
/** A help text component */


var TextFieldHelperText = (0, _base.componentFactory)({
  displayName: 'TextFieldHelperText',
  classNames: function (props) {
    return ['mdc-text-field-helper-text', {
      'mdc-text-field-helper-text--persistent': props.persistent,
      'mdc-text-field-helper-text--validation-msg': props.validationMsg
    }];
  },
  consumeProps: ['persistent', 'validationMsg']
});
/*********************************************************************
 * Icon
 *********************************************************************/

/**
 * An Icon in a TextField
 */

exports.TextFieldHelperText = TextFieldHelperText;

var TextFieldIcon =
/** @class */
function (_super) {
  __extends(TextFieldIcon, _super);

  function TextFieldIcon() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.root = _this.createElement('root');
    return _this;
  }

  TextFieldIcon.prototype.getDefaultFoundation = function () {
    var _this = this;

    return new _textfield.MDCTextFieldIconFoundation({
      getAttr: function (attr) {
        return _this.root.getProp(attr);
      },
      setAttr: function (attr, value) {
        return _this.root.setProp(attr, value);
      },
      removeAttr: function (attr) {
        return _this.root.removeProp(attr);
      },
      setContent: function (content) {
        // @ts-ignore
        _this.root.setProp('icon', content);
      },
      registerInteractionHandler: function (evtType, handler) {
        return _this.root.addEventListener(evtType, handler);
      },
      deregisterInteractionHandler: function (evtType, handler) {
        return _this.root.removeEventListener(evtType, handler);
      },
      notifyIconAction: function () {
        return _this.emit('onClick', {}, true);
      }
    });
  };

  TextFieldIcon.prototype.render = function () {
    return React.createElement(_icon2.Icon, __assign({}, this.root.props(__assign({}, this.props, {
      className: 'mdc-text-field__icon'
    }))));
  };

  TextFieldIcon.displayName = 'TextFieldIcon';
  return TextFieldIcon;
}(_base.FoundationComponent);

exports.TextFieldIcon = TextFieldIcon;
},{"react":"../node_modules/react/index.js","@material/textfield":"../node_modules/@material/textfield/index.js","@rmwc/base":"../node_modules/@rmwc/base/next/index.js","@rmwc/icon":"../node_modules/@rmwc/icon/next/index.js","@rmwc/line-ripple":"../node_modules/@rmwc/line-ripple/next/index.js","@rmwc/floating-label":"../node_modules/@rmwc/floating-label/next/index.js","@rmwc/notched-outline":"../node_modules/@rmwc/notched-outline/next/index.js","@rmwc/ripple":"../node_modules/@rmwc/ripple/next/index.js"}],"../node_modules/js-cookie/src/js.cookie.js":[function(require,module,exports) {
/*!
 * JavaScript Cookie v2.2.0
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 * Released under the MIT license
 */
;(function (factory) {
	var registeredInModuleLoader = false;
	if (typeof define === 'function' && define.amd) {
		define(factory);
		registeredInModuleLoader = true;
	}
	if (typeof exports === 'object') {
		module.exports = factory();
		registeredInModuleLoader = true;
	}
	if (!registeredInModuleLoader) {
		var OldCookies = window.Cookies;
		var api = window.Cookies = factory();
		api.noConflict = function () {
			window.Cookies = OldCookies;
			return api;
		};
	}
}(function () {
	function extend () {
		var i = 0;
		var result = {};
		for (; i < arguments.length; i++) {
			var attributes = arguments[ i ];
			for (var key in attributes) {
				result[key] = attributes[key];
			}
		}
		return result;
	}

	function init (converter) {
		function api (key, value, attributes) {
			var result;
			if (typeof document === 'undefined') {
				return;
			}

			// Write

			if (arguments.length > 1) {
				attributes = extend({
					path: '/'
				}, api.defaults, attributes);

				if (typeof attributes.expires === 'number') {
					var expires = new Date();
					expires.setMilliseconds(expires.getMilliseconds() + attributes.expires * 864e+5);
					attributes.expires = expires;
				}

				// We're using "expires" because "max-age" is not supported by IE
				attributes.expires = attributes.expires ? attributes.expires.toUTCString() : '';

				try {
					result = JSON.stringify(value);
					if (/^[\{\[]/.test(result)) {
						value = result;
					}
				} catch (e) {}

				if (!converter.write) {
					value = encodeURIComponent(String(value))
						.replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
				} else {
					value = converter.write(value, key);
				}

				key = encodeURIComponent(String(key));
				key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);
				key = key.replace(/[\(\)]/g, escape);

				var stringifiedAttributes = '';

				for (var attributeName in attributes) {
					if (!attributes[attributeName]) {
						continue;
					}
					stringifiedAttributes += '; ' + attributeName;
					if (attributes[attributeName] === true) {
						continue;
					}
					stringifiedAttributes += '=' + attributes[attributeName];
				}
				return (document.cookie = key + '=' + value + stringifiedAttributes);
			}

			// Read

			if (!key) {
				result = {};
			}

			// To prevent the for loop in the first place assign an empty array
			// in case there are no cookies at all. Also prevents odd result when
			// calling "get()"
			var cookies = document.cookie ? document.cookie.split('; ') : [];
			var rdecode = /(%[0-9A-Z]{2})+/g;
			var i = 0;

			for (; i < cookies.length; i++) {
				var parts = cookies[i].split('=');
				var cookie = parts.slice(1).join('=');

				if (!this.json && cookie.charAt(0) === '"') {
					cookie = cookie.slice(1, -1);
				}

				try {
					var name = parts[0].replace(rdecode, decodeURIComponent);
					cookie = converter.read ?
						converter.read(cookie, name) : converter(cookie, name) ||
						cookie.replace(rdecode, decodeURIComponent);

					if (this.json) {
						try {
							cookie = JSON.parse(cookie);
						} catch (e) {}
					}

					if (key === name) {
						result = cookie;
						break;
					}

					if (!key) {
						result[name] = cookie;
					}
				} catch (e) {}
			}

			return result;
		}

		api.set = api;
		api.get = function (key) {
			return api.call(api, key);
		};
		api.getJSON = function () {
			return api.apply({
				json: true
			}, [].slice.call(arguments));
		};
		api.defaults = {};

		api.remove = function (key, attributes) {
			api(key, '', extend(attributes, {
				expires: -1
			}));
		};

		api.withConverter = init;

		return api;
	}

	return init(function () {});
}));

},{}],"../node_modules/react-hook-form/dist/react-hook-form.es.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormContext = FormContext;
exports.useFormContext = exports.default = void 0;

var _react = require("react");

var isCheckBoxInput = type => type === 'checkbox';

function attachEventListeners({
  field,
  validateAndStateUpdate,
  isRadio
}) {
  const {
    ref
  } = field;
  if (!ref.addEventListener) return;
  ref.addEventListener(isCheckBoxInput(ref.type) || isRadio ? 'change' : 'input', validateAndStateUpdate);
  ref.addEventListener('blur', validateAndStateUpdate);
}

const reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/;
const reIsPlainProp = /^\w*$/;
const rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
const reEscapeChar = /\\(\\)?/g;
const reIsUint = /^(?:0|[1-9]\d*)$/;
const isArray = Array.isArray;

function isIndex(value) {
  return reIsUint.test(value) && value > -1;
}

function isKey(value) {
  if (isArray(value)) return false;
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value);
}

const stringToPath = string => {
  const result = [];
  string.replace(rePropName, (match, number, quote, string) => {
    result.push(quote ? string.replace(reEscapeChar, "$1") : number || match);
  });
  return result;
};

function set(object, path, value) {
  path = isKey(path) ? [path] : stringToPath(path);
  let index = -1;
  const length = path.length;
  const lastIndex = length - 1;

  while (++index < length) {
    let key = path[index];
    let newValue = value;

    if (index != lastIndex) {
      const objValue = object[key];
      const isObject = typeof objValue === "object";
      newValue = isObject ? objValue : isIndex(path[index + 1]) ? [] : {};
    }

    object[key] = newValue;
    object = object[key];
  }

  return object;
}

function combineFieldValues(data) {
  const output = Object.entries(data).reduce((previous, [key, value]) => {
    const isArray = key.match(/\[\d+\]/gi);
    const isObject = key.indexOf(".") >= 0;

    if (isArray || isObject) {
      set(previous, key, value);
      return previous;
    }

    previous[key] = value;
    return previous;
  }, {});
  return Object.entries(output).reduce((previous, [key, value]) => {
    if (Array.isArray(value)) {
      previous[key] = value.filter(Boolean);
      return previous;
    }

    previous[key] = value;
    return previous;
  }, {});
}

var removeAllEventListeners = (ref, validateWithStateUpdate) => {
  if (!ref.removeEventListener) return;
  ref.removeEventListener('input', validateWithStateUpdate);
  ref.removeEventListener('change', validateWithStateUpdate);
  ref.removeEventListener('blur', validateWithStateUpdate);
};

var isRadioInput = type => type === 'radio';

function findRemovedFieldAndRemoveListener(fields, touchedFieldsRef, fieldsWithValidation, validateWithStateUpdate, {
  ref,
  mutationWatcher,
  options
}, forceDelete = false) {
  if (!ref || !ref.type) return;
  const {
    name,
    type
  } = ref;
  touchedFieldsRef.current.delete(name);
  fieldsWithValidation.current.delete(name);

  if (isRadioInput(type) && options) {
    options.forEach(({
      ref
    }, index) => {
      if (ref instanceof HTMLElement && !document.body.contains(ref) && options && options[index]) {
        removeAllEventListeners(options[index], validateWithStateUpdate);
        (options[index].mutationWatcher || {
          disconnect: () => {}
        }).disconnect();
        options.splice(index, 1);
      }
    });

    if (Array.isArray(options) && !options.length) {
      delete fields[name];
      return fields;
    }
  } else if (ref instanceof HTMLElement && !document.body.contains(ref) || forceDelete) {
    removeAllEventListeners(ref, validateWithStateUpdate);
    if (mutationWatcher) mutationWatcher.disconnect();
    delete fields[name];
    return fields;
  }

  return fields;
}

const defaultReturn = {
  isValid: false,
  value: ''
};

function getRadioValue(options) {
  return Array.isArray(options) ? options.reduce((previous, {
    ref: {
      checked,
      value
    }
  }) => checked ? {
    isValid: true,
    value
  } : previous, defaultReturn) : defaultReturn;
}

var getMultipleSelectValue = options => options.filter(({
  selected
}) => selected).map(({
  value
}) => value);

function getFieldValue(fields, {
  type,
  name,
  options,
  checked,
  value
}) {
  if (isRadioInput(type)) {
    const fieldValue = fields[name];
    if (!fieldValue) throw new Error(`Expected ${name} field is missing`);
    return getRadioValue(fieldValue.options).value;
  }

  if (type === 'select-multiple') return getMultipleSelectValue(options);
  if (isCheckBoxInput(type)) return checked ? value || checked : false;
  return value;
}

var isString = value => value && typeof value === 'string';

function getFieldsValues(fields, fieldName) {
  return Object.values(fields).reduce((previous, data) => {
    const {
      ref,
      ref: {
        name
      }
    } = data;
    const value = getFieldValue(fields, ref);

    if (isString(fieldName)) {
      return name === fieldName ? value : previous;
    }

    if (Array.isArray(fieldName)) {
      if (fieldName.includes(name)) {
        previous[name] = value;
      }
    } else {
      previous[name] = value;
    }

    return previous;
  }, {});
}

var isEmptyObject = values => values && values.constructor === Object && Object.keys(values).length === 0;

function shouldUpdateWithError({
  errors,
  name,
  error,
  isOnBlur,
  isBlurType,
  validateDisabled
}) {
  if (validateDisabled || isOnBlur && !isBlurType || isEmptyObject(error) && isEmptyObject(errors) || errors[name] && errors[name].isManual) {
    return false;
  }

  if (isEmptyObject(errors) && !isEmptyObject(error) || isEmptyObject(error) && errors[name]) {
    return true;
  }

  if (!errors[name]) {
    return true;
  } else if (errors[name].type !== error[name].type || errors[name].message !== error[name].message) {
    return true;
  }

  return false;
}

const DATE_INPUTS = ['date', 'time', 'month', 'datetime', 'datetime-local', 'week'];
const STRING_INPUTS = ['text', 'email', 'password', 'search', 'tel', 'url', 'textarea'];
const VALIDATION_MODE = {
  onBlur: 'onBlur',
  onchange: 'onChange',
  onSubmit: 'onSubmit'
};

var getValueAndMessage = item => ({
  value: typeof item === 'object' && item.value ? item.value : item,
  message: typeof item === 'object' && item.message ? item.message : ''
});

function displayNativeError(nativeValidation, ref, message) {
  if (nativeValidation && isString(message)) ref.setCustomValidity(message);
}

var validateField = async ({
  ref,
  ref: {
    type,
    value,
    name,
    checked
  },
  options,
  required,
  maxLength,
  minLength,
  min,
  max,
  pattern,
  validate
}, fields, nativeValidation) => {
  const error = {};
  const isRadio = isRadioInput(type);
  const isCheckBox = isCheckBoxInput(type);
  const isSelectOrInput = !isCheckBox && !isRadio;
  const nativeError = displayNativeError.bind(null, nativeValidation, ref);

  if (required && (isCheckBox && !checked || isSelectOrInput && value === '' || isRadio && !getRadioValue(fields[name].options).isValid || !type && !value)) {
    error[name] = {
      type: 'required',
      message: isString(required) ? required : '',
      ref: isRadio ? (fields[name].options || [{
        ref: ''
      }])[0].ref : ref
    };
    nativeError(required);
    return error;
  }

  if ((min || max) && !STRING_INPUTS.includes(type)) {
    let exceedMax;
    let exceedMin;
    const valueNumber = parseFloat(value);
    const {
      value: maxValue,
      message: maxMessage
    } = getValueAndMessage(max);
    const {
      value: minValue,
      message: minMessage
    } = getValueAndMessage(min);
    const message = exceedMax ? maxMessage : minMessage;

    if (type === 'number') {
      exceedMax = maxValue && valueNumber > maxValue;
      exceedMin = minValue && valueNumber < minValue;
    } else if (DATE_INPUTS.includes(type)) {
      if (typeof maxValue === 'string') exceedMax = maxValue && new Date(value) > new Date(maxValue);
      if (typeof minValue === 'string') exceedMin = minValue && new Date(value) < new Date(minValue);
    }

    if (exceedMax || exceedMin) {
      error[name] = Object.assign({}, error[name], {
        type: exceedMax ? 'max' : 'min',
        message,
        ref
      });
      nativeError(message);
      return error;
    }
  }

  if ((maxLength || minLength) && STRING_INPUTS.includes(type)) {
    const {
      value: maxLengthValue,
      message: maxLengthMessage
    } = getValueAndMessage(maxLength);
    const {
      value: minLengthValue,
      message: minLengthMessage
    } = getValueAndMessage(minLength);
    const exceedMax = maxLength && value.toString().length > maxLengthValue;
    const exceedMin = minLength && value.toString().length < minLengthValue;
    const message = exceedMax ? maxLengthMessage : minLengthMessage;

    if (exceedMax || exceedMin) {
      error[name] = Object.assign({}, error[name], {
        type: exceedMax ? 'maxLength' : 'minLength',
        message,
        ref
      });
      nativeError(message);
      return error;
    }
  }

  if (pattern) {
    const {
      value: patternValue,
      message: patternMessage
    } = getValueAndMessage(pattern);

    if (patternValue instanceof RegExp && !patternValue.test(value)) {
      error[name] = Object.assign({}, error[name], {
        type: 'pattern',
        message: patternMessage,
        ref
      });
      nativeError(patternMessage);
      return error;
    }
  }

  if (validate) {
    const fieldValue = isRadio ? getRadioValue(options).value : value;
    const validateRef = isRadio && options ? options[0].ref : ref;

    if (typeof validate === 'function') {
      const result = await validate(fieldValue);

      if (typeof result === 'string' && result) {
        error[name] = Object.assign({}, error[name], {
          type: 'validate',
          message: result,
          ref: validateRef
        });
        nativeError(result);
        return error;
      } else if (typeof result === 'boolean' && !result) {
        error[name] = Object.assign({}, error[name], {
          type: 'validate',
          message: '',
          ref: validateRef
        });
        nativeError('not valid');
        return error;
      }
    } else if (typeof validate === 'object') {
      const validationResult = await new Promise(resolve => {
        const values = Object.entries(validate);
        values.reduce(async (previous, [key, validate], index) => {
          const lastChild = values.length - 1 === index;

          if (typeof validate === 'function') {
            const result = await validate(fieldValue);

            if (typeof result !== 'boolean' || !result) {
              const message = isString(result) ? result : '';
              const data = {
                type: key,
                message,
                ref: validateRef
              };
              nativeError(message);
              return lastChild ? resolve(data) : data;
            }
          }

          return lastChild ? resolve(previous) : previous;
        }, {});
      });

      if (validationResult && !isEmptyObject(validationResult)) {
        error[name] = Object.assign({}, error[name], {
          ref: validateRef
        }, validationResult);
        return error;
      }
    }
  }

  if (nativeValidation) ref.setCustomValidity('');
  return error;
};

function parseErrorSchema(error) {
  return error.inner.reduce((previous, current, index) => {
    previous[current.path] = error.errors[index];
    return previous;
  }, {});
}

async function validateWithSchema(ValidationSchema, data) {
  try {
    await ValidationSchema.validate(data, {
      abortEarly: false
    });
    return {};
  } catch (e) {
    return parseErrorSchema(e);
  }
}

function attachNativeValidation(ref, rules) {
  Object.entries(rules).forEach(([key, value]) => {
    if (key === 'required') {
      ref[key] = true;
    } else if (key === 'pattern' && value instanceof RegExp) {
      ref[key] = value.source;
    } else {
      ref[key] = value;
    }
  });
}

var filterUndefinedErrors = errors => Object.entries(errors).reduce((previous, [key, value]) => {
  if (value && value.type) {
    // @ts-ignore
    previous[key] = value;
  }

  return previous;
}, {});

function onDomRemove(element, onDetachCallback) {
  const observer = new MutationObserver(() => {
    function isDetached(element) {
      if (!element || !element.parentNode) return true;

      if (element.parentNode === window.document) {
        return false;
      } else if (element.parentNode === null) {
        return true;
      }

      return isDetached(element.parentNode);
    }

    if (isDetached(element)) {
      observer.disconnect();
      onDetachCallback();
    }
  });
  observer.observe(window.document, {
    childList: true,
    subtree: true
  });
  return observer;
}

var modeChecker = mode => ({
  isOnSubmit: !mode || mode === VALIDATION_MODE.onSubmit,
  isOnBlur: mode === VALIDATION_MODE.onBlur,
  isOnChange: mode === VALIDATION_MODE.onchange
});

var warnMissingRef = payload => console.warn(`⚠ Missing field name: ${payload}`);

function useForm({
  mode,
  validationSchema,
  defaultValues,
  validationFields,
  nativeValidation,
  submitFocusError
} = {
  mode: 'onSubmit',
  defaultValues: {},
  nativeValidation: false,
  submitFocusError: true
}) {
  const unMount = (0, _react.useRef)(false);
  const fieldsRef = (0, _react.useRef)({});
  const errorsRef = (0, _react.useRef)({});
  const submitCountRef = (0, _react.useRef)(0);
  const touchedFieldsRef = (0, _react.useRef)(new Set());
  const watchFieldsRef = (0, _react.useRef)({});
  const isWatchAllRef = (0, _react.useRef)(false);
  const isSubmittingRef = (0, _react.useRef)(false);
  const isSubmittedRef = (0, _react.useRef)(false);
  const isDirtyRef = (0, _react.useRef)(false);
  const reRenderForm = (0, _react.useState)({})[1];
  const validateAndStateUpdateRef = (0, _react.useRef)();
  const {
    isOnChange,
    isOnBlur,
    isOnSubmit
  } = modeChecker(mode);
  const fieldsWithValidation = (0, _react.useRef)(new Set());
  const validFields = (0, _react.useRef)(new Set());

  const renderBaseOnError = (name, errors, error) => {
    if (errors[name] && !error[name]) {
      delete errorsRef.current[name];
      validFields.current.add(name);
      reRenderForm({});
      return true;
    } else if (error[name]) {
      validFields.current.delete(name);
      reRenderForm({});
      return true;
    }

    if (!isOnSubmit && !validFields.current.has(name)) {
      validFields.current.add(name);
      reRenderForm({});
    }

    return false;
  };

  const setValue = (name, value, shouldRender = true) => {
    const field = fieldsRef.current[name];
    if (!field) return;
    const ref = field.ref;
    const options = field.options;

    if (shouldRender) {
      touchedFieldsRef.current.add(name);
      isDirtyRef.current = true;
    }

    if (isRadioInput(ref.type) && options) {
      options.forEach(({
        ref: radioRef
      }) => {
        if (radioRef.value === value) radioRef.checked = true;
      });
      return;
    }

    ref[isCheckBoxInput(ref.type) ? 'checked' : 'value'] = value;
    if (shouldRender) reRenderForm({});
  };

  const isValidateDisabled = () => !isSubmittedRef.current && isOnSubmit;

  const triggerValidation = async ({
    name,
    value,
    forceValidation
  }) => {
    const field = fieldsRef.current[name];
    const errors = errorsRef.current;
    if (!field) return false;
    if (isValidateDisabled() && !forceValidation) return isEmptyObject(errors);
    if (value !== undefined) setValue(name, value);
    const error = await validateField(field, fieldsRef.current);
    errorsRef.current = Object.assign({}, filterUndefinedErrors(errorsRef.current), error);
    renderBaseOnError(name, errors, error);
    return isEmptyObject(error);
  };

  validateAndStateUpdateRef.current = validateAndStateUpdateRef.current ? validateAndStateUpdateRef.current : async ({
    target: {
      name
    },
    type
  }) => {
    if (Array.isArray(validationFields) && !validationFields.includes(name)) return;
    const fields = fieldsRef.current;
    const errors = errorsRef.current;
    const ref = fields[name];
    if (!ref) return;
    const isBlurType = type === 'blur';
    const validateDisabled = isValidateDisabled();
    const isWatchAll = isWatchAllRef.current;
    const shouldUpdateWatchMode = isWatchAll || watchFieldsRef.current[name];
    const shouldUpdateValidateMode = isOnChange || isOnBlur && isBlurType;
    let shouldUpdateState = shouldUpdateWatchMode;

    if (!isDirtyRef.current) {
      isDirtyRef.current = true;
      shouldUpdateState = true;
    }

    if (!touchedFieldsRef.current.has(name)) {
      touchedFieldsRef.current.add(name);
      shouldUpdateState = true;
    }

    if (validateDisabled && shouldUpdateWatchMode) return reRenderForm({});

    if (validationSchema) {
      const result = getFieldsValues(fields);
      const schemaValidateErrors = (await validateWithSchema(validationSchema, result)) || {};
      const error = schemaValidateErrors[name];
      const shouldUpdate = (!error && errors[name] || error) && shouldUpdateValidateMode;

      if (shouldUpdate || shouldUpdateWatchMode) {
        errorsRef.current = Object.assign({}, errors, {
          [name]: error
        });
        if (!error) delete errorsRef.current[name];
        return reRenderForm({});
      }
    } else {
      const error = await validateField(ref, fields, nativeValidation);
      const shouldUpdate = shouldUpdateWithError({
        errors,
        error,
        validateDisabled,
        isOnBlur,
        isBlurType,
        name
      });

      if (shouldUpdate || shouldUpdateValidateMode || shouldUpdateWatchMode) {
        errorsRef.current = Object.assign({}, filterUndefinedErrors(errors), error);
        if (renderBaseOnError(name, errorsRef.current, error)) return;
      }
    }

    if (shouldUpdateState) reRenderForm({});
  };
  const removeEventListener = findRemovedFieldAndRemoveListener.bind(null, fieldsRef.current, touchedFieldsRef, fieldsWithValidation, validateAndStateUpdateRef.current);

  const setError = (name, type, message, ref) => {
    const errors = errorsRef.current;
    const error = errors[name];
    const isSameError = error && error.type === type && error.message === message;

    if (!type && error) {
      delete errors[name];
      reRenderForm({});
    } else if (!isSameError) {
      errors[name] = {
        type,
        message,
        ref,
        isManual: true
      };
      reRenderForm({});
    }
  };

  const clearError = name => {
    setError(name);
  };

  function registerIntoFieldsRef(elementRef, data) {
    if (elementRef && !elementRef.name) return warnMissingRef(elementRef);
    const {
      name,
      type,
      value
    } = elementRef;

    if (!isOnSubmit && data && !isEmptyObject(data)) {
      fieldsWithValidation.current.add(name);
    }

    const {
      required = false,
      validate = undefined
    } = data || {};
    const inputData = Object.assign({}, data, {
      ref: elementRef
    });
    const fields = fieldsRef.current;
    const isRadio = isRadioInput(type);
    const field = fields[name];
    const existRadioOptionIndex = isRadio && field && Array.isArray(field.options) ? field.options.findIndex(({
      ref
    }) => value === ref.value) : -1;
    if (!isRadio && field || isRadio && existRadioOptionIndex > -1) return;

    if (!type) {
      fields[name] = Object.assign({
        ref: {
          name
        }
      }, data);
    } else {
      if (isRadio) {
        if (!field) fields[name] = {
          options: [],
          required,
          validate,
          ref: {
            type: 'radio',
            name
          }
        };
        if (validate) fields[name].validate = validate;
        (fields[name].options || []).push(Object.assign({}, inputData, {
          mutationWatcher: onDomRemove(elementRef, () => removeEventListener(inputData, true))
        }));
      } else {
        fields[name] = Object.assign({}, inputData, {
          mutationWatcher: onDomRemove(elementRef, () => removeEventListener(inputData, true))
        });
      }
    }

    if (defaultValues && defaultValues[name]) {
      setValue(name, defaultValues[name], false);
    }

    if (!type) {
      return;
    }

    const fieldData = isRadio ? (fields[name].options || [])[(fields[name].options || []).length - 1] : fields[name];
    if (!fieldData) return;

    if (nativeValidation && data) {
      attachNativeValidation(elementRef, data);
    } else {
      attachEventListeners({
        field: fieldData,
        isRadio,
        validateAndStateUpdate: validateAndStateUpdateRef.current
      });
    }
  }

  function watch(fieldNames, defaultValue) {
    const watchFields = watchFieldsRef.current;

    if (typeof fieldNames === 'string') {
      watchFields[fieldNames] = true;
    } else if (Array.isArray(fieldNames)) {
      fieldNames.forEach(name => {
        watchFields[name] = true;
      });
    } else {
      isWatchAllRef.current = true;
      watchFieldsRef.current = {};
    }

    const values = getFieldsValues(fieldsRef.current, fieldNames);
    const result = values === undefined || isEmptyObject(values) ? undefined : values;
    return result === undefined ? defaultValue : result;
  }

  const register = (0, _react.useCallback)((refOrValidateRule, validateRule) => {
    if (!refOrValidateRule || typeof window === 'undefined') return;

    if (validateRule && !refOrValidateRule.name) {
      warnMissingRef(refOrValidateRule);
      return;
    }

    if (refOrValidateRule.name) {
      registerIntoFieldsRef(refOrValidateRule, validateRule);
    }

    return ref => ref && registerIntoFieldsRef(ref, refOrValidateRule);
  }, []);

  const handleSubmit = callback => async e => {
    if (e && !nativeValidation) {
      e.preventDefault();
      e.persist();
    }

    let fieldErrors;
    let fieldValues;
    let firstFocusError = true;
    const fields = fieldsRef.current;
    const currentFieldValues = validationFields ? validationFields.map(name => fieldsRef.current[name]) : Object.values(fields);
    isSubmittingRef.current = true;
    reRenderForm({});

    if (validationSchema) {
      fieldValues = getFieldsValues(fields);
      fieldErrors = await validateWithSchema(validationSchema, fieldValues);
    } else {
      const {
        errors,
        values
      } = await currentFieldValues.reduce(async (previous, field) => {
        if (!field) return previous;
        const resolvedPrevious = await previous;
        const {
          ref,
          ref: {
            name
          }
        } = field;
        if (!fields[name]) return Promise.resolve(resolvedPrevious);
        const fieldError = await validateField(field, fields, nativeValidation);

        if (fieldError[name]) {
          if (submitFocusError && firstFocusError && ref.focus) {
            ref.focus();
            firstFocusError = false;
          }

          resolvedPrevious.errors = Object.assign({}, resolvedPrevious.errors || {}, fieldError);
          return Promise.resolve(resolvedPrevious);
        }

        resolvedPrevious.values[name] = getFieldValue(fields, ref);
        return Promise.resolve(resolvedPrevious);
      }, Promise.resolve({
        errors: {},
        values: {}
      }));
      fieldErrors = Object.assign({}, errors, nativeValidation ? {} : filterUndefinedErrors(errorsRef.current));
      fieldValues = values;
    }

    if (isEmptyObject(fieldErrors)) {
      await callback(combineFieldValues(fieldValues), e);
    } else {
      errorsRef.current = fieldErrors;
    }

    if (unMount.current) return;
    isSubmittedRef.current = true;
    submitCountRef.current += 1;
    isSubmittingRef.current = false;
    reRenderForm({});
  };

  const resetRefs = () => {
    watchFieldsRef.current = {};
    errorsRef.current = {};
    isWatchAllRef.current = false;
    isSubmittedRef.current = false;
    isDirtyRef.current = false;
    touchedFieldsRef.current = new Set();
    fieldsWithValidation.current = new Set();
    validFields.current = new Set();
    submitCountRef.current = 0;
  };

  const unSubscribe = () => {
    fieldsRef.current && Object.values(fieldsRef.current).forEach(field => {
      if (!field) return;
      const {
        ref,
        options
      } = field;
      isRadioInput(ref.type) && Array.isArray(options) ? options.forEach(fieldRef => removeEventListener(fieldRef, true)) : removeEventListener(field, true);
    });
    fieldsRef.current = {};
    resetRefs();
  };

  const reset = () => {
    try {
      // @ts-ignore
      Object.values(fieldsRef.current)[0].ref.closest('form').reset();
    } catch (_a) {
      console.warn(`⚠ Form element not found`);
    }

    resetRefs();
    reRenderForm({});
  };

  const getValues = () => getFieldsValues(fieldsRef.current);

  (0, _react.useEffect)(() => {
    return () => {
      unMount.current = true;
      unSubscribe();
    };
  }, [mode, unMount.current]);
  return {
    register,
    handleSubmit,
    watch,
    unSubscribe,
    reset,
    clearError,
    setError,
    setValue,
    triggerValidation,
    getValues,
    errors: errorsRef.current,
    formState: Object.assign({
      dirty: isDirtyRef.current,
      isSubmitted: isSubmittedRef.current,
      submitCount: submitCountRef.current,
      // @ts-ignore
      touched: [...touchedFieldsRef.current],
      isSubmitting: isSubmittingRef.current
    }, isOnSubmit ? {
      isValid: isEmptyObject(errorsRef.current)
    } : {
      isValid: fieldsWithValidation.current.size ? !isEmptyObject(fieldsRef.current) && validFields.current.size >= fieldsWithValidation.current.size : !isEmptyObject(fieldsRef.current)
    })
  };
}
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */


function __rest(s, e) {
  var t = {};

  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0) t[p[i]] = s[p[i]];
  return t;
}

const FormGlobalContext = (0, _react.createContext)({});

const useFormContext = () => (0, _react.useContext)(FormGlobalContext);

exports.useFormContext = useFormContext;

function FormContext(props) {
  const {
    children
  } = props,
        rest = __rest(props, ["children"]);

  return (0, _react.createElement)(FormGlobalContext.Provider, {
    value: Object.assign({}, rest),
    children: children
  });
}

var _default = useForm;
exports.default = _default;
},{"react":"../node_modules/react/index.js"}],"Components/LoginForm/LOGIN.graphql":[function(require,module,exports) {
module.exports = {
  "kind": "Document",
  "definitions": [{
    "kind": "OperationDefinition",
    "operation": "mutation",
    "name": {
      "kind": "Name",
      "value": "login"
    },
    "variableDefinitions": [{
      "kind": "VariableDefinition",
      "variable": {
        "kind": "Variable",
        "name": {
          "kind": "Name",
          "value": "Username"
        }
      },
      "type": {
        "kind": "NonNullType",
        "type": {
          "kind": "NamedType",
          "name": {
            "kind": "Name",
            "value": "String"
          }
        }
      },
      "directives": []
    }, {
      "kind": "VariableDefinition",
      "variable": {
        "kind": "Variable",
        "name": {
          "kind": "Name",
          "value": "Password"
        }
      },
      "type": {
        "kind": "NonNullType",
        "type": {
          "kind": "NamedType",
          "name": {
            "kind": "Name",
            "value": "String"
          }
        }
      },
      "directives": []
    }],
    "directives": [],
    "selectionSet": {
      "kind": "SelectionSet",
      "selections": [{
        "kind": "Field",
        "name": {
          "kind": "Name",
          "value": "loginUser"
        },
        "arguments": [{
          "kind": "Argument",
          "name": {
            "kind": "Name",
            "value": "username"
          },
          "value": {
            "kind": "Variable",
            "name": {
              "kind": "Name",
              "value": "Username"
            }
          }
        }, {
          "kind": "Argument",
          "name": {
            "kind": "Name",
            "value": "password"
          },
          "value": {
            "kind": "Variable",
            "name": {
              "kind": "Name",
              "value": "Password"
            }
          }
        }],
        "directives": [],
        "selectionSet": {
          "kind": "SelectionSet",
          "selections": [{
            "kind": "Field",
            "name": {
              "kind": "Name",
              "value": "success"
            },
            "arguments": [],
            "directives": []
          }, {
            "kind": "Field",
            "name": {
              "kind": "Name",
              "value": "token"
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
    "end": 116
  }
};
},{}],"Components/LoginForm/Styles.tsx":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MainStyle = exports.FormStyle = exports.FieldStyle = void 0;
const FieldStyle = {
  marginTop: '1em',
  width: '80%'
};
exports.FieldStyle = FieldStyle;
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
const MainStyle = {
  justifyContent: 'center',
  flex: '1 1 auto',
  display: 'flex',
  alignItems: 'center',
  willChange: 'margin-left',
  height: '100%'
};
exports.MainStyle = MainStyle;
},{}],"Components/LoginForm/index.tsx":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoginForm = void 0;

require("@material/button/dist/mdc.button.min.css");

require("@material/floating-label/dist/mdc.floating-label.min.css");

require("@material/line-ripple/dist/mdc.line-ripple.min.css");

require("@material/notched-outline/dist/mdc.notched-outline.min.css");

require("@material/textfield/dist/mdc.textfield.min.css");

require("@material/typography/dist/mdc.typography.min.css");

var _button = require("@rmwc/button");

var _textfield = require("@rmwc/textfield");

var _typography = require("@rmwc/typography");

var _react = _interopRequireWildcard(require("react"));

var _jsCookie = _interopRequireDefault(require("js-cookie"));

var _reactHookForm = _interopRequireDefault(require("react-hook-form"));

var _reactHooks = require("@apollo/react-hooks");

var _LOGIN = _interopRequireDefault(require("./LOGIN.graphql"));

var _router = require("@reach/router");

var _Styles = require("./Styles");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

const AuthError = `GraphQL error: Access denied! You don't have permission for this action!`;

const LoginForm = () => {
  const [loginUser, {
    error
  }] = (0, _reactHooks.useMutation)(_LOGIN.default, {
    errorPolicy: 'all'
  });
  const {
    register,
    handleSubmit
  } = (0, _reactHookForm.default)();
  const [invalid, setInvalid] = (0, _react.useState)({
    field: undefined,
    message: undefined
  });

  const onSubmit = async variables => {
    try {
      const response = await loginUser({
        variables
      });

      if (response && response.data) {
        if (response.data.loginUser.sucess === false) console.log(response);else {
          _jsCookie.default.set('token', response.data.loginUser.token, {
            expires: 30
          });

          (0, _router.navigate)('/');
        }
      } else console.error('Token not recieved');
    } catch (e) {}
  };

  (0, _react.useEffect)(() => {
    if (typeof error !== 'undefined') {
      if (error.message === AuthError) setInvalid({
        field: 'Password',
        message: 'Password is Invalid'
      });else if (error.graphQLErrors[0].extensions && error.graphQLErrors[0].extensions.code === 'INVALID_USER') setInvalid({
        field: 'Username',
        message: 'Username is invalid'
      });
    }
  }, [error]);
  return _react.default.createElement("div", {
    style: _Styles.MainStyle
  }, _react.default.createElement("form", {
    onSubmit: handleSubmit(onSubmit),
    style: _Styles.FormStyle
  }, _react.default.createElement(_typography.Typography, {
    use: 'headline4'
  }, "Login"), invalid.field && _react.default.createElement(_textfield.TextFieldHelperText, {
    persistent: true,
    validationMsg: true,
    style: {
      color: 'var(--mdc-theme-error, #b00020)'
    }
  }, invalid.message), _react.default.createElement(_textfield.TextField, {
    outlined: true,
    invalid: invalid.field === 'Username',
    label: 'Username',
    name: 'Username',
    autoComplete: 'username',
    style: _Styles.FieldStyle,
    inputRef: register
  }), _react.default.createElement(_textfield.TextField, {
    outlined: true,
    invalid: invalid.field === 'Password',
    label: 'Password',
    name: 'Password',
    type: 'password',
    autoComplete: 'current-password',
    style: _Styles.FieldStyle,
    inputRef: register
  }), _react.default.createElement(_button.Button, {
    raised: true,
    label: 'Submit',
    style: _Styles.FieldStyle,
    type: 'submit'
  })));
};

exports.LoginForm = LoginForm;
},{"@material/button/dist/mdc.button.min.css":"../node_modules/@material/button/dist/mdc.button.min.css","@material/floating-label/dist/mdc.floating-label.min.css":"../node_modules/@material/button/dist/mdc.button.min.css","@material/line-ripple/dist/mdc.line-ripple.min.css":"../node_modules/@material/button/dist/mdc.button.min.css","@material/notched-outline/dist/mdc.notched-outline.min.css":"../node_modules/@material/button/dist/mdc.button.min.css","@material/textfield/dist/mdc.textfield.min.css":"../node_modules/@material/button/dist/mdc.button.min.css","@material/typography/dist/mdc.typography.min.css":"../node_modules/@material/button/dist/mdc.button.min.css","@rmwc/button":"../node_modules/@rmwc/button/next/index.js","@rmwc/textfield":"../node_modules/@rmwc/textfield/next/index.js","@rmwc/typography":"../node_modules/@rmwc/typography/next/index.js","react":"../node_modules/react/index.js","js-cookie":"../node_modules/js-cookie/src/js.cookie.js","react-hook-form":"../node_modules/react-hook-form/dist/react-hook-form.es.js","@apollo/react-hooks":"../node_modules/@apollo/react-hooks/lib/react-hooks.esm.js","./LOGIN.graphql":"Components/LoginForm/LOGIN.graphql","@reach/router":"../node_modules/@reach/router/es/index.js","./Styles":"Components/LoginForm/Styles.tsx"}],"routes/Authenication/index.tsx":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _LoginForm = require("~Components/LoginForm");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// UI/ui/routes/Authenication/index.tsx
const LoginFormRoute = () => _react.default.createElement(_LoginForm.LoginForm, null);

var _default = LoginFormRoute;
exports.default = _default;
},{"react":"../node_modules/react/index.js","~Components/LoginForm":"Components/LoginForm/index.tsx"}]},{},[], null)