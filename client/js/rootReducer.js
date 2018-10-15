import { combineReducers } from 'redux';
import dashBoardReducer from './components/DashBoardPage/dashBoardReducer';
import searchResultsReducer from './components/SearchResultsPage/searchResultsReducer';
import profileStrengthReducer from './components/ProfileStrength/profileStrengthReducer';
import employerStrengthReducer from './components/EmployerStrength/employerStrengthReducer';
import { reducer as formReducer } from 'redux-form';
import userReducer from './userReducer';
import portfolioReducer from './components/PortfolioPage/portfolioReducer';
import AdminDashboardReducer from './components/AdminDashboard/AdminDashboardReducer';
import EmployerDashboardReducer from './components/EmployerDashboard/employerDashboardReducer';
import StudentProfileReducer from './components/StudentProfile/StudentProfileReducer'
// userFromServer is a global variable passed in from index.ejs

const reducer = combineReducers({
  adminDashboard: AdminDashboardReducer,
  employerDashboard: EmployerDashboardReducer,
  dashBoard: dashBoardReducer,
  form: formReducer,
  searchResults: searchResultsReducer,
  profileStrength: profileStrengthReducer,
  employerStrength: employerStrengthReducer,
  user: userReducer,
  portfolio: portfolioReducer,
  searchedStudent: StudentProfileReducer
});

export default reducer;
