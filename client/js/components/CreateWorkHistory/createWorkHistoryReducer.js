function createWorkHistoryReducer(state = [], action) {
  switch (action.type) {
    case 'CREATE_WORK_HISTORY': {
      return {
        ...state,
        workHistory: action.response.data.workHistory
      };
    }

    case 'UPDATE_WORK_HISTORY_FULFILLED': {
      return {
        ...state,
        workHistory: action.payload.data.workHistory
      };
    }

    case 'UPDATE_WORK_HISTORY_REJECTED': {
      return state;
    }

    default:
      return state;
  }
}

export default createWorkHistoryReducer;
