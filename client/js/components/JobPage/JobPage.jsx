import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class NewJob extends React.Component {
    constructor(props) {
        super(props)
        this.state = ({
            job: {}
        })
    }
    componentDidMount() {
        const id = this.props.match.params.id;
        axios
            .get('/api/jobs')
            .then(res => this.setState({
                job: res.data.find(data => {
                    if (data.id === id) { return data; }
                })
            }))
            .catch(error => console.log(error));
    }


    render() {
        return (
            <div className='ml-5'>
                <div className='row'>
                    <div className='col-md-8 mb-2'>
                        <h1 className='h4 mb-2 text-info'>
                            {this.state.job.title}
                        </h1>
                        <p className='h6 mb-0'>
                            <span className='mr-3'>
                                <i className='fas fa-briefcase text-muted mr-1' />
                                {this.state.job.companyName}
                            </span>
                        </p>
                        <p>{this.state.job.description}</p>
                    </div>
                    <div className='col-md-1'>
                    </div>
                    <div className='col-md-3 text-light '>
                        <p className='text-dark mb-2'> {this.state.job.timestamp}</p>
                        <span className='bg-dark rounded py-1 px-1'>{this.state.job.employmentType}</span>
                    </div>
                </div>
                <hr />
                <Link to={`/auth/jobopenings/`}>
                    <h3>Back to Job</h3>
                </Link>
            </div>
        )
    }
}