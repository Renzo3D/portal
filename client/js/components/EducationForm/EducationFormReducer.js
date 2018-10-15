export default function educationFormReducer(state = [], action) {
  switch (action.type) {
    case 'ADD_EDUCATION_HISTORY_FULFILLED': {
      $('#edu-form-modal').modal('hide');
      return {
        ...state,
        educationHistory: action.payload.data.educationHistory
      };
    }
    case 'EDIT_EDUCATION_HISTORY_FULFILLED': {
      $('#edu-form-modal').modal('hide');
      return {
        ...state,
        educationHistory: action.payload.data.educationHistory
      };
    }

    default: {
      return state;
    }
  }
}
