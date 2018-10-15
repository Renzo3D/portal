import React from 'react';
import PropTypes from 'prop-types';

const Projects = ({ projects }) => {
  return (
    <div className="p-4 mt-3 bg-light">
      <div className="container">
        <h4 className="font-weight-light">Projects</h4>
        {projects.map((project, index) => {
          return (
            <div key={index} className="ml-5">
              <p className="h5 mb-0">{project.title}</p>
              <p className="font-weight-light mb-1">
                Skills & Technologies{project.skills &&
                  project.skills.map((skill, index) => {
                    return (
                      <span key={index} className="mx-1 font-weight-normal badge badge-info">
                        {skill}
                      </span>
                    );
                  })}
              </p>
              <p className="text-dark mb-4">{project.description}</p>
              <hr />
            </div>
          );
        })}
      </div>
    </div>
  );
};

Projects.propTypes = {
  projects: PropTypes.array
};

export default Projects;
