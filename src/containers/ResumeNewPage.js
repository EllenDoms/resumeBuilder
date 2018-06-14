import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUser, fetchResume, postResumeValue } from '../actions';
import { Redirect } from 'react-router'

import { Field, Fields, FieldArray, reduxForm } from 'redux-form';
import { InlineField, ShortField, LongField, Timeline, MultiField, ParagraphFields, ProgressBar, Tooltip } from '../components/form';

import Header from '../components/header';
import validate from './validate.js';
import Loading from '../components/loading';


class ResumeNew extends Component {
  componentDidMount() {
    this.props.fetchUser();
    console.log(this.props)
    if(this.props.location.id) {
      this.props.fetchResume(this.props.location.id);
    }
  }
  saveField = (values) => {
    console.log(this.props.location.id);
    this.props.postResumeValue(values, this.props.location.id);
  }
  render() {
    const { data, loading, handleSubmit } = this.props;
    if(!this.props.location.id) {
      return <Redirect to='/user' />
    }
    if (loading) {
      return <Loading />;
    }

    return(
      <div className='builderCss'>
        <Header />
        <div id="pageContent">
          <form>
            <Field name='resumeName' component={InlineField} className='half left' type='text' onBlur={handleSubmit(this.saveField)} />
          </form>
        </div>
      </div>
    )
  }
}


let InitializeFromStateForm = reduxForm({
    form: 'resumeNew',
    enableReinitialize : true
})(ResumeNew);

function mapStateToProps(state) {
  console.log(state)
  return {
    id: state.data.id,
    data: state.data.current,
    loading: state.data.loading,
    initialValues: state.data.current,
  }
}

export default connect( mapStateToProps, { fetchUser, fetchResume, postResumeValue })(InitializeFromStateForm);
