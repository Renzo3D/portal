import React from 'react';
import { Switch, Route } from 'react-router-dom';
import DashBoard from './DashBoardPage';
import EmployerDashboard from './EmployerDashboard';
import CreateProject from './CreateProjectForm';
import PortfolioPage from './PortfolioPage';
import EducationForm from './EducationForm';
import SearchResults from './SearchResultsPage';
import StudentProfile from './StudentProfile';
import ProfilePage from './ProfilePage';
import EmployerProfile from './EmployerProfile';
import FilteredStudents from './FilteredStudents';
import AdminDashboard from './AdminDashboard';
import JobOpenings from './JobPage/JobOpenings';
import JobPage from './JobPage/JobPage';
import StudentDescription from './StudentDescription';

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/auth' component={DashBoard} />
      <Route exact path='/auth/admin' component={AdminDashboard} />
      <Route path='/auth/employer' component={EmployerDashboard} />
      <Route exact path='/auth/portfolio' component={PortfolioPage} />
      <Route path='/auth/portfolio/create' component={CreateProject} />
      <Route path='/auth/portfolio/edit/:project' component={CreateProject} />
      <Route path='/auth/portfolio/add-school' component={EducationForm} />
      <Route path='/auth/search' component={SearchResults} />
      <Route path='/auth/profile' component={ProfilePage} />
      <Route path='/auth/student/:id' component={StudentProfile} />
      <Route path='/auth/employerProfile/' component={EmployerProfile} />
      <Route path='/auth/searchStudents/' component={FilteredStudents} />
      <Route exact path='/auth/jobopenings/' component={JobOpenings} />
      <Route path='/auth/jobopenings/:id' component={JobPage} />
      <Route path ='/auth/studentDescription/edit' component={StudentDescription} />
    </Switch>
  </main>
);

export default Main;
