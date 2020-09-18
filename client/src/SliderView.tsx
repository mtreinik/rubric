import React, { Fragment } from 'react'
import { SliderCriterionType } from './types'

const SliderView = (props: SliderCriterionType): JSX.Element => {
  const optionHeaders = props.options.map((option, optionIndex) => (
    <Fragment key={'option-' + optionIndex}>
      <th></th>
      <th>{option}</th>
    </Fragment>
  ))

  const rows = props.rows.map((row, rowIndex) => (
    <tr key={'row-' + rowIndex}>
      <th>{row.title}</th>
      {props.options.map((option, optionIndex) => (
        <Fragment key={'option-' + rowIndex + '-' + optionIndex}>
          <td>(o)</td>
          <td>tähän</td>
        </Fragment>
      ))}
      <td>(o)</td>
    </tr>
  ))

  return (
    <table className="criterion">
      <thead>
        <tr>
          <th>&nbsp;</th>
          {optionHeaders}
          <th>&nbsp;</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  )
}

export default SliderView
