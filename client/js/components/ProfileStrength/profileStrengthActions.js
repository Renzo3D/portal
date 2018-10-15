import axios from 'axios';

export const calculateStrength = () => {
  return (dispatch, getState) => {
    const { user, profileStrength } = getState();
    const { studentFields } = profileStrength;
    const newFields = studentFields.slice();
    let score = 0;
    let topUncompleted = {
      name: '',
      weight: 0
    };

    for (var i = 0; i < studentFields.length; i++) {
      const { propertyName, weight, name } = studentFields[i];
      // check if property in user has a value
      const completed = checkValue(user[propertyName]);
      if (completed === true) {
        // if so, add that weight to the current score
        score += weight;
      }
      // checks for the most important && not completed field
      if (studentFields[i + 1] && !completed && weight > topUncompleted.weight) {
        topUncompleted = { name, weight };
      }
      // also update that field to be marked as completed
      newFields[i].completed = completed;
    }
    if (user.profileScore !== score && user.id) {
      const config = { headers: { Authorization: user.accessToken } };
      axios
        .patch(`/api/students/${user.id}`, { profileScore: score }, config)
        .then(response => {
          if (response.status === 200) {
            dispatch({
              type: 'UPDATING_USER_SCORE',
              profileScore: score
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
      fields: newFields,
      next: topUncompleted.name
    });
  };
};

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
