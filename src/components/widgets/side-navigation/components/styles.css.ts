import { globalStyle, style, vars } from 'styles';

export const styles = {
  navbar: style({
    ':hover': {
      color: '#FFFFFF',
    },
  }),
  collapsibleContainer: style({
    paddingTop: '8px',
    paddingRight: '0',
    paddingBottom: '8px',
    paddingLeft: '0',
    userSelect: 'none',
    flex: 1,
  }),
  linkContainer: style({
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: '8px',
    paddingRight: '8px',
    paddingBottom: '8px',
    paddingLeft: '0',
    userSelect: 'none',
    borderRadius: 4,
    flex: 1,
    ':hover': {
      backgroundColor: `${vars.color.bgMainHover}`,
    },
  }),
  activeLinkContainer: style({
    backgroundColor: vars.color.bgProduct,
    color: vars.color.white,
    ':hover': {
      backgroundColor: `${vars.color.bgMainHover}`,
    },
  }),
  inactiveIcon: style({
    display: 'flex',
    color: vars.color.bgProduct,
  }),
  activeIcon: style({
    display: 'flex',
    color: vars.color.white,
  }),
  iconContainer: style({
    marginLeft: -18,
    ':hover': {
      backgroundColor: 'rgba(255,255,255,0.2)',
    },
  }),
  iconWrapper: style({
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    paddingTop: '8px',
    paddingRight: '12px',
    paddingBottom: '8px',
    paddingLeft: '0',
    cursor: 'pointer',
    marginLeft: '18px',
    color: vars.color.bgProduct,
  }),
  beforeBorder: style({
    display: 'flex',
    overflow: 'hidden',
    transition: 'all 300ms',
    msTransition: 'all 300ms',
    MozTransition: 'all 300ms',
    WebkitTransition: 'all 300ms',
  }),
  column: style({
    display: 'flex',
    flexDirection: 'column',
    transition: 'all 300ms',
    msTransition: 'all 300ms',
    MozTransition: 'all 300ms',
    WebkitTransition: 'all 300ms',
  }),
  chevronContainer: style({
    width: '24px',
    height: '24px',
    transition: 'all 300ms',
    msTransition: 'all 300ms',
    MozTransition: 'all 300ms',
    WebkitTransition: 'all 300ms',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }),
  badges: style({
    minWidth: '24px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '0px',
    paddingRight: '8px',
    paddingBottom: '0px',
    paddingLeft: '8px',
    borderTopLeftRadius: '10px',
    borderTopRightRadius: '10px',
    borderBottomLeftRadius: '10px',
    borderBottomRightRadius: '10px',
    color: 'black',
    fontWeight: 'bold',
    lineHeight: '20px',
    fontSize: '12px',
    fontFamily: 'DM Sans',
  }),
  childLink: style({
    color: vars.color.textWeak,
  }),
  line: style({
    height: '100%',
    borderLeft: `1px solid ${vars.color.borderMain}`,
    minWidth: 4,
    position: 'absolute',
  }),
  leftBorder: style({
    borderLeft: `1px solid ${vars.color.borderMain}`,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  }),
};

globalStyle(`${styles.badges}:not(:first-child)`, {
  marginLeft: '8px',
});

globalStyle(`${styles.activeLinkContainer}:hover>div>span`, {
  color: vars.color.bgProduct,
});
