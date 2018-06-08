import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import DropdownList from 'react-widgets/lib/DropdownList';
import '../style/form.css';

export const ShortField = ({ input, label, type, className, meta: { touched, error, submitFailed } }) => (
  <div className={`${className} ${(touched || submitFailed) && error ? 'has-danger' : ''} `} >
    <label>{label}</label>
    {(touched || submitFailed) && error && <span className="error">{error}</span>}
    <input {...input} type={type} />
  </div>
)

export const LongField = ({ input, label, type, className, meta: { touched, error, submitFailed } }) => (
  <div className={`${className} ${(touched || submitFailed) && error ? 'has-danger' : ''} `} >
    <label>{label}</label>
    {(touched || submitFailed) && error && <span className="error">{error}</span>}
    <textarea {...input} type={type} />
  </div>
)

export const Timeline = ({fields, label, meta: { touched, error, submitFailed }}) => (
    <ul className='timeline'>
      {(touched || submitFailed) && error && <span className="error">{error}</span>}
      {fields.map((item, index) =>
        <li key={index} className='addItem'>
          <Field label={label[0]} name={`${item}.title`} type="text" component={ShortField} className='half left' />
          <Field label={label[1]} name={`${item}.where`} type="text" component={ShortField} className='half right' />
          <Field label={label[2]} name={`${item}.timefrom`} type="text" component={ShortField} className='half left' />
          <Field label={label[3]} name={`${item}.timeto`} type="text" component={ShortField} className='half right' />
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

export const MultiField = ({fields, label, meta: { touched, error, submitFailed }}) => (
  <ul className='timeline'>
    {(touched || submitFailed) && error && <span className="error">{error}</span>}
    {fields.map((item, index) =>
      <li key={index}>
        <Field label={label} name={item} type="text" component={ShortField} />
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

export const ParagraphFields = ({fields, label, meta: { touched, error, submitFailed }}) => (
  <ul className='timeline'>
    {(touched || submitFailed) && error && <span className="error">{error}</span>}
    {fields.map((item, index) =>
      <li key={index}>
        <Field label={label} name={`intro.content[${index}]`} type="text" component={LongField} />
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

export const ProgressBar = ({fields, label, meta: { touched, error, submitFailed }}) => (
  <ul className='progressbar'>
    {(touched || submitFailed) && error && <span className="error">{error}</span>}
    {fields.map((item, index) =>
      <li key={index} className='addItem'>
        <Field label={label[0]} name={`${item}.title`} type="text" component={ShortField} className='half left' />
        <Field label={label[1]} name={`${item}.rating`} type="number" component={ShortField} className='half right' />
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

export const Tooltip = ({fields, label}) => (
  <div className='addItem'>
    <h3>Tooltip</h3>
    <Field label='Title' name={`tooltips.${fields.name}.title`} type="text" component={ShortField} />
    <Field label='Description' name={`tooltips.${fields.name}.description`} type="text" component={LongField} />
  </div>
);
