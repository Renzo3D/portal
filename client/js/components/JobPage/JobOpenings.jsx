import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class JobOpenings extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      jobs: null
    }
  }
  componentWillMount() {
    axios
      .get('/api/jobs')
      .then(res => this.setState({
        jobs: res.data
      }))
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div>
        <h1> Job Openings </h1>
        <div className='bs-linebreak'></div>
        <div className='jobPostCard'>
          {this.state.jobs &&
            this.state.jobs.map((job, index) => (
              <div key={index} className='ml-5'>
                <div className='row'>
                  <div className='col-md-8 mb-2'>
                    <p className='h4 mb-2 text-info'>
                      <Link to={`/auth/jobopenings/${job.id}`}>
                        {job.title}
                      </Link>
                    </p>
                    <p className='h6 mb-0'>
                      <span className='mr-3'>
                        <i className='fas fa-briefcase text-muted mr-1' />
                        {job.companyName}
                      </span>
                    </p>
                    <p>{job.description}</p>
                  </div>

                  <div className='col-md-1'>
                  </div>

                  <div className='col-md-3 text-light '>
                    <p className='text-dark mb-2'> {job.timestamp}</p>

                    <span className='bg-dark rounded py-1 px-1'>{job.employmentType}</span>
                  </div>
                </div>
                <hr />
              </div>
            ))}
        </div>
        <div>
          <Link to='/auth'>
            Go back
          </Link>
        </div>
      </div>
    )
  };
}

JobOpenings.propTypes = {
  entries: PropTypes.array
};


