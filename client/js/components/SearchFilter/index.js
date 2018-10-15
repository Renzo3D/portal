import { connect } from 'react-redux';

const mapStateToProps = ({ searchResults }) => {
  return { searchResults };
};

const mapDispatchToProps = dispatch => {
  return {
    onClick() {
      dispatch();
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchFilter);
