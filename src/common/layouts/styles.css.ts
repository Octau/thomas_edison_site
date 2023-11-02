import { recipe, style, vars } from 'styles';

export const layoutStyles = {
  content: style({
    height: 'calc(100vh - 48px)',
    overflow: 'hidden',
    display: 'flex',
    flex: 1,
    position: 'relative',
    flexDirection: 'row',
    backgroundColor: vars.color.borderWeak,
  }),
  scrollArea: style({
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    background: vars.color.white,
  }),
  layoutContainer: style({
    width: '100%',
    height: '100%',
  }),
  overlayContainer: recipe({
    base: {
      transition: 'all .2s ease',
    },
    variants: {
      isActive: {
        true: {
          position: 'absolute',
          width: '100%',
          height: '100%',
          zIndex: 100,
          top: '0',
          left: '0',
          right: '0',
          bottom: '0',
          // backgroundColor: 'rgba(0,0,0,0.5)',
          cursor: 'pointer',
        },
        false: {},
      },
    },
  }),
};
