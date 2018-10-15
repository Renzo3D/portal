import React from 'react';
import PropTypes from 'prop-types';

const CancelConfirmModal = ({ redirectFunction }) => {
  return (
    <div
      className='modal fade'
      id='cancelConfirmModal'
      tabIndex='-1'
      role='dialog'
      aria-labelledby='cancelConfirmLabel'
      aria-hidden='true'
    >
      <div className='modal-dialog' role='document'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title' id='cancelConfirmLabel'>
              Confirm cancellation
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
              onClick={redirectFunction}
            >
              Yes
            </button>
            <button
              type='button'
              className='btn btn-outline-primary'
              onClick={() => $('#cancelConfirmModal').modal('hide')}
            >
              No, keep my work
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

CancelConfirmModal.propTypes = {
  redirectFunction: PropTypes.func
};

export default CancelConfirmModal;
