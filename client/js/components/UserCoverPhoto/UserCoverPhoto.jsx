import React from 'react';
import axios from 'axios';
import { uploadImages } from '../../helper';
import Dropzone from 'react-dropzone';

export default class UserCoverPhoto extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uploading: false,
      profilePic: this.props.profilePic
    };
    this.toggleUpload = this.toggleUpload.bind(this);
    this.sendToS3 = this.sendToS3.bind(this);
  }

  toggleUpload() {
    this.setState({
      uploading: !this.state.uploading
    }, () => console.log(this.state));
  }
  sendToS3(files) {
    const { dispatch, user, searchedStudent } = this.props;
    let person;
    if (user.userType == 'ADMIN') { person = searchedStudent } else { person = user }

    uploadImages(files).then(response => {
      let urlToSend = JSON.stringify(response.data).match(/https:[^"]+/g);
      this.setState({ profilePic: urlToSend }, () => this.toggleUpload());
      let packetToSend = {
        profilePicture: urlToSend
      };
      const config = {
        headers: {
          Authorization: user.accessToken
        }
      };
      var type;
      if (person.userType == 'STUDENT') { type = 'students'; } else { type = 'employee'; }
      var url = `/api/${type}/${person.id}`;
      axios.patch(url, packetToSend, config).then(response => {
        dispatch({
          type: 'UPDATE_DATABASE_USER',
          response
        });
      });
    });
  }

  render() {
    const { userType } = this.props.user;
    if (this.state.uploading) {
      return (
        <div>
          <Dropzone
            name='profilePic'
            onDrop={acceptedFiles => {
              this.sendToS3(acceptedFiles);
            }}
          >
          <div className='wrapper'>
          <button type="button" className="uploadButton col-md-8 btn btn-block btn-outline-primary">Upload</button>
          </div>
          </Dropzone>
          <button className='btn btn-block btn-outline-danger col-sm-2' 
          onClick={this.toggleUpload}>Cancel Upload</button>
        </div>
      );
    }

    return (
      <div
      className='container-fluid mb-4 cover-photo'
      style={{
        backgroundImage: 'url(' + this.props.defaultSrc + ')',
        backgroundSize: 'cover',
        height: '250px',
        position: 'relative'
      }}
    >
      
      <div
        style={{
          border: '1px solid black',
          position: 'absolute',
          padding: '5px',
          backgroundColor: 'white',
          bottom: '0px',
          left: '10px'
        }}>
        { (!this.props.searchedUser == true && (userType === 'STUDENT' || userType === 'ADMIN')) && <button
        type='button'
        className='btn btn-default'
        onClick={this.toggleUpload}
        style={{ position: 'absolute', bottom:'0px', left:'0px', height: '30px', width:'30px', opacity: '0.5' }}>
        <i className='fas fa-plus-square fa-3x'  style={{position: 'absolute', top: '-1px', left:'0px', height: '30px', width:'30px',opacity: '0.5'}}/>
      </button>}
        <img
          className='align-self-end'
          src={this.state.profilePic}
          style={{ height: 'auto', width: '150px', border: '2px solid white', borderRadius: '2px' }}/>
        </div>
      {this.props.children}
    </div>
  );
}
}
