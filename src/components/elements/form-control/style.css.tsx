import { recipe, style } from 'styles';

export const formControlStyle = {
  labelContainer: style({
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  }),
  required: style({
    color: '#fa5252',
  }),
  container: recipe({
    base: {},
    variants: {
      noMargin: {
        true: {},
        false: {
          marginBottom: 16,
        },
      },
    },
  }),
};
