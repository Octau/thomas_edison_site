import typography from 'common/styles/typography';
import { globalStyle, style } from 'styles';

export const datePickerStyles = style({});

globalStyle(`${datePickerStyles} .mantine-DatePickerInput-label`, {
  ...typography.BodyBoldDefault,
});

globalStyle(`${datePickerStyles} table`, {
  width: 'auto',
});

globalStyle(`${datePickerStyles} .mantine-DatePickerInput-description`, {
  marginTop: 4,
  marginBottom: 4,
  ...typography.BodySmaller,
});

globalStyle(`${datePickerStyles} .mantine-DatePickerInput-error`, {
  marginTop: 4,
  marginBottom: 4,
});

globalStyle(`${datePickerStyles} .mantine-DatePickerInput-input`, {
  ...typography.BodyDefault,
});

globalStyle(`${datePickerStyles} .mantine-DatePickerInput-weekdayCell`, {
  borderBottom: 'none',
});

globalStyle(`${datePickerStyles} .mantine-DatePickerInput-cell`, {
  padding: '0',
  borderBottom: 'none',
});
