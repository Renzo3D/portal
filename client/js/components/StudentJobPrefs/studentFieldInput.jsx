import React from 'react';
import Dropzone from 'react-dropzone';

const FileInput = field => {
  const files = field.input.value;

  return (
    <div>
      <Dropzone
        name='images'
        onDrop={(files, e) => {
          field.input.onChange(files);
        }}>
      <div className='DragUpload'> Drag and Drop or Click to Upload </div>
      </Dropzone>

      {files && (
        <ul className='list-group list-group-flush'>
          {files.map((file, ndx) => {
            return (
              <li key={ndx} className='list-group-item'>
                {file.name}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default FileInput;