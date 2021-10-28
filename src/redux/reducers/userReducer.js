import { ADD_USER, DELETE_USER, EDIT_USER, GET_USER_SUCCESS } from 'constants/constants';


export default (state = {
  currentUser: {}
}, action) => {
  switch (action.type) {
    case GET_USER_SUCCESS:
      return {
        ...state,
        currentUser: action.payload
      };
    case ADD_USER:
      return [...state, action.payload];
    case EDIT_USER:
      return state.map((user) => {
        if (user.id === action.payload.id) {
          return {
            ...user,
            ...action.payload
          };
        }
        return user;
      });
    case DELETE_USER:
      return state.filter((user) => user.id !== action.payload);
    default:
      return state;
  }
};
