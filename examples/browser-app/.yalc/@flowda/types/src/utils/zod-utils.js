"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createZodDto = void 0;
function createZodDto(schema) {
    class AugmentedZodDto {
        static create(input) {
            return this.schema.parse(input);
        }
    }
    AugmentedZodDto.isZodDto = true;
    AugmentedZodDto.schema = schema;
    return AugmentedZodDto;
}
exports.createZodDto = createZodDto;
//# sourceMappingURL=zod-utils.js.map