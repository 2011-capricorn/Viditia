import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'

import {LoginForm, SignUpForm, UserHome, CreateVidit} from './components'
import {getUserThunk} from './store/user'
import SignUpVidit from './components/SignUpVidit'
import SurveyInput from './components/SurveyInput'
import singleVidit from './components/singleVidit'

class Routes extends Component {
  componentDidMount() {
    this.props.getUser()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/login" component={LoginForm} />
        <Route path="/signup" component={SignUpForm} />
        {/* <Route path="/test" component={SignUpVidit} /> */}
        {/* <Route path="/seed" component={SurveyInput} /> */}
        <Route path="/vidit" component={singleVidit} />
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/home" component={UserHome} />
            <Route path="/create" component={CreateVidit} />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={SignUpForm} />
      </Switch>
    )
  }
}

const mapState = (state) => ({
  isLoggedIn: !!state.user.userKey,
})

const mapDispatch = (dispatch) => ({getUser: () => dispatch(getUserThunk())})

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))
