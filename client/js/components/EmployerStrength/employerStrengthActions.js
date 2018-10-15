import axios from 'axios';

// action to calculate strength
export const calculateStrength = () => {
  return (dispatch, getState) => {
    const { user, employerStrength } = getState();
    const { employerFields } = employerStrength;
    const newFields = employerFields.slice();
    let score = 0;
    let topUncompleted = {
      name: '',
      weight: 0
    };

    for (var i = 0; i < employerFields.length; i++) {
      const { propertyName, weight, name } = employerFields[i];
      // check if property in user has a value
      const completed = checkValue(user[propertyName]);
      if (completed === true) {
        // if so, add that weight to the current score
        score += weight;
      }
      // checks for the most important && not completed field
      if (employerFields[i + 1] && !completed && weight > topUncompleted.weight) {
        topUncompleted = { name, weight };
      }
      // also update that field to be marked as completed
      newFields[i].completed = completed;
    }
    if (user.employerScore !== score && user.id) {
      const config = { headers: { Authorization: user.accessToken } };
      axios
        .patch(`/api/employees/${user.id}`, { employerScore: score }, config)
        .then(response => {
          if (response.status === 200) {
            dispatch({
              type: 'UPDATING_USER_SCORE',
              employerScore: score
            });
          }
        })
        .catch(err => {
          if (err) console.log(err);
        });
    }
    dispatch({
      type: 'CALCULATED_STRENGTH',
      score,
      employerFields: newFields,
      next: topUncompleted.name
    });
  };
};

// helper function to check what type value is
const checkValue = value => {
  let type = typeof value;
  if (type === 'object' && value instanceof Array) {
    type = 'array';
  }
  if (type === 'string' || type === 'number') {
    return !!value;
  }

  switch (type) {
    case 'object': {
      return Object.keys(value).length > 0;
    }
    case 'array': {
      return value.length > 0;
    }
    default: {
      return !!value;
    }
  }
};
