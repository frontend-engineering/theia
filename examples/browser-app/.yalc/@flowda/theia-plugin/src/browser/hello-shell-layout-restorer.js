"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelloShellLayoutRestorer = void 0;
const tslib_1 = require("tslib");
const browser_1 = require("@theia/core/lib/browser");
/**
 * 覆写 convertToWidget 确保 'files', 'explorer-view-container' 不要 restore
 * 方便调试
 */
class HelloShellLayoutRestorer extends browser_1.ShellLayoutRestorer {
    convertToWidget(desc, context) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!desc.constructionOptions) {
                return undefined;
            }
            // if ([
            //     'files', 'explorer-view-container',
            // ].indexOf(desc.constructionOptions.factoryId) > -1) {
            //     console.warn(`Not restoreState, ${desc.constructionOptions.factoryId}`)
            //     return undefined
            // }
            try {
                desc = yield this.fireWillInflateWidget(desc, context);
                const widget = yield this.widgetManager.getOrCreateWidget(desc.constructionOptions.factoryId, desc.constructionOptions.options);
                if (browser_1.StatefulWidget.is(widget) && desc.innerWidgetState !== undefined) {
                    try {
                        let oldState;
                        if (typeof desc.innerWidgetState === 'string') {
                            const parseContext = new browser_1.ShellLayoutRestorer.ParseContext();
                            oldState = this.parse(desc.innerWidgetState, parseContext);
                            yield parseContext.inflate(Object.assign(Object.assign({}, context), { parent: widget }));
                        }
                        else {
                            oldState = desc.innerWidgetState;
                        }
                        widget.restoreState(oldState);
                    }
                    catch (e) {
                        if (e instanceof Error && browser_1.ApplicationShellLayoutMigrationError.is(e)) {
                            throw e;
                        }
                        this.logger.warn(`Couldn't restore widget state for ${widget.id}. Error: ${e} `);
                    }
                }
                if (widget.isDisposed) {
                    return undefined;
                }
                return widget;
            }
            catch (e) {
                if (e instanceof Error && browser_1.ApplicationShellLayoutMigrationError.is(e)) {
                    throw e;
                }
                this.logger.warn(`Couldn't restore widget for ${desc.constructionOptions.factoryId}. Error: ${e} `);
                return undefined;
            }
        });
    }
}
exports.HelloShellLayoutRestorer = HelloShellLayoutRestorer;
//# sourceMappingURL=hello-shell-layout-restorer.js.map