import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Fuse from 'fuse.js';
import { Async } from 'react-select';

const SkillsMenu = ({ input: { onChange, value }, options, name }) => {
  return (
    <Async
      name={name}
      value={value}
      placeholder={'Add skills'}
      options={options}
      onChange={onChange}
      onBlurResetsInput={false}
      multi={true}
      loadOptions={loadSkills.bind(this)}
      valueRenderer={opt => opt.label}
    />
  );
};

function loadSkills(input, callback) {
  return axios
    .get('/api/skills')
    .then(data => data.data)
    .then(skills => {
      const fuse = new Fuse(skills, {
        keys: ['name'],
        id: 'name',
        threshold: 0.4,
        distance: 100
      });
      const results = new Set(fuse.search(input));
      const options = Array.from(results).map(skill => {
        return { value: skill, label: skill };
      });
      callback(null, {
        options: [...options]
      });
    })
    .catch(err => {
      console.log('Error: ' + err.message);
    });
}

SkillsMenu.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.object
};

export default SkillsMenu;
