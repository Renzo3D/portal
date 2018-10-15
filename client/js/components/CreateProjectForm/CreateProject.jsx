import React from 'react';
import NewProjectForm from './NewProjectForm';
import { addProject, updateProject, deleteProject } from './createProjectActions';
import validate from './validate';
import CancelConfirmModal from '../common/CancelConfirmModal';
import DeleteConfirmModal from '../common/DeleteConfirmModal';
import { portfolioRedirect } from './createProjectActions';
import NavigationBar from '../common/NavigationBar';
import Overlay from '../common/Overlay';

export default class CreateProject extends React.Component {
  constructor(props) {
    super(props);
    this.updateProjectDatabase = this.updateProjectDatabase.bind(this);
    this.handleDeleteProject = this.handleDeleteProject.bind(this);
  }

  updateProjectDatabase(values, dispatch) {
    validate(values);
    const { projects, id, location } = this.props;
    const isNewProject = /create/gi.test(location.pathname);
    const projectIndex = isNewProject ? null : location.pathname.match(/[0-9]+$/)[0];
    const { description, images, title, links, skills } = values;
    const data = {
      title,
      description,
      links,
      skills: [],
      images: [...images]
    };
    if (skills) {
      for (let skill of skills) {
        data.skills.push(skill.value);
      }
    }
    if (isNewProject) {
      return dispatch(addProject(data, projects, id));
    } else {
      return dispatch(updateProject(data, projects, projectIndex, id));
    }
  }
  handleDeleteProject() {
    const { projects, id, location, dispatch } = this.props;
    const projectIndex = location.pathname.match(/[0-9]+$/)[0];
    return dispatch(deleteProject(projects, projectIndex, id));
  }

  render() {
    const { projects, location, user } = this.props;
    const enable = user.enabled;
    const isNewProject = /create/gi.test(location.pathname);
    const projectIndex = isNewProject ? null : location.pathname.match(/[0-9]+$/)[0];
    const currentProject = projects[projectIndex];
    if (!isNewProject && currentProject) {
      var { skills } = currentProject;
      for (let i = 0; i < skills.length; i++) {
        skills[i] = { value: skills[i], label: skills[i] };
      }
    }
    return (
      <div>
        {(!enable) && <Overlay user = {user}/> }
        <NavigationBar />
        <div className='container mt-3'>
          <CancelConfirmModal redirectFunction={portfolioRedirect} />
          <DeleteConfirmModal successCallback={this.handleDeleteProject} />
          {isNewProject ? (
            <NewProjectForm
              onSubmit={this.updateProjectDatabase}
              isNewProject={isNewProject}
              initialValues={isNewProject ? {} : currentProject}
            />
          ) : (
            <React.Fragment>
              {!currentProject && (
                <p className='text-center'>
                  <i className='fa fa-spinner fa-spin h3' />
                </p>
              )}
              {currentProject && (
                <NewProjectForm
                  onSubmit={this.updateProjectDatabase}
                  isNewProject={isNewProject}
                  initialValues={isNewProject ? {} : currentProject}
                />
              )}
            </React.Fragment>
          )}
        </div>
      </div>
    );
  }
}
