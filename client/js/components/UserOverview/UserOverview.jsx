import React from 'react';
import PropTypes from 'prop-types';
import UserOverviewForm from '../UserOverviewForm';
import UserCoverPhoto from '../UserCoverPhoto';
import StudentDescription from '../StudentDescription';
import UserSkills from '../UserSkills';

class UserOverview extends React.Component {
  constructor() {
    super();
    this.state = {
      jobOpeningsStatus: null,
      jobOpeningsIndex: null,
      justRerender: false
    };
    this.handleJobOpeningsClick = this.handleJobOpeningsClick.bind(this);
    this.getTime = this.getTime.bind(this);
    this.toggleRerender = this.toggleRerender.bind(this);
  }
  toggleRerender() {
    this.setState({ justRerender: !this.state.justRerender });
  }
  handleJobOpeningsClick(event) {
    const { name, value } = event.target;
    let jobOpeningsIndex = null;
    let jobOpeningsStatus = null;

    if (value === 'new') {
      jobOpeningsStatus = true;
    } else {
      form
      jobOpeningsStatus = false;
      jobOpeningsIndex = name;
    }
    this.setState({
      jobOpeningsStatus,
      jobOpeningsIndex
    });
  }
  getGradDate(gradDate, hasJob) {
    let date;
    if (hasJob === true) {
      date = 'Found a Job'
    } else {  
      if (gradDate === undefined || gradDate === '') {
        date = 'In Progress'
      } else {
        date = this.getTime(gradDate);
      }
    }
    return date;
  };
  getTime(timeStamp) {
    let time;
    if (timeStamp === undefined) { time = 'NA'; } else {
      timeStamp = new Date(timeStamp);
      var hr = timeStamp.getHours();
      var min = timeStamp.getMinutes();
      var dd = timeStamp.getDate();
      var mm = timeStamp.getMonth() + 1;
      var yyyy = timeStamp.getFullYear();

      if (dd < 10) {
        dd = '0' + dd;
      }
      if (mm < 10) {
        mm = '0' + mm;
      }
      time = mm + '-' + dd + '-' + yyyy;
    }
    return time;
  }
  userDisabled() {
    return (
      <div className='card text-center' style={{ border: '4px solid red', marginBottom: '2rem', textDecoration: 'bold', color: 'red' }}>
        <div className='card-body'>
          <div className='card-title'>
            <h2>THIS USER HAS BEEN DISABLED</h2>
          </div>
        </div>
      </div>
    );
  }
  render() {
    const { user, onSubmit, adminUser, searchedUser } = this.props;
    let admin;
    (adminUser !== undefined) ? admin = adminUser.userType : admin = '';
    let img1Src = 'https://s3-us-west-1.amazonaws.com/oca-portal/images/Graduated_Blue_Background.jpg';
    let img2Src = user.profilePicture
      ? user.profilePicture
      : 'https://s3-us-west-1.amazonaws.com/oca-portal/images/Generic_Avatar.png';
    const { userType } = this.props.user;
    return (
      <React.Fragment>
        { user.firstName !== '' &&
        <UserCoverPhoto user={user} defaultSrc={img1Src} searchedUser={searchedUser} profilePic={img2Src}>
          <div
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.25)',
              color: 'white',
              fontWeight: '800',
              position: 'absolute',
              bottom: '10px',
              left: '200px',
              padding: '10px 15px 0px 15px'
            }}>
            <h2>{`${user.firstName} ${user.lastName}`}</h2>
            <h3>{`${user.companyName}`}</h3>
            <p style={{marginBottom:'0px'}}>{user.headline}</p>
            <p>Last Login: {this.getTime(user.timeStamp)}</p>
          </div>
          {(!this.props.searchedUser == true && (userType === 'STUDENT' || userType === 'ADMIN' || userType === 'EMPLOYEE')) && <button
            type='button'
            className='btn btn-primary m-0'
            data-toggle='modal'
            data-target='#exampleModalLong'
            style={{ position: 'absolute', bottom: '10px', right: '25px' }}>
            <i className='fas fa-pencil-alt' />Edit Info
            </button>}
          </UserCoverPhoto> }
        {(admin === 'ADMIN' && user.enabled === false) && this.userDisabled()}
        <div className='media-body container'>
          <div className='row p-4 bg-light mt-3 mb-3'>
            <div className='col-6'>
              <h3>Contact Information: </h3>
              <a href={`mailto:${user.email}`}>{user.email}</a>
            </div>        
            <div className='col-6'>
              <a href={user.gitUrl} target='_blank'>{user.gitUrl}</a><br/>
              <a href={user.linkedInUrl} target='_blank'>{user.linkedInUrl}</a><br/>
              <a href={`tel:${user.phoneNumber}`}>{user.phoneNumber}</a><br/>
              <a>{user.studentLocation}</a>
            </div>
          </div>
          {(user.userType == 'STUDENT') && 
          (
          <div>
          <StudentDescription/>
          <div className='row p-4 bg-light mt-3 mb-3'>
            <div className='col-6 float-right'>
              <h4>Graduation Date: {this.getGradDate(user.graduationDate, user.hasJob)}</h4>
            </div>
          </div>
          <UserSkills/>
          </div>)
          }
        </div>
        <div
          className='modal fade'
          id='exampleModalLong'
          tabIndex='-1'
          role='dialog'
          aria-labelledby='exampleModalLongTitle'
          aria-hidden='true'>
          <UserOverviewForm onSubmit={onSubmit} />
        </div>
      </React.Fragment>
    );
  }
}

UserOverview.propTypes = {
  user: PropTypes.object,
  onSubmit: PropTypes.func
};

export default UserOverview;