import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export default function(ComposedComponent) {
  class Authentication extends Component {
    static contextTypes = {
      router: PropTypes.object
    };

    componentWillMount() {
      if (this.props.authenticated === null) {
        console.log("Mount not authenticated")
        this.context.router.history.push("/login");
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.authenticated) {
        console.log("Logging out")
        this.context.router.history.push("/");
      }
    }

    render() {
      if (this.props.authenticated) {
        console.log("Render authenticated")
        return <ComposedComponent {...this.props} />;
      }
      return null;
    }
  }

  function mapStateToProps(state) {
    return { authenticated: state.auth };
  }

  return connect(mapStateToProps)(Authentication);
}
