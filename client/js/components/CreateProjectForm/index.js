import CreateProject from './CreateProject';
import { connect } from 'react-redux';

function mapStateToProps({ user }) {
  return { projects: user.projects, id: user.id, user };
}

export default connect(mapStateToProps)(CreateProject);
