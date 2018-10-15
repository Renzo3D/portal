import Portfolio from './Portfolio';
import { connect } from 'react-redux';
import { updatePortfolio, updateProjectIndex } from './portfolioActions';

function mapStateToProps({ user }) {
  return { user };
}

function mapDispatchToProps(dispatch) {
  return {
    updateIndex: e => {
      dispatch(updateProjectIndex(e.target.value));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio);
