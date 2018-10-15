import React from 'react';
import PropTypes from 'prop-types';

const DeleteConfirmModalEducation = ({ successCallback }) => {
  const hideModal = () => {
    $('#deleteConfirmModalEducation').modal('hide');
  };
  return (
    <div
      className='modal fade'
      id='deleteConfirmModalEducation'
      tabIndex='-1'
      role='dialog'
      aria-labelledby='deleteConfirmLabel'
      aria-hidden='true'
    >
      <div className='modal-dialog' role='document'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title' id='deleteConfirmLabel'>
              Confirm deletion
            </h5>
            <button
              type='button'
              className='close'
              data-dismiss='modal'
              aria-label='Close'
            >
              <span aria-hidden='true'>&times;</span>
            </button>
          </div>
          <div className='modal-body'>Are you sure you want to continue?</div>
          <div className='modal-footer'>
            <button
              type='button'
              className='btn btn-outline-danger'
              onClick={successCallback}
            >
              Yes, delete this entry
            </button>
            <button
              type='button'
              className='btn btn-outline-primary'
              onClick={hideModal}
            >
              No, keep my work
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

DeleteConfirmModalEducation.propTypes = {
  redirectFunction: PropTypes.func
};

export default DeleteConfirmModalEducation;
