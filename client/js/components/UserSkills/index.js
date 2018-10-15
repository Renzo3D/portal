import { connect } from 'react-redux';
import UserSkills from './UserSkills';

function mapStoreToProps(store) {
    return {
        skills: store.user.skills,
        studentId: store.user.id
    };
  }
export default connect(mapStoreToProps)(UserSkills);