import { style } from '@vanilla-extract/css';

export const purchaseInventoryStyles = {
  subtotalContainer: style({
    display: 'flex',
    alignItems: 'center',
  }),
  content: style({
    flex: 1,
    overflow: 'auto',
  }),
};
