import React, { Component } from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom'; //navigate in app
import { fetchResumes } from '../actions';
import { connect } from 'react-redux';

import logo from '../img/logo2.png';
import DropdownMenu from '../components/dropdownMenu';
import Loading from '../components/loading';


class UserPage extends Component {
  componentWillMount() {
    const { authenticated } = this.props;
    this.props.fetchResumes(authenticated.uid);
  }
  renderResumes() {
    return _.map(this.props.data, (resume, id) => {
      return (
        <a href={`/resume/${id}`} className="resumeCard col" key={id}>
          <div className="cardHeader">
            <DropdownMenu />
            <h3>{resume.name}</h3>
          </div>
          <img className='demo' />
          <button href="#" className='btn btn-primary'>Edit resume</button>
        </a>
      )
    })
  }
  render() {
    const { data, loading, notFound } = this.props;
    if (loading) {
      return <Loading />;
    }
    return(
      <div className='builderCss'>
        <div id="header">
          <div className="container">
            <img src={logo} />
            <ul className="rightNav">
              <li><Link to={`/logout`}>Logout</Link></li>
            </ul>
          </div>
        </div>
        <div id="welcome">
          <h2 className="fontsforweb_bignoodletitling center white">Hello {this.props.authenticated.displayName}!</h2>
          <div className="container">
            <div className="appQuote"><p>Did you know that the average time spent by recruiters looking at a resume is only 5 to 7 seconds?</p></div>
          </div>
        </div>
        <div id="pageContent">
          <div className="container flex-grid">
            <div id="newCard" className="col">
              Add new Resume!
            </div>
            {this.renderResumes()}
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps({data}) {
  return {
    data,
    loading: data.loading
  };
}

export default connect( mapStateToProps, { fetchResumes } )(UserPage);
