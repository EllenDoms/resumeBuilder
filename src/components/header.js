import React, { Component } from 'react';
import { Link } from 'react-router-dom'; //navigate in app

import logo from '../img/logo2.png';

export default class Header extends Component {
  render() {
    return(
      <div id="header">
        <div className="container">
          <img src={logo} alt='ResumePage Logo' />
          <ul className="rightNav">
            <li><Link to={`/logout`}>Logout</Link></li>
          </ul>
        </div>
      </div>
    )
  }
}
