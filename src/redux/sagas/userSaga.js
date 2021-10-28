import { GET_USER, GET_USER_SUCCESS } from 'constants/constants';
import { ACCOUNT } from 'constants/routes';
import { displayActionMessage } from 'helpers/utils';
import { call, put, select } from 'redux-saga/effects';
import { history } from 'routers/AppRouter';
import firebase from 'services/firebase';
import { setLoading, setRequestStatus } from 'redux/actions/miscActions';
import { getUserSuccess, getUser } from 'redux/actions/userActions';
import { updateProfileSuccess } from 'redux/actions/profileActions';

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

function* userSaga({ type, payload }) {
  switch (type) {
    case GET_USER: {
      try {
        yield initRequest();
        const state = yield select();
        const snapshot = yield call(firebase.getUser, payload);
        if (!snapshot.data()) {
          handleError('No user found.');
        } else {
          yield put(getUserSuccess(snapshot.data()));
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
  
    default: {
      throw new Error('Unexpected action type.');
    }
  }
}

export default userSaga;