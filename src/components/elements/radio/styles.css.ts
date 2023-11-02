import typography from 'common/styles/typography';
import { globalStyle, recipe, vars } from 'styles';

export const radioStyles = recipe({
  base: {
    // Changed display to flex to easily set gaps between items without having to put margin in every radio item
    display: 'flex',
    rowGap: vars.space[4],
  },
  variants: {
    orientation: {
      vertical: {
        flexDirection: 'column',
      },
      horizontal: {
        flexDirection: 'row',
      },
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
  },
});

globalStyle(`${radioStyles()} .mantine-Radio-label`, {
  ...typography.BodyDefault,
});

globalStyle(`${radioStyles()} .mantine-RadioGroup-label`, {
  ...typography.BodyBoldDefault,
});

globalStyle(`${radioStyles()} .mantine-Group-root`, {
  paddingTop: 8,
});
