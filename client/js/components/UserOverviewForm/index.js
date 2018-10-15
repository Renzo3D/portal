import UserOverviewForm from './UserOverviewForm';
import { connect } from 'react-redux';
import { updateDatebaseUser, cancelForm } from './userOverviewFormActions';

const mapDispatchToProps = dispatch => {
  return {
    onSubmit(values) {
      dispatch(updateDatebaseUser(values));
      dispatch(cancelForm(values));
    }
  };
};

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserOverviewForm);
