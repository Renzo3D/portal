import initialState from '../../initialState';

function studentDescription(state = initialState.user, action) {
    switch (action.type) {
    case  'UPDATE_STUDENT_DESCRIPTION': {
      console.log('INSIDE', action.payload);
      return {
        ...state,
        studentDescription: action.payload
      };
    }

case 'SAVE_STUDENT_DESCRIPTION': {
  console.log('saving', action.payload);
    return {
      ...state,
      studentDescription: action.payload
    }
}
    default:
      return state;
  }
}

export default studentDescription;