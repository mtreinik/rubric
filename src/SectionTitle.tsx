import React from 'react'

interface Props {
  title: string
}

const SectionTitle = (props: Props): JSX.Element => (
  <div className="sectionTitle">
    <br />
    {props.title}
  </div>
)

export default SectionTitle
