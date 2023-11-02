import typography from 'common/styles/typography';
import { globalStyle, style } from 'styles';

export const multiSelectStyles = style({});

globalStyle(`${multiSelectStyles} .mantine-MultiSelect-label`, {
  ...typography.BodyBoldDefault,
});

globalStyle(`${multiSelectStyles} .mantine-MultiSelect-description`, {
  marginTop: 4,
  marginBottom: 4,
});

globalStyle(`${multiSelectStyles} .mantine-MultiSelect-error`, {
  marginTop: 4,
  marginBottom: 4,
});

globalStyle(`${multiSelectStyles} .mantine-MultiSelect-input`, {
  ...typography.BodyDefault,
});
