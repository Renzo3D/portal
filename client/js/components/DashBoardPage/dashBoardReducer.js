import initialState from '../../initialState';

function dashBoardReducer(state = initialState.dashBoard, action) {
  switch (action.type) {
    case 'INCREMENT': {
      return {
        value: state.value + 1
      };
    }

    case 'DECREMENT': {
      return {
        value: state.value - 1
      };
    }

    case 'TOGGLE_MODAL':{
      return{
        ...state,
        isModalOpen: !state.isModalOpen
      }
    }

    default: {
      return state;
    }

  }
}
export default dashBoardReducer;
