import React, { useState } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Link,
  TextField,
} from '@material-ui/core'
import { TFunction } from 'i18next'
import { SectionType } from './types'

interface Props {
  open: boolean
  sections: SectionType[]
  closeDialogAfterCancel: () => void
  closeDialogAfterSave: () => void
  t: TFunction
}

const DownloadDialog = (props: Props): JSX.Element => {
  const [filename, setFilename] = useState('rubriikki')
  const t = props.t
  const extension = '.json'
  const handleFilenameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setFilename(event.target.value)
  }

  return (
    <Dialog open={props.open}>
      <DialogTitle>{t('saveRubric')}</DialogTitle>
      <DialogContent>
        <Grid container alignItems="flex-end">
          <Grid item>
            <TextField
              value={filename}
              label={t('filename')}
              onChange={handleFilenameChange}
            />
          </Grid>
          <Grid item>{extension}</Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.closeDialogAfterCancel}>{t('cancel')}</Button>
        <Button
          color="primary"
          component={Link}
          href={
            'data:text/json;charset=utf-8,' +
            encodeURIComponent(JSON.stringify(props.sections, null, 2))
          }
          download={filename + extension}
          onClick={props.closeDialogAfterSave}
        >
          {t('save')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DownloadDialog
