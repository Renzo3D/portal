import React from 'react';
import { updateStudentDescription, saveStudentDescription } from './studentDescriptionActions';

export default class StudentDescription extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            originalInput: null,
            savedInput: true
        }
        this.handleUpdateStudentDescription = this.handleUpdateStudentDescription.bind(this);
        this.handleSaveStudentDescription = this.handleSaveStudentDescription.bind(this);
        this.toggleEdit = this.toggleEdit.bind(this);
    }

    handleUpdateStudentDescription(e) {
        const { dispatch } = this.props;
        const { value } = e.target;
        dispatch(updateStudentDescription(value));
    }

    handleSaveStudentDescription() {
        const { dispatch, studentId } = this.props;
        const { studentDescription } = this.props;
        dispatch(saveStudentDescription(studentId, studentDescription));
        this.setState({ 
            savedInput: true, 
            originalInput: studentDescription 
        });
    }

    toggleEdit() {
        this.setState({ savedInput: !this.state.savedInput });
    }

    render() {
        const { studentDescription } = this.props;
        const { savedInput, originalInput } = this.state;
        if (!savedInput) {
            return (
                <div className='row p-4 bg-light mt-3 mb-3'>
                    <div className='col-12 float-right'>
                        <h4>Add Description:</h4>
                        <textarea className='form-control' placeholder='Tell us about yourself!' onChange={this.handleUpdateStudentDescription} defaultValue={originalInput} value={studentDescription} required maxLength='250'></textarea>
                        <button className='btn btn-outline-danger mt-3' onClick={this.toggleEdit}>Cancel</button> <button className='btn btn-outline-primary ml-4 mt-3' onClick={this.handleSaveStudentDescription}>Save</button>
                    </div>
                </div>
            )
        } else {
            return (
                <div className='row p-4 bg-light mt-3 mb-3'>
                    <div className='col-12 float-right'>
                        <h4>Description:</h4>
                        <p className='word-break'>{ originalInput || studentDescription }</p>
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