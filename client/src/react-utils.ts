import { ReactNode, ReactNodeArray } from 'react'

type JoinedReactNodes = ReactNode | ReactNodeArray
type IndexToReactNode = (index: number) => ReactNode
type TextToReactNode = (text: string, index: number) => ReactNode

/**
 * Join an array of React nodes with a separator that gets its key from an index
 *
 * @param array
 * @param separatorGetter
 */
export function joinReactNodes(
  array: ReactNode[],
  separatorGetter: IndexToReactNode
): JoinedReactNodes {
  return array.length === 0
    ? []
    : array.reduce(
        (previous: JoinedReactNodes, item: ReactNode, index: number) =>
          Array.isArray(previous)
            ? [...previous, separatorGetter(index), item]
            : [previous, separatorGetter(index), item]
      )
}

/**
 * Create React nodes from an array of strings and add a separator between them.
 *
 * @param array
 * @param textToReactNode
 * @param separatorGetter
 */
export function createSeparatedReactNodes(
  array: string[],
  textToReactNode: TextToReactNode,
  separatorGetter: IndexToReactNode
): JoinedReactNodes {
  return joinReactNodes(array.map(textToReactNode), separatorGetter)
}
