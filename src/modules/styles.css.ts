import breakpoints from 'common/styles/breakpoint';
import { recipe, style, vars } from 'styles';

export const moduleStyles = {
  actionContainer: style({
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color: vars.color.textProduct,
  }),
  disabledActionContainer: style({
    textAlign: 'center',
  }),
  buttonContainer: style({
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    columnGap: 16,
  }),
  topFormContainer: style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginBottom: '16px',
    // Add minHeight to ensure that the header share the same heights
    minHeight: '2.25rem',
  }),
  container: style({
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  }),
  fullContainer: style({
    width: '100%',
  }),
  halfContainer: style({
    width: '48%',
    '@media': {
      [breakpoints.screenMaxLg]: {
        width: '100%',
      },
    },
  }),
  topContainer: style({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
    justifyContent: 'space-between',
    '@media': {
      [breakpoints.screenMaxLg]: {
        flexDirection: 'column',
        alignItems: 'unset',
      },
    },
  }),
  cardContent: recipe({
    base: {
      overflow: 'overlay',
    },
    variants: {
      noPadding: {
        true: {
          padding: 16,
        },
        false: {
          padding: 0,
        },
      },
    },
  }),
  sectionContainer: style({
    flex: 1,
    display: 'flex',
    justifyContent: 'space-between',
    '@media': {
      [breakpoints.screenMaxLg]: {
        flexDirection: 'column',
      },
    },
  }),
  tableContainer: style({
    flex: 1,
    width: '100%',
    minHeight: 300,
    flexDirection: 'column',
    display: 'flex',
  }),
  oneThirdContainer: style({
    width: '32%',
  }),
  row: recipe({
    base: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    variants: {
      align: {
        start: {
          alignItems: 'start',
        },
        end: {
          alignItems: 'end',
        },
      },
      justify: {
        between: {
          justifyContent: 'space-between',
        },
        end: {
          justifyContent: 'flex-end',
        },
      },
      wrap: {
        true: {
          flexWrap: 'wrap',
          rowGap: vars.space[4],
        },
        false: {
          flexWrap: 'nowrap',
          rowGap: 0,
        },
      },
    },
  }),
  column: recipe({
    base: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
    },
    variants: {},
  }),
  flex1: style({ flex: 1 }),
  titleProduct: style({
    color: vars.color.textProduct,
  }),
  pointer: style({
    cursor: 'pointer',
  }),
  asterisk: style({
    color: '#FA5252',
  }),
  card: style({
    border: `1px solid ${vars.color.borderMain}`,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
  }),
  sectionTableContainer: style({
    height: 'calc(100vh - 308px)',
  }),
  displayLg: style({
    display: 'inherit',
    '@media': {
      [breakpoints.screenMaxLg]: {
        display: 'none',
      },
    },
  }),
  displayMd: style({
    display: 'none',
    '@media': {
      [breakpoints.screenMaxLg]: {
        display: 'inherit',
      },
    },
  }),
  wordWrap: style({
    wordWrap: 'break-word',
    whiteSpace: 'break-spaces',
  }),
  formItemContainer: style({
    padding: 16,
    border: `1px solid ${vars.color.borderMain}`,
    borderRadius: 8,
  }),
  spaceBetween: style({
    display: 'flex',
    justifyContent: 'space-between',
  }),
  w100: style({
    width: '100%',
  }),
  tableActionContainer: style({
    display: 'flex',
    gap: 16,
  }),
};
