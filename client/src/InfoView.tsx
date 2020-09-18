import React from 'react'
import DOMPurify from 'dompurify'

interface Props {
  title: string
}

const InfoView = (props: Props): JSX.Element => {
  const sanitizedHTML = DOMPurify.sanitize(props.title)
  return (
    <div
      className="infoCriterion"
      dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
    />
  )
}
export default InfoView
