import axios from 'axios';

export function updateStudentDescription(studentDescription) {
  return {
    type: 'UPDATE_STUDENT_DESCRIPTION',
    payload: studentDescription
  };
}

export function saveStudentDescription(id, studentDescription) {
  return {
    type: 'SAVE_STUDENT_DESCRIPTION',
    payload: axios.patch(`/api/students/${id}`, {studentDescription})
  };
}