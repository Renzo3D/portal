import { connect } from 'react-redux';
import ProfilePage from './ProfilePage';

const mapStateToProps = ({ user }) => {
  return { user };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
