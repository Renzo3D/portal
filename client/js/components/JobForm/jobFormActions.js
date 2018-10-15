import axios from 'axios';
import {reset} from 'redux-form';
import { toggleModal } from '../DashBoardPage/dashBoardActions';

export function createJob(values) {
  return (dispatch, getState) => {
    axios
      .post(`/api/jobs/`, values)
      .then(response =>  {
        dispatch(toggleModal());
        return {
          type: 'POST_JOB',
          payload: response.data
        }
      })
    .catch(error => console.log(error));
    dispatch(reset('newJob'));

  };
}

export function addJobOpenings(data, jobOpenings = [], id) {
  return (dispatch, getState) => {
    const { user } = getState();
    if (data.currentPosition) {
      data.endDate = null;
    }
    jobOpenings.push(data);

    const config = { headers: { Authorization: user.accessToken } };
    axios
      .patch(`/api/employees/${id}`, { jobOpenings }, config)
      .then(response => {
        if (response.status === 200) {
        }
        $('#jobOpeningsFormModal').modal('hide');
        dispatch({ type: 'CREATE_JOB_OPENINGS', response });
      })
      .catch(err => console.log(err));
  };
}

export function updateJobOpenings(data, jobOpenings = [], jobOpeningsIndex, id) {
  $('#jobOpeningsFormModal').modal('hide');
  if (data.currentPosition) {
    data.endDate = null;
  }
  jobOpenings.splice(jobOpeningsIndex, 1, data);

  return (dispatch, getState) => {
    const { user } = getState();
    const config = { headers: { Authorization: user.accessToken } };
    dispatch({ type: 'UPDATE_JOB_OPENINGS', payload: axios.patch(`/api/employees/${id}`, { jobOpenings }, config) });
  };
}

export function deleteJobOpenings(jobOpenings, jobOpeningsIndex, id) {
  jobOpenings.splice(jobOpeningsIndex, 1);
  return (dispatch, getState) => {
    const { user } = getState();
    const config = { headers: { Authorization: user.accessToken } };
    dispatch({ type: 'DELETE_JOB_OPENINGS', payload: axios.patch(`/api/employees/${id}`, { jobOpenings }, config) });
  };
}
