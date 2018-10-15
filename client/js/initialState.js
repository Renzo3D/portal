import studentStrengthfields from './components/ProfileStrength/fields';
import employerStrengthFields from './components/EmployerStrength/fields';

const initialState = {
  adminDashboard: {
    allUsers: [],
    allScores: [],
    allStudents: [],
    allEmployees: [],
    loading: false,
    updated: false
  },
  dashBoard: {
    value: 0,
    isModalOpen: false
  },
  employerDashboard: {

  },
  user: {
    firstName: '',
    lastName: '',
    companyName: '',
    resume: '',
    studentLocation: '',
    headline: '',
    profilePicture: '',
    coverPhoto: '',
    gitUrl: '',
    linkedInUrl: '',
    phoneNumber: '',
    graduationDate: '',
    socialMedia: {},
    jobSearchStatus: '',
    skills: [],
    desires: {},
    projects: [],
    workHistory: [],
    jobOpenings: [],
    educationHistory: [],
    id: '',
    userId: '',
    userType: '',
    accessToken: {},
    relocationRequired: false,
    desiredRole: 'Full Stack Developer'
  },
  profileStrength: {
    score: 0,
    next: '',
    studentFields: studentStrengthfields
  },
  employerStrength: {
    score: 0,
    next: '',
    employerFields: employerStrengthFields
  },
  searchResults: {
    results: [],
    status: 'LOADING',
    currentQuery: ''
  },
  portfolio: {
    currentProject: 0
  },
  filters: {
    graduationDate: '',
    Relocation: false,
    desiredRole: 'Full Stack Developer'
  },
  searchedStudent: {},
};

export default initialState;
