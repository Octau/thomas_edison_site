import typography from 'common/styles/typography';
import { globalStyle, style } from 'styles';

export const selectStyles = style({});
export const noMarginSelect = style({});

globalStyle(`${selectStyles} .mantine-Select-label`, {
  ...typography.BodyBoldDefault,
});

globalStyle(`${selectStyles} .mantine-Select-description`, {
  marginTop: 4,
  marginBottom: 4,
  ...typography.BodySmaller,
});

globalStyle(`${selectStyles} .mantine-Select-error`, {
  marginTop: 4,
  marginBottom: 4,
});

globalStyle(`${selectStyles} .mantine-Select-input`, {
  ...typography.BodyDefault,
  marginBottom: 16,
});
globalStyle(`${noMarginSelect}  .mantine-Select-input`, {
  marginBottom: '0px !important',
});
