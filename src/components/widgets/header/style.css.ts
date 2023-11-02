import breakpoints from 'common/styles/breakpoint';
import { style, vars } from 'styles';

export const headerStyles = {
  container: style({
    width: '100%',
    display: 'flex',
    backgroundColor: vars.color.white,
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 48,
    padding: '0px 16px',
    borderBottom: '1px solid #E9ECEF',
  }),
  logoContainer: style({
    width: 120,
    height: 30,
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    '@media': {
      [breakpoints.screenMd]: {
        width: 160,
        height: 24,
      },
    },
  }),
  menuTablet: style({
    display: 'flex',
    '@media': {
      [breakpoints.screenLg]: {
        display: 'none',
      },
    },
  }),
  leftContainer: style({
    display: 'flex',
    alignItems: 'center',
  }),
};
