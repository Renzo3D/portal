import React from 'react';
import UserOverview from '../UserOverview';
import NavigationBar from '../common/NavigationBar';

class EmployerProfile extends React.Component {
  constructor() {
    super();
    this.state = {
      workHistoryStatus: null,
      workHistoryIndex: null
    };
    this.handleWorkHistoryClick = this.handleWorkHistoryClick.bind(this);
  }
  handleWorkHistoryClick(event) {
    const { name, value } = event.target;
  }
  render() {
    const  user  = this.props;
    return (
      <div>
        <NavigationBar />
      <div className='container'>
        <UserOverview user={user} />
        </div>
      </div>
    );
  }
}

EmployerProfile.propTypes = {};

export default EmployerProfile;

