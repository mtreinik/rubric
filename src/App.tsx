import React, { ReactNode, useState } from 'react'
import { AppBar, Button, CssBaseline, Grid } from '@material-ui/core/'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import RubricEditor, { SectionType } from './RubricEditor'
import RubricView from './RubricView'

export type EditSectionType = (
  sectionIndex: number
) => (section: SectionType) => void

const emptyRubric: SectionType[] = []

const theme = createMuiTheme({
  palette: {
    primary: { main: '#2e7d32' },
    secondary: { main: '#ff1744' },
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

  const addSection = (): void => {
    const newRubric = [
      ...rubric,
      {
        title: `OSION ${rubric.length + 1} OTSIKKO`,
        criterionContainers: [
          {
            type: 'MultiSelectCriterion',
            criterion: {
              title: 'Kriteeri',
              options: ['valinta', 'toinen valinta', 'kolmas valinta'],
            },
          },
        ],
      },
    ]
    setRubric(newRubric)
  }

  const removeSection = (sectionIndex: number): void => {
    const newRubric = rubric.slice()
    newRubric.splice(sectionIndex, 1)
    setRubric(newRubric)
  }

  const editSection = (sectionIndex: number) => (section: SectionType) => {
    const newRubric = rubric.slice()
    const newSection = { ...rubric[sectionIndex], ...section }
    newRubric[sectionIndex] = newSection
    setRubric(newRubric)
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <AppBar position="static">TODO toolbar</AppBar>
        <Grid container direction="row" spacing={2}>
          <Grid item xs={6}>
            <RubricEditor
              rubric={rubric}
              addSection={addSection}
              removeSection={removeSection}
              editSection={editSection}
            />
          </Grid>
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
                      onClick={selectElement('content')}
                      variant="contained"
                      color="primary"
                    >
                      Valitse ja kopioi
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button onClick={unselectAll} variant="contained">
                      Poista valinta
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      onClick={reload}
                      variant="outlined"
                      color="secondary"
                    >
                      Tyhjennä
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </ThemeProvider>
    </React.Fragment>
  )
}

export default App
