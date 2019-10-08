export function shuffle<T>(array: T[]): T[] {
  let index = array.length;
  while (index > 0) {
    const random = Math.floor(Math.random() * index--);
    [array[index], array[random]] = [array[random], array[index]];
  }
  return array;
}
