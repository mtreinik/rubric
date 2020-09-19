import React, { useState } from 'react'
import { createSeparatedReactNodes } from './react-utils'
import Clickable from './Clickable'
import { SelectionType } from './types'
import { Snackbar } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import { TFunction } from 'i18next'

interface Props {
  title: string
  options: string[]
  selection: SelectionType
  t: TFunction
}

const MultiSelectCriterionView = (props: Props): JSX.Element => {
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const t = props.t
  const clickables = createSeparatedReactNodes(
    props.options,
    (value, index) => (
      <Clickable
        key={'clickable-' + index}
        value={value}
        selection={props.selection}
        warnAboutSelection={() => setSnackbarOpen(true)}
      />
    ),
    (index) => <span key={'separator' + index}> / </span>
  )
  return (
    <div className="criterion">
      <span className="criterionTitle">{props.title}</span> {clickables}
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert severity="info">{t('deselectBeforeUsingMultiSelect')}</Alert>
      </Snackbar>
    </div>
  )
}

export default MultiSelectCriterionView
