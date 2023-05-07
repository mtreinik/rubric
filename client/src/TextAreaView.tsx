import React, { useState } from 'react'
import { SelectionType } from './types'
import DOMPurify from 'dompurify'

interface Props {
  title: string
  selection?: SelectionType
  value?: string
}

const TextAreaView = (props: Props): JSX.Element => {
  const [value, setValue] = useState(props.value || '')

  const handleValueChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    setValue(event.target.value)
  }

  const escapeHtml = (unsafe: string) =>
    unsafe
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;')

  const replaceNewlinesAndEscapeHtml = (value: string) =>
    DOMPurify.sanitize(escapeHtml(value).replace(/\n/g, '<br />'))

  const valueComponent =
    props.selection === 'select' ? (
      <span
        dangerouslySetInnerHTML={{
          __html: replaceNewlinesAndEscapeHtml(value),
        }}
      />
    ) : (
      <textarea
        rows={4}
        cols={80}
        value={value}
        onChange={handleValueChange}
        className="textArea"
      />
    )

  if (props.selection === 'select' && !value) {
    return <span></span>
  } else {
    return (
      <div
        className={
          props.selection === 'select'
            ? 'textAreaCriterionCell withBorder'
            : 'textAreaCriterionCell'
        }
      >
        <div className="criterionTitle">{props.title}</div>
        <div>{valueComponent}</div>
      </div>
    )
  }
}

export default TextAreaView
