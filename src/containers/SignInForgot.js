import React, { Component } from "react";
import { connect } from "react-redux";
import { signInForgot } from "../actions";
import PropTypes from "prop-types";
import { Link } from 'react-router-dom'; //navigate in app

import logo from '../img/logoColor.png';


class Signin extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillUpdate(nextProps) {
    if (nextProps.auth) {
      console.log("Authenticated")
    }
  }
  formSubmit = (event) => {
    const email = event.target[0].value;
    this.props.signInForgot(email);
  }
  render() {
    return (
      <div id="SignInPage" className="builderCss">
        <div className="side">
          <Link to="/signin" id="close" className="material-icons">close</Link>
          <div className="container">
            <img src={logo} alt='ResumePage Logo' />
            <h2>Ohoh, forgot your password?</h2>
            <form onSubmit={this.formSubmit}>
              <div >
                <label>Email</label>
                <input type="email" />
              </div>
              <button className='btn btn-primary full-width'>Reset password</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, { signInForgot })(Signin);
