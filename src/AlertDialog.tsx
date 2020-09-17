import React from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Icon,
} from '@material-ui/core'
import { TFunction } from 'i18next'

export interface AlertDialogStateType {
  open: boolean
  title: string
  message: string
  details: string
}

interface Props {
  dialogState: AlertDialogStateType
  closeDialog: () => void
  t: TFunction
}

const AlertDialog = (props: Props): JSX.Element => {
  const t = props.t

  return (
    <Dialog
      open={props.dialogState.open}
      onClose={props.closeDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        <Icon fontSize="small">error</Icon> {props.dialogState.title}
      </DialogTitle>
      <DialogContent>
        <div style={{ fontSize: 'large' }}>{props.dialogState.message}</div>
        <div style={{ fontFamily: 'Monospace', marginTop: '1em' }}>
          {props.dialogState.details}
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.closeDialog} color="primary" autoFocus>
          {t('ok')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AlertDialog
