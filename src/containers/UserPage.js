import React, { Component } from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom'; //navigate in app
import { fetchResumes } from '../actions';
import { connect } from 'react-redux';


import Header from '../components/header';
import DropdownMenu from '../components/dropdownMenu';
import Loading from '../components/loading';


class UserPage extends Component {
  componentWillMount() {
    const { authenticated } = this.props;
    console.log('call fetchResumes')
    this.props.fetchResumes(authenticated.uid);
    console.log('userpage')
  }
  renderResumes() {
    return _.map(this.props.resumes, (resumes, id) => {
      return (
        <div className="resumeCard col" key={id}>
          <div className="cardHeader">
            <DropdownMenu />
            <h3>{resumes.resumeName}</h3>
          </div>
          <img className='demo' />
          <Link to={{ pathname: '/new', id: id }} className='btn btn-primary'>Edit resume</Link>
        </div>
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
        <Header />
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
  console.log(data)
  return {
    resumes: data.resumes,
    loading: data.loading
  };
}

export default connect( mapStateToProps, { fetchResumes } )(UserPage);
