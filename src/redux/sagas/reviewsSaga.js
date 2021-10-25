import { GET_ALL_USERS, UP_VOTE, DOWN_VOTE } from 'constants/constants';
import { ACCOUNT } from 'constants/routes';
import { displayActionMessage } from 'helpers/utils';
import { call, put, select } from 'redux-saga/effects';
import { history } from 'routers/AppRouter';
import firebase from 'services/firebase';
import { setLoading, setRequestStatus } from 'redux/actions/miscActions';
import { getAllUsers, getAllUsersSuccess, upVoteSuccess, downVoteSuccess } from 'redux/actions/reviewsActions';

function* initRequest() {
  yield put(setLoading(true));
  yield put(setRequestStatus(null));
}

function* handleError(e) {
  yield put(setLoading(false));
  yield put(setRequestStatus(e?.message || 'Failed to fetch users'));
  console.log('ERROR: ', e);
}

function* handleAction(location, message, status) {
  if (location) yield call(history.push, location);
  yield call(displayActionMessage, message, status);
}

function* reviewsSaga({ type, payload }) {
  switch (type) {
    case GET_ALL_USERS: {
      try {
        yield initRequest();
        const state = yield select();
        const result = yield call(firebase.getAllUsers, payload);
        if (result.users.length === 0) {
          handleError('No users found.');
        } else {
          yield put(getAllUsersSuccess({
            users: result.users.sort((a,b) => (a.votes > b.votes) ? -1 : ((b.votes > a.votes) ? 1 : 0)),
            lastRefKey: result.lastKey ? result.lastKey : state.users.lastRefKey,
            total: result.total ? result.total : state.users.total
          }));
          yield put(setRequestStatus(''));
        }
        // yield put({ type: SET_LAST_REF_KEY, payload: result.lastKey });
        yield put(setLoading(false));
      } catch (e) {
        console.log(e);
        yield handleError(e);
      }
      break;
    }
    case UP_VOTE: {
      try {
        yield put(setLoading(false));
        const result = yield call(firebase.upVote, payload.id, payload.userId);
        if (result) {
          yield put(upVoteSuccess(payload));
        } else {
          handleError('Failed to upvote.');
        }
        yield put(setLoading(false));
        yield call(displayActionMessage, 'Upvoted Successfully!', 'success');
      } catch (e) {
        console.log(e.message);
      }
      break;
    }

    case DOWN_VOTE: {
      try {
        yield put(setLoading(false));
        const result = yield call(firebase.downVote, payload);
        if (result) {
          yield put(downVoteSuccess({
            id: payload
          }));
        } else {
          handleError('Failed to downvote.');
        }
        yield put(setLoading(false));
        yield call(displayActionMessage, 'Downvoted Successfully!', 'error');
      } catch (e) {
        console.log(e.message);
      }
      break;
    }
    default: {
      throw new Error('Unexpected action type.');
    }
  }
}

export default reviewsSaga;