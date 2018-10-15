import { connect } from 'react-redux';
import SearchResults from './SearchResults';
import { onSearch } from './searchResultsActions';

const mapStateToProps = ({ searchResults, user }) => {
  return { searchResults, user };
};

const mapDispatchToProps = (dispatch) => {
  return {
    queryDatabase(search) {
      dispatch(onSearch(search));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);