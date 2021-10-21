import { UPDATE_EMAIL, UPDATE_PROFILE, GET_ALL_USERS } from 'constants/constants';
import { ACCOUNT } from 'constants/routes';
import { displayActionMessage } from 'helpers/utils';
import { call, put, select } from 'redux-saga/effects';
import { history } from 'routers/AppRouter';
import firebase from 'services/firebase';
import { setLoading } from '../actions/miscActions';
import { updateProfileSuccess } from '../actions/profileActions';

function* reviewsSaga({ type, payload }) {
  switch (type) {
    case GET_ALL_USERS: {
      try {
        yield initRequest();
        const state = yield select();
        const result = yield call(firebase.getAllUsers);
        //alert(payload.id);
        if (result.users.length === 0) {
          handleError('No items found.');
        } else {
          yield put(getUserProductsSuccess({
            products: result.products,
            lastKey: result.lastKey ? result.lastKey : state.products.lastRefKey,
            total: result.total ? result.total : state.products.total
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
    default: {
      throw new Error('Unexpected action type.');
    }
  }
}

export default reviewsSaga;