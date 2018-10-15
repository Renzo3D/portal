import css from '../../css/style.styl';
import React from 'react';
import { connect } from 'react-redux';
import { Router } from 'react-router-dom';
import Main from './Main';
import NavigationBar from './common/NavigationBar';
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

class App extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    // loads in user information only app is mounted
    dispatch({
      type: 'APP_MOUNTED'
    });
  }
  render() {
    return (
      <Router history={history}>
        <div className='mb-5 main-view'>          
          <Main />
        </div>
      </Router>
    );
  }
}

export default connect()(App);
