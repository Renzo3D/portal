import axios from 'axios';

export const getAllUsers = () => dispatch => {
  const allUsers = [];
  const studentList = [];
  dispatch({
    type: 'GET_ALL_STUDENTS',
    payload: axios.get('/api/students')
      .then((response) => {
        const students = response.data;
        students.map((student) => {
          return (
            studentList.push(student),
            allUsers.push(student)
          );
        });
        getEmployers(studentList);
        return { allStudents: studentList };
      })
  });
  const getEmployers = () => {
    const employeeList = [];
    dispatch({
      type: 'GET_ALL_EMPLOYEES',
      payload: axios.get('/api/employees')
        .then((res) => {
          const employees = res.data;
          employees.map((employee) => {
            return (
              employeeList.push(employee),
              allUsers.push(employee)
            );
          });
          return { allEmployees: employeeList };
        })
    });
  };
  dispatch({
    type: 'GET_ALL_USERS',
    payload: { allUsers: allUsers }
  });
};

export const updateUserScore = (user) => (dispatch) => {
  const newScores = [];
  const currentStudents = [];
  const updatedList = [];
  const config = { header: { Authorization: user.accessToken } };

  axios.get('/api/hackerRank').then((newHackerScores) => {
    newHackerScores.data.map((scores) => {
      newScores.push(scores);
    });
    updateStudents(newScores);
  }).catch((err) => console.log(err));

  const updateStudents = (newScores) => {
    axios.get('/api/students').then((currentStudentList) => {
      const updateTime = currentStudentList.headers.date;
      currentStudentList.data.map((eachStudent) => {
        currentStudents.push(eachStudent);
      });
      addLists(newScores, currentStudents, updateTime);
    }).catch((err) => console.log(err));
  };

  const addLists = (newScores, currentStudents, time) => {
    for (let i = 0; i < newScores.length; i++) {
      for (let j = 0; j < currentStudents.length; j++) {
        if (currentStudents[j].email === undefined) {
          updatedList.push(currentStudents[j]);
          currentStudents.splice(j, 1);
        }
        if (newScores[i].email === currentStudents[j].email) {
          axios.patch(`/api/students/${currentStudents[j].id}`, { hackerRankScore: newScores[i].score, hackerRankUpdated: time }, config)
            .then((listUpdate) => {
              updatedList.push(listUpdate.data);
            }).catch((err) => console.log(err));
          currentStudents.splice(j, 1);
        }
      }
    }
    getEmployees(updatedList);
  };
  const getEmployees = (updatedList) => {
    dispatch({
      type: 'UPDATE_SCORES',
      payload:
        axios.get('/api/employees').then((currentEmployees) => {
          currentEmployees.data.map((eachEmployee) => {
            updatedList.push(eachEmployee);
          });
          return { allStudents: updatedList };
        }).catch((err) => console.log(err))
    });
  };
};

export const disableUser = (id, allUsers, user, message) => {
  const config = { headers: { Authorization: user.accessToken } };
  for (var i = 0; i < allUsers.length; i++) {
    let type;
    if (allUsers[i].userType !== 'ADMIN') {
      (allUsers[i].userType === 'STUDENT') ? type = 'students' : type = 'employees';
      let index = i;
      if (allUsers[i].id === id) {
        axios.patch(`/api/${type}/${allUsers[i].id}`, { enabled: false, comments: message }, config)
          .then((response) => {
            updateDisableUser(response.data);
          })
          .catch((err) => { console.log(err); });
      }
      const updateDisableUser = (updateDisabled) => {
        allUsers.splice(index, 1, updateDisabled);
      };
    }
  }
  return {
    type: 'DISABLE_USER',
    payload: { allUsers: allUsers }
  };
};

export function enableUser(id, allUsers, user) {
  const config = { headers: { Authorization: user.accessToken } };
  for (var i = 0; i < allUsers.length; i++) {
    let type;
    if (allUsers[i].userType !== 'ADMIN') {
      (allUsers[i].userType === 'STUDENT') ? type = 'students' : type = 'employees';
      let index = i;
      if (allUsers[i].id === id) {
        axios.patch(`/api/${type}/${allUsers[i].id}`, { enabled: true }, config)
          .then((response) => {
            updateEnableUser(response.data);
          })
          .catch((err) => { console.log(err); });
      }
      const updateEnableUser = (updateEnable) => {
        allUsers.splice(index, 1, updateEnable);
      };
    }
  }
  return {
    type: 'ENABLE_USER',
    payload: { allUsers: allUsers }
  };
};

export function toggleUserVisibility(id, allUsers, user) {
  const config = { headers: { Authorization: user.accessToken } };
  const toggle = user.visible;
  axios.patch(`/api/${user.userType}s/${user.id}`, { visible: toggle }, config)
          .catch((err) => { console.log(err); });
  return {
    type: 'TOGGLE_VISIBLE',
    payload: { allUsers: allUsers }
  };
};

export const loading = (loading) => {
  return {
    type: 'LOADING',
    payload: { loading: loading }
  };
};
