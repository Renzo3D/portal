import React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import SkillsMenu from '../CreateProjectForm/SkillsMenu';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import { uploadImages } from '../../helper';
import { updateDatabaseUser } from './studentJobPrefsActions';

Modal.setAppElement('#root');
class StudentJobPrefs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      resumeAdd: false,
      resume: this.props.user.resume,
      error: null,
      icon: './images/icon.png'
    };
    this.formToggle = this.formToggle.bind(this)
    this.clicker = this.clicker.bind(this)
    this.dropToggle = this.dropToggle.bind(this)
    this.sendToS3 = this.sendToS3.bind(this)
    this.handleDropRejected = this.handleDropRejected.bind(this);
  }

  formToggle() {
    const { isEditing } = this.state;
    this.setState({
          isEditing: !isEditing
        });
  }

  dropToggle() {
    const { resumeAdd } = this.state;
    this.setState({
      resumeAdd: !resumeAdd
    });
  }

  clicker() {
    const { handleSubmit } = this.props;
    handleSubmit();
  }

  handleDropRejected() {
    this.setState({ error: 'Sorry, only PDF\'s accepted!'})
  }

  sendToS3(files) {
    const { dispatch } = this.props;
    
    uploadImages(files).then(response => {
      let urlToSend = JSON.stringify(response.data).match(/https:[^"]+/g);
      this.setState({resume: urlToSend, error: null}, ()=>this.dropToggle());
      let packetToSend = {
        resume: urlToSend
      };
      dispatch(updateDatabaseUser(packetToSend))
    });
  }

  render() {
    const { user, searchedStudent } = this.props;
    let person;
    if (user.userType == 'ADMIN') { person = searchedStudent; } else { person = user;}
    const { isEditing, resumeAdd } = this.state;
    return (
      <React.Fragment>
        <div className='mb-5 p-4 bg-light col-12'>
          <h4 className='font-weight-light'>Job Preferences</h4>
          <hr/>
          <div className='row'>
          <div className='col-6'>
            {this.props.renderButtons &&
            <button
              type='button'
              className='btn btn-outline-primary'
              onClick={this.formToggle}>
              Edit Preferences
            </button>}
              <div className='mt-2'>
                {person.openToRelocate ? <p>Open to relocating</p> : <p>Not open to relocating</p> }
                {person.desiredRole && <p>{person.desiredRole}</p>}
              </div>
          { isEditing &&
            <form
              onSubmit={this.clicker}
              className='mb-5 p-4 bg-light container'>
              <Field
                name='openToRelocate'
                component='select'
                className='mr-3'>
                <option value={true}>YES</option>
                <option value={false}>NO</option>
              </Field>
              <label>Open to relocation</label>
              <br />
              <label>Desired Role: {person.desiredRole}</label>
              <Field
                name='desiredRole'
                component='select'
                className='form-control desiredrole'>
                <option disabled value='Select a Role'>Select a Role</option>
                <option value='Full Stack Developer'>Full Stack Developer</option>
                <option value='Front End Developer'>Front End Developer</option>
                <option value='Back End Developer'>Back End Developer</option>
                <option value='Business Analyst'>Business Analyst</option>
                <option value="Quality Assurance">Quality Assurance</option>
              </Field>
              <br />
              <div className='form-group'>
                
              </div>
              <div className='row justify-content-start'>
                <button 
                  className='btn btn-block btn-outline-danger col-2 mx-3'
                  type='button'
                  onClick={this.formToggle}>
 
                  Cancel
                </button>
                 <button
                  className='btn btn-block btn-outline-primary col-3 mt-0'
                  type='submit'>
                  Submit
                </button>
              </div>
            </form>
          }
          </div>
          <div className='col-6'>
            {this.state.error && <div className="alert alert-danger">{this.state.error}</div>}
            {this.props.renderButtons &&
            <button
              type='button'
              className='btn btn-outline-primary'
              onClick={this.dropToggle}>
              Add Resume
            </button>}
            <br />
            {this.state.resume !== '' &&
              <a
              href={this.state.resume}
              target='_blank'>
              <img
                className='align-self-end m-3'
                src={this.state.icon}
              style={{ height: 'auto', width: '60px', border: '2px solid white', borderRadius: '2px' }}/>
               <p>Click on resume to enlarge</p>
              </a>
                 }
            { resumeAdd &&     
              <Dropzone
                name='images'
                onDrop={(acceptedFiles) => {
                  this.sendToS3(acceptedFiles);
                }}
                onDropRejected={ this.handleDropRejected }
                accept="application/pdf">
                <div className='DragUpload'>Drag and Drop or Click to Upload A Screenshot of Your Resume</div>
              </Dropzone>
            }
          </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
SkillsMenu.propTypes = {
  handleSubmit: PropTypes.func
};

StudentJobPrefs = reduxForm({
  form: 'studentjobprefs',
  initialValues: {
    openToRelocate: false,
    desiredRole: 'Select a Role'
  }
})(StudentJobPrefs);

export default StudentJobPrefs;
