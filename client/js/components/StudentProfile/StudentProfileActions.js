import axios from 'axios';

export const searchedStudent = (student) => {
  return {
    type: 'SEARCHED_STUDENT',
    payload: student
  }
}

export const deleteWorkHistory = (workHistory, i, person) => {
  workHistory.splice(i, 1);
  console.log('HISTORY AFTER: ', workHistory);
  return (dispatch, getState) => {
    const { user } = getState();
    const config = { headers: { Authorization: user.accessToken } };
    dispatch({
      type: 'DELETE_WORK_HISTORY',
      payload:
        axios.patch(`/api/students/${person}`, { workHistory }, config, 
        window.location.reload()
      )
    });
  };
}

export const deleteEducationHistory = (educationHistory, i, person) => {
  educationHistory.splice(i, 1);
  return (dispatch, getState) => {
    const { user } = getState();
    const config = { headers: { Authorization: user.accessToken } };
    dispatch({
      type: 'DELETE_EDUCATION_HISTORY',
      payload:
        axios.patch(`/api/students/${person}`,{ educationHistory }, config, window.location.reload())
    });
  };
}
