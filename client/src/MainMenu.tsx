import React, { ChangeEvent, MutableRefObject, useRef, useState } from 'react'
import {
  Button,
  Divider,
  Grid,
  Icon,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Snackbar,
} from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import { AppState, SectionType, Language, LanguageCode } from './types'
import { TFunction } from 'i18next'
import Ajv from 'ajv'
import rubricSchema from './rubricSchema.json'
import AlertDialog, { AlertDialogStateType } from './AlertDialog'
import DownloadDialog from './DownloadDialog'
import AcceptDialog from './AcceptDialog'

const ajv = new Ajv()

interface Props {
  appState: AppState
  language: string
  setSectionsAndCleanAppState: (sections: SectionType[]) => void
  toggleRubricEditor: () => void
  changeLanguage: (language: LanguageCode) => void
  cleanAppState: () => void
  t: TFunction
}

const languages: Language[] = [
  { code: 'fi', name: 'suomi' },
  { code: 'en', name: 'English' },
]

const closedAlertDialog: AlertDialogStateType = {
  open: false,
  title: '',
  message: '',
  details: '',
}

const MainMenu = (props: Props): JSX.Element => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const [alertDialogState, setAlertDialogState] = useState(closedAlertDialog)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [downloadDialogOpen, setDownloadDialogOpen] = useState(false)
  const [acceptNewDialogOpen, setAcceptNewDialogOpen] = useState(false)
  const [acceptOpenDialogOpen, setAcceptOpenDialogOpen] = useState(false)

  const t = props.t
  const uploaderRefObject = useRef() as MutableRefObject<HTMLInputElement>

  const openAlertDialog = (title: string, message: string, details: string) => {
    setAlertDialogState({ open: true, title, message, details })
  }

  const closeAlertDialog = () => {
    setAlertDialogState(closedAlertDialog)
  }

  const warnAndCloseMenu = (message: string, details = ''): void => {
    console.warn('Error opening rubric', message, details)
    openAlertDialog(t('errorOpeningRubric'), message, details.toString())
    setAnchorEl(null)
  }

  const uploadRubric = (event: ChangeEvent<HTMLInputElement>): void => {
    if (!event.target.files) {
      warnAndCloseMenu(t('noFileWasSelected'))
      return
    }
    const file = event.target.files.item(0)
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        if (!e || !e.target || !e.target.result) {
          warnAndCloseMenu(t('couldNotReadFile'))
          return
        }

        const data = e.target.result
        if (typeof data !== 'string') {
          warnAndCloseMenu(t('fileHasInvalidType'))
          return
        }

        try {
          const json = JSON.parse(data)
          const isValid = ajv.validate(rubricSchema, json)
          if (!isValid) {
            warnAndCloseMenu(t('invalidFileFormat'), ajv.errorsText())
            return
          }

          const sections = JSON.parse(data)
          props.setSectionsAndCleanAppState(sections)
          setAnchorEl(null)
          setSnackbarOpen(true)
        } catch (error) {
          let errorMessage = 'Unknown error'

          if (error instanceof Error) {
            errorMessage = error.message
          } else if (typeof error === 'string') {
            errorMessage = error
          }
          warnAndCloseMenu(t('invalidJSONFile'), errorMessage)
        }
      }
      reader.onerror = () => {
        warnAndCloseMenu(t('openingWasAborted'))
      }
      reader.readAsText(file)
    }
  }
  const createNewRubric = () => props.setSectionsAndCleanAppState([])

  return (
    <Grid container spacing={4} alignItems="center">
      <Grid item>
        <Button
          aria-owns={anchorEl ? 'simple-menu' : undefined}
          onClick={(event: React.MouseEvent<HTMLElement>) =>
            setAnchorEl(event.currentTarget)
          }
          startIcon={<Icon>menu</Icon>}
        >
          {t('menu')}
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
        >
          <MenuItem
            onClick={() => {
              if (props.appState.dirty) {
                setAcceptOpenDialogOpen(true)
              } else {
                uploaderRefObject.current.click()
              }
            }}
          >
            <ListItemIcon>
              <Icon>open_in_browser</Icon>
            </ListItemIcon>
            <ListItemText>{t('openRubric')}</ListItemText>
          </MenuItem>

          <MenuItem onClick={() => setDownloadDialogOpen(true)}>
            <ListItemIcon>
              <Icon>save_alt</Icon>
            </ListItemIcon>
            <ListItemText>{t('saveRubricEllipsis')}</ListItemText>
          </MenuItem>

          <MenuItem
            onClick={() => {
              if (props.appState.dirty) {
                setAcceptNewDialogOpen(true)
              } else {
                createNewRubric()
              }
              setAnchorEl(null)
            }}
          >
            <ListItemIcon>
              <Icon>add</Icon>
            </ListItemIcon>
            <ListItemText>{t('newRubric')}</ListItemText>
          </MenuItem>

          <Divider />

          <MenuItem
            onClick={() => {
              setAnchorEl(null)
              props.toggleRubricEditor()
            }}
          >
            <ListItemIcon>
              <Icon>
                {props.appState.showRubricEditor ? (
                  <Icon>close</Icon>
                ) : (
                  <Icon>edit</Icon>
                )}
              </Icon>
            </ListItemIcon>
            <ListItemText>
              {props.appState.showRubricEditor
                ? t('closeRubricEditor')
                : t('editRubric')}
            </ListItemText>
          </MenuItem>

          <Divider />

          <MenuItem disabled>
            <ListItemIcon>
              <Icon>language</Icon>
            </ListItemIcon>
            <ListItemText>{t('changeLanguage')}</ListItemText>
          </MenuItem>
          {languages.map((language) => (
            <MenuItem
              onClick={() => {
                props.changeLanguage(language.code)
                setAnchorEl(null)
              }}
              key={'language-' + language.code}
            >
              <ListItemIcon>
                {language.code}
                {language.code === props.language && <Icon>check</Icon>}
              </ListItemIcon>
              <ListItemText>{language.name}</ListItemText>
            </MenuItem>
          ))}
        </Menu>
        <DownloadDialog
          open={downloadDialogOpen}
          sections={props.appState.sections}
          closeDialogOnCancel={() => {
            setDownloadDialogOpen(false)
            setAnchorEl(null)
          }}
          closeDialogOnSave={() => {
            setDownloadDialogOpen(false)
            setAnchorEl(null)
            props.cleanAppState()
          }}
          t={t}
        />
        <AlertDialog
          dialogState={alertDialogState}
          closeDialog={closeAlertDialog}
          t={t}
        />
        <AcceptDialog
          open={acceptNewDialogOpen}
          title={t('discardChanges')}
          message={t('discardUnsavedChangesAndCreateNew')}
          cancelButtonKey="cancel"
          acceptButtonKey="discardAndCreateNew"
          closeDialogOnCancel={() => {
            setAcceptNewDialogOpen(false)
            setAnchorEl(null)
          }}
          closeDialogOnAccept={() => {
            setAcceptNewDialogOpen(false)
            setAnchorEl(null)
            createNewRubric()
          }}
          t={t}
        />
        <AcceptDialog
          open={acceptOpenDialogOpen}
          title={t('discardChanges')}
          message={t('discardUnsavedChangesAndOpen')}
          cancelButtonKey="cancel"
          acceptButtonKey="discardAndOpen"
          closeDialogOnCancel={() => {
            setAcceptOpenDialogOpen(false)
            setAnchorEl(null)
          }}
          closeDialogOnAccept={() => {
            setAcceptOpenDialogOpen(false)
            setAnchorEl(null)
            uploaderRefObject.current.click()
          }}
          t={t}
        />
        <input
          type="file"
          accept="text/json,.json"
          multiple={false}
          ref={uploaderRefObject}
          style={{ display: 'none' }}
          onChange={uploadRubric}
          onClick={(event: React.MouseEvent<HTMLInputElement>) =>
            (event.currentTarget.value = '')
          }
        />
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          open={snackbarOpen}
          autoHideDuration={4000}
          onClose={() => setSnackbarOpen(false)}
        >
          <Alert severity="success">{t('openedRubric')}</Alert>
        </Snackbar>
      </Grid>
      {props.appState.dirty && (
        <Grid item>
          <Button
            onClick={() => setDownloadDialogOpen(true)}
            startIcon={<Icon>save_alt</Icon>}
          >
            {t('saveChanges')}
          </Button>
        </Grid>
      )}
    </Grid>
  )
}

export default MainMenu
