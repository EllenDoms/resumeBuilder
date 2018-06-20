import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUser, fetchUserResumes, newResume, setActiveResume, setActiveFormtab, postResumeValue } from '../actions';
import { Redirect } from 'react-router'

import { Field, Fields, FieldArray, reduxForm } from 'redux-form';
import { ShortField, LongField, Timeline, MultiField, ParagraphFields, ProgressBar, Tooltip } from '../components/form';

import Header from '../components/header';
import validate from './validate.js';
import Loading from '../components/loading';

class ResumeNew extends Component {
  componentWillMount() {
    const { authenticated, location, match } = this.props;
    this.props.fetchUserResumes(authenticated.uid);
    if(match.params.id && match.params.id != "new") {
      this.props.setActiveResume(false, match.params.id);
    } else if(match.params.id == "new") {
      const values = {
        name: "New resume",
        user: authenticated.uid
      }
      this.props.newResume(true, values);
    }
  }
  saveField = (values) => {
    if(values.values) {
      this.props.postResumeValue(values.values, this.props.id);
    } else {
      console.log('nothing')
    }

  }
  renderTabs() {
    const tabs = ['Template', 'General', 'Intro', 'Experience', 'Education', 'Expertise', 'Skills', 'Personality', 'Passions'];
    return _.map(tabs, tab => {
      return (
        <li
          key={tab}
          onClick={() => {this.props.setActiveFormtab(tab)}}
          className={this.props.formtab == tab ? "active" : ""}
        >{tab}</li>
      )
    })
  }
  render() {
    const { loading, data, formtab, handleSubmit, formValues } = this.props;
    if (loading || !formValues) {
      return <Loading />;
    }
    {console.log(formValues.values)}

    return(
      <div className='builderCss'>
        <Header type='close' />
        <div id="pageContent">
          <form className="container">
            <Field onBlur={this.saveField(formValues)} name='name' component={ShortField} className='inline' type='text' />
            <div id='formContent'>
              <ul className='tabs'>
                {this.renderTabs()}
              </ul>
              <div className='rightContent'>
                <div id="tabTemplate" className={formtab == 'Template' ? "visible" : "hidden" } >
                  WIP
                </div>
                <div id="tabGeneral" className={formtab == 'General' ? "visible" : "hidden" }>
                  <h3>General</h3>
                  <div className="container">
                    <Field onBlur={this.saveField(formValues)} name='information.firstName' label='First name *' component={ShortField} className='half left' type='text' />
                    <Field onBlur={this.saveField(formValues)} name='information.lastName' label='Last name *' component={ShortField} className='half right' type='text' />
                    <Field onBlur={this.saveField(formValues)} name='information.email' label='Email *' component={ShortField} className='half left' type='email' />
                    <Field onBlur={this.saveField(formValues)} name='information.telephone' label='Telephone *' component={ShortField} className='half right' type='telephone' />
                    <Field onBlur={this.saveField(formValues)} name='information.website' label='Website' component={ShortField} className='whole' type='website' />
                    <Field onBlur={this.saveField(formValues)} name='information.linkedin' label='LinkedIn' component={ShortField} className='whole' />
                    <Field onBlur={this.saveField(formValues)} name='information.dribbble' label='Dribbble' component={ShortField} className='whole' />
                    <Field onBlur={this.saveField(formValues)} name='information.github' label='Github' component={ShortField} className='whole' />
                    <Field onBlur={this.saveField(formValues)} name='information.quote' label='Quote *' component={LongField} className='whole' />
                  </div>
                </div>
                <div id="tabIntro" className={formtab == 'Intro' ? "visible" : "hidden" }>
                  <h3>Intro</h3>
                  <div className="container">
                    <Field onBlur={this.saveField(formValues)} name='intro.title' label='Title *' component={ShortField} />
                    <FieldArray parentMethod={this.saveField(formValues)} label='' name='intro.content' component={ParagraphFields} /> {/* more than one, max 5. Characters 400 - 800 */}
                  </div>
                </div>
                <div id="tabExperience" className={formtab == 'Experience' ? "visible" : "hidden" }>
                  <h3>Experience</h3>
                  <div className="container">
                    <FieldArray parentMethod={this.saveField(formValues)} label={[ 'Job title', 'Company', 'From', 'Until' ]} name='experience' component={Timeline}/> {/* more than one, together with education max 6 */}
                    <FieldArray parentMethod={this.saveField(formValues)} label={['Title', 'Link', 'Description']} name='experience' component={Tooltip} />
                  </div>
                </div>
                <div id="tabEducation" className={formtab == 'Education' ? "visible" : "hidden" }>
                  <h3>Education</h3>
                  <div className="container">
                    <FieldArray parentMethod={this.saveField(formValues)} label={[ 'Title', 'Degree', 'From', 'Until' ]} name='education' component={Timeline}/> {/* more than one, together with education max 6 */}
                    <FieldArray parentMethod={this.saveField(formValues)} label={['Title', 'Link', 'Description']} name='education' component={Tooltip} />
                  </div>
                </div>
                <div id="tabExpertise" className={formtab == 'Expertise' ? "visible" : "hidden" }>
                  <h3>Expertise</h3>
                  <div className="container">
                    <FieldArray parentMethod={this.saveField(formValues)} label={['Title', 'Rating (%)']} name='expertise' component={ProgressBar} /> {/* more than one, skill/2 + expertise less than 11 */}
                    <FieldArray parentMethod={this.saveField(formValues)} label={['Title', 'Link', 'Description']} name='expertise' component={Tooltip} />
                  </div>
                </div>
                <div id="tabSkills" className={formtab == 'Skills' ? "visible" : "hidden" }>
                  <h3>Skills</h3>
                  <div className="container">
                    <FieldArray parentMethod={this.saveField(formValues)} label='' name='skills' component={MultiField} />{/* more than one, skill/2 + expertise less than 11 */}
                    <FieldArray parentMethod={this.saveField(formValues)} label={['Title', 'Link', 'Description']} name='skills' component={Tooltip} />
                  </div>
                </div>
                <div id="tabPersonality" className={formtab == 'Personality' ? "visible" : "hidden" }>
                  <h3>Personality</h3>
                  <div className="container">
                    <FieldArray parentMethod={this.saveField(formValues)} label='' name='personality' component={MultiField} /> {/* more than one */}
                    <FieldArray parentMethod={this.saveField(formValues)} label={['Title', 'Link', 'Description']} name='personality' component={Tooltip} />
                  </div>
                </div>
                <div id="tabPassions" className={formtab == 'Passions' ? "visible" : "hidden" }>
                  <h3>Passions</h3>
                  <div className="container">
                    <FieldArray parentMethod={this.saveField(formValues)} label='' name='passions' component={MultiField} /> {/* more than one */}
                    <FieldArray parentMethod={this.saveField(formValues)} label={['Title', 'Link', 'Description']} name='passions' component={Tooltip} />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}


let InitializeFromStateForm = reduxForm({
    form: 'resumeNew',
    enableReinitialize : true,
    validate
})(ResumeNew);

function mapStateToProps(state) {
  console.log(state)
  return {
    id: state.data.active,
    formtab: state.data.formtab,
    loading: state.data.loading,
    initialValues: state.data.resumes[state.data.active],
    formValues: state.form.resumeNew
  }
}

export default connect( mapStateToProps, { fetchUser, fetchUserResumes, newResume, setActiveResume, setActiveFormtab, postResumeValue })(InitializeFromStateForm);
