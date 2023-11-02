import typography from 'common/styles/typography';
import { globalStyle, style } from 'styles';

export const dateTimePickerStyles = style({});

globalStyle(`${dateTimePickerStyles} .mantine-DateTimePicker-label`, {
  ...typography.BodyBoldDefault,
});

globalStyle(`${dateTimePickerStyles} table`, {
  width: 'auto',
});

globalStyle(`${dateTimePickerStyles} .mantine-DateTimePicker-description`, {
  marginTop: 4,
  marginBottom: 4,
});

globalStyle(`${dateTimePickerStyles} .mantine-DateTimePicker-error`, {
  marginTop: 4,
  marginBottom: 4,
});

globalStyle(`${dateTimePickerStyles} .mantine-DateTimePicker-input`, {
  ...typography.BodyDefault,
});

globalStyle(`${dateTimePickerStyles} .mantine-DateTimePicker-weekdayCell`, {
  borderBottom: 'none',
});

globalStyle(`${dateTimePickerStyles} .mantine-DateTimePicker-cell`, {
  padding: '0',
  borderBottom: 'none',
});
