import React from 'react'
import { SelectionType } from './types'

interface Props {
  rowIndex: number
  selectedValue: number
  value: number
  setSliderRowValue: (rowIndex: number, value: number) => void
  selection: SelectionType
  warnAboutSelection: () => void
}

const selectedSymbol = '✖'

// alternate deselectedSymbol for testing: '·'
const deselectedSymbol = <span>&nbsp;</span>

const SliderCell = (props: Props): JSX.Element => (
  <span
    className="sliderCell"
    onClick={() => {
      if (props.selection) {
        props.warnAboutSelection()
      } else {
        props.selectedValue === props.value
          ? props.setSliderRowValue(props.rowIndex, -1)
          : props.setSliderRowValue(props.rowIndex, props.value)
      }
    }}
  >
    {props.selectedValue === props.value ? selectedSymbol : deselectedSymbol}
  </span>
)

export default SliderCell
