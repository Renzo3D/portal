import CreateWorkHistory from './CreateWorkHistory';
import { connect } from 'react-redux';

function mapStateToProps(state, ownProps) {
  return {
    user: state.user,
    searchedId: state.searchedStudent,
    isNewEntry: ownProps.isNewEntry,
    index: ownProps.index
  };
}

export default connect(mapStateToProps)(CreateWorkHistory);
