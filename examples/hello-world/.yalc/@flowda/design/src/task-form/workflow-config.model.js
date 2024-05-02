import { __decorate } from "tslib";
import { injectable } from "inversify";
import { wfCfgs } from "./__stories__/data";
let WorkflowConfigModel = class WorkflowConfigModel {
    setWfCfgs(wfCfgs) {
        this._wfCfgs = wfCfgs;
    }
    get wfCfgs() {
        if (!this._wfCfgs) {
            // throw new Error(`wfCfgs is undef, set first`)
            this._wfCfgs = wfCfgs;
        }
        return this._wfCfgs;
    }
    getWfCfg(taskDefinitionKey) {
        const ret = this.wfCfgs.find(cfg => cfg.taskDefinitionKey === taskDefinitionKey);
        if (!ret)
            throw new Error(`not found workflow config, taskDefinitionKey:${taskDefinitionKey}`);
        return ret;
    }
};
WorkflowConfigModel = __decorate([
    injectable()
], WorkflowConfigModel);
export { WorkflowConfigModel };
//# sourceMappingURL=workflow-config.model.js.map