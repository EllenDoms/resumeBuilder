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
    if (
      !values.information.firstName ||
      !values.information.lastName ||
      !values.information.email ||
      !values.information.telephone ||
      !values.information.quote
    ) { errors.information = {} }

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
    if(
      !values.intro.title ||
      !values.intro.content
    ) { errors.intro = {} }

    if(!values.intro.title) {
      errors.intro.title = 'You must add a title';
    }
    if(!values.intro.content || typeof values.intro.content[0] == 'undefined' ) {
      errors.intro.content = { [0]:  'At least one paragraph must be entered.'}
    } else {
        let characters = 0;
        values.intro.content.forEach(paragraph => {
          if (paragraph) { characters = characters + paragraph.length}
          return characters;
        });
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

  return errors;
}

export default validate;
