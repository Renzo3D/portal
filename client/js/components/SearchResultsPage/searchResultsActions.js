import axios from 'axios';
import Fuse from 'fuse.js';

export const onSearch = (name, userType) => {
  const options = {
    shouldSort: true,
    threshold: 0.2,
    location: 0,
    distance: 50,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: [
      'firstName',
      'lastName'
    ]
  };
  const searchList = [];
  return {
    type: 'SEARCH_USERS',
    payload: axios.get('/api/students').then(response => {
      if (userType === 'ADMIN') {
        response.data.map((students) => {
          searchList.push(students);                    
        })
      } else {
        response.data.map((students) => {
          if (students.enabled === true && students.visible === true) {
            searchList.push(students);
          }
        })
      }
      var fuse = new Fuse(searchList, options);
      return fuse.search(name);
    }),
  };
};