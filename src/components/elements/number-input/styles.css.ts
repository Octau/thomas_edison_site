import typography from 'common/styles/typography';
import { globalStyle, style } from 'styles';

export const numberInputStyles = style({});

globalStyle(`${numberInputStyles} .mantine-NumberInput-label`, {
  ...typography.BodyBoldDefault,
});

globalStyle(`${numberInputStyles} .mantine-NumberInput-description`, {
  marginTop: 4,
  marginBottom: 4,
});

globalStyle(`${numberInputStyles} .mantine-NumberInput-error`, {
  marginTop: 4,
  marginBottom: 4,
});

globalStyle(`${numberInputStyles} .mantine-NumberInput-input`, {
  ...typography.BodyDefault,
});
