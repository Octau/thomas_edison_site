import { mantineColors } from 'common/styles/default-colors';
import { style, vars } from 'styles';

export const tableDetailStyles = {
  actionContainer: style({
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }),
  action: style({
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 4,
    paddingRight: 8,
    paddingBottom: 4,
    paddingLeft: 8,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    selectors: {
      '&:hover': {
        backgroundColor: vars.color.bgMainHover,
      },
    },
  }),
  detailText: style({
    color: mantineColors(),
    paddingTop: '0',
    paddingRight: '8px',
    paddingBottom: '0',
    paddingLeft: '8px',
    userSelect: 'none',
  }),
};
