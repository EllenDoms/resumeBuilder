import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';
import reduxThunk from 'redux-thunk';
import { browserHistory } from 'react-router';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { fetchUser } from "../actions";
import { connect } from "react-redux";

import '../style/index.css';
import "../style/builderCss.css";

import requireAuth from "./auth/requireAuth";
import ResumePage from '../containers/ResumePage';
import LandingsPage from '../containers/LandingsPage';
import ResumeFormPage from '../containers/ResumeFormPage';
import UserPage from '../containers/UserPage';
import SignUpPage from '../containers/SignUpPage';
import SignInPage from '../containers/SignInPage';
import SignInForgot from '../containers/SignInForgot';
import NotFound from './notFound';
import reducers from '../reducers';

export class App extends Component {
  componentWillMount() {
    this.props.fetchUser();
  }

  render() {

    return (
      <HashRouter>
        <div id='page'>
          <Switch>
            <Route exact path="/" component={LandingsPage} />
            <Route exact path="/notFound" component={NotFound} />
            <Route exact path="/signin" component={SignInPage} />
            <Route exact path="/signup" component={SignUpPage} />
            <Route exact path="/signinforgot" component={SignInForgot} />
            <Route exact path="/user" component={requireAuth(UserPage)} />
            <Route path="/edit/:id" component={requireAuth(ResumeFormPage)} />
            <Route path="/resume/:id" component={ResumePage} />
          </Switch>
        </div>
      </HashRouter>
    )
  }
}

export default connect(null, { fetchUser })(App);
