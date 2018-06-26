import React, { Component } from "react";
import { connect } from "react-redux";
import { signIn, signUpPass } from "../actions";
import PropTypes from "prop-types";
import { Link } from 'react-router-dom'; //navigate in app
import { Field, reduxForm } from 'redux-form';

import logo from '../img/logoColor.png';
import validate from './signUpValidate';
import { ShortField } from '../components/form';

class Signin extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillUpdate(nextProps) {
    if (nextProps.auth && nextProps.auth.email) {
      console.log("Authenticated")
      this.props.history.push('/user');
    }
  }
  formSubmit = (values) => {
    this.props.signUpPass(values);
  }
  render() {
    const { auth, error, handleSubmit } = this.props
    console.log(this.props)
    return (
      <div id="SignInPage" className="builderCss">
        <ul className='tabs'>
          <li><Link to="/signIn">Sign in</Link></li>
          <li className="active">Sign up</li>
        </ul>
        <div className="side">
          <div className="container">
            <img src={logo} alt='ResumePage Logo' />
            <h2>Always nice to make a new friend!</h2>
            <form onSubmit={handleSubmit(this.formSubmit)}>
              <Field name='email' label='Email' component={ShortField} type='text' />
              <Field name='password' label='Password' component={ShortField} type='password' />
              {auth && auth.error ? <span className="error">{auth.error}</span> : ""}
              <button className='btn btn-primary full-width'>Sign up</button>
            </form>
            <p className='center'>Or</p>
            <button href="#" className="btn full-width google social-signin" onClick={this.props.signIn}>
              <i className="fa fa-google social-signin-icon" />
              Sign up with Google
            </button>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default reduxForm({
  validate,
  form: 'signInForm',
})( connect(mapStateToProps, { signIn, signUpPass })(Signin));
