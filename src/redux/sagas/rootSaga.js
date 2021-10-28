import * as ACTION from 'constants/constants';
import { takeLatest } from 'redux-saga/effects';
import authSaga from './authSaga';
import productSaga from './productSaga';
import profileSaga from './profileSaga';
import reviewsSaga from './reviewsSaga';
import userSaga from './userSaga';


function* rootSaga() {
  yield takeLatest([
    ACTION.SIGNIN,
    ACTION.SIGNUP,
    ACTION.SIGNOUT,
    ACTION.SIGNIN_WITH_GOOGLE,
    ACTION.SIGNIN_WITH_FACEBOOK,
    ACTION.SIGNIN_WITH_GITHUB,
    ACTION.ON_AUTHSTATE_CHANGED,
    ACTION.ON_AUTHSTATE_SUCCESS,
    ACTION.ON_AUTHSTATE_FAIL,
    ACTION.SET_AUTH_PERSISTENCE,
    ACTION.RESET_PASSWORD
  ], authSaga);
  yield takeLatest([
    ACTION.ADD_PRODUCT,
    ACTION.SEARCH_PRODUCT,
    ACTION.REMOVE_PRODUCT,
    ACTION.EDIT_PRODUCT,
    ACTION.EDIT_PRODUCT_CLIENT,
    ACTION.GET_PRODUCTS,
    ACTION.GET_USER_PRODUCTS
  ], productSaga);
  yield takeLatest([
    ACTION.UPDATE_EMAIL,
    ACTION.UPDATE_PROFILE
  ], profileSaga);
  yield takeLatest([
    ACTION.GET_ALL_USERS,
    ACTION.UP_VOTE,
    ACTION.DOWN_VOTE
  ], reviewsSaga);
  yield takeLatest([
    ACTION.GET_USER
  ], userSaga);
}

export default rootSaga;
