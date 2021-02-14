import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch, Redirect} from 'react-router-dom'

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
    return (
      <Switch>
        <Redirect exact from="/" to="/vidits" />
        <Route exact path="/vidits" component={AllVidits} />
        <Route path="/home" component={HomePage} />
        <Route path="/login" component={LoginForm} />
        <Route path="/signup" component={SignUpForm} />
        <Route path="/feedback" component={Feedback} />
        <Route path="/vidit/:id" component={SingleVidit} />
        <Route path="/create" component={CreateVidit} />
        <Route path="/profile" component={UserProfile} />
        <Route component={ErrorPage} />
      </Switch>
    )
  }
}

const mapDispatch = (dispatch) => ({
  getUser: () => dispatch(getUserThunk()),
  getVidits: () => dispatch(getAllViditThunk()),
})

export default withRouter(connect(null, mapDispatch)(Routes))
