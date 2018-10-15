import reduceReducers from 'reduce-reducers';
import initalState from './initialState';
import createProjectReducer from './components/CreateProjectForm/createProjectReducer';
import educationFormReducer from './components/EducationForm/EducationFormReducer';
import createWorkHistoryReducer from './components/CreateWorkHistory/createWorkHistoryReducer';
import jobFormReducer from './components/JobForm/jobFormReducer';
import AdminDashboardReducer from './components/AdminDashboard/AdminDashboardReducer';
import { reducer as formReducer } from 'redux-form';
import studentDescription from './components/StudentDescription/studentDescriptionReducer';
import studentSkills from './components/UserSkills/userSkillsReducer';

/* eslint no-undef: off */
function user(state = initalState.user, action) {
  const { type, payload } = action;
  switch (type) {
    case 'APP_MOUNTED': {
      // initialize user data when logging in
      return {
        ...state,
        ...userFromServer
      };
    }
    case 'UPDATE_DATABASE_USER': {
      return {
        ...state,
        ...payload
      };
    }
    case 'UPDATING_USER_SCORE': {
      return {
        ...state,
        profileScore: action.score
      };
    }
    case 'CANCEL_USER_OVERVIEW_FORM': {
      return initalState.user;
    }
    default:
      return state;
  }
}

const userReducer = reduceReducers(
  AdminDashboardReducer,
  formReducer,
  user,
  createProjectReducer,
  educationFormReducer,
  createWorkHistoryReducer,
  jobFormReducer,
  studentDescription,
  studentSkills
);
export default userReducer;
