import React from 'react';
import NewJobForm from './NewJobForm';
import { addJobOpenings, updateJobOpenings, deleteJobOpenings } from './jobFormActions';
import DeleteConfirmModal from '../common/DeleteConfirmModal';
import validate from './validate';


export default class JobForm extends React.Component {
  constructor(props) {
    super(props);
    this.updateJobOpeningsDatabase = this.updateJobOpeningsDatabase.bind(this);
    this.handleDeleteJobOpenings = this.handleDeleteJobOpenings.bind(this);
    this.addJobOpenings = this.addJobOpenings.bind(this);
  }


  updateJobOpeningsDatabase(values, dispatch) {
    validate(values);
    const { jobOpenings, id, isNewEntry, index } = this.props;
    if (isNewEntry) {
      return dispatch(addJobOpenings(values, jobOpenings, id));
    } else {
      return dispatch(updateJobOpenings(values, jobOpenings, index, id));
    }
  }

  handleDeleteJobOpenings() {
    const { jobOpenings, index, id, dispatch } = this.props;
    $('#deleteConfirmModal').modal('hide');
    $('#jobOpeningsFormModal').modal('hide');
    return dispatch(deleteJobOpenings(jobOpenings, index, id));
  }

  render() {
    const { isNewEntry, index, jobOpenings } = this.props;
    let currentEntry = null;
    if (!isNewEntry) {
      currentEntry = jobOpenings[index];
    }

    return (
      <div
        className='modal fade'
        id='jobOpeningsFormModal'
        tabIndex='-1'
        role='dialog'
        aria-labelledby='jobOpeningsFormLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog' role='document'>
          <div className='modal-content'>
            <DeleteConfirmModal successCallback={this.handleDeleteJobOpenings} />
            <NewJobForm
              isNewEntry={isNewEntry}
              currentEntry={currentEntry}
              initialValues={currentEntry}
              handleSubmit={this.handleSubmit}
              values={this.props.newJob.values}
            />
          </div>
        </div>
      </div>
    );
  }
}
