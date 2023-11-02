import { recipe } from '@vanilla-extract/recipes';
import typography from 'common/styles/typography';

export const styles = recipe({
  base: {},
  variants: {
    variant: typography,
  },
  defaultVariants: {
    variant: 'BodyDefault',
  },
});
