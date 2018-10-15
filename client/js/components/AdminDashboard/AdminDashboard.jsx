import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import UserList from '../UserList/UserList';
import NavigationBar from '../common/NavigationBar';
import { getAllUsers, disableUser, enableUser, updateUserScore, toggleUserVisibility } from './AdminDashboardActions';

class AdminDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showList: false,
      loading: false
    };
    this.blockUser = this.blockUser.bind(this);
    this.allowUser = this.allowUser.bind(this);
    this.getList = this.getList.bind(this);
    this.refreshUsers = this.refreshUsers.bind(this);
    this.hideList = this.hideList.bind(this);
    this.toggleVisible = this.toggleVisible.bind(this);
  }

  componentDidMount() {
    const { dispatch, user } = this.props;
    dispatch(getAllUsers(user));
  }

  refreshUsers(user) {
    const { dispatch } = this.props;
    dispatch(updateUserScore(user));
    this.setState({ loading: true });
  }

  blockUser(id, user, message) {
    const { dispatch, allUsers } = this.props;
    dispatch(disableUser(id, allUsers, user, message));
  }
  allowUser(id, user) {
    const { dispatch, allUsers } = this.props;
    dispatch(enableUser(id, allUsers, user));
  }
  getList(e) {
    e.preventDefault();
    this.setState({ showList: true });
  }
  hideList(e) {
    this.setState({ showList: false, loading: false });
  }

  toggleVisible(id, user) {
    const { dispatch, allUsers } = this.props;
    dispatch(toggleUserVisibility(id, allUsers, user))
  }

  render() {
    const { allUsers, user, updated } = this.props;
    return (
      <div>
        <NavigationBar />
        <div className='container my-5'>
          <div className='row'>
            <div className='col-sm-12 col-md-8'>
              <div className='card'>
                <div className='card-body'>
                  <h3 className='card-title text-center'>Hello   {user.firstName} {user.lastName}
                  </h3>
                </div>
              </div>
            </div>
            <div className='col-sm-12 col-md-4' style = {{marginBottom: '1rem'}}>
              <div className='card'>
                <div className='card-body text-center'>
                  <h4 className='card-title'>Admin Toolbar</h4>
                  <div className = 'text-center'>
                  <button
                    className='btn btn-primary form-control'
                    onClick={this.getList}
                    style = {{marginBottom: '.5rem', width: '200px'}}> Get All Users
                </button>
                </div>
                <div className = 'text-center'>
                  <Link className='btn btn-primary' to='/auth/profile'
                  style = {{marginBottom: '.5rem', width: '200px'}}>
                    Explore your profile
                    </Link>
                </div>
                <div className = 'text-center'>
                  <Link className='btn btn-success' to='/auth/portfolio'
                  style = {{marginBottom: '.5rem', width: '200px'}}>
                    Explore your projects
                    </Link>
                    </div>
                </div>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-sm-12 col-md-12'>
              {(this.state.showList) &&
                <UserList
                  adminUser={user}
                  list={allUsers}
                  enableUser={this.allowUser}
                  disableUser={this.blockUser}
                  refreshList={this.refreshUsers}
                  view={this.state.showList}
                  update={updated}
                  hideView={this.hideList}
                  toggleVisible={this.toggleVisible}>
                </UserList>
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AdminDashboard.propTypes = {
  AdminDashboard: PropTypes.object,
  user: PropTypes.object,
  value: PropTypes.number
};

export default AdminDashboard;
