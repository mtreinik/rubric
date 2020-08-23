import React from 'react'

interface Props {
  title: string
}

const SectionTitle = (props: Props): JSX.Element => (
  <div className="sectionTitle">{props.title}</div>
)

export default SectionTitle
