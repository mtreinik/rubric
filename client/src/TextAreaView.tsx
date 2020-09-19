import React, { useState } from 'react'
import { SelectionType } from './types'
import DOMPurify from 'dompurify'

interface Props {
  title: string
  selection: SelectionType
}

const TextAreaView = (props: Props): JSX.Element => {
  const [value, setValue] = useState('')

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

  const getSanitizedHTMLValue = (value: string) =>
    DOMPurify.sanitize(escapeHtml(value).replaceAll(/\n/g, '<br />'))

  const valueComponent =
    props.selection === 'select' ? (
      <span
        dangerouslySetInnerHTML={{
          __html: getSanitizedHTMLValue(value),
        }}
      />
    ) : (
      <textarea rows={4} cols={80} value={value} onChange={handleValueChange} />
    )

  return (
    <table className="textAreaCriterion">
      <tbody>
        <tr>
          <td className="textAreaCriterionCell">
            <div className="criterionTitle">{props.title}</div>
            <div>{valueComponent}</div>
          </td>
        </tr>
      </tbody>
    </table>
  )
}

export default TextAreaView
