"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelloKeybindingRegistry = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const browser_1 = require("@theia/core/lib/browser");
let HelloKeybindingRegistry = class HelloKeybindingRegistry extends browser_1.KeybindingRegistry {
    run(event) {
        if (event.target.classList.toString().indexOf('eui') > -1) {
            return;
        }
        super.run(event);
    }
};
exports.HelloKeybindingRegistry = HelloKeybindingRegistry;
exports.HelloKeybindingRegistry = HelloKeybindingRegistry = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], HelloKeybindingRegistry);
//# sourceMappingURL=hello-keybinding.js.map