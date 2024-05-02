"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const types_1 = require("@flowda/types");
const wfCfgs = [
    {
        taskDefinitionKey: 'Activity_1yyz484',
        resource: {
            schemaName: 'ycdev.CustomerOrderResourceSchema',
            inputMap: {
                /* resource where */ number: /* global vars */ 'businessKey',
            },
            columns: [
                {
                    name: 'number',
                    access_type: 'read_only',
                },
                {
                    name: 'customerCode',
                    access_type: 'read_only',
                },
                {
                    name: 'contract',
                    access_type: 'read_write',
                },
            ],
        },
    },
];
exports.default = new inversify_1.ContainerModule((bind, unbind, isBound, rebind) => {
    //
    bind(types_1.WorkflowConfigSymbol).toConstantValue(wfCfgs);
});
//# sourceMappingURL=frontend-module.js.map