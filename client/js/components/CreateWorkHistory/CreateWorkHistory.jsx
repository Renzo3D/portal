import React from 'react';
import NewWorkHistoryForm from './newWorkHistoryForm';
import { addWorkHistory, updateWorkHistory} from './createWorkHistoryActions';
import validate from './validate';

export default class CreateWorkHistory extends React.Component {
  constructor(props) {
    super(props);
    this.updateWorkHistoryDatabase = this.updateWorkHistoryDatabase.bind(this);
    // this.handleDeleteWorkHistory = this.handleDeleteWorkHistory.bind(this);
  }

  updateWorkHistoryDatabase(values, dispatch) {
    validate(values);
    //index and isNewEntry comes from parent
    const { user, isNewEntry, index, searchedId } = this.props;
    var person;
    if (user.userType == 'ADMIN'){ person = searchedId.searchedStudent } else { person = user }
    if (isNewEntry) {
      return dispatch(addWorkHistory(values, person.workHistory, person.id));
    } else {
      return dispatch(updateWorkHistory(values, person.workHistory, index, person.id));
    }
  }

  handleDeleteWorkHistory() {
    const { index, user, dispatch, searchedId } = this.props;
    console.log('SEARCHED: ', searchedId);
    var person;
    if (user.userType == 'ADMIN'){ person = searchedId } else { person = user.id }
    $('#deleteConfirmModal').modal('hide');
    $('#workHistoryFormModal').modal('hide');
    return dispatch(deleteWorkHistory(user.workHistory, index, person));
  }

  render() {
    const { isNewEntry, index, user } = this.props;
    const { workHistory } = user;
    let currentEntry = null;
    if (!isNewEntry) {
      currentEntry = workHistory[index];
    }
    return (
      <div
        className='modal fade'
        id='workHistoryFormModal'
        tabIndex='-1'
        role='dialog'
        aria-labelledby='workHistoryFormLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog' role='document'>
          <div className='modal-content'>
            <NewWorkHistoryForm
              isNewEntry={isNewEntry}
              currentEntry={currentEntry}
              initialValues={currentEntry}
              onSubmit={this.updateWorkHistoryDatabase}
            />
          </div>
        </div>
      </div>
    );
  }
}
