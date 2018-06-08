import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';
import reduxThunk from 'redux-thunk';
import { HashRouter as Router, Route } from 'react-router-dom';
import { fetchUser } from "./actions";
import { connect } from "react-redux";

import requireAuth from "./components/auth/requireAuth";
import ResumePage from './containers/ResumePage';
import LandingsPage from './containers/LandingsPage';
import ResumeNewPage from './containers/ResumeNewPage';
import SignInPage from './containers/SignInPage';
import NotFound from './components/notFound';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(promise, reduxThunk)(createStore);

class App extends Component {
  componentWillMount() {
    console.log('test')
    this.props.fetchUser();
  }

  render() {
    return (
      <Router>
        <div id='page'>
          <Route exact path="/" component={LandingsPage} />
          <Route exact path="/notFound" component={NotFound} />
          <Route exact path="/new" component={requireAuth(ResumeNewPage)} />
          <Route exact path="/login" component={SignInPage} />
          <Route path="/resume/:id" component={ResumePage} />
        </div>
      </Router>
    );
  }
}

export default connect(null, { fetchUser })(App);
