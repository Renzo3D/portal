import axios from 'axios';

export function updateEntry(entry, person, index) {
  return alterEducationHistory(false, entry, person, index);
}

export function createNewEntry(entry, person) {
  return alterEducationHistory(true, entry, person);
}

function alterEducationHistory(adding, entry, person, index = -1) {
  return (dispatch, getState) => {
    const { user } = getState();
    const educationHistory = person.educationHistory;
    if (adding) {
      educationHistory.push(entry);
    } else {
      educationHistory[index] = entry;
    }
    educationHistory.sort((a, b) => new Date(a.completionDate) - new Date(b.completionDate));
    const config = { headers: { Authorization: user.accessToken } };
    dispatch({
      type: adding ? 'ADD_EDUCATION_HISTORY' : 'EDIT_EDUCATION_HISTORY',
      payload: axios.patch(
        `/api/students/${person.id}`,
        {
          educationHistory
        },
        config,  
        window.location.reload()
      )
    });
  };
}
