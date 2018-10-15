import React from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';

class UserOverviewForm extends React.Component {

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
              <button
                type='button'
                className='close'
                data-dismiss='modal'
                aria-label='Close'
              >
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>
            <div className='modal-body'>
              <div className='container-fluid'>
                <div className='form-row'>
                  <div className='form-group col-md-6'>
                    <label>First Name</label>
                    <div>
                      <Field
                        name='firstName'
                        component='input'
                        type='text'
                        className='form-control'
                        placeholder={this.props.user.firstName}
                      />
                    </div>
                  </div>
                  <div className='form-group col-md-6'>
                    <label>Last Name</label>
                    <div>
                      <Field
                        name='lastName'
                        component='input'
                        type='text'
                        className='form-control'
                        placeholder={this.props.user.lastName}
                      />
                    </div>
                  </div>
                </div>
                <div className='form-group'>
                  <label>Headline</label>
                  <div>
                    <Field
                      name='headline'
                      className='form-control'
                      component='input'
                      type='text'
                      placeholder={this.props.user.headline}
                    />
                  </div>
                </div>
                <div className='form-group'>
                  <label>Github Url</label>
                  <div>
                    <Field
                      name='gitUrl'
                      className='form-control'
                      component='input'
                      type='text'
                      placeholder={this.props.user.gitUrl}
                    />
                  </div>
                </div>
                <div className='form-group'>
                  <label>LinkedIn Url</label>
                  <div>
                    <Field
                      name='linkedInUrl'
                      className='form-control'
                      component='input'
                      type='text'
                      placeholder={this.props.user.linkedInUrl}
                    />
                  </div>
                  <div>
                    <label> Phone Number </label>
                    <Field
                      name='phoneNumber'
                      className='form-control'
                      component='input'
                      type='text'
                      placeholder={this.props.user.phoneNumber}
                    />
                  </div>
                  <div>
                    <label> Email </label>
                    <Field
                      name='email'
                      className='form-control'
                      component='input'
                      type='text'
                      placeholder={this.props.user.email}
                    />
                  </div>
                  <div>
                    <label> Location </label>
                    <Field
                      name='studentLocation'
                      className='form-control'
                      component='input'
                      type='text'
                      placeholder={this.props.user.location}
                    />
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

UserOverviewForm = reduxForm({
  form: 'useroverview'
})(UserOverviewForm);

UserOverviewForm.propTypes = {
  handleSubmit: PropTypes.func,
  reset: PropTypes.func
};
export default UserOverviewForm;
