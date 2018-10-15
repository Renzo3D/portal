import initialState from '../../initialState';

function AdminDashboardReducer(state = initialState.adminDashboard, action) {
  const { type, payload} = action;
  switch (type) {
    case 'GET_ALL_STUDENTS': {
      return {...state, loading: false};
    }
    case 'GET_ALL_STUDENTS_FULFILLED': {
      return Object.assign({}, state, {allStudents: payload.allStudents});
    }
    case 'GET_ALL_STUDENTS_REJECTED': {
      return {...state, loading: false};
    }
    case 'GET_ALL_EMPLOYEES': {
      return {...state, loading: false};
    }
    case 'GET_ALL_EMPLOYEES_FULFILLED': {
      return Object.assign({}, state, {allEmployees: payload.allEmployees, loading: false});
    }
    case 'GET_ALL_EMPLOYEES_REJECTED': {
      return {...state, loading: false};
    }
    case 'GET_ALL_USERS': {
      return Object.assign({}, state, {allUsers: payload.allUsers});
    }
    case 'UPDATE_SCORES': {
      return;
    }
    case 'UPDATE_SCORES_PENDING': {
      return {...state, loading: true};
    }
    case 'UPDATE_SCORES_REJECTED': {
      return {...state, loading: false};
    }
    case 'UPDATE_SCORES_FULFILLED': {
      return Object.assign({}, state, {allStudents: payload.allStudents, loading: false});
    }
    case 'LOADING': {
      return {...state, loading: payload.loading};
    }
    case 'DISABLE_USER' : {
      return Object.assign({}, state, {allUsers: payload.allUsers, updated: true});
    }
    case 'ENABLE_USER' : {
      return Object.assign({}, state, {allUsers: payload.allUsers, updated: true});
    }
    case 'TOGGLE_VISIBLE' : {
      return Object.assign({},state, {allUsers: payload.allUsers, updated: true});
    }
    default: {
      return state;
    }

  }
}
export default AdminDashboardReducer;
