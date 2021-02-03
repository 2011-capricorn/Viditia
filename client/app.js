import React from 'react'
import {render} from 'react-dom'
import {Navbar} from './components'
import Routes from './routes'

// import Header from './components/Header'
// import SideDrawer from './components/SideDrawer'

const App = () => {
  return (
    <div>
      {/* <Header /> */}
      {/* <SideDrawer /> */}
      <Navbar />
      <Routes />
    </div>
  )
}

export default App
