import breakpoints from 'common/styles/breakpoint';
import { globalStyle, recipe, style, vars } from 'styles';

export const sideNavigationStyles = {
  container: recipe({
    base: {
      minWidth: 264,
      maxWidth: 264,
      width: 264,
      height: '100%',
      overflow: 'auto',
      zIndex: 200,
      transition: 'all 0.2s ease',
      boxShadow: '0.1rem 0 0.02rem rgba(0,0,0,0.1)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      // '@media': {
      //   [breakpoints.screenMaxLg]: {
      //   },
      // },
      position: 'absolute',
      left: '-264px',
      bottom: 0,
      backgroundColor: 'white',
      top: 48,
    },
    variants: {
      isActive: {
        true: {
          left: '0px !important',
          position: 'fixed',
          minWidth: '264px !important',
          maxWidth: '264px !important',
          width: '264px !important',
        },
        false: {},
      },
    },
  }),
  logoutContainer: style({
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    paddingBottom: 40,
    marginTop: 42,
  }),
  rowContainer: style({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
  }),
  searchIconContainer: style({
    display: 'flex',
    alignItems: 'center',
    paddingRight: 8,
  }),
  loadingContainer: style({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    flex: 1,
    paddingTop: '16px',
    paddingRight: '16px',
    paddingBottom: '16px',
    paddingLeft: '16px',
    height: '100%',
  }),
  navigationContainer: recipe({
    base: {
      transition: 'all .18s ease',
      padding: '20px 6px',
      height: '100vh',
    },
    variants: {
      isActive: {
        true: {
          '@media': {
            [breakpoints.screenMaxLg]: {
              opacity: 1,
            },
          },
        },
        false: {
          '@media': {
            [breakpoints.screenMaxLg]: {
              opacity: 0,
            },
          },
        },
      },
    },
  }),
  actionButton: style({
    color: vars.color.bgProduct,
    ':hover': {
      color: vars.color.white,
      backgroundColor: vars.color.bgMainHover,
    },
  }),
};

globalStyle(`${sideNavigationStyles.actionButton}> div`, {
  justifyContent: 'flex-start',
});
globalStyle(`${sideNavigationStyles.actionButton}> div .mantine-Button-label`, {
  marginLeft: 6,
});
