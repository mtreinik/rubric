/**
 * swaps array element at index with element after it
 * @param index
 * @param array
 */
export function swapElements<T>(index: number, array: T[]): T[] {
  if (array.length < 2 || index < 0 || index >= array.length - 1) {
    return array
  }
  if (array.length === 2) {
    return [array[1], array[0]]
  }
  const head = array.slice(0, index)
  const elem1 = array[index]
  const elem2 = array[index + 1]
  const tail = array.slice(index + 2)
  return head.concat([elem2, elem1]).concat(tail)
}
