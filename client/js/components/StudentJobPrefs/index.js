import StudentJobPrefs from "./StudentJobPrefs";
import { connect } from "react-redux";
import { updateDatabaseUser } from "./studentJobPrefsActions";

const mapDispatchToProps = dispatch => {
  return {
    onSubmit(values) {
      dispatch(updateDatabaseUser(values));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(StudentJobPrefs);
