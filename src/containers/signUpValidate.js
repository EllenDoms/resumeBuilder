const validate = values => { //validate function will automatically be called by redux-form
  //check if input is ok
  let errors = {};
  if(!values.email) { errors.email = {_error: 'Required'} };
  if(!values.password) { errors.password = {_error: 'Required'} };
  return errors;
  console.log(errors)
}

export default validate;
