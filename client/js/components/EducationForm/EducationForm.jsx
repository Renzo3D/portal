import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

class EducationForm extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let person;
    const { studentId, handleSubmit, editing, searchedStudent, adminUse, error } = this.props;
    if (adminUse == true) {
      person = searchedStudent;
    } else { person = studentId; }
    return (
      <div>
        <React.Fragment>
          <form onSubmit={handleSubmit}>
            <div className='form-group'>
              <label>Name of school</label>
              {error &&
                error.type === 'name' && (
                <p className="alert alert-danger">{error.message}</p>
              )}
              <Field name='schoolName' className='form-control' component='input' type='text' />
            </div>
            <div className='form-group'>
              <label>Brief description of the school</label>
              {error &&
                error.type === 'schoolDescription' && (
                <p className="alert alert-danger">{error.message}</p>
              )}
              <Field name='description' className='form-control' component='textarea' type='text' />
            </div>
            <div className='form-group'>
              <label>Area of Education</label>
              {error &&
                error.type === 'area' && (
                <p className="alert alert-danger">{error.message}</p>
              )}
              <Field name='specialization' className='form-control' component='input' type='text' />
            </div>
            <div className='form-group'>
              <label>Expected graduation date</label>
              {error &&
                error.type === 'graduationDate' && (
                <p className="alert alert-danger">{error.message}</p>
              )}
              <Field name='completionDate' className='form-control' component='input' type='date' />
            </div>
            <div className='modal-footer'>
            <button
                type="button"
                className="btn btn-block btn-outline-danger col-2 mx-3"
                onClick={() => {         
                    $('#edu-form-modal').modal('hide');
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
        </React.Fragment>
      </div>
    );
  }
}

EducationForm = reduxForm({
  form: 'educationForm'
})(EducationForm);

EducationForm.propTypes = {
  user: PropTypes.object
};

export default EducationForm;
