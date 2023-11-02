import { style } from '@vanilla-extract/css';
import breakpoints from 'common/styles/breakpoint';

export const summaryFooterStyles = {
  summaryContent: style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 3,
    boxShadow: '0px -4px 16px rgba(0, 0, 0, 0.12)',
    borderTopLeftRadius: '8px',
    borderTopRightRadius: '8px',
    borderBottomLeftRadius: '0px',
    borderBottomRightRadius: '0px',
    padding: 16,
    '@media': {
      [breakpoints.screenMaxXs]: {
        display: 'block',
        alignItems: undefined,
        justifyContent: undefined,
      },
    },
  }),
  wideWhenSmall: style({
    '@media': {
      [breakpoints.screenMaxXs]: {
        width: '100%',
      },
    },
  }),
};
