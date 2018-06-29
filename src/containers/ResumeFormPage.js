import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUser, fetchUserResumes, newResume, setActiveResume, setActiveFormtab, postResumeValue } from '../actions';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom'; //navigate in app

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
        status: "active",
        user: authenticated.uid
      }
      this.props.newResume(true, values);
    }
  }

  saveField = (values) => {
    if(values.values) {
      this.props.postResumeValue(values.values, this.props.id);
    }
  }
  renderTabs() {
    const tabs = ['template', 'information', 'intro', 'experience', 'education', 'expertise', 'skills', 'personality', 'passions'];
    return _.map(tabs, (tab, i) => {
      if (!this.props.formValues.syncErrors || !this.props.formValues.syncErrors.hasOwnProperty(tab)) {
        // items are validate ok
        return (
          <li
            key={tab}
            onClick={() => {this.props.setActiveFormtab(tab)}}
            className={this.props.formtab == tab ? `active done` : "done" }
          ><span className="number material-icons">done</span>{tab}</li>
        )
      } else {
        return (
          <li
            key={tab}
            onClick={() => {this.props.setActiveFormtab(tab)}}
            className={this.props.formtab == tab ? `active` : "" }
          ><span className="number">{(i + 1)}</span>{tab}</li>
        )
      }
    })
  }
  render() {
    const { loading, data, formtab, handleSubmit, formValues } = this.props;
    if (loading || !formValues) {
      return <Loading />;
    }


    return(
      <div className='builderCss'>
        <Header type='close' />
        <div id="pageContent">
          <form className="container">
            {data && data.status ? <div id="saving">{data.status}</div> : ""}
            <Field onBlur={() => this.saveField(formValues)} name='name' component={ShortField} className='inline' type='text' />
            <div id='formContent'>
              <ul className='tabs'>
                {this.renderTabs()}
                {!formValues.syncErrors ? <Link to={`/resume/demoresume`} target="_blank" className="btn btn-primary">View resume</Link> : <button className="btn btn-primary btn-disabled">View Resume</button>}
              </ul>

              <div className='rightContent'>
                <div id="tabTemplate" className={formtab == 'template' ? "visible" : "hidden" } >
                  WIP
                </div>
                <div id="tabGeneral" className={formtab == 'information' ? "visible" : "hidden" }>
                  <h3>General</h3>
                  <div className="container">
                    <Field onBlur={() => this.saveField(formValues)} name='information.firstName' label='First name *' component={ShortField} className='half left' type='text' />
                    <Field onBlur={() => this.saveField(formValues)} name='information.lastName' label='Last name *' component={ShortField} className='half right' type='text' />
                    <Field onBlur={() => this.saveField(formValues)} name='information.email' label='Email *' component={ShortField} className='half left' type='email' />
                    <Field onBlur={() => this.saveField(formValues)} name='information.telephone' label='Telephone *' component={ShortField} className='half right' type='telephone' />
                    <Field onBlur={() => this.saveField(formValues)} name='information.website' label='Website' component={ShortField} className='whole' type='website' />
                    <Field onBlur={() => this.saveField(formValues)} name='information.linkedin' label='LinkedIn' component={ShortField} className='whole' />
                    <Field onBlur={() => this.saveField(formValues)} name='information.dribbble' label='Dribbble' component={ShortField} className='whole' />
                    <Field onBlur={() => this.saveField(formValues)} name='information.github' label='Github' component={ShortField} className='whole' />
                    <Field onBlur={() => this.saveField(formValues)} name='information.quote' label='Quote *' component={LongField} className='whole' />
                  </div>
                </div>
                <div id="tabIntro" className={formtab == 'intro' ? "visible" : "hidden" }>
                  <h3>Intro</h3>
                  <div className="container">
                    <Field onBlur={() => this.saveField(formValues)} name='intro.title' label='Title *' component={ShortField} />
                    <FieldArray parentMethod={() => this.saveField(formValues)} label='' name='intro.content' component={ParagraphFields} /> {/* more than one, max 5. Characters 400 - 800 */}
                  </div>
                </div>
                <div id="tabExperience" className={formtab == 'experience' ? "visible" : "hidden" }>
                  <h3>Experience</h3>
                  <div className="container">
                    <FieldArray parentMethod={() => this.saveField(formValues)} label={[ 'Job title', 'Company', 'From', 'Until' ]} name='experience' component={Timeline}/> {/* more than one, together with education max 6 */}
                    <FieldArray parentMethod={() => this.saveField(formValues)} label={['Title', 'Link', 'Description']} name='experience' component={Tooltip} />
                  </div>
                </div>
                <div id="tabEducation" className={formtab == 'education' ? "visible" : "hidden" }>
                  <h3>Education</h3>
                  <div className="container">
                    <FieldArray parentMethod={() => this.saveField(formValues)} label={[ 'Title', 'Degree', 'From', 'Until' ]} name='education' component={Timeline}/> {/* more than one, together with education max 6 */}
                    <FieldArray parentMethod={() => this.saveField(formValues)} label={['Title', 'Link', 'Description']} name='education' component={Tooltip} />
                  </div>
                </div>
                <div id="tabExpertise" className={formtab == 'expertise' ? "visible" : "hidden" }>
                  <h3>Expertise</h3>
                  <div className="container">
                    <FieldArray parentMethod={() => this.saveField(formValues)} label={['Title', 'Rating (%)']} name='expertise' component={ProgressBar} /> {/* more than one, skill/2 + expertise less than 11 */}
                    <FieldArray parentMethod={() => this.saveField(formValues)} label={['Title', 'Link', 'Description']} name='expertise' component={Tooltip} />
                  </div>
                </div>
                <div id="tabSkills" className={formtab == 'skills' ? "visible" : "hidden" }>
                  <h3>Skills</h3>
                  <div className="container">
                    <FieldArray parentMethod={() => this.saveField(formValues)} label='' name='skills' component={MultiField} />{/* more than one, skill/2 + expertise less than 11 */}
                    <FieldArray parentMethod={() => this.saveField(formValues)} label={['Title', 'Link', 'Description']} name='skills' component={Tooltip} />
                  </div>
                </div>
                <div id="tabPersonality" className={formtab == 'personality' ? "visible" : "hidden" }>
                  <h3>Personality</h3>
                  <div className="container">
                    <FieldArray parentMethod={() => this.saveField(formValues)} label='' name='personality' component={MultiField} /> {/* more than one */}
                    <FieldArray parentMethod={() => this.saveField(formValues)} label={['Title', 'Link', 'Description']} name='personality' component={Tooltip} />
                  </div>
                </div>
                <div id="tabPassions" className={formtab == 'passions' ? "visible" : "hidden" }>
                  <h3>Passions</h3>
                  <div className="container">
                    <FieldArray parentMethod={() => this.saveField(formValues)} label='' name='passions' component={MultiField} /> {/* more than one */}
                    <FieldArray parentMethod={() => this.saveField(formValues)} label={['Title', 'Link', 'Description']} name='passions' component={Tooltip} />
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
  return {
    id: state.data.active,
    data: state.data,
    formtab: state.data.formtab,
    loading: state.data.loading,
    initialValues: state.data.resumes[state.data.active],
    formValues: state.form.resumeNew
  }
}

export default connect( mapStateToProps, { fetchUser, fetchUserResumes, newResume, setActiveResume, setActiveFormtab, postResumeValue })(InitializeFromStateForm);
