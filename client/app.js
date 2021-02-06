import React from 'react'
import {render} from 'react-dom'
import {Navbar} from './components'
import Routes from './routes'
import Landing from '../client/components/Landing'

// import Header from './components/Header'
// import SideDrawer from './components/SideDrawer'

const App = () => {
  return (
    <div>
      {/* <Header /> */}
      {/* <SideDrawer /> */}
      <Landing />
      <Navbar />
      <Routes />
    </div>
  )
}

export default App
