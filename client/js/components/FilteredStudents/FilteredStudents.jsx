import React from 'react';
import NavigationBar from '../common/EmployerNavigationBar';
import axios from 'axios';
import Overlay from '../common/Overlay';
import fuzzy from 'fuzzy';

class FilteredStudents extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      desiredRole: 'Any Role',
      relocationRequired: false,
      filteredStudents: [],
      skillsList: [],
      skillsFilter: [],
      fuzzyInput: '',
      fuzzyMatches: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    this.handleSkillSelect = this.handleSkillSelect.bind(this);
    this.handleSkillRemove = this.handleSkillRemove.bind(this);
  }

  componentDidMount() {
    let skillsList = [...this.state.skillsList];

    axios
      .get('/api/skills')
      .then(response => {
        response.data.forEach(skillObj => {
          if (!skillsList.includes(skillObj.name)) {
            skillsList.push(skillObj.name);
          }
        });

        this.setState({skillsList});
      });
  }

  /**
   * @description Sets state on change to select inputs. If input is relocationRequired field, parse string value
   * to boolean, as select values always return as string. If input is fuzzyInput, filter skills based on value.
   *
   * @param {Object} e - the event object from the listener
   */
  handleChange(e) {
    let {name, value} = e.target;

    if (name === 'relocationRequired')
      value = Boolean(value);

    let fuzzyMatches;
    if (name === 'fuzzyInput')
      fuzzyMatches = fuzzy.filter(value, this.state.skillsList).map(elem => elem.string);

    this.setState({
      [name]: value,
      fuzzyMatches
    });
  }

  /**
   * @description Handles api call on search button press to retrieve student list from database. Filter list by
   * role if selector is not 'Any Role', and filter by student.openToRelocate if relocationRequired is set to true.
   */
  handleSearchSubmit() {
    axios
      .get('/api/students/')
      .then(response => {
        const {desiredRole, relocationRequired, skillsFilter} = this.state;
        let filteredStudents = response.data.filter(student => student.visible && student.enabled);

        if (desiredRole !== 'Any Role')
          filteredStudents = filteredStudents.filter(student => student.desiredRole === desiredRole);

        if (relocationRequired)
          filteredStudents = filteredStudents.filter(student => student.openToRelocate);

        if (skillsFilter.length)
          filteredStudents = filteredStudents.filter(student => {
            for (let i = 0; i < skillsFilter.length; i++) {
              if (!student.skills)
                return false;
              if (!student.skills.includes(skillsFilter[i]))
                return false;
            }
            return true;
          });

        this.setState({filteredStudents});
      });
  }

  /**
   * @description Handles button click of filtered skills list, adding skill to skills filter list
   *
   * @param {Object} e - the event object from the listener
   */
  handleSkillSelect(e) {
    const skillsFilter = [...this.state.skillsFilter];

    if (!skillsFilter.includes(e.target.name))
      skillsFilter.push(e.target.name);

    this.setState({skillsFilter});
  }

  /**
   * @description Handles button click of skills to filter by, removing them from the filter
   *
   * @param {Object} e - the event object from the listener
   */
  handleSkillRemove(e) {
    const skillsFilter = [...this.state.skillsFilter];
    skillsFilter.splice(skillsFilter.indexOf(e.target.name), 1);
    this.setState({skillsFilter});
  }

  render() {
    const {user} = this.props;
    const enable = user.enabled;
    const {filteredStudents, fuzzyInput, fuzzyMatches, skillsFilter} = this.state;

    return (
      <div>
        {!enable && <Overlay user={user}/>}
        <NavigationBar/>
        <div className='container'>
          <h1 className='CenteredTitle mt-5 mb-5'>Find Students</h1>
          <table className='FilterTable'>
            <thead>
            <tr>
              <th>Search Students</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>
                <label>Desire Role</label>
                <select name='desiredRole' className='form-control' onChange={this.handleChange}>
                  <option value='Any Role'>Any Role</option>
                  <option value='Full Stack Developer'>Full Stack Developer</option>
                  <option value='Front End Developer'>Front End Developer</option>
                  <option value='Back End Developer'>Back End Developer</option>
                  <option value='Business Analyst'>Business Analyst</option>
                  <option value="Quality Assurance">Quality Assurance</option>
                </select>
                <label> Require Relocation </label>
                <select name='relocationRequired' className='form-control' onChange={this.handleChange}>
                  <option value={''}>No</option>
                  <option value={true}>Yes</option>
                </select>
                <label>Skills</label>
                <div>
                  {skillsFilter.map(str => {
                    return <button
                      name={str}
                      className='btn btn-outline-success'
                      key={str}
                      onClick={this.handleSkillRemove}
                    >{str}
                    </button>;
                  })}
                </div>
                <input name='fuzzyInput' className='form-control fuzzy-input' onChange={this.handleChange}/>
                <div>
                  {fuzzyInput && fuzzyMatches.map(str => {
                    return <button
                      name={str}
                      className='btn btn-outline-secondary'
                      key={str}
                      onClick={this.handleSkillSelect}
                    >{str}
                    </button>;
                  })}
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <button className='btn btn-success' onClick={this.handleSearchSubmit}>
                  Search Students
                </button>
              </td>
            </tr>
            </tbody>
          </table>
          <table className='filtered-students w-100 mw-100'>
            <tbody>
            {filteredStudents.length > 0 ?
              filteredStudents.map((student) => {
                return (
                  <tr key={student.id}>
                    <td id="fit-content">
                      {student.profilePicture ?
                        <img src={student.profilePicture}/>
                        :
                        <p>{student.firstName} {student.lastName}</p>
                      }
                      <a href={'/auth/student/' + student.id}>
                        <h4>
                          {student.firstName} {student.lastName}
                        </h4></a>
                    </td>
                    <td className="pl-4 pr-4">
                      {student.studentDescription}
                      <div className="justify-content-end d-flex mt-2">
                      {(!student.resume == '') &&
                        <a href={student.resume} target='_blank'>
                          <button type="button" className="btn btn-outline-primary align-bottom mt-5 probuton">View Resume</button>
                        </a>
                      }
                      {(!student.gitUrl == '') &&
                        <a href={student.gitUrl} target='_blank'>
                          <button type="button" className="btn btn-outline-primary align-bottom mt-5 probutton">Github</button>
                        </a >
                      }
                      {(!student.linkedInUrl == '') &&
                        <a href={student.linkedInUrl} target='_blank'>
                          <button type="button" className="btn btn-outline-primary align-bottom mt-5 probutton">LinkedIn</button>
                        </a>
                      }
                      </div>
                    </td>
                  </tr>
                );
              })
              :
              <tr>
                <td>
                  <p>No students meet those requirements</p>
                </td>
              </tr>}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default FilteredStudents;
