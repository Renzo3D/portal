import initialState from '../../initialState';

const employerStrengthReducer = (state = initialState.employerStrength, action) => {
  switch (action.type) {
    case 'CALCULATED_STRENGTH': {
      const { fields, score, next } = action;
      return {
        ...state,
        fields,
        score,
        next
      };
    }

    default: {
      return state;
    }
  }
};

export default employerStrengthReducer;
