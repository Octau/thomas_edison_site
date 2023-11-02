import { style, vars } from 'styles';

export const styles = {
  wrapper: style({
    backgroundColor: vars.color.bgProduct,
    borderRadius: 10,
    padding: 16,
    display: 'flex',
    alignItems: 'center',
    color: vars.color.textWhite,
    fontSize: 32,
    fontWeight: 700,
    cursor: 'pointer',
    ':hover': {
      backgroundColor: vars.color.bgProductLight,
    },
  }),
  images: style({
    margin: 16,
  }),
};
