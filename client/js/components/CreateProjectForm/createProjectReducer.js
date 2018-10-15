import { portfolioRedirect } from "./createProjectActions";

function createProjectReducer(state = [], action) {
  switch (action.type) {
    case "CREATE_PROJECT": {
      return {
        ...state,
        projects: action.response.data.projects
      };
    }

    case "UPDATE_PROJECT_PENDING": {
      return state;
    }
    case "UPDATE_PROJECT": {
      portfolioRedirect();
      return {
        ...state,
        projects: action.payload.data
      };
    }
    case "UPDATE_PROJECT_REJECTED": {
      return state;
    }

    case "DELETE_PROJECT_PENDING": {
      return state;
    }
    case "DELETE_PROJECT_FULFILLED": {
      portfolioRedirect();
      return {
        ...state,
        projects: action.payload.data
      };
    }
    case "DELETE_PROJECT_REJECTED": {
      return state;
    }

    default:
      return state;
  }
}

export default createProjectReducer;
