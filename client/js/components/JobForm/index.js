// import JobForm from './JobForm';
import { connect } from 'react-redux';
import { createJob } from './jobFormActions';
import JobForm from './NewJobForm';
import { toggleModal } from '../DashBoardPage/dashBoardActions';


const mapDispatchToProps = dispatch => {
  return {
    onSubmit(values) {
      dispatch(createJob(values));
    },
    toggleModal() {
      dispatch(toggleModal());
    },
  };
};


function mapStateToProps({ user, dashBoard }, ownProps) {
  const { jobOpenings, id } = user;
  return {
    jobOpenings,
    id,
    isNewEntry: ownProps.isNewEntry,
    index: ownProps.index,
    isModalOpen: dashBoard.isModalOpen
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(JobForm);
