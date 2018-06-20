import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';
import reduxThunk from 'redux-thunk';
import { HashRouter, Route, Switch} from 'react-router-dom';
import { fetchUser } from "../actions";
import { connect } from "react-redux";

import '../style/index.css';
import "../style/builderCss.css";
import '../style/signIn.css';

import requireAuth from "./auth/requireAuth";
import ResumePage from '../containers/ResumePage';
import LandingsPage from '../containers/LandingsPage';
import ResumeFormPage from '../containers/ResumeFormPage';
import UserPage from '../containers/UserPage';
import SignInPage from '../containers/SignInPage';
import NotFound from './notFound';
import reducers from '../reducers';

const createStoreWithMiddleware = applyMiddleware(promise, reduxThunk)(createStore);

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
            <Route exact path="/user" component={requireAuth(UserPage)} />
            <Route exact path="/new" component={requireAuth(ResumeFormPage)} />
            <Route exact path="/login" component={SignInPage} />
            <Route path="/resume/:id" component={ResumePage} />
          </Switch>
        </div>
      </HashRouter>
    )
  }
}

export default connect(null, { fetchUser })(App);
