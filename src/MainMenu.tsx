import React, { ChangeEvent, MutableRefObject, useRef, useState } from 'react'
import {
  Button,
  Divider,
  Icon,
  Link,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from '@material-ui/core'
import { AppState, SectionType, Language, LanguageCode } from './types'
import { TFunction } from 'i18next'

interface Props {
  appState: AppState
  language: string
  setSections: (sections: SectionType[]) => void
  toggleRubricEditor: () => void
  changeLanguage: (language: LanguageCode) => void
  t: TFunction
}

const languages: Language[] = [
  { code: 'fi', name: 'suomi' },
  { code: 'en', name: 'English' },
]

const MainMenu = (props: Props): JSX.Element => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const t = props.t
  const uploaderRefObject = useRef() as MutableRefObject<HTMLInputElement>

  const uploadRubric = (event: ChangeEvent<HTMLInputElement>): void => {
    if (!event.target.files) {
      console.warn(`File to upload was not specified`)
      return
    }
    const file = event.target.files.item(0)
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        if (!e || !e.target || !e.target.result) {
          console.warn('Could not read uploaded file')
          return
        }
        const data = e.target.result
        if (typeof data !== 'string') {
          console.warn('Could not parse uploaded file')
          return
        }
        // TODO add validation here
        const sections = JSON.parse(data)
        props.setSections(sections)
        setAnchorEl(null)
      }
      reader.readAsText(file)
    }
  }

  return (
    <div>
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

        <MenuItem onClick={() => uploaderRefObject.current.click()}>
          <ListItemIcon>
            <Icon>open_in_browser</Icon>
          </ListItemIcon>
          <ListItemText>
            <input
              type="file"
              accept="text/json"
              multiple={false}
              ref={uploaderRefObject}
              style={{ display: 'none' }}
              onChange={uploadRubric}
            />
            {t('openRubric')}
          </ListItemText>
        </MenuItem>

        <MenuItem
          component={Link}
          href={
            'data:text/json;charset=utf-8,' +
            encodeURIComponent(JSON.stringify(props.appState.sections, null, 2))
          }
          download="rubric.json"
          color="textPrimary"
        >
          <ListItemIcon>
            <Icon>save_alt</Icon>
          </ListItemIcon>
          <ListItemText>{t('saveRubric')}</ListItemText>
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
    </div>
  )
}

export default MainMenu
