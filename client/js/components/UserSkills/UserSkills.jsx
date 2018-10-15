import React from 'react';
import { updateStudentSkills, saveStudentSkills } from './userSkillsActions';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import SkillsMenu from '../CreateProjectForm/SkillsMenu';

export default class UserSkills extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            savedInput: true,
            originalInput: null
        }
        this.handleSaveStudentSkills = this.handleSaveStudentSkills.bind(this);
        this.toggleEdit = this.toggleEdit.bind(this);
        this.handleUpdateStudentSkills = this.handleUpdateStudentSkills.bind(this)
    }

    handleUpdateStudentSkills(e) {
        const { dispatch } = this.props;
        const { value } = e.input.value;
        dispatch(updateStudentSkills(value));
    }

    handleSaveStudentSkills() {
        const { dispatch, studentId, skills } = this.props;
        dispatch(saveStudentSkills(studentId, skills));
        this.setState({
            savedInput: true, 
            originalInput: skills 
        });
    }

    toggleEdit() {
        this.setState({ savedInput: !this.state.savedInput });
    }

    render() {
        const { skills } = this.props;
        const { savedInput, originalInput } = this.state;
        if (!savedInput) {
            return (
                <div className='row p-4 bg-light mt-3 mb-3'>
                    <div className='col-12 float-right'>
                        <h4>Skills:</h4>
                        <form id="userskills" onSubmit={this.handleUpdateStudentSkills}>
                            <div className='modal-dialog' role='document'>
                                <div className='modal-content'>
                                    <div className='modal-header bg-primary text-white'>
                                        <h5 className='modal-title' id='exampleModalLongTitle'>
                                            Add Skills
                                        </h5>
                                        <button type='button' onClick={this.toggleEdit}>
                                            <span aria-hidden='true'>&times;</span>
                                        </button>
                                    </div>
                                    <div className='modal-body'>
                                        <div className='container-fluid'>
                                            <div className='form-row'>
                                                <div className='form-group'>
                                                    <label>Search for Skills: </label>
                                                    <Field id="fieldSkills" name='skills' className='form-control' component={SkillsMenu} value='input'/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='modal-footer'>
                                        <button type='submit' className='btn btn-primary' >
                                            Save Changes
                                        </button>
                                        <button className='btn btn-block btn-outline-danger col-2 mx-3' onClick={this.toggleEdit} type='button'>
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )
        } else {
            return (
                <div className='row p-4 bg-light mt-3 mb-3'>
                    <div className='col-12 float-right'>
                        <h4>Skills:</h4>
                        <p className='word-break'>{ originalInput || skills }</p>
                        <button
                            className='btn btn-outline-primary'
                            onClick={this.toggleEdit}
                        >
                        Edit
                        </button>
                    </div>
                </div>
            )
        }
    }
}

UserSkills = reduxForm({
    form: 'userskills'
})(UserSkills);
  
UserSkills.propTypes = {
    handleUpdateStudentSkills: PropTypes.func,
    handleSaveStudentSkills: PropTypes.func,
    reset: PropTypes.func,
    toggleEdit: PropTypes.func
};