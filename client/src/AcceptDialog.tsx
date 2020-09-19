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

interface Props {
  open: boolean
  title: string
  message: string
  cancelButtonKey: string
  acceptButtonKey: string
  closeDialogOnCancel: () => void
  closeDialogOnAccept: () => void
  t: TFunction
}

const AcceptDialog = (props: Props): JSX.Element => {
  const t = props.t

  return (
    <Dialog
      open={props.open}
      onClose={props.closeDialogOnCancel}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        <Icon fontSize="small">error</Icon> {props.title}
      </DialogTitle>
      <DialogContent>
        <div style={{ fontSize: 'large' }}>{props.message}</div>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.closeDialogOnCancel} color="inherit" autoFocus>
          {t(props.cancelButtonKey)}
        </Button>
        <Button
          type="submit"
          onClick={props.closeDialogOnAccept}
          color="primary"
          autoFocus
        >
          {t(props.acceptButtonKey)}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AcceptDialog
