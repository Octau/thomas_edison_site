export const PITotalCalculation = (items) => {
  return items.reduce(
    (prev, curr) => prev + curr.item.amount * curr.item.buyPrice,
    0,
  );
};
