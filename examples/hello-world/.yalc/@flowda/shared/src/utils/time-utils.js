"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shortenDatetime = void 0;
const tslib_1 = require("tslib");
const dayjs_1 = tslib_1.__importDefault(require("dayjs"));
function shortenDatetime(text) {
    if (!(0, dayjs_1.default)(text).isValid())
        return text;
    let shortFormat;
    if ((0, dayjs_1.default)(text).isSame((0, dayjs_1.default)(), 'year')) {
        shortFormat = 'MM-DD HH:mm';
    }
    else {
        shortFormat = 'YY-MM-DD HH:mm';
    }
    return (0, dayjs_1.default)(text).format(shortFormat);
}
exports.shortenDatetime = shortenDatetime;
//# sourceMappingURL=time-utils.js.map