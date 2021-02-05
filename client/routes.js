import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'

import {LoginForm, SignUpForm, UserHome, CreateVidit} from './components'
import {getUserThunk} from './store/user'
import {getAllViditThunk} from './store/vidit'
import SignUpVidit from './components/SignUpVidit'
import SurveyInput from './components/SurveyInput'
import singleVidit from './components/singleVidit'
import ChartVoting from './components/ChartVoting'
import AllVidits from './components/AllVidits'
import ErrorPage from './components/ErrorPage'

class Routes extends Component {
  componentDidMount() {
    this.props.getUser()
    this.props.getVidits()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/" component={AllVidits} />
        <Route path="/login" component={LoginForm} />
        <Route path="/signup" component={SignUpForm} />
        <Route path="/error" component={ErrorPage} />
        {/* <Route path="/test" component={SignUpVidit} /> */}
        {/* <Route path="/seed" component={SurveyInput} /> */}
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route exact path="/" component={AllVidits} />
            <Route path="/home" component={UserHome} />
            <Route path="/create" component={CreateVidit} />
            <Route path="/vidit/:id" component={singleVidit} />
            <Route path="/chartVoting" component={ChartVoting} />
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

const mapDispatch = (dispatch) => ({
  getUser: () => dispatch(getUserThunk()),
  getVidits: () => dispatch(getAllViditThunk()),
})

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))
