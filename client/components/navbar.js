import React, {useState} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import HomeIcon from '@material-ui/icons/Home'
import PollIcon from '@material-ui/icons/Poll'
import AccountBoxIcon from '@material-ui/icons/AccountBox'
import AddBoxIcon from '@material-ui/icons/AddBox'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import VpnKeyIcon from '@material-ui/icons/VpnKey'
import FeedbackIcon from '@material-ui/icons/Feedback'

import './styles/navBar.css'
import {logoutThunk} from '../store/user'

const Navbar = ({isLoggedIn, logout}) => {
  const [open, setOpen] = useState(false)

  const handleLink = (text) => {
    if (text === 'Home') return '/home'
    if (text === 'Vidits') return '/vidits'
    if (text === 'Profile') return '/profile'
    if (text === 'Create Vidit!') return '/create'
    if (text === 'Logout') return '/login'
  }

  return (
    <div className="navBar flex jcb aic">
      <MenuIcon onClick={() => setOpen(true)} />
      <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
        <div id="drawer">
          <div id="drawer-header">
            <Divider />
          </div>
          <List>
            {['Home', 'Vidits'].map((text, index) => (
              <Link key={text} to={handleLink(text)} id="no-style-anchor">
                <ListItem button onClick={() => setOpen(false)}>
                  <ListItemIcon>
                    {index % 2 === 0 ? <HomeIcon /> : <PollIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              </Link>
            ))}
            <Link to="/feedback" id="no-style-anchor">
              <ListItem button onClick={() => setOpen(false)}>
                <ListItemIcon>
                  <FeedbackIcon />
                </ListItemIcon>
                <ListItemText primary="Feedback" />
              </ListItem>
            </Link>
          </List>
          <br />
          <br />
          <Divider />
          {isLoggedIn ? (
            <List>
              {['Profile', 'Create Vidit!', 'Logout'].map((text) => (
                <Link key={text} to={handleLink(text)} id="no-style-anchor">
                  <ListItem
                    button
                    onClick={() => {
                      if (text === 'Logout') logout()
                      setOpen(false)
                    }}
                  >
                    <ListItemIcon>
                      {text === 'Profile' && <AccountBoxIcon />}
                      {text === 'Create Vidit!' && <AddBoxIcon />}
                      {text === 'Logout' && <ExitToAppIcon />}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItem>
                </Link>
              ))}
            </List>
          ) : (
            <Link to="/login" id="no-style-anchor">
              <ListItem button onClick={() => setOpen(false)}>
                <ListItemIcon>
                  <VpnKeyIcon />
                </ListItemIcon>
                <ListItemText primary="Login" />
              </ListItem>
            </Link>
          )}
        </div>
      </Drawer>
      <Link to="/" id="no-style-anchor" style={{textDecoration: 'none'}}>
        <p id="logo">Viditia</p>
      </Link>
    </div>
  )
}

const mapState = (state) => ({
  isLoggedIn: !!state.user.userKey,
})

const mapDispatch = (dispatch) => ({
  logout: () => dispatch(logoutThunk()),
})

export default connect(mapState, mapDispatch)(Navbar)
