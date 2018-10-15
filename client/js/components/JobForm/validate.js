import { SubmissionError } from 'redux-form';

function validate(values) {
  const {
    companyName,

    description,
    employmentType,
    timestamp,
    title
  } = values;
  if (!companyName) {
    throw new SubmissionError({
      _error: {
        type: 'companyName',
        message: 'Please enter a company name'
      }
    });
  }

  if (!description) {
    throw new SubmissionError({
      _error: {
        type: 'description',
        message: 'Please enter some description'
      }
    });
  }

  if (!employmentType) {
    throw new SubmissionError({
      _error: {
        type: 'employmentType',
        message: 'Please enter Employment Type'
      }
    });
  }

  if (!timestamp) {
    throw new SubmissionError({
      _error: {
        type: 'timestamp',
        message: 'Please enter Time Stamp'
      }
    });
  }
  if (!title) {
    throw new SubmissionError({
      _error: {
        type: 'title',
        message: 'Please enter title'
      }
    });
  }
}

export default validate;
