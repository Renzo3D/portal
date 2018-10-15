import React from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';

let NewWorkHistoryForm = props => {
  const { error, handleSubmit, isNewEntry, currentEntry, reset } = props;
  return (
    <form className="container" onSubmit={handleSubmit}>
      <div className="modal-header">
        <h4 className="d-inline-block mr-2">
          {isNewEntry ? 'Add WorkHistory' : 'Edit WorkHistory'}
        </h4>
        <button
            type='button'
            className='close'
            data-dismiss='modal'
            aria-label='Close'
          >
            <span aria-hidden='true'>&times;</span>
          </button>
      </div>
      <div className="modal-body">
        <div className="form-group">
          <label>Company</label>
          {error &&
            error.type === 'title' && (
              <p className="alert alert-danger">{error.message}</p>
            )}
          <Field
            name="title"
            className="form-control"
            component="input"
            type="text"
            placeholder="Company Name"
          />
        </div>
        <div className="form-group">
          {error &&
            error.type === 'position' && (
              <p className="alert alert-danger">{error.message}</p>
            )}
          <label>Position</label>
          <Field
            className="form-control"
            name="position"
            component="input"
            type="text"
            placeholder="Position"
          />
        </div>
        <div className="form-group">
          {error &&
            error.type === 'description' && (
              <p className="alert alert-danger">{error.message}</p>
            )}
          <label>Description</label>
          <Field
            className="form-control"
            name="description"
            component="textarea"
            type="text"
            placeholder="Description"
          />
        </div>
        <div className="form-group">
          {error &&
            error.type === 'startDate' && (
              <p className="alert alert-danger">{error.message}</p>
            )}
          <label>Start Date</label>
          <Field
            className="form-control"
            name="startDate"
            component="input"
            type="date"
            placeholder="startDate"
          />
        </div>
        <div className="form-group">
          {error &&
            error.type === 'endDate' && (
              <p className="alert alert-danger">{error.message}</p>
            )}
          <label>End Date</label>
          <Field
            className="form-control"
            name="endDate"
            component="input"
            type="date"
            placeholder="endDate"
          />
        </div>
        <div className="form-group">
          <label htmlFor="currentPosition">Current Position</label>
          <Field
            className="form-control"
            name="currentPosition"
            id="currentPosition"
            component="input"
            type="checkbox"
          />
        </div>
      </div>
      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-block btn-outline-danger col-2 mx-3"
          onClick={() => {
              $('#workHistoryFormModal').modal('hide');
          }}
        >
          Cancel
        </button>
        <button
          className="btn btn-block btn-outline-primary col-3 mt-0"
          type="submit"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

NewWorkHistoryForm = reduxForm({
  form: 'newworkhistory',
  enableReinitialize: true
})(NewWorkHistoryForm);

NewWorkHistoryForm.propTypes = {
  error: PropTypes.string,
  handleSubmit: PropTypes.func,
  isNewEntry: PropTypes.bool,
  currentEntry: PropTypes.object,
  reset: PropTypes.func
};

export default NewWorkHistoryForm;
