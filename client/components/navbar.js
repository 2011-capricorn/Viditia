import React, {useState} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import {Backdrop, Fade, Modal} from '@material-ui/core'

import SignUpForm from './SignUpForm'
// import {logout} from '../store'

import './styles/navBar.css'

const Navbar = ({isLoggedIn}) => {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <div id="navBar">
        <h1>Viditia</h1>
        <nav id="nav">
          {isLoggedIn ? (
            <div>
              {/* The navbar will show these links after you log in */}
              <Link to="/home">Home</Link>
              <Link to="/create">Create Vidit</Link>
              {/* <a href="#" onClick={handleClick}>
            Logout
          </a> */}
            </div>
          ) : (
            <div>
              {/* The navbar will show these links before you log in */}
              <Link to="/login">Login</Link>
              {/* <button type="button" onClick={() => setOpen(true)}>
              Sign Up
            </button>
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              open={open}
              onClose={() => setOpen(false)}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={open}>
                <SignUpForm />
              </Fade>
            </Modal> */}

              <Link to="/signup">Sign Up</Link>
            </div>
          )}
        </nav>
      </div>
      <hr />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.userKey,
  }
}

const mapDispatch = (dispatch) => {
  // return {
  //   handleClick() {
  //     dispatch(logout())
  //   }
  // }
}

export default connect(mapState)(Navbar)
