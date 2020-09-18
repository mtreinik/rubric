import React from 'react'
import renderer from 'react-test-renderer'
import InfoView from '../src/InfoView'

describe('InfoView renders correctly with', () => {
  const expectValidComponentWithTitle = (title: string): void => {
    const component = renderer.create(<InfoView title={title} />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  }
  it('empty title', () => {
    expectValidComponentWithTitle('')
  })
  it('text title', () => {
    expectValidComponentWithTitle('xyzzy')
  })
  it('HTML title', () => {
    expectValidComponentWithTitle('this is <strong>heavy</strong>')
  })
  it('XSS attack sanitized from title', () => {
    expectValidComponentWithTitle(
      '<span onmouseover="alert(document.cookie)">this is an XSS attack</span>'
    )
  })
})
