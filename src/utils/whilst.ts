

/**
 * Repeatedly call fn, while test returns true. Calls callback when stopped, or an error occurs.
 *
 * @param {Function} test Synchronous truth test to perform before each execution of fn.
 * @param {Function} fn A function which is called each time test passes. The function is passed a callback(err), which must be called once it has completed with an optional err argument.
 * @param {Function} callback A callback which is called after the test fails and repeated execution of fn has stopped.
 */

 type TSFixMe = any;

export default function whilst(this: TSFixMe, test:((args: TSFixMe[]) => boolean), iterator: TSFixMe, callback: TSFixMe) {
    if (test) {
        iterator(function next(this: any, err:TSFixMe, ...args:TSFixMe[]) {
            if (err) {
                callback(err);
            } else if (test(args)) {
                iterator(next);
            } else {
                callback(null);
            }
        });
    } else {
        callback(null);
    }
}
