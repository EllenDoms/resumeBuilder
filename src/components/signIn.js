import React, { Component } from "react";
import { connect } from "react-redux";
import { signIn } from "../actions";
import PropTypes from "prop-types";
import '../style/index.css';
import '../style/signIn.css';

class Signin extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillUpdate(nextProps) {
    if (nextProps.auth) {
      this.context.router.history.push("/");
    }
  }

  render() {
    return (
      <div id="SignInPage">
        <div className="modal">
          <h2>Sign in first!</h2>
          <p>Before we let you build your own online resume with our tool, we ask you to log in with your google account.</p>
          <a href="#" className="social-signin" onClick={this.props.signIn}>
            <i className="fa fa-google social-signin-icon" />
            Sign In With Google
          </a>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, { signIn })(Signin);
