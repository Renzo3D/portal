function jobFormReducer(state = [], action) {
  switch (action.type) {

    case 'POST_JOB': {
      return {
        ...state,
        jobOpenings: action.response.data.jobOpenings
      };
    }

    case 'CREATE_JOB_OPENINGS': {
      return {
        ...state,
        jobOpenings: action.response.data.jobOpenings
      };
    }

    case 'UPDATE_JOB_OPENINGS_FULFILLED': {
      return {
        ...state,
        jobOpenings: action.payload.data.jobOpenings
      };
    }

    case 'UPDATE_JOB_OPENINGS_REJECTED': {
      return state;
    }

    case 'DELETE_JOB_OPENINGS_FULFILLED': {
      return {
        ...state,
        jobOpenings: action.payload.data.jobOpenings
      };
    }

    case 'DELETE_JOB_OPENINGS_PENDING': {
      return state;
    }

    case 'DELETE_JOB_OPENINGS_REJECTED': {
      return state;
    }

    default:
      return state;
  }
}

export default jobFormReducer;
