import React from 'react'
import { SelectionType, SliderRowType } from './types'
import SliderCell from './SliderCell'

interface Props {
  title: string
  options: string[]
  rows: SliderRowType[]
  setSliderRowValue: (rowIndex: number, value: number) => void
  selection: SelectionType
}

const SliderView = (props: Props): JSX.Element => {
  const optionHeaders = props.options.map((option, optionIndex) => (
    <td className="sliderHeader" key={'option-' + optionIndex}>
      {option}
    </td>
  ))
  const cellsPerColumn = 5

  const rows = props.rows.map((row, rowIndex) => (
    <tr key={'row-' + rowIndex}>
      <td className="sliderRowHeader">{row.title}</td>
      {props.options.map((option, optionIndex) => (
        <td
          className="sliderColumn"
          style={{ fontFamily: 'Monospace' }}
          key={'column-' + optionIndex}
        >
          {Array.from({ length: cellsPerColumn }).map((_, value) => (
            <SliderCell
              key={'cell-' + value}
              rowIndex={rowIndex}
              selectedValue={row.value}
              value={optionIndex * cellsPerColumn + value}
              setSliderRowValue={props.setSliderRowValue}
              selection={props.selection}
            />
          ))}
        </td>
      ))}
    </tr>
  ))

  return (
    <table className="sliderTable">
      <thead>
        <tr>
          <td>&nbsp;</td>
          {optionHeaders}
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  )
}

export default SliderView
