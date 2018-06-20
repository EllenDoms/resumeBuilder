import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom'; //navigate in app
import { signOut } from "../actions";

import logo from '../img/logo2.png';

class Header extends Component {
  renderNav(type) {
    switch(type) {
      case 'signOut':
        return (
          <ul className="rightNav">
            <li><a onClick={() => {this.props.signOut()}}>Logout</a></li>
          </ul>
        )
      case 'close':
        return(
          <ul className="rightNav">
            <li><Link to={`/user`} className='material-icons'>close</Link></li>
          </ul>
        )
    }
  }
  render() {
    return(
      <div id="header">
        <div className="container">
          <img src={logo} alt='ResumePage Logo' />
          {this.renderNav(this.props.type)}
        </div>
      </div>
    )
  }
}

export default connect(null, { signOut })(Header);
