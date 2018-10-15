import { connect } from 'react-redux';
import ProfileStrength from './ProfileStrength';
import { calculateStrength } from './profileStrengthActions';

const mapStateToProps = ({ user, profileStrength }) => {
  return { user, profileStrength };
};

const mapDispatchToProps = (dispatch) => {
  return {
    calculateStrength() {
      dispatch(calculateStrength());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileStrength);

