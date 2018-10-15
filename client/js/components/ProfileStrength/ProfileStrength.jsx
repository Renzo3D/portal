import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import isEqual from 'lodash.isequal';

class ProfileStrength extends React.Component {
  componentDidMount() {
    const { calculateStrength } = this.props;
    calculateStrength();
  }

  componentWillReceiveProps(nextProps) {
    // if user data is changed in the props, recalculate strength
    const { calculateStrength, user } = this.props;
    var equal = isEqual(user, nextProps.user);
    if (!equal) {
      calculateStrength();
    }
    return;
  }
  handleClick(event) {
    var text = event.target.innerHTML;
    if (/Show/.test(text)) {
      text = text.replace(/Show/, 'Hide');
    } else {
      text = text.replace(/Hide/, 'Show');
    }
    event.target.innerHTML = text;
  }
  
  render() {
    const { profileStrength } = this.props;
    const { score, studentFields, next } = profileStrength;
    return (
      <div className='card'>
        <div className='card-body'>
          <h5 className='card-title'>Profile Strength ({profileStrength.score}/100)</h5>
          <div className='progress'>
            <div
              style={{ width: score + '%' }}
              className='progress-bar'
              role='progressbar'
              aria-valuenow={score}
              aria-valuemin='0'
              aria-valuemax='100'
            />
          </div>
          <h6 className='card-subtitle my-2 text-muted'>Next up: {next}</h6>
          <ProfileStrengthList studentFields={studentFields} breakPoint='4' handleClick={this.handleClick} />
        </div>
      </div>
    );
  }
}

const ProfileStrengthList = ({ studentFields, breakPoint, handleClick }) => {
  const shownItems =
    studentFields.length &&
    studentFields.slice(0, breakPoint).map((field, index) => {
      var checkStatus = field.completed ? 'fas' : 'far';
      var textColor = field.completed && 'text-success';
      return (
        <div
          className={
            'list-group-item list-group-item-action d-flex justify-content-between align-items-center ' + textColor
          }
          to={field.link}
          key={index}
        >
          {field.name}
          <span>
            <i className={'fa-check-circle ' + checkStatus} />
          </span>
        </div>
      );
    });
  const hiddenItems =
    studentFields.length &&
    studentFields.slice(breakPoint).map((field, index) => {
      var text = `Show ${studentFields.length - breakPoint} more items`;
      var checkStatus = field.completed ? 'fas' : 'far';
      var textColor = field.completed && 'text-success';
      return (
        <div
          className={
            'list-group-item list-group-item-action d-flex justify-content-between align-items-center ' + textColor
          }
          to={field.link}
          key={index}
        >
          {field.name}
          <span>
            <i className={'fa-check-circle ' + checkStatus} />
          </span>
        </div>
      );
    });
  return (
    <div className='list-group'>
      {shownItems}
      <div className='collapse' id='collapseListItems'>
        {hiddenItems}
      </div>
      <button
        className='btn btn-outline-info mt-2 btn-sm'
        type='button'
        data-toggle='collapse'
        data-target='#collapseListItems'
        aria-expanded='false'
        aria-controls='collapseListItems'
        id='button1'
        onClick={handleClick}
      >
        Show {studentFields.length - breakPoint} more items
      </button>
    </div>
  );
};

ProfileStrength.propTypes = {
  user: PropTypes.object,
  profileStrength: PropTypes.object,
  calculateStrength: PropTypes.func
};

export default ProfileStrength;
