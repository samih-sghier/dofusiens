import { GET_ALL_USERS, GET_ALL_USERS_SUCCESS, UP_VOTE_SUCCESS, DOWN_VOTE_SUCCESS } from 'constants/constants';
import { upVote } from 'redux/actions/reviewsActions';

// const initState = [
//   {
//     firstname: 'Gago',
//     lastname: 'Ka',
//     email: 'gagoka@mail.com',
//     password: 'gagooo',
//     avatar: '',
//     banner: '',
//     dateJoined: 0
//   }
// ];

export default (state = {
  lastRefKey: null,
  total: 0,
  users: []
}, action) => {
  switch (action.type) {
    case GET_ALL_USERS_SUCCESS:
      return {
        ...state,
        lastRefKey: action.payload.lastRefKey,
        total: action.payload.total,
        users: [...state.users, ...action.payload.users]
      };
    case UP_VOTE_SUCCESS:
      return {
        users: state.users.map((user) => {
          if (user.id === action.payload.id.id && user.votes) {
            user.votes = user.votes + 1;
          } else if (user.id === action.payload.id.userId && user.upVotes) {
            user.upVotes =user.upVotes.push(action.payload.id.id);
          }
          return user;
        }).sort((a,b) => (a.votes > b.votes) ? -1 : ((b.votes > a.votes) ? 1 : 0)),
        total : state.users ? state.users.length : 0,
        lastRefKey: state.lastRefKey ? state.lastRefKey : null
      };
    case DOWN_VOTE_SUCCESS:
      return {    
        users: state.users.map((user) => {
          if (user.id === action.payload.id && user.votes) {
            user.votes = user.votes - 1;
          }
          return user;
        }).sort((a,b) => (a.votes > b.votes) ? -1 : ((b.votes > a.votes) ? 1 : 0)),
        total : state.users ? state.users.length : 0,
        lastRefKey: state.lastRefKey ? state.lastRefKey : null
      };
    default:
      return state;
  }
};