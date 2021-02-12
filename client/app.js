import React from 'react'
import {Navbar} from './components'
import Routes from './routes'
import Landing from '../client/components/Landing'
import {createMuiTheme, ThemeProvider} from '@material-ui/core'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#8F7AA3',
    },
  },
})

const App = () => {
  return (
    <div>
      <Landing />
      <ThemeProvider theme={theme}>
        <Navbar />
        <Routes />
      </ThemeProvider>
    </div>
  )
}

export default App
