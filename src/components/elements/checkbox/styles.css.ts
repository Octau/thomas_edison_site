import typography from 'common/styles/typography';
import { globalStyle, style } from 'styles';

export const checkboxStyles = style({});

export const marginBottom = style({
  marginBottom: 16,
});
globalStyle(`${checkboxStyles} .mantine-Checkbox-label`, {
  ...typography.BodyDefault,
});
