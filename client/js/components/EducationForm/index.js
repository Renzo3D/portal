import { connect } from 'react-redux';
import EducationForm from './EducationForm';
import {
  updateEntry,
  createNewEntry,
  deleteEntry
} from './EducationFormActions';

const mapStateToProps = (state) => {
  return {
    user: state.user,
    searchedStudent: state.searchedStudent.searchedStudent
  };
};

export default connect(mapStateToProps)(EducationForm);
