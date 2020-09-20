import React from 'react'
import { shallow } from 'enzyme'
import InfoView from '../src/InfoView'

describe('InfoView renders correctly with', () => {
  const expectValidComponentWithTitle = (title: string): void => {
    const component = shallow(<InfoView title={title} />)
    expect(component).toMatchSnapshot()
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
