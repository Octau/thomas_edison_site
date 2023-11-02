import { style, vars } from 'styles';

export const queryFilterStyles = {
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
        backgroundColor: vars.color.bgMain,
      },
    },
  }),
  tagPill: style({
    borderRadius: 8,
    borderColor: vars.color.borderMain,
    color: vars.color.textNormal,
    borderWidth: 1,
    borderStyle: 'solid',
    display: 'flex',
    alignItems: 'center',
    height: 36,
    padding: '4px 20px',
  }),
};
