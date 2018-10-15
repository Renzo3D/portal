const axios = require('axios');

export function updateDatabaseUser(values) {
  return (dispatch, getState) => {
    const { user, searchedStudent } = getState();
    const config = { headers: { Authorization: user.accessToken } };
    let person;
    if (user.userType == 'ADMIN') { person = searchedStudent.searchedStudent;} else { person = user;}
    axios
      .patch(`/api/students/${person.id}`, values, config)
      .then(response => {
        response.data.accessToken = user.accessToken;
        response.data.userType = user.userType;
        dispatch({
          type: 'UPDATE_DATABASE_USER',
          response
        });
      })
      .catch(error => console.log(error));
  };
}
