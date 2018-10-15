import UserOverview from './UserOverview';
import { connect } from 'react-redux';
import { updateDatebaseUser, cancelForm } from '../UserOverviewForm/userOverviewFormActions';

const mapDispatchToProps = dispatch => {
  return {
    onSubmit(values) {
      dispatch(updateDatebaseUser(values));
      dispatch(cancelForm(values));
    }
  };
};

export default connect(null, mapDispatchToProps)(UserOverview);
