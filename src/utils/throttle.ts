/**
 * Returns a new function that, when invoked, invokes `func` at most once per `wait` milliseconds.
 * Taken from https://github.com/component/throttle v1.0.0
 *
 * @param {Function} func Function to wrap.
 * @param {Number} wait Number of milliseconds that must elapse between `func` invocations.
 * @return {Function} A new function that wraps the `func` function passed in.
 */

type TSFixMe = any;

export default function throttle(func: TSFixMe, wait: TSFixMe) {
    let ctx : TSFixMe;
    let args: TSFixMe;
    let rtn: TSFixMe;
    let timeoutID :TSFixMe;
    let last = 0;

    function call() {
        timeoutID = 0;
        last = +new Date();
        rtn = func.apply(ctx, args);
        ctx = null;
        args = null;
    }

    return function throttled(this:TSFixMe, ...args: TSFixMe[]) {
        ctx = this;
        const delta: number = (new Date() as unknown as number) - last;
        if (!timeoutID) {
            if (delta >= wait) call();
            else timeoutID = setTimeout(call, wait - delta);
        }
        return rtn;
    };
}
