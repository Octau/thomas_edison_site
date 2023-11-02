import { style, vars } from 'styles';
export const paginationStyles = style({});
export const styles = {
  container: style({
    display: 'flex',
    justifyContent: 'space-between',
    // CHANGE 06/05/2023:
    // [PAGINATION] padding bottom kurangin
    padding: vars.space[4],
    alignItems: 'center',
  }),
  select: style({
    // Counter the offset caused by the Select component to make it SEEM like it's centered with the other pagination elements
    height: '75%',
    width: 75,
  }),
  metaContainer: style({
    display: 'flex',
  }),
  highlightText: style({
    display: 'inline-block',
    color: vars.color.textNormal,
  }),
};
