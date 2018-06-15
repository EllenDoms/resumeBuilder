import React, { Component } from 'react';
import { Link } from 'react-router-dom'; //navigate in app

import logo from '../img/logo2.png';

export default class Header extends Component {
  renderNav(type) {
    switch(type) {
      case 'logout':
        return (
          <ul className="rightNav">
            <li><Link to={`/logout`}>Logout</Link></li>
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
