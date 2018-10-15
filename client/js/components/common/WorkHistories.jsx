import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'moment';
//handleEditClick comes from parent
const WorkHistories = ({ entries, myEntries, handleEditClick, handleWorkDelete, }) => {
  const workHistory = !!entries.length ? (
    entries

      .map((entry, index) => {
        return (
          <div key={'work' + index} className="ml-5">
            <p className="h5 mb-0">{entry.title}</p>
            <p className="h5 font-weight-light mb-0">{entry.position}</p>
            <p className="text-muted font-weight-light mb-2">
              {`${Moment(entry.startDate).format('MMM YYYY')} - ${
                entry.endDate ? Moment(entry.endDate).format('MMM YYYY') : 'Present'
                }`}
            </p>
            <p className="text-dark mb-4">{entry.description}</p>
            {myEntries && (
              <div>
                <button
                  onClick={handleEditClick}
                  value="edit"
                  name={index}
                  data-toggle="modal"
                  data-target="#workHistoryFormModal"
                  className="btn btn-outline-primary btn-sm mr-2"
                  type="button"
                >
                  <i className="fas fa-pencil-alt mr-1" />Edit
              </button>

                <button
                  data-toggle="collapse"
                  data-target={"#deleteWorkEntry" + index}
                  aria-expanded="false"
                  aria-controls={"deleteWorkEntry" + index}

                  className="btn btn-outline-danger btn-sm mr-2"
                  type="button"
                >
                  <i className="fas fa-trash-alt" />
                </button>

                <div className="collapse" id={"deleteWorkEntry" + index}>
                  <br />
                  <div className="card w-50">
                    <div className="card-body">
                      Are you sure you want to delete?
                      < br />
                      <button
                        className="btn btn-sm btn-outline-primary mr-2"
                        id={"deleteWorkEntry" + index}
                        type="button" data-toggle="collapse" data-target={"#deleteWorkEntry" + index} aria-expanded="false" aria-controls={"deleteWorkEntry" + index}
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleWorkDelete}
                        name={index}
                        value="delete"
                        className=" btn btn-sm btn-outline-danger mr-2"
                        type="button"
                        data-toggle="collapse" data-target={"#deleteWorkEntry" + index} aria-expanded="false" aria-controls={"deleteWorkEntry" + index}
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
    <div className="p-4 bg-light">
      <h4 className="font-weight-light">Work Experience</h4>
      <hr />
      {workHistory}
      {myEntries == true ?
        <button
          type="button"
          value="new"
          className="btn btn-outline-primary m-0"
          data-toggle="modal"
          data-target="#workHistoryFormModal"
          onClick={handleEditClick}
        >
          Add Work Experience
      </button> : ''
      }
    </div>
  );
};

WorkHistories.propTypes = {
  entries: PropTypes.array
};

export default WorkHistories;
