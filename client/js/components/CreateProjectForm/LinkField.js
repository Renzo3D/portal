import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';

const LinkField = props => {
  const { fields } = props;
  const addLink = () => {
    fields.push('');
  };
  const removeLink = event => {
    fields.remove(event.target.value);
  };
  return (
    <React.Fragment>
      <div className='mb-2 align-baseline'>
        <label className='lead mb-0 mr-2'>External Links</label>
        <button
          type='button'
          className='btn btn-sm btn-outline-dark'
          onClick={addLink}
        >
          Add Link
        </button>
      </div>
      <ul className='list-group list-group-flush'>
        {fields.map((link, idx) => {
          return (
            <li key={idx} className='list-group-item'>
              <div className='row'>
              <div className='col-12'>
                <Field
                  name={`links[${idx}]`}
                  className='form-control col-8 mx-1'
                  component='input'
                />
                </div>
                <div className='col-12'>
                <br/>
                <button
                  type='button'
                  className='btn btn-outline-danger btn-sm  mx-1'
                  onClick={removeLink}
                >
                  Remove Link
                </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </React.Fragment>
  );
};

LinkField.propTypes = {
  fields: PropTypes.object
};

export default LinkField;
