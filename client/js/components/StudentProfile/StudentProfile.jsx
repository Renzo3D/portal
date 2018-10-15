//Renders a SEARCHED student's profile
import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import UserOverview from '../UserOverview';
import ProjectDetails from '../ProjectDetails';
import WorkHistories from '../common/WorkHistories';
import EducationEntries from '../common/EducationEntries';
import NavigationBar from '../common/NavigationBar';
import Overlay from '../common/Overlay';
import { searchedStudent, deleteWorkHistory, deleteEducationHistory } from './StudentProfileActions';
import CreateWorkHistory from '../CreateWorkHistory';
import StudentJobPrefs from '../StudentJobPrefs';

class StudentProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      studentProfile: {},
      error: '',
      workHistoryStatus: null,
      workHistoryIndex: null
    };
    this.handleWorkHistoryClick = this.handleWorkHistoryClick.bind(this);
    this.handleWorkDelete = this.handleWorkDelete.bind(this);
    this.handleEducationDelete = this.handleEducationDelete.bind(this);

  }

  componentWillMount() {
    const { dispatch }= this.props;
    const pathname = window.location.pathname;
    const studentId = pathname.match(/[a-z0-9]*$/)[0];
    axios
      .get(`/api/students/${studentId}`)
      .then(response => {
        this.setState({ studentProfile: response.data }, () => dispatch(searchedStudent(this.state.studentProfile)));
      })
      .catch(err => {
        console.log('Something went wrong: ' + err);
      });
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
    const { user, dispatch, searchedStudent } = this.props;
    const { name } = event.target;
    var i = name;
    var person;
    if (user.userType == 'ADMIN'){ person = searchedStudent.searchedStudent} else { person = user }
    var workHistory = person.workHistory;
    return dispatch(deleteWorkHistory(workHistory, i, person.id));
  }

  handleEducationDelete(event) {
    const { user, dispatch, searchedStudent } = this.props;
    const { name } = event.target;
    var i = name;
    var person;
    if (user.userType == 'ADMIN'){ person = searchedStudent.searchedStudent} else { person = user }
    var educationHistory = person.educationHistory;
    return dispatch(deleteEducationHistory(educationHistory, i, person.id ));
  }

  allowUser(studentProfile, user) {
    return (
      <React.Fragment>
        {(studentProfile.enabled === false) && <Overlay user={studentProfile} />}
        <UserOverview user={studentProfile} searchedUser={true} />
        <StudentJobPrefs user={studentProfile} renderButtons={false}/>
        {studentProfile.workHistory ?
        <WorkHistories entries={studentProfile.workHistory} myEntries={false} handleEditClick={this.handleWorkHistoryClick} handleWorkDelete={this.handleWorkDelete} />
        : ''}
        {studentProfile.educationHistory ?
        <EducationEntries entries={studentProfile.educationHistory} studentId={studentProfile.id} loggedInId={studentProfile.id} renderButtons={false} user={user} handleEducationDelete={this.handleEducationDelete}/>
        : ''}
        {studentProfile.projects ? studentProfile.projects.map((project, index) =>
        <ProjectDetails key={project+index} project={studentProfile.projects[index]} idx={index} images={studentProfile.projects[index].images[0]} />)
        : ''}
      </React.Fragment>
    )
  }
  allowAdmin(studentProfile, admin,  workHistoryStatus, workHistoryIndex) {
    return (
      <React.Fragment>
        <UserOverview user={studentProfile} adminUser = {admin}/>
        <StudentJobPrefs user={studentProfile} renderButtons={true}/>
        {studentProfile.workHistory ?
        <React.Fragment>
        <CreateWorkHistory isNewEntry={workHistoryStatus} index={workHistoryIndex} />
        <WorkHistories entries={studentProfile.workHistory} myEntries={true} handleEditClick={this.handleWorkHistoryClick} handleWorkDelete={this.handleWorkDelete} />
        </React.Fragment>
        : ''}
        {studentProfile.educationHistory ?
        <EducationEntries entries={studentProfile.educationHistory} studentId={studentProfile.id} loggedInId={studentProfile.id} renderButtons={true} adminUse={true} user={admin} searchedStudent={studentProfile} handleEducationDelete={this.handleEducationDelete}/>
        : ''}
        {studentProfile.projects ? studentProfile.projects.map((project, index) =>
        <ProjectDetails key={project+index} project={studentProfile.projects[index]} idx={index} images={studentProfile.projects[index].images[0]} />)
        : ''}
      </React.Fragment>
    )
  }

  render() {
    const { studentProfile, workHistoryStatus, workHistoryIndex } = this.state;
    const { projects, educationHistory, workHistory, id } = studentProfile;
    const { user } = this.props;
    const isLoaded = Object.keys(studentProfile).length !== 0;
    return (
      <div>
        <NavigationBar />
        <div className='container'>
          {!isLoaded && (
            <p className='text-center'>
              <i className='fa fa-spinner fa-spin h3' />
            </p>
          )}
          {isLoaded && (
            <React.Fragment>
              {(user.userType === 'ADMIN') ?
              this.allowAdmin(studentProfile, user, workHistoryStatus, workHistoryIndex)
              :
              this.allowUser(studentProfile, workHistory, educationHistory, id, projects)}
            </React.Fragment>
          )}
        </div>
      </div>
    );
  }
}
StudentProfile.propTypes = {
  location: PropTypes.object
};

export default StudentProfile;
