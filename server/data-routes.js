/* Custom data routes in addition to the ones Loopback provides
 * 
 * get all jobs available at company
 * get all employers who work at a company
 * get student work history 
 * get full education history of student
 * get all certifications from student
 * get all affiliations from student
 * get all projects from student
 * get all skills from student
 * get all conversations/messages from student/employer
 * get all questions asked to student
 * get all projects with a specific skill
 * get all students with a specific skill
 * get all students who graduated from/attended a specific school
 * get all students/jobs/schools near a certain location
 * filter jobs by employment type and/or title
 * 
 * 
 * All functions will return an array of objects representing the desired values
*/

const axios = require('axios');

const routes = {};

/*
 * Retreives all jobs that are listed for a specific company
 */
routes.getAllJobs = async companyId => {
  const allJobs = await axios.get('/api/jobs');
  const ret = [];
  allJobs.forEach(job => {
    if (job.companyId == companyId) {
      ret.push(job);
    }
  });
  return ret;
};

// routes.getAllJobs = async (employeeId) => {
//   const allJobs = await axios.get('/api/jobs');
//   const ret = [];
//   allJobs.forEach((job) => {
//     if (job.employeeId == employeeId) {
//       ret.push(job);
//     }
//   });
//   return ret;
// }
routes.getAllEmployers = async companyId => {};

routes.getjobHistory = async studentId => {};
routes.getWorkHistory = async studentId => {};

routes.getEducationHistory = async studentId => {};

routes.getCertifications = async studentId => {};

routes.getAffiliations = async studentId => {};

routes.getStudentProjects = async studentId => {};

routes.getStudentSkills = async studentId => {};

routes.getStudentConversations = async studentId => {};

routes.getStudentQuestions = async studentId => {};

routes.getSchoolGraduates = async (schoolId, graduatedAfter = 0) => {};

routes.getProjectsWithSkill = async skillId => {};

routes.getStudentsWithSkill = async skillId => {};

routes.getStudentsNear = async (lat, lng, radius) => {};

routes.getSchoolsNear = async (lat, lng, radius) => {};

routes.getJobsNear = async (lat, lng, radius) => {};

routes.filterJobsByTitle = async str => {};

export default routes;
