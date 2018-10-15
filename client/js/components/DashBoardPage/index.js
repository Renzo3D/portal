import { connect } from 'react-redux';
import DashBoard from './DashBoard';
import { valueIncrement, valueDecrement } from './dashBoardActions';

function mapStateToProps(state) {
  return { user: state.user };
}

const mapDispatchToProps = dispatch => {
  return {
    onIncrement(value) {
      dispatch(valueIncrement(value));
    },
    onDecrement(value) {
      dispatch(valueDecrement(value));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DashBoard);
