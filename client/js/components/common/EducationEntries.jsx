import React from "react";
import PropTypes from "prop-types";
import EducationForm from "../EducationForm";
import {
  updateEntry,
  createNewEntry
} from "../EducationForm/EducationFormActions";
import Moment from "moment";
import validate from "../EducationForm/validate";

class EducationEntries extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editing: -1 };
    this.updateEducationHistory = this.updateEducationHistory.bind(this);
  }

  updateEducationHistory(values, dispatch) {
    let person;
    validate(values);
    const newValues = {
      ...values,
      currentStudent: new Date(values.completionDate) > new Date()
    };
    const { searchedStudent, user } = this.props;
    const { editing } = this.state;
    if (user.userType == "ADMIN") {
      person = searchedStudent;
    } else {
      person = user;
    }
    if (editing >= 0) {
      dispatch(updateEntry(newValues, person, editing));
    } else {
      dispatch(createNewEntry(newValues, person));
    }
  }

  render() {
    const {
      entries,
      studentId,
      renderButtons,
      handleEducationDelete
    } = this.props;
    const { editing } = this.state;
    const educationHistory = !!entries.length ? (
      entries
        .map((entry, index) => {
          return (
            <div key={"edu" + index} className="ml-5">
              <p className="h5 mb-0">{entry.schoolName}</p>
              <p className="h5 font-weight-light mb-1">
                {entry.specialization}
              </p>
              <p className="text-muted font-weight-light mb-2">
                {Moment(entry.completionDate).format("MMM YYYY")}
              </p>
              <p className="text-dark mb-4">{entry.description}</p>
              {renderButtons && (
                <div>
                  <button
                    type="button"
                    className="btn btn-outline-primary btn-sm mr-2"
                    data-toggle="modal"
                    data-target="#edu-form-modal"
                    onClick={() => this.setState({ editing: index })}
                  >
                    <i className="fas fa-pencil-alt mr-1" />Edit
                  </button>
                  <button
                    data-toggle="collapse"
                    data-target={"#deleteEducationEntry" + index}
                    aria-expanded="false"
                    aria-controls={"deleteEducationEntry" + index}
                    className="btn btn-outline-danger btn-sm mr-2"
                    type="button"
                  >
                    <i className="fas fa-trash-alt" />
                  </button>
                  <div className="collapse" id={"deleteEducationEntry" + index}>
                    <br />
                    <div className="card w-50">
                      <div className="card-body">
                        Are you sure you want to delete?
                        <br />
                        <button
                          className="btn btn-sm btn-outline-primary mr-2"
                          id={"deleteEducationEntry" + index}
                          type="button"
                          data-toggle="collapse"
                          data-target={"#deleteEducationEntry" + index}
                          aria-expanded="false"
                          aria-controls={"deleteEducationEntry" + index}
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleEducationDelete}
                          name={index}
                          value="delete"
                          type="button"
                          className=" btn btn-sm btn-outline-danger mr-2"
                          type="button"
                          data-toggle="collapse"
                          data-target={"#deleteEducationEntry" + index}
                          aria-expanded="false"
                          aria-controls={"deleteEducationEntry" + index}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <hr />
            </div>
          );
        })
        .sort((a, b) => {
          // sort entries by date
          const aDate = new Date(a.startDate);
          const bDate = new Date(b.startDate);
          return aDate - bDate;
        })
    ) : (
      <p>There doesn't seem to be anything here yet</p>
    );
    return (
      <React.Fragment>
        <div className="p-4 bg-light">
          <h4 className="font-weight-light">Education</h4>
          <hr />
          {educationHistory}
          {renderButtons == true ? (
            <button
              type="button"
              className="btn btn-outline-primary m-0"
              data-toggle="modal"
              data-target="#edu-form-modal"
              onMouseOver={() => this.setState({ editing: -1 })}
            >
              Add Education
            </button>
          ) : (
            ""
          )}
        </div>
        <div
          className="modal fade"
          id="edu-form-modal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="EducationModal"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title mr-2" id="cancelConfirmLabel">
                  {editing > -1 ? "Edit Education" : "Add Education"}
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  style={{ marginTop: "-1em" }}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>

              <div className="modal-body">
                <EducationForm
                  adminUse={this.props.adminUse}
                  searchedStudent={studentId}
                  editing={editing}
                  enableReinitialize={true}
                  onSubmit={this.updateEducationHistory}
                />
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

EducationEntries.propTypes = {
  entries: PropTypes.array,
  studentId: PropTypes.string
};

export default EducationEntries;
