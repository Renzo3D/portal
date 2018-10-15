import initialState from '../../initialState';

const searchResultsReducer = (state = initialState.searchResults, action) => {
  switch (action.type) {
    case 'SEARCH_USERS': {
      const { currentQuery } = action;
      return {
        ...state,
        status: 'LOADING',
        currentQuery
      };
    }
    case 'SEARCH_USERS_PENDING': {
      return {
        ...state,
        status: 'LOADING'
      };
    }
    case 'SEARCH_USERS_FULFILLED': {
      return {
        ...state,
        status: 'LOADED',
        results: action.payload
      };
    }

    default: {
      return state;
    }
  }
};

export default searchResultsReducer;
