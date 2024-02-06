export const PrismaClientSymbol = Symbol('PrismaClient');
/**
 * getServices 方法会将 inversify module 转换成 nestjs module，这样 nestjs controller 就可以使用了
 * 所以，注意：如果不需要给 controller 使用，则不需要 bind
 */
export const ServiceSymbol = Symbol('Service');
export const APISymbol = Symbol('API');
export const URLSymbol = Symbol.for('URL');
export const ENVSymbol = Symbol.for('ENV');
export const PrismaZodSchemaSymbol = Symbol.for('PrismaZodSchema');
export const CustomZodSchemaSymbol = Symbol.for('CustomZodSchema');
export const K3CloudIdentifyInfoSymbol = Symbol.for('K3CloudIdentifyInfo');
export const COSSymbol = Symbol('COS');
//# sourceMappingURL=types.js.map