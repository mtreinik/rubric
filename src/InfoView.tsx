import React from 'react'

interface Props {
  title: string
}

const InfoView = (props: Props): JSX.Element => (
  <div
    className="infoCriterion"
    dangerouslySetInnerHTML={{ __html: props.title }}
  />
)

export default InfoView
