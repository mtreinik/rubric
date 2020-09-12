import React, { ReactNode, useEffect, useState } from 'react'
import { Button, Icon, Link, CssBaseline, Grid } from '@material-ui/core/'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import RubricEditor from './RubricEditor'
import RubricView from './RubricView'
import * as O from 'optics-ts'
import { AppState, SectionType, SelectionType } from './types'

const emptyAppState: AppState = {
  sections: [],
  selection: null,
}

const rubricSelectionLens = O.optic<AppState>().prop('selection')

const sectionsLens = O.optic<AppState>().prop('sections')

const sectionPrism = (sectionIndex: number) => sectionsLens.index(sectionIndex)

const newSectionSetter = O.optic<AppState>().prop('sections').appendTo()

const theme = createMuiTheme({
  palette: {
    primary: { main: '#2e7d32' },
    secondary: { main: '#ff1744' },
    background: { default: '#ffffff' },
  },
})

const reload = () => {
  document.location.reload()
}

const setSelectionEnabled = (enabled: boolean) => {
  const elementId = 'content'
  const element = document.getElementById(elementId)
  if (!element) {
    console.error('could not get element', elementId)
    return
  }
  element.className = enabled ? '' : 'noselect'
}

const unselectAll = () => {
  const selection = window.getSelection()
  if (!selection) {
    return
  }
  selection.removeAllRanges()
  setSelectionEnabled(false)
}

const selectElement = (elementId: string) => () => {
  const element = document.getElementById(elementId)
  if (!element) {
    console.error('could not get element', elementId)
    return
  }
  const range = document.createRange()
  range.selectNodeContents(element)
  const selection = window.getSelection()
  if (!selection) {
    return
  }
  selection.removeAllRanges()
  setSelectionEnabled(true)
  selection.addRange(range)
  document.execCommand('copy')
}

const App = (): ReactNode => {
  const [appState, setAppState] = useState(emptyAppState)

  React.useEffect(() => {
    setSelectionEnabled(false)
  })

  const addSection = (): void => {
    setAppState(
      O.set(newSectionSetter)({
        title: `OSION ${appState.sections.length + 1} OTSIKKO`,
        criterions: [],
      })(appState)
    )
  }

  const removeSection = (sectionIndex: number): void => {
    setAppState(O.remove(sectionPrism(sectionIndex))(appState))
  }

  const editSection = (sectionIndex: number) => (section: SectionType) => {
    setAppState(O.set(sectionPrism(sectionIndex))(section)(appState))
  }

  const setSelection = (selection: SelectionType) => {
    setAppState(O.set(rubricSelectionLens)(selection)(appState))
  }

  useEffect(() => {
    if (appState.selection === 'deselect') {
      unselectAll()
      setSelection(null)
    } else if (appState.selection === 'select') {
      selectElement('content')()
    }
  }, [appState.selection])

  return (
    <React.Fragment>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Grid container direction="row" spacing={2}>
          <Grid item xs={6}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <div id="content">
                  <RubricView
                    sections={appState.sections}
                    selection={appState.selection}
                  />
                </div>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={4}>
                  <Grid item>
                    <Button
                      onClick={() => setSelection('select')}
                      variant="contained"
                      color="primary"
                      startIcon={<Icon>content_copy</Icon>}
                    >
                      Valitse ja kopioi
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      onClick={() => setSelection('deselect')}
                      variant="contained"
                      startIcon={<Icon>clear</Icon>}
                    >
                      Poista valinta
                    </Button>
                  </Grid>
                  <Grid item>
                    <Link
                      href={
                        'data:text/json;charset=utf-8,' +
                        encodeURIComponent(
                          JSON.stringify(appState.sections, null, 2)
                        )
                      }
                      download="rubric.json"
                    >
                      Lataa
                    </Link>
                  </Grid>
                  <Grid item>
                    <Button
                      onClick={reload}
                      variant="outlined"
                      color="secondary"
                      startIcon={<Icon>delete_forever</Icon>}
                    >
                      Tyhjennä
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <RubricEditor
              sections={appState.sections}
              addSection={addSection}
              removeSection={removeSection}
              editSection={editSection}
            />
          </Grid>
        </Grid>
      </ThemeProvider>
    </React.Fragment>
  )
}

export default App
