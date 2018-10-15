import initialState from '../../initialState';

function portfolioReducer(state = initialState.portfolio, action) {
  switch (action.type) {
    case 'PORTFOLIO_UPDATE_PROJECT_INDEX': {
      return {
        ...state,
        currentProject: action.payload
      };
    }
    default:
      return state;
  }
}

export default portfolioReducer;
