import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';
import reduxThunk from 'redux-thunk';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import { fetchUser } from "../actions";
import { connect } from "react-redux";

import '../style/index.css';
import "../style/builderCss.css";
import '../style/signIn.css';

import requireAuth from "./auth/requireAuth";
import ResumePage from '../containers/ResumePage';
import LandingsPage from '../containers/LandingsPage';
import ResumeNewPage from '../containers/ResumeNewPage';
import UserPage from '../containers/UserPage';
import SignInPage from '../containers/SignInPage';
import NotFound from './notFound';
import reducers from '../reducers';

const createStoreWithMiddleware = applyMiddleware(promise, reduxThunk)(createStore);

class App extends Component {
  componentWillMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <BrowserRouter>
        <div id='page'>
          <Switch>
            <Route exact path="/" component={LandingsPage} />
            <Route exact path="/notFound" component={NotFound} />
            <Route exact path="/user" component={requireAuth(UserPage)} />
            <Route exact path="/new" component={ResumeNewPage} />
            <Route exact path="/login" component={SignInPage} />
            <Route path="/resume/:id" component={ResumePage} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default connect(null, { fetchUser })(App)
