import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, Fields, FieldArray, reduxForm } from 'redux-form';
import { ShortField, LongField, Timeline, MultiField, ParagraphFields, ProgressBar, Tooltip } from '../components/form';
import { fetchUser, postResume } from '../actions';

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

const validate = values => { //validate function will automatically be called by redux-form
  //check if input is ok
  const errors = {};
  if(!values.information) {
    errors.information = {
      firstName: {_error: 'Required'},
      lastName: {_error: 'Required'},
      email: {_error: 'Required'},
      telephone: {_error: 'Required'},
      quote: {_error: 'Required'}
    }
  } else {
    errors.information = {}
    if(!values.information.firstName) {errors.information.firstName = {_error: 'Required' }};
    if(!values.information.lastName) {errors.information.lastName = { _error: 'Required'}};
    if(!values.information.email) {errors.information.email = { _error: 'Required'}};
    if(!values.information.telephone) {errors.information.telephone = { _error: 'Required'}};
    if(!values.information.quote) {errors.information.quote = { _error: 'Required' }};
  }
  // Introduction
  if(!values.intro) {
    errors.intro = {
      title:'You must add a title',
      content: 'At least one paragraph must be entered.'
    }
  } else {
    errors.intro = {}
    if(!values.intro.title) {
      errors.intro.title = 'You must add a title';
    }
    if(!values.intro.content || typeof values.intro.content[0] == 'undefined' ) {
      errors.intro.content = { [0]:  'At least one paragraph must be entered.'}
    } else {
        let characters = 0;
        values.intro.content.map(paragraph => {
          if (paragraph) { characters = characters + paragraph.length}
          return characters;
        });
        console.log(characters);
        if(characters > 800) { errors.intro.content = { [0]: `Add a description between 400 and 800 characters. (${characters})` }}
        else if(characters < 400) { errors.intro.content = { [0]: `Add a description between 400 and 800 characters. (${characters})` }};
    }
  };

  //Experience & education
  if(!values.experience || !values.experience.length) { errors.experience = { _error: 'Enter at least one experience.'}
  } else {
    const experienceArrayErrors = [];
    values.experience.forEach((item, index) => {
      const experienceErrors = {}
      if(!item.title){
        experienceErrors.title = 'Required';
        experienceArrayErrors[index] = experienceErrors;
      }
      if(!item.where){
        experienceErrors.where = 'Required';
        experienceArrayErrors[index] = experienceErrors;
      }
      if(!item.timefrom){
        experienceErrors.timefrom = 'Required';
        experienceArrayErrors[index] = experienceErrors;

      } else if(item.timefrom.length > 4) {
        experienceErrors.timefrom = '4 characters max';
        experienceArrayErrors[index] = experienceErrors;
      }
      if(!item.timeto){
        experienceErrors.timeto = 'Required';
        experienceArrayErrors[index] = experienceErrors;

      } else if(item.timeto.length > 4) {
        experienceErrors.timeto = '4 characters max';
        experienceArrayErrors[index] = experienceErrors;
      }
      if(experienceArrayErrors.length) {
        errors.experience = experienceArrayErrors
      }
      if(values.experience.length > 8) {errors.experience = { _error: 'Education and experience can have 8 entries combined.'};}

  })};

  if(!values.education || !values.education.length) { errors.education = { _error: 'Enter at least one education.'}
  } else {
    if(values.education.length > 8) {errors.education = { _error: 'Education and experience can have 8 entries combined.'};}
    const educationArrayErrors = [];
    values.education.forEach((item, index) => {
      const educationErrors = {}
      if(!item.title){
        educationErrors.title = 'Required';
        educationErrors[index] = educationErrors;
      }
      if(!item.where){
        educationErrors.where = 'Required';
        educationArrayErrors[index] = educationErrors;
      }
      if(!item.timefrom){
        educationErrors.timefrom = 'Required';
        educationArrayErrors[index] = educationErrors;
      } else if(item.timefrom.length > 4) {
        educationErrors.timefrom = '4 characters max';
        educationArrayErrors[index] = educationErrors;
      }
      if(!item.timeto){
        educationErrors.timeto = 'Required';
        educationArrayErrors[index] = educationErrors;
      } else if(item.timeto.length > 4) {
        educationErrors.timeto = '4 characters max';
        educationArrayErrors[index] = educationErrors;
      }
      if(educationArrayErrors.length) {
        errors.education = educationArrayErrors
      }
  })};
  if(values.experience && values.education) {
    if(values.experience.length + values.education.length > 8) {
      errors.experience = { _error: 'Education and experience can have 8 entries combined.'};
      errors.education = { _error: 'Education and experience can have 8 entries combined.'}
    }
  }

  //Skills & expertise
  if(!values.skills || !values.skills.length) { errors.skills = { _error: 'Enter at least one skill.'}}
  if(!values.expertise || !values.expertise.length) { errors.expertise = { _error: 'Enter at least one expertise.'}}
  else {
    const expertiseArrayErrors = [];
    values.expertise.forEach((item, index) => {
      const expertiseErrors = {}
      if(!item.title){
        expertiseErrors.title = 'Required';
        expertiseArrayErrors[index] = expertiseErrors;
      }
      if(!item.rating){
        expertiseErrors.rating = 'Required';
        expertiseArrayErrors[index] = expertiseErrors;
      }
      if(expertiseArrayErrors.length) {
        errors.expertise = expertiseArrayErrors
      }
  })};
  if(values.skills && values.expertise) {
    if((values.skills.length/2 + values.expertise.length) > 11) {
      errors.skills = "Enter a maximum of 11 items for skills and expertise combined." ;
      errors.expertise = "Enter a maximum of 11 items for skills and expertise combined.";
    }
  }

  //Personality & passions
  if(!values.personality || !values.personality.length) { errors.personality = {_error: "Add at least one personality."}}
  else if(values.personality.length > 10) {errors.personality = {_error: "Enter 10 items maximum"}};
  if(!values.passions || !values.passions.length) { errors.passions = {_error: "Add at least one passion."}}
  else if(values.passions.length > 10) {errors.passions = "Enter 10 items maximum"};

  console.log(values);
  console.log(errors);

  return errors;
}

export default reduxForm({
  validate,
  form: 'resumeNew',

})(
  connect(null, { fetchUser, postResume }) (ResumeNew) //combine reduxForm and connect
)
