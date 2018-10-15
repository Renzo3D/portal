import { SubmissionError } from 'redux-form';

function validate(values) {
  const {
    title,
    position,
    description,
    startDate,
    endDate,
    currentPosition
  } = values;
  if (!title) {
    throw new SubmissionError({
      _error: {
        type: 'title',
        message: 'Please enter a company name'
      }
    });
  }

  if (!position) {
    throw new SubmissionError({
      _error: {
        type: 'position',
        message: 'Please enter a position name'
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

  if (!startDate) {
    throw new SubmissionError({
      _error: {
        type: 'startDate',
        message: 'Please enter a startDate'
      }
    });
  }

  if (!currentPosition) {
    if (!endDate) {
      throw new SubmissionError({
        _error: {
          type: 'endDate',
          message: 'Please enter an endDate'
        }
      });
    }

    if (startDate > endDate)
      throw new SubmissionError({
        _error: {
          type: 'endDate',
          message: 'Please enter a valid endDate'
        }
      });
  }
}

export default validate;
