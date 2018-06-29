import React, { Component } from 'react';
import { Link } from 'react-router-dom'; //navigate in app
import { connect } from "react-redux";
import { duplicateResume, deleteResume } from "../actions";

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
                <a onClick={() => {this.props.duplicateResume(this.props.id)}} className="item"> Duplicate resume </a>
                <a onClick={() => {this.props.deleteResume(this.props.id)}} className="item red"> Delete resume </a>
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

export default connect(null, { duplicateResume, deleteResume })(Card);
