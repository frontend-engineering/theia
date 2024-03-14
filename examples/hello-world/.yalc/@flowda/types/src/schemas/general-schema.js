"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginOutputSchemaDto = exports.loginOutputSchema = exports.loginInputSchemaDto = exports.loginInputSchema = void 0;
const zod_1 = require("zod");
const zod_utils_1 = require("../utils/zod-utils");
exports.loginInputSchema = zod_1.z.object({
    username: zod_1.z.string(),
    password: zod_1.z.string().min(4),
});
class loginInputSchemaDto extends (0, zod_utils_1.createZodDto)(exports.loginInputSchema) {
}
exports.loginInputSchemaDto = loginInputSchemaDto;
exports.loginOutputSchema = zod_1.z.object({
    at: zod_1.z.object({
        token: zod_1.z.string()
    })
});
class loginOutputSchemaDto extends (0, zod_utils_1.createZodDto)(exports.loginOutputSchema) {
}
exports.loginOutputSchemaDto = loginOutputSchemaDto;
//# sourceMappingURL=general-schema.js.map