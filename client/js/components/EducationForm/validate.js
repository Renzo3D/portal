import { SubmissionError } from 'redux-form';

export default function validate(values) {
    const {
        schoolName,
        description,
        specialization,
        completionDate
    }   = values;

    if (!schoolName || schoolName == '') {
        throw new SubmissionError({
          _error: {
            type: 'name',
            message: 'Please enter school name.'
          }
        });
      }

    if (!description || description == '') {
        throw new SubmissionError({
            _error: {
            type: 'schoolDescription',
            message: 'Please enter a school description'
            }
        });
    }

    if (!specialization || specialization == '') {
        throw new SubmissionError({
          _error: {
            type: 'area',
            message: 'Please enter an area of education'
          }
        });
    }

    if (!completionDate || completionDate == '') {
        throw new SubmissionError({
          _error: {
            type: 'graduationDate',
            message: 'Please enter a date'
          }
        });
      }
}
