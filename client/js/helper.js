import axios from 'axios';

export function uploadImages(images) {
  let data = new FormData();
  let date = Date.now();
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  };
  for (let i = 0; i < images.length; i++) {
    data.append('images[' + i + ']', images[i], 'images/' + date + '-' + images[i].name);
  }
  return axios.post('/api/images/oca-portal/upload', data, config)
};
