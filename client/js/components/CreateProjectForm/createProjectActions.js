import axios from 'axios';
import history from '../../history';
import { uploadImages } from '../../helper';

export function addProject(data, projects = [], id) {
  // function fails if no image is provided
  return (dispatch, getState) => {
    const { user } = getState();
    uploadImages(data.images)
      .then(response => {
        var arr = JSON.stringify(response.data).match(/https:[^"]+/g);
        console.log(arr[0]);
        return arr[0];
      })
      .then(results => {
        const imageIDs = [];
        console.log('results =>', results);
        imageIDs.push(results);
        projects.push({
          ...data,
          images: imageIDs
        });
        const config = { headers: { Authorization: user.accessToken } };
        axios
          .patch(`/api/students/${id}`, { projects }, config)
          .then(response => {
            if (response.status === 200) {
              portfolioRedirect();
            }
            dispatch({ type: 'CREATE_PROJECT', response });
          })
          .catch(err => console.log(err));
      });
  };
}

export function updateProject(data, projects = [], projectIndex, id) {
  return (dispatch, getState) => {
    const { user } = getState();
    uploadImages(data.images)
      .then(response => {
        var arr = JSON.stringify(response.data).match(/https:[^"]+/g);
        return arr[0];
      })
      .then(results => {
        const imageIDs = [];
        imageIDs.push(results);
        var newObj = {...data, images: imageIDs}
        projects.splice(projectIndex, 1, newObj);
        const config = { headers: { Authorization: user.accessToken } };
        axios
          .patch(`/api/students/${id}`, { projects }, config)
          .then(response => {
            dispatch({ type: 'UPDATE_PROJECT', response });
          })
          .catch(err => console.log(err));
      });
  };
}

export function deleteProject(projects, projectIndex, id) {
  projects.splice(projectIndex, 1);
  return (dispatch, getState) => {
    const { user } = getState();
    const config = { headers: { Authorization: user.accessToken } };
    dispatch({ type: 'DELETE_PROJECT', payload: axios.patch(`/api/students/${id}`, { projects }, config) });
  };
}

export function portfolioRedirect(callback) {
  $('#cancelConfirmModal').modal('hide');
  history.push('/auth/profile');
  return history.go();
}
