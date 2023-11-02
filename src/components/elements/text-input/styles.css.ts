import typography from 'common/styles/typography';
import { globalStyle, style } from 'styles';

export const textInputStyles = style({});

globalStyle(`${textInputStyles} .mantine-TextInput-label`, {
  ...typography.BodyBoldDefault,
});

globalStyle(`${textInputStyles} .mantine-TextInput-description`, {
  marginTop: 4,
  marginBottom: 4,
  ...typography.BodySmaller,
});

globalStyle(`${textInputStyles} .mantine-TextInput-error`, {
  marginTop: 4,
  marginBottom: 4,
});

globalStyle(`${textInputStyles} .mantine-TextInput-input`, {
  ...typography.BodyDefault,
});
