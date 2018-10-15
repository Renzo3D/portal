import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ProfileStrength from '../ProfileStrength';
import EmployerDashboard from '../EmployerDashboard';
import NavigationBar from '../common/NavigationBar';
import AdminDashboard from '../AdminDashboard';
import Overlay from '../common/Overlay';

class DashBoard extends React.Component {

  componentDidMount() {
    const { user } = this.props;
    if (user.userType === undefined) {
      window.location.reload();
    }
  }

  render() {
    const { dashBoard, user } = this.props;
    const enable = user.enabled;
    if (user.userType === 'STUDENT') {
      return (
        <div>
          {(enable === false) && <Overlay user = {user}/>}
          <NavigationBar />
          <div className='container my-5'>
            <div className='row'>
              <div className='col-sm-12 col-md-8'>
                {/* display message to complete profile */}
                <div className='card mb-2 border-info'>
                  <div className='card-body'>
                    <br />
                    { ProfileStrength.score === 100 ? (
                      <h5 className='text-center'>Your profile is now complete, make sure to constantly update it.</h5>
                      ) : (
                      <h5 className='text-center'>Complete your profile to be seen today!</h5>)}                    <br />
                  </div>
                </div>

                <div className='card'>
                  <div className='card-body'>
                    <h5 className='card-title'>Connect you to a job you love!</h5>
                    <p className='card-text'>Portal makes portfolios for students and searchable for employers.</p>
                    <div class="text-right">
                    <Link className='btn btn-primary' to='/auth/profile'>
                      Explore your profile
                    </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-sm-12 col-md-4'>
                <ProfileStrength />
              </div>
            </div>
          </div>
        </div>
      );
    }
    if (user.userType === 'ADMIN') {
      return <AdminDashboard/>;
    }
    if (user.userType === 'EMPLOYEE') {
      return <EmployerDashboard />;
    }
    return <p className='text-center'><i className='fa fa-spinner fa-spin h3'/></p>;
  }
}

DashBoard.propTypes = {
  dashBoard: PropTypes.object,
  user: PropTypes.object,
  value: PropTypes.number
};

export default DashBoard;
