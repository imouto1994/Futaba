export function swap(array, indexA, indexB) {
  const copiedArray = array.slice(0);
  const temp = copiedArray[indexA];
  copiedArray[indexA] = copiedArray[indexB];
  copiedArray[indexB] = temp;
  return copiedArray;
}
