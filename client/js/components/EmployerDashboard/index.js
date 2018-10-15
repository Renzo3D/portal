import { connect } from 'react-redux';
import EmployerDashBoard from './EmployerDashboard';
import { toggleModal } from '../DashBoardPage/dashBoardActions';

const mapStateToProps = ({user}) => {
  return { user };
}
// import { valueIncrement, valueDecrement } from './dashBoardActions';

// function mapStateToProps({ dashBoard }) {
//   return { dashBoard };
// };

const mapDispatchToProps = (dispatch) => {
  return {
    toggleModal() {
      dispatch(toggleModal());
    },
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(EmployerDashBoard);
