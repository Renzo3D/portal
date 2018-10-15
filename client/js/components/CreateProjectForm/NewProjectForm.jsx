import React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import SkillsMenu from './SkillsMenu';
import LinkField from './LinkField';
import FileInput from './FileInput';

let NewProjectForm = props => {
  const { error, handleSubmit, isNewProject } = props;

  return (
    <form onSubmit={handleSubmit}>
      <h4 className='d-inline-block mr-2'>
        {isNewProject ? 'Add Project' : 'Edit Project'}
      </h4>
      {!isNewProject && (
        <button
          type='button'
          className='btn btn-outline-danger'
          data-target='#deleteConfirmModal'
          data-toggle='modal'
        >
          <i className='fas fa-trash-alt' />
        </button>
      )}
      <div className='form-group'>
        <label>Project Name</label>
        {error &&
          error.type === 'title' && (
            <p className='alert alert-danger'>{error.message}</p>
          )}
        <Field
          required maxLength='50'
          name='title'
          className='form-control'
          component='input'
          type='text'
          placeholder='Project Name'
        />
      </div>
      <div className='form-group'>
        <label>Project Description</label>
        <Field
          className='form-control'
          name='description'
          component='textarea'
          type='text'
          placeholder='Project Description'
          required maxLength='250'
        />
      </div>
      <div className='form-group'>
        <label>Skills involved</label>
        <Field
          name='skills'
          className='form-control'
          component='input'
          value={SkillsMenu}
        />
      </div>
      <div className='form-group container-fluid row'>
        <div className='col-6'>
          {error &&
            error.type === 'link' && (
              <p className='alert alert-danger'>{error.message}</p>
            )}
          <FieldArray name='links' component={LinkField} />
        </div>
        <div className='col-6'>
          {error &&
            error.type === 'file' && (
              <p className='alert alert-danger'>{error.message}</p>
            )}
          <label className='lead'>Images</label>
          <Field className='form-control' component={FileInput} name='images'/>
        </div>
      </div>
      <div className='row justify-content-start'>
        <button
          className='btn btn-block btn-outline-danger col-2 mx-3'
          data-toggle='modal'
          data-target='#cancelConfirmModal'
          type='button'
        >
          Cancel
        </button>
        <button
          className='btn btn-block btn-outline-primary col-3 mt-0'
          type='submit'
        >
          Submit
        </button>
      </div>
    </form>
  );
};
NewProjectForm.propTypes = {
  error: PropTypes.string,
  handleSubmit: PropTypes.func,
  isNewProject: PropTypes.bool
};

export default reduxForm({
  form: 'newProject'
})(NewProjectForm);
