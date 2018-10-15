import { connect } from 'react-redux';
import StudentProfile from './StudentProfile';

function mapStateToProps(state) {
  return {
    user: state.user,
    searchedStudent: state.searchedStudent
  };
}

export default connect(mapStateToProps)(StudentProfile);
