import typography from 'common/styles/typography';
import { globalStyle, style } from 'styles';

export const switchStyles = style({});

globalStyle(`${switchStyles} .mantine-Switch-label`, {
  ...typography.BodyDefault,
});
