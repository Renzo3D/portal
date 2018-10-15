import { connect } from 'react-redux';
import FilteredStudents from './FilteredStudents';

function mapStoreToProps(store) {
  return {
    data: store.form, user: store.user
  };
}

export default connect(mapStoreToProps)(FilteredStudents);
