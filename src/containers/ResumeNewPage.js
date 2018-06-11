import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, Fields, FieldArray, reduxForm } from 'redux-form';
import { ShortField, LongField, Timeline, MultiField, ParagraphFields, ProgressBar, Tooltip } from '../components/form';
import { fetchUser, postResume } from '../actions';
import validate from './validate.js';

let informationErrors = {};

class ResumeNew extends Component {
  componentWillMount() {
    this.props.fetchUser();
  }
  onSubmit = (values) => {
    console.log('submit')
    // group information properties
    console.log(values);

    this.props.postResume(values, (response) => {
      console.log(response)
      this.props.history.push(`/resume/${response.data.name}`);
    });
  }
  render() {
    const { handleSubmit } = this.props;
    const required = value => (value ? undefined : 'Required')
    return (
      <div id="modal">
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <h1>Add your resume</h1>
          <h2>General</h2>
          <Field name='information.firstName' label='First name *' component={ShortField} className='half left' type='text' />
          <Field name='information.lastName' label='Last name *' component={ShortField} className='half right' type='text' />
          <Field name='information.email' label='Email *' component={ShortField} className='half left' type='email' />
          <Field name='information.telephone' label='Telephone *' component={ShortField} className='half right' type='telephone' />
          <Field name='information.website' label='Website' component={ShortField} className='whole' type='website' />
          <Field name='information.linkedin' label='LinkedIn' component={ShortField} className='whole' />
          <Field name='information.dribbble' label='Dribbble' component={ShortField} className='whole' />
          <Field name='information.github' label='Github' component={ShortField} className='whole' />
          <Field name='information.quote' label='Quote *' component={LongField} className='whole' />

          <h2>Intro</h2>
          <Field name='intro.title' label='Title *' component={ShortField} />
          <FieldArray label='' name='intro.content' component={ParagraphFields} /> {/* more than one, max 5. Characters 400 - 800 */}

          <h2>Experience</h2>
          <FieldArray label={[ 'Job title', 'Company', 'From', 'Until' ]} name='experience' component={Timeline}/> {/* more than one, together with education max 6 */}
          <FieldArray label={['Title', 'Description']} name='experience' component={Tooltip} />

          <h2>Education</h2>
          <FieldArray label={[ 'Title', 'Degree', 'From', 'Until' ]} name='education' component={Timeline}/> {/* more than one, together with education max 6 */}
          <FieldArray label={['Title', 'Description']} name='education' component={Tooltip} />

          <h2>Expertise</h2>
          <FieldArray label={['Title', 'Rating (%)']} name='expertise' component={ProgressBar} /> {/* more than one, skill/2 + expertise less than 11 */}
          <FieldArray label={['Title', 'Description']} name='expertise' component={Tooltip} />

          <h2>Skills</h2>
          <FieldArray label='' name='skills' component={MultiField} />{/* more than one, skill/2 + expertise less than 11 */}
          <FieldArray label={['Title', 'Description']} name='skills' component={Tooltip} />

          <h2>Personality</h2>
          <FieldArray label='' name='personality' component={MultiField} /> {/* more than one */}
          <FieldArray label={['Title', 'Description']} name='personality' component={Tooltip} />

          <h2>Passions</h2>
          <FieldArray label='' name='passions' component={MultiField} /> {/* more than one */}
          <FieldArray label={['Title', 'Description']} name='passions' component={Tooltip} />

          <button className='saveBtn' type='submit'>Save!</button>
        </form>

      </div>
    )
  }
}

export default reduxForm({
  validate,
  form: 'resumeNew',

})(
  connect(null, { fetchUser, postResume }) (ResumeNew) //combine reduxForm and connect
)
