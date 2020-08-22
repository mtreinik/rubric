import * as React from 'react'
import {AppBar, Button, CssBaseline, Grid} from '@material-ui/core/'
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import Clickable from "./Clickable"

const theme = createMuiTheme({
  palette: {
    primary: {main: '#2e7d32'},
    secondary: {main: '#ff1744'}
  }
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
  document.execCommand("copy")
}

const App = () => {
  React.useEffect(() => {
    setSelectionEnabled(false)
  })

  return <React.Fragment>
    <CssBaseline/>
    <ThemeProvider theme={theme}>
      <AppBar position="static">
        TODO toolbar
      </AppBar>

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <h1>Rubric</h1>
        </Grid>
        <Grid item xs={12}>
          <div id="content">
            <div>&nbsp;</div>
            <div>
              <Clickable value="kiinnostava"/>
              <span> / </span>
              <Clickable value="omaperäinen"/>
            </div>
          </div>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={4}>
            <Grid item>
              <Button onClick={reload} variant="outlined" color="secondary">Tyhjennä</Button>
            </Grid>
            <Grid item>
              <Button onClick={unselectAll} variant="contained">Poista valinta</Button>
            </Grid>
            <Grid item>
              <Button onClick={selectElement('content')} variant="contained" color="primary">Valitse ja kopioi</Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  </React.Fragment>
}

export default App