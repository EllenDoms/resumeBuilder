import React, { Component } from 'react';
import { Link } from 'react-router-dom'; //navigate in app
import { connect } from "react-redux";
import { deleteResume } from "../actions";

import './dropdownMenu.css';

class Card extends Component {
  constructor() {
    super();
    this.state = { showMenu: false, }
  }
  showMenu = event => {
    event.preventDefault();
    this.setState({ showMenu: true }, () => {
      document.addEventListener('click', this.closeMenu);
    });
  }
  closeMenu = event => {
    if (this.dropdownMenu != null && !this.dropdownMenu.contains(event.target)) {
      this.setState({ showMenu: false }, () => {
        document.removeEventListener('click', this.closeMenu);
      });
    }
  }
  render() {
    return (
      <div className="dropdownMenu">
        <button onClick={this.showMenu} className="iconRight material-icons">
          more_horiz
        </button>

        {
          this.state.showMenu
            ? (
              <div className="menu" ref={(element) => {
                this.dropdownMenu = element;
              }}
              >
                <Link to={`resume/${this.props.id}`} target="_blank" className="item"> View resume </Link>
                <a className="item"> Duplicate resume (WIP) </a>
                <div onClick={() => {this.props.deleteResume(this.props.id)}} className="item"> Delete resume (WIP) </div>
              </div>
            )
            : (
              null
            )
        }
      </div>
    );
  }
}

export default connect(null, { deleteResume })(Card);
