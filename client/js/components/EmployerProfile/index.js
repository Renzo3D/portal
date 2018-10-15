import { connect } from 'react-redux';
import EmployerProfile from './EmployerProfile';

const mapStateToProps = ({ user }) => {
  return { user };
};

export default connect(mapStateToProps)(EmployerProfile);
