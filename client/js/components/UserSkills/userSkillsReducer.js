import initialState from '../../initialState';

function studentSkills(state = initialState.user, action) {
    switch (action.type) {
        case 'UPDATE_STUDENT_SKILLS': {
            return {
                ...state,
                skills: action.payload.data.skills
            };
        }
        case 'SAVE_STUDENT_SKILLS': {
            return {
                ...state,
                skills: action.payload.data
            }
        }
        default:
        return state;
    }
}

export default studentSkills;