import { style } from '@vanilla-extract/css';
import breakpoints from 'common/styles/breakpoint';

export const loginStyles = {
  bg: style({
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(180deg, #84A5FB 0%, #84E5FB 100%)',
    '@media': {
      [breakpoints.screenMaxSm]: {
        paddingTop: 32,
        paddingBottom: 32,
      },
    },
  }),
  container: style({
    display: 'flex',
    width: '60%',
    justifyContent: 'center',
    '@media': {
      [breakpoints.screenMaxMd]: {
        flexDirection: 'column',
        width: '80%',
      },
    },
  }),
  contentContainer: style({
    zIndex: 1,
    flexBasis: '55%',
    backgroundColor: 'white',
    boxShadow: '2px 8px 20px rgba(129, 158, 158, 0.2)',
    borderRadius: 16,
    '@media': {
      [breakpoints.screenMaxMd]: {
        flexBasis: '100%',
      },
      [breakpoints.screenLg]: {
        maxWidth: 500,
      },
    },
  }),
  contentBody: style({
    position: 'relative',
  }),
  actionContainer: style({
    marginTop: 24,
    display: 'flex',
    justifyContent: 'center',
  }),
  card: style({
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '0 auto',
    paddingTop: 48,
    paddingRight: 32,
    paddingBottom: 48,
    paddingLeft: 32,
    '@media': {
      [breakpoints.screenLg]: {
        maxWidth: 350,
      },
    },
  }),
  logoContainer: style({
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 24,
  }),
  submitButton: style({
    width: '50%',
    '@media': {
      [breakpoints.screenMaxMd]: {
        width: '100%',
      },
    },
  }),
};
