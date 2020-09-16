import { swapElements } from '../src/array-utils'

describe('swapElements', () => {
  it('returns empty array for empty array', () => {
    expect(swapElements(0, [])).toEqual([])
  })
  it('returns one element array', () => {
    expect(swapElements(0, ['abc'])).toEqual(['abc'])
  })

  it('swaps two elements', () => {
    expect(swapElements(0, ['qwerty', 'xyzzy'])).toEqual(['xyzzy', 'qwerty'])
  })
  it('swaps two first elements', () => {
    expect(swapElements(0, ['a', 'b', 'c', 'd'])).toEqual(['b', 'a', 'c', 'd'])
  })
  it('swaps two middle elements', () => {
    expect(swapElements(1, ['a', 'b', 'c', 'd'])).toEqual(['a', 'c', 'b', 'd'])
  })
  it('swaps two last elements', () => {
    expect(swapElements(2, ['a', 'b', 'c', 'd'])).toEqual(['a', 'b', 'd', 'c'])
  })

  it('does not swap when index is below zero', () => {
    expect(swapElements(-1, ['a', 'b', 'c', 'd'])).toEqual(['a', 'b', 'c', 'd'])
  })

  it('does not swap when index is at last element', () => {
    expect(swapElements(3, ['a', 'b', 'c', 'd'])).toEqual(['a', 'b', 'c', 'd'])
  })

  it('does not swap when index is after last element', () => {
    expect(swapElements(4, ['a', 'b', 'c', 'd'])).toEqual(['a', 'b', 'c', 'd'])
  })
})
