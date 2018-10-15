const axios = require('axios');

export function updateDatabaseEmployee(values) {
  return (dispatch, getState) => {
    const { user } = getState();
    const config = { headers: { Authorization: user.accessToken } };
    axios
      .patch(`/api/employees/${user.id}`, values, config)
      .then(response => {
        $('#exampleModalLong').modal('hide');
        response.data.accessToken = user.accessToken;
        response.data.userType = user.userType;
        dispatch({
          type: 'UPDATE_DATABASE_USER',
          payload: response.data
        });
      })
      .catch(error => console.log(error));
  };
}

export const cancelForm = () => {
  return {
    type: 'CANCEL_USER_OVERVIEW_FORM'
  };
};
