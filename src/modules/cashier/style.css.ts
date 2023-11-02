import { style } from '@vanilla-extract/css';

export const cashierStyle = {
  rootContainer: style({
    display: 'flex',
    justifyContent: 'space-between',
  }),
  cartItem: style({
    display: 'flex',
    alignItems: 'center',
  }),
  cartItemRow: style({
    display: 'flex',
    gap: 16,
    justifyContent: 'space-between',
    marginBottom: 16,
  }),
  inventoryCard: style({
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    width: '100%',
  }),
};
