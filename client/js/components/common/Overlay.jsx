import React from 'react';

const overlayStyle = {
  position: 'fixed',
  display: 'block',
  height: '100vh',
  width: '100vw',
  top: '0',
  bottom: '0',
  left: '0',
  right: '0',
  zIndex: '2',
  backgroundColor: 'rgba(0,0,0,0.5)',
  textAlign: 'center'
};
const textStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  fontSize: '40px',
  textDecoration: 'bold',
  color: 'white',
  transform: 'translate(-50%,-50%)',
  backgroundColor: 'black',
  opacity: '.8',
  width: '80%',
  textAlgin: 'center'
};
const buttonStyle = {
  backgroundColor: 'white',
  boarder: 'solid, white',
  color: 'black',
  fontSize: '20px'
};
export default class Overlay extends React.Component {

  render() {
    const { user } = this.props;
    return (
      <div style={overlayStyle}>
        <div style={textStyle}>
          <p>
            <span style={{ fontSize: '50px' }}>
              Your Account has been Disabled<br /></span>
            <span> {user.comments} <br /></span>
            <span>Please contact an administrator</span>
          </p>
          <a className='btn form-control-lg'
            style={buttonStyle} href='/auth/logout'>Log Out
          </a>
        </div>
      </div>
    );
  }
};
