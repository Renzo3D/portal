import React from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';

class EmployeeOverviewForm extends React.Component {
  render() {
    const { handleSubmit, reset } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <div className='modal-dialog' role='document'>
          <div className='modal-content'>
            <div className='modal-header bg-primary text-white'>
              <h5 className='modal-title' id='exampleModalLongTitle'>
                Basic Information
              </h5>
              <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>
            <div className='modal-body'>
              <div className='container-fluid'>
                <div className='form-row' />
                <div className='form-group'>
                  <label>Headline</label>
                  <div>
                    <Field name='headline' className='form-control' component='input' type='text' />
                  </div>
                </div>
                <div className='form-group'>
                  <label>Company Name</label>
                  <div>
                    <Field name='companyName' className='form-control' component='input' type='text' />
                  </div>
                </div>
                <div className='form-group'>
                  <label>Company Location</label>
                  <div>
                    <Field name='companyLocation' className='form-control' component='input' type='text' />
                  </div>
                </div>
                <div className='form-group'>
                  <label>Company Description</label>
                  <div>
                    <Field name='companyDescription' className='form-control' component='textarea' type='text' />
                  </div>
                </div>
                <div className='form-group'>
                  <label>Contact Email</label>
                  <div>
                    <Field name='companyEmail' className='form-control' component='input' type='email' />
                  </div>
                </div>
              </div>
            </div>
            <div className='modal-footer'>
              <button type='submit' className='btn btn-primary'>
                Save Changes
              </button>
              <button
                type='button'
                className='btn btn-secondary'
                onClick={() => {
                  if (confirm('Cancel inputs?')) {
                    reset();
                    $('#exampleModalLong').modal('hide');
                  }
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

EmployeeOverviewForm = reduxForm({
  form: 'employeeOverview'
})(EmployeeOverviewForm);

EmployeeOverviewForm.propTypes = {
  handleSubmit: PropTypes.func,
  reset: PropTypes.func
};
export default EmployeeOverviewForm;
