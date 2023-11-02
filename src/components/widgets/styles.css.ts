import breakpoints from 'common/styles/breakpoint';
import { recipe, style, vars } from 'styles';

const BAR_OBJ = {
  color: 'white',
  width: '22px',
  borderTopLeftRadius: '1px',
  borderTopRightRadius: '1px',
  borderBottomLeftRadius: '1px',
  borderBottomRightRadius: '1px',
  height: '3px',
  marginTop: '5px',
  marginRight: 'auto',
  marginBottom: '5px',
  marginLeft: 'auto',
  '-webkit-transition': 'all 0.2s ease-in-out',
  transition: 'all 0.2s ease-in-out',
  backgroundColor: 'white',
};

export const widgetStyles = {
  headerContainer: style({
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundColor: vars.color.bgMain,
    color: 'white',
    display: 'flex',
    flex: '0 0 56px',
    height: 56,
    paddingLeft: 16,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  }),
  sideNavigationContainer: recipe({
    base: {
      backgroundColor: 'white',
      minWidth: 264,
      maxWidth: 264,
      position: 'relative',
      width: 264,
      height: '100%',
      overflow: 'scroll',
      zIndex: 200,
      transition: 'all 0.2s ease',
      boxShadow: '0.1rem 0 0.02rem rgba(0,0,0,0.1)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      '@media': {
        [breakpoints.screenMaxLg]: {
          position: 'absolute',
          top: 0,
          left: '-264px',
          bottom: 0,
          backgroundColor: 'white',
        },
      },
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
  mobileNavigationHeader: style({
    display: 'none',
    '@media': {
      [breakpoints.screenMaxLg]: {
        display: 'block',
        marginRight: '8px',
        marginLeft: '16px',
        borderBottom: `1px solid rgba(211, 217, 222, 0.4)`,
        paddingBottom: '24px',
        marginBottom: '16px',
        paddingTop: '24px',
      },
    },
  }),
  navigationContainer: recipe({
    base: {
      transition: 'all .18s ease',
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
  hamburgerContainer: style({
    cursor: 'pointer',
    marginRight: '20px',
    '@media': {
      [breakpoints.screenLg]: {
        display: 'none',
      },
    },
  }),
  firstBar: recipe({
    base: BAR_OBJ,
    variants: {
      isActive: {
        true: { display: 'none' },
        false: {},
      },
    },
  }),
  secondBar: recipe({
    base: BAR_OBJ,
    variants: {
      isActive: {
        true: { transform: 'translateY(4px) rotate(45deg)' },
        false: {},
      },
    },
  }),
  thirdBar: recipe({
    base: BAR_OBJ,
    variants: {
      isActive: {
        true: { transform: 'translateY(-4.3px) rotate(-45deg)' },
        false: {},
      },
    },
  }),
  headerLogoContainer: style({
    display: 'flex',
    flex: 1,
  }),
  haderInformationContainer: style({
    display: 'flex',
    alignItems: 'center',
  }),
  headerNotificationContainer: style({
    display: 'flex',
    backgroundColor: '#FFF',
    marginRight: '32px',
    width: '40px',
    height: '40px',
    borderTopLeftRadius: '20px',
    borderTopRightRadius: '20px',
    borderBottomLeftRadius: '20px',
    borderBottomRightRadius: '20px',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    cursor: 'pointer',
    '@media': {
      [breakpoints.screenMaxLg]: {
        backgroundColor: 'transparent',
      },
    },
  }),
  headerProfileContainer: style({
    display: 'flex',
    minWidth: '300px',
    height: '64px',
    flex: 1,
    paddingLeft: '24px',
    alignItems: 'center',
    '@media': {
      'screen and (max-width: 991px)': {
        display: 'none',
      },
    },
  }),
  headerProfilePicture: style({
    marginRight: '16px',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  }),
  headerProfileInformation: style({
    display: 'flex',
    flexDirection: 'column',
    marginRight: '16px',
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
  timeContainer: style({
    display: 'flex',
    flexDirection: 'column',
    marginRight: '32px',
    '@media': {
      [breakpoints.screenMaxLg]: {
        display: 'none',
      },
    },
  }),
  headerLeftSideContent: style({
    display: 'flex',
  }),
  profileMenuContainer: style({
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
  }),
  profileMenuItem: style({
    display: 'flex',
    flex: 1,
    paddingTop: '12px',
    paddingRight: '20px',
    paddingBottom: '12px',
    paddingLeft: '20px',
    alignItems: 'center',
    cursor: 'pointer',
    ':hover': {
      backgroundColor: '#00000018',
    },
  }),
};
