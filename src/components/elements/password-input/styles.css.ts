import typography from 'common/styles/typography';
import { globalStyle, style } from 'styles';

export const passwordInputStyles = style({});

globalStyle(`${passwordInputStyles} .mantine-PasswordInput-label`, {
  ...typography.BodyBoldDefault,
});

globalStyle(`${passwordInputStyles} .mantine-PasswordInput-description`, {
  marginTop: 4,
  marginBottom: 4,
});

globalStyle(`${passwordInputStyles} .mantine-PasswordInput-error`, {
  marginTop: 4,
  marginBottom: 4,
});

globalStyle(`${passwordInputStyles} .mantine-PasswordInput-input>input`, {
  ...typography.BodyDefault,
});
