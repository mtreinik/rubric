import React from 'react'

interface Props {
  title: string
}

const RubricTitle = (props: Props): JSX.Element => (
  <div className="rubricTitle">{props.title}</div>
)

export default RubricTitle
