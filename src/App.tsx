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

const App = () => {
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
          <Clickable value="kiinnostava"/>
          <span> / </span>
          <Clickable value="omaperäinen"/>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={4}>
            <Grid item><Button variant="outlined" color="secondary">Tyhjennä</Button></Grid>
            <Grid item><Button variant="contained">Poista valinta</Button></Grid>
            <Grid item><Button variant="contained" color="primary">Valitse ja kopioi</Button></Grid>
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  </React.Fragment>
}

export default App