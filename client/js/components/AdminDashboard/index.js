import { connect } from 'react-redux';
import AdminDashboard from './AdminDashboard';

function mapStateToProps(state) {
  return {
    user: state.user,
    allUsers: state.adminDashboard.allUsers,
    allScores: state.adminDashboard.allScores,
    allStudents: state.adminDashboard.allStudents,
    allEmployees: state.adminDashboard.allEmployees,
    allInfo: state.adminDashboard.allInfo,
    loading: state.adminDashboard.loading,
    updated: state.adminDashboard.updated
  };
}

export default connect(mapStateToProps)(AdminDashboard);
