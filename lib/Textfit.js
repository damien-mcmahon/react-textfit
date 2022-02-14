"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Textfit = void 0;

var _react = _interopRequireWildcard(require("react"));

var _series = _interopRequireDefault(require("./utils/series"));

var _whilst = _interopRequireDefault(require("./utils/whilst"));

var _throttle = _interopRequireDefault(require("./utils/throttle"));

var _uniqueId = _interopRequireDefault(require("./utils/uniqueId"));

var _innerSize = require("./utils/innerSize");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var assertElementFitsWidth = function assertElementFitsWidth(el, width) {
  return el.scrollWidth - 1 <= width;
};

var assertElementFitsHeight = function assertElementFitsHeight(el, height) {
  return el.scrollHeight - 1 <= height;
}; // function noop() {}


var Textfit = function Textfit(props) {
  var autoResize = props.autoResize,
      throttleMs = props.throttle,
      mode = props.mode,
      max = props.max,
      style = props.style,
      children = props.children,
      text = props.text;
  var elementRef = (0, _react.useRef)(null);
  var wrapperRef = (0, _react.useRef)(null);

  var _useState = (0, _react.useState)(max),
      _useState2 = _slicedToArray(_useState, 2),
      fontSize = _useState2[0],
      setFontSize = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      ready = _useState4[0],
      setReady = _useState4[1];

  var _useState5 = (0, _react.useState)((0, _uniqueId["default"])()),
      _useState6 = _slicedToArray(_useState5, 2),
      pidRef = _useState6[0],
      setPidRef = _useState6[1];

  var process = function process() {
    var min = props.min,
        max = props.max,
        mode = props.mode,
        forceSingleModeWidth = props.forceSingleModeWidth,
        onReady = props.onReady;
    var originalWidth = (0, _innerSize.innerWidth)(elementRef);
    var originalHeight = (0, _innerSize.innerHeight)(elementRef);

    if (originalHeight <= 0 || isNaN(originalHeight)) {
      console.warn('Can not process element without height. Make sure the element is displayed and has a static height.');
      return;
    }

    if (originalWidth <= 0 || isNaN(originalWidth)) {
      console.warn('Can not process element without width. Make sure the element is displayed and has a static width.');
      return;
    }

    var pid = (0, _uniqueId["default"])();

    var shouldCancelProcess = function shouldCancelProcess() {
      return pid !== pidRef;
    };

    var testPrimary = mode === 'multi' ? function () {
      return assertElementFitsHeight(wrapperRef, originalHeight);
    } : function () {
      return assertElementFitsWidth(wrapperRef, originalWidth);
    };
    var testSecondary = mode === 'multi' ? function () {
      return assertElementFitsWidth(wrapperRef, originalWidth);
    } : function () {
      return assertElementFitsHeight(wrapperRef, originalHeight);
    };
    var mid;
    var low = min;
    var high = max;
    setReady(false);
    (0, _series["default"])([// Step 1:
    // Binary search to fit the element's height (multi line) / width (single line)
    function (stepCallback) {
      return (0, _whilst["default"])(function () {
        return low <= high;
      }, function (whilstCallback) {
        if (shouldCancelProcess()) {
          return whilstCallback(true);
        }

        mid = (low + high) / 2;
        setFontSize(mid);

        if (shouldCancelProcess()) {
          return whilstCallback(true);
        }

        if (testPrimary()) {
          low = mid + 1;
        } else {
          high = mid - 1;
        }

        return whilstCallback();
      }, stepCallback);
    }, // Step 2:
    // Binary search to fit the element's width (multi line) / height (single line)
    // If mode is single and forceSingleModeWidth is true, skip this step
    // in order to not fit the elements height and decrease the width
    function (stepCallback) {
      if (mode === 'single' && forceSingleModeWidth) return stepCallback();
      if (testSecondary()) return stepCallback();
      low = min;
      high = mid;
      return (0, _whilst["default"])(function () {
        return low < high;
      }, function (whilstCallback) {
        if (shouldCancelProcess()) return whilstCallback(true);
        mid = (low + high) / 2;
        setFontSize(mid);

        if (pid !== pidRef) {
          return whilstCallback(true);
        }

        if (testSecondary()) {
          low = mid + 1;
        } else {
          high = mid - 1;
        }

        return whilstCallback();
      }, stepCallback);
    }, // Step 3
    // Limits
    function (stepCallback) {
      // We break the previous loop without updating mid for the final time,
      // so we do it here:
      mid = Math.min(low, high); // Ensure we hit the user-supplied limits

      mid = Math.max(mid, min);
      mid = Math.min(mid, max); // Sanity check:

      mid = Math.max(mid, 0);

      if (shouldCancelProcess()) {
        return stepCallback(true);
      }

      setFontSize(mid), stepCallback;
    }], function (err) {
      // err will be true, if another process was triggered
      if (err || shouldCancelProcess()) return;
      setReady(true);
      onReady(mid);
    });
  };

  var throttledResize = (0, _throttle["default"])(process, throttleMs);
  (0, _react.useEffect)(function () {
    if (autoResize) {
      window.addEventListener('resize', throttledResize);
    }

    return function cleanup() {
      if (autoResize) {
        window.removeEventListener('resize', throttledResize);
      } // Setting a new pid will cancel all running processes


      setPidRef((0, _uniqueId["default"])());
    };
  });

  var finalStyle = _objectSpread(_objectSpread({}, style), {}, {
    fontSize: fontSize
  });

  var wrapperStyle = {
    display: ready ? 'block' : 'inline-block',
    'whitespace': 'wrap'
  };
  if (mode === 'single') wrapperStyle['whitespace'] = 'nowrap';
  return /*#__PURE__*/_react["default"].createElement("div", _extends({
    ref: elementRef,
    style: finalStyle
  }, props), /*#__PURE__*/_react["default"].createElement("div", {
    ref: wrapperRef,
    style: wrapperStyle
  }, text && typeof children === 'function' ? ready ? children(text) : text : children));
};

exports.Textfit = Textfit;