export function shuffle(array: any[]) {
  let index = array.length, random: number;
  while (0 !== index) {
    random = Math.floor(Math.random() * index);
    index--;
    [array[index], array[random]] = [array[random], array[index]];
  }
}
