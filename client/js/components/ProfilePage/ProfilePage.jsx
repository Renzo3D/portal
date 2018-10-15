import React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import UserOverview from '../UserOverview';
import EducationEntries from '../common/EducationEntries';
import WorkHistories from '../common/WorkHistories';
import CreateWorkHistory from '../CreateWorkHistory';
import NavigationBar from '../common/NavigationBar';
import StudentJobPrefs from '../StudentJobPrefs';
import Overlay from '../common/Overlay';
import Portfolio from '../PortfolioPage'
import { deleteWorkHistory, deleteEducationHistory } from '../StudentProfile/StudentProfileActions';


class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      workHistoryStatus: null,
      workHistoryIndex: null
    };
    this.handleWorkHistoryClick = this.handleWorkHistoryClick.bind(this);
    this.handleWorkDelete = this.handleWorkDelete.bind(this);
    this.handleEducationDelete = this.handleEducationDelete.bind(this);
  }

  handleWorkHistoryClick(event) {
    const { name, value } = event.target;
    let workHistoryIndex = null;
    let workHistoryStatus = null;
    if (value === 'new') {
      workHistoryStatus = true;
    } else {
      workHistoryStatus = false;
      workHistoryIndex = name;
    }
    this.setState({
      workHistoryStatus,
      workHistoryIndex
    });
  }

  handleWorkDelete(event) {
    const { user, dispatch } = this.props;
    const  { name } = event.target;
    var i = name;
    var workHistory = user.workHistory;
    return dispatch(deleteWorkHistory(workHistory, i, user.id ));
  }

  handleEducationDelete(event) {
    const { user, dispatch } = this.props;
    const { name } = event.target;
    var i = name;
    var educationHistory = user.educationHistory;
    return dispatch(deleteEducationHistory(educationHistory, i, user.id ));
  }

  render() {
    
    const { workHistoryStatus, workHistoryIndex } = this.state;
    const { user } = this.props;
    const { educationHistory, workHistory, id } = user;
    const enable = user.enabled;
    return (
      <div>
        {(enable === false) && <Overlay user = {user}/>}
        <NavigationBar />
        <div className='container'>
          <div className='all-components'>
          <UserOverview user={user} searchedUser={false} />
          </div>
          <div className='all-components'>
          <StudentJobPrefs user={user} renderButtons={true}/>
          </div>
          <div className='all-components'> 
          <CreateWorkHistory isNewEntry={workHistoryStatus} index={workHistoryIndex} />
          </div>
          <div className='all-components'>
          <WorkHistories entries={workHistory} myEntries={true} handleEditClick={this.handleWorkHistoryClick} handleWorkDelete={this.handleWorkDelete}/>
          </div>
          <div className='all-components'>
          <EducationEntries entries={educationHistory} studentId={id} loggedInId={id} renderButtons={true} user={user} handleEducationDelete={this.handleEducationDelete}/>
          </div>
          <div className='all-components'>
          <Portfolio />
          </div>
        </div>
      </div>
    );
  }
}

ProfilePage.propTypes = {};

export default reduxForm({
  form: 'profileForm'
})(ProfilePage);

