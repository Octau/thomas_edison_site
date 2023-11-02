import { style } from 'styles';

export const formStyles = {
  buttonContainer: style({
    paddingTop: '16px',
    paddingRight: '16px',
    paddingBottom: '16px',
    paddingLeft: '16px',
    display: 'flex',
    width: '100%',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    boxShadow: '0px 0 2px rgba(0, 0, 0, 0.4)',
    zIndex: 90,
  }),
  buttonRightContent: style({
    display: 'flex',
  }),
  buttonLeftContent: style({
    display: 'flex',
  }),
};
