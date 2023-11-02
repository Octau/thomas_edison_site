import typography from 'common/styles/typography';
import { globalStyle, style } from 'styles';

export const dateRangePickerStyles = style({});

globalStyle(`${dateRangePickerStyles} .mantine-DatePickerInput-label`, {
  ...typography.BodyBoldDefault,
});

globalStyle(`${dateRangePickerStyles} table`, {
  width: 'auto',
});

globalStyle(`${dateRangePickerStyles} .mantine-DatePickerInput-description`, {
  marginTop: 4,
  marginBottom: 4,
  ...typography.BodySmaller,
});

globalStyle(`${dateRangePickerStyles} .mantine-DatePickerInput-error`, {
  marginTop: 4,
  marginBottom: 4,
});

globalStyle(`${dateRangePickerStyles} .mantine-DatePickerInput-input`, {
  ...typography.BodyDefault,
});

globalStyle(`${dateRangePickerStyles} .mantine-DatePickerInput-weekdayCell`, {
  borderBottom: 'none',
});

globalStyle(`${dateRangePickerStyles} .mantine-DatePickerInput-cell`, {
  padding: '0',
  borderBottom: 'none',
});
