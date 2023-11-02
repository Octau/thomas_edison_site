import breakpoints from 'common/styles/breakpoint';
import { recipe, style, vars } from 'styles';

export const listHeaderStyle = {
  leftActionContainer: recipe({
    base: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      width: '100%',
      flexGrow: 1,
    },
    variants: {
      margin: {
        true: {
          '@media': {
            [breakpoints.screenMaxLg]: {
              marginBottom: 16,
            },
          },
        },
        false: {},
      },
    },
    defaultVariants: {
      margin: true,
    },
  }),
  topContainer: style({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // Add minHeight to ensure that the header share the same heights
    minHeight: '2.25rem',
    marginBottom: 16,
    '@media': {
      [breakpoints.screenMaxLg]: {
        flexDirection: 'column',
        alignItems: 'unset',
      },
    },
  }),
  filterDivider: recipe({
    base: {},
    variants: {
      showBorder: {
        true: {
          borderWidth: 1,
          borderStyle: 'solid',
          boderColor: vars.color.bgDark,
          marginTop: '16px',
          marginRight: '0px',
          marginBottom: '16px',
          marginLeft: '0px',
        },
        false: {},
      },
    },
  }),
  rightContainer: style({
    display: 'flex',
    alignItems: 'center',
    '@media': {
      [breakpoints.screenMaxLg]: {
        marginTop: 8,
        justifyContent: 'flex-end',
      },
    },
  }),
  textContainer: style({}),
};
