import React from 'react';
import { Link } from 'react-router-dom';

class NavigationBar extends React.Component {
  render() 
  {
    return (
      <nav className='navbar navbar-expand-lg navbar-dark' role='navigation'>
        <div className='container'>
          <Link className='navbar-brand' to='/auth'>
            <h2 className='d-inline-block'>
              <img src='https://i.imgur.com/VtSaB6o.png' alt='Origin portal' className='d-inline-block' />PORTAL
            </h2>
          </Link>
          <button
            className='navbar-toggler'
            type='button'
            data-toggle='collapse'
            data-target='#navbarNavAltMarkup'
            aria-controls='navbarNavAltMarkup'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon' />
          </button>
          <div className='collapse navbar-collapse justify-content-end' id='navbarNavAltMarkup'>
            <ul className='navbar-nav'>
              <li className='nav-item dropdown'>
                <a
                  className='nav-link dropdown-toggle'
                  href='#'
                  id='navbarDropdown'
                  role='button'
                  data-toggle='dropdown'
                  aria-haspopup='true'
                  aria-expanded='false'
                >
                  Me
                </a>
                <div className='dropdown-menu' aria-labelledby='navbarDropdown'>
                  <Link to='/auth/profile' className='dropdown-item'>
                  Profile
                  </Link>
                <div className='dropdown-divider' />
                <a href='/auth/logout' className='dropdown-item'>
                  Log Out
                </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default NavigationBar;
