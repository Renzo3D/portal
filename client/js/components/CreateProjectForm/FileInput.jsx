import React from 'react';
import Dropzone from 'react-dropzone';

const FileInput = field => {
  const files = field.input.value;

  if(!files){
  return (
    <div>
      <Dropzone
        name='images'
        onDrop={(files, e) => {
          field.input.onChange(files);
        }}
      >
        <div className='wrapper'>
          <button type="button" className="uploadButton col-md-8 btn btn-block btn-outline-primary">Upload</button>
          </div>
      </Dropzone>
    </div>
  );
} else{
  return (
    <div>
      <Dropzone
        name='images'
        onDrop={(files, e) => {
          field.input.onChange(files);
        }}
      >
        <img src={files} className='project-pic'/>
      </Dropzone>
    </div>
  )
}
};

export default FileInput;
