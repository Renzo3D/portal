import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import isEqual from 'lodash.isequal';

class EmployerStrength extends React.Component {
  componentDidMount() {
    const { calculateStrength, user } = this.props;
    calculateStrength();
  }
  componentWillReceiveProps(nextProps) {
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
    const { employerStrength } = this.props;
    const { score, employerFields, next } = employerStrength;
    return (
      <div className='card'>
        <div className='card-body'>
          <h5 className='card-title'>Profile Strength</h5>
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
          <EmployerStrengthList employerFields={employerFields} breakPoint='4' handleClick={this.handleClick} />
        </div>
      </div>
    );
  }
}

const EmployerStrengthList = ({ employerFields, breakPoint, handleClick }) => {
  // map over list items to be shown
  const shownItems =
    employerFields.length &&
    employerFields.slice(0, breakPoint).map((field, index) => {
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
  // map over list items to be hidden
  const hiddenItems =
    employerFields.length &&
    employerFields.slice(breakPoint).map((field, index) => {
      var text = `Show ${employerFields.length - breakPoint} more items`;
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
        Show {employerFields.length - breakPoint} more items
      </button>
    </div>
  );
};

EmployerStrength.propTypes = {
  user: PropTypes.object,
  employerStrength: PropTypes.object,
  calculateStrength: PropTypes.func
};

export default EmployerStrength;
