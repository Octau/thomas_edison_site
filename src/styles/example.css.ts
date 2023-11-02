import { style, globalStyle } from 'styles';

export const exampleStyles = {
  changeLanguage: style({
    textAlign: 'center',
  }),
  anchor: style({
    padding: '8px 24px',
    marginLeft: 4,
    marginRight: 4,
    textDecoration: 'none',
    textAlign: 'center',
    borderRadius: 8,
    color: '#1C1C1E',
    selectors: {
      '&:hover': {
        backgroundColor: '#c7c7c7',
      },
    },
  }),
  languageContainer: style({
    display: 'flex',
    flexDirection: 'column',
  }),
  languageContent: style({
    display: 'flex',
    marginTop: 4,
  }),
  container: style({
    padding: '0 2rem',
  }),
  main: style({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '6rem',
    minHeight: '100vh',
  }),
  footer: style({
    display: 'flex',
    flex: '1',
    padding: '2rem 0',
    borderTop: '1px solid #eaeaea',
    justifyContent: 'center',
    alignItems: 'center',
  }),
  title: style({
    margin: 0,
    lineHeight: 1.15,
    fontSize: '4rem',
    textAlign: 'center',
  }),
  description: style({
    textAlign: 'center',
    margin: '4rem 0',
    lineHeight: '1.5',
    fontSize: '1.5rem',
  }),
  code: style({
    background: '#fafafa',
    borderRadius: '5px',
    padding: '0.75rem',
    fontSize: '1.1rem',
    fontFamily:
      'Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace',
    '@media': {
      '(prefers-color-scheme: dark)': {
        borderColor: '#111',
      },
    },
  }),
  grid: style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    maxWidth: '800px',
    '@media': {
      'screen and (max-width: 600px)': {
        width: '100%',
        flexDirection: 'column',
      },
    },
  }),
  card: style({
    margin: '1rem',
    padding: '1.5rem',
    textAlign: 'left',
    color: 'inherit',
    textDecoration: 'none',
    border: '1px solid #eaeaea',
    borderRadius: '10px',
    transition: 'color 0.15s ease, border-color 0.15s ease',
    maxWidth: '300px',
    selectors: {
      '&:hover, &:focus, &:active': {
        color: '#0070f3',
        borderColor: '#0070f3',
      },
    },
    '@media': {
      '(prefers-color-scheme: dark)': {
        borderColor: '#222',
      },
    },
  }),
  logo: style({
    height: '1em',
    marginLeft: '0.5rem',
  }),
};

globalStyle(`${exampleStyles.footer} a`, {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexGrow: '1',
});

globalStyle(`${exampleStyles.title} a`, {
  color: '#0070f3',
  textDecoration: 'none',
});

globalStyle(
  `${exampleStyles.title} a:hover, ${exampleStyles.title} a:focus, ${exampleStyles.title} a:active,`,
  {
    textDecoration: 'underline',
  },
);

globalStyle(`${exampleStyles.card} h2`, {
  margin: '0 0 1rem 0',
  fontSize: '1.5rem',
});

globalStyle(`${exampleStyles.card} p`, {
  margin: '0',
  fontSize: '1.25rem',
  lineHeight: '1.5',
});

globalStyle(`${exampleStyles.logo} img`, {
  '@media': {
    '(prefers-color-scheme: dark)': {
      filter: 'invert(1)',
    },
  },
});
