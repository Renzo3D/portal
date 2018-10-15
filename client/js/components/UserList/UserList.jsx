import React from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '400px',
  }
};

export default class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullList: [],
      first: '',
      last: '',
      id: '',
      admin: '',
      index: '',
      comment: '',
      enableModalIsOpen: false,
      disableModalIsOpen: false
    };
    this.enable = this.enable.bind(this);
    this.disable = this.disable.bind(this);
    this.openModal = this.openModal.bind(this);
    this.addComments = this.addComments.bind(this);
    this.getTime = this.getTime.bind(this);
    this.toggleVisibility = this.toggleVisibility.bind(this);
    this.visibilityChecker = this.visibilityChecker.bind(this);
    this.sortByIncrease = this.sortByIncrease.bind(this);
    this.sortByDecrease = this.sortByDecrease.bind(this);
  }
  sortByDecrease(key) {
    let array = Object.assign([], this.state.fullList)
    var sortBy = require('sort-by');
    array.sort(sortBy('-profileScore'));
    this.setState({ fullList: array });
  }
  sortByIncrease(key) {
    let array = Object.assign([], this.state.fullList)
    var sortBy = require('sort-by');
    array.sort(sortBy('profileScore'));
    this.setState({ fullList: array });
  }
  componentDidMount() {
    const { list } = this.props;
    this.setState({ fullList: list });
  }
  addComments(e) {
    this.setState({comment: e.target.value});
  }
  openModal(action, firstName, lastName, userId, i, adminUser) {
    if (action === 'enableModalIsOpen') {
      this.setState({
        enableModalIsOpen: true,
        first: firstName,
        last: lastName,
        id: userId,
        admin: adminUser,
        index: i,
      });
    }
    if (action === 'disableModalIsOpen') {
      this.setState({
        disableModalIsOpen: true,
        first: firstName,
        last: lastName,
        id: userId,
        admin: adminUser,
        index: i
      });
    }
  }
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
  closeModal(action) {
    if (action === 'enableModalIsOpen') {
      this.setState({enableModalIsOpen: false});
    }
    if (action === 'disableModalIsOpen') {
      this.setState({disableModalIsOpen: false});
    }
  }
  enableModal() {
    return (
      <div>
        <div style = {{fontSize: '20px'}}>Are you sure you want to Enable {this.state.first} {this.state.last} </div>
        <form>
          <button className = 'btn btn-danger float-right' type = 'button' onClick={(e) => this.closeModal('enableModalIsOpen')}>Cancel</button>
          <button className = 'btn btn-success float-right' type = 'button' onClick={(e) => this.enable(e)}>Submit</button>
        </form>
      </div>
    );
  }
  disableModal() {
    return (
      <div>
        <div>Are you sure you want to Disable {this.state.first} {this.state.last}</div>
        <form>
          <textarea onChange = {this.addComments} className = 'form-control' style = {{height: '150px'}} required/>
          <button className = 'btn btn-danger float-right' type = 'button' onClick={(e) => this.closeModal('disableModalIsOpen')}>Cancel</button>
          <button className = 'btn btn-success float-right' type = 'button' onClick={(e) => this.disable(e)}>Submit</button>
        </form>
      </div>
    );
  }
  enable(e) {
    e.preventDefault();
    const { fullList, index, id, admin } = this.state;
    fullList[index].enabled = true;
    this.setState({ fullList: fullList, enableModalIsOpen: false});
    this.props.enableUser(id, admin);
  }
  disable(e) {
    const { fullList, index, id, admin, comment } = this.state;
    fullList[index].enabled = false;
    this.setState({ fullList: fullList, disableModalIsOpen: false });
    this.props.disableUser(id, admin, comment);
  }
  toggleVisibility(i, users) {
    this.setState({index: i}, () => {
      const { fullList, index, id } = this.state;
      let newList = fullList.slice();
      newList[index].visible = !newList[index].visible;
      this.setState({fullList: newList}, () => this.props.toggleVisible(id, users));
    });
  }
  visibilityChecker(i, users) {
    if (users.visible) {
      return <button onClick={() => this.toggleVisibility(i, users)} className='btn btn-success'> VISIBLE </button>;
    }
    return <button onClick={() => this.toggleVisibility(i, users)} className='btn btn-danger disabled'> HIDDEN </button>;
  }
  render() {
    const { adminUser } = this.props;
    return (
      <div className='row'>
      <div className='p-4 bg-light userlist'>
        <button className='btn btn-info' onClick={() => this.props.refreshList(adminUser)}>Refresh List</button>
        <button className='btn btn-info float-right' onClick={() => this.props.hideView()}>Hide List</button>
        <hr />
        <Modal
          isOpen={this.state.enableModalIsOpen}
          onRequestClose={this.closeModal.bind(this)}
          style={customStyles}
          contentLabel='Enable Modal'>
          { (this.state.enableModalIsOpen) && this.enableModal()}
        </Modal>
        <Modal
          isOpen={this.state.disableModalIsOpen}
          onRequestClose={this.closeModal.bind(this)}
          style={customStyles}
          contentLabel='Disable Modal'>
          { (this.state.disableModalIsOpen) && this.disableModal()}
        </Modal>
          <table className='table center '>
            <thead className = 'text-center'>
              <tr id='result-row' className='row justify-content-md-center no-gutters'>
                <th className='td-num'>#</th>
                <th className='td-first'>First Name</th>
                <th className='td-last'>Last Name</th>
                <th>HackerRank</th>
                <th>Last Login</th>
                <th >Updated</th>
                <th >Graduation Date</th>
                <th>Enable User</th>
                <th>Disable User</th>
                <th>User Link</th>
                <th>Visibility</th>
                <th>Profile Score<button onClick={() => this.sortByDecrease('profileScore')}><i className="arrow up"></i></button><button onClick={() => this.sortByIncrease('profileScore')}><i className="arrow down"></i></button></th>
              </tr>
            </thead>
          <tbody>
            {this.state.fullList.map((users, i) => {
              var color, enableButton, disableButton, gradDate, route;
              if (users.userType === 'STUDENT') {
                color = 'list-group-item list-group-item-action list-group-item-secondary';
                route = 'student';
                if (users.graduationDate === undefined) {
                  gradDate = 'In Progress';
                } else {
                  gradDate = users.graduationDate;
                }
              }
              if (users.userType === 'EMPLOYEE') {
                gradDate = '';
                color = 'list-group-item list-group-item-action list-group-item-light';
                route = 'employer';
              }
              if (users.userType === 'ADMIN') {
                gradDate = '';
                color = 'list-group-item list-group-item-action list-group-item-warning';
              }
              if (users.enabled === false) {
                enableButton = 'btn btn-success';
                disableButton = 'btn btn-danger disabled';
                color = 'list-group-item list-group-item-action list-group-item-danger';
              }
              if (users.enabled !== false) {
                enableButton = 'btn btn-success disabled';
                disableButton = 'btn btn-danger';
              }
              return (
                <tr  key = {i} className = {color}>
                  <td className='td-num'>
                    {i + 1}
                  </td>
                  <td className='td-first'>
                    {users.firstName}
                  </td>
                  <td className='td-last'>
                    {users.lastName}
                  </td>
                  <td id='td-rank'>
                    {(users.hackerRankScore == null) ? 'No Score' : users.hackerRankScore }
                  </td>
                  <td id='td-time'>
                    {this.getTime(users.timeStamp)}
                  </td>
                  <td id='td-updated'>
                    {this.getTime(users.hackerRankUpdated)}
                  </td>
                  <td id='td-grad'>
                    {gradDate}
                  </td>
                  <td id='res-btn-green'>
                    <button className={enableButton}
                      onClick={() => this.openModal('enableModalIsOpen', users.firstName, users.lastName, users.id, i, adminUser)}>enable
                    </button>
                  </td>
                  <td id='res-btn-red'>
                    <button className={disableButton}
                      onClick={() => this.openModal('disableModalIsOpen', users.firstName, users.lastName, users.id, i, adminUser)}>disable
                    </button>
                  </td>
                  <td id='res-btn-user'>
                    <Link to={`auth/${route}/${users.id}`} className = 'text-dark'>
                    View Profile
                    </Link>
                  </td>
                  <td>
                    {this.visibilityChecker(i, users)}
                  </td>
                  <td id='td-profile-score'>
                    <Link to={`auth/${route}/${users.id}`} className = 'text-dark'> {users.profileScore} </Link>
                  </td>
                </tr>
              );
            }
          )}
          </tbody>
          </table>
        </div>
      </div>
    );
  }
}
