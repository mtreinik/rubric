import * as React from 'react'
import { AppBar, Button, CssBaseline, Grid } from '@material-ui/core/'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import Clickable from './Clickable'
import { ReactNode } from 'react'
import { createSeparatedReactNodes } from './react-utils'

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
  React.useEffect(() => {
    setSelectionEnabled(false)
  })

  const clickables = createSeparatedReactNodes(
    ['erinomainen', 'kiitettävä', 'hyvä', 'tyydyttävä', 'välttävä', 'heikko'],
    (value) => <Clickable key={value} value={value} />,
    (index) => <span key={'separator' + index}> / </span>
  )

  return (
    <React.Fragment>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <AppBar position="static">TODO toolbar</AppBar>

        <Grid container spacing={4}>
          <Grid item xs={12}>
            <h1>Rubric</h1>
          </Grid>
          <Grid item xs={12}>
            <div id="content">
              <div className="sectionTitle">OSIO A: KANSILEHTI</div>
              <div className="criterion">
                <span className="criterionTitle">otsikointi</span>
                <span> </span>
                {clickables}
              </div>
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
                <Button onClick={reload} variant="outlined" color="secondary">
                  Tyhjennä
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </ThemeProvider>
    </React.Fragment>
  )
}

export default App
