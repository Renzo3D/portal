import { connect } from 'react-redux';
import EmployerStrength from './EmployerStrength';
import { calculateStrength } from './employerStrengthActions';

const mapStateToProps = ({ user, employerStrength }) => {
  return { user, employerStrength };
};

const mapDispatchToProps = dispatch => {
  return {
    calculateStrength() {
      dispatch(calculateStrength());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EmployerStrength);
