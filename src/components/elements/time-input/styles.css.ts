import typography from 'common/styles/typography';
import { globalStyle, style } from 'styles';

export const timeInputStyles = style({});

globalStyle(`${timeInputStyles} .mantine-TimeInput-label`, {
  ...typography.BodyBoldDefault,
});

globalStyle(`${timeInputStyles} .mantine-TimeInput-description`, {
  marginTop: 4,
  marginBottom: 4,
  ...typography.BodySmaller,
});

globalStyle(`${timeInputStyles} .mantine-TimeInput-error`, {
  marginTop: 4,
  marginBottom: 4,
});

globalStyle(`${timeInputStyles} .mantine-TimeInput-input`, {
  ...typography.BodyDefault,
});
