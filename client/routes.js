import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import LineChart from './components/LineChart'

import {
  LoginForm,
  SignUpForm,
  UserHome,
  CreateVidit,
  SingleVidit,
  ChartVoting,
  AllVidits,
  Feedback,
  LoadingScreen,
  ErrorPage,
} from './components'
import {getUserThunk} from './store/user'
import {getAllViditThunk} from './store/vidit'

class Routes extends Component {
  componentDidMount() {
    this.props.getUser()
    this.props.getVidits()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        <Route exact path="/" component={AllVidits} />
        <Route exact path="/vidits" component={AllVidits} />
        <Route path="/lc" component={LineChart} />
        <Route path="/loading" component={LoadingScreen} />
        <Route path="/feedback" component={Feedback} />
        <Route path="/login" component={LoginForm} />
        <Route path="/signup" component={SignUpForm} />
        <Route path="/error" component={ErrorPage} />
        {!isLoggedIn && <Route path="/vidit/:id" component={SignUpForm} />}
        {/* <Route path="/test" component={SignUpVidit} /> */}
        {/* <Route path="/seed" component={SurveyInput} /> */}
        {isLoggedIn && (
          <Switch>
            <Route path="/create" component={CreateVidit} />
            <Route path="/vidit/:id" component={SingleVidit} />
          </Switch>
        )}
        <Route path="/home" component={UserHome} />
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
