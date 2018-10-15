import { connect } from 'react-redux';
import StudentDescription from './StudentDescription';

function mapStoreToProps(store) {
    return {
      studentDescription: store.user.studentDescription,
      studentId: store.user.id
    };
  }
export default connect(mapStoreToProps)(StudentDescription);