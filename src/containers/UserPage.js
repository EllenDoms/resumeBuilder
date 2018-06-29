import React, { Component } from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom'; //navigate in app
import { fetchUserResumes } from '../actions';
import { connect } from 'react-redux';


import Header from '../components/header';
import DropdownMenu from '../components/dropdownMenu';
import Loading from '../components/loading';


class UserPage extends Component {
  componentWillMount() {
    const { authenticated } = this.props;
    this.props.fetchUserResumes(authenticated.uid);
  }
  renderResumes() {
    return _.map(this.props.resumes, (resumes, id) => {
      if(resumes.status == "active") {
        return (
          <div className="resumeCard col" key={id}>
            <div className="cardHeader">
              <DropdownMenu id={id} />
              <h3>{resumes.name}</h3>
            </div>
            <img className='demo' />
            <Link to={`/edit/${id}`} className='btn btn-primary'>Edit resume</Link>
          </div>
        )
      }
    })
  }
  render() {
    const { data, loading, notFound } = this.props;
    if (loading) {
      return <Loading />;
    }
    return(
      <div className='builderCss'>
        <Header type='signOut' />
        <div id="welcome">
          <h2 className="fontsforweb_bignoodletitling center white">Hello {this.props.authenticated.displayName}!</h2>
          <div className="container">
            <div className="appQuote"><p>Did you know that the average time spent by recruiters looking at a resume is only 6 seconds?</p></div>
          </div>
        </div>
        <div id="pageContent" className='longHeader'>
          <div className="container flex-grid">
            <div id="newCard" className="col">
              <Link to={`/edit/new`}>
                Add new Resume!
              </Link>
            </div>
            {this.renderResumes()}
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  console.log(state)
  return {
    resumes: state.data.resumes,
    loading: state.data.loading
  };
}

export default connect( mapStateToProps, { fetchUserResumes } )(UserPage);
