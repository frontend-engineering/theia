import { EUI_DARK_COLORS, EUI_LIGHT_COLORS } from './theme.model';
export function getBtnTextColor(colorMode, disabled) {
    return colorMode === 'light'
        ? disabled
            ? EUI_LIGHT_COLORS.disabledText
            : EUI_LIGHT_COLORS.text
        : disabled
            ? EUI_DARK_COLORS.disabledText
            : EUI_DARK_COLORS.text;
}
//# sourceMappingURL=theme-utils.js.map