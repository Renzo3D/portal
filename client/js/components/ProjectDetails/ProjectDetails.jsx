import React from 'react';

const ProjectDetails = ({ project, idx }) => {
  if (!project) {
    return (
      <p className='text-center'>
        <i className='fa fa-spinner fa-spin h3' />
      </p>
    );
  }
  return (
    <div className='p-4 bg-light' id={`detail-modal-${idx}`}>
            <h4 className='font-weight-light'>{project.title}</h4>
          <hr />
          <div className='ml-5'>
            {project.images.length && (
              <div
                id={`project-carousel-${idx}`}
                className='carousel slide'
                data-ride='carousel'
              >
                <div className='carousel-inner'>
                  {project.images.map((url, i) => {
                    return (
                      <div
                        key={i}
                        className={'carousel-item' + (i == 0 ? ' active' : '')}
                      >
                        {project.images && (
                          <img
                            className='d-block w-100'
                            src={project.images[0]}
                            alt={'project photo #' + i}
                          />
                        )}
                        {!project.images && (
                          <p className='text-center'>
                            <i className='fa fa-spinner fa-spin h3' />
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
                <a
                  className='carousel-control-prev'
                  href={`#project-carousel-${idx}`}
                  role='button'
                  data-slide='prev'
                >
                  <span className='sr-only'>Previous</span>
                </a>
              </div>
            )}
            <p>{project.description}</p>
            <a href={project.links} target='_blank'>Check out this project</a>
              { project.skills.length > 0 ?
            <ul>
              <li>Skills</li>
              {project.skills.map((skill, i) => {
                return <li key={i}>{skill}</li>;
              })}
            </ul>
              : '' }
            <hr />
          </div>
    </div>
  );
};

export default ProjectDetails;
