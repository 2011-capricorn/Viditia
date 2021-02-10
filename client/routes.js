import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'

import {
  HomePage,
  LoginForm,
  SignUpForm,
  UserProfile,
  CreateVidit,
  SingleVidit,
  AllVidits,
  Feedback,
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
        <Route path="/home" component={HomePage} />
        <Route path="/login" component={LoginForm} />
        <Route path="/signup" component={SignUpForm} />
        <Route path="/feedback" component={Feedback} />
        {!isLoggedIn && <Route path="/vidit/:id" component={LoginForm} />}
        {isLoggedIn && (
          <Switch>
            <Route path="/vidit/:id" component={SingleVidit} />
            <Route path="/create" component={CreateVidit} />
            <Route path="/profile" component={UserProfile} />
          </Switch>
        )}
        <Route component={ErrorPage} />
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

export default withRouter(connect(mapState, mapDispatch)(Routes))
