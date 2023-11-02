export function CheckDuplicate(arrayValue: string[]) {
  const set = new Set(arrayValue);

  if (arrayValue.length !== set.size) {
    return false;
  }

  return true;
}

export function CombineArray([head, ...[headTail, ...tailTail]]) {
  if (!headTail) return head;

  const combined = headTail.reduce((acc, x) => {
    return acc.concat(head.map((h) => `${h},${x}`));
  }, []);

  return CombineArray([combined, ...tailTail]);
}
