import { globalStyle, style } from '@vanilla-extract/css';
import typography from 'common/styles/typography';

export const textareaInputStyles = style({});

globalStyle(`${textareaInputStyles} .mantine-Textarea-label`, {
  ...typography.BodyBoldDefault,
});

globalStyle(`${textareaInputStyles} .mantine-Textarea-description`, {
  marginTop: 4,
  marginBottom: 4,
  ...typography.BodySmaller,
});

globalStyle(`${textareaInputStyles} .mantine-Textarea-error`, {
  marginTop: 4,
  marginBottom: 4,
});

globalStyle(`${textareaInputStyles} .mantine-Textarea-input`, {
  ...typography.BodyDefault,
});
