import React, { ReactNode, useState } from 'react'
import { AppBar, Button, Icon, CssBaseline, Grid } from '@material-ui/core/'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import RubricEditor, { SectionType } from './RubricEditor'
import RubricView from './RubricView'
import * as O from 'optics-ts'

export type EditSectionType = (
  sectionIndex: number
) => (section: SectionType) => void

type RubricType = SectionType[]

const sectionPrism = (sectionIndex: number) =>
  O.optic<RubricType>().index(sectionIndex)

const newSectionSetter = O.optic<RubricType>().appendTo()

const emptyRubric: RubricType = []

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
    setRubric(
      O.set(newSectionSetter)({
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
      })(rubric)
    )
  }

  const removeSection = (sectionIndex: number): void => {
    setRubric(O.remove(sectionPrism(sectionIndex))(rubric))
  }

  const editSection = (sectionIndex: number) => (section: SectionType) => {
    setRubric(O.set(sectionPrism(sectionIndex))(section)(rubric))
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
                      startIcon={<Icon>content_copy</Icon>}
                    >
                      Valitse ja kopioi
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      onClick={unselectAll}
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
        </Grid>
      </ThemeProvider>
    </React.Fragment>
  )
}

export default App
