const axios = require('axios');

export function updateDatebaseUser(values) {
  return (dispatch, getState) => {
    const { user, searchedStudent } = getState();
    let person;
    if (user.userType == 'ADMIN') {person = searchedStudent.searchedStudent} else {person = user}
    const config = { headers: { Authorization: user.accessToken } };
    axios
      .patch(`/api/${person.userType}s/${person.id}`, values, config)
      .then(response => {        
        $('#exampleModalLong').modal('hide');
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
