import React from 'react'

interface Props {
  title: string
}

const InfoView = (props: Props): JSX.Element => (
  <div className="infoCriterion">{props.title}</div>
)

export default InfoView
