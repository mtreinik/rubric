import * as React from 'react'
import { createSeparatedReactNodes } from '../src/react-utils'
import { fail } from 'assert'

it('joins empty array', () => {
  expect(
    createSeparatedReactNodes(
      [],
      () => fail('textToReactNode should not be called'),
      () => fail('separatorGetter should not be called')
    )
  ).toEqual([])
})

it('joins one element', () => {
  expect(
    createSeparatedReactNodes(
      ['test'],
      (val) => <div key={val}>{val}</div>,
      () => fail('separator getter should not be called')
    )
  ).toEqual(<div key="test">test</div>)
})

it('joins two elements', () => {
  const result = createSeparatedReactNodes(
    ['test', 'foo'],
    (val) => <div key={'key-' + val}>{val}</div>,
    (index) => <span key={index}>|</span>
  )
  expect(result).toEqual([
    <div key="key-test">test</div>,
    <span key={1}>|</span>,
    <div key="key-foo">foo</div>,
  ])
})

it('joins three elements', () => {
  const result = createSeparatedReactNodes(
    ['test', 'foo', 'bar'],
    (val) => <div key={'key-' + val}>{val}</div>,
    (index) => <span key={index}>|</span>
  )
  expect(result).toEqual([
    <div key="key-test">test</div>,
    <span key={1}>|</span>,
    <div key="key-foo">foo</div>,
    <span key={2}>|</span>,
    <div key="key-bar">bar</div>,
  ])
})
