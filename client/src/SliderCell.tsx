import React from 'react'
import { SelectionType } from './types'

interface Props {
  rowIndex: number
  selectedValue: number
  value: number
  setSliderRowValue: (rowIndex: number, value: number) => void
  selection: SelectionType
}

const selectedSymbol = '✖'
//const deselectedSymbol = '·'
const deselectedSymbol = <span>&nbsp;</span>

const SliderCell = (props: Props): JSX.Element => (
  <span
    className="sliderCell"
    onClick={() =>
      !props.selection &&
      (props.selectedValue === props.value
        ? props.setSliderRowValue(props.rowIndex, -1)
        : props.setSliderRowValue(props.rowIndex, props.value))
    }
  >
    {props.selectedValue === props.value ? selectedSymbol : deselectedSymbol}
  </span>
)

export default SliderCell
