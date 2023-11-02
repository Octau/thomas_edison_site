import { mantineColors } from 'common/styles/default-colors';
import { globalStyle, recipe, style, vars } from 'styles';

export const tableStyles = {
  table: style({
    borderSpacing: 0,
    borderCollapse: 'separate',
    borderTopLeftRadius: '8px',
    borderTopRightRadius: '8px',
    borderBottomLeftRadius: '8px',
    borderBottomRightRadius: '8px',
    fontFamily: 'Inter',
  }),
  td: recipe({
    base: {
      borderBottom: `0.25px solid ${vars.color.borderMain}`,
      textAlign: 'left',
      width: '100%',
      paddingTop: '8px',
      paddingRight: '8px',
      paddingBottom: '8px',
      paddingLeft: '8px',
      display: 'flex',
      // alignItems: 'center',
    },
    variants: {
      showRightBorder: {
        true: {
          borderRight: `2px solid ${vars.color.borderMainHover}`,
        },
        false: {},
      },
      odd: {
        true: {
          backgroundColor: mantineColors(),
        },
        false: {},
      },
    },
  }),
  tr: recipe({
    base: {
      backgroundColor: '#FFFFFF',
      display: 'flex',
      minHeight: '44px',
    },
    variants: {
      odd: {
        true: {
          backgroundColor: mantineColors(),
        },
        false: {},
      },
    },
  }),
  stickyTopTr: style({
    position: 'sticky',
    top: 0,
    display: 'flex',
  }),
  stickyTd: recipe({
    base: {
      position: 'sticky',
      paddingTop: '8px',
      paddingRight: '8px',
      paddingBottom: '8px',
      paddingLeft: '8px',
      backgroundColor: '#FFFFFF',
      borderBottom: `0.25px solid ${vars.color.borderMain}`,
      textAlign: 'left',
      display: 'flex',
      // alignItems: 'center',
    },
    variants: {
      left: {
        true: {
          left: 0,
        },
        false: {},
      },
      right: {
        true: {
          right: 0,
        },
        false: {},
      },
      showRightBorder: {
        true: {
          borderRight: `2px solid ${vars.color.borderMainHover}`,
        },
        false: {},
      },
      odd: {
        true: {
          backgroundColor: mantineColors(),
        },
        false: {},
      },
    },
  }),
  stickyTopTh: style({
    position: 'sticky',
    top: 0,
  }),
  stickyThead: style({
    position: 'sticky',
    top: 0,
    zIndex: 1,
    borderBottom: `0.25px solid ${vars.color.borderMain}`,
    backgroundColor: vars.color.white,
  }),
  tableRootContainer: style({
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    display: 'flex',
    overflow: 'auto',
  }),
  tableContainer: recipe({
    base: {
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      position: 'relative',
      borderTopLeftRadius: '8px',
      borderTopRightRadius: '8px',
      borderBottomLeftRadius: '8px',
      borderBottomRightRadius: '8px',
    },
    variants: {
      showBorder: {
        true: {
          borderTop: `2px solid ${vars.color.borderMainHover}`,
          borderRight: `1px solid ${vars.color.borderMainHover}`,
          borderLeft: `2px solid ${vars.color.borderMainHover}`,
          borderBottom: `1px solid ${vars.color.borderMainHover}`,
        },
        false: {},
      },
    },
  }),
  th: recipe({
    base: {
      height: '36px',
      paddingTop: '8px',
      paddingRight: '8px',
      paddingBottom: '8px',
      paddingLeft: '8px',
      fontSize: '14px',
      fontWeight: '500',
      position: 'sticky',
      cursor: 'pointer',
      // backgroundColor: $theme.colors.primaryLightest,
      top: 0,
      userSelect: 'none',
      msUserSelect: 'none',
      MozUserSelect: 'none',
      msTouchSelect: 'none',
      WebkitUserSelect: 'none',
      backgroundColor: vars.color.white,
    },
    variants: {
      showRightBorder: {
        true: {
          borderRight: `2px solid ${vars.color.borderMainHover}`,
        },
        false: {},
      },
      left: {
        true: {
          left: 0,
          zIndex: 100,
        },
        false: {},
      },
      right: {
        true: {
          right: 0,
          zIndex: 100,
        },
        false: {},
      },
    },
  }),
  tbody: style({
    fontSize: 13,
  }),
  resizeBorder: style({
    display: 'inline-block',
    backgroundColor: vars.color.borderMain,
    width: '1px',
    height: '100%',
    position: 'absolute',
    right: 0,
    top: 0,
    transform: 'translateX(50%)',
    zIndex: 1,
    touchAction: 'none',
    cursor: 'col-resize',
    selectors: {
      '&:hover': {
        backgroundColor: vars.color.dividerStronger,
      },
      '&:active': {
        backgroundColor: vars.color.dividerStronger,
      },
    },
  }),
  sortContainer: style({
    height: '24px',
    marginLeft: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }),
  headerContainer: style({
    display: 'flex',
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: '100%',
  }),
  noDataContainer: style({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    width: '100%',
    paddingTop: '16px',
    paddingRight: '0',
    paddingBottom: '16px',
    paddingLeft: '0',
  }),
  domSelect: style({
    width: '100%',
    border: 'none',
    height: '100%',
    backgroundColor: 'transparent',
  }),
  domOption: style({}),
  text: style({
    wordBreak: 'break-all',
    // width: '100%',
    // whiteSpace: 'nowrap',
    // overflow: 'hidden',
    // textOverflow: 'ellipsis',
  }),
  emptyViewContainer: style({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }),
};

globalStyle(`${tableStyles.resizeBorder} .isResizing`, {
  backgroundColor: vars.color.borderMain,
});
