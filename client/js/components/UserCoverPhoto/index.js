import UserCoverPhoto from './UserCoverPhoto';
import { connect } from 'react-redux';

function mapStateToProps({ user }) {
  return { coverPhoto: user.coverPhoto, id: user.id, accessToken: user.accessToken, type: user.userType };
}

export default connect(mapStateToProps)(UserCoverPhoto);
