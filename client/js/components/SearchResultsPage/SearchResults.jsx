import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import NavigationBar from '../common/NavigationBar';

class SearchResults extends React.Component {
  constructor() {
    super();
    this.state = {
      previousPage: 0,
      currentPage: 1,
      nextPage: 2
    };
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  handlePageChange(event) {
    const currentPage = parseInt(event.target.name);
    this.setState({
      previousPage: currentPage - 1,
      currentPage,
      nextPage: currentPage + 1
    });
  }

  render() {
    const { results, status } = this.props.searchResults;
    let { pathname, search } = this.props.location;

    const currentPage = parseInt(search.match(/[0-9]+$/)[0]);
    const pages = createPages(Math.ceil(results.length / 25));
    const currentResults =
      results &&
      results.length &&
      results
        .slice((currentPage - 1) * 25, currentPage * 25)
        .map((found, index) => {
          return (
            <Link
              className='list-group-item list-group-item-action'
              to={`student/${found.id}`}
              key={index}
            >
              {found.firstName + ' ' + found.lastName}
            </Link>
          );
        });
    const pagination =
      pages.length &&
      pages.map((page, index) => {
        return (
          <li
            className={`page-item ${this.state.currentPage === page &&
              'active'}`}
            key={index}
          >
            <Link
              name={page}
              onClick={this.handlePageChange}
              className='page-link'
              to={pathname + search.replace(/[0-9]+$/, '') + page}
            >
              {page}
            </Link>
          </li>
        );
      });
    return (
      <div>
         <NavigationBar />
      <div className='container mt-3'>
        <h3 className='mb-3'>
          Search Results
          {status === 'LOADED' && (
            <small className='text-muted'>
              {` ${results.length} search results`}
            </small>
          )}
        </h3>
        {status === 'LOADING' && (
          <p className='text-center'>
            <i className='fa fa-spinner fa-spin h3' />
          </p>
        )}
        {status === 'LOADED' && (
          <React.Fragment>
            <ul className='list-group list-group-flush mb-4'>
              {currentResults}
            </ul>
            <ul className='pagination'>
              <li
                className={`page-item ${this.state.currentPage === 1 &&
                  'disabled'}`}
              >
                <Link
                  className='page-link'
                  to={pathname + search.slice(0, -1) + this.state.previousPage}
                  name={this.state.previousPage}
                  onClick={this.handlePageChange}
                >
                  Previous
                </Link>
              </li>
              {pagination}
              <li
                className={`page-item ${this.state.currentPage ===
                  pages.length && 'disabled'}`}
              >
                <Link
                  className='page-link'
                  to={pathname + search.slice(0, -1) + this.state.nextPage}
                  name={this.state.nextPage}
                  onClick={this.handlePageChange}
                >
                  Next
                </Link>
              </li>
            </ul>
          </React.Fragment>
        )}
      </div>
      </div>
    );
  }
}

SearchResults.propTypes = {
  searchResults: PropTypes.object.isRequired,
  queryDatabase: PropTypes.func.isRequired
};

// creates an array with numbers of pages
const createPages = function(pages) {
  var arr = [];
  for (var i = 0; i < pages; i++) {
    arr.push(i + 1);
  }
  return arr;
};

export default SearchResults;