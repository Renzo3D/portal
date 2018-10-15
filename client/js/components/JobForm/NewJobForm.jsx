import React from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';

Modal.setAppElement('#root');
class NewJobForm extends React.Component {
  constructor(props) {
    super(props);
    
  }
  
  render() {
    const { error, handleSubmit, isNewEntry, currentEntry, reset, values, isModalOpen, toggleModal } = this.props;
    const modalStyle = {
      maxHeight: '80vh',
      overflowY : 'scroll',
    };


    return (
      <div>
      <Modal
      className='Modal_Bootstrap modal-dialog fixed-top' 
      isOpen={isModalOpen}>
        <form align='left' className='container' aria-hidden='true' onSubmit={handleSubmit} style={modalStyle}>
          <div className='modal-dialog' >
            <div className='modal-content'>
              <div className='modal-header mt-2'>
                <h4 className='d-inline-block mr-2'>Post New Job</h4>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={toggleModal}>
                  <span aria-hidden='true'>&times;</span>
                </button>
              </div>
              <div className='modal-body'>
                <div className='form-group'>
                  <label>Company Name</label>
                  {error && error.type === 'companyName' && <p className='alert alert-danger'>{error.message}</p>}
                  <Field name='companyName' className='form-control' component='input' type='text' placeholder='Company Name' />
                </div>

                <div className='form-group'>
                  <label>Company Website</label>
                  {error && error.type === 'companyWebsite' && <p className='alert alert-danger'>{error.message}</p>}
                  <Field name='companyWebsite' className='form-control' component='input' type='text' placeholder='Company Website' />
                </div>

                <div className='form-group'>
                  {error && error.type === 'title' && <p className='alert alert-danger'>{error.message}</p>}
                  <label>Title</label>
                  <Field className='form-control' name='title' component='input' type='text' placeholder='Job Title' />
                </div>

                <div className='form-group'>
                  {error && error.type === 'description' && <p className='alert alert-danger'>{error.message}</p>}
                  <label>Job Description</label>
                  <Field
                    className='form-control'
                    name='description'
                    component='textarea'
                    type='text'
                    placeholder='Job Description'
                  />
                </div>

              <div className='form-group'>
                  {error && error.type === 'employmentType' && <p className='alert alert-danger'>{error.message}</p>}
                  <label>Employment Type</label>
                  <Field
                    className='form-control'
                    name='employmentType'
                    component='select'
                    type='text'
                    placeholder='Employment Type'
                  >
                    <option value='Part-Time'>Part-Time</option>
                    <option value='Full-Time'>Full-Time</option>
                    <option value='Temporary'>Temporary</option>
                  </Field>
                </div>
                <div className='form-group'>
                  {error && error.type === 'timestamp' && <p className='alert alert-danger'>{error.message}</p>}
                  <label>Date</label>
                  <Field className='form-control' name='timestamp' component='input' type='date' placeholder='Date' />
                </div>
                <div className='form-group'>
                  {error && error.type === 'languagesUsed' && <p className='alert alert-danger'>{error.message}</p>}
                  <label>Languages Used</label>
                  <Field className='form-control' name='languagesUsed' component='input' type='text' placeholder='Languages Used' />
                </div>
                <div className='form-group'>
                  {error && error.type === 'location' && <p className='alert alert-danger'>{error.message}</p>}
                  <label>Location</label>
                  <Field className='form-control' name='location' component='input' type='text' placeholder='Location' />
                </div> 
              </div>
              <div className='modal-footer'>
                <button
                  type='button'
                  className='btn btn-block btn-outline-danger col-2 mx-3'
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={toggleModal}
                >
                  Cancel
        </button>
                <button className='btn btn-block btn-outline-primary col-3 mt-0' type='submit' >
                  Submit
        </button>
              </div>
            </div>
          </div>
        </form>
      </Modal> 
      </div>
    );
  };
}

NewJobForm = reduxForm({
  form: 'newJob',
  enableReinitialize: true
})(NewJobForm);

NewJobForm = connect(state => ({
  initialValues: {}
 }))(NewJobForm);

NewJobForm.propTypes = {
  error: PropTypes.string,
  handleSubmit: PropTypes.func,
  isNewEntry: PropTypes.bool,
  currentEntry: PropTypes.object,
  reset: PropTypes.func
};

export default NewJobForm;
