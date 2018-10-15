import axios from 'axios';

export function updateStudentSkills(skills) {
  return {
    type: 'UPDATE_STUDENT_SKILLS',
    payload: skills
  };
}

export function saveStudentSkills(id, skills) {
  return {
    type: 'SAVE_STUDENT_SKILLS',
    payload: axios.patch(`/api/students/${id}`, {skills})
  };
}