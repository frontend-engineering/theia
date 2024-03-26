"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SampleMenuContribution = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const resource_grid_model_1 = require("./resource/resource-grid-model");
let SampleMenuContribution = class SampleMenuContribution {
    registerMenus(registry) {
        registry.registerMenuAction(resource_grid_model_1.ResourceGridModel.CONTEXT_MENU, { commandId: resource_grid_model_1.GridCellCommand.id, label: resource_grid_model_1.GridCellCommand.label });
    }
};
exports.SampleMenuContribution = SampleMenuContribution;
exports.SampleMenuContribution = SampleMenuContribution = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], SampleMenuContribution);
//# sourceMappingURL=sample-menu-contribution.js.map