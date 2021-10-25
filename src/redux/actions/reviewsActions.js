import {
  GET_ALL_USERS,
  GET_ALL_USERS_SUCCESS,
  DOWN_VOTE,
  DOWN_VOTE_SUCCESS,
  UP_VOTE,
  UP_VOTE_SUCCESS
} from 'constants/constants';

// insert in profile array
export const getAllUsers = (lastRefKey) => ({
  type: GET_ALL_USERS,
  payload: lastRefKey
});

export const getAllUsersSuccess = (users) => ({
  type: GET_ALL_USERS_SUCCESS,
  payload: users
});

export const downVote = (id) => ({
  type: DOWN_VOTE,
  payload: id
});

export const downVoteSuccess = (id) => ({
  type: DOWN_VOTE_SUCCESS,
  payload: id
});

export const upVote = (id, userId) => ({
  type: UP_VOTE,
  payload: {
    id,
    userId
  }
});

export const upVoteSuccess = (id, userId) => ({
  type: UP_VOTE_SUCCESS,
  payload: {
    id,
    userId
  }});