import React from 'react';
import { Field } from 'redux-form';
import '../style/form.css';

export const ShortField = ({ input, label, type, className, meta: { touched, error } }) => (
  <div className={`${className} ${(touched && error) ? 'has-danger' : ''} `} >
    <label>{label}</label>
    {touched && error && <span className="error">{error}</span>}
    <input {...input} type={type} />
  </div>
)

export const LongField = ({ input, label, type, className, meta: { touched, error } }) => (
  <div className={`${className} ${touched && error ? 'has-danger' : ''} `} >
    <label>{label}</label>
    {touched && error && <span className="error">{error}</span>}
    <textarea {...input} type={type} />
  </div>
)

export const Timeline = ({fields, label, parentMethod, meta: { touched, error }}) => (
    <ul className='timeline'>
      {touched && error && <span className="error">{error}</span>}
      {fields.map((item, index) =>
        <li key={index} className='addItem'>
          <Field onBlur={parentMethod} label={label[0]} name={`${item}.title`} type="text" component={ShortField} className='half left' />
          <Field onBlur={parentMethod} label={label[1]} name={`${item}.where`} type="text" component={ShortField} className='half right' />
          <Field onBlur={parentMethod} label={label[2]} name={`${item}.timefrom`} type="text" component={ShortField} className='half left' />
          <Field onBlur={parentMethod} label={label[3]} name={`${item}.timeto`} type="text" component={ShortField} className='half right' />
          <button type="button"  onClick={() => fields.remove(index)}>
            <span className='floatingBtn material-icons'>remove</span>
            <span className='btnLabel'>Remove</span>
          </button>
        </li>
      )}
      <li>
        <button type="button"  onClick={() => fields.push({})}>
          <span className='floatingBtn material-icons'>add</span>
          <span className='btnLabel'>Add one</span>
        </button>
      </li>
    </ul>
)

export const MultiField = ({fields, label, parentMethod, meta: { touched, error, submitFailed }}) => (
  <ul className='timeline'>
    {touched && error && <span className="error">{error}</span>}
    {fields.map((item, index) =>
      <li key={index}>
        <Field onBlur={parentMethod} label={label} name={item} type="text" component={ShortField} />
      </li>
    )}
    <li>
      <button type="button"  onClick={() => fields.push()}>
        <span className='floatingBtn material-icons'>add</span>
        <span className='btnLabel'>Add one </span>
      </button>
    </li>
  </ul>
)

export const ParagraphFields = ({fields, label, parentMethod, meta: { touched, error }}) => (
  <ul className='timeline'>
    {touched && error && <span className="error">{error}</span>}
    {fields.map((item, index) =>
      <li key={index}>
        <Field onBlur={parentMethod} label={label} name={`intro.content[${index}]`} type="text" component={LongField} />
      </li>
    )}
    <li>
      <button type="button"  onClick={() => fields.push()}>
        <span className='floatingBtn material-icons'>add</span>
        <span className='btnLabel'>Add paragraph</span>
      </button>
    </li>
  </ul>
)

export const ProgressBar = ({fields, label, parentMethod, meta: { touched, error }}) => (
  <ul className='progressbar'>
    {touched && error && <span className="error">{error}</span>}
    {fields.map((item, index) =>
      <li key={index} className='addItem'>
        <Field onBlur={parentMethod} label={label[0]} name={`${item}.title`} type="text" component={ShortField} className='half left' />
        <Field onBlur={parentMethod} label={label[1]} name={`${item}.rating`} type="number" component={ShortField} className='half right' />
        <button type="button"  onClick={() => fields.remove(index)}>
          <span className='floatingBtn material-icons'>remove</span>
          <span className='btnLabel'>Remove</span>
        </button>
      </li>
    )}
    <li>
      <button type="button"  onClick={() => fields.push({})}>
        <span className='floatingBtn material-icons'>add</span>
        <span className='btnLabel'>Add one</span>
      </button>
    </li>
  </ul>
)

export const Tooltip = ({fields, label, parentMethod}) => (
  <div className='addItem'>
    <h4>Tooltip</h4>
    <Field onBlur={parentMethod} label='Title' name={`tooltips.${fields.name}.title`} type="text" component={ShortField} />
    <Field onBlur={parentMethod} label='Link' name={`tooltips.${fields.name}.projectLink`} type="text" component={ShortField} />
    <Field onBlur={parentMethod} label='Description' name={`tooltips.${fields.name}.description`} type="text" component={LongField} />
  </div>
);
