import breakpoints from 'common/styles/breakpoint';
import { calc, style, vars } from 'styles';

export const navigationStyle = {
  mobileWrapper: style({
    display: 'flex',
    flex: 1,
    height: calc.subtract('100vh', '48px'),
  }),
  contextMenuTrigger: style({
    inset: 0,
    position: 'absolute',
  }),
  label: style({ overflow: 'hidden', textOverflow: 'ellipsis' }),
  overlayContainer: style({
    position: 'absolute',
    inset: 0,
    // background: "rgba(0,0,0,0.1)",
    zIndex: 201,
  }),
  popover: style({
    borderRadius: 8,
    backgroundColor: vars.color.white,
    padding: 8,
    boxShadow: '0px 10px 15px -3px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
  }),
  actionButton: style({
    ':hover': {
      backgroundColor: vars.color.bgMainHover,
    },
  }),
  content: style({
    overflow: 'hidden',
    flex: '1 1 auto',
    background: 'white',
    position: 'relative',
    display: 'flex',
  }),
};

export const defaultContainerStyle = style({
  display: 'flex',
  flexDirection: 'column',
  padding: 16,
  position: 'relative',
  flex: 1,
  overflow: 'scroll',
  '@media': {
    [breakpoints.screenMd]: {
      padding: 24,
    },
  },
});
