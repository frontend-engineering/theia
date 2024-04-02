import dayjs from 'dayjs';
export function shortenDatetime(text) {
    if (!dayjs(text).isValid())
        return text;
    let shortFormat;
    if (dayjs(text).isSame(dayjs(), 'year')) {
        shortFormat = 'MM-DD HH:mm';
    }
    else {
        shortFormat = 'YY-MM-DD HH:mm';
    }
    return dayjs(text).format(shortFormat);
}
//# sourceMappingURL=time-utils.js.map