import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import EmployerStrength from '../EmployerStrength';
import NavigationBar from '../common/EmployerNavigationBar';
import Overlay from '../common/Overlay';
import NewJobForm from '../JobForm'

class EmployerDashBoard extends React.Component {

  render() {
    const { dashBoard, user, onSubmit, toggleModal } = this.props;
    const enable = user.enabled;
    
    return (
      <div>
        {(enable === false) && <Overlay user={user} />}
        <NavigationBar />
        <div className='container my-5'>
          <div className='row'>
            <div className='col-8'>
              <div className='card'>
                <div className='card-body'>
                  <h5 className='card-title'>Connect you to a job you love!</h5>
                  <p className='card-text'>Portal makes portfolios for students and searchable for employers.</p>
                  <Link className='btn btn-primary' to='/auth/employerProfile/'>
                    Explore your profile
                  </Link>
                  <span className='mx-3'>or</span>
                  <Link className='btn btn-success' to='/auth/searchStudents/'>
                    Find Students
                  </Link>
                  <span className='mx-3'>or</span>
                  <button type='button'
                    className='btn btn-primary'
                    onClick={toggleModal}
                    >
                    Post a Job
                  </button>
                </div>
              </div>
            </div>
            <div className='col-4'>
              <EmployerStrength />
            </div>
          </div>
        </div>
        <div
          className='modal fade'
          id='NewJobForm'
          tabIndex='-1'
          role='dialog'
          aria-labelledby='exampleModalLongTitle'
          aria-hidden='true'>
          <NewJobForm onSubmit={onSubmit} />
        </div>
      </div>
    );
  }
}

EmployerDashBoard.propTypes = {
  dashBoard: PropTypes.object,
  value: PropTypes.number,
  onIncrement: PropTypes.func,
  onDecrement: PropTypes.func
};

export default EmployerDashBoard;
