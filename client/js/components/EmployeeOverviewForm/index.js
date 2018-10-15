import EmployeeOverviewForm from './EmployeeOverviewForm';
import { connect } from 'react-redux';
import { updateDatabaseEmployee, cancelForm } from './employeeOverviewFormActions';

const mapDispatchToProps = dispatch => {
  return {
    onSubmit(values) {
      dispatch(updateDatabaseEmployee(values));
      dispatch(cancelForm(values));
    }
  };
};

export default connect(null, mapDispatchToProps)(EmployeeOverviewForm);
