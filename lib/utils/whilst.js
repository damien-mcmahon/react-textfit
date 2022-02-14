var noop = function noop() {};
/**
 * Repeatedly call fn, while test returns true. Calls callback when stopped, or an error occurs.
 *
 * @param {Function} test Synchronous truth test to perform before each execution of fn.
 * @param {Function} fn A function which is called each time test passes. The function is passed a callback(err), which must be called once it has completed with an optional err argument.
 * @param {Function} callback A callback which is called after the test fails and repeated execution of fn has stopped.
 */


export default function whilst(test, iterator) {
  var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : noop;

  if (test()) {
    iterator(function next(err) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      if (err) {
        callback(err);
      } else if (test.apply(this, args)) {
        iterator(next);
      } else {
        callback(null);
      }
    });
  } else {
    callback(null);
  }
}