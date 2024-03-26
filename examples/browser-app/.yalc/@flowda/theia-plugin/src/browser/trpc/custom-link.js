"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customLink = void 0;
const tslib_1 = require("tslib");
const observable_1 = require("@trpc/server/observable");
const customLink = opts => {
    // here we just got initialized in the app - this happens once per app
    // useful for storing cache for instance
    return () => ({ next, op }) => {
        // this is when passing the result to the next link
        // each link needs to return an observable which propagates results
        return (0, observable_1.observable)(observer => {
            // console.log('performing operation:', op)
            const unsubscribe = next(op).subscribe({
                next(value) {
                    // console.log('we received value', value)
                    observer.next(value);
                },
                error(err) {
                    return tslib_1.__awaiter(this, void 0, void 0, function* () {
                        if (err.data && err.data.code === 'UNAUTHORIZED') {
                            localStorage.removeItem('access_token');
                            yield opts.commandRegistry.executeCommand('command.hello.login');
                        }
                        // console.log('we received error', err)
                        observer.error(err);
                    });
                },
                complete() {
                    observer.complete();
                },
            });
            return unsubscribe;
        });
    };
};
exports.customLink = customLink;
//# sourceMappingURL=custom-link.js.map