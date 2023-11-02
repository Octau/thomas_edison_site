export function totalCalculation(props: { fields }) {
  return props.fields.reduce((prev, curr) => prev + curr.price * curr.qty, 0);
}
