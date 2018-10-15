import React from 'react';
import { Link } from 'react-router-dom';
import Overlay from '../common/Overlay';

const Portfolio = ({ updateIndex, user }) => {
  const { projects, enabled } = user;
  const enable = enabled;
  return (
    <React.Fragment>
        <div className="bg-light" >
      {(enable === false) && <Overlay user = {user}/> }

      <div className='container' id='portfolio-container'>
        <h4>Portfolio</h4>
        <hr/>
        <p>Add a project to your portfolio</p>
        <Link className='btn btn-outline-primary m-3' to='/auth/portfolio/create'>
          New Project
        </Link>
        {!projects ? (
          <p className='text-center'>
            <i className='fa fa-spinner fa-spin h3' />
          </p>
        ) : (
            projects.map((project, i) => {
              if (i % 3) return;
              return (
                <div className='row justify-content-center' key={i}>
                  <Project project={project} index={i} updateIndex={updateIndex} />
                  {i + 1 < projects.length ? (
                    <Project project={projects[i + 1]} index={i + 1} updateIndex={updateIndex} />
                  ) : (
                      <div className='col' />
                    )}
                  {i + 2 < projects.length ? (
                    <Project project={projects[i + 2]} index={i + 2} updateIndex={updateIndex} />
                  ) : (
                      <div className='col' />
                    )}
                </div>
              );
            })
          )}
      </div>
    </div>
    </React.Fragment>
  );

};

export default Portfolio;

/*
 * props is an individual project object
 * should have properties of 'title', 'description', among others
*/
class Project extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {
    const { images } = this.props.project;
    if (!images) {
      return;
    }
  }
  render() {
    const { project, index, updateIndex } = this.props;
    const { images } = this.state;
    const desc =
      project.description && project.description.substr(0, 200) + (project.description.length > 200 ? '...' : '');
    return (
      <div className='card col mx-1 my-2'>
        {project.images ? (
          <img
            className='card-img-top'
            src={project.images[0]}
            alt='project image'
          />
        ) : (
            <p className='text-center'>
              <i className='fa fa-spinner fa-spin h3' />
            </p>
          )}
        <div className='card-body'>
          <h5 className='card-title'>{project.title}</h5>
          <span>{desc}</span>
          <br />
          <a
            href='#'
            className='card-link'
            data-toggle='modal'
            data-target={`#detail-modal-${index}`}
            value={index}
            onMouseOver={updateIndex}
          >
            More details
          </a>
          <Link to={'/auth/portfolio/edit/' + index} className='card-link'>
            Edit
          </Link>
        </div>
      </div>
    );
  }
}
