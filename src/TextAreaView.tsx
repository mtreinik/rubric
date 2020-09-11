import React, { useState } from 'react'

interface Props {
  title: string
  selected: boolean
}

const TextAreaView = (props: Props): JSX.Element => {
  const [value, setValue] = useState('')

  const handleValueChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    setValue(event.target.value)
  }

  const valueComponent = props.selected ? (
    <span>{value}</span>
  ) : (
    <textarea
      rows={4}
      cols={80}
      value={value}
      onChange={handleValueChange}
    ></textarea>
  )

  return (
    <table className="textAreaCriterion">
      <tr>
        <td className="textAreaCriterionCell">
          <div className="criterionTitle">{props.title}</div>
          <div>{valueComponent}</div>
        </td>
      </tr>
    </table>
  )
}

export default TextAreaView
