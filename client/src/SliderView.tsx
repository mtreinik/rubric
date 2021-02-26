import React, { useState } from 'react'
import { SelectionType, SliderRowType } from './types'
import SliderCell from './SliderCell'
import { Snackbar } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import { TFunction } from 'i18next'

interface Props {
  title: string
  options: string[]
  rows: SliderRowType[]
  setSliderRowValue: (rowIndex: number, value: number) => void
  selection: SelectionType
  t: TFunction
}

const SliderView = (props: Props): JSX.Element => {
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const t = props.t
  const optionHeaders = props.options.map((option, optionIndex) => (
    <td className="sliderHeaderCell" key={'option-' + optionIndex}>
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
              warnAboutSelection={() => setSnackbarOpen(true)}
            />
          ))}
        </td>
      ))}
    </tr>
  ))

  return (
    <div>
      <table className="sliderTable">
        <thead>
          <tr className="sliderHeaderRow">
            <td className="sliderHeaderHeader">
              <Snackbar
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
                open={snackbarOpen}
                autoHideDuration={4000}
                onClose={() => setSnackbarOpen(false)}
              >
                <Alert severity="info">{t('deselectBeforeUsingSlider')}</Alert>
              </Snackbar>
            </td>
            {optionHeaders}
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
      <br />
    </div>
  )
}

export default SliderView
