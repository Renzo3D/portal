import initialState from '../../initialState';

export default function StudentProfileReducer(state = initialState, action) {
    const { type, payload } = action;
    switch(type) {
        case 'SEARCHED_STUDENT': {
            return {
                ...state,
                searchedStudent: payload
            }
        }

                case 'DELETE_WORK_HISTORY_FULFILLED': {
                        return {
                          ...state,
                         workHistory: action.payload.data.workHistory
                        };
                      }
            
                      case 'DELETE_WORK_HISTORY_REJECTED': {
                        return state;
                      }
            
                      case 'DELETE_EDUCATION_HISTORY_FULFILLED': {
                        return {
                          ...state,
                         educationHistory: action.payload.data.educationHistory
                        };
                      }
            
                      case 'DELETE_EDUCATION_HISTORY_REJECTED': {
                        return state;
                      }

        default: {return state}
    }
}