import colors from 'common/styles/colors';
import typography from 'common/styles/typography';
import { recipe, vars } from 'styles';

export const buttonStyles = recipe({
  base: {},
  variants: {
    size: {
      default: typography.ButtonDefault,
      small: typography.ButtonSmall,
    },
    default: {
      none: {},
      filled: {
        backgroundColor: vars.color.bgProduct,
        ':hover': {
          backgroundColor: vars.color.bgProductLight,
        },
      },
      white: {},
      outline: {
        borderColor: vars.color.borderWeak,
        color: vars.color.textProduct,
        ':hover': {
          borderColor: vars.color.borderWeak,
          backgroundColor: vars.color.bgMainHover,
          color: vars.color.textProduct,
        },
        ':active': {
          borderColor: vars.color.borderWeak,
          backgroundColor: vars.color.bgProductLight,
          color: vars.color.textProduct,
        },
      },
    },
    error: {
      none: {},
      filled: {
        backgroundColor: vars.color.bgError,
        ':hover': {
          backgroundColor: vars.color.bgErrorLight,
        },
        ':active': {
          backgroundColor: vars.color.bgError,
        },
      },
      outline: {
        borderColor: vars.color.borderError,
        color: vars.color.textError,
        ':hover': {
          borderColor: vars.color.borderError,
          backgroundColor: vars.color.bgErrorLight,
          color: vars.color.textError,
        },
        ':active': {
          borderColor: vars.color.borderError,
          backgroundColor: vars.color.bgErrorLight,
          color: vars.color.textError,
        },
      },
      white: {
        color: vars.color.textError,
        ':hover': {
          color: vars.color.bgErrorLight,
          backgroundColor: `${colors.bgErrorLight}50`,
        },
        ':active': {
          color: vars.color.textError,
        },
      },
    },
  },
});

export const actionButtonStyles = recipe({
  base: {},
  variants: {
    error: {
      none: {},
      filled: {
        backgroundColor: vars.color.bgError,
        ':hover': {
          backgroundColor: vars.color.bgErrorLight,
        },
        ':active': {
          backgroundColor: vars.color.bgError,
        },
      },
      outline: {
        borderColor: vars.color.borderError,
        color: vars.color.textError,
        ':hover': {
          borderColor: vars.color.bgErrorLight,
          color: vars.color.bgErrorLight,
        },
        ':active': {
          borderColor: vars.color.borderError,
          color: vars.color.textError,
        },
      },
      white: {
        color: vars.color.textError,
        ':hover': {
          color: vars.color.bgErrorLight,
        },
        ':active': {
          color: vars.color.textError,
        },
      },
    },
  },
});
