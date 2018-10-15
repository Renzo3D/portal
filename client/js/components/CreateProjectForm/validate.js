import { SubmissionError } from 'redux-form';

function validate(values) {
  const { links, files, title } = values;
  if (!title) {
    throw new SubmissionError({
      _error: {
        type: 'title',
        message: 'Please enter a project name'
      }
    });
  }
  if (files) {
    files.map(f => {
      if (!f.type.match(/image\//)) {
        throw new SubmissionError({
          files: 'invalid image type',
          _error: { type: 'file', message: `File ${f.name} is not an image` }
        });
      } else if (f.size > 1024 * 1024 * 10) {
        throw new SubmissionError({
          files: 'file too large',
          _error: {
            type: 'file',
            message: `File ${f.name} is larger than 10MB`
          }
        });
      }
    });
  }

  if (links) {
    for (let link of links) {
      if (!link.match(/^https?:\/\//)) {
        throw new SubmissionError({
          links: 'Invalid link',
          _error: {
            type: 'link',
            message: 'Links must begin with https or http'
          }
        });
      }
    }
  }
}

export default validate;
