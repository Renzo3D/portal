import axios from 'axios';
import { reset } from 'redux-form';

export function addWorkHistory(data, workHistory, id) {
  return (dispatch, getState) => {
    const { user } = getState();
    if (data.currentPosition) {
      data.endDate = null;
    }
    workHistory.push(data);

    const config = { headers: { Authorization: user.accessToken } };
    axios
      .patch(`/api/students/${id}`, { workHistory }, config)
      .then(response => {
        if (response.status === 200) {
        }
        $('#workHistoryFormModal').modal('hide');
        dispatch({ type: 'CREATE_WORK_HISTORY', response,  }, window.location.reload());
      })
      .catch(err => console.log(err));
  };
}

export function updateWorkHistory(data, workHistory = [], workHistoryIndex, id) {
  $('#workHistoryFormModal').modal('hide');
  if (data.currentPosition) {
    data.endDate = null;
  }
  workHistory.splice(workHistoryIndex, 1, data);

  return (dispatch, getState) => {
    const { user } = getState();
    const config = { headers: { Authorization: user.accessToken } };
    dispatch({ type: 'UPDATE_WORK_HISTORY', payload: axios.patch(`/api/students/${id}`, { workHistory }, config, window.location.reload() ) });
  };
}

export function deleteWorkHistory(workHistory, workHistoryIndex, id) {
  workHistory.splice(workHistoryIndex, 1);
  return (dispatch, getState) => {
    const { user } = getState();
    const config = { headers: { Authorization: user.accessToken } };
    dispatch({ type: 'DELETE_WORK_HISTORY', payload: axios.patch(`/api/students/${id}`, { workHistory }, config) });
  };
}
