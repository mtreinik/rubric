import React, { ReactNode, useEffect, useState } from 'react'
import { Button, Icon, CssBaseline, Grid } from '@material-ui/core/'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import RubricEditor from './RubricEditor'
import RubricView from './RubricView'
import * as O from 'optics-ts'
import { RubricType, SectionType, SelectionType } from './types'

const emptyRubric: RubricType = {
  title: 'Rubriikin otsikko',
  sections: [],
  selection: null,
}

const rubricTitleLens = O.optic<RubricType>().prop('title')

const rubricSelectionLens = O.optic<RubricType>().prop('selection')

const sectionsLens = O.optic<RubricType>().prop('sections')

const sectionPrism = (sectionIndex: number) => sectionsLens.index(sectionIndex)

const newSectionSetter = O.optic<RubricType>().prop('sections').appendTo()

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
  const [rubric, setRubric] = useState(emptyRubric)

  React.useEffect(() => {
    setSelectionEnabled(false)
  })

  const editTitle = (title: string) => {
    setRubric(O.set(rubricTitleLens)(title)(rubric))
  }

  const addSection = (): void => {
    setRubric(
      O.set(newSectionSetter)({
        title: `OSION ${rubric.sections.length + 1} OTSIKKO`,
        criterionContainers: [],
      })(rubric)
    )
  }

  const removeSection = (sectionIndex: number): void => {
    setRubric(O.remove(sectionPrism(sectionIndex))(rubric))
  }

  const editSection = (sectionIndex: number) => (section: SectionType) => {
    setRubric(O.set(sectionPrism(sectionIndex))(section)(rubric))
  }

  const setSelection = (selection: SelectionType) => {
    setRubric(O.set(rubricSelectionLens)(selection)(rubric))
  }

  useEffect(() => {
    if (rubric.selection === 'deselect') {
      unselectAll()
      setSelection(null)
    } else if (rubric.selection === 'select') {
      selectElement('content')()
    }
  }, [rubric])

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
                  <RubricView rubric={rubric} />
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
              rubric={rubric}
              editTitle={editTitle}
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
