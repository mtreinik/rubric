import React from 'react'

interface Props {
  title: string
}

const TextAreaView = (props: Props): JSX.Element => {
  return (
    <table className="textAreaCriterion">
      <tr>
        <td className="textAreaCriterionCell">
          <div className="criterionTitle">{props.title}</div>
          <div>
            <textarea rows={4} cols={80}></textarea>
          </div>
        </td>
      </tr>
    </table>
  )
}

export default TextAreaView
